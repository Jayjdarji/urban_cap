import MenuIcon from "@mui/icons-material/Menu";
import { Box, ClickAwayListener, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./form-fields/Input";
import CommonButton from "./form-fields/CommonButton";
import Sidebar from "./Sidebar";
import axios from "axios";
const { useFormik } = require("formik");

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      events: [],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    formik.setFieldValue("events", user?.events || []);
  }, [JSON.stringify(user)]);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    setModalOpen(true);
  };

  if (!token) {
    navigate("/signin");
  }

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleSave = async () => {
    try {
      await axios.post("/admin/provider/addUpdate", formik.values);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, events: formik.values.events })
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 10, mt: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            visibility: open ? "none" : "block",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              width: "max-content",
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography fontSize="1.5rem">Urban Cap</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CommonButton
            label={"Logout"}
            type={"logout"}
            sx={{ p: 2 }}
            onClick={handleLogout}
          />
          {user?.userType === "SERVICE_PROVIDER" && (
            <CommonButton label={"Edit"} sx={{ p: 2 }} onClick={handleOpen} />
          )}
        </Box>
      </Box>
      {token && children} <Sidebar open={open} setOpen={setOpen} user={user} />
      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: "transparent",
            boxShadow: 24,
            p: 4,
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                minWidth: "400px",
                minHeight: "200px",
                gap: 2,
                backgroundColor: "white",
                borderRadius: "12px",
              }}
            >
              <Input
                label="Events"
                fieldName="events"
                formik={formik}
                options={[
                  {
                    value: "miniGolfRoundRobin",
                    label: "Mini Golf Round Robin",
                  },
                  {
                    value: "videoGamesRoundRobin",
                    label: "Video Games Round Robin",
                  },
                  {
                    value: "indoorRockClimbing",
                    label: "Indoor Rock Climbing",
                  },
                  {
                    value: "teamBuilding",
                    label: "Team Building",
                  },
                ]}
                width="400px"
                fieldStyle={{ maxWidth: "400px" }}
                select
                multiple
              />
              <CommonButton
                label={"Save"}
                onClick={handleSave}
                loading={formik.isSubmitting}
                disabled={!formik.isValid || formik.isSubmitting}
                sx={{ borderRadius: "8px", width: "100%" }} // Full width for button
              />
            </Box>
          </ClickAwayListener>
        </Box>
      </Modal>
    </Box>
  );
};

export default PrivateLayout;
