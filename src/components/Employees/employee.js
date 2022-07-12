import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeDashBoard from "./employeeDashBoard";
import IndividualEmployee from "./IndividualEmployee";
import AddNewEmp from "./AddNewEmp";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerVars } from "../../store/actionCreators/Customers/CustomerAction";
import { clearDashBoard } from "../../store/actionCreators/dashboard/dasboardActions";

const Employee = (props) => {
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCustomerVars());
    dispatch(clearDashBoard());
    editPermissions();
  }, [viewPermission, editPermission]);

  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "Employees") {
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
            <EmployeeDashBoard
              sideToggle={props.sideToggle}
              viewPermission={viewPermission}
              editPermission={editPermission}
            />
          }
        />
        <Route
          path="/individual"
          element={
            <IndividualEmployee
              sideToggle={props.sideToggle}
              viewPermission={viewPermission}
              editPermission={editPermission}
            />
          }
        />
        <Route
          path="/addNew"
          element={
            <AddNewEmp
              sideToggle={props.sideToggle}
              viewPermission={viewPermission}
              editPermission={editPermission}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default Employee;
