import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import OrdersDashboard from "./OrdersDashboard";

const Orders = (props) => {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={<OrdersDashboard sideToggle={props.sideToggle} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default Orders;
