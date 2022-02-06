import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './base/hooks/hooks';
import Routes from './base/routes/components/Routes';
import Header from './components/Header';
import { authMe } from './redux/auth/authSlice';
import { fetchUser } from './redux/user/userSlice';
import { routes } from './screens/routes';

const App = () => {
  const dispatch = useAppDispatch();
  const userGetted = useAppSelector(state => state.user.userGetted);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  useEffect(() => {
    if (!userGetted && isAuth) {
      dispatch(fetchUser());
    }
  }, [isAuth]);

  return (
    <>
      <Header />
      <Routes routes={routes} />
    </>
  );
};

export default App;
