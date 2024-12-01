import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import StatCard from "../components/dashboard/StatCard";
import { useNavigate } from "react-router-dom";

const UsersCards = ({ loading, stats }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid container xs={12} alignItems={"flex-start"} mb={4}>
        <Grid
          item
          container
          spacing={3}
          px={10}
          mt={1}
          alignItems={"flex-start"}
        >
          <Grid item xs={12}>
            <Typography
              fontSize={"2rem"}
              fontWeight={"bold"}
              sx={{ letterSpacing: 2.5 }}
            >
              Users
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <StatCard
              title="Normal Users"
              number={stats?.users}
              loading={loading}
              handleLClick={() =>
                navigate("/users?type=CUSTOMER", { state: { stats } })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <StatCard
              title="Service Providers"
              number={stats?.providers}
              loading={loading}
              handleLClick={() =>
                navigate("/users?type=SERVICE_PROVIDER", { state: { stats } })
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsersCards;
