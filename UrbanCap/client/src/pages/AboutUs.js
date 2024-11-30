import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TeamMembers from "../components/TeamMembers";
import PrivateLayout from "../components/PrivateLayout";

const teamMembers = [
  {
    name: "Jay Darji",
    position: "CEO & Co-founder",
    image: "/Fav.jpg", // Add correct image paths if available
    description: "Jay is responsible for marketing and product growth at Urban Cap. When not busy at Urban Cap, Jay enjoys immersing himself in interesting experiences be it running marathons, skydiving in Spain, scuba diving in the Andamans or cooking his wife Priyal's favorite dishes.",
    linkedin: "https://www.linkedin.com/in/jaydarji529/",
    twitter: "#",
  },
  {
    name: "Harsh Chauhan",
    position: "CPTO & Co-founder",
    image: "/harsh3.jpg",
    description: "Harsh leads technology and product development. Harsh is a dance enthusiast who does not miss any opportunity to groove to Westcoast Swing and Rock-n-Roll. Harsh is a dance enthusiast who does not miss any opportunity to groove to Westcoast Swing.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Vashishth Patel",
    position: "COO & Co-founder",
    image: "/Vashishth2.jpg",
    description: "Vashishth is responsible for operations and service provider on-boarding at Urban Cap. When not building Urban Cap, Vashishth likes to check out new coffee shops, explore Delhi with his Polaroid and go for a run at Lodhi Gardens - his favourite spot in the city.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Utsav Patel",
    position: "Logistics Operations Head",
    image: "/utsav3.jpg",
    description: "Responsible for operations and service provider on-boarding.",
    linkedin: "#",
    twitter: "#",
  },
];

const AboutUs = () => {
  return (
    <PrivateLayout>
      <Container sx={{ my: 8 }}>
        {/* Who We Are Section */}
        <Box sx={{ my: 10 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ margin: "0 auto" }}
          >
            Urban Cap is a technology platform offering a variety of services at
            home. Customers use our platform to book services such as beauty
            treatments, haircuts, massage therapy, cleaning, plumbing,
            carpentry, appliance repair, painting etc. These services are
            delivered in the comfort of their home and at a time of their
            choosing. We promise our customers a high quality, standardized and
            reliable service experience. To fulfill this promise, we work
            closely with our hand-picked service partners, enabling them with
            technology, training, products, tools, financing, insurance and
            brand, helping them succeed and deliver on this promise. Our Vision:
            Empower millions of professionals worldwide to deliver services at
            home like never experienced before
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ textAlign: "center", my: 12 }}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" fontWeight={600}>
              45,000+
            </Typography>
            <Typography variant="body2">Trained Professionals</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" fontWeight={600}>
              12 Million+
            </Typography>
            <Typography variant="body2">Happy Customers</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" fontWeight={600}>
              222
            </Typography>
            <Typography variant="body2">Cities</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" fontWeight={600}>
              4
            </Typography>
            <Typography variant="body2">Countries</Typography>
          </Grid>
          {/* How We Do It Section */}
          <Grid item xs={12} sx={{ my: 6 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              textAlign="center"
              gutterBottom
            >
              How We do it
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ margin: "0 auto" }}
            >
              Urban Cap provides a platform that allows skilled and experienced
              professionals to connect with users looking for specific services.
              Our match-making algorithm identifies professionals who are
              closest to the users' requirements and available at the requested
              time and date.
            </Typography>
          </Grid>

          {/* Leadership Team Section */}
          <Grid item container xs={12} sx={{ mb: 10, mt: 5 }}>
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                gutterBottom
              >
                Our Leadership Team
              </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2} sx={{ mt: 5 }}>
              <TeamMembers teamMembers={teamMembers} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PrivateLayout>
  );
};

export default AboutUs;
