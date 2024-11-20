import { Grid, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";

const Events = ({ events, loading }) => {
  const navigate = useNavigate();
  const handleEventClick = (eventKey) => {
    navigate(`/event-planning?eventKey=${eventKey}`);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";
  const providerEvents = user?.events;

  return (
    <Grid item container spacing={3} px={10} mt={1} alignItems={"flex-start"}>
      <Grid item xs={12}>
        <Typography
          fontSize={"2rem"}
          fontWeight={"bold"}
          sx={{ letterSpacing: 2.5 }}
        >
          Events
        </Typography>
      </Grid>
      {(isAdmin || providerEvents.includes("miniGolfRoundRobin")) && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CategoryCard
            title="Mini Golf Round Robin"
            totalBooked={events.miniGolfCount}
            loading={loading}
            moreDetailsClick={() => handleEventClick("miniGolfRoundRobin")}
          />
        </Grid>
      )}
      {(isAdmin || providerEvents.includes("videoGamesRoundRobin")) && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CategoryCard
            title="Video Games Round Robin"
            totalBooked={events.videoGamesCount}
            loading={loading}
            moreDetailsClick={() => handleEventClick("videoGamesRoundRobin")}
          />
        </Grid>
      )}
      {(isAdmin || providerEvents.includes("indoorRockClimbing")) && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CategoryCard
            title="Indoor Rock Climbing"
            totalBooked={events.rockClimbingCount}
            loading={loading}
            moreDetailsClick={() => handleEventClick("indoorRockClimbing")}
          />
        </Grid>
      )}
      {(isAdmin || providerEvents.includes("teamBuilding")) && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CategoryCard
            title="Team Building"
            totalBooked={events.teamBuilding}
            loading={loading}
            moreDetailsClick={() => handleEventClick("teamBuilding")}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Events;
