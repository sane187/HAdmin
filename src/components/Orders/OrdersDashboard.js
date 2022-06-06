import React from "react";
import AllOrders from "./AllOrders";
import { Container, Row, Col } from "react-bootstrap";
import Unauthorized from "./../unauthorized";

const OrdersDashboard = (props) => {
  if (props.viewPermission)
    return (
      <Container
        fluid
        className={props.sideToggle === true ? "closeDash" : "openDash"}
        style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
      >
        <Row>
          <Col lg={9} sm={6} xs={12} className="dash-head">
            Orders Dashboard
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <AllOrders />
        </Row>
      </Container>
    );
  return <Unauthorized />;
};

export default OrdersDashboard;
