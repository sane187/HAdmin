import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllCoupons from "./AllCoupons";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AddCoupon from "./AddCoupon";
import ViewCoupon from "./ViewCoupon";
import EditCoupon from "./EditCoupon";

const Coupon = (props) => {
  const login = useSelector((state) => state.login);
  const employees = useSelector((state) => state.employees);
  const branch = useSelector((state) => state.branch);
  const groups = useSelector((state) => state.groups);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const [empObj, setEmpObj] = useState({});
  const [empArray, setEmpArray] = useState([]);
  const [branchObj, setBranchObj] = useState({});
  const [branchArray, setBranchArray] = useState([]);
  const [groupsArr, setGroupsArr] = useState([]);

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
    if (groups.data && groups.data.data) {
      setGroupsArr(groups.data.data.map((g) => g.customer_group_name));
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
        if (item.module === "Coupons") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };

  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <Row>
        <Col lg={9} sm={6} xs={12} className="dash-head">
          Coupons Dashboard
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Routes>
          <Route
            path="/"
            element={
              <AllCoupons
                viewPermission={viewPermission}
                editPermission={editPermission}
                empObj={empObj}
                empArray={empArray}
                branchObj={branchObj}
                branchArray={branchArray}
                groupsArr={groupsArr}
              />
            }
          />
          <Route
            path="/addCoupon"
            element={
              <AddCoupon
                viewPermission={viewPermission}
                editPermission={editPermission}
                empObj={empObj}
                empArray={empArray}
                branchObj={branchObj}
                branchArray={branchArray}
                groupArray={groupsArr}
              />
            }
          />
          <Route
            path="/viewCoupon/:coupon_id"
            element={
              <ViewCoupon
                viewPermission={viewPermission}
                editPermission={editPermission}
                empObj={empObj}
                empArray={empArray}
                branchObj={branchObj}
                branchArray={branchArray}
                groupArray={groupsArr}
              />
            }
          />
          <Route
            path="/editCoupon/:coupon_id"
            element={
              <EditCoupon
                viewPermission={viewPermission}
                editPermission={editPermission}
                empObj={empObj}
                empArray={empArray}
                branchObj={branchObj}
                branchArray={branchArray}
                groupArray={groupsArr}
              />
            }
          />
        </Routes>
      </Row>
    </Container>
  );
};

export default Coupon;
