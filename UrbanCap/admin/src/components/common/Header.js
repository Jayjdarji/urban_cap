import React, { useEffect, useState } from "react";
import { Box, Typography, Switch, Skeleton } from "@mui/material";
import Return from "./Return";

const ServiceEventHeader = ({ label, onToggle, loading, active }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    setIsEnabled(active);
  }, [active]);

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={2}
      boxShadow={"0px 0px 30px rgba(0, 0, 0, .1)"}
      borderRadius={2}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Return />
        {!loading && (
          <Typography variant="h6" fontWeight="bold">
            {label}
          </Typography>
        )}
      </Box>
      {loading && (
        <Skeleton variant="text" width={100} height={38} animation="wave" />
      )}
      {isAdmin && !loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle1">
            {isEnabled ? "Enabled" : "Disabled"} on the Client Side
          </Typography>
          <Switch
            checked={isEnabled}
            onChange={handleToggle}
            color="primary"
            inputProps={{ "aria-label": `toggle ${label}` }}
          />
        </Box>
      )}
      {isAdmin && loading && (
        <Skeleton variant="text" width={100} height={38} animation="wave" />
      )}
    </Box>
  );
};

export default ServiceEventHeader;
