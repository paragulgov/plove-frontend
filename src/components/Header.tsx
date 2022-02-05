import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../screens/routes';

const Header = () => {
  const StyledHeader = styled('header')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    height: 50,
  }));

  const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
  }));

  return (
    <Container maxWidth="md" disableGutters>
      <StyledHeader>
        <Typography variant="h5" component="h1">
          <StyledLink className="router-link" to={routes.MainScreen.path}>
            Home
          </StyledLink>
        </Typography>

        <StyledButton href="http:\\google.com">Login</StyledButton>
      </StyledHeader>
    </Container>
  );
};

export default Header;
