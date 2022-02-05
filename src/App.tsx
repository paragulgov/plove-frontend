import React from 'react';

import Routes from './base/routes/components/Routes';
import Footer from './components/Footer';
import Header from './components/Header';
import { routes } from './screens/routes';

const App = () => {
  return (
    <>
      <Header />
      <Routes routes={routes} />
      <Footer />
    </>
  );
};

export default App;
