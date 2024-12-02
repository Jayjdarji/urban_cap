import { Box, ClickAwayListener, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import CommonButton from "./form-fields/CommonButton";
import Input from "./form-fields/Input";
import Location from "./Service/Location";
import TimeSection from "./Service/TimeSection";
import { useModal } from "../Context";

// Form validation logic
const validate = (values) => {
  const errors = {};
  if (!values.date?.length) {
    errors.email = "Date is a required field";
  } else if (new Date(values.date) < new Date()) {
    errors.date = "Date should be in future";
  }
  if (!values.province) {
    errors.province = "Province is a required field";
  }
  if (!values.city) {
    errors.city = "City is a required field";
  }
  if (!values.time) {
    errors.time = "Time Slot is required field";
  }
  return errors;
};

const ExtraServiceModal = ({ handleClose, title }) => {
  const token = localStorage.getItem("token");
  const { openLogin } = useModal();
  // Formik hook
  const formik = useFormik({
    initialValues: {
      date: "",
      province: "",
      city: "",
      time: "",
    },
    validate,
    onSubmit: async (values) => {
      if (!token) {
        openLogin();
        return;
      }
      try {
        const response = await axios.post("/common/extraServices", {
          title,
          ...values,
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          formik.resetForm();
        }
        if (response.status === 400) {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response?.data?.notVerified) {
        }
        toast.error(error.response?.data?.message || "An error occurred");
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          background: "gray",
          opacity: 0.8,
          position: "absolute",
          zIndex: 1,
        }}
      ></Box>
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
          zIndex: 2,
        }}
      >
        {/* Grid layout inside the modal */}
        <Grid container>
          {/* Right Side Form */}
          <Grid item xs={12}>
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
                  justifyContent: "space-between",
                }}
              >
                <>
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
                    {title}
                  </Typography>
                </>
                <CommonButton
                  width="max-content"
                  label={"Close"}
                  onClick={handleClose}
                />
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Input
                  fieldName="date"
                  label="Date"
                  type="date"
                  formik={formik}
                  width="100%"
                />
                <Location formik={formik} />
                <TimeSection formik={formik} date={formik.values.date} />
                <CommonButton
                  sx={{ mt: 2 }}
                  label="Submit"
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

export default ExtraServiceModal;
