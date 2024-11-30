import React, { useState } from "react";
import { ProductCard } from "../Styled";
import { CardContent, TextField, Typography } from "@mui/material";

const DateSection = ({ formik, date, setDate }) => {
  return (
    <ProductCard>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Date
        </Typography>
        {formik.values.city && (
          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={!formik.values.city}
          />
        )}
        {!formik.values.city && (
          <Typography color="textSecondary" variant="body2" mt={1}>
            Please select a district first
          </Typography>
        )}
      </CardContent>
    </ProductCard>
  );
};

export default DateSection;
