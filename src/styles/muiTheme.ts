import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: 375,
          backgroundColor: '#EBEBEB !important',
          fontWeight: 'normal',
        },
        main: {
          flex: '1 0 auto',
        },
        '#root': {
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
        '.router-link': {
          textDecoration: 'none',
        },
      },
    },
  },
});
