import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import CustomerTable from "./customerTable";
import { fetchCustomers } from "../../store/actionCreators/Customers/CustomerAction";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "../unauthorized";
const AllCustomer = (props) => {

  const dispatch = useDispatch();
  // Filters dropdown
  const filters = useSelector((state) => state.dashboard_filters);
  const [current, setcurrent] = useState({
    month: "Jan",
    year: 2022,
  });
  const page = useSelector((state) => state.customer_page);
  const currYear = new Date().getFullYear();
  const [franchiseName, setfranchiseName] = useState("All");
  const [branchArray, setBranchArray] = useState(["All"]);
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [currentFilter, setCurrentFilters] = useState({
    branch: { branch_name: "All", branch_id: "All" },
    franchise: { franchise_name: "All", franchise_id: "All" },
  });
  const yearArray = () => {
    let arrYear = [];
    for (let i = 0; i < currYear - 2017 + 1; i++) {
      arrYear.push(2017 + i);
    }
    return arrYear;
  };
  useEffect(() => {
    dispatch(
      fetchCustomers(
        page,
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        "mumbai"
      )
    );
  }, [page, current, currentFilter]);

  const monthDrop = () => {
    return monthArray.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };
  const handleMonthChange = (e) => {
    setcurrent({
      ...current,
      month: e.target.value,
    });
  };
  const yearDrop = () => {
    const year = yearArray();
    return year.map((item, index) => {
      if (item === currYear) {
        return (
          <option key={index} value={item} selected>
            {item}
          </option>
        );
      } else {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      }
    });
  };
  const handleYearChange = (e) => {
    setcurrent({
      ...current,
      year: e.target.value,
    });
  };
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
  if (props.editPermission || props.viewPermission)
    return (
      <React.Fragment>
        <Container
          fluid
          className={props.sideToggle === true ? "closeDash" : "openDash"}
          style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
        >
          <Row>
            <Col lg={8} sm={6} xs={12} className="dash-head">
              All Customers
            </Col>
            <Col lg={4} sm={6} xs={12}>
              <Row>
                <Col>
                  <div className="form-group drop-dash">
                    <select
                      className="form-control form-select form-select-sm"
                      name="month"
                      onChange={handleMonthChange}
                    >
                      {monthDrop()}
                    </select>
                  </div>
                </Col>
                <Col>
                  <div className="form-group drop-dash">
                    <select
                      className="form-control form-select form-select-sm"
                      name="year"
                      onChange={handleYearChange}
                    >
                      {yearDrop()}
                    </select>
                  </div>
                </Col>
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
          <CustomerTable
            
            permission={props}
          />
        </Container>
      </React.Fragment>
    );
   
  return <Unauthorized />;
};
export default AllCustomer;
