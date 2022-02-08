import { Container } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { IStringParams } from '../../base/types/BaseTypes';

interface IMatchCardProps {}

const MatchScreen: React.FC<IMatchCardProps> = () => {
  const params = useParams<IStringParams>();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {params.matchId}
    </Container>
  );
};

export default MatchScreen;
