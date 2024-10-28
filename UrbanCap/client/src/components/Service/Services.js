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

const data = [
  {
    label: "Furniture Assembly",
    image:
      "https://t3.ftcdn.net/jpg/01/82/83/38/240_F_182833843_a3bRcdEWRRNJLABRuc09pJqwU8Jo8n3Y.jpg",
    value: "furniture-assembly",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      {data.map((category) => (
        <Grid
          item
          xs={12}
          md={3}
          key={category.label}
          onClick={handleClick(category.value)}
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
              image={category.image}
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
    </Grid>
  );
};

export default Services;
