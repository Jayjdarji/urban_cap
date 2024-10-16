import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
