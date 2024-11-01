import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { EVENTS_OBJ } from "../../utils/data";
import CommonButton from "../form-fields/CommonButton";
import Input from "../form-fields/Input";

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First name is a required field";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is a required field";
  }

  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone number is a required field";
  } else if (!/^\d{10}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
  }

  if (values.dateOfEvent && !/^\d{4}-\d{2}-\d{2}$/.test(values.dateOfEvent)) {
    errors.dateOfEvent = "Invalid date format (YYYY-MM-DD)";
  }

  if (
    values.quoteDeadline &&
    !/^\d{4}-\d{2}-\d{2}$/.test(values.quoteDeadline)
  ) {
    errors.quoteDeadline = "Invalid date format (YYYY-MM-DD)";
  }

  if (values.numberOfAdults && isNaN(values.numberOfAdults)) {
    errors.numberOfAdults = "Please enter a valid number";
  }

  if (values.numberOfKids && isNaN(values.numberOfKids)) {
    errors.numberOfKids = "Please enter a valid number";
  }

  return errors;
};

const TeamBuilding = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      dateOfEvent: "",
      quoteDeadline: "",
      eventDetails: "",
      numberOfAdults: "",
      numberOfKids: "",
      venue: "",
      subscribe: false,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { label, image, description, points } = EVENTS_OBJ["teamBuilding"];

  return (
    <Grid container sx={{ minHeight: "calc(100vh - 80px)" }}>
      <Grid
        item
        md={6}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 3, md: 6 },
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            padding: { xs: 3, md: 5 },
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, .5)",
            maxWidth: "420px",
            width: "100%",
            textAlign: "left",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Game Title */}
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              {label}
            </Typography>

            {/* Game Description */}
            <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
              {description}
            </Typography>

            {/* Features List (Optional) */}
            {points && (
              <Box component="ul" sx={{ paddingLeft: 2, mb: 3 }}>
                {points.map((point) => (
                  <Typography component="li" sx={{ mb: 1, fontSize: "1.1rem" }}>
                    {point}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 3, md: 6 },
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            padding: { xs: 3, md: 5 },
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, .5)",
            width: "100%",
            maxHeight: "80vh",
            overflow: "auto",
            textAlign: "left",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Input
                label="First name*"
                fieldName="firstName"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Last name*"
                fieldName="lastName"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Email*"
                fieldName="email"
                type="email"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Phone number*"
                fieldName="phoneNumber"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Company name"
                fieldName="companyName"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Date of Event"
                fieldName="dateOfEvent"
                type="date"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Quote Deadline"
                fieldName="quoteDeadline"
                type="date"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Event Details"
                fieldName="eventDetails"
                multiline
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Approximate No. of Adults"
                fieldName="numberOfAdults"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Approximate No. of Kids"
                fieldName="numberOfKids"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
              <Input
                label="Venue"
                fieldName="venue"
                formik={formik}
                width="100%"
                labelColor="#000"
                borderColor="#000"
              />
            </Grid>
            <Divider sx={{ bgcolor: "#000", my: 2 }} />
            <Grid item xs={12}>
              <CommonButton label="Submit" type="submit" />
            </Grid>
          </form>
        </Box>
      </Grid>
      <img
        alt={label}
        src={image}
        style={{
          width: "calc(100% - 50px)",
          height: "100%",
          position: "absolute",
          zIndex: -1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
        }}
      />
    </Grid>
  );
};

export default TeamBuilding;
