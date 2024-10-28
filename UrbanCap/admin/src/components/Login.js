import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import CommonButton from "./form-fields/CommonButton";
import Input from "./form-fields/Input";

// Form validation logic
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is a required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is a required field";
  }
  return errors;
};

const Login = () => {
  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/auth/signin", values);

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          toast.success(response.data.message);
          formik.resetForm();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
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
        {/* Grid layout inside the modal */}
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
                alt="no-image"
                src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1728581018~exp=1728584618~hmac=e37a900101ee7ffe0540f83e8b39a10cb921fad99a0026e4125c5d3dead20dfc&w=1380"
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
                <img
                  src="https://static.toiimg.com/thumb/imgsize-3008,msid-104855461,width-375,height-210,resizemode-75/104855461.jpg"
                  alt="Urban Cap Logo"
                  style={{
                    width: "auto",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  sx={{ fontSize: "20px", letterSpacing: "1px", ml: 1 }}
                >
                  Urban Cap Admin
                </Typography>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  fieldName="email"
                  label="Email"
                  placeholder="johndoe@gmail.com"
                  formik={formik}
                  width="100%"
                />
                <Input
                  fieldName="password"
                  label="Password"
                  placeholder="* * * * * *"
                  type="password"
                  formik={formik}
                  width="100%"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "300",
                    }}
                    onClick={() => {}}
                  >
                    Forgot password?
                  </Typography>
                </Box>
                <CommonButton
                  label="Login"
                  type="submit"
                  loading={formik.isSubmitting}
                  disabled={!formik.isValid || formik.isSubmitting}
                />
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
