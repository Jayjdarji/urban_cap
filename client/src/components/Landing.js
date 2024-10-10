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
function Landing() {
  // const data = [
  //   {
  //     label: "Home Cleaning",
  //     image:
  //       "https://homecleanheroes.com/augusta/wp-content/uploads/sites/14/2022/03/Home-Clean-Heroes-cleaner-wiping-down-baseboards.jpg",
  //   },
  //   {
  //     label: "Plumbing",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4p-UKxdcA_5DOb2sZN_AL2GnK4Q7pjoPhQ&s",
  //   },
  //   {
  //     label: "Electrician",
  //     image:
  //       "https://www.uei.edu/wp-content/uploads/2020/02/Becoming-an-Electrician-What-You-Need-To-Know-UEI-College.jpg",
  //   },
  //   {
  //     label: "Beauty Services",
  //     image:
  //       "https://techsquadteam.com/assets/profile/blogimages/15ef18d25c3c9cfef0b0aff23927d6ab.png",
  //   },
  // ];
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
            <Grid container spacing={2}>
              <Grid item xs={5}>
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
              <Grid item xs={4}>
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
              <Grid item xs={3}>
                <Button variant="contained" color="primary" fullWidth sx={{ height: '100%' }}>
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
          {["Home Repairs", "Event Planning", "Popular Near You"].map(
            (category, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6" gutterBottom>
                  {category}
                </Typography>
                <Grid item container spacing={2}>
                  {[1, 2, 3, 4, 5].map((service) => (
                    <Grid item xs={12} md={2} key={service}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://picsum.photos/200/140?random=${service + index
                            }`}
                          alt="Service"
                        />
                        <CardContent>
                          <Typography variant="body1">
                            Service {service}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )
          )}
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
