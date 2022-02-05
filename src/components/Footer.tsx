import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Footer = () => {
  const StyledFooter = styled('footer')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
  }));

  return (
    <Container maxWidth="md" disableGutters>
      <StyledFooter>Footer</StyledFooter>
    </Container>
  );
};

export default Footer;
