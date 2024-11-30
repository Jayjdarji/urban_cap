import { Box } from "@mui/material";
import React from "react";
import FurnitureAssemblyForm from "../FurnitureAssembly";
import HomeCleaning from "../HomeCleaning";
import { useLocation } from "react-router-dom";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceKey = params.get("category");
  return (
    <Box sx={{}}>
      {serviceKey === "furnitureAssembly" && <FurnitureAssemblyForm />}
      {serviceKey === "homeCleaning" && <HomeCleaning />}
    </Box>
  );
};

export default index;
