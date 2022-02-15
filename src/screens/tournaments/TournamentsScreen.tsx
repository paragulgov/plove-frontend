import { Button, Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { makePath } from '../../base/routes/utils/makePath';
import RectangularSkeleton from '../../components/RectangularSkeleton';
import { clearTournaments, fetchTournaments, selectTournaments } from '../../redux/tournaments/tournamentsSlice';
import { FetchAllTournamentsRequest } from '../../redux/tournaments/types';
import { setModalOpen } from '../../redux/user/userSlice';
import { routes } from '../routes';
import CreateTournamentModal from './components/CreateTournamentModal';
import TournamentCard from './components/TournamentCard';

const TournamentsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const tournaments = useAppSelector(selectTournaments);
  const isLoading = useAppSelector(state => state.tournaments.isLoading);
  const skip = useAppSelector(state => state.tournaments.skip);
  const total = useAppSelector(state => state.tournaments.total);
  const createTournamentModalOpen = useAppSelector(state => state.user.modalOpen.createTournament);
  const auth = useAppSelector(state => state.auth.isAuth);
  const role = useAppSelector(state => state.user?.data?.role);

  const guard = auth && (role === 'moderator' || role === 'admin');

  // Effects
  useEffect(() => {
    dispatch(fetchTournaments());

    return () => {
      dispatch(clearTournaments());
    };
  }, []);

  // Handlers
  const handleLoadMore = () => {
    const payload: FetchAllTournamentsRequest = { skip: skip };

    dispatch(fetchTournaments(payload));
  };

  const handleOpenCreateTournamentModal = () => {
    dispatch(setModalOpen({ modal: 'createTournament', value: true }));
  };

  const handleCloseCreateTournamentModal = () => {
    dispatch(setModalOpen({ modal: 'createTournament', value: false }));
  };

  // Renders
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {guard && (
        <Button onClick={handleOpenCreateTournamentModal} sx={{ mb: 3 }} color="secondary">
          Создать турнир
        </Button>
      )}

      {isLoading && <RectangularSkeleton height={101} spacing={3} />}

      {!isLoading && tournaments.length < 1 && (
        <Typography variant="h6" textAlign="center">
          Список турниров пуст
        </Typography>
      )}

      <Stack spacing={3} mb={5}>
        {tournaments?.map(({ id, name, createdAt }) => {
          return (
            <TournamentCard
              key={id}
              name={name}
              createdAt={createdAt}
              path={makePath(routes.MatchesScreen.path, [{ p: 'tournamentId', v: id }])}
            />
          );
        })}
      </Stack>

      {total > skip && (
        <Button onClick={handleLoadMore} variant="outlined" fullWidth>
          Загрузить еще
        </Button>
      )}

      <CreateTournamentModal open={createTournamentModalOpen} handleClose={handleCloseCreateTournamentModal} />
    </Container>
  );
};

export default TournamentsScreen;
