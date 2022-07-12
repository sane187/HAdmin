import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
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
import "../../../css/customer/customerTable.css";

import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins } from "./../../../store/actionCreators/User/UserAction";

const AllAdmins = (props) => {
  const dispatch = useDispatch();
  console.log(props)

  const branch = useSelector((state) => state.branch);
  const franchise = useSelector((state) => state.franchise);
  const admins = useSelector((state) => state.admins);
  const admin_role = useSelector((state) => state.admin_role);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const login = useSelector((state) => state.login);

  const [branches, setBranches] = useState({});
  const [adminRoles, setAdminRoles] = useState({});
  const [franchises, setFranchises] = useState({});
  const [allAdmins, setAllAdmins] = useState([]);

  useEffect(() => {
    dispatch(getAllAdmins());
    editPermissions();
    setDefaultData();
  }, []);

  useEffect(() => {
    setDefaultData();
  }, [admins]);

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

  const setDefaultData = () => {
    const tempBranches = {};

    if (branch)
      branch.data.data.forEach((item) => {
        tempBranches[item.branch_id] = item.branch_name;
      });

    const tempAdminRoles = {};
    if (admin_role)
      admin_role.data.data.forEach((item) => {
        tempAdminRoles[item.admin_role_id] = item.admin_role;
      });

    const tempFranchises = {};
    if (franchise)
      franchise.data.data.forEach((item) => {
        tempFranchises[item.franchise_id] = item.franchise_name;
      });

    setBranches(tempBranches);
    setAdminRoles(tempAdminRoles);
    setFranchises(tempFranchises);
    if (admins.data) setAllAdmins(admins.data.admins);
  };

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
          to={`viewAdmin/${row.admin_id}`}
          onClick={(e) => {
            if (!viewPermission) {
              alert("You are not authorized to view info of admins");
              e.preventDefault();
            }
          }}
          className="btn btn-sm btn-warning"
        >
          View
        </Link>
        <Link
          exact="true"
          to={`${row.admin_id}`}
          onClick={(e) => {
            if (!editPermission) {
              alert("You are not authorized to edit info of admins");
              e.preventDefault();
            }
          }}
          style={{ marginLeft: "1rem" }}
          className="btn btn-sm btn-danger"
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
      dataField: "admin_id",
      text: "Admin ID",
      sort: true,
    },
    {
      dataField: "username",
      text: "Username",
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: false,
    },
    {
      dataField: "email",
      text: "Email",
      sort: false,
    },
    {
      dataField: "date_of_birth",
      text: "Date of Birth",
      sort: true,
    },
    {
      dataField: "admin_role",
      text: "Admin Role",
      sort: false,
    },
    {
      dataField: "branch",
      text: "Branch",
      sort: true,
    },
    {
      dataField: "franchise",
      text: "Franchise",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
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
    totalSize: allAdmins.length, // replace later with size(customers),
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
                  <Card.Title className="h4 mb-2 ">Admin Datatable </Card.Title>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="admin_id"
                    columns={columns}
                    data={allAdmins.map((item) => ({
                      ...item,
                      branch: branches[item.branch_id],
                      franchise: franchises[item.franchise_id],
                      admin_role: adminRoles[item.admin_role_id],
                      date_of_birth: new Date(
                        item.date_of_birth
                      ).toDateString(),
                    }))}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="admin_id"
                        columns={columns}
                        data={allAdmins.map((item) => ({
                          ...item,
                          branch: branches[item.branch_id],
                          franchise: franchises[item.franchise_id],
                          admin_role: adminRoles[item.admin_role_id],
                          date_of_birth: new Date(
                            item.date_of_birth
                          ).toDateString(),
                        }))}
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
                                    keyField={"admin_id"}
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

export default AllAdmins;
