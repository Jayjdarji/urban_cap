import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PastOrderCard = ({ type, bookedAt, onMoreDetails }) => {
  return (
    <Card
      sx={{
        width: 250,
        padding: "16px",
        margin: "16px",
        boxShadow: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        {/* Display Type */}
        <Typography variant="subtitle1" fontWeight="bold">
          {type}
        </Typography>

        {/* Booked Date */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Booked at: {new Date(bookedAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* More Details Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="text"
          color="primary"
          onClick={onMoreDetails}
          endIcon={<ArrowForwardIcon />}
        >
          More Details
        </Button>
      </Box>
    </Card>
  );
};

export default PastOrderCard;
