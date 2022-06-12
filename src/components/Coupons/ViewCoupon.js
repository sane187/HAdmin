import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col, Card, Button } from "react-bootstrap";
import { addNewCoupon } from "../../store/actionCreators/Coupons/CouponsAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoupon } from "./../../store/actionCreators/Coupons/CouponsAction";

const ViewCoupon = ({
  branchArray,
  groupArray,
  empArray,
  empObj,
  branchObj,
}) => {
  const coupon = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const params = useParams();

  const [data, setData] = useState({
    coupon_code: "",
    title: "",
    start: "",
    end: "",
    disc_percent: "",
    flat_discount: "",
    customer_no: "",
    employee_id: "",
    branch_id: "",
    min_cart: "",
    customer_group_name: "",
  });

  useEffect(() => {
    dispatch(getCoupon(params.coupon_id));
  }, []);

  useEffect(() => {
    setData(coupon);
  }, [coupon]);

  return (
    <div className="page-content ">
      <Row>
        <Col className="col-12">
          <Card>
            <Card.Body>
              <div className="d-flex">
                <Card.Title className="h4 mb-4 my-auto">
                  View Coupon Data
                </Card.Title>
              </div>
              <Row className="mb-2">
                <Col>
                  <label>Coupon Code</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="coupon_code"
                    value={data.coupon_code}
                  />
                </Col>
                <Col>
                  <label>Title</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="title"
                    value={data.title}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <label>Start Date</label>
                  <input
                    disabled
                    type="date"
                    className="form-control"
                    id="start"
                    value={data.start}
                  />
                </Col>
                <Col>
                  <label>End Date</label>
                  <input
                    disabled
                    type="date"
                    className="form-control"
                    id="end"
                    value={data.end}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <label>Discount Percent</label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    id="disc_percent"
                    value={data.disc_percent}
                  />
                </Col>
                <Col>
                  <label>Flat Discount</label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    id="flat_discount"
                    value={data.flat_discount}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <label>Customer Mobile Number</label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    id="customer_no"
                    value={data.customer_no}
                  />
                </Col>
                <Col>
                  <label>Employee</label>
                  <Select
                    isDisabled
                    options={empArray.map((e) => ({
                      label: e.full_name,
                      value: e.employee_id,
                    }))}
                    id="employee_id"
                    value={{
                      label: empObj[data.employee_id]
                        ? empObj[data.employee_id]
                        : "Employee",
                      value: data.employee_id,
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <label>Branch</label>
                  <Select
                    isDisabled
                    options={branchArray.map((b) => ({
                      label: b.branch_name,
                      value: b.branch_id,
                    }))}
                    id="branch_id"
                    value={{
                      label: branchObj[data.branch_id]
                        ? branchObj[data.branch_id]
                        : "Branch",
                      value: data.branch_id,
                    }}
                  />
                </Col>
                <Col>
                  <label>Minimum Cart Value</label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    id="min_cart"
                    value={data.min_cart}
                  />
                </Col>
                <Col>
                  <label>Customer Group Name</label>
                  <Select
                    isDisabled
                    options={groupArray.map((g) => ({
                      label: g,
                      value: g,
                    }))}
                    id="customer_group_name"
                    value={{
                      label: data.customer_group_name
                        ? data.customer_group_name
                        : "Group",
                      value: data.customer_group_name,
                    }}
                  />
                </Col>
              </Row>
              {/* <Row className="d-flex">
                <div className="d-flex">
                  <Button
                    className="btn btn-warning ml-auto"
                    style={{ marginLeft: "auto" }}
                    onClick={handleAddCoupon}
                  >
                    Add Coupon
                  </Button>
                </div>
              </Row> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewCoupon;
