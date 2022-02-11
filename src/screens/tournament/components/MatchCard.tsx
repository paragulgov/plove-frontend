import { Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { Link } from 'react-router-dom';

interface IMatchCardProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
  betsWillEndAt: string;
  path: string;
}

const MatchCard: React.FC<IMatchCardProps> = ({ id, homeTeam, awayTeam, path, betsWillEndAt }) => {
  const date = format(new Date(betsWillEndAt), 'dd MMMM yyyy HH:mm', {
    locale: ru,
  });

  return (
    <Link className="router-link" to={path}>
      <Card>
        <CardContent sx={{ '&:last-child': { paddingBottom: 2 } }}>
          <Typography variant="h6" component="h2">
            {homeTeam} - {awayTeam}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            Прогноз можно сделать до: <b>{date}</b>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MatchCard;
