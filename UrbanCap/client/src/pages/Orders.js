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
  const [loading, setLoading] = useState(false);
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
      const response = await axios.get("/services/all/bookings");
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
                  order.serviceId
                    ? "Furniture Assembly"
                    : EVENTS_OBJ[order?.eventId?.eventType]?.label
                }
                bookedAt={order.startDate}
                onMoreDetails={() =>
                  handleOpen(order?.serviceId || order?.eventId)
                }
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {open && (
        <EventDetailsModal
          open={open}
          onClose={handleClose}
          eventData={eventData}
        />
      )}
    </PrivateLayout>
  );
};

export default Orders;
