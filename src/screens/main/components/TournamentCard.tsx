import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface ITournamentCardProps {
  name: string;
  path: string;
}

const TournamentCard: React.FC<ITournamentCardProps> = ({ name, path }) => {
  return (
    <Link className="router-link" to={path}>
      <Paper elevation={10} sx={{ padding: 2 }}>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
      </Paper>
    </Link>
  );
};

export default TournamentCard;
