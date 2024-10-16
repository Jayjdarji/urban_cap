import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import IronIcon from "@mui/icons-material/Iron";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

const ExtraServices = () => {
  const [activeTab, setActiveTab] = useState("homeCleaning");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const services = {
    homeCleaning: [
      {
        ICON: CleaningServicesIcon,
        title: "Window cleaning",
        description:
          "Clean your windows and mirrors with our professional cleaning services. We use only the highest quality cleaning products to ensure your home is spotless and sparkling clean.",
      },
      {
        ICON: KitchenIcon,
        title: "Inside fridge",
        description:
          "Clean your fridge and freezer with our professional cleaning services. We use only the highest quality cleaning products to ensure your fridge is spotless and sparkling clean.",
      },
      {
        ICON: LocalLaundryServiceIcon,
        title: "Laundry",
        description:
          "Keep your clothes clean and fresh with our professional laundry services. We use only the highest quality cleaning products to ensure your clothes are spotless and sparkling clean.",
      },
      {
        ICON: IronIcon,
        title: "Ironing",
        description:
          "Keep your clothes clean and fresh with our professional ironing services. We use only the highest quality cleaning products to ensure your clothes are spotless and sparkling clean.",
      },
      {
        ICON: StoreMallDirectoryIcon,
        title: "Inside cabinets",
        description:
          "Clean your cabinets and drawers with our professional cleaning services. We use only the highest quality cleaning products to ensure your cabinets are spotless and sparkling clean.",
      },
    ],
    endOfTenancy: [
      {
        ICON: IronIcon,
        title: "Ironing",
        description:
          "Keep your clothes clean and fresh with our professional ironing services. We use only the highest quality cleaning products to ensure your clothes are spotless and sparkling clean.",
      },
      {
        ICON: KitchenIcon,
        title: "Inside fridge",
        description:
          "Clean your fridge and freezer with our professional cleaning services. We use only the highest quality cleaning products to ensure your fridge is spotless and sparkling clean.",
      },
      {
        ICON: CleaningServicesIcon,
        title: "Window cleaning",
        description:
          "Clean your windows and mirrors with our professional cleaning services. We use only the highest quality cleaning products to ensure your home is spotless and sparkling clean.",
      },
      {
        ICON: LocalLaundryServiceIcon,
        title: "Laundry",
        description:
          "Keep your clothes clean and fresh with our professional laundry services. We use only the highest quality cleaning products to ensure your clothes are spotless and sparkling clean.",
      },

      {
        ICON: StoreMallDirectoryIcon,
        title: "Inside cabinets",
        description:
          "Clean your cabinets and drawers with our professional cleaning services. We use only the highest quality cleaning products to ensure your cabinets are spotless and sparkling clean.",
      },
    ],
    businessCleaning: [
      {
        ICON: CleaningServicesIcon,
        title: "Window cleaning",
        description:
          "Clean your windows and mirrors with our professional cleaning services. We use only the highest quality cleaning products to ensure your home is spotless and sparkling clean.",
      },
      {
        ICON: KitchenIcon,
        title: "Inside fridge",
        description:
          "Clean your fridge and freezer with our professional cleaning services. We use only the highest quality cleaning products to ensure your fridge is spotless and sparkling clean.",
      },
      {
        ICON: LocalLaundryServiceIcon,
        title: "Laundry",
        description:
          "Keep your clothes clean and fresh with our professional laundry services. We use only the highest quality cleaning products to ensure your clothes are spotless and sparkling clean.",
      },
      {
        ICON: IronIcon,
        title: "Ironing",
        description:
          "Keep your clothes clean and fresh with our professional ironing services. We use only the highest quality cleaning products to ensure your clothes are spotless and sparkling clean.",
      },
      {
        ICON: StoreMallDirectoryIcon,
        title: "Inside cabinets",
        description:
          "Clean your cabinets and drawers with our professional cleaning services. We use only the highest quality cleaning products to ensure your cabinets are spotless and sparkling clean.",
      },
    ],
  };

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
            value="homeCleaning"
            label="Home cleaning"
            sx={{ textTransform: "none", fontSize: "1.2rem" }}
          />
          <Tab
            value="endOfTenancy"
            label="End of tenancy"
            sx={{ textTransform: "none", fontSize: "1.2rem" }}
          />
          <Tab
            value="businessCleaning"
            label="Business cleaning"
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
              }}
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
