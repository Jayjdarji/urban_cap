import { Add, Remove } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

const NumberInput = ({
  label,
  fieldName,
  placeholder = "",
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  width = "300px",
  formik,
  InputProps = {},
  fieldStyle = {},
  btnColor = "#000",
}) => {
  const { values, errors, touched, setFieldValue } = formik;
  const [isFocused, setIsFocused] = useState(false);
  const isError = useMemo(
    () => errors[fieldName] && touched[fieldName],
    [errors, touched, fieldName]
  );

  // Increment and Decrement handlers
  const handleIncrement = () => {
    const newValue = Math.min(values[fieldName] + step, max);
    setFieldValue(fieldName, newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(values[fieldName] - step, min);
    setFieldValue(fieldName, newValue);
  };

  return (
    <Grid item container sx={{ width, my: 0.5 }}>
      {/* Label */}
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

      {/* Number Input with Increment/Decrement Buttons */}
      <Grid
        item
        xs={12}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: isFocused ? "0 0 10px #343131" : "none",
          transition: "box-shadow 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={handleDecrement}
          disabled={values[fieldName] <= min}
        >
          <Remove sx={{ color: btnColor }} />
        </IconButton>

        <TextField
          type="number"
          variant="outlined"
          name={fieldName}
          value={values[fieldName]}
          placeholder={placeholder}
          onChange={(e) => setFieldValue(fieldName, Number(e.target.value))}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          fullWidth
          size="small"
          inputProps={{ min, max, step }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000",
                borderRadius: "10px",
              },
              "&:hover fieldset": {
                borderColor: "#000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "1rem",
              padding: "10px 15px",
              textAlign: "center",
            },
            ...fieldStyle,
          }}
          InputProps={InputProps}
        />

        <IconButton
          onClick={handleIncrement}
          disabled={values[fieldName] >= max}
        >
          <Add sx={{ color: btnColor }} />
        </IconButton>
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

export default NumberInput;
