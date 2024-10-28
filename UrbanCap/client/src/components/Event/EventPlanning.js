import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EVENTS_DATA } from "../../utils/data";

const EventPlanning = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPlanningPage = useMemo(() => {
    return location.pathname === "/event-planning";
  }, [location.pathname]);

  const handleClick = (category) => () => {
    navigate(`/event-planning?category=${category}`);
  };

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
      {EVENTS_DATA.map((event) => (
        <Grid
          item
          xs={12}
          md={3}
          key={event.label}
          onClick={handleClick(event.value)}
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
              image={event.image}
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
