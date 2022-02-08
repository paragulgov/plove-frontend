import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './base/hooks/hooks';
import Routes from './base/routes/components/Routes';
import Header from './components/Header';
import Loader from './components/UI/Loader';
import { authMe } from './redux/auth/authSlice';
import { fetchUser } from './redux/user/userSlice';
import { routes } from './screens/routes';

const App = () => {
  const dispatch = useAppDispatch();
  const userGetted = useAppSelector(state => state.user.userGetted);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const completeCheckAuth = useAppSelector(state => state.auth.completeCheckAuth);

  // Effects
  useEffect(() => {
    dispatch(authMe());
  }, []);

  useEffect(() => {
    if (!userGetted && isAuth) {
      dispatch(fetchUser());
    }
  }, [isAuth]);

  // Renders
  if (!completeCheckAuth) {
    return <Loader minHeight="100vh" />;
  }

  return (
    <>
      <Header />
      <Routes routes={routes} />
    </>
  );
};

export default App;
