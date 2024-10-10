import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useModal } from "../Context";
import Input from "./form-fields/Input";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required field";
  }
  if (!values.email) {
    errors.email = "Email is required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile number is required field";
  } else {
    if (values.mobile.toString().length < 10) {
      errors.mobile = "Mobile number should consist at least 10 digits";
    }
  }
  if (!values.password) {
    errors.password = "Password is required field";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};

const Register = () => {
  const navigate = useNavigate();
  const { openLogin, closeRegister } = useModal();

  const onSubmit = async (values) => {
    try {
      delete values.confirmPassword;
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
        });
        closeRegister()
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
      <ClickAwayListener onClickAway={closeRegister}>
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
          <Typography sx={{ fontSize: "20px", mb: 1 }}>Register</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Input
              fieldName="name"
              label={"Name"}
              placeholder={"John Doe"}
              formik={formik}
            />
            <Input
              fieldName="email"
              label={"Email"}
              type="email"
              placeholder={"johndoe@gmail.com"}
              formik={formik}
            />
            <Input
              type="number"
              fieldName="mobile"
              label={"Mobile Number"}
              placeholder={"9998887776"}
              formik={formik}
            />
            <FormControl sx={{ mt: 1 }}>
              <FormLabel>User type</FormLabel>
              <RadioGroup
                defaultValue={formik.values.userType}
                row
                onChange={(_, value) => formik.setFieldValue("userType", value)}
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
            <Input
              fieldName="password"
              label={"Password"}
              placeholder={"* * * * * * "}
              type="password"
              formik={formik}
            />
            <Input
              fieldName="confirmPassword"
              label={"Confirm Password"}
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
              {!formik.isSubmitting ? "Register" : ""}
              {formik.isSubmitting ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                ""
              )}
            </Button>
          </form>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }} onClick={openLogin}>
            <Typography sx={{ textDecoration: "underline", color: "blue", cursor: 'pointer' }}>Already have an account?</Typography>
          </Box>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default Register;
