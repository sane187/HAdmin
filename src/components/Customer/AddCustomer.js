import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../store/actionCreators/Branch/BranchAction";
import ReactMultiselectCheckboxes from "react-multiselect-checkboxes/lib/ReactMultiselectCheckboxes";
import { addNewCustomer } from "../../store/actionCreators/Customers/CustomerAction";
import Unauthorized from "../unauthorized";
import Select from "react-select";

const AddCustomer = (props) => {
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch);
  const customer_roles = useSelector((state) => state.customer_roles);
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    profile_pic:
      "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png",
    mobile_no: "",
    email: "",
    date_of_birth: "",
    gender: "female",
    branch: "",
    branch_id: "",
    shipping_address: {
      address: "",
      pincode: "",
    },
    billing_address: {
      address: "",
      pincode: "",
    },
    customer_type: "",
  });

  const displayBranches = () => {
    if (branch.data) {
      return branch.data.data.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.branch_id}
            eventKey={`["${item.branch_name}","${item.branch_id}"]`}
          >
            {" "}
            {item.branch_name}
          </Dropdown.Item>
        );
      });
    }
  };
  const handleSelectB = (e) => {
    const item = JSON.parse(e);
    setCustomer({ ...customer, branch: item[0], branch_id: item[1] });
  };
  useEffect(() => {
    dispatch(getBranches());
  }, []);

  const handleSubmit = (e) => {
    if (customer.branch) {
      addNewCustomer(customer);
    }

    e.preventDefault();
  };

  const handleChange = (input) => (e) => {
    setCustomer({ ...customer, [input]: e.target.value });
  };

  if (props.editPermission)
    return (
      <Container
        fluid
        className={props.sideToggle === true ? "closeDash" : "openDash"}
        style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
      >
        <div className="row d-flex justify-content-center">
          <div className="form-container">
            <div className="form-head">Add New Customer</div>
            <div className="form-body">
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customer.first_name}
                        onChange={handleChange("first_name")}
                        aria-describedby="emailHelp"
                        required
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
                        value={customer.last_name}
                        onChange={handleChange("last_name")}
                        aria-describedby="emailHelp"
                        required
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
                        value={customer.email}
                        onChange={handleChange("email")}
                        aria-describedby="emailHelp"
                        required
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
                        value={customer.mobile_no}
                        onChange={handleChange("mobile_no")}
                        aria-describedby="emailHelp"
                        required
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
                        value={customer.date_of_birth}
                        onChange={handleChange("date_of_birth")}
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </Col>

                  <Col>
                    {" "}
                    <div className="mb-3 p-2 ">
                      <label className="form-label">Branch</label>
                      <div className="d-flex">
                        <DropdownButton
                          variant="light"
                          title="Branch"
                          id="dropdown-menu-align-right"
                          onSelect={handleSelectB}
                        >
                          {displayBranches()}
                        </DropdownButton>
                        <span className="ms-3 p-2">{customer.branch}</span>
                      </div>
                    </div>
                  </Col>
                  <Col>
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
                          value={{
                            label: customer.customer_type,
                            value: customer.customer_type,
                          }}
                          onChange={(e) =>
                            setCustomer({ ...customer, customer_type: e.value })
                          }
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
                            value={"male"}
                            onChange={handleChange("gender")}
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            value={"female"}
                            onChange={handleChange("gender")}
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Female
                          </label>
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
                        value={customer.billing_address.address}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            billing_address: {
                              ...customer.billing_address,
                              address: e.target.value,
                            },
                          });
                        }}
                        className="form-control"
                        aria-describedby="emailHelp"
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
                        type="text"
                        value={customer.billing_address.pincode}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            billing_address: {
                              ...customer.billing_address,
                              pincode: e.target.value,
                            },
                          });
                        }}
                        className="form-control"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Shipping Address</label>
                      <input
                        type="text"
                        value={customer.shipping_address.address}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            shipping_address: {
                              ...customer.shipping_address,
                              address: e.target.value,
                            },
                          });
                        }}
                        className="form-control"
                        aria-describedby="emailHelp"
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
                        value={customer.shipping_address.pincode}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            shipping_address: {
                              ...customer.shipping_address,
                              pincode: e.target.value,
                            },
                          });
                        }}
                        className="form-control"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </Col>
                </Row>
                <Row></Row>
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
  return <Unauthorized />;
};

export default AddCustomer;
