import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default PrivateLayout;
