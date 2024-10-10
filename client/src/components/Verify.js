import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const verification = useCallback(async () => {
    try {
      const token = pathname.split("/")[2];
      const response = await axios.get(`/auth/verify?token=${token}`);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Verification link is expired");
    }
  }, [pathname, navigate]);

  useEffect(() => {
    const verifyUser = async () => {
      await verification();
    };
    verifyUser();
  }, [pathname, verification]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography>
          Please wait for sometime while we verify your details.
        </Typography>
      </Box>
    </Box>
  );
};

export default Verify;
