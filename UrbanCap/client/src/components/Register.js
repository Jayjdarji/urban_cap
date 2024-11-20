import {
  Box,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { useModal } from "../Context";
import CommonButton from "./form-fields/CommonButton";
import Input from "./form-fields/Input";
import { EVENTS } from "../utils/data";

const phoneRegex = /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

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

  // Check mobile number only if country code is +1 (US/Canada)
  if (!values.mobile) {
    errors.mobile = "Mobile number is a required field";
  } else if (values.countryCode === "US" || values.countryCode === "CA") {
    if (!phoneRegex.test(values.mobile)) {
      errors.mobile = "Please enter a valid 10-digit number";
    }
  }

  if (!values.password) {
    errors.password = "Password is a required field";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const Register = () => {
  const { openLogin, closeRegister } = useModal();

  const onSubmit = async (values) => {
    try {
      delete values.confirmPassword;

      if (values.userType !== "SERVICE_PROVIDER") {
        delete values.events;
      }

      const response = await axios.post("/auth/signup", values);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        formik.resetForm({
          name: "",
          email: "",
          password: "",
          mobile: "",
          confirmPassword: "",
          userType: "CUSTOMER",
          countryCode: "+1",
          events: ["miniGolfRoundRobin"],
        });
        closeRegister();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      confirmPassword: "",
      userType: "CUSTOMER",
      countryCode: "CA",
      events: ["miniGolfRoundRobin"],
    },
    validate,
    onSubmit,
  });

  const countryOptions = [
    { label: "Canada", value: "CA" },
    { label: "United States", value: "US" },
  ];

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
      <ClickAwayListener onClickAway={closeRegister}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            px: 5,
            py: { xs: 2, md: 4 },
            width: { xs: "90%", sm: "70%", md: "60%" }, // Responsive width
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
                  alt="Register"
                  src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?t=st=1728582974~exp=1728586574~hmac=591ce30777e2aac650a0b429165de50c80cff32073ecfbda4bca71419534051e&w=1380"
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
                    Create Your Account
                  </Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    fieldName="name"
                    label={"Name"}
                    placeholder={"John Doe"}
                    formik={formik}
                    width="100%"
                  />
                  <Input
                    fieldName="email"
                    label={"Email"}
                    type="email"
                    placeholder={"johndoe@gmail.com"}
                    formik={formik}
                    width="100%"
                  />
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <Input
                      label="Country"
                      fieldName="countryCode"
                      formik={formik}
                      options={countryOptions}
                      width="150px"
                      select
                    />
                    <Input
                      type="number"
                      fieldName="mobile"
                      label={"Mobile Number"}
                      placeholder={"9998887776"}
                      formik={formik}
                      width="100%"
                    />
                  </Box>
                  <FormControl sx={{ mt: 1 }}>
                    <FormLabel>User Type</FormLabel>
                    <RadioGroup
                      value={formik.values.userType}
                      row
                      onChange={(_, value) =>
                        formik.setFieldValue("userType", value)
                      }
                    >
                      <FormControlLabel
                        value="CUSTOMER"
                        control={<Radio />}
                        label="Customer"
                      />
                      <FormControlLabel
                        value="SERVICE_PROVIDER"
                        control={<Radio />}
                        label="Service Provider"
                      />
                    </RadioGroup>
                  </FormControl>
                  {formik.values.userType === "SERVICE_PROVIDER" && (
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                    >
                      <Input
                        label="Events"
                        fieldName="events"
                        formik={formik}
                        options={EVENTS}
                        width="100%"
                        select
                        multiple
                      />
                    </Box>
                  )}
                  <Input
                    fieldName="password"
                    label={"Password"}
                    placeholder={"* * * * * *"}
                    type="password"
                    formik={formik}
                    width="100%"
                  />
                  <Input
                    fieldName="confirmPassword"
                    label={"Confirm Password"}
                    placeholder={"* * * * * *"}
                    type="password"
                    formik={formik}
                    width="100%"
                  />
                  <CommonButton
                    label="Register"
                    type="submit"
                    loading={formik.isSubmitting}
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ mt: 3, borderRadius: "8px", width: "100%" }} // Full width for button
                  />
                </form>
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
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "300",
                    }}
                    onClick={openLogin}
                  >
                    Already have an account?
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default Register;
