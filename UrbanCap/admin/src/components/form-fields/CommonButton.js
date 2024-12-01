import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const CommonButton = ({
  label,
  onClick,
  width = "100%",
  height = "40px",
  color = "#343131",
  hoverColor = "#343131",
  loading = false,
  type = "button",
  sx={}
}) => {
  return (
    <Box
      onClick={!loading ? onClick : null}
      component={"button"}
      type={type}
      sx={{
        borderRadius: "10px",
        overflow: "hidden",
        width: width,
        height: height,
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: loading ? "default" : "pointer",
        color: color,
        fontSize: "1rem",
        border: "1px solid #343131",
        "&:hover": {
          boxShadow: loading ? "none" : `0 0 5px ${hoverColor}`,
          border: loading ? "1px solid #343131" : "none",
        },
        transition: "box-shadow 0.3s ease-in-out, border 0.5s ease-in-out",
        px: 2,
        py: 0.5,
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "#343131" }} />
      ) : (
        <Typography
          sx={{ fontSize: "14px", letterSpacing: "1px", fontWeight: "600" }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default CommonButton;
