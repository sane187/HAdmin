import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleCustomer,
  updateCustomerData,
} from "../../store/actionCreators/Customers/CustomerAction";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getAllCustomerRoles } from "./../../store/actionCreators/Customers/CustomerRolesActions";
import { toast } from "react-toastify";

const EditCustomer = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const customer = useSelector((state) => state.single_customer);
  const customer_roles = useSelector((state) => state.customer_roles);

  const [data, setData] = useState({});
  const [changeCustomerType, setChangeCustomerType] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleCustomer(params.customer_no));
    dispatch(getAllCustomerRoles());
  }, []);

  useEffect(() => {
    setDefaultData();
  }, [customer]);

  const setDefaultData = () => {
    if (customer.data && customer.data.status === "success") {
      setData(customer.data.data);
    }
  };

  const onChangeFields = (field_name, value) => {
    const dataClone = { ...data };
    dataClone[field_name] = value;
    setData(dataClone);
  };

  const handleEditCustomer = (e) => {
    e.preventDefault();
    const {
      customer_id,
      first_name,
      last_name,
      mobile_no,
      email,
      date_of_birth,
      gender,
      branch,
      branch_id,
      customer_type,
      shipping_address,
      password,
      billing_address,
      perma_cat,
    } = data;

    const body = {
      customer_id,
      first_name,
      last_name,
      mobile_no,
      email,
      date_of_birth,
      gender,
      branch,
      branch_id,
      shipping_address,

      billing_address,
      perma_cat,
    };

    if (changePassword) {
      if (!data.password) {
        toast.error(
          `Please enter password or uncheck the change password field`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else {
        body.password = password;
      }
    }

    if (changeCustomerType) {
      body.customer_type = customer_type;
    }

    dispatch(updateCustomerData(body));
  };

  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <div className="row d-flex justify-content-center">
        <div className="form-container">
          <div className="form-head">Edit Customer data</div>
          <div className="form-body">
            <form onSubmit={handleEditCustomer}>
              <Row>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={data.first_name ? data.first_name : ""}
                      onChange={(e) =>
                        onChangeFields("first_name", e.target.value)
                      }
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={data.last_name ? data.last_name : ""}
                      onChange={(e) =>
                        onChangeFields("last_name", e.target.value)
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={data.email ? data.email : ""}
                      onChange={(e) => onChangeFields("email", e.target.value)}
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={data.mobile_no ? data.mobile_no : ""}
                      onChange={(e) =>
                        onChangeFields("mobile_no", e.target.value)
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Date Of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={data.date_of_birth ? data.date_of_birth : ""}
                      onChange={(e) =>
                        onChangeFields("date_of_birth", e.target.value)
                      }
                    />
                  </div>
                </Col>

                <Col>
                  {" "}
                  <div className="mb-3 p-2 ">
                    <label className="form-label">Branch</label>
                    <div className="">
                      <Select
                        options={props.branchArray.map((b) => ({
                          label: b.branch_name,
                          value: b.branch_id,
                        }))}
                        value={{
                          label: `${props.branchObj[data.branch_id]}`,
                          value: data.branch_id,
                        }}
                        onChange={(e) => onChangeFields("branch_id", e.value)}
                      />
                    </div>
                  </div>
                </Col>

                <Col>
                  <div className="mb-3 p-2 ">
                    <label className="form-label">Change Customer Type ?</label>
                    <div className="">
                      <input
                        type="checkbox"
                        id="customer_type"
                        checked={changeCustomerType}
                        onChange={() =>
                          setChangeCustomerType(!changeCustomerType)
                        }
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2 ">
                    <label className="form-label">Customer Type</label>
                    <div className="">
                      <Select
                        options={
                          customer_roles.data
                            ? customer_roles.data.status === "success"
                              ? customer_roles.data.all_customer_roles.map(
                                  (cr) => ({
                                    label: cr.customer_type,
                                    value: cr.customer_type,
                                  })
                                )
                              : []
                            : []
                        }
                        onChange={(e) =>
                          onChangeFields("customer_type", e.value)
                        }
                        value={{
                          label: data.customer_type,
                          value: data.customer_type,
                        }}
                        isDisabled={!changeCustomerType}
                      />
                    </div>
                  </div>
                </Col>

                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Gender</label>
                    <div className="d-flex">
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={data.gender === "male"}
                          onChange={() => onChangeFields("gender", "male")}
                        />
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check ">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={data.gender === "female"}
                          onChange={() => onChangeFields("gender", "female")}
                        />
                        <label className="form-check-label">Female</label>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Billing Address</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={
                        data.billing_address
                          ? data.billing_address.address
                            ? data.billing_address.address
                            : ""
                          : ""
                      }
                      onChange={(e) =>
                        onChangeFields("billing_address", {
                          ...data.billing_address,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">
                      Billing Address Pincode
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={
                        data.billing_address
                          ? data.billing_address.pincode
                            ? data.billing_address.pincode
                            : ""
                          : ""
                      }
                      onChange={(e) =>
                        onChangeFields("billing_address", {
                          ...data.billing_address,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">Shipping Address</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      value={
                        data.shipping_address
                          ? data.shipping_address.address
                            ? data.shipping_address.address
                            : ""
                          : ""
                      }
                      onChange={(e) =>
                        onChangeFields("shipping_address", {
                          ...data.shipping_address,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </Col>

                <Col>
                  {" "}
                  <div className="mb-3 p-2">
                    <label className="form-label">
                      Shipping Address Pincode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) =>
                        onChangeFields("shipping_address", {
                          ...data.shipping_address,
                          pincode: e.target.value,
                        })
                      }
                      value={
                        data.shipping_address
                          ? data.shipping_address.pincode
                            ? data.shipping_address.pincode
                            : ""
                          : ""
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-3 p-2 ">
                    <label className="form-label">Change Password ?</label>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        id="password"
                        checked={changePassword}
                        onChange={() => setChangePassword(!changePassword)}
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2 ">
                    <label className="form-label">Password</label>
                    <div className="d-flex">
                      <input
                        type="password"
                        className="form-control"
                        disabled={!changePassword}
                        onChange={(e) =>
                          onChangeFields("password", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="mb-3 p-2 ">
                    <label className="form-label">Permanent Category</label>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        checked={data.perma_cat ? true : false}
                        onChange={() =>
                          onChangeFields("perma_cat", !data.perma_cat)
                        }
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="p-2">
                <button className="btn btn-primary  " type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditCustomer;
