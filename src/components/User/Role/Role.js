import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EmployeeRoleTable from "./EmployeeRoleTable";
import { useSelector } from "react-redux";
import Unauthorized from "../../unauthorized";

const Role = (props) => {
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

  if (viewPermission)
    return (
      <Container
        fluid
        className={props.sideToggle === true ? "closeDash" : "openDash"}
        style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
      >
        <Row>
          <Col className="dash-head">Employee Role Dashboard</Col>
        </Row>
        <Row>
          <EmployeeRoleTable
            employee={props.employee}
            currEmployee={props.employee}
            setEmployee={props.setEmployee}
            editPermission={editPermission}
          />
        </Row>
      </Container>
    );
  else return <Unauthorized />;
};

export default Role;
