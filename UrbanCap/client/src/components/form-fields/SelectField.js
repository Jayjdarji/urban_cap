import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";

const SelectField = ({
  label,
  fieldName,
  formik,
  width = "150px",
  variant = "outlined",
  options = [],
  fieldStyle = {},
  defaultValue = "",
  wrapperStyle = {},
}) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formik;
  const isError = useMemo(
    () => errors[fieldName] && touched[fieldName],
    [errors, touched, fieldName]
  );

  useEffect(() => {
    if (!values[fieldName]) {
      setFieldValue(fieldName, defaultValue);
    }
  }, [fieldName, setFieldValue, defaultValue, values]);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Grid item container sx={{ width, my: 0.5 }}>
      {label && (
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "15px",
              marginBottom: "8px",
              color: "#8c8c8c",
              fontWeight: "500",
            }}
          >
            {label}
          </Typography>
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid black",
          transition: "box-shadow 0.3s ease-in-out",
          width: "fit-content",
          ...wrapperStyle,
        }}
        onClick={handleClick}
      >
        <FormControl fullWidth>
          <Select
            value={values[fieldName]}
            onChange={handleChange}
            onBlur={(e) => {
              handleBlur(e);
            }}
            name={fieldName}
            variant={variant}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                  borderRadius: "10px",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
              },
              "& .MuiSelect-select": {
                fontSize: "1rem",
                padding: "8px 15px",
                borderRadius: "10px",
                border: "none",
                outline: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.Mui-focused": {
                boxShadow: "none",
              },
              "& .MuiSelect-icon": {
                color: "black",
              },
              ...fieldStyle,
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Error Message */}
      {isError && (
        <Typography color="error" sx={{ fontSize: "0.8rem", marginTop: 1 }}>
          {errors[fieldName]}
        </Typography>
      )}
    </Grid>
  );
};

export default SelectField;
