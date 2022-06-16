import React, { useState, useEffect } from "react";
import "../../css/customer/customer.css";
import { Routes, Route } from "react-router-dom";
import AddNewFranchise from "./AddNewFranchise";
import AllBranches from "./AllBranches";
import AddNewBranchMain from "./AddNewBranch/AddNewBranchMain";
import IndividFranchise from "./IndividualFranchise/IndividFranchise";
import { useSelector } from "react-redux";
const Branch = (props) => {
  const [franchise, setCurrFranchise] = useState({});
  const login = useSelector((state) => state.login);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "Franchise") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };
  useEffect(() => {
    editPermissions();
  }, []);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<div>Hello main Branch</div>} />
        <Route
          path="/AddBranch"
          element={
            <AddNewBranchMain
              sideToggle={props.sideToggle}
              viewPermission={viewPermission}
              editPermission={editPermission}
            />
          }
        />
        <Route
          path="/AllBranch"
          element={
            <AllBranches
              setCurrFranchise={setCurrFranchise}
              sideToggle={props.sideToggle}
              viewPermission={viewPermission}
              editPermission={editPermission}
            />
          }
        />
        <Route
          path="/AddFranchise"
          element={
            <AddNewFranchise
              sideToggle={props.sideToggle}
              viewPermission={viewPermission}
              editPermission={editPermission}
            />
          }
        />
        <Route
          path="/Franchise/:franchise_id"
          element={
            <IndividFranchise
              franchise={franchise}
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
export default Branch;
