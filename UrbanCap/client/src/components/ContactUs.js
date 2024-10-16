import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "./form-fields/Input"; // Import your Input component
import { useModal } from "../Context";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is a required field";
  }
  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.message) {
    errors.message = "Message is a required field";
  }
  return errors;
};

const ContactUs = () => {
  const {closeContactUs} = useModal()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/contact/submit", values);
        if (response.status === 200) {
          toast.success("Your message has been sent successfully!");
          formik.resetForm();
        }
      } catch (error) {
        toast.error("Failed to send message. Please try again later.");
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClickAwayListener onClickAway={closeContactUs}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 5,
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Contact Us
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Input
              fieldName="name"
              label="Name"
              placeholder="Your Name"
              formik={formik}
            />
            <Input
              fieldName="email"
              label="Email"
              placeholder="yourname@example.com"
              formik={formik}
            />
            <Input
              fieldName="message"
              label="Message"
              placeholder="Write your message here"
              multiline
              rows={4}
              formik={formik}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 3, borderRadius: "8px" }}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!formik.isSubmitting ? "Submit" : <CircularProgress size={22} color="inherit" />}
            </Button>
          </form>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default ContactUs;
