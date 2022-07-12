import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllAdmins from "./allAdmins";

const AdminDashboard = (props) => {
  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <Row>
        <Col lg={9} sm={6} xs={12} className="dash-head">
          Employee Dashboard
        </Col>
      </Row>
      <Row>
        <AllAdmins />
      </Row>
    </Container>
  );
};

export default AdminDashboard;
