import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

const BetsListSkeletonItem = () => {
  return (
    <Box display="flex" px={2} mt={3}>
      <Box mr={3}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </Box>
      <Box width="100%">
        <Typography>
          <Skeleton width="30%" />
        </Typography>
        <Typography variant="caption">
          <Skeleton width="10%" />
        </Typography>
        <Typography variant="caption">
          <Skeleton width="15%" />
        </Typography>
      </Box>
    </Box>
  );
};

const BetsListSkeleton: React.FC = () => {
  return (
    <Stack spacing={3}>
      <BetsListSkeletonItem />
      <BetsListSkeletonItem />
      <BetsListSkeletonItem />
      <BetsListSkeletonItem />
      <BetsListSkeletonItem />
    </Stack>
  );
};

export default BetsListSkeleton;
