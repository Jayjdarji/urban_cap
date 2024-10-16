import { Container, Modal } from "@mui/material";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import VerificationPage from "./pages/VerificationPage";

import "react-toastify/dist/ReactToastify.css";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import { useModal } from "./Context";
import AboutUs from "./pages/AboutUs";
import LandingPage from "./pages/LandingPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5321/api";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const {
    isLoginOpen,
    isRegisterOpen,
    isResetPasswordOpen,
    closeLogin,
    closeRegister,
    closeResetPassword,
    isContactUs,
    closeContactUs,
  } = useModal();

  return (
    <Container maxWidth sx={{ height: "100vh", overflowY: "auto" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/verification/:token" element={<VerificationPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<Navigate to={"/home"} />} />
        </Routes>
        <Modal open={isLoginOpen} onClose={closeLogin}>
          <Login />
        </Modal>
        <Modal open={isRegisterOpen} onClose={closeRegister}>
          <Register />
        </Modal>
        <Modal open={isResetPasswordOpen} onClose={closeResetPassword}>
          <ResetPassword />
        </Modal>
        <Modal open={isContactUs} onClose={closeContactUs}>
          <ContactUs />
        </Modal>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick={true}
        draggable={true}
        pauseOnHover={true}
      />
    </Container>
  );
}

export default App;
