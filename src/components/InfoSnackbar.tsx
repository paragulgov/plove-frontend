import { Alert as MuiAlert, AlertProps } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../base/hooks/hooks';
import { setSnackbar } from '../redux/user/userSlice';

const QAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoSnackbar = () => {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector(state => state.user.snackbar);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar({ open: false, message: '', severity: 'info' }));
  };

  return (
    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
      <QAlert onClose={handleClose} variant="filled" severity={snackbar.severity || 'info'} sx={{ width: '100%' }}>
        {snackbar.message || snackbar.severity || ''}
      </QAlert>
    </Snackbar>
  );
};

export default InfoSnackbar;
