import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/actionCreators/Employees/EmployeeAction";
import { fetchEmployeesReducer } from "../../store/reducers/Employee/EmployeeReducer";
import Unauthorized from "../unauthorized";
import EmployeeTable from "./EmployeeTable";
const EmployeeDashBoard = (props) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.empPage);
  const filters = useSelector((state) => state.dashboard_filters);
  const [franchiseName, setfranchiseName] = useState("All");
  const [branchArray, setBranchArray] = useState(["All"]);
  const [currentFilter, setCurrentFilters] = useState({
    branch: { branch_name: "All", branch_id: "All" },
    franchise: { franchise_name: "All", franchise_id: "All" },
  });
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const login = useSelector((state) => state.login);
  const employees = useSelector((state) => state.employees);
  useEffect(() => {
    dispatch(
      fetchEmployees(
        page,
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        ""
      ) 
    );
    editPermissions();
  }, [currentFilter, page]);
  const FranchiseDrop = () => {
    if (filters.data) {
      return filters.data.data.map((item, index) => {
        return (
          <option key={index} value={index}>
            {item.franchise_name}
          </option>
        );
      });
    }
  };
  console.log("currentFilters", employees);
  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "Employees") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };
  const handleFranchiseChange = (e) => {
    const index = e.target.value;
    setfranchiseName(filters.data.data[index].franchise_name);
    setBranchArray(filters.data.data[index].branches);
    setCurrentFilters({
      branch: {
        branch_name: filters.data.data[index].branches[0].branch_name,
        branch_id: filters.data.data[index].branches[0].branch_id,
      },
      franchise: {
        franchise_name: filters.data.data[index].franchise_name,
        franchise_id: filters.data.data[index].franchise_id,
      },
    });
  };
  const BranchDrop = () => {
    return branchArray.map((item, index) => {
      return (
        <option
          key={index}
          value={`["${item.branch_name}","${item.branch_id}"]`}
        >
          {item.branch_name ? item.branch_name : item}
        </option>
      );
    });
  };
  const handleBranchChange = (e) => {
    let item = JSON.parse(e.target.value);
    setCurrentFilters({
      ...currentFilter,
      branch: { branch_name: item[0], branch_id: item[1] },
    });
  };
  const main = () => {
    if (props.viewPermission) {
      if (employees.data) {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <Row>
              <Col lg={9} sm={6} xs={12} className="dash-head">
                Employee Dashboard
              </Col>
              <Col lg={3} sm={6} xs={12}>
                <Row>
                  <Col>
                    <div className="form-group drop-dash">
                      <select
                        className="form-control form-select form-select-sm"
                        name="year"
                        onChange={handleFranchiseChange}
                      >
                        {FranchiseDrop()}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group drop-dash">
                      <select
                        className="form-control form-select form-select-sm"
                        name="year"
                        onChange={handleBranchChange}
                      >
                        {BranchDrop()}
                      </select>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              {employees.data.status === "failure" ? (
                <h3>No Results Found</h3>
              ) : (
                <EmployeeTable
                  employee={props.employee}
                  currEmployee={props.employee}
                  setEmployee={props.setEmployee}
                />
              )}
            </Row>
          </Container>
        );
      }
    } else return <Unauthorized />;
  };
  return <>{main()}</>;
};

export default EmployeeDashBoard;
