import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { BsTrophyFill } from "react-icons/bs";
import TotalOrdersTaken from "./individualEmployeeWid/TotalOrdersTaken";
import IndividualEmployeeRevenue from "./individualEmployeeWid/IndividualEmployeeRevenue ";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeOrdersTaken } from "../../store/actionCreators/Employees/EmployeeAction";
import Unauthorized from "../unauthorized";

const IndividualEmployee = (props) => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.emp_orders_page);
  useEffect(() => {
    if (employee.data) {
      dispatch(EmployeeOrdersTaken(page, employee.data.data.employee_id, ""));
    }
  }, [page, employee]);
  const main = () => {
    if (props.viewPermission) {
      if (employee.data) {
        if (employee.data.status === "success") {
          return (
            <Container
              fluid
              className={props.sideToggle === true ? "closeDash" : "openDash"}
              style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
            >
              <Row>
                <Col className="dash-head">
                  <ButtonGroup aria-label="TLbutton" id="TLbutton">
                    <a href="#OrderAnalytics">
                      {" "}
                      <Button variant="outline-secondary" size="sm">
                        Employee Analytics
                      </Button>
                    </a>
                    <a href="#OrderTable">
                      <Button variant="outline-secondary" size="sm">
                        Order Taken Table
                      </Button>
                    </a>
                    <a href="#SalesAnalytics">
                      {" "}
                      <Button variant="outline-secondary" size="sm">
                        Sales Analytics
                      </Button>
                    </a>
                  </ButtonGroup>
                  Employee Analytics
                </Col>
              </Row>
              <Row id="OrderAnalytics">
                <Col
                  xl={{ span: "7", order: "first" }}
                  lg={{ span: "7", order: "first" }}
                  md={{ span: "12", order: 2 }}
                  sm={{ span: "12", order: 2 }}
                  xs={{ span: "12", order: 2 }}
                >
                  <Card
                    className="mb-4"
                    style={{ backgroundColor: "#fff", color: "grey" }}
                  >
                    <Card.Body>
                      <h5>
                        <b>Employee Order Analytics</b>
                      </h5>
                    </Card.Body>
                  </Card>
                  <Row>
                    <Col lg={6} md={6}>
                      <Card
                        style={{ backgroundColor: "#518BFF", color: "white" }}
                      >
                        <Card.Body>
                          <div className="d-flex">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2 text-light">
                                Total Orders Taken
                              </p>
                              <h4 className="mb-2">
                                {employee.data.total_orders_taken}
                              </h4>
                            </div>
                            <div
                              className="icon text-light"
                              style={{ fontSize: "24px" }}
                            >
                              <FaRupeeSign />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={6} md={6}>
                      <Card
                        style={{ backgroundColor: "#FFC257", color: "white" }}
                      >
                        <Card.Body>
                          <div className="d-flex">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2 text-light">
                                Total Revenue
                              </p>
                              <h4 className="mb-2">
                                ₹ {employee.data.total_revenue}
                              </h4>
                            </div>
                            <div
                              className="icon text-light"
                              style={{ fontSize: "24px" }}
                            >
                              <MdFastfood />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={6} md={6}>
                      <Card
                        className="mt-4"
                        style={{ backgroundColor: "#FF7FAF", color: "white" }}
                      >
                        <Card.Body style={{ height: "110px" }}>
                          <div className="d-flex">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2 text-light">
                                Popular Order
                              </p>
                              <h5 className="mb-0" style={{ fontSize: "18px" }}>
                                Chilli cheese Toast
                              </h5>
                            </div>
                            <div
                              className="icon text-light"
                              style={{ fontSize: "24px" }}
                            >
                              <BsTrophyFill />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={6} md={6}>
                      <Card
                        className="mt-4"
                        style={{ backgroundColor: "#8254FF", color: "white" }}
                      >
                        <Card.Body style={{ height: "110px" }}>
                          <div className="d-flex">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2 text-light">
                                Recent Order
                              </p>
                              <h5 className="mb-0" style={{ fontSize: "18px" }}>
                                {employee.data.recent_order}
                              </h5>
                            </div>
                            <div
                              className="icon  text-light"
                              style={{ fontSize: "24px" }}
                            >
                              <ImHourGlass />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                {/* Personel Informtion */}
                <Col
                  xl={{ span: "5", order: "4" }}
                  lg={{ span: "5", order: "4" }}
                  md={{ span: "12", order: "first" }}
                  sm={{ span: "12", order: "first" }}
                  xs={{ span: "12", order: "first" }}
                >
                  <Card>
                    <Card.Header
                      className="pt-3 pb-3"
                      style={{
                        borderBottom: "0 solid white",
                        backgroundColor: "#fff",
                        color: "grey",
                      }}
                    >
                      <b className="Customer-font ">
                        {employee.data.data.full_name}{" "}
                        {employee.data.data.gender === "female" ? "[F]" : "[M]"}
                      </b>
                    </Card.Header>
                    <Card.Body
                      className="pt-0"
                      style={{ overflowX: "auto", paddingRight: "10px" }}
                    >
                      <table className="table table-borderless indi-table mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Branch Name</th>
                            <td>{employee.data.data.branch}</td>
                          </tr>

                          <tr>
                            <th scope="row">Email</th>
                            <td>{employee.data.data.email}</td>
                          </tr>
                          <tr>
                            <th scope="row">Employee Role</th>
                            <td>{employee.data.data.employee_role}</td>
                          </tr>

                          <tr>
                            <th scope="row">DOB</th>
                            <td>{employee.data.data.date_of_birth}</td>
                          </tr>
                          <tr>
                            <th scope="row">Phone</th>
                            <td>{employee.data.data.mobile_no}</td>
                          </tr>
                          <tr>
                            <th scope="row">Address</th>
                            <td>{employee.data.data.address}</td>
                          </tr>
                          <tr>
                            <th scope="row">Status</th>
                            <td>{employee.data.data.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Card.Body>
                  </Card>
                </Col>

                {/*  Personel Informtion Ends*/}
              </Row>
              <Row>
                <TotalOrdersTaken />
              </Row>
              {/* sales Analytics of Employee */}
              <Row id="SalesAnalytics" className="mt-3">
                <Col xl={12}>
                  <Card
                    className="mb-4"
                    style={{ backgroundColor: "#fff", color: "grey" }}
                  >
                    <Card.Body>
                      <h5>
                        <b>Sales Analytics</b>
                      </h5>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xl={3} md={6} sm={12}>
                  <Card style={{ backgroundColor: "#518BFF", color: "white" }}>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2 text-light">
                            Total Revenue
                          </p>
                          <h4 className="mb-0">6246</h4>
                        </div>
                        <div
                          className="icon text-light"
                          style={{ fontSize: "24px" }}
                        >
                          <FaRupeeSign />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={3} md={6} sm={12}>
                  <Card style={{ backgroundColor: "#FFC257", color: "white" }}>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2 text-light">
                            Total Purchase
                          </p>
                          <h4 className="mb-0">6246</h4>
                        </div>
                        <div
                          className="icon text-light"
                          style={{ fontSize: "24px" }}
                        >
                          <FaRupeeSign />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={3} md={6} sm={12}>
                  <Card style={{ backgroundColor: "#FF7FAF", color: "white" }}>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2 text-light">
                            Tax
                          </p>
                          <h4 className="mb-0">6246</h4>
                        </div>
                        <div
                          className="icon text-light"
                          style={{ fontSize: "24px" }}
                        >
                          <FaRupeeSign />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={3} md={6} sm={12}>
                  <Card style={{ backgroundColor: "#8254FF", color: "white" }}>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2 text-light">
                            Avg Purchase
                          </p>
                          <h4 className="mb-0">₹ 6246</h4>
                        </div>
                        <div
                          className="icon text-light"
                          style={{ fontSize: "24px" }}
                        >
                          <select className="form-select form-select-sm">
                            <option defaultValue>7 days</option>
                            <option value="1">Month</option>
                            <option value="2">Year</option>
                          </select>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <IndividualEmployeeRevenue />
                </Col>
              </Row>
            </Container>
          );
        } else {
          return (
            <Container
              fluid
              className={props.sideToggle === true ? "closeDash" : "openDash"}
              style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
            >
              <Row>
                <h2>No data Found</h2>
              </Row>
            </Container>
          );
        }
      }
    } else return <Unauthorized />;
  };
  return <>{main()}</>;
};

export default IndividualEmployee;
