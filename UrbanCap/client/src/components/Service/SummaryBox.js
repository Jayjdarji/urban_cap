import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CommonButton from "../form-fields/CommonButton";
import { SummaryBox } from "../Styled";
import { CITIES, PROVINCES } from "../../utils/data";

const SummaryBoxSection = ({
  formik,
  date,
  currency,
  totalCost,
  findLabel,
}) => {
  return (
    <SummaryBox elevation={3}>
      <Typography variant="h6">Order Summary</Typography>
      <Box p={1}>
        <Typography variant="body2">Date: {date || "Not selected"}</Typography>
        <Typography variant="body2">
          Time: {date ? formik.values.time || "Not selected" : "Not selected"}
        </Typography>
        <Typography variant="body2">
          Location:{" "}
          {formik.values.province
            ? `${findLabel(formik.values.province, PROVINCES)}, ${findLabel(
                formik.values.city,
                CITIES
              )}`
            : "Not selected"}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" color="#000">
        Total: {totalCost} {currency}
      </Typography>
      <CommonButton
        sx={{ mt: 2 }}
        label={"Continue"}
        onClick={formik.submitForm}
      />
    </SummaryBox>
  );
};

export default SummaryBoxSection;
