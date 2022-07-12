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
import { useParams } from "react-router-dom";
import { getBranches } from "../../../store/actionCreators/Branch/BranchAction";
import { getAdminRoles } from "../../../store/actionCreators/User/UserAction";
import Unauthorized from "../../unauthorized";
import {
  fetchSingleAdmin,
  updateSingleAdminInfo,
} from "./../../../store/actionCreators/User/UserAction";

const UpdateAdminInfo = (props) => {
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch);
  const franchise = useSelector((state) => state.franchise);
  const admin_role = useSelector((state) => state.admin_role);
  const single_admin = useSelector((state) => state.single_admin);
  const login = useSelector((state) => state.login);
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
  const [pwdChange, setPwdChange] = useState(false);
  const [error, setError] = useState(false);
  const [access, setAccess] = useState([]);
  const params = useParams();
  useEffect(() => {
    dispatch(getBranches());
    dispatch(getAdminRoles());
    dispatch(fetchSingleAdmin(params.admin_id));
    editPermissions();
  }, []);
  console.log(access)
  console.log(single_admin)

  useEffect(() => {
    setDefaultData();
  }, [single_admin]);

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

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const setDefaultData = () => {
    let single_admin_data = {};
    if (single_admin.data) single_admin_data = single_admin.data.admins[0];
    const admin_branch = branch.data.data.filter(
      (br) => br.branch_id === single_admin_data.branch_id
    )[0];
    const admin_franchise = franchise.data.data.filter(
      (fr) => fr.franchise_id === single_admin_data.franchise_id
    )[0];
    const admin_role_clone = admin_role.data.data.filter(
      (fr) => fr.admin_role_id === single_admin_data.admin_role_id
    )[0];
    setState({
      ...single_admin_data,
      password: "",
      date_of_birth: formatDate(single_admin_data.date_of_birth),
    });
    setCurrBranch(admin_branch.branch_name);
    setCurrFran(admin_franchise.franchise_name);
    setCurrRole(admin_role_clone.admin_role);
    setAccess(
      single_admin_data.admin_permissions.map((item) => ({
        Module_Name: item.module,
        Read: item.read,
        Write: item.write,
      }))
    );
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

  const handleCheck = (info) => {
    const modules = access.map((item) => {
      if (item.Module_Name === info.Module_Name)
        return { ...item, [info.type]: info.value };
      return item;
    });

    setAccess(modules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateSingleAdminInfo({
        admin_id: params.admin_id,
        username: state.username,
        phone: state.phone,
        email: state.email,
        password: state.password,
        date_of_birth: state.date_of_birth,
        branch_id: state.branch_id,
        franchise_id: state.franchise_id,
        admin_role_id: state.admin_role_id,
        gender: state.gender,
        Permissions: access.map((item) => ({
          module: item.Module_Name,
          read: item.Read,
          write: item.Write,
        })),
      })
    );
    e.preventDefault();
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
            <div className="form-container">
              <div className="form-head">Add New Admin</div>
              <div className="form-body">
                <Form onSubmit={handleSubmit} className="needs-validation">
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
                          required={pwdChange}
                          disabled={!pwdChange}
                          value={state.password}
                          onChange={(e) =>
                            setState({ ...state, password: e.target.value })
                          }
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3 p-2">
                        <label className="form-label">
                          Also Update Password
                        </label>
                        <Form.Check
                          type={`checkbox`}
                          id={`change_pwd`}
                          checked={pwdChange}
                          onChange={() => {
                            setPwdChange(!pwdChange);
                            setState({ ...state, password: "" });
                          }}
                          isValid
                        // label={"Also update password"}
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
                  <Row></Row>
                  <Row>
                    <Col>
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
                                  id={`default${item.Module_Name}_1`}
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
                                  id={`default${item.Module_Name}_2`}
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
                    </Col>
                  </Row>
                  <div className="p-2 d-flex">
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
          </div>
        </Container>
      );
    else return <Unauthorized />;
  };

  return <div>{main()}</div>;
};

export default UpdateAdminInfo;
