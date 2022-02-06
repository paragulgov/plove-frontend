import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../base/hooks/hooks';
import { useQuery } from '../../hooks/useQuery';
import { loginVK } from '../../redux/auth/authSlice';
import { routes } from '../routes';

const LoginScreen: React.FC = () => {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const completeCheckAuth = useAppSelector(state => state.auth.completeCheckAuth);

  useEffect(() => {
    if (!isAuth && completeCheckAuth) {
      const code = query.get('code');

      if (code) {
        const payload = { code };
        dispatch(loginVK(payload));
      }
    }
  }, [query, isAuth, completeCheckAuth]);

  if (isAuth) {
    return <Redirect to={routes.MainScreen.path} />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {query.get('code')}
    </Container>
  );
};

export default LoginScreen;
