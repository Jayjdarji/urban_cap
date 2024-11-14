import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { CITIES, CURRENCY_VALUE, PRODUCTS, PROVINCES } from "../../utils/data";
import CommonButton from "../form-fields/CommonButton";
import SelectField from "../form-fields/SelectField";
import { useModal } from "../../Context";
import { toast } from "react-toastify";

const SummaryBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  textAlign: "left",
  position: "sticky",
  top: theme.spacing(2),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
}));

const PriceTypography = styled(Typography)({
  fontWeight: "bold",
  color: "#d32f2f",
  marginBottom: "8px",
});

const validate = (values) => {
  const errors = {};

  if (!values.province) {
    errors.province = "Province is a required field";
  }

  if (!values.city) {
    errors.city = "City is a required field";
  }

  if (!values.time) {
    errors.time = "Time is a required field";
  }

  return errors;
};

function FurnitureAssemblyForm() {
  const [date, setDate] = useState("");
  const isLoggedIn = localStorage.getItem("token");
  const { openLogin, currency } = useModal();
  const [products, setProducts] = useState({
    smallest: 0,
    medium: 0,
    large: 0,
    small: 0,
  });

  const formik = useFormik({
    initialValues: {
      city: "toronto",
      province: "ontario",
      time: "9:00 AM",
    },
    validate,
    onSubmit: async (values) => {
      if (!isLoggedIn) {
        openLogin();
        return;
      }
      const totalCost =
        products.smallest * 3 +
        products.medium * 9 +
        products.large * 12 +
        products.small * 5;

      const payload = {
        serviceKey: "furnitureAssembly",
        location: {
          state: values.province,
          city: values.city,
        },
        date: date,
        time: values.time,
        serviceData: {
          smallest: products.smallest,
          medium: products.medium,
          large: products.large,
          small: products.small,
        },
        totalAmount: totalCost,
        currency,
        orderSummary: {
          date: date || "Not selected",
          time: values.time || "Not selected",
          location: `${findLabel(values.province, PROVINCES)}, ${findLabel(
            values.city,
            CITIES
          )}`,
          total: totalCost,
        },
      };

      try {
        await axios.post("/services", payload);
        formik.resetForm();
        setProducts({
          smallest: 0,
          medium: 0,
          large: 0,
          small: 0,
        });
        setDate("");
        toast.success("Order submitted successfully");
      } catch (error) {
        console.error("Error submitting order:", error);
        toast.error("Error submitting order");
      }
    },
  });

  const handleProductChange = (type, increment) => {
    setProducts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1)),
    }));
  };

  const totalCost = (
    products.smallest * (3 * CURRENCY_VALUE[currency]) +
    products.medium * (9 * CURRENCY_VALUE[currency]) +
    products.large * (12 * CURRENCY_VALUE[currency]) +
    products.small * (5 * CURRENCY_VALUE[currency])
  ).toFixed(2);

  const timeOptions = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];

  const findLabel = (value, options) => {
    if (Array.isArray(options)) {
      const option = options.find((option) => option.value === value);
      return option ? option.label : "";
    }
    const option = options[formik.values.province].find(
      (option) => option.value === value
    );
    return option ? option.label : "";
  };

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
      <Grid container spacing={3} px={7} mt={2}>
        <Grid item container xl={6} xs={12} spacing={2}>
          <Grid item xs={12} sm={12}>
            <ProductCard>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Which products do you want assembled?
            </Typography>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            {PRODUCTS.map((item) => (
              <Grid item xs={12} sm={6} key={item.key}>
                <ProductCard>
                  <CardContent>
                    <PriceTypography variant="subtitle1">
                      {`${item.label} - ${(
                        item.price * CURRENCY_VALUE[currency]
                      ).toFixed(2)} ${currency}/UNIT`}
                    </PriceTypography>
                    {item.products.map((product) => (
                      <Typography variant="body2" color="textSecondary">
                        {product}
                      </Typography>
                    ))}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      <IconButton
                        onClick={() => handleProductChange(item.key, false)}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{products[item.key]}</Typography>
                      <IconButton
                        onClick={() => handleProductChange(item.key, true)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xl={6} xs={12}>
          <SummaryBox elevation={3}>
            <Typography variant="h6">Order Summary</Typography>
            <Box p={1}>
              <Typography variant="body2">
                Date: {date || "Not selected"}
              </Typography>
              <Typography variant="body2">
                Time:{" "}
                {date ? formik.values.time || "Not selected" : "Not selected"}
              </Typography>
              <Typography variant="body2">
                Location:{" "}
                {formik.values.province
                  ? `${findLabel(
                      formik.values.province,
                      PROVINCES
                    )}, ${findLabel(formik.values.city, CITIES)}`
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default FurnitureAssemblyForm;
