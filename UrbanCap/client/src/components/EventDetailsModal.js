// EventDetailsModal.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
} from "@mui/material";
import { EVENTS_OBJ } from "../utils/data";
import CommonButton from "./form-fields/CommonButton";
import axios from "axios";

const EventDetailsModal = ({ open, onClose, eventData }) => {
  if (!eventData) return <Typography>No event data available.</Typography>;

  const { _id, eventType, userId, numberOfPersons, date, additionalRequests } =
    eventData;

  const formattedDate = new Date(date).toLocaleString(); // Format the date as per your needs

  const handleCancel = async (id) => {
    try {
      if (
        eventType === "miniGolfRoundRobin" ||
        eventType === "videoGamesRoundRobin" ||
        eventType === "indoorRockClimbing"
      ) {
        await axios.post(`/events/cancel`, { id });
      } else {
        await axios.post(`/services/cancel`, { id });
      }
      onClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Event Details</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Event ID:</strong> {_id}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Event Type:</strong>{" "}
          {EVENTS_OBJ[eventType]?.label || "Furniture Assembly"}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>User ID:</strong> {userId}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Number of Persons:</strong> {numberOfPersons}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Date:</strong> {formattedDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Additional Requests:</strong> {additionalRequests}
        </Typography>
        <Divider />
      </DialogContent>
      <DialogActions>
        {!eventData.active && (
          <CommonButton
            color="red"
            sx={{
              borderColor: "red",
              "&:hover": {
                boxShadow: "0px 0px 5px red",
                border: "none",
              },
            }}
            onClick={() => handleCancel(eventData._id)}
            label={"Cancel Booking"}
          />
        )}
        {eventData.active === "Accepted" && (
          <CommonButton
            color="green"
            sx={{
              borderColor: "green",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            label={"Accepted"}
          />
        )}
        {eventData.active === "Rejected" && (
          <CommonButton
            color="red"
            sx={{
              borderColor: "red",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            label={"Rejected"}
          />
        )}
        {eventData.active === "Cancelled" && (
          <CommonButton
            color="red"
            sx={{
              borderColor: "red",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            label={"Cancelled"}
          />
        )}
        <CommonButton onClick={onClose} label="Close" />
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
