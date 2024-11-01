import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Return = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        display: "flex", 
        alignItems: "center",
        justifyContent: "center",
        border: '1px solid #000',
        color: "#000",
        fontSize: "1.5rem",
        padding: "0.5rem",
      }}
    >
      <KeyboardReturnRoundedIcon />
    </IconButton>
  );
};

export default Return;
