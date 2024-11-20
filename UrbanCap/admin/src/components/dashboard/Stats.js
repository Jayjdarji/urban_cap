import { Grid, Typography } from "@mui/material";
import React from "react";
import StatCard from "./StatCard";

const Stats = ({ stats, loading }) => {
  return (
    <Grid item container spacing={3} px={10} mt={1} alignItems={"flex-start"}>
      <Grid item xs={12}>
        <Typography
          fontSize={"2rem"}
          fontWeight={"bold"}
          sx={{ letterSpacing: 2.5 }}
        >
          Stats
        </Typography>
      </Grid>
      {stats?.users !== null && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <StatCard
            title="Total Users"
            number={stats?.users}
            loading={loading}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <StatCard
          title="Services Booked"
          number={stats?.servicesBooked}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <StatCard
          title="Events Booked"
          number={stats?.events}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default Stats;
