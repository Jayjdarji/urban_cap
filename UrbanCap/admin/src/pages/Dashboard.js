import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import Services from "../components/dashboard/Services";
import Stats from "../components/dashboard/Stats";
import Events from "../components/dashboard/Events";

const Dashboard = () => {
  const [loading, setLoading] = React.useState(false);
  const [dashboardData, setDashboardData] = React.useState({
    users: 0,
    services: 0,
    events: 0,
    furnitureAssembly: 0,
    miniGolfCount: 0,
    videoGamesCount: 0,
    rockClimbingCount: 0,
  });
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid container xs={12} alignItems={"flex-start"} mb={4}>
        <Stats stats={dashboardData} loading={loading} />
        <Services services={dashboardData} loading={loading} />
        <Events events={dashboardData} loading={loading} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
