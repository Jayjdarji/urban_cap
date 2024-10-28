import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

const Input = ({
  key,
  label,
  placeholder,
  fieldName,
  type = "text",
  width = "300px",
  variant = "outlined",
  multiline = false,
  formik,
  InputProps = {},
  fieldStyle = {},
  select = false,
  options = [],
  labelColor = "#8c8c8c",
  borderColor = "#D8D2C2",
}) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const isError = useMemo(
    () => errors[fieldName] && touched[fieldName],
    [errors, touched, fieldName]
  );

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Grid item container sx={{ width, my: 0.5 }}>
      {label && (
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "15px",
              marginBottom: "8px",
              color: labelColor,
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
          boxShadow: isFocused ? "0 0 10px #343131" : "none",
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        <TextField
          select={select}
          placeholder={placeholder}
          variant={variant}
          type={type}
          id={key}
          name={fieldName}
          value={values[fieldName]}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          size="small"
          multiline={multiline}
          fullWidth
          SelectProps={{
            MenuProps: { disablePortal: true },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: borderColor,
                borderRadius: "10px",
              },
              "&:hover fieldset": {
                borderColor: borderColor,
              },

              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "1rem",
              padding: "10px 15px",
            },
            ...fieldStyle,
          }}
          InputProps={InputProps}
        >
          {select &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
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

export default Input;
