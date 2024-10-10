import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import React from "react";
import Input from "./form-fields/Input";
import { useModal } from "../Context";
import axios from "axios";
import { toast } from "react-toastify";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required field";
  }
  return errors;
};

const ResetPassword = () => {
  const { closeResetPassword } = useModal();
  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/auth/email-reset-password', {
        email: values.email,
      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
        });
        closeResetPassword()
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error sending password reset email',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit,
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
      <ClickAwayListener onClickAway={closeResetPassword}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 5,
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6">Send Password Verification</Typography>
          <Typography variant="body1">Send Password Verification</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Input
              fieldName="email"
              label={"Email"}
              placeholder={"johndoe@gmail.com"}
              formik={formik}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 3, borderRadius: "8px" }}
              loading={formik.isSubmitting}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {!formik.isSubmitting && "Verify Email"}
              {formik.isSubmitting && (
                <CircularProgress size={22} color="inherit" />
              )}
            </Button>
          </form>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default ResetPassword;
