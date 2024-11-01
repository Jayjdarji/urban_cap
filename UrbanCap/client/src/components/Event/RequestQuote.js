import { Box, ClickAwayListener, Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useModal } from "../../Context";
import CommonButton from "../form-fields/CommonButton";
import Input from "../form-fields/Input";
import axios from "axios";
import { toast } from "react-toastify";

const RequestQuote = ({ numberOfPersons, eventKey }) => {
  const { closeRequestQuote, openLogin } = useModal();
  const isLoggedIn = localStorage.getItem("token");

  const onSubmit = async (values) => {
    try {
      if (!isLoggedIn) {
        openLogin();
        return;
      }
      const response = await axios.post("/events", {
        eventType: eventKey,
        numberOfPersons,
        date: new Date(),
        additionalRequests: values.others,
      });
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        closeRequestQuote();
      }
      formik.resetForm({
        others: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      others: "",
    },
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
      <ClickAwayListener onClickAway={closeRequestQuote}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
            px: 5,
            py: { xs: 2, md: 4 },
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  py: 2,
                  width: "100%",
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    fieldName="others"
                    label={"Additional Information"}
                    placeholder={"Add any specifics"}
                    formik={formik}
                    multiline
                    width="100%"
                  />
                  <CommonButton
                    label="Submit"
                    type="submit"
                    loading={formik.isSubmitting}
                    disabled={!formik.isValid || formik.isSubmitting}
                    sx={{ mt: 3, borderRadius: "8px", width: "100%" }} // Full width for button
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

export default RequestQuote;
