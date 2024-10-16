import React from 'react';
import { Typography, Link } from '@mui/material';

const HowWeDoIt = () => {
  return (
    <section>
      <Typography variant="h4" gutterBottom>
        How We do it
      </Typography>
      <Typography variant="body1">
        Urban Company provides a platform that allows skilled professionals to connect with users looking for specific services.
        Our match-making algorithm identifies professionals who are closest to the users' requirements and available at the 
        requested time and date.
      </Typography>
      <Link href="#" underline="hover" sx={{ mt: 2, display: 'block' }}>
        Urban Company Impact
      </Link>
    </section>
  );
};

export default HowWeDoIt;
