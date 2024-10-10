import { Box, TextField, Typography } from "@mui/material";
import React, { useMemo } from "react";

const Input = ({
  key,
  label,
  placeholder,
  fieldName,
  type = "text",
  width = "300px",
  variant = "filled",
  multiline = false,
  formik,
}) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const isError = useMemo(
    () => errors[fieldName] && touched[fieldName],
    [errors, touched, fieldName]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width }}>
      <TextField
        label={label}
        placeholder={placeholder}
        variant={variant}
        type={type}
        id={key}
        name={fieldName}
        value={values[fieldName]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError}
        size="small"
        margin="normal"
        multiline={multiline}
        sx={{
          "& .MuiInputLabel-root": { fontSize: "1rem" },
          "& .MuiInputBase-input": { fontSize: "1rem" },
          maxHeight: '200px',
          overflowY: 'auto'
        }}
      />
      {isError && (
        <Typography color="error" sx={{ fontSize: "0.8rem" }}>
          {errors[fieldName]}
        </Typography>
      )}
    </Box>
  );
};

export default Input;
