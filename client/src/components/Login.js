import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useModal } from "../Context";
import EmailVerificationModal from "./EmailVerificationModal";
import Input from "./form-fields/Input";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required field";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required field";
  }
  return errors;
};

const Login = () => {
  const { openRegister, openResetPassword, closeLogin } = useModal();

  const [isNotVerified, setIsNotVerified] = useState(false);
  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/auth/signin", values);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        toast.success(response.data.message);
        formik.resetForm();
        closeLogin()
      }
    } catch (error) {
      if (error.response.data.notVerified) {
        setIsNotVerified(true);
      }
      toast.error(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit,
  });

  const handleClose = () => {
    setIsNotVerified(false);
  };

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
      <ClickAwayListener onClickAway={closeLogin}>
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
          <Typography sx={{ fontSize: "20px", mb: 1 }}>Login</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Input
              fieldName="email"
              label={"Email"}
              placeholder={"johndoe@gmail.com"}
              formik={formik}
            />
            <Input
              fieldName="password"
              label={"Password"}
              placeholder={"* * * * * * "}
              type="password"
              formik={formik}
            />
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              onClick={openResetPassword}
            >
              <Typography sx={{ textDecoration: "underline", color: "blue", cursor: 'pointer' }}>
                Forgot password?
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{ mt: 3, borderRadius: "8px" }}
              loading={formik.isSubmitting}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {!formik.isSubmitting && "Login"}
              {formik.isSubmitting && (
                <CircularProgress size={22} color="inherit" />
              )}
            </Button>
          </form>
          <Box sx={{ mt: 2, display: "flex", gap: 1 }} onClick={openRegister}>
            <Typography sx={{ textDecoration: "underline", color: "blue", cursor: 'pointer' }}>
              Don't have an account?
            </Typography>
          </Box>
        </Box>
      </ClickAwayListener>
      <EmailVerificationModal open={isNotVerified} handleClose={handleClose} />
    </Box>
  );
};

export default Login;
