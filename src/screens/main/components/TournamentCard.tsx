import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface ITournamentCardProps {
  id: number;
  name: string;
}

const TournamentCard: React.FC<ITournamentCardProps> = ({ id, name }) => {
  return (
    <Link className="router-link" to={`tournament/${id}`}>
      <Paper elevation={10} sx={{ padding: 2 }}>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
      </Paper>
    </Link>
  );
};

export default TournamentCard;
