import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "../../css/customer/customerTable.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeePagination from "./EmployeePagination";
import {
  fetchSingleEmployee,
  setOrderPagination,
} from "../../store/actionCreators/Employees/EmployeeAction";

const EmployeeTable = (props) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [sizePerPage, setSizePerPage] = useState(10);
  const [productData, setProductData] = useState([]);
  const onClickFunction = (row) => {
    dispatch(setOrderPagination(1));
    dispatch(fetchSingleEmployee(row.employee_id));
  };
  const employees = useSelector((state) => state.employees);
  useEffect(() => {
    const fakeData = () => {
      setPage(Math.ceil(employees.data.total_employees / 10));
      setProductData(employees.data.data);
    };
    if (employees.data) {
      if (employees.data.status !== "failure") {
        fakeData();
      }
    }
  }, [employees]);
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal",
        }}
      >
        <Link
          exact="true"
          to="/employee/individual"
          onClick={() => onClickFunction(row)}
          className="btn btn-sm btn-warning"
        >
          View
        </Link>
      </div>
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const columns = [
    {
      dataField: "employee_id",
      text: "Employee ID",
      sort: true,
    },
    {
      dataField: "full_name",
      text: "Full Name",
      sort: true,
    },
    {
      dataField: "employee_role",
      text: "Employee Role",
      sort: false,
    },
    {
      dataField: "mobile_no",
      text: "Phone",
      sort: false,
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: false,
    },
    {
      dataField: "date_of_birth",
      text: "DOB",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "branch",
      text: "Branch",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },
    {
      dataField: "view",
      text: "Actions",
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };

  const { SearchBar } = Search;

  return (
    <React.Fragment>
      <div className="page-content ">
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-12">
              <Card>
                <Card.Body>
                  <Card.Title className="h4 mb-2 ">
                    Employee Datatable{" "}
                  </Card.Title>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="employee_id"
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="employee_id"
                        columns={columns}
                        data={productData}
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar
                                      srText=""
                                      {...toolkitProps.searchProps}
                                      onChange={(e) => {
                                        console.log(e);
                                      }}
                                    />
                                    <i className="search-box chat-search-box" />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"EmpId"}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    classes={"table align-middle table-nowrap"}
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <EmployeePagination pageNum={page} />
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EmployeeTable;
