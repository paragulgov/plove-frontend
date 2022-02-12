import { Box, Button, Card, CardContent, Skeleton, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { setModalOpen } from '../../../redux/user/userSlice';

interface IMatchCardProps {}

const MatchHeader: React.FC<IMatchCardProps> = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector(state => state.auth.isAuth);
  const tournament = useAppSelector(state => state.tournaments.currentTournament);
  const match = useAppSelector(state => state.matches.currentMatch);
  const tournamentLoading = useAppSelector(state => state.tournaments.isLoading);
  const matchLoading = useAppSelector(state => state.matches.isLoading);
  const totalBets = useAppSelector(state => state.bets.total);

  const date =
    match &&
    format(new Date(match.betsWillEndAt), 'dd MMMM yyyy HH:mm', {
      locale: ru,
    });

  // Handlers
  const handleOpenCreateBetModal = () => {
    dispatch(setModalOpen({ modal: 'createBet', value: true }));
  };

  const handleOpenCalculateBetsModal = () => {
    dispatch(setModalOpen({ modal: 'calculateBets', value: true }));
  };

  const handleOpenUpdateMatchModal = () => {
    dispatch(setModalOpen({ modal: 'updateMatch', value: true }));
  };

  // Renders
  return (
    <Card sx={{ p: 2, mb: 3 }}>
      <CardContent sx={{ '&:last-child': { paddingBottom: 2 } }}>
        <Box>
          <Typography variant="h3">{tournamentLoading ? <Skeleton width="20%" /> : tournament?.name}</Typography>
          <Typography variant="h6">
            {matchLoading ? (
              <Skeleton width="40%" />
            ) : (
              <>
                {match?.homeTeam} - {match?.awayTeam}
              </>
            )}
          </Typography>
          <Typography variant="body1">
            {tournamentLoading ? (
              <Skeleton width="40%" />
            ) : (
              <>
                Всего сделано прогнозов: <b>{totalBets}</b>
              </>
            )}
          </Typography>
          <Typography variant="body1">
            {tournamentLoading ? (
              <Skeleton width="50%" />
            ) : (
              <>
                Прогноз можно сделать до: <b>{date}</b>
              </>
            )}
          </Typography>
          {auth && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={2}>
              <Button onClick={handleOpenCreateBetModal} variant="contained">
                Сделать прогноз
              </Button>
              <Button onClick={handleOpenUpdateMatchModal} variant="contained">
                Обновить время
              </Button>
              <Button onClick={handleOpenCalculateBetsModal} variant="contained">
                Завершить матч
              </Button>
            </Stack>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
