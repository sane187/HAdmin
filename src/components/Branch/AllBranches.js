import React, { useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleBranch } from "../../store/actionCreators/Branch/BranchAction";
import { deleteFranchise } from "../../store/actionCreators/Franchise/AddNewFranchiseAction";
import Unauthorized from "./../unauthorized";
import EditFranchiseModal from "./EditFranchise";


const AllBranches = (props) => {
  const productData = useSelector((state) => state.franchise);
  const [currentFranchiseData, setCurrentFranchiseData] = useState({});
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const onClickFunction = (row) => {
    props.setCurrFranchise(row);
  };

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    
    return (
      <div
        style={{
          textAlign: "start",
          cursor: "pointer",
          lineHeight: "normal",
        }}
      >
        <Link
          exact="true"
          to={`/branch/Franchise/${row.franchise_id}`}
          onClick={() => onClickFunction(row)}
          className="btn btn-sm btn-warning"
        >View
        </Link>
        <Button
          exact="true"
          to="/branch/Franchise"
          onClick={() => {
            setCurrentFranchiseData({ ...row });
            setShowModal(true);
          }}
          className="btn btn-sm btn-warning"
          style={{ marginLeft: "0.6rem" }}
        >
          Edit
        </Button>
        <Button
          exact="true"
          to="/branch/Franchise"
          onClick={() => {
            const check = prompt(
              "Are you sure you want to delete this franchise ? Type yes to continue."
            );
            if (check === "yes") {
              dispatch(deleteFranchise(row.franchise_id));
            }
          }}
          className="btn btn-sm btn-danger"
          style={{ marginLeft: "0.6rem" }}
        >
          Delete
        </Button>
      </div>
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const columns = [
    {
      dataField: "franchise_id",
      text: "Franchise Id",
      sort: false,
    },
    {
      dataField: "franchise_name",
      text: "Franchise Name",
      sort: true,
    },
    {
      dataField: "location",
      text: "Location",
      sort: false,
    },
    {
      dataField: "no_branches",
      text: "Number of Branches",
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
      dataField: "branch_name",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };

  const { SearchBar } = Search;
  if (props.editPermission)
    return (
      <React.Fragment>
        <Container
          fluid
          className={props.sideToggle === true ? "closeDash" : "openDash"}
          style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
        >
          <Row>
            <div className="page-content ">
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col className="col-12">
                    <Card>
                      <Card.Body>
                        <Card.Title className="h4 mb-2 ">
                          Franchise Datatable{" "}
                        </Card.Title>

                        <PaginationProvider
                          pagination={paginationFactory(pageOptions)}
                          keyField="franchise_id"
                          columns={columns}
                          data={productData.data.data}
                        >
                          {({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                              keyField="franchise_id"
                              columns={columns}
                              data={productData.data.data}
                              search
                            >
                              {(toolkitProps) => (
                                <React.Fragment>
                                  <Row className="mb-2">
                                    <Col md="4">
                                      <div className="search-box me-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                          <SearchBar
                                            {...toolkitProps.searchProps}
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
                                          classes={
                                            "table align-middle table-nowrap"
                                          }
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
          </Row>
          <EditFranchiseModal
            show={showModal}
            close={() => setShowModal(false)}
            data={currentFranchiseData}
          />
        </Container>
      </React.Fragment>
    );
  return <Unauthorized />;
};

export default AllBranches;
