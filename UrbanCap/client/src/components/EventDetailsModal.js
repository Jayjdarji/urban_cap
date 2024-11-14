// EventDetailsModal.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { EVENTS_OBJ } from "../utils/data";

const EventDetailsModal = ({ open, onClose, eventData }) => {
  if (!eventData) return <Typography>No event data available.</Typography>;

  console.log("🔊🔊🔊🔊🔊🔊 ~ EventDetailsModal ~ eventData:", eventData);
  const {
    _id,
    eventType,
    userId,
    numberOfPersons,
    date,
    additionalRequests,
    serviceName,
  } = eventData;

  const formattedDate = new Date(date).toLocaleString(); // Format the date as per your needs

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
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
