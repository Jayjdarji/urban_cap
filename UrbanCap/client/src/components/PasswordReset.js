import { Box, ClickAwayListener, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CommonButton from "./form-fields/CommonButton";
import Input from "./form-fields/Input";
import { useLocation, useNavigate } from "react-router-dom";

// Form validation logic
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
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  // Formik hook
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      const token = pathname.split("/")[2];
      try {
        const response = await axios.put("/auth/reset-password", {
          token,
          newPassword: values.password,
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          formik.resetForm();
          navigate('/')
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred, try again later"
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClickAwayListener
        onClickAway={() => {
          /* Close logic */
        }}
      >
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
          <Grid container spacing={2}>
            {/* Left Side Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: { md: "flex", xs: "none" },
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  alt="no-image"
                  src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7896.jpg?t=st=1728583706~exp=1728587306~hmac=9924151c9486fe1902fb2aaa6012cbed5f0aec639bcf23f51957b5c7604e7678&w=1380"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </Box>
            </Grid>

            {/* Right Side Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pl: { lg: 4, xs: 0 },
                  py: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{ fontSize: "20px", letterSpacing: "1px", ml: 1 }}
                  >
                    Reset Your Password
                  </Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    fieldName="password"
                    label={"New Password"}
                    placeholder={"* * * * * *"}
                    type="password"
                    formik={formik}
                    width="100%"
                  />
                  <Input
                    fieldName="confirmPassword"
                    label={"Confirm New Password"}
                    placeholder={"* * * * * *"}
                    type="password"
                    formik={formik}
                    width="100%"
                  />
                  <CommonButton
                    label="Update"
                    type="submit"
                    loading={isLoading}
                    disabled={!formik.isValid || isLoading}
                    sx={{ mt: 3 }}
                  />
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default PasswordReset;
