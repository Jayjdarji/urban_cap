import React, { useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab, Button, Paper } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import IronIcon from '@mui/icons-material/Iron';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const ExtraServices = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ marginTop: '50px', backgroundColor: '#4A00E0', padding: '40px', color: 'white' }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Extra Services, Extra Convenience
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginBottom: '20px' }}>
        Easily add extra services to your booking by choosing from a variety of options tailored to your needs, all with just a few clicks.
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
          <Tab label="Home cleaning" sx={{ textTransform: 'none', fontSize: '1.2rem' }} />
          {/* <Tab label="End of tenancy" sx={{ textTransform: 'none', fontSize: '1.2rem' }} />
          <Tab label="Business cleaning" sx={{ textTransform: 'none', fontSize: '1.2rem' }} /> */}
        </Tabs>
      </Box>

      {/* Extra Services Grid */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', color: '#4A00E0' }}>
            <CleaningServicesIcon sx={{ marginRight: '10px', fontSize: '2rem' }} />
            <Typography variant="h6">Window cleaning</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', color: '#4A00E0' }}>
            <KitchenIcon sx={{ marginRight: '10px', fontSize: '2rem' }} />
            <Typography variant="h6">Inside fridge</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', color: '#4A00E0' }}>
            <LocalLaundryServiceIcon sx={{ marginRight: '10px', fontSize: '2rem' }} />
            <Typography variant="h6">Laundry</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', color: '#4A00E0' }}>
            <IronIcon sx={{ marginRight: '10px', fontSize: '2rem' }} />
            <Typography variant="h6">Ironing</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', color: '#4A00E0' }}>
            <StoreMallDirectoryIcon sx={{ marginRight: '10px', fontSize: '2rem' }} />
            <Typography variant="h6">Inside cabinets</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '15px', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', color: '#4A00E0' }}>
            <KitchenIcon sx={{ marginRight: '10px', fontSize: '2rem' }} />
            <Typography variant="h6">Inside oven</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExtraServices;
