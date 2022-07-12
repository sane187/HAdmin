import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AllGroups from "./AllGroups";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import SingleGroup from "./SingleGroup";

const Group = (props) => {
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
        if (item.module === "Group") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };
console.log(editPermission)
  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <Row>
        <Col lg={9} sm={6} xs={12} className="dash-head">
          Groups Dashboard
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Routes>
          <Route
            path="/"
            element={
              <AllGroups
                viewPermission={viewPermission}
                editPermission={editPermission}
              />
            }
          />
          <Route
            path="/:customer_group_name"
            element={
              <SingleGroup
                viewPermission={viewPermission}
                editPermission={editPermission}
              />
            }
          />
        </Routes>
      </Row>
    </Container>
  );
};

export default Group;
