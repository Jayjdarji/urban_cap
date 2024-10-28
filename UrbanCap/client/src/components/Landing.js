import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import EventPlanning from "./Event/EventPlanning";
import ExtraServices from "./ExtraServices";
import SafetySection from "./SafetySection";
import Services from "./Service";
function Landing() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'url("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg")', // Replace with your background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              CCTV Installation
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
              Connect with top-rated pros near you. Compare quotes. Hire the pro
              that's right for your job.
            </Typography>
            <Grid item container xs={12} spacing={2}>
              <Grid item lg={5} xs={12}>
                <TextField
                  fullWidth
                  label="What service do you need?"
                  variant="filled"
                  sx={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                />
              </Grid>
              <Grid item lg={4} xs={12}>
                <TextField
                  fullWidth
                  label="Where?"
                  variant="filled"
                  sx={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                />
              </Grid>
              <Grid item lg={3} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    height: "100%",
                    background: "white",
                    color: "black",
                    borderRadius: "12px",
                    minHeight: "56px",
                  }}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Services Offered */}
      <Box sx={{ marginTop: "50px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Services Offered
        </Typography>
        <Services />
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
          Events Planning
        </Typography>
        <EventPlanning />
      </Box>

      <ExtraServices />

      <SafetySection />
    </Box>
  );
}

export default Landing;
