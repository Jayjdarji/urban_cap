import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { useModal } from "../Context";
import Input from "./form-fields/Input"; // Assuming you have an Input component

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

const EmailVerificationModal = () => {
  const { closeEmailVerification, openLogin } = useModal();
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
          closeEmailVerification();
          openLogin();
        }
      } catch (error) {
        toast.error("Error sending verification email");
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
      <ClickAwayListener onClickAway={closeEmailVerification}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            px: 5,
            py: { xs: 2, md: 4 },
            width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" }, // Responsive width
          }}
        >
          <Typography variant="h6" component="h2">
            Email Verification Required
          </Typography>
          <Typography sx={{ mb: 2 }}>
            It looks like your account has not been verified yet. Please enter
            your email address below and we will send you a verification email
            to complete the process. You will have to login again
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
      </ClickAwayListener>
    </Box>
  );
};

export default EmailVerificationModal;
