import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  if (!token) {
    navigate("/signin");
  }
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mx: 10,
          mt: 2,
          visibility: open ? "none" : "block",
          gap: 2,
        }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            width: "max-content",
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography fontSize="1.5rem">Urban Cap</Typography>
      </Box>
      {token && children} <Sidebar open={open} setOpen={setOpen} />
    </Box>
  );
};

export default PrivateLayout;
