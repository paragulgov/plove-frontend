import { styled } from '@mui/material/styles';
import React from 'react';

const Footer = () => {
  const StyledFooter = styled('footer')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
  }));

  return <StyledFooter>Footer</StyledFooter>;
};

export default Footer;
