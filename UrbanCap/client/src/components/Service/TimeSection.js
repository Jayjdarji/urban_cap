import React from "react";
import { ProductCard } from "../Styled";
import { CardContent, Typography } from "@mui/material";
import SelectField from "../form-fields/SelectField";
import { timeOptions } from "../../utils/data";

const TimeSection = ({ formik, date }) => {
  return (
    <ProductCard>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          Time
        </Typography>
        {date && (
          <SelectField
            formik={formik}
            fieldName={"time"}
            width="100%"
            options={timeOptions.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        )}
        {!date && (
          <Typography color="textSecondary" variant="body2" mt={1}>
            Please select a date first
          </Typography>
        )}
      </CardContent>
    </ProductCard>
  );
};

export default TimeSection;
