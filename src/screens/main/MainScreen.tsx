import { Container, Stack } from '@mui/material';
import React from 'react';

import PaperCard from './components/TournamentCard';

const MainScreen: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <PaperCard />
        <PaperCard />
        <PaperCard />
        <PaperCard />
        <PaperCard />
      </Stack>
    </Container>
  );
};

export default MainScreen;
