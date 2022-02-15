import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { makePath } from '../../../base/routes/utils/makePath';
import { IStringParams } from '../../../base/types/BaseTypes';
import RectangularSkeleton from '../../../components/RectangularSkeleton';
import { clearMatches, fetchMatches, selectMatches } from '../../../redux/matches/matchesSlice';
import { MatchesPayload } from '../../../redux/matches/types';
import { setModalOpen } from '../../../redux/user/userSlice';
import { routes } from '../../routes';
import MatchCard from './MatchCard';

const MatchesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<IStringParams>();

  const matches = useAppSelector(selectMatches);
  const skip = useAppSelector(state => state.matches.skip);
  const isLoading = useAppSelector(state => state.matches.isLoading);
  const total = useAppSelector(state => state.matches.total);
  const role = useAppSelector(state => state.user?.data?.role);
  const auth = useAppSelector(state => state.auth.isAuth);

  const guard = auth && (role === 'moderator' || role === 'admin');

  // Effects
  useEffect(() => {
    const payload: MatchesPayload = { tournamentId: +params.tournamentId };

    dispatch(fetchMatches(payload));

    return () => {
      dispatch(clearMatches());
    };
  }, [params.tournamentId]);

  // Handlers
  const handleLoadMore = () => {
    const payload: MatchesPayload = { tournamentId: +params.tournamentId, skip: skip };

    dispatch(fetchMatches(payload));
  };

  const handleOpenCreateMatchModal = () => {
    dispatch(setModalOpen({ modal: 'createMatch', value: true }));
  };

  return (
    <>
      {guard && (
        <Button onClick={handleOpenCreateMatchModal} color="secondary" sx={{ marginBottom: 1 }}>
          Создать матч
        </Button>
      )}

      {isLoading && <RectangularSkeleton height={92} spacing={3} />}

      {!isLoading && matches.length < 1 && (
        <Typography variant="h6" textAlign="center">
          Список матчей пуст
        </Typography>
      )}

      <Stack spacing={3} mb={3}>
        {matches.map(({ id, homeTeam, awayTeam, betsWillEndAt, isFinished }) => {
          return (
            <MatchCard
              key={id}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              betsWillEndAt={betsWillEndAt}
              isFinished={isFinished}
              path={makePath(routes.BetsScreen.path, [
                {
                  p: 'tournamentId',
                  v: params.tournamentId,
                },
                { p: 'matchId', v: id },
              ])}
            />
          );
        })}
      </Stack>

      {total > skip && (
        <Button onClick={handleLoadMore} variant="outlined" fullWidth>
          Загрузить еще
        </Button>
      )}
    </>
  );
};

export default MatchesSection;
