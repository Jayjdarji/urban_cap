import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
} from "@mui/material";
import { SERVICES_LABELS } from "../../utils/data";
import moment from "moment";

const OrdersTable = ({ orders }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="Orders Table">
          <TableHead>
            <TableRow>
              <TableCell>Service Key</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{SERVICES_LABELS[row.serviceKey]}</TableCell>
                <TableCell>
                  {row.location.city + ", " + row.location.state}
                </TableCell>
                <TableCell>{moment(row.date).format("MMM DD, YYYY")}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{`${row.totalAmount} ${row.currency}`}</TableCell>
                <TableCell>
                  {moment(row.createdAt).format("MMM DD, YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersTable;
