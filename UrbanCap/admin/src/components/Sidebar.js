import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;

const SidebarContents = [
  {
    label: "Services",
    children: [
      {
        label: "Furniture Assembly",
        link: "/service?serviceKey=furnitureAssembly",
      },
    ],
  },
  {
    label: "Events",
    children: [
      {
        label: "Mini Golf Round Robin",
        link: "/event-planning?eventKey=miniGolfRoundRobin",
      },
      {
        label: "Video Games Round Robin",
        link: "/event-planning?eventKey=videoGamesRoundRobin",
      },
      {
        label: "Indoor Rock Climbing",
        link: "/event-planning?eventKey=indoorRockClimbing",
      },
    ],
  },
];

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (link) => () => {
    navigate(link);
    setOpen(false);
  };

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
        <Divider sx={{ mt: 2 }} />
        <Box
          sx={{
            height: "500px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {SidebarContents.map((category) => (
            <Box key={category.label} sx={{ mt: 2 }}>
              <Typography fontWeight={"bold"} variant="h6">
                {category.label}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {category.children.map((child) => (
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      my: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      pb: 0.2,
                      "&:hover": {
                        textDecoration: "underline",
                        color: "blue",
                      },
                      transition: "all 0.1s ease-in",
                      cursor: "pointer",
                    }}
                    variant="body1"
                    onClick={handleNavigate(child.link)}
                  >
                    {child.label}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
          {/* <Box>
            <Typography fontWeight={"bold"} variant="h6">
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  pb: 0.2,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "blue",
                  },
                  transition: "all 0.1s ease-in",
                  cursor: "pointer",
                }}
                variant="body1"
              >
                Furniture Assembly
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography fontWeight={"bold"} variant="h6">
              Events
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  pb: 0.2,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "blue",
                  },
                  transition: "all 0.1s ease-in",
                  cursor: "pointer",
                }}
                variant="body1"
              >
                Mini Golf Round Robin
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  pb: 0.2,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "blue",
                  },
                  transition: "all 0.1s ease-in",
                  cursor: "pointer",
                }}
                variant="body1"
              >
                Video Games Round Robin
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  pb: 0.2,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "blue",
                  },
                  transition: "all 0.1s ease-in",
                  cursor: "pointer",
                }}
                variant="body1"
              >
                Indoor Rock Climbing
              </Typography>
            </Box>
          </Box> */}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
