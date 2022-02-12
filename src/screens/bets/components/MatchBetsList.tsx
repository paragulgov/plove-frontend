import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../base/hooks/hooks';
import { IStringParams } from '../../../base/types/BaseTypes';
import { fetchBets } from '../../../redux/bets/betsSlice';
import { GetBetsQuery } from '../../../redux/bets/types';
import BetsListSkeleton from './BetsListSkeleton';

const MatchBetsList = () => {
  const params = useParams<IStringParams>();
  const dispatch = useAppDispatch();

  const bets = useAppSelector(state => state.bets.data);
  const skip = useAppSelector(state => state.bets.skip);
  const total = useAppSelector(state => state.bets.total);
  const isLoading = useAppSelector(state => state.bets.isLoading);

  // Handlers
  const handleLoadMore = () => {
    const payload: GetBetsQuery = { matchId: +params.matchId, skip: skip };
    dispatch(fetchBets(payload));
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent sx={{ '&:last-child': { paddingBottom: 2 } }}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Все прогнозы на матч
              </ListSubheader>
            }
          >
            {!isLoading && bets.length < 1 && (
              <Typography textAlign="center" variant="subtitle2">
                Пока еще нет прогнозов ;(
              </Typography>
            )}

            {isLoading && <BetsListSkeleton />}

            {bets.map((bet, index, arr) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{bet.user.fullName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={bet.user.fullName}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Прогноз: {bet.homeTeamGoalsBet} - {bet.awayTeamGoalsBet}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Очков получено: {bet.points}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>

                  {index < arr.length - 1 && <Divider variant="inset" component="li" />}
                </>
              );
            })}
          </List>
        </CardContent>
      </Card>

      {total > skip && (
        <Button onClick={handleLoadMore} variant="outlined" fullWidth>
          Загрузить еще
        </Button>
      )}
    </>
  );
};

export default MatchBetsList;
