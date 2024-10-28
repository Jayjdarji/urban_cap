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
import { useFormik } from "formik";
import React, { useState } from "react";
import CommonButton from "../form-fields/CommonButton";
import SelectField from "../form-fields/SelectField";

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

const productItems = [
  {
    label: "Smallest",
    price: "3 USD/Unit",
    products: [
      "Chandelier",
      "Commode",
      "Chair",
      "Coffee table",
      "Store Curtain",
      "Table Hanging",
    ],
    key: "smallest",
  },
  {
    label: "Large",
    price: "12 USD/Unit",
    products: [
      "Multi-door wardrobe",
      "Wall TV Unit",
      "Bedstead",
      "Seat set",
      "Bunk",
      "TV Unit",
    ],
    key: "large",
  },
  {
    label: "Medium",
    price: "9 USD/Unit",
    products: [
      "Buffet/Pattern",
      "Console",
      "Table",
      "Portmanto",
      "Single door wardrobe",
      "Television coffee table",
    ],
    key: "medium",
  },
  {
    label: "Small",
    price: "5 USD/Unit",
    products: [
      "Footwear",
      "Bergerer",
      "Bathroom cabinet",
      "Wall shelf",
      "Bookcase",
      "Chiffonier ",
    ],
    key: "small",
  },
];

const CITIES = {
  alberta: [
    { value: "calgary", label: "Calgary" },
    { value: "edmonton", label: "Edmonton" },
    { value: "red_deer", label: "Red Deer" },
    { value: "lethbridge", label: "Lethbridge" },
    { value: "st_albert", label: "St. Albert" },
  ],
  british_columbia: [
    { value: "vancouver", label: "Vancouver" },
    { value: "victoria", label: "Victoria" },
    { value: "surrey", label: "Surrey" },
    { value: "burnaby", label: "Burnaby" },
    { value: "richmond", label: "Richmond" },
  ],
  manitoba: [
    { value: "winnipeg", label: "Winnipeg" },
    { value: "brandon", label: "Brandon" },
    { value: "steinbach", label: "Steinbach" },
    { value: "thompson", label: "Thompson" },
    { value: "portage_la_prairie", label: "Portage la Prairie" },
  ],
  ontario: [
    { value: "toronto", label: "Toronto" },
    { value: "ottawa", label: "Ottawa" },
    { value: "mississauga", label: "Mississauga" },
    { value: "brampton", label: "Brampton" },
    { value: "hamilton", label: "Hamilton" },
  ],
  quebec: [
    { value: "montreal", label: "Montreal" },
    { value: "quebec_city", label: "Quebec City" },
    { value: "laval", label: "Laval" },
    { value: "gatineau", label: "Gatineau" },
    { value: "longueuil", label: "Longueuil" },
  ],
  nova_scotia: [
    { value: "halifax", label: "Halifax" },
    { value: "sydney", label: "Sydney" },
    { value: "dartmouth", label: "Dartmouth" },
    { value: "truro", label: "Truro" },
    { value: "new_glasgow", label: "New Glasgow" },
  ],
  new_brunswick: [
    { value: "fredericton", label: "Fredericton" },
    { value: "moncton", label: "Moncton" },
    { value: "saint_john", label: "Saint John" },
    { value: "miramichi", label: "Miramichi" },
    { value: "bathurst", label: "Bathurst" },
  ],
  newfoundland_and_labrador: [
    { value: "st_johns", label: "St. John's" },
    { value: "mount_pearl", label: "Mount Pearl" },
    { value: "corner_brook", label: "Corner Brook" },
    { value: "gander", label: "Gander" },
    { value: "happy_valley_goose_bay", label: "Happy Valley-Goose Bay" },
  ],
  saskatchewan: [
    { value: "saskatoon", label: "Saskatoon" },
    { value: "regina", label: "Regina" },
    { value: "prince_albert", label: "Prince Albert" },
    { value: "moose_jaw", label: "Moose Jaw" },
    { value: "swift_current", label: "Swift Current" },
  ],
};

const PROVINCES = [
  { value: "alberta", label: "Alberta" },
  { value: "british_columbia", label: "British Columbia" },
  { value: "manitoba", label: "Manitoba" },
  { value: "new_brunswick", label: "New Brunswick" },
  { value: "newfoundland_and_labrador", label: "Newfoundland and Labrador" },
  { value: "nova_scotia", label: "Nova Scotia" },
  { value: "ontario", label: "Ontario" },
  { value: "prince_edward_island", label: "Prince Edward Island" },
  { value: "quebec", label: "Quebec" },
  { value: "saskatchewan", label: "Saskatchewan" },
  { value: "northwest_territories", label: "Northwest Territories" },
  { value: "nunavut", label: "Nunavut" },
  { value: "yukon", label: "Yukon" },
];

function FurnitureAssemblyForm() {
  const [date, setDate] = useState("");
  const [products, setProducts] = useState({
    smallest: 0,
    medium: 0,
    large: 0,
    small: 0,
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      province: "",
      time: "",
    },
    onSubmit: () => {},
  });
  console.log("🚀🚀🚀 ~ FurnitureAssemblyForm ~ formik:", formik);

  const handleProductChange = (type, increment) => {
    setProducts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1)),
    }));
  };

  const totalCost =
    products.smallest * 3 +
    products.medium * 9 +
    products.large * 12 +
    products.small * 5;

  const timeOptions = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

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
            {productItems.map((item) => (
              <Grid item xs={12} sm={6} key={item.key}>
                <ProductCard>
                  <CardContent>
                    <PriceTypography variant="subtitle1">
                      {item.label} - {item.price}
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
                Time: {formik.values.time || "Not selected"}
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
              Total: {totalCost} USD
            </Typography>
            <CommonButton sx={{ mt: 2 }} label={"Continue"} />
          </SummaryBox>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FurnitureAssemblyForm;
