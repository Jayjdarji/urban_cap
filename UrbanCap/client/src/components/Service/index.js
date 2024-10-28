import React from "react";
import Services from "./Services";
import { useLocation } from "react-router-dom";
import Manage from "./Manage";
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  return category ? <Manage /> : <Services />;
};

export default index;
