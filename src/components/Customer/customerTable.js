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
import CustomerTablePagination from "./CustomerTablePagination";
import { toast } from "react-toastify";
import { CustomerOrderHistory } from "../../store/actionCreators/Customers/CustomerAction";
const CustomerTable = (props) => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const page = useSelector((state) => state.mostOrderPage);
  const [productData, setProductData] = useState([
    {
      name: null,
      telephone: null,
      zip: null,
      city: null,
      franchise: null,
      "order date": null,
    },
  ]);
  const customers = useSelector((state) => state.customers);
  const pageOH = useSelector((state) => state.mostOrderPage);
  const onClickFunction = (index, row) => {
    // props.setCustomer(productData[index]);
    dispatch(CustomerOrderHistory(1, row.telephone));
  };
  console.log(pageNum);
  useEffect(() => {
    let arrayCust = [];
    if (customers.data) {
      if (customers.data.status !== "failure") {
        setPageNum(Math.ceil(customers.data.total_customers / 10));
        for (let i = 0; i < customers.data.data.length; i++) {
          arrayCust.push({
            name: `${customers.data.data[i].first_name} ${
              customers.data.data[i].last_name
                ? customers.data.data[i].last_name
                : ""
            }`,
            telephone: customers.data.data[i].mobile_no,
            type: customers.data.data[i].customer_type,
            city: customers.data.data[i].branch,
            dob: customers.data.data[i].date_of_birth,
            gender: customers.data.data[i].gender,
            mail: customers.data.data[i].email,
          });
        }
        setProductData(arrayCust);
      }
    }
  }, [customers]);
  console.log(customers);
  const onClickError = () => {
    toast.error(`No Contact Available`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    if (row.telephone) {
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
            to="/customer/individual"
            onClick={() => onClickFunction(rowIndex, row)}
            className="btn btn-sm btn-warning"
          >
            View
          </Link>
          <Link
            exact="true"
            to={`/customer/editCustomer/${row.telephone}`}
            className="btn btn-sm btn-warning"
            style={{ marginLeft: "0.6rem" }}
          >
            Edit
          </Link>
        </div>
      );
    } else {
      return (
        <div
          style={{
            textAlign: "center",
            cursor: "pointer",
            lineHeight: "normal",
          }}
        >
          <div
            exact="true"
            onClick={() => onClickError(rowIndex)}
            className="btn btn-sm btn-warning"
          >
            View
          </div>
          <div
            exact="true"
            onClick={() => onClickError(rowIndex)}
            className="btn btn-sm btn-warning"
            style={{ marginLeft: "0.6rem" }}
          >
            Edit
          </div>
        </div>
      );
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "telephone",
      text: "Telephone",
      sort: false,
    },
    {
      dataField: "type",
      text: "Type",
      sort: false,
    },
    {
      dataField: "city",
      text: "City",
      sort: true,
    },
    {
      dataField: "dob",
      text: "DOB",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: false,
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
      dataField: "id",
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
                  <Card.Title className="h4 mb-2">
                    Customer Datatable{" "}
                  </Card.Title>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="customer_id"
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="customer_id"
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
                                    keyField={"customer_id"}
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
                              <Col xl={12}>
                                <CustomerTablePagination pageNum={pageNum} />
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

export default CustomerTable;
