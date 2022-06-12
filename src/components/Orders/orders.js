import React, { useState, useEffect } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import OrdersDashboard from "./OrdersDashboard";
import { useSelector } from "react-redux";
import ViewOrder from "./ViewOrder";
import EditOrder from "./EditOrder";

const Orders = (props) => {
  const login = useSelector((state) => state.login);
  const employees = useSelector((state) => state.employees);
  const branch = useSelector((state) => state.branch);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const [empObj, setEmpObj] = useState({});
  const [empArray, setEmpArray] = useState([]);
  const [branchObj, setBranchObj] = useState({});
  const [branchArray, setBranchArray] = useState([]);

  const convertArrayToObj = () => {
    if (employees.data && employees.data.status === "success") {
      const emps = {};
      employees.data.data.forEach((e) => {
        emps[e.employee_id] = e.full_name;
      });
      setEmpObj(emps);
      setEmpArray(employees.data.data);
    }
    if (branch.data && branch.data.status === "success") {
      const branches = {};
      branch.data.data.forEach((e) => {
        branches[e.branch_id] = e.branch_name;
      });
      setBranchObj(branches);
      setBranchArray(branch.data.data);
    }
  };

  useEffect(() => {
    editPermissions();
    convertArrayToObj();
  }, [employees, branch]);

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
        <Route
          path="viewOrder/:order_id"
          element={
            <ViewOrder
              viewPermission={viewPermission}
              editPermission={editPermission}
              sideToggle={props.sideToggle}
              empObj={empObj}
              empArray={empArray}
              branchObj={branchObj}
              branchArray={branchArray}
            />
          }
        />
        <Route
          path="editOrder/:order_id"
          element={
            <EditOrder
              viewPermission={viewPermission}
              editPermission={editPermission}
              sideToggle={props.sideToggle}
              empObj={empObj}
              empArray={empArray}
              branchObj={branchObj}
              branchArray={branchArray}
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default Orders;
