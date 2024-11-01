import { Grid } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServiceEventHeader from "../../common/Header";
import EventsTable from "../Events/EventsTable";
const EventDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventKey = params.get("eventKey");
  const [service, setService] = React.useState({});
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchService = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/event/${eventKey}`);
      setService(response.data.event);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [eventKey]);

  const fetchServiceDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/events/${eventKey}`);
      setOrders(response.data.events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [eventKey]);

  useEffect(() => {
    fetchService();
    fetchServiceDetails();
  }, [fetchService, fetchServiceDetails]);

  const handleToggle = async () => {
    try {
      await axios.get("/admin/event/toggle/" + eventKey);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item container spacing={3} px={10} mt={1} alignItems={"flex-start"}>
      <Grid item xs={12}>
        <ServiceEventHeader
          label={service?.label}
          active={service?.active}
          onToggle={handleToggle}
          loading={loading}
        />
        <EventsTable orders={orders} />
      </Grid>
    </Grid>
  );
};

export default EventDetails;
