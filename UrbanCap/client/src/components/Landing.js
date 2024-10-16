import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ExtraServices from "./ExtraServices";
import SafetySection from "./SafetySection";

// Static image data for each section
const sections = [
  {
    category: "Home Repairs",
    services: [
      { label: "Plumbing", image: "/plumbing-professional-doing-his-job.jpg" },
      { label: "Electrician", image: "/male-electrician-works-switchboard-with-electrical-connecting-cable.jpg" },
      { label: "Carpentry", image: "https://example.com/carpentry.jpg" },
      { label: "Painting", image: "https://example.com/painting.jpg" },
      { label: "Roofing", image: "https://example.com/roofing.jpg" },
    ],
  },
  {
    category: "Event Planning",
    services: [
      { label: "Wedding Planning", image: "https://example.com/wedding.jpg" },
      { label: "Birthday Party", image: "https://example.com/birthday.jpg" },
      { label: "Corporate Event", image: "https://example.com/corporate.jpg" },
      { label: "Concerts", image: "https://example.com/concerts.jpg" },
      { label: "Private Parties", image: "https://example.com/private.jpg" },
    ],
  },
  {
    category: "Popular Near You",
    services: [
      { label: "Cleaning", image: "https://example.com/cleaning.jpg" },
      { label: "Landscaping", image: "https://example.com/landscaping.jpg" },
      { label: "Pest Control", image: "https://example.com/pestcontrol.jpg" },
      { label: "Handyman", image: "https://example.com/handyman.jpg" },
      { label: "Pool Cleaning", image: "https://example.com/poolcleaning.jpg" },
    ],
  },
];

function Landing() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'url("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg")',
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
                  placeholder="Eg. plumbing, handyman, etc."
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
                  placeholder="Eg. zip code, city, etc."
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
        <Grid container spacing={3}>
          {sections.map((section, sectionIndex) => (
            <Grid item xs={12} key={sectionIndex}>
              <Typography variant="h6" gutterBottom>
                {section.category}
              </Typography>
              <Grid item container spacing={2}>
                {section.services.map((service, serviceIndex) => (
                  <Grid item xs={12} md={2} key={serviceIndex}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={service.image} // Use static image here
                        alt={service.label}
                      />
                      <CardContent>
                        <Typography variant="body1">
                          {service.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Extra Services */}
      <ExtraServices />

      {/* Security & Priority Section */}
      <SafetySection />

      {/* Partner Section */}
    </Box>
  );
}

export default Landing;
