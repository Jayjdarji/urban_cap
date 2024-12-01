import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import React from "react";
import CommonButton from "../../form-fields/CommonButton";
import axios from "axios";

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

const OrdersTable = ({ orders, refetch }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleOpen = (str) => {
    setExpanded(str || "No Additional Details");
  };

  const handleClose = () => {
    setExpanded(false);
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(`/admin/event/accept`, { id });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/admin/event/reject`, { id });
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
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Number of persons</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Additional Information</StyledTableCell>
              <StyledTableCell colSpan={2}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter((row) => !!row?.userId?.name)
              .map((row) => (
                <TableRow key={row._id}>
                  <StyledTableCell>{row?.userId?.name}</StyledTableCell>
                  <StyledTableCell>{row.numberOfPersons}</StyledTableCell>
                  <StyledTableCell>
                    {moment(row.date).format("MMM DD, YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() => handleOpen(row.additionalRequests)}
                    >
                      <VisibilityOutlinedIcon
                        fontSize="small"
                        sx={{ color: "#000" }}
                      />
                    </IconButton>
                  </StyledTableCell>
                  {row.active === null && (
                    <StyledTableCell
                      sx={{
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
                    </StyledTableCell>
                  )}
                  {row.active === "Accepted" && (
                    <StyledTableCell
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
                    </StyledTableCell>
                  )}
                  {(row.active === "Rejected" ||
                    row.active === "Cancelled") && (
                    <StyledTableCell
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
                    </StyledTableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Modal open={expanded} onClose={handleClose}>
          <Box
            sx={{
              height: "300px",
              width: "500px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0px 0px 30px rgba(0, 0, 0, .1)",
              p: 3,
            }}
          >
            <Typography>{expanded}</Typography>
          </Box>
        </Modal>
      </TableContainer>
    </Box>
  );
};

export default OrdersTable;
