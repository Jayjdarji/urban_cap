import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { EVENTS_IMAGE } from "../../utils/data";

const EventPlanning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);

  const isPlanningPage = useMemo(() => {
    return location.pathname === "/event-planning";
  }, [location.pathname]);

  const handleClick = (category) => () => {
    navigate(`/event-planning?category=${category}`);
  };

  const fetchEvents = async () => {
    const response = await axios.get("/events/all");
    const data = response.data;
    setEvents(data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      style={{
        padding: "20px",
        justifyContent: "center",
        minHeight: isPlanningPage ? "calc(100vh - 50px)" : "unset",
        alignItems: isPlanningPage ? "center" : "unset",
      }}
    >
      {events.map((event) => (
        <Grid
          item
          xs={12}
          md={3}
          key={event.label}
          onClick={handleClick(event.eventName)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
            },
            height: "max-content",
            transition: "all 0.3s ease",
          }}
        >
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              textAlign: "center",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={EVENTS_IMAGE[event.eventName]}
              alt={event.label}
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                {event.label}
              </Typography>
              <Button
                variant="text"
                style={{
                  color: "#3700f7",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Learn more
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventPlanning;
