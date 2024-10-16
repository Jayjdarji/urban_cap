import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useModal } from "../Context";
import CommonButton from "./form-fields/CommonButton";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SelectField from "./form-fields/SelectField";

function Navbar() {
  const { openLogin, openRegister } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("🚀🚀🚀 ~ Navbar ~ location:", location.pathname);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const formik = useFormik({
    initialValues: {
      currency: "CA",
    },
    onSubmit: () => { },
  });

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const navLinks = [
    { name: "Home", path: "/home" },
    // { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about-us" },
    // { name: "Advice", path: "/advice" },
    // { name: "For Pros", path: "/for-pros" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleOpenModal = (modalName) => {
    if (modalName === "login") {
      openLogin();
    } else if (modalName === "register") {
      openRegister();
    } else {
      handleLogout()
    }
    setDrawerOpen(false)
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px" }}>
        <Grid container alignItems={"center"} spacing={2}>
          {/* Logo */}
          <Grid item xs={11} lg={2}>
            <img
              src="https://static.toiimg.com/thumb/imgsize-3008,msid-104855461,width-375,height-210,resizemode-75/104855461.jpg" // Placeholder for your logo
              alt="Urban Cap Logo"
              style={{ height: "40px", marginRight: "10px", cursor: "pointer" }}
              onClick={() => handleNavigate("/home")}
            />
          </Grid>

          {/* Nav links - hidden in small screens */}
          <Grid
            item
            lg={8}
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <div key={link.name} style={{ position: "relative" }}>
                <NavLink
                  to={link.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#1976d2" : "black",
                    fontWeight: 500,
                  })}
                >
                  <Typography variant="body1">{link.name}</Typography>
                </NavLink>
                {location.pathname === link.path && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-4px", // Adjust for spacing
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: "#1976d2",
                    }}
                  />
                )}
              </div>
            ))}
          </Grid>

          {/* Burger Icon - visible in small screens */}
          <Grid
            xs={1}
            lg={0}
            item
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>

          {/* Drawer for mobile view */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List sx={{ minWidth: "200px" }}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src="https://static.toiimg.com/thumb/imgsize-3008,msid-104855461,width-375,height-210,resizemode-75/104855461.jpg" // Placeholder for your logo
                  alt="Urban Cap Logo"
                  style={{ height: "auto", width: "100px", cursor: "pointer" }}
                  onClick={() => handleNavigate("/home")}
                />
              </Box>
              {navLinks.map((link) => (
                <ListItem
                  button
                  key={link.name}
                  onClick={() => handleNavigate(link.path)}
                  sx={{ textAlign: "center", cursor: "pointer" }}
                >
                  <ListItemText sx={{}}>
                    <NavLink
                      to={link.path}
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#1976d2" : "black",
                        fontWeight: 500,
                      })}
                    >
                      <Typography variant="body1">{link.name}</Typography>
                    </NavLink>
                  </ListItemText>
                </ListItem>
              ))}
              {/* Login/Register in Drawer */}
              {!isLoggedIn ? (
                <>
                  <ListItem
                    button
                    onClick={() => handleOpenModal("login")}
                    sx={{ textAlign: "center", cursor: "pointer" }}
                  >
                    <ListItemText primary={"Login"} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOpenModal('register')}
                    sx={{ textAlign: "center", cursor: "pointer" }}
                  >
                    <ListItemText primary={"Register"} />
                  </ListItem>
                </>
              ) : (
                <ListItem
                  button
                  onClick={() => handleOpenModal("logout")}
                  sx={{ textAlign: "center", cursor: "pointer" }}
                >
                  <ListItemText primary={"Logout"} />
                </ListItem>
              )}
            </List>
          </Drawer>

          {/* Currency Dropdown and Buttons */}
          <Grid
            item
            xs={4}
            lg={2}
            sx={{
              display: { xs: "none", lg: "flex" }, // Hidden on mobile, visible from SM onwards
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <SelectField
              fieldName="currency"
              formik={formik}
              options={[
                { value: "USD", label: "US Dollar" },
                { value: "CA", label: "Canada" },
              ]}
            />
            {!isLoggedIn && (
              <Grid item display="flex" gap={1}>
                <CommonButton label={"Login"} onClick={() => handleOpenModal("login")} />
                <CommonButton label={"Register"} onClick={() => handleOpenModal("register")} />
              </Grid>
            )}
            {isLoggedIn && (
              <Grid item>
                <CommonButton label={"Logout"} onClick={() => handleOpenModal("logout")} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
