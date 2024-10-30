import { Grid, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";

const Services = ({ services, loading }) => {
  const navigate = useNavigate();
  const handleServiceClick = (serviceKey) => {
    navigate(`/service?serviceKey=${serviceKey}`);
  };
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
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <CategoryCard
          title="Furniture Assembly"
          totalBooked={services.furnitureAssembly}
          loading={loading}
          moreDetailsClick={() => handleServiceClick("furnitureAssembly")}
        />
      </Grid>
    </Grid>
  );
};

export default Services;
