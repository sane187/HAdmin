import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import { getSingleOrder } from "../../store/actionCreators/Orders/OrdersAction";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

const ViewOrder = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [orderData, setOrderData] = useState({});
  const [productObj, setProductObj] = useState({});
  const [displayRows, setDisplayRows] = useState([]);

  useEffect(() => {
    dispatch(getSingleOrder(params.order_id));
  }, []);

  useEffect(() => {
    console.log(order);
    setDefaultData();
  }, [order]);

  useEffect(() => {
    getDisplayRows();
  }, [productObj]);

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

  const getAddOnsString = (add_ons) => {
    const add_ons_str = "";
    Object.keys(add_ons).forEach((ao) => {
      add_ons_str += `${ao}:${add_ons[ao]}, `;
    });
    return add_ons_str;
  };

  const getDisplayRows = () => {
    if (Object.keys(productObj).length === 0) setDisplayRows([]);
    const rows = order.data.order_items.map((oi) => {
      if (productObj[oi.product_id])
        return {
          product_id: oi.product_id,

          product_name: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                value={
                  productObj[oi.product_id].product_name
                    ? productObj[oi.product_id].product_name
                    : ""
                }
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                isValid={true}
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
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
                className="form-control"
                readOnly
                disabled
              />
            </div>
          ),
          prepared_by: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                className="form-control"
                value={
                  props.empObj[oi.prepared_by]
                    ? props.empObj[oi.prepared_by]
                    : "None"
                }
                readOnly
                isDisabled
                style={{ width: "8rem" }}
              />
            </div>
          ),
          status: (
            <div style={{ width: "8rem" }}>
              <input
                type="text"
                className="form-control"
                value={
                  productObj[oi.product_id].status
                    ? productObj[oi.product_id].status
                    : ""
                }
                readOnly
                isDisabled
                style={{ width: "8rem" }}
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
  ];

  const pageOptions = {
    sizePerPage: Object.keys(productObj).length,
    totalSize: Object.keys(productObj).length, // replace later with size(customers),
    custom: true,
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
                            disabled
                            className="form-control"
                            value={
                              orderData.order_type ? orderData.order_type : ""
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Branch Name</label>
                          <input
                            type="text"
                            placeholder="branch name"
                            disabled
                            className="form-control"
                            value={
                              props.branchObj[orderData.branch_id]
                                ? props.branchObj[orderData.branch_id]
                                : ""
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
                            disabled
                            className="form-control"
                            value={orderData.address ? orderData.address : ""}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div>
                          <label>Employee Name</label>
                          <input
                            type="text"
                            placeholder="employee name"
                            disabled
                            className="form-control"
                            value={
                              props.empObj[orderData.employee_id]
                                ? props.empObj[orderData.employee_id]
                                : ""
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Customer Mobile Number</label>
                          <input
                            type="text"
                            placeholder="mobile number"
                            disabled
                            className="form-control"
                            value={
                              orderData.customer_no ? orderData.customer_no : ""
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
                            disabled
                            className="form-control"
                            value={
                              orderData.payment_id ? orderData.payment_id : ""
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
                            disabled
                            className="form-control"
                            value={
                              orderData.payment_method
                                ? orderData.payment_method
                                : ""
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
                            disabled
                            isValid={true}
                            checked={orderData.paid ? orderData.paid : false}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Paid Price</label>
                          <input
                            type="text"
                            placeholder="Order amount"
                            disabled
                            className="form-control"
                            value={
                              orderData.paid_price ? orderData.paid_price : ""
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
                            type="text"
                            className="form-control"
                            disabled
                            placeholder="change amount"
                            value={orderData.change ? orderData.change : ""}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Tax</label>
                          <input
                            type="text"
                            placeholder="tax"
                            disabled
                            className="form-control"
                            value={orderData.tax ? orderData.tax : ""}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Discount</label>
                          <input
                            type="text"
                            placeholder="discount"
                            disabled
                            className="form-control"
                            value={orderData.discount ? orderData.discount : ""}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Sub Total</label>
                          <input
                            type="text"
                            placeholder="Sub total"
                            disabled
                            className="form-control"
                            value={
                              orderData.sub_total ? orderData.sub_total : ""
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
                          <input
                            type="text"
                            placeholder="Sub total"
                            disabled
                            className="form-control"
                            value={orderData.status ? orderData.status : ""}
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
                            placeholder="start time"
                            disabled
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
                            placeholder="completed time"
                            disabled
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
                            disabled
                            className="form-control"
                            value={
                              orderData.applied_coupons
                                ? orderData.applied_coupons.coupon
                                  ? orderData.applied_coupons.coupon
                                  : ""
                                : ""
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Comment</label>
                          <input
                            type="text"
                            placeholder="comment"
                            disabled
                            className="form-control"
                            value={orderData.comment ? orderData.comment : ""}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "2rem" }}>
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
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Received</label>
                          <input
                            type="text"
                            placeholder="received"
                            disabled
                            className="form-control"
                            value={orderData.received ? orderData.received : ""}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <label>Total Items</label>
                          <input
                            type="text"
                            placeholder="total items"
                            disabled
                            value={
                              orderData.total_items ? orderData.total_items : ""
                            }
                            className="form-control"
                          />
                        </div>
                      </Col>
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

export default ViewOrder;
