import KitchenIcon from "@mui/icons-material/Kitchen";
import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import WorkIcon from "@mui/icons-material/Work";
const ExtraServices = () => {
  const [activeTab, setActiveTab] = useState("endOfTenancy");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const services = {
    endOfTenancy: [
      {
        ICON: ExitToAppIcon,
        title: "Full apartment cleaning",
        description:
          "Thorough cleaning of your apartment, including floors, walls, and all surfaces, ensuring it is ready for the next tenant.",
      },
      {
        ICON: CheckroomIcon,
        title: "Wardrobe organization",
        description:
          "Organize and clean your wardrobes to leave them spotless and neatly arranged for the next use.",
      },
      {
        ICON: PlumbingIcon,
        title: "Bathroom sanitization",
        description:
          "Deep cleaning and sanitization of your bathroom to ensure it is sparkling clean and hygienic.",
      },
    ],
    businessCleaning: [
      {
        ICON: WorkIcon,
        title: "Desk and cubicle cleaning",
        description:
          "Clean and sanitize desks and cubicles, creating a spotless and professional workspace.",
      },
      {
        ICON: MeetingRoomIcon,
        title: "Meeting room cleaning",
        description:
          "Deep cleaning of meeting rooms to ensure they are ready for important discussions and presentations.",
      },
      {
        ICON: KitchenIcon,
        title: "Pantry cleaning",
        description:
          "Thorough cleaning of the pantry area, including appliances and surfaces, ensuring hygiene and cleanliness.",
      },
    ],
  };
  const handleClick = (title) => {};

  return (
    <Box
      sx={{
        marginTop: "50px",
        backgroundColor: "#4A00E0",
        padding: "40px",
        color: "white",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Extra Services, Extra Convenience
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginBottom: "20px" }}>
        Easily add extra services to your booking by choosing from a variety of
        options tailored to your needs, all with just a few clicks.
      </Typography>

      {/* Tabs */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab
            value="endOfTenancy"
            label="End of tenancy"
            sx={{ textTransform: "none", fontSize: "1.2rem" }}
          />
          <Tab
            value="businessCleaning"
            label="Business"
            sx={{ textTransform: "none", fontSize: "1.2rem" }}
          />
        </Tabs>
      </Box>

      {/* Extra Services Grid */}
      <Grid container spacing={3} justifyContent="center">
        {services[activeTab].map(({ ICON, title }) => (
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: "15px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                color: "#4A00E0",
                cursor: "pointer",
              }}
              onClick={() => handleClick(title)}
            >
              <ICON sx={{ marginRight: "10px", fontSize: "2rem" }} />
              <Typography variant="h6">{title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExtraServices;
