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

import { useState } from "react";
import { useSelector } from "react-redux";

const EmployeeRoleTable = (props) => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [productData, setProductData] = useState([
    { employee_role_id: "", employee_role: "", createdAt: "" },
  ]);
  const role = useSelector((state) => state.role);
  const onClickFunction = (index) => {
    props.setEmployee(index);
  };
  useEffect(() => {
    if (role.data) {
      let arr = [];
      function getDateFromUTC(date) {
        var d = new Date(date);
        let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

        return `${dayArr[d.getDay()]} ${
          monthArray[d.getMonth()]
        } ${d.getHours()}:${d.getMinutes()} ${d.getFullYear()}`;
      }
      if (role.data.status === "success") {
        for (let i = 0; i < role.data.emp_roles.length; i++) {
          arr.push({
            employee_role_id: role.data.emp_roles[i].employee_role_id,
            employee_role: role.data.emp_roles[i].employee_role,
            createdAt: getDateFromUTC(role.data.emp_roles[i].createdAt),
          });
        }
        setProductData(arr);
      }
    }
  }, [role]);
  console.log(props);
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          cursor: props.editPermission ? "pointer" : "default",
          lineHeight: "normal",
        }}
        key={row.employee_id}
      >
        <Link
          exact="true"
          to="/user/edit"
          onClick={(e) => {
            if (!props.editPermission) {
              alert("You are not authorized to edit info of admins");
              e.preventDefault();
            } else onClickFunction(row);
          }}
          className={`btn btn-sm ${
            props.editPermission ? "btn-warning" : "btn-light"
          } ms-0 align-left`}
        >
          Edit
        </Link>
      </div>
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const columns = [
    {
      dataField: "employee_role_id",
      text: "Employee Role ID ",
      sort: false,
    },
    {
      dataField: "employee_role",
      text: "Role",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: false,
    },
    {
      dataField: "Edit",
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
                    Employee Role Datatable{" "}
                  </Card.Title>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="employee_role_id"
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="employee_role_id"
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
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="search-box chat-search-box" />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"employee_role_id"}
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

                            <Row className="align-items-md-center mt-30">
                              <Col className="inner-custom-pagination d-flex">
                                <div className="d-inline">
                                  <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                  />
                                </div>
                                <div className="text-md-right ms-auto">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                    className="table-pagination"
                                  />
                                </div>
                              </Col>
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

export default EmployeeRoleTable;
