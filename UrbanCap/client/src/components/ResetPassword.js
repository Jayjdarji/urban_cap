import { Box, ClickAwayListener, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { useModal } from "../Context";
import CommonButton from "./form-fields/CommonButton";
import Input from "./form-fields/Input";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is a required field";
  }
  return errors;
};

const ResetPassword = () => {
  const { closeResetPassword, openLogin } = useModal();
  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/auth/email-reset-password", {
        email: values.email,
      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        closeResetPassword();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error sending password reset email",
        {
          position: "top-right",
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
            flexDirection: "row",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            px: 5,
            py: { xs: 2, md: 4 },
            width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" }, // Responsive width
          }}
        >
          <Grid container>
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
                  alt="Reset Password"
                  src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1010.jpg?t=st=1728582259~exp=1728585859~hmac=6defc6edafaed94d0ce93cfcfdb56abe2abfc948233ba5c2f25e4c2e66388bc7&w=1380"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </Box>
            </Grid>

            {/* Right Side Form */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "20px", mb: 3 }}>
                Forgot Your Password
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    fieldName="email"
                    label={"Email"}
                    placeholder={"johndoe@gmail.com"}
                    formik={formik}
                    width="100%"
                  />
                  <CommonButton
                    label="Reset Password"
                    type="submit"
                    loading={formik.isSubmitting}
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ mt: 3, borderRadius: "8px", width: "100%" }} // Full width for button
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "300",
                      }}
                      onClick={openLogin}
                    >
                      Back to Login
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default ResetPassword;
