import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { IStringParams } from '../../base/types/BaseTypes';
import { setModalOpen } from '../../redux/user/userSlice';
import CalculateBetsModal from './components/CalculateBetsModal';
import CreateBetModal from './components/CreateBetModal';
import MatchBetsList from './components/MatchBetsList';
import MatchHeader from './components/MatchHeader';

interface IMatchCardProps {}

const MatchScreen: React.FC<IMatchCardProps> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<IStringParams>();

  const createBetModal = useAppSelector(state => state.user.modalOpen.createBet);
  const calculateBets = useAppSelector(state => state.user.modalOpen.calculateBets);

  // Handlers
  const handleCloseCreateBetModal = () => {
    dispatch(setModalOpen({ modal: 'createBet', value: false }));
  };

  const handleCloseCalculateBetsModal = () => {
    dispatch(setModalOpen({ modal: 'calculateBets', value: false }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <MatchHeader />
      <MatchBetsList />

      <CreateBetModal open={createBetModal} handleClose={handleCloseCreateBetModal} />
      <CalculateBetsModal open={calculateBets} handleClose={handleCloseCalculateBetsModal} />
    </Container>
  );
};

export default MatchScreen;
