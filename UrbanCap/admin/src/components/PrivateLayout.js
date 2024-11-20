import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CommonButton from "./form-fields/CommonButton";
const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  if (!token) {
    navigate("/signin");
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 10, mt: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
        <Box>
          <CommonButton
            label={"Logout"}
            type={"logout"}
            sx={{ p: 2 }}
            onClick={handleLogout}
          />
        </Box>
      </Box>
      {token && children} <Sidebar open={open} setOpen={setOpen} />
    </Box>
  );
};

export default PrivateLayout;
