import { Card, Paper, styled, Typography } from "@mui/material";

export const SummaryBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  textAlign: "left",
  position: "sticky",
  top: theme.spacing(2),
}));

export const ProductCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  margin: "5px 0px",
}));

export const PriceTypography = styled(Typography)({
  fontWeight: "bold",
  color: "#000",
  marginBottom: "8px",
});
