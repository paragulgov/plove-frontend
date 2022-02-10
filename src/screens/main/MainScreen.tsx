import { Button, Container, Stack } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { makePath } from '../../base/routes/utils/makePath';
import { clearTournaments, fetchTournaments, selectTournaments } from '../../redux/tournaments/tournamentsSlice';
import { FetchAllTournamentsRequest } from '../../redux/tournaments/types';
import { setModalOpen } from '../../redux/user/userSlice';
import { routes } from '../routes';
import CreateTournamentModal from './components/CreateTournamentModal';
import TournamentCard from './components/TournamentCard';

const MainScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const tournaments = useAppSelector(selectTournaments);
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
        <Button onClick={handleOpenCreateTournamentModal} sx={{ mb: 3 }}>
          Создать турнир
        </Button>
      )}

      <Stack spacing={3} mb={5}>
        {tournaments?.map(({ id, name, createdAt }) => {
          return (
            <TournamentCard
              key={id}
              name={name}
              createdAt={createdAt}
              path={makePath(routes.TournamentScreen.path, [{ p: 'tournamentId', v: id }])}
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

export default MainScreen;
