import React from "react";
import Landing from "../components/Landing";
import PrivateLayout from "../components/PrivateLayout";

const LandingPage = () => {
  return (
    <PrivateLayout>
      <Landing />
    </PrivateLayout>
  );
};

export default LandingPage;
