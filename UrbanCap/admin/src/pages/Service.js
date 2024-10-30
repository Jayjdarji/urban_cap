import { Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServiceEventHeader from "../components/common/Header";
import { SERVICES_LABELS } from "../utils/data";
import axios from "axios";
import OrdersTable from "../components/dashboard/OrderTable";
const Service = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceKey = params.get("serviceKey");

  const [service, setService] = React.useState({});
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchService = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/${serviceKey}`);
      setService(response.data.service);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [serviceKey]);

  const fetchServiceDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/services/${serviceKey}`);
      setOrders(response.data.services);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [serviceKey]);

  useEffect(() => {
    fetchService();
    fetchServiceDetails();
  }, [fetchService, serviceKey]);

  return (
    <Grid item container spacing={3} px={10} mt={1} alignItems={"flex-start"}>
      <Grid item xs={12}>
        <ServiceEventHeader
          label={service.label}
          active={service.active}
          onToggle={() => {}}
          loading={loading}
        />
        <OrdersTable orders={orders} />
      </Grid>
    </Grid>
  );
};

export default Service;
