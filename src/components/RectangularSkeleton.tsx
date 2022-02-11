import { Skeleton, Stack } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import React from 'react';

interface IRectangularSkeletonProps {
  height: string | number;
  spacing: ResponsiveStyleValue<number | string>;
}

const RectangularSkeleton: React.FC<IRectangularSkeletonProps> = ({ height, spacing }) => {
  return (
    <Stack spacing={spacing}>
      <Skeleton variant="rectangular" animation="wave" width="100%" height={height} />
      <Skeleton variant="rectangular" animation="pulse" width="100%" height={height} />
      <Skeleton variant="rectangular" animation="wave" width="100%" height={height} />
      <Skeleton variant="rectangular" animation="pulse" width="100%" height={height} />
    </Stack>
  );
};

export default RectangularSkeleton;
