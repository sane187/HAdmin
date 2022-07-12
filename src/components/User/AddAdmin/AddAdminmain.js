import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Table,
  Row,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../../../store/actionCreators/Branch/BranchAction";
import { getAdminRoles } from "../../../store/actionCreators/User/UserAction";
import Unauthorized from "../../unauthorized";
import { addAdmin } from "./../../../store/actionCreators/User/UserAction";

const AddAdminmain = (props) => {

  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch);
  const franchise = useSelector((state) => state.franchise);
  const admin_role = useSelector((state) => state.admin_role);
  const login = useSelector((state) => state.login);
  const [section, setSection] = useState("1");
  const [state, setState] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    date_of_birth: "",
    branch_id: "",
    franchise_id: "",
    admin_role_id: "",
    gender: "",
  });
  const [currbranch, setCurrBranch] = useState("");
  const [currfran, setCurrFran] = useState("");
  const [currRole, setCurrRole] = useState("");
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const [error, setError] = useState(false);
  const [access, setAccess] = useState([
    { Module_Name: "Dashboard", Read: false, Write: false },
    { Module_Name: "Customer", Read: false, Write: false },
    { Module_Name: "Employees", Read: false, Write: false },
    { Module_Name: "Catalog", Read: false, Write: false },
    { Module_Name: "Franchise", Read: false, Write: false },
    { Module_Name: "User", Read: false, Write: false },
    { Module_Name: "Coupons", Read: false, Write: false },
    { Module_Name: "Orders", Read: false, Write: false },
    { Module_Name: "Group", Read: false, Write: false },
  ]);
  useEffect(() => {
    dispatch(getBranches());
    dispatch(getAdminRoles());
    editPermissions();
    console.log("Branch", branch);
  }, []);

  // setting permissions for accessing modules
  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "User") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };

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
    setState({ ...state, branch_id: item[1] });
    setCurrBranch(item[0]);
  };

  const displayRoles = () => {
    if (admin_role.data) {
      return admin_role.data.data.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.admin_role_id}
            eventKey={`["${item.admin_role}","${item.admin_role_id}"]`}
          >
            {" "}
            {item.admin_role}
          </Dropdown.Item>
        );
      });
    }
  };

  const handleSelectR = (e) => {
    const item = JSON.parse(e);
    setState({ ...state, admin_role_id: item[1] });
    setCurrRole(item[0]);
  };

  const displayFranchise = () => {
    if (branch.data) {
      return franchise.data.data.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.franchise_id}
            eventKey={`["${item.franchise_name}","${item.franchise_id}"]`}
          >
            {" "}
            {item.franchise_name}
          </Dropdown.Item>
        );
      });
    }
  };
  const handleSelectF = (e) => {
    const item = JSON.parse(e);
    setState({ ...state, franchise_id: item[1] });
    setCurrFran(item[0]);
  };
  const onNext = (e) => {
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      state.branch_id === "" ||
      state.admin_role_id === "" ||
      state.franchise_id === "" ||
      state.gender === ""
    ) {
      setError(true);
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log(state);
      setSection("2");
      setError(false);
    }

    e.preventDefault();
  };

  const handleCheck = (info) => {
    const modules = access.map((item) => {
      if (item.Module_Name === info.Module_Name)
        return { ...item, [info.type]: info.value };
      return item;
    });

    setAccess(modules);
  };

  const handleSubmit = (e) => {
    const obj = {
      ...state,
      Permissions: access.map((item) => ({
        module: item.Module_Name,
        read: item.Read,
        write: item.Write,
      })),
    };
    console.log(obj);
    e.preventDefault();
    dispatch(addAdmin(obj));
  };

  const main = () => {
    if (viewPermission && editPermission)
      return (
        <Container
          fluid
          className={props.sideToggle === true ? "closeDash" : "openDash"}
          style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
        >
          <div className="row d-flex justify-content-center">
            {section === "2" ? (
              <div className="form-container">
                <div className="form-head">Add New Admin</div>
                <div className="form-body">
                  <Form className="needs-validation" onSubmit={handleSubmit}>
                    <Table>
                      <thead>
                        <tr>
                          <th>Module Name</th>
                          <th>Read Access</th>
                          <th>Write Access</th>
                        </tr>
                      </thead>
                      <tbody>
                        {access.map((item) => (
                          <tr key={item.Module_Name}>
                            <td>{item.Module_Name}</td>
                            <td>
                              <Form.Check
                                type={`checkbox`}
                                id={`default${item.Module_Name}1`}
                                checked={item.Read}
                                isValid
                                onChange={() =>
                                  handleCheck({
                                    type: "Read",
                                    Module_Name: item.Module_Name,
                                    value: !item.Read,
                                  })
                                }
                              />
                            </td>
                            <td>
                              <Form.Check
                                type={`checkbox`}
                                id={`default${item.Module_Name}2`}
                                checked={item.Write}
                                onChange={() =>
                                  handleCheck({
                                    type: "Write",
                                    Module_Name: item.Module_Name,
                                    value: !item.Write,
                                  })
                                }
                                isValid
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Row></Row>
                    <div className="p-2 d-flex">
                      <button
                        type="back"
                        className="btn btn-primary mr-auto"
                        onClick={() => setSection("1")}
                      >
                        Go Back
                      </button>
                      <button
                        type="submit"
                        style={{ marginLeft: "auto" }}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            ) : (
              <div className="form-container">
                <div className="form-head">Add New Admin</div>
                <div className="form-body">
                  <Form onSubmit={onNext} className="needs-validation">
                    <Row>
                      <Col>
                        <div className="mb-3 p-2 position-relative">
                          <label className="form-label">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            aria-describedby="emailHelp"
                            required
                            value={state.username}
                            onChange={(e) =>
                              setState({ ...state, username: e.target.value })
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Please choose a username.
                          </Form.Control.Feedback>
                        </div>
                      </Col>
                      <Col>
                        {" "}
                        <div className="mb-3 p-2">
                          <label className="form-label">Mobile Number</label>
                          <input
                            type="number"
                            className="form-control"
                            aria-describedby="emailHelp"
                            minLength={10}
                            maxLength={10}
                            required
                            value={state.phone}
                            onChange={(e) =>
                              setState({ ...state, phone: e.target.value })
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
                            aria-describedby="emailHelp"
                            required
                            value={state.email}
                            onChange={(e) =>
                              setState({ ...state, email: e.target.value })
                            }
                          />
                        </div>
                      </Col>
                      <Col>
                        {" "}
                        <div className="mb-3 p-2">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            aria-describedby="emailHelp"
                            required
                            value={state.password}
                            onChange={(e) =>
                              setState({ ...state, password: e.target.value })
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
                            aria-describedby="emailHelp"
                            required
                            value={state.date_of_birth}
                            onChange={(e) =>
                              setState({
                                ...state,
                                date_of_birth: e.target.value,
                              })
                            }
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
                              title={currbranch ? currbranch : "Branch"}
                              id="dropdown-menu-align-right"
                              onSelect={handleSelectB}
                            >
                              {displayBranches()}
                            </DropdownButton>
                          </div>
                        </div>
                      </Col>

                      <Col>
                        {" "}
                        <div className="mb-3 p-2 ">
                          <label className="form-label">Admin Role</label>
                          <div className="d-flex">
                            <DropdownButton
                              variant="light"
                              title={currRole ? currRole : "Admin Role"}
                              id="dropdown-menu-align-right"
                              onSelect={handleSelectR}
                            >
                              {displayRoles()}
                            </DropdownButton>
                          </div>
                        </div>
                      </Col>

                      <Col>
                        {" "}
                        <div className="mb-3 p-2 ">
                          <label className="form-label">Franchise</label>
                          <div className="d-flex">
                            <DropdownButton
                              variant="light"
                              title={currfran ? currfran : "Franchise"}
                              id="dropdown-menu-align-right"
                              onSelect={handleSelectF}
                            >
                              {displayFranchise()}
                            </DropdownButton>
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
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                checked={state.gender === "male"}
                                onChange={() =>
                                  setState({ ...state, gender: "male" })
                                }
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
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                checked={state.gender === "female"}
                                onChange={() =>
                                  setState({ ...state, gender: "female" })
                                }
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
                    <div className="p-2">
                      {error ? (
                        <Alert
                          variant={"danger"}
                          className="p-1"
                          style={{ width: "100%" }}
                        >
                          Please input all the fields before moving to the next
                          section !
                        </Alert>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="p-2">
                      <button type="submit" className="btn btn-primary">
                        Next
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </Container>
      );
    else return <Unauthorized />;
  };

  return <div>{main()}</div>;
};

export default AddAdminmain;
