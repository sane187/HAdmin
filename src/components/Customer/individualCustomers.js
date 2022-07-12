import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import "../../css/customer/individualCustomer.css";
import { FaRupeeSign } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { BsTrophyFill } from "react-icons/bs";
import { OrderAnalyticsGraph } from "../../store/actionCreators/Customers/CustomerAction";
import MostPopularOrder from "./IndividualCustomer/MostPopularOrder";
import IndividualCustomerRevenue from "./IndividualCustomer/invidualCustomerRevenue";
import IndividualOrderTable from "./IndividualCustomer/individualOrderTable";
import { useDispatch, useSelector } from "react-redux";
import { CustomerAvgPurchase } from "../../store/actionCreators/Customers/CustomerAction";
import NoData from "../NoData";
import Unauthorized from "../unauthorized";
const IndividualCustomer = (props) => {
  const customer_avg_purchase = useSelector(
    (state) => state.customer_avg_purchase
  );
  const orderHistory = useSelector((state) => state.customer_order_history);
  console.log(orderHistory);
  function getDateFromUTC(date) {
    var d = new Date(date);
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${dayArr[d.getDay()]} ${
      monthArray[d.getMonth()]
    } ${d.getHours()}:${d.getMinutes()} ${d.getFullYear()}`;
  }
  const [current, setcurrent] = useState({
    month: "Jan",
    year: 2022,
  });
  const currYear = new Date().getFullYear();
  const yearArray = () => {
    let arrYear = [];
    for (let i = 0; i < currYear - 2017 + 1; i++) {
      arrYear.push(2017 + i);
    }
    return arrYear;
  };
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState("weekly");
  useEffect(() => {
    dispatch(CustomerAvgPurchase(currentFilter));
  }, [currentFilter]);

  const recentOrder = () => {
    if (orderHistory.data) {
      if (orderHistory.data.most_recent_orders) {
        const length = orderHistory.data.most_recent_orders.order_items.length;
        return orderHistory.data.most_recent_orders.order_items.map(
          (item, index) => {
            if (index === length - 1) {
              return <span key={index}>{item.product_name} </span>;
            } else {
              return <span key={index}>{item.product_name}, </span>;
            }
          }
        );
      }
    }
  };
  const popularOrder = () => {
    if (orderHistory.data) {
      if (orderHistory.data.most_recent_orders) {
        const length = orderHistory.data.most_recent_orders.order_items.length;
        return orderHistory.data.most_recent_orders.order_items.map(
          (item, index) => {
            if (index === length - 1) {
              return <span>{item.product_name} </span>;
            } else {
              return <span>{item.product_name}, </span>;
            }
          }
        );
      }
    }
  };
  const handleFilterChange = (e) => {
    setCurrentFilter(
      e.target.value,
      orderHistory.data.customer_data[0].mobile_no
    );
  };
  const monthDrop = () => {
    return monthArray.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };
  const handleMonthChange = (e) => {
    setcurrent({
      ...current,
      month: e.target.value,
    });
  };
  const yearDrop = () => {
    const year = yearArray();
    return year.map((item, index) => {
      if (item === currYear) {
        return (
          <option key={index} value={item} selected>
            {item}
          </option>
        );
      } else {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      }
    });
  };
  const handleYearChange = (e) => {
    setcurrent({
      ...current,
      year: e.target.value,
    });
  };
  const main = () => {
    if (props.viewPermission) {
      if (orderHistory.data && customer_avg_purchase.data) {
        if (orderHistory.data.status === "success") {
          return (
            <Container
              fluid
              className={props.sideToggle === true ? "closeDash" : "openDash"}
              style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
            >
              <Row>
                <Col lg={9} sm={6} xs={12} className="dash-head">
                  Personel Information
                  {/* <ButtonGroup aria-label="TLbutton" id="TLbutton">
                <a href="#OrderAnalytics"> <Button variant="outline-secondary" size="sm">Order Analytics</Button></a>
                <a href="#OrderTable"><Button variant="outline-secondary" size="sm">Order Table</Button></a>
                <a href="#SalesAnalytics"> <Button variant="outline-secondary" size="sm">Sales Analytics</Button></a>
              </ButtonGroup> */}
                </Col>
                <Col lg={3} sm={6} xs={12}>
                  <Row>
                    <Col>
                      <div className="form-group drop-dash">
                        <select
                          className="form-control form-select form-select-sm"
                          name="month"
                          onChange={handleMonthChange}
                        >
                          {monthDrop()}
                        </select>
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group drop-dash">
                        <select
                          className="form-control form-select form-select-sm"
                          name="year"
                          onChange={handleYearChange}
                        >
                          {yearDrop()}
                        </select>
                      </div>
                    </Col>
                  </Row>
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
                    <Card.Body className="p-2">
                      <h6>
                        <b>Order Analytics</b>
                      </h6>
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
                                Total Orders
                              </p>
                              <h4 className="mb-0">
                                {orderHistory.data.total_orders}
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
                        style={{ backgroundColor: "#FFC257", color: "white" }}
                      >
                        <Card.Body>
                          <div className="d-flex">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2 text-light">
                                Total Revenue
                              </p>
                              <h4 className="mb-0">
                                {orderHistory.data.total_revenue}
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
                        className="mt-4"
                        style={{ backgroundColor: "#FF7FAF", color: "white" }}
                      >
                        <Card.Body>
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
                        <Card.Body>
                          <div className="d-flex">
                            <div className="flex-1 overflow-hidden">
                              <p className="text-truncate font-size-14 mb-2 text-light">
                                Recent Order
                              </p>
                              <h5 className="mb-0" style={{ fontSize: "18px" }}>
                                {recentOrder()}
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
                        {orderHistory.data.customer_data[0].first_name}
                      </b>
                    </Card.Header>
                    <Card.Body
                      className="pt-0"
                      style={{ overflowX: "auto", paddingRight: "10px" }}
                    >
                      <table className="table table-borderless indi-table mb-0">
                        <tbody>
                          <tr>
                            <th scope="row">Phone</th>
                            <td>
                              {orderHistory.data.customer_data[0].mobile_no}
                            </td>
                          </tr>

                          <tr>
                            <th scope="row">Email</th>
                            <td>{orderHistory.data.customer_data[0].email}</td>
                          </tr>
                          <tr>
                            <th scope="row">Gender</th>
                            <td>{orderHistory.data.customer_data[0].gender}</td>
                          </tr>
                          <tr>
                            <th scope="row">Account Creation</th>
                            <td>
                              {getDateFromUTC(
                                orderHistory.data.customer_data[0].createdAt
                              )}
                            </td>
                          </tr>
                          {/* <tr>
                        <th scope="row">Address</th>
                        <td>{currentCustomer.shipping.address}</td>
                      </tr> */}
                          <tr>
                            <th scope="row">Group</th>
                            <td>{orderHistory.data.customer_data[0].group}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Card.Body>
                  </Card>
                </Col>
                {/*  Personel Informtion Ends*/}
                {/* Order Analytics */}

                <Col
                  id="OrderTable"
                  xl={{ order: "last" }}
                  lg={{ order: "last" }}
                  md={{ order: "last" }}
                  sm={{ order: "last" }}
                  xs={{ order: "last" }}
                >
                  <IndividualOrderTable />
                </Col>
              </Row>

              {/* Personel Informtion section ends */}
              {/* sales Analytics */}
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
                          <h4 className="mb-0">
                            {orderHistory.data.total_revenue}
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
                <Col xl={3} md={6} sm={12}>
                  <Card style={{ backgroundColor: "#FFC257", color: "white" }}>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2 text-light">
                            Total Purchase
                          </p>
                          <h4 className="mb-0">
                            {orderHistory.data.total_orders}
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
                <Col xl={3} md={6} sm={12}>
                  <Card style={{ backgroundColor: "#FF7FAF", color: "white" }}>
                    <Card.Body>
                      <div className="d-flex">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-truncate font-size-14 mb-2 text-light">
                            Tax
                          </p>
                          <h4 className="mb-0">{orderHistory.data.tax}</h4>
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
                          <h4 className="mb-0">
                            ₹ {customer_avg_purchase.data.avg_purchase}
                          </h4>
                        </div>
                        <div
                          className="icon text-light"
                          style={{ fontSize: "24px" }}
                        >
                          <select
                            className="form-select form-select-sm"
                            onChange={handleFilterChange}
                          >
                            <option defaultValue="weekly">weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xl={5} md={12}>
                  <MostPopularOrder />
                </Col>
                <Col xl={7}>
                  {}
                  <IndividualCustomerRevenue />
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
              <NoData data="No Data found for this customer" />
            </Container>
          );
        }
      } else {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <NoData data="No Data found for this customer" />
          </Container>
        );
      }
    }
    return <Unauthorized />;
  };
  return <>{main()}</>;
};

export default IndividualCustomer;
