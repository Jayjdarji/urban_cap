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
import moment from "moment";
import React from "react";

const OrdersTable = ({ orders }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleOpen = (str) => {
    setExpanded(str || "No Additional Details");
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="Orders Table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Number of persons</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Additional Information</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.userId.name}</TableCell>
                <TableCell>{row.numberOfPersons}</TableCell>
                <TableCell>{moment(row.date).format("MMM DD, YYYY")}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpen(row.additionalRequests)}
                  >
                    <VisibilityOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#000" }}
                    />
                  </IconButton>
                </TableCell>
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
