import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'react-router-dom';

import App from './App';
import history from './base/routes/history';
import reportWebVitals from './reportWebVitals';
import { theme } from './styles/muiTheme';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <Router history={history}>
          <CssBaseline />
          <App />
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
