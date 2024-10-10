import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import Input from "./form-fields/Input";

// Validation function
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const EmailVerificationModal = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/auth/verify-email", {
          email: values.email,
        });
        if (response.status === 200) {
          toast.success("Verification email sent");
          handleClose();
        }
      } catch (error) {
        toast.error("Error sending verification email");
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: "12px",
          boxShadow: 24,
          width: 500,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" component="h2">
          Email Verification Required
        </Typography>
        <Typography sx={{ mb: 2 }}>
          It looks like your account has not been verified yet. Please enter
          your email address below and we will send you a verification email to
          complete the process.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Input
            fieldName="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            formik={formik}
            width="100%"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Send Verification Email"
            )}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EmailVerificationModal;
