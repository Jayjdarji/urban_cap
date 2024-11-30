// import { Add, Remove } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useModal } from "../../Context";
import { CITIES, CURRENCY_VALUE, PROVINCES } from "../../utils/data";
// import { PriceTypography, ProductCard } from "../Styled";
import DateSection from "./DataTime";
import Location from "./Location";
import SummaryBoxSection from "./SummaryBox";
import TimeSection from "./TimeSection";

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

function HomeCleaning() {
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
            <Location formik={formik} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateSection formik={formik} date={date} setDate={setDate} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimeSection formik={formik} date={date} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Which products do you want assembled?
            </Typography>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            {/* {PRODUCTS.map((item) => (
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
            ))} */}
          </Grid>
        </Grid>
        <Grid item xl={6} xs={12}>
          <SummaryBoxSection
            formik={formik}
            date={date}
            currency={currency}
            totalCost={totalCost}
            findLabel={findLabel}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeCleaning;
