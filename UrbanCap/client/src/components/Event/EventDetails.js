import { Box, Grid, Modal, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NumberInput from "../../components/form-fields/NumberInput";
import { EVENTS_OBJ } from "../../utils/data";
import CommonButton from "../form-fields/CommonButton";
import { useModal } from "../../Context";
import RequestQuote from "./RequestQuote";
import axios from "axios";
import Input from "../form-fields/Input";

const GameDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const { isRequestQuoteOpen, openRequestQuote, closeRequestQuote } =
    useModal();

  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { label, image, description, points } = EVENTS_OBJ[category];

  return (
    <Grid container sx={{ minHeight: "calc(100vh - 80px)" }}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 3, md: 6 },
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            padding: { xs: 3, md: 5 },
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, .5)",
            maxWidth: "420px",
            width: "100%",
            textAlign: "left",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Game Title */}
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              {label}
            </Typography>

            {/* Game Description */}
            <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
              {description}
            </Typography>

            {/* Features List (Optional) */}
            {points && (
              <Box component="ul" sx={{ paddingLeft: 2, mb: 3 }}>
                {points.map((point) => (
                  <Typography component="li" sx={{ mb: 1, fontSize: "1.1rem" }}>
                    {point}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          <NumberInput
            formik={formik}
            fieldName="quantity"
            min={1}
            max={100}
            InputProps={{ style: { color: "#000" } }}
            width="100%"
            btnColor="#000"
          />

          <CommonButton
            sx={{ mt: 2, color: "#000" }}
            width="77%"
            label={"Request Quote"}
            onClick={openRequestQuote}
          />
        </Box>

        <img
          alt={label}
          src={image}
          style={{
            width: "calc(100% - 50px)",
            height: "100%",
            position: "absolute",
            zIndex: -1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        />
      </Grid>
      <Modal open={isRequestQuoteOpen} onClose={closeRequestQuote}>
        <RequestQuote
          eventKey={category}
          numberOfPersons={formik.values.quantity}
        />
      </Modal>
    </Grid>
  );
};

export default GameDetails;
