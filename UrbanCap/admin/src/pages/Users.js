import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UsersCards from "../components/UsersCards";
import Grid from "@mui/material/Grid";
import UsersTable from "../components/UsersTable";
import axios from "axios";

const Users = ({ loading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  useEffect(() => {
    if (!location?.state?.stats && !type) {
      navigate("/dashboard");
    }
  }, [location, navigate, type]);

  return (
    <Grid
      item
      container
      spacing={3}
      px={type ? 10 : "unset"}
      // mt={1}
      alignItems={"flex-start"}
    >
      <Grid item xs={12}>
        {type && <UsersTable type={type} />}
        {!type && (
          <UsersCards loading={loading} stats={location?.state?.stats || 0} />
        )}
      </Grid>
    </Grid>
  );
};

export default Users;
