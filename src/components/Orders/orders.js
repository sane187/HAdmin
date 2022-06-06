import React, { useState, useEffect } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import OrdersDashboard from "./OrdersDashboard";
import { useSelector } from "react-redux";

const Orders = (props) => {
  const login = useSelector((state) => state.login);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);

  useEffect(() => {
    editPermissions();
  }, []);

  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "User") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <OrdersDashboard
              viewPermission={viewPermission}
              editPermission={editPermission}
              sideToggle={props.sideToggle}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default Orders;
