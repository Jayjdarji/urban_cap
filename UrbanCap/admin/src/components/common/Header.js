import React, { useEffect, useState } from "react";
import { Box, Typography, Switch, Skeleton } from "@mui/material";

const ServiceEventHeader = ({ label, onToggle, loading, active }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(active);
  }, [active]);

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
    if (onToggle) {
      onToggle(!isEnabled);
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
      {!loading && (
        <Typography variant="h6" fontWeight="bold">
          {label}
        </Typography>
      )}
      {loading && (
        <Skeleton variant="text" width={100} height={38} animation="wave" />
      )}
      {!loading && (
        <Switch
          checked={isEnabled}
          onChange={handleToggle}
          color="primary"
          inputProps={{ "aria-label": `toggle ${label}` }}
        />
      )}
      {loading && (
        <Skeleton variant="text" width={100} height={38} animation="wave" />
      )}
    </Box>
  );
};

export default ServiceEventHeader;
