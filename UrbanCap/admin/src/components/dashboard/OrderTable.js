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
import CommonButton from "../form-fields/CommonButton";
import axios from "axios";

const OrdersTable = ({ orders, refetch }) => {
  const handleAccept = async (id) => {
    try {
      await axios.post(`/admin/service/accept`, { id });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/admin/service/reject`, { id });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
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
              <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                Actions
              </TableCell>
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
                {!row.active && (
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CommonButton
                      color="green"
                      sx={{
                        borderColor: "green",
                        "&:hover": {
                          boxShadow: "0px 0px 5px green",
                          border: "none",
                        },
                      }}
                      onClick={() => handleAccept(row._id)}
                      label={"Accept"}
                      width="max-content"
                    />
                    <CommonButton
                      color="red"
                      sx={{
                        borderColor: "red",
                        "&:hover": {
                          boxShadow: "0px 0px 5px red",
                          border: "none",
                        },
                      }}
                      onClick={() => handleReject(row._id)}
                      label={"Reject"}
                      width="max-content"
                    />
                  </TableCell>
                )}
                {row.active === "Accepted" && (
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CommonButton
                      color="green"
                      sx={{
                        borderColor: "green",
                        "&:hover": {
                          boxShadow: "none",
                        },
                      }}
                      label={row.active}
                      width="max-content"
                    />
                  </TableCell>
                )}
                {(row.active === "Rejected" || row.active === "Cancelled") && (
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CommonButton
                      color="red"
                      sx={{
                        borderColor: "red",
                        "&:hover": {
                          boxShadow: "none",
                        },
                      }}
                      label={row.active}
                      width="max-content"
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersTable;
