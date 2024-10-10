import {
  Box,
  Button,
  CircularProgress,
  Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "./form-fields/Input"; // Assuming Input component is reusable from your setup

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const onSubmit = async (values) => {
    const token = pathname.split("/")[2];
    try {
      const response = await axios.put("/auth/reset-password", {
        token,
        newPassword: values.password,
      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred, try again later",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          px: 5,
          py: 4,
          borderRadius: "12px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>Reset Password</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Input
            fieldName="password"
            label={"New Password"}
            placeholder={"* * * * * * "}
            type="password"
            formik={formik}
          />
          <Input
            fieldName="confirmPassword"
            label={"Confirm New Password"}
            placeholder={"* * * * * * "}
            type="password"
            formik={formik}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="medium"
            sx={{ mt: 3, borderRadius: "8px" }}
            loading={`${formik.isSubmitting}`}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {!formik.isSubmitting ? "Reset Password" : ""}
            {formik.isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              ""
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PasswordReset;
