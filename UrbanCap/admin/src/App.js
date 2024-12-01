import { Container } from "@mui/material";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import PrivateLayout from "./components/PrivateLayout";
import Dashboard from "./pages/Dashboard";
import Service from "./pages/Service";
import EventDetails from "./components/dashboard/Events/EventDetails";
import Users from "./pages/Users";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5321/api";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <Container
      maxWidth
      sx={{ minHeight: "100vh", height: "100%", background: "#FBFBFB" }}
      disableGutters
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signin"} />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            }
          />
          <Route path="/service">
            <Route
              index
              element={
                <PrivateLayout>
                  <Service />
                </PrivateLayout>
              }
            />
          </Route>
          <Route path="/event-planning">
            <Route
              index
              element={
                <PrivateLayout>
                  <EventDetails />
                </PrivateLayout>
              }
            />
          </Route>
          <Route path="/users">
            <Route
              index
              element={
                <PrivateLayout>
                  <Users />
                </PrivateLayout>
              }
            />
          </Route>
        </Routes>
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
