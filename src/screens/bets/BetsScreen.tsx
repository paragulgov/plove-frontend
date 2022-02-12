import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { IStringParams } from '../../base/types/BaseTypes';
import { clearBets, fetchBets } from '../../redux/bets/betsSlice';
import { GetBetsQuery } from '../../redux/bets/types';
import { clearMatches, fetchMatchById } from '../../redux/matches/matchesSlice';
import { clearCurrentTournament, fetchTournamentById } from '../../redux/tournaments/tournamentsSlice';
import { setModalOpen } from '../../redux/user/userSlice';
import CalculateBetsModal from './components/CalculateBetsModal';
import CreateBetModal from './components/CreateBetModal';
import MatchBetsList from './components/MatchBetsList';
import MatchHeader from './components/MatchHeader';
import UpdateMatchModal from './components/UpdateMatchModal';

interface IMatchCardProps {}

const BetsScreen: React.FC<IMatchCardProps> = () => {
  const params = useParams<IStringParams>();
  const dispatch = useAppDispatch();

  const createBetModal = useAppSelector(state => state.user.modalOpen.createBet);
  const calculateBets = useAppSelector(state => state.user.modalOpen.calculateBets);
  const updateMatch = useAppSelector(state => state.user.modalOpen.updateMatch);

  // Effects
  useEffect(() => {
    const payload: GetBetsQuery = { matchId: +params.matchId };
    dispatch(fetchBets(payload));
    dispatch(fetchMatchById(+params.matchId));
    dispatch(fetchTournamentById(+params.tournamentId));

    return () => {
      dispatch(clearBets());
      dispatch(clearCurrentTournament());
      dispatch(clearMatches());
    };
  }, [params.matchId, params.tournamentId]);

  // Handlers
  const handleCloseCreateBetModal = () => {
    dispatch(setModalOpen({ modal: 'createBet', value: false }));
  };

  const handleCloseCalculateBetsModal = () => {
    dispatch(setModalOpen({ modal: 'calculateBets', value: false }));
  };

  const handleCloseUpdateMatchModal = () => {
    dispatch(setModalOpen({ modal: 'updateMatch', value: false }));
  };

  // Renders
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <MatchHeader />
      <MatchBetsList />

      <CreateBetModal open={createBetModal} handleClose={handleCloseCreateBetModal} />
      <CalculateBetsModal open={calculateBets} handleClose={handleCloseCalculateBetsModal} />
      <UpdateMatchModal open={updateMatch} handleClose={handleCloseUpdateMatchModal} />
    </Container>
  );
};

export default BetsScreen;
