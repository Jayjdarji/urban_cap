import React from "react";
import PrivateLayout from "../components/PrivateLayout";
import Events from "../components/Event";
const EventsPage = () => {
  return (
    <PrivateLayout>
      <Events />
    </PrivateLayout>
  );
};

export default EventsPage;
