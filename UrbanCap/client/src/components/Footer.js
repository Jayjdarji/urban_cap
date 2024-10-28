import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Context";

const Footer = () => {
  const navigate = useNavigate();
  const { openRegister, openContactUs } = useModal();
  const companyLinks = [
    { text: "About Us", to: "/about-us" },
    { text: "Privacy Policy", to: "/privacy" },
    { text: "Anti-discrimination Policy", to: "/anti-discrimination" },
    { text: "UC Impact", to: "/impact" },
    { text: "Careers", to: "/careers" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        py: 6,
        mt: 2,
        borderTop: "1px solid #333",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Section */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Company
            </Typography>
            {companyLinks.map((item) => (
              <Typography sx={{ my: 0.5, cursor: "pointer" }}>
                <Link
                  onClick={() => navigate(item.to)}
                  color="inherit"
                  underline="hover"
                  sx={{ color: "#fff" }}
                >
                  {item.text}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* For Customers Section */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              For Customers
            </Typography>
            <Typography sx={{ my: 0.5 }}>
              <Link
                component={"p"}
                color="inherit"
                underline="hover"
                sx={{ color: "#fff", cursor: "pointer" }}
                onClick={openContactUs}
              >
                Contact Us
              </Link>
            </Typography>
          </Grid>

          {/* For Partners Section */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              For Partners
            </Typography>
            <Typography sx={{ my: 0.5 }}>
              <Link
                component={"p"}
                color="inherit"
                underline="hover"
                sx={{ color: "#fff", cursor: "pointer" }}
                onClick={openRegister}
              >
                Register as a Professional
              </Link>
            </Typography>
          </Grid>

          {/* Social Links Section */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Social Links
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" href="https://twitter.com">
                <Twitter sx={{ color: "#fff" }} />
              </IconButton>
              {/* <IconButton color="inherit" href="https://facebook.com">
                <Facebook sx={{ color: "#fff" }} />
              </IconButton> */}
              <IconButton color="inherit" href="https://instagram.com">
                <Instagram sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com">
                <LinkedIn sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5} textAlign="center">
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ color: "#fff" }}
          >
            &copy; {new Date().getFullYear()} Urban Cap. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
