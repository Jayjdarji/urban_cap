import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useModal } from "../Context";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { openLogin, openRegister } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }} onClick={handleNavigate}>
          <img
            src="https://static.toiimg.com/thumb/imgsize-3008,msid-104855461,width-375,height-210,resizemode-75/104855461.jpg" // Placeholder for your logo
            alt="Urban Cap Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for services"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>

        {/* Right Side: Login/Signup */}
        {!isLoggedIn && (
          <Box>
            <Button color="inherit" onClick={openLogin}>
              Login
            </Button>
            <Button color="inherit" onClick={openRegister}>
              Sign Up
            </Button>
          </Box>
        )}
        {isLoggedIn && (
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
