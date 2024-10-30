import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

const StatCard = ({ title, number = 0, handleLClick, loading }) => {
  const handleCardClick = () => {
    if (typeof handleLClick === "function") {
      handleLClick();
    }
  };

  const isClickable = typeof handleLClick === "function";
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
        cursor: isClickable ? "pointer" : "default",
        display: "flex",
        "&:hover": {
          border: "1px solid black",
          borderRadius: "12px",
        },
        transition: "all 0.1s ease-in",
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ width: "150px" }}>
        {!loading && <Typography>{title}</Typography>}
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
            {number}
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

export default StatCard;
