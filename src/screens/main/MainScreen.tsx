import { Container, Stack } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { makePath } from '../../base/routes/utils/makePath';
import { fetchTournaments, selectTournaments } from '../../redux/tournaments/tournamentsSlice';
import { routes } from '../routes';
import TournamentCard from './components/TournamentCard';

const MainScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectTournaments);

  useEffect(() => {
    dispatch(fetchTournaments());
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {tournaments?.map(({ id, name }) => {
          return (
            <TournamentCard
              key={id}
              name={name}
              path={makePath(routes.TournamentScreen.path, [{ p: 'tournamentId', v: id }])}
            />
          );
        })}
      </Stack>
    </Container>
  );
};

export default MainScreen;
