import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { makePath } from '../../../base/routes/utils/makePath';
import { IStringParams } from '../../../base/types/BaseTypes';
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
  const total = useAppSelector(state => state.matches.total);

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
      {matches.length < 1 ? (
        <Typography variant="h4" textAlign="center">
          Здесь ничего нет
        </Typography>
      ) : (
        <>
          <Button onClick={handleOpenCreateMatchModal} color="secondary" sx={{ marginBottom: 1 }}>
            Создать матч
          </Button>
          <Stack spacing={3} mb={3}>
            {matches.map(({ id, homeTeam, awayTeam }) => {
              return (
                <MatchCard
                  key={id}
                  id={id}
                  homeTeam={homeTeam}
                  awayTeam={awayTeam}
                  path={makePath(routes.MatchScreen.path, [
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
      )}
    </>
  );
};

export default MatchesSection;
