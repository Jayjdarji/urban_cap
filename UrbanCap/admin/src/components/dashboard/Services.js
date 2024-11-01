import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const Services = ({ services, loading }) => {
  const [allServices, setAllServices] = useState([]);

  const navigate = useNavigate();
  const handleServiceClick = (serviceKey) => {
    navigate(`/service?serviceKey=${serviceKey}`);
  };

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get("/admin/all/services");
      setAllServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <Grid item container spacing={3} px={10} mt={1} alignItems={"flex-start"}>
      <Grid item xs={12}>
        <Typography
          fontSize={"2rem"}
          fontWeight={"bold"}
          sx={{ letterSpacing: 2.5 }}
        >
          Services
        </Typography>
      </Grid>
      {allServices.map((service) => (
        <Grid item key={service.serviceName} xs={12} sm={12} md={6} lg={4}>
          <CategoryCard
            title={service.label}
            totalBooked={services[service.serviceName]}
            loading={loading}
            moreDetailsClick={() => handleServiceClick(service.serviceName)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Services;
