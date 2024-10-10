import { Container } from "@mui/material";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import VerificationPage from "./pages/VerificationPage";

import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Context } from "./Context";
import LandingPage from "./pages/LandingPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutUs from "./pages/AboutUs";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5321/api";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const hideNavbar = ['reset-password', 'verification']
  console.log(hideNavbar.every(item => window.location.pathname.includes(item)))
  return (
    <Container maxWidth sx={{ height: "100vh", overflowY: "auto" }}>
      <Context>
        <BrowserRouter>
          {hideNavbar.every(item => !window.location.pathname.includes(item)) && < Navbar />}
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
          {hideNavbar.every(item => !window.location.pathname.includes(item)) && <Footer />}
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick={true}
          draggable={true}
          pauseOnHover={true}
        />
      </Context>
    </Container>
  );
}

export default App;
