import { Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';
import { Link } from 'react-router-dom';

interface ITournamentCardProps {
  name: string;
  createdAt: string;
  path: string;
}

const TournamentCard: React.FC<ITournamentCardProps> = ({ name, createdAt, path }) => {
  return (
    <Link className="router-link" to={path}>
      <Card elevation={10}>
        <CardContent sx={{ '&:last-child': { paddingBottom: 2 } }}>
          <Typography variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            Создан: {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ruLocale })}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TournamentCard;
