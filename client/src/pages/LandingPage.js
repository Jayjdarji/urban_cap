import { Modal } from "@mui/material";
import React from "react";
import Landing from "../components/Landing";
import Login from "../components/Login";
import Register from "../components/Register";
import ResetPassword from "../components/ResetPassword";
import ContactUs from "../components/ContactUs";
import { useModal } from "../Context";

const LandingPage = () => {
  const {
    isLoginOpen,
    isRegisterOpen,
    isResetPasswordOpen,
    closeLogin,
    closeRegister,
    closeResetPassword,
    isContactUs,
    closeContactUs
  } = useModal();

  return (
    <>
      <Landing />
      <Modal open={isLoginOpen} onClose={closeLogin}>
        <Login  />
      </Modal>
      <Modal open={isRegisterOpen} onClose={closeRegister}>
        <Register  />
      </Modal>
      <Modal open={isResetPasswordOpen} onClose={closeResetPassword}>
        <ResetPassword  />
      </Modal>
      <Modal open={isContactUs} onClose={closeContactUs}>
        <ContactUs />
      </Modal>
    </>
  );
};

export default LandingPage;
