import { Container, Stack } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { fetchTournaments, selectTournaments } from '../../redux/tournaments/tournamentsSlice';
import TournamentCard from './components/TournamentCard';

const MainScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectTournaments);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={3}>
        {tournaments?.map(({ id, name }) => {
          return <TournamentCard key={id} id={id} name={name} />;
        })}
      </Stack>
    </Container>
  );
};

export default MainScreen;
