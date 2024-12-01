import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { default as React, useCallback, useEffect, useState } from "react";
import CommonButton from "../components/form-fields/CommonButton";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
  },
}));

const UsersTable = ({ type }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`/admin/users/${type}`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }, [type]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSuspend = async (id) => {
    // try {
    //   await axios.post(`/admin/service/accept`, { id });
    //   fetchUsers();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.post(`/admin/service/reject`, { id });
    //   fetchUsers();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        sx={{ letterSpacing: 2.5, mb: 3 }}
      >
        {type === "CUSTOMER" ? "Customers" : "Service Providers"}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Orders Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Verified</StyledTableCell>
              <StyledTableCell>
                {type === "CUSTOMER" ? "Total Bookings" : "Total Orders"}
              </StyledTableCell>
              <StyledTableCell>Registered At</StyledTableCell>
              <StyledTableCell colSpan={2}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.mobile}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {row.isVerified && (
                    <CommonButton
                      color="green"
                      sx={{
                        borderColor: "green",
                        "&:hover": {
                          boxShadow: "0px 0px 5px green",
                          border: "none",
                        },
                      }}
                      onClick={() => {}}
                      label={"Verified"}
                      width="max-content"
                    />
                  )}
                  {!row.isVerified && (
                    <CommonButton
                      color="red"
                      sx={{
                        borderColor: "red",
                        "&:hover": {
                          boxShadow: "0px 0px 5px red",
                          border: "none",
                        },
                      }}
                      onClick={() => {}}
                      label={"Not Verified"}
                      width="max-content"
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {type === "CUSTOMER" ? row.bookings || 0 : row.orders || 0}
                </StyledTableCell>
                <StyledTableCell>
                  {moment(row.createdAt).format("MMM DD, YYYY")}
                </StyledTableCell>
                {!row.active && (
                  <TableCell
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CommonButton
                      color="red"
                      sx={{
                        borderColor: "red",
                        "&:hover": {
                          boxShadow: "0px 0px 5px red",
                          border: "none",
                        },
                      }}
                      onClick={() => handleSuspend(row._id)}
                      label={"Suspend"}
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
                      onClick={() => handleDelete(row._id)}
                      label={"Delete"}
                      width="max-content"
                    />
                  </TableCell>
                )}
                {row.active === "suspended" && (
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
                      label={"Suspended"}
                      width="max-content"
                    />
                  </TableCell>
                )}
                {row.active === "deleted" && (
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
                      label={"Deleted"}
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

export default UsersTable;
