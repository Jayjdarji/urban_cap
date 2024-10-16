import React from 'react';
import { Grid, Typography } from '@mui/material';

const StatsSection = () => {
  return (
    <Grid container spacing={4} textAlign="center" sx={{ my: 4 }}>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">45,000+</Typography>
        <Typography variant="subtitle1">Trained Professionals</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">12 Million+</Typography>
        <Typography variant="subtitle1">Happy Customers</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">222</Typography>
        <Typography variant="subtitle1">Cities</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">4</Typography>
        <Typography variant="subtitle1">Countries</Typography>
      </Grid>
    </Grid>
  );
};

export default StatsSection;
