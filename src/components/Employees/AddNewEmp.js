import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import ReactMultiselectCheckboxes from "react-multiselect-checkboxes/lib/ReactMultiselectCheckboxes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../../css/employee/addNewEmployee.css";
import { getBranches } from "../../store/actionCreators/Branch/BranchAction";
import { addEmployees } from "../../store/actionCreators/Employees/EmployeeAction";
import Unauthorized from "../unauthorized";
const AddNewEmp = (props) => {
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch);
  const role = useSelector((state) => state.role);
  const login = useSelector((state) => state.login);
  const [state, setState] = useState({
    full_name: "",
    mobile_no: "",
    email: "",
    password: "",
    profile_pic:
      "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png",
    date_of_birth: "",
    address: "",
    branch: "",
    branch_id: "",
    employee_role: "",
    employee_role_id: "",
    gender: "",
  });

  const onStateChange = (input) => (e) => {
    setState({ ...state, [input]: e.target.value });
  };
  const submitForm = (e) => {
    if (
      state.branch !== "" &&
      state.employee_role !== "" &&
      state.full_name !== "" &&
      state.password
    ) {
      addEmployees(state);
      console.log(state);
    } else {
      toast.error(`Please fill the form completely`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    e.preventDefault();
  };
  useEffect(() => {
    dispatch(getBranches());
  }, []);

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
    setState({ ...state, branch: item[0], branch_id: item[1] });
  };
  // Roles Dropdown

  const displayRole = () => {
    if (role.data) {
      return role.data.emp_roles.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.employee_role_id}
            eventKey={`["${item.employee_role}","${item.employee_role_id}"]`}
          >
            {" "}
            {item.employee_role}
          </Dropdown.Item>
        );
      });
    }
  };
  const handleSelect = (e) => {
    const item = JSON.parse(e);
    setState({ ...state, employee_role: item[0], employee_role_id: item[1] });
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
            <div className="form-head">Add New Employee</div>
            <div className="form-body">
              <form>
                <Row>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Full Name</label>
                      <input
                        value={state.full_name}
                        onChange={onStateChange("full_name")}
                        type="text"
                        className="form-control"
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
                        value={state.mobile_no}
                        onChange={onStateChange("mobile_no")}
                        type="text"
                        className="form-control"
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
                        value={state.email}
                        onChange={onStateChange("email")}
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Password</label>
                      <input
                        value={state.password}
                        onChange={onStateChange("password")}
                        type="password"
                        className="form-control"
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
                        value={state.date_of_birth}
                        onChange={onStateChange("date_of_birth")}
                        type="date"
                        className="form-control"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Status</label>
                      <select
                        onChange={onStateChange("status")}
                        className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option defaultValue={"Active"}>Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
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
                        <span className="ms-3 p-2">{state.branch}</span>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Roles</label>
                      <div className="d-flex">
                        <DropdownButton
                          variant="light"
                          title="Roles"
                          id="dropdown-menu-align-right"
                          onSelect={handleSelect}
                        >
                          {displayRole()}
                        </DropdownButton>
                        <span className="ms-3 p-2">{state.employee_role}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Address</label>
                      <input
                        value={state.address}
                        onChange={onStateChange("address")}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        required
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="mb-5 p-2">
                      <label className="form-label">Gender</label>
                      <div className="d-flex">
                        <div className="form-check me-3">
                          <input
                            value={"male"}
                            onChange={onStateChange("gender")}
                            className="form-check-input"
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
                            value={"female"}
                            onChange={onStateChange("gender")}
                            className="form-check-input"
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
                <div className="p-2 mt-3">
                  <button className="btn btn-primary " onClick={submitForm}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  else return <Unauthorized />;
};

export default AddNewEmp;
