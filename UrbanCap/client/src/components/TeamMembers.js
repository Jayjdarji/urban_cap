import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography
} from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const TeamMembers = ({ teamMembers }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: teamMembers.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          infinite: false
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {teamMembers.map((member, index) => (
        <Box key={index}>
          <Card sx={{ textAlign: "center", padding: 2, mx: 1, }}>
            <CardContent>
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{ width: 120, height: 120, margin: "0 auto" }}
              />
              <Typography variant="h6" fontWeight={600} mt={2}>
                {member.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {member.position}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ maxWidth: 240, margin: "0 auto" }}
              >
                {member.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Box mt={2}>
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mx: 1 }}
                >
                  <LinkedInIcon fontSize="small" />
                </Link>
                <Link
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mx: 1 }}
                >
                  <TwitterIcon fontSize="small" />
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};


export default TeamMembers;

