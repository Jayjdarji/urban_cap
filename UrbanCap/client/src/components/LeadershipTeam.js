import React from 'react';
import { Grid, Avatar, Typography, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const teamMembers = [
  {
    name: 'Abhiraj Bhal',
    position: 'CEO & Co-founder',
    image: 'path-to-avatar1', // You can use URLs for images or import static assets
    description: 'Responsible for marketing and product growth...',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Raghav Chandra',
    position: 'CPTO & Co-founder',
    image: 'path-to-avatar2',
    description: 'Leads technology and product development...',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Varun Khaitan',
    position: 'COO & Co-founder',
    image: 'path-to-avatar3',
    description: 'Responsible for operations and service provider...',
    linkedin: '#',
    twitter: '#',
  },
];

const LeadershipTeam = () => {
  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Our Leadership Team
      </Typography>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box textAlign="center">
              <Avatar src={member.image} alt={member.name} sx={{ width: 100, height: 100, margin: '0 auto' }} />
              <Typography variant="h6" mt={2}>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {member.position}
              </Typography>
              <Typography variant="body2" mt={1}>
                {member.description}
              </Typography>
              <Box mt={2}>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon sx={{ mx: 1 }} />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <TwitterIcon sx={{ mx: 1 }} />
                </a>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default LeadershipTeam;
