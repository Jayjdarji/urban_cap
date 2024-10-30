import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const CategoryCard = ({ title, moreDetailsClick, loading, totalBooked }) => {
  const handleCardClick = () => {
    if (typeof moreDetailsClick === "function") {
      moreDetailsClick();
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        background: "#fff",
        py: 2,
        px: 3,
        minHeight: "200px",
        boxShadow: "0px 0px 30px rgba(0, 0, 0, .1)",
        cursor: "pointer",
        display: "flex",
        "&:hover": {
          border: "1px solid black",
          borderRadius: "12px",
        },
        transition: "all 0.1s ease-in",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "150px",
        }}
      >
        {!loading && <Typography>{title}</Typography>}
        {!loading && (
          <Typography
            sx={{
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              pb: 0.2,
              "&:hover": {
                textDecoration: "underline",
                color: "blue",
              },
              transition: "all 0.1s ease-in",
            }}
            onClick={handleCardClick}
          >
            More Details
            <ArrowForwardIcon fontSize="small" />
          </Typography>
        )}
        {loading && (
          <Skeleton variant="text" width={100} height={50} animation="wave" />
        )}
        {loading && (
          <Skeleton variant="text" width={100} height={50} animation="wave" />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          bgcolor: "transparent",
        }}
      >
        {!loading && (
          <Typography
            variant="h1"
            fontWeight={"bold"}
            sx={{ color: "transparent", textShadow: "0px 0px 0px #000" }}
          >
            {totalBooked || 0}
          </Typography>
        )}
        {loading && (
          <Skeleton
            variant="rounded"
            width={150}
            height={100}
            animation="wave"
          />
        )}
      </Box>
    </Box>
  );
};

export default CategoryCard;
