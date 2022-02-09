import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface IMatchCardProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
  path: string;
}

const MatchCard: React.FC<IMatchCardProps> = ({ id, homeTeam, awayTeam, path }) => {
  return (
    <Link className="router-link" to={path}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" component="h2">
          {homeTeam} - {awayTeam}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Прогноз можно сделать до: <b>23 февраля 2022, 23:00</b>
        </Typography>
      </Paper>
    </Link>
  );
};

export default MatchCard;
