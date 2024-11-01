import React from "react";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Return = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      disableRipple
      disableFocusRipple
      onClick={handleClick}
      sx={{
        display: category ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        fontSize: "1.5rem",
        padding: "0.5rem",
      }}
    >
      <KeyboardReturnRoundedIcon />
    </IconButton>
  );
};

export default Return;
