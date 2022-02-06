import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const useAllMQ = () => {
  const theme = useTheme();

  return {
    isXS: useMediaQuery(theme.breakpoints.down('xs')),
    isSM: useMediaQuery(theme.breakpoints.down('sm')),
    isMD: useMediaQuery(theme.breakpoints.down('md')),
    isLG: useMediaQuery(theme.breakpoints.down('lg')),
    isXL: useMediaQuery(theme.breakpoints.down('xl')),
  };
};
