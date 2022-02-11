import { Container } from '@mui/material';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { setModalOpen } from '../../redux/user/userSlice';
import CalculateBetsModal from './components/CalculateBetsModal';
import CreateBetModal from './components/CreateBetModal';
import MatchBetsList from './components/MatchBetsList';
import MatchHeader from './components/MatchHeader';
import UpdateMatchModal from './components/UpdateMatchModal';

interface IMatchCardProps {}

const MatchScreen: React.FC<IMatchCardProps> = () => {
  const dispatch = useAppDispatch();

  const createBetModal = useAppSelector(state => state.user.modalOpen.createBet);
  const calculateBets = useAppSelector(state => state.user.modalOpen.calculateBets);
  const updateMatch = useAppSelector(state => state.user.modalOpen.updateMatch);

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

export default MatchScreen;
