import React from "react";
import { ProductCard } from "../Styled";
import { CardContent, Typography } from "@mui/material";
import SelectField from "../form-fields/SelectField";
import { CITIES, PROVINCES } from "../../utils/data";

const Location = ({ formik }) => {
  return (
    <ProductCard>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Locations
        </Typography>
        <SelectField
          fieldName="province"
          formik={formik}
          options={PROVINCES}
          width="100%"
        />
        {formik.values.province && (
          <SelectField
            fieldName="city"
            formik={formik}
            options={CITIES[formik.values.province]}
            width="100%"
          />
        )}
      </CardContent>
    </ProductCard>
  );
};

export default Location;
