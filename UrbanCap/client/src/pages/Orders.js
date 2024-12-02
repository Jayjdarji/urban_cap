import axios from "axios";
import PrivateLayout from "../components/PrivateLayout";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PastOrderCard from "../components/Orders/PastOrderCard";
import { EVENTS_OBJ } from "../utils/data";
import EventDetailsModal from "../components/EventDetailsModal";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [, setLoading] = useState(false);
  const handleOpen = (eventData) => {
    setLoading(true);
    setEventData(eventData);
    setTimeout(() => {
      setOpen(true);
      setLoading(false);
    }, 1000);
  };

  const handleClose = (refetch = false) => {
    setEventData(null);
    setOpen(false);
    if (refetch) fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/common/bookings");
      setOrders(response.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateLayout>
      <Grid container spacing={3} px={10} mt={1}>
        <Grid item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={4}
            py={2}
            boxShadow={"0px 0px 30px rgba(0, 0, 0, .1)"}
            borderRadius={2}
          >
            {
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">
                  Orders and Requested Quotes
                </Typography>
              </Box>
            }
          </Box>
        </Grid>
        <Grid item container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={2.5}>
              <PastOrderCard
                type={
                  order.service
                    ? "Furniture Assembly"
                    : order.event
                    ? EVENTS_OBJ[order?.event?.eventType]?.label
                    : order.extraService.title
                }
                bookedAt={order.startDate}
                onMoreDetails={() => handleOpen(order)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {open && (
        <EventDetailsModal
          type={
            eventData.service
              ? "Furniture Assembly"
              : eventData.event
              ? EVENTS_OBJ[eventData?.event?.eventType]?.label
              : eventData.extraService.title
          }
          open={open}
          onClose={handleClose}
          eventData={
            eventData.service || eventData.event || eventData.extraService
          }
        />
      )}
    </PrivateLayout>
  );
};

export default Orders;
