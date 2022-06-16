import React from "react";
import { useState, useEffect } from "react";
import "../../css/customer/customer.css";
import { Routes, Route } from "react-router-dom";
import IndividualCustomer from "./individualCustomers";
import AllCustomer from "./Allcustomer";
import CustomerDashboard from "./customerDashboard";
import faker from "@faker-js/faker";
import AddCustomer from "./AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import { clearDashBoard } from "../../store/actionCreators/dashboard/dasboardActions";
import {
  fetchCustomers,
  getCustomerPagination,
  setCustomerPagination,
} from "../../store/actionCreators/Customers/CustomerAction";
import Unauthorized from "./../unauthorized";
import EditCustomer from "./EditCustomer";
function Customer(props) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const branch = useSelector((state) => state.branch);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const [branchObj, setBranchObj] = useState({});
  const [branchArray, setBranchArray] = useState([]);

  const convertArrayToObj = () => {
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
    dispatch(clearDashBoard());
    dispatch(setCustomerPagination(1));
  }, []);

  useEffect(() => {
    editPermissions();
    convertArrayToObj();
  }, [branch, login]);
  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "Customer") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };

  if (viewPermission)
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <CustomerDashboard
                editPermission={editPermission}
                viewPermission={viewPermission}
                sideToggle={props.sideToggle}
              />
            }
          />
          <Route
            path="/individual"
            element={
              <IndividualCustomer
                editPermission={editPermission}
                viewPermission={viewPermission}
                sideToggle={props.sideToggle}
              />
            }
          />
          <Route
            path="/addCustomer"
            element={
              <AddCustomer
                editPermission={editPermission}
                viewPermission={viewPermission}
                sideToggle={props.sideToggle}
              />
            }
          />
          <Route
            path="/editCustomer/:customer_no"
            element={
              <EditCustomer
                editPermission={editPermission}
                viewPermission={viewPermission}
                sideToggle={props.sideToggle}
                branchObj={branchObj}
                branchArray={branchArray}
              />
            }
          />
          <Route
            path="/allCustomer"
            element={
              <AllCustomer
                editPermission={editPermission}
                viewPermission={viewPermission}
                sideToggle={props.sideToggle}
              />
            }
          ></Route>
        </Routes>
      </React.Fragment>
    );
  return <Unauthorized />;
}
export default Customer;
