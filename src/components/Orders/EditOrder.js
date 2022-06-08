import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import { getSingleOrder } from "../../store/actionCreators/Orders/OrdersAction";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import Select from "react-select";
import {
  updateSingleOrder,
  updateSingleProductItem,
} from "./../../store/actionCreators/Orders/OrdersAction";

const EditOrder = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const branch = useSelector((state) => state.branch);
  const [orderData, setOrderData] = useState({});
  const [productObj, setProductObj] = useState({});
  const [displayRows, setDisplayRows] = useState([]);
  const [productItemRadios, setProductItemRadios] = useState({});
  const [pIRAllFalse, setPIRAllFalse] = useState({});

  useEffect(() => {
    dispatch(getSingleOrder(params.order_id));
  }, []);

  useEffect(() => {
    console.log(order);
    setDefaultData();
  }, [order]);

  useEffect(() => {
    getDisplayRows();
  }, [productObj, productItemRadios]);

  const setDefaultData = () => {
    if (order.data) {
      setOrderData(order.data);
      const prodObj = {};

      order.data.order_items.forEach((oi) => {
        prodObj[oi.product_id] = oi;
      });
      setProductObj(prodObj);
    }
  };

  const defaultSorted = [
    {
      dataField: "product_name",
      order: "asc",
    },
  ];

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal",
        }}
      >
        <Button
          disabled={productItemRadios[row.product_id] === true ? false : true}
          // onClick={(e) => e.preventDefault()}
          className={`btn btn-sm ${
            productItemRadios[row.product_id] === true
              ? "btn-warning"
              : "btn-light"
          }`}
          onClick={() => onUpdateOrderItem(row.product_id)}
        >
          Update
        </Button>
      </div>
    );
  }

  const onUpdateOrderItem = (product_id) => {
    dispatch(updateSingleProductItem(productObj[product_id]));
  };

  const onUpdateOrder = () => {
    dispatch(updateSingleOrder(orderData));
  };

  const getAddOnsString = (add_ons) => {
    const add_ons_str = "";
    Object.keys(add_ons).forEach((ao) => {
      add_ons_str += `${ao}:${add_ons[ao]}, `;
    });
    return add_ons_str;
  };

  const onChangeSingleProduct = (product_id, field_name, field_value) => {
    const prodObj = { ...productObj };
    prodObj[product_id][field_name] = field_value;
    setProductObj(prodObj);
  };

  const getDisplayRows = () => {
    if (Object.keys(productObj).length === 0) setDisplayRows([]);
    const rows = order.data.order_items.map((oi) => {
      if (productObj[oi.product_id])
        return {
          product_id: oi.product_id,
          editable: (
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal",
              }}
            >
              <Form.Check
                type="checkbox"
                id="editable-checkbox"
                checked={
                  productItemRadios[oi.product_id] === true ? true : false
                }
                onChange={() => {
                  const prodItemRadios = {};
                  prodItemRadios[oi.product_id] = true;
                  setProductItemRadios(prodItemRadios);
                  getDisplayRows();
                }}
              />
            </div>
          ),
          product_name: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].product_name
                    ? productObj[oi.product_id].product_name
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "product_name",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          product_type: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].product_type
                    ? productObj[oi.product_id].product_type
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "product_type",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          prepare_time: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].prepare_time
                    ? productObj[oi.product_id].prepare_time
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "prepare_time",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          quantity: (
            <div style={{ width: "8rem" }}>
              <input
                type="number"
                value={
                  productObj[oi.product_id].quantity
                    ? productObj[oi.product_id].quantity
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "quantity",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          quantity_completed: (
            <div style={{ width: "8rem" }}>
              <input
                type="number"
                value={
                  productObj[oi.product_id].quantity_completed
                    ? productObj[oi.product_id].quantity_completed
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "quantity_completed",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          total_price: (
            <div style={{ width: "8rem" }}>
              <input
                type="number"
                value={
                  productObj[oi.product_id].total_price
                    ? productObj[oi.product_id].total_price
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "total_price",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          order_sku: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].order_sku
                    ? productObj[oi.product_id].order_sku
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "order_sku",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          food_type: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].food_type
                    ? productObj[oi.product_id].food_type
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "food_type",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          delivery_status: (
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal",
              }}
            >
              <Form.Check
                type="checkbox"
                id="delivery-status-checkbox"
                checked={
                  productObj[oi.product_id].delivery_status
                    ? productObj[oi.product_id].delivery_status
                    : false
                }
                onChange={() => {
                  onChangeSingleProduct(
                    oi.product_id,
                    "delivery_status",
                    productObj[oi.product_id].delivery_status ? false : true
                  );
                }}
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          discount: (
            <div style={{ width: "8rem" }}>
              <input
                type="number"
                value={
                  productObj[oi.product_id].discount
                    ? productObj[oi.product_id].discount
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "discount",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          add_ons: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].add_ons
                    ? getAddOnsString(productObj[oi.product_id].add_ons)
                    : ""
                }
                className="form-control"
                readOnly
                disabled
              />
            </div>
          ),
          completed_time: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].completed_time
                    ? productObj[oi.product_id].completed_time
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "completed_time",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          comment: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].comment
                    ? productObj[oi.product_id].comment
                    : ""
                }
                onChange={(e) =>
                  onChangeSingleProduct(
                    oi.product_id,
                    "comment",
                    e.target.value
                  )
                }
                className="form-control"
                readOnly={!productItemRadios[oi.product_id]}
                disabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          prepared_by: (
            <div style={{ width: "8rem" }}>
              <Select
                options={props.empArray.map((e) => ({
                  label: e.full_name,
                  value: e.employee_id,
                }))}
                value={{
                  label: props.empObj[oi.prepared_by]
                    ? props.empObj[oi.prepared_by]
                    : "None",
                  value: oi.prepared_by,
                }}
                onChange={(e) =>
                  onChangeSingleProduct(oi.product_id, "prepared_by", e.value)
                }
                readOnly={!productItemRadios[oi.product_id]}
                isDisabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
          status: (
            <div style={{ width: "8rem" }}>
              <Select
                options={[
                  { label: "HOLD", value: "HOLD" },
                  { label: "COMPLETED", value: "COMPLETED" },
                  { label: "PREPARING", value: "PREPARING" },
                  { label: "CANCELLED", value: "CANCELLED" },
                ]}
                style={{ width: "8rem" }}
                value={{
                  label: productObj[oi.product_id].status
                    ? productObj[oi.product_id].status
                    : "STATUS",
                  value: productObj[oi.product_id].status,
                }}
                onChange={(e) =>
                  onChangeSingleProduct(oi.product_id, "status", e.value)
                }
                readOnly={!productItemRadios[oi.product_id]}
                isDisabled={!productItemRadios[oi.product_id]}
              />
            </div>
          ),
        };
      return { ...oi, add_ons: "", product_id: oi.product_id };
    });

    setDisplayRows(rows);
  };

  const columns = [
    {
      dataField: "editable",
      text: "Editable",
      sort: true,
    },
    {
      dataField: "product_name",
      text: "Product Name",
      sort: true,
    },
    {
      dataField: "product_type",
      text: "Product Type",
      sort: true,
    },
    {
      dataField: "prepare_time",
      text: "Prepare Time",
      sort: true,
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
    },
    {
      dataField: "quantity_completed",
      text: "Quantity Completed",
      sort: true,
    },
    {
      dataField: "total_price",
      text: "Total Price",
      sort: true,
    },
    {
      dataField: "order_sku",
      text: "Order SKU",
      sort: true,
    },
    {
      dataField: "food_type",
      text: "Food Type",
      sort: true,
    },
    {
      dataField: "delivery_status",
      text: "Delivery Status",
      sort: true,
    },
    {
      dataField: "discount",
      text: "Discount",
      sort: true,
    },
    {
      dataField: "add_ons",
      text: "Add Ons",
      sort: true,
    },
    {
      dataField: "completed_time",
      text: "Completed Time",
      sort: true,
    },
    {
      dataField: "comment",
      text: "Comment",
      sort: true,
    },
    {
      dataField: "prepared_by",
      text: "Prepared By",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "Update",
      text: "Actions",
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];

  const pageOptions = {
    sizePerPage: Object.keys(productObj).length,
    totalSize: Object.keys(productObj).length, // replace later with size(customers),
    custom: true,
  };

  const onChangeFields = (field_name, field_value) => {
    const orderDataClone = { ...orderData };
    orderDataClone[field_name] = field_value;
    setOrderData(orderDataClone);
  };

  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <Row>
        <Col lg={9} sm={6} xs={12} className="dash-head">
          Order Dashboard
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <div className="page-content">
          <form>
            <Row>
              <Col className="col-12">
                <Card>
                  <Card.Body>
                    <Card.Title className="h4 mb-4 my-auto">
                      Order Data
                    </Card.Title>
                    <Row>
                      <Col>
                        <div>
                          <label>Order ID</label>
                          <input
                            type="text"
                            placeholder="order Id"
                            disabled
                            readOnly
                            className="form-control"
                            value={orderData.order_id ? orderData.order_id : ""}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Order Type</label>
                          <input
                            type="text"
                            placeholder="Order Type"
                            className="form-control"
                            value={
                              orderData.order_type ? orderData.order_type : ""
                            }
                            onChange={(e) =>
                              onChangeFields("order_type", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Branch Name</label>

                          <Select
                            options={props.branchArray.map((b) => ({
                              label: b.branch_name,
                              value: b.branch_id,
                            }))}
                            value={{
                              label: props.branchObj[orderData.branch_id],
                              value: orderData.branch_id,
                            }}
                            onChange={(e) =>
                              onChangeFields("branch_id", e.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Address</label>
                          <input
                            type="text"
                            placeholder="Address"
                            className="form-control"
                            value={orderData.address ? orderData.address : ""}
                            onChange={(e) =>
                              onChangeFields("address", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Employee Name</label>
                          <Select
                            options={props.empArray.map((e) => ({
                              label: e.full_name,
                              value: e.employee_id,
                            }))}
                            value={{
                              label: props.empObj[orderData.employee_id]
                                ? props.empObj[orderData.employee_id]
                                : "Employee Name",
                              value: orderData.prepared_by,
                            }}
                            onChange={(e) =>
                              onChangeFields("employee_id", e.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Customer Mobile Number</label>
                          <input
                            type="number"
                            placeholder="mobile number"
                            className="form-control"
                            value={
                              orderData.customer_no ? orderData.customer_no : ""
                            }
                            onChange={(e) =>
                              onChangeFields("customer_no", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Payment ID</label>
                          <input
                            type="text"
                            placeholder="payment ID"
                            className="form-control"
                            value={
                              orderData.payment_id ? orderData.payment_id : ""
                            }
                            onChange={(e) =>
                              onChangeFields("payment_id", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Payment Method</label>
                          <input
                            type="text"
                            placeholder="Payment Method"
                            className="form-control"
                            value={
                              orderData.payment_method
                                ? orderData.payment_method
                                : ""
                            }
                            onChange={(e) =>
                              onChangeFields("payment_method", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Paid</label>
                          <Form.Check
                            type="checkbox"
                            id="paid-checkbox"
                            isValid={true}
                            checked={orderData.paid ? orderData.paid : false}
                            onChange={() =>
                              onChangeFields(
                                "paid",
                                orderData.paid ? false : true
                              )
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Paid Price</label>
                          <input
                            type="number"
                            placeholder="Order amount"
                            className="form-control"
                            value={
                              orderData.paid_price ? orderData.paid_price : ""
                            }
                            onChange={(e) =>
                              onChangeFields("paid_price", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Account ID</label>
                          <input
                            type="text"
                            placeholder="Account ID"
                            disabled
                            readOnly
                            className="form-control"
                            value={
                              orderData.account_id ? orderData.account_id : ""
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Change</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="change amount"
                            value={orderData.change ? orderData.change : ""}
                            onChange={(e) =>
                              onChangeFields("change", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Tax</label>
                          <input
                            type="number"
                            placeholder="tax"
                            className="form-control"
                            value={orderData.tax ? orderData.tax : ""}
                            onChange={(e) =>
                              onChangeFields("tax", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Discount</label>
                          <input
                            type="number"
                            placeholder="discount"
                            className="form-control"
                            value={orderData.discount ? orderData.discount : ""}
                            onChange={(e) =>
                              onChangeFields("discount", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Sub Total</label>
                          <input
                            type="number"
                            placeholder="Sub total"
                            className="form-control"
                            value={
                              orderData.sub_total ? orderData.sub_total : ""
                            }
                            onChange={(e) =>
                              onChangeFields("sub_total", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Placed At</label>
                          <input
                            type="text"
                            placeholder="placed at"
                            disabled
                            readOnly
                            className="form-control"
                            value={`${new Date(
                              orderData.createdAt
                            ).toLocaleTimeString()} ${new Date(
                              orderData.createdAt
                            ).toDateString()}`}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>status</label>
                          <Select
                            options={[
                              { label: "HOLD", value: "HOLD" },
                              { label: "COMPLETED", value: "COMPLETED" },
                              { label: "PREPARING", value: "PREPARING" },
                              { label: "CANCELLED", value: "CANCELLED" },
                            ]}
                            value={{
                              label: orderData.status ? orderData.status : "",
                              value: orderData.status,
                            }}
                            onChange={(e) => onChangeFields("status", e.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Start Time</label>
                          <input
                            type="text"
                            disabled
                            readOnly
                            placeholder="start time"
                            className="form-control"
                            value={
                              orderData.start_time ? orderData.start_time : ""
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Completed Time</label>
                          <input
                            type="text"
                            disabled
                            readOnly
                            placeholder="completed time"
                            className="form-control"
                            value={
                              orderData.commpleted_time
                                ? orderData.commpleted_time
                                : ""
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Order Rec Time</label>
                          <input
                            type="text"
                            placeholder="order rec time"
                            disabled
                            readOnly
                            className="form-control"
                            value={
                              orderData.order_rec_time
                                ? orderData.order_rec_time
                                : ""
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Applied Coupons</label>
                          <input
                            type="text"
                            placeholder="applied coupons"
                            className="form-control"
                            value={
                              orderData.applied_coupons
                                ? orderData.applied_coupons.coupon
                                  ? orderData.applied_coupons.coupon
                                  : ""
                                : ""
                            }
                            onChange={(e) => {
                              const orderDataClone = { ...orderData };
                              orderDataClone.applied_coupons = {};
                              orderDataClone.applied_coupons.coupon =
                                e.target.value;
                              setOrderData(orderDataClone);
                            }}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Comment</label>
                          <input
                            type="text"
                            placeholder="comment"
                            className="form-control"
                            value={orderData.comment ? orderData.comment : ""}
                            onChange={(e) =>
                              onChangeFields("comment", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <div>
                          <label>Delivery Status</label>
                          <Form.Check
                            type="checkbox"
                            id="delivery-checkbox"
                            isValid={true}
                            checked={
                              orderData.delivery_status
                                ? orderData.delivery_status
                                : false
                            }
                            onChange={() =>
                              onChangeFields(
                                "delivery_status",
                                orderData.delivery_status ? false : true
                              )
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Message Status</label>
                          <Form.Check
                            type="checkbox"
                            id="msg-checkbox"
                            isValid={true}
                            checked={
                              orderData.msg_status
                                ? orderData.msg_status
                                : false
                            }
                            onChange={() =>
                              onChangeFields(
                                "msg_status",
                                orderData.msg_status ? false : true
                              )
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Received</label>

                          <input
                            type="number"
                            placeholder="received"
                            className="form-control"
                            value={orderData.received ? orderData.received : ""}
                            onChange={(e) =>
                              onChangeFields("received", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Total Items</label>
                          <input
                            type="number"
                            placeholder="total items"
                            className="form-control"
                            value={
                              orderData.total_items ? orderData.total_items : ""
                            }
                            onChange={(e) =>
                              onChangeFields("total_items", e.target.value)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Button
                        className="btn btn-warning my-4"
                        onClick={onUpdateOrder}
                      >
                        {" "}
                        Update Above Order Data
                      </Button>
                    </Row>
                    <Row>
                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="product_id"
                        columns={columns}
                        data={displayRows}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="product_id"
                            columns={columns}
                            data={displayRows}
                          >
                            {(toolkitProps) => (
                              <React.Fragment>
                                <Col className="col-xl">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"product_id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </React.Fragment>
                            )}
                          </ToolkitProvider>
                        )}
                      </PaginationProvider>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default EditOrder;
