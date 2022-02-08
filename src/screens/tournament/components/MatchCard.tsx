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
        <Typography variant="h4" component="h2">
          {id}
        </Typography>
      </Paper>
    </Link>
  );
};

export default MatchCard;
