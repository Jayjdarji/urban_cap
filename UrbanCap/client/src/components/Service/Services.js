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
import { SERVICES_IMAGE } from "../../utils/data";

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const response = await axios.get("/services/all");
    const data = response.data;
    setServices(data.services);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const isServicesPage = useMemo(() => {
    return location.pathname === "/service";
  }, [location.pathname]);

  const handleClick = (category) => () => {
    navigate(`/service?category=${category}`);
  };

  return (
    <Grid
      container
      spacing={3}
      style={{
        padding: "20px",
        justifyContent: "center",
        minHeight: isServicesPage ? "calc(100vh - 50px)" : "unset",
        alignItems: isServicesPage ? "center" : "unset",
      }}
    >
      {services.map((category) => (
        <Grid
          item
          xs={12}
          md={3}
          key={category.label}
          onClick={handleClick(category.serviceName)}
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
              image={SERVICES_IMAGE[category.serviceName]}
              alt={category.label}
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                {category.label}
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
      {!services.length && (
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              textAlign: "center",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                No services available
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                There are no services available at this time. Please try again
                later.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default Services;
