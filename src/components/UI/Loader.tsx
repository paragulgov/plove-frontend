import { Box, CircularProgress, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface ILoaderProps {
  size?: number;
  minHeight?: string | number;
  isAbsolute?: boolean;
  color?: string;
}

const Loader: React.FC<ILoaderProps> = ({ size = 40, minHeight = 0, isAbsolute = false, color }) => {
  const { palette } = useTheme();

  const rendeLoader = () => {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box display="flex" color={color || palette.primary.main}>
          <CircularProgress size={size} color="inherit" />
        </Box>
      </Grid>
    );
  };

  if (isAbsolute) {
    return (
      <Box
        minHeight={minHeight}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255, .7)',
            zIndex: -1,
          }}
        />

        {rendeLoader()}
      </Box>
    );
  }

  return (
    <Box
      minHeight={minHeight}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, flexBasis: '100%' }}
    >
      {rendeLoader()}
    </Box>
  );
};

export default Loader;
