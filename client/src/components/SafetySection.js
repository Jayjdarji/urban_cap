import { Box, Grid, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

const SafetySection = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5ebdf',
        padding: '50px 20px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      {/* Inner white box */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '40px',
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Safety and Security is Our Top Priority
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: '30px' }}>
          We connect you to hardworking, trusted individuals who are experienced, vetted, rated, and dependable.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={3}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 50, color: '#d1c485' }} />
            <Typography variant="h6" sx={{ marginTop: '15px' }}>
              Ratings and reviews from other users.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <AccountCircleIcon sx={{ fontSize: 50, color: '#f4b0b6' }} />
            <Typography variant="h6" sx={{ marginTop: '15px' }}>
              Reference and background checks are completed.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <HomeIcon sx={{ fontSize: 50, color: '#f19875' }} />
            <Typography variant="h6" sx={{ marginTop: '15px' }}>
              2+ years work experience is needed before joining.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <ShieldOutlinedIcon sx={{ fontSize: 50, color: '#a7d7d1' }} />
            <Typography variant="h6" sx={{ marginTop: '15px' }}>
              Insurance policy in place for customer peace of mind.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SafetySection;
