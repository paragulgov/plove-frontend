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
  const role = useAppSelector(state => state.user.data?.role);
  const access = useAppSelector(state => state.bets.access);
  const tournament = useAppSelector(state => state.tournaments.currentTournament);
  const match = useAppSelector(state => state.matches.currentMatch);
  const tournamentLoading = useAppSelector(state => state.tournaments.isLoading);
  const matchLoading = useAppSelector(state => state.matches.isLoading);
  const betsLoading = useAppSelector(state => state.bets.isLoading);
  const totalBets = useAppSelector(state => state.bets.total);

  const date =
    match &&
    format(new Date(match.betsWillEndAt), 'dd MMMM yyyy HH:mm', {
      locale: ru,
    });

  const matchEndTime = match && new Date(match.betsWillEndAt).getTime();
  const nowTime = new Date().getTime();
  const timeAccess = matchEndTime && matchEndTime > nowTime;

  // Handlers
  const handleOpenCreateBetModal = () => {
    dispatch(setModalOpen({ modal: 'createBet', value: true }));
  };

  const handleOpenUpdateBetModal = () => {
    dispatch(setModalOpen({ modal: 'updateBet', value: true }));
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
            {betsLoading ? (
              <Skeleton width="40%" />
            ) : (
              <>
                Всего сделано прогнозов: <b>{totalBets}</b>
              </>
            )}
          </Typography>
          {!match?.isFinished && (
            <Typography variant="body1">
              {betsLoading ? (
                <Skeleton width="50%" />
              ) : (
                <>
                  Прогноз можно сделать до: <b>{date}</b>
                </>
              )}
            </Typography>
          )}
          {match?.isFinished && (
            <Typography variant="overline">
              Результат: {match.homeTeamGoals} - {match.awayTeamGoals}
            </Typography>
          )}
          {auth && !match?.isFinished && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={2}>
              {access && timeAccess && (
                <Button onClick={handleOpenCreateBetModal} variant="contained">
                  Сделать прогноз
                </Button>
              )}

              {!access && timeAccess && (
                <Button onClick={handleOpenUpdateBetModal} variant="contained">
                  Обновить прогноз
                </Button>
              )}

              {(role === 'admin' || role === 'moderator') && (
                <>
                  <Button onClick={handleOpenUpdateMatchModal} variant="contained" color="secondary">
                    Обновить время
                  </Button>
                  <Button onClick={handleOpenCalculateBetsModal} variant="contained" color="secondary">
                    Завершить матч
                  </Button>
                </>
              )}
            </Stack>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
