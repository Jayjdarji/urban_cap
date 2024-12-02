import {
  Box,
  Grid,
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
import React, { useState, useEffect, useCallback } from "react";
import CommonButton from "../components/form-fields/CommonButton";
const ExtraServices = () => {
  const [extraServices, setExtraServices] = useState([]);
  const handleAccept = async (id) => {
    try {
      await axios.post(`/admin/extraServices/accept`, { id });
      fetchExtraServices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/admin/extraServices/reject`, { id });
      fetchExtraServices();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExtraServices = useCallback(async () => {
    try {
      const response = await axios.get("/admin/extraServices");
      setExtraServices(response.data.extraServices);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchExtraServices();
  }, [fetchExtraServices]);

  return (
    <Grid item container spacing={3} px={10} alignItems={"flex-start"}>
      <Grid item xs={12} mt={4}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          sx={{ letterSpacing: 2.5, mb: 1 }}
        >
          Extra Services
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 1 }}>
          <TableContainer component={Paper}>
            <Table aria-label="Orders Table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extraServices.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.city + ", " + row.province}</TableCell>
                    <TableCell>
                      {moment(row.date).format("MMM DD, YYYY")}
                    </TableCell>
                    <TableCell>{row.time}</TableCell>
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
                    {(row.active === "Rejected" ||
                      row.active === "Cancelled") && (
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
      </Grid>
    </Grid>
  );
};

export default ExtraServices;
