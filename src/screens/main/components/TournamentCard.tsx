import { Paper, Typography } from '@mui/material';
import React from 'react';

const PaperCard: React.FC = () => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="body1">АПЛ 21/22</Typography>
      <Typography variant="body1">Матчей: 22</Typography>
    </Paper>
  );
};

export default PaperCard;
