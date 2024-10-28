import React from "react";
import { useLocation } from "react-router-dom";
import GameDetails from "../Event/EventDetails";
import EventPlanning from "./EventPlanning";
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  return !category ? <EventPlanning /> : <GameDetails />;
};

export default index;
