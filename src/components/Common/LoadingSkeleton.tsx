import React from 'react';
import { Grid, Skeleton, Box, Card } from '@mui/material';

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 8 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Skeleton
              variant="rectangular"
              height={320}
              animation="wave"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Box sx={{ p: 2 }}>
              <Skeleton
                variant="text"
                height={28}
                width="80%"
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              />
              <Skeleton
                variant="text"
                height={20}
                width="50%"
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={24}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={24}
                  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
