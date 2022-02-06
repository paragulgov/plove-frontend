import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppBar, Button, Container, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../base/hooks/hooks';
import { useAllMQ } from '../hooks/useAllMQ';
import { logout } from '../redux/auth/authSlice';
import { clearUserData, selectUser } from '../redux/user/userSlice';
import { routes } from '../screens/routes';

const Header = () => {
  const href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=page&redirect_uri=${process.env.REACT_APP_DOMAIN}/login/vk&response_type=code&v=5.120`;

  const { isSM } = useAllMQ();
  const dispatch = useAppDispatch();

  const auth = useAppSelector(state => state.auth.isAuth);
  const user = useAppSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Styles
  const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
  }));

  // Handlers
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserData());
  };

  // Renders
  const renderDesktopMenu = () => {
    return (
      <>
        {auth ? (
          <>
            <Typography mr={3}>{user?.fullName}</Typography>
            <StyledButton onClick={handleLogout}>Выйти</StyledButton>
          </>
        ) : (
          <StyledButton href={href}>Войти через ВК</StyledButton>
        )}
      </>
    );
  };

  const renderMobileMenu = () => {
    return (
      <>
        {auth ? (
          <>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{user?.fullName}</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <StyledButton href={href}>Войти через ВК</StyledButton>
        )}
      </>
    );
  };

  return (
    <AppBar position="static">
      <Container disableGutters>
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            <StyledLink className="router-link" to={routes.MainScreen.path}>
              Главная
            </StyledLink>
          </Typography>

          {isSM ? renderMobileMenu() : renderDesktopMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
