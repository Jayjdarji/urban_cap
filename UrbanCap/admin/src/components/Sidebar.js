import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Typography } from "@mui/material";
import React from "react";

const drawerWidth = 300;

const Sidebar = ({ open, setOpen }) => {
  return (
    <Drawer
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2, mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{}}>
            Urban Cap
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
        </Box>
        <Box
          sx={{
            height: "500px",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>IN PROGRESS</Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
