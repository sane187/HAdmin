import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col, Card, Button } from "react-bootstrap";
import { updateCoupon } from "../../store/actionCreators/Coupons/CouponsAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoupon } from "./../../store/actionCreators/Coupons/CouponsAction";

const EditCoupon = ({
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

  const handleUpdateCoupon = () => {
    dispatch(updateCoupon(data));
  };

  const onChangeFields = (field_name, value) => {
    const dataClone = { ...data };
    dataClone[field_name] = value;
    setData(dataClone);
  };

  return (
    <div className="page-content ">
      <Row>
        <Col className="col-12">
          <Card>
            <Card.Body>
              <div className="d-flex">
                <Card.Title className="h4 mb-4 my-auto">
                  Update Coupon Data
                </Card.Title>
              </div>
              <form onSubmit={handleUpdateCoupon}>
                <Row className="mb-2">
                  <Col>
                    <label>Coupon Code</label>
                    <input
                      onChange={(e) =>
                        onChangeFields("coupon_code", e.target.value)
                      }
                      type="text"
                      className="form-control"
                      id="coupon_code"
                      value={data.coupon_code ? data.coupon_code : ""}
                      required
                    />
                  </Col>
                  <Col>
                    <label>Title</label>
                    <input
                      onChange={(e) => onChangeFields("title", e.target.value)}
                      type="text"
                      className="form-control"
                      id="title"
                      value={data.title ? data.title : ""}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label>Start Date</label>
                    <input
                      type="date"
                      onChange={(e) => onChangeFields("start", e.target.value)}
                      className="form-control"
                      id="start"
                      value={data.start ? data.start : ""}
                    />
                  </Col>
                  <Col>
                    <label>End Date</label>
                    <input
                      type="date"
                      onChange={(e) => onChangeFields("end", e.target.value)}
                      className="form-control"
                      id="end"
                      value={data.end ? data.end : ""}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label>Discount Percent</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        onChangeFields("disc_percent", e.target.value)
                      }
                      className="form-control"
                      id="disc_percent"
                      value={data.disc_percent ? data.disc_percent : ""}
                    />
                  </Col>
                  <Col>
                    <label>Flat Discount</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        onChangeFields("flat_discount", e.target.value)
                      }
                      className="form-control"
                      id="flat_discount"
                      value={data.flat_discount ? data.flat_discount : ""}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label>Customer Mobile Number</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        onChangeFields("customer_no", e.target.value)
                      }
                      className="form-control"
                      id="customer_no"
                      value={data.customer_no ? data.customer_no : ""}
                    />
                  </Col>
                  <Col>
                    <label>Employee</label>
                    <Select
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
                      onChange={(e) => onChangeFields("employee_id", e.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <label>Branch</label>
                    <Select
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
                      onChange={(e) => onChangeFields("branch_id", e.value)}
                    />
                  </Col>
                  <Col>
                    <label>Minimum Cart Value</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        onChangeFields("min_cart", e.target.value)
                      }
                      className="form-control"
                      id="min_cart"
                      value={data.min_cart ? data.min_cart : ""}
                    />
                  </Col>
                  <Col>
                    <label>Customer Group Name</label>
                    <Select
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
                      onChange={(e) =>
                        onChangeFields("customer_group_name", e.value)
                      }
                    />
                  </Col>
                </Row>
                <Row className="d-flex">
                  <div className="d-flex">
                    <Button
                      className="btn btn-warning ml-auto"
                      style={{ marginLeft: "auto" }}
                      onClick={handleUpdateCoupon}
                    >
                      Update Coupon
                    </Button>
                  </div>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditCoupon;
