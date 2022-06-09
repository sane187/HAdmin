import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerList,
  fetchOrderList,
  setOrderPagination,
} from "./../../store/actionCreators/Orders/OrdersAction";
import OrderPagination from "./OrderPagination";
import { Link } from "react-router-dom";
import CustomerList from "./CustomerList";
import AddCustomerToModal from "./AddCustomerToGroupModal";

const AllOrders = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const filtered_customers = useSelector((state) => state.filtered_customers);
  const dashboard_filters = useSelector((state) => state.dashboard_filters);

  const [orderListVisible, setOrderListVisible] = useState(true);

  const [displayableOrders, setDisplayableOrders] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [filters, setFilters] = useState({
    order_id: "",
    coupon: "",
    order_type: "",
    payment_method: "",
    max_price: "",
    min_price: "",
    start_date: "",
    end_date: "",
    customer_no: "",
    product_name: "",
  });

  const [franchiseOptions, setFranchiseOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [currbranch, setCurrBranch] = useState({});
  const [currfranchise, setCurrFran] = useState({});
  const [addCustomerToGrpModal, setAddCustomerToGrpModal] = useState(false);

  useEffect(() => {
    setPageNo(1);
    setDefaultBranchFranchise();
    dispatch(fetchCustomerList(1, getFilterQuery()));
  }, []);

  useEffect(() => {
    setDisplayOrders();
  }, [orders]);

  useEffect(() => {
    const queryString = getFilterQuery();
    dispatch(fetchOrderList(pageNo, queryString));
  }, [franchiseOptions]);

  const getFilterQuery = () => {
    let qs = "";
    if (currbranch.branch_id) {
      qs += "&";
      qs += `branch_id=${currbranch.branch_id}`;
    }
    if (currfranchise.franchise_id) {
      qs += "&";
      qs += `franchise_id=${currfranchise.franchise_id}`;
    }
    if (filters.order_id !== "") {
      qs += "&";
      qs += `order_id=${filters.order_id}`;
    }
    if (filters.coupon !== "") {
      qs += "&";
      qs += `coupon=${filters.coupon}`;
    }
    if (filters.order_type !== "") {
      qs += "&";
      qs += `order_type=${filters.order_type}`;
    }
    if (filters.payment_method !== "") {
      qs += "&";
      qs += `payment_method=${filters.payment_method}`;
    }
    if (filters.max_price !== "") {
      qs += "&";
      qs += `max_price=${filters.max_price}`;
    }
    if (filters.min_price !== "") {
      qs += "&";
      qs += `min_price=${filters.min_price}`;
    }
    if (filters.start_date !== "") {
      qs += "&";
      qs += `start_date=${filters.start_date}`;
    }
    if (filters.end_date !== "") {
      qs += "&";
      qs += `end_date=${filters.end_date}`;
    }
    if (filters.customer_no !== "") {
      qs += "&";
      qs += `customer_no=${filters.customer_no}`;
    }
    if (filters.product_name !== "") {
      qs += "&";
      qs += `product_name=${filters.product_name}`;
    }

    qs = qs.substring(1);
    return qs;
  };

  const setDefaultBranchFranchise = () => {
    if (dashboard_filters.data) {
      setFranchiseOptions(dashboard_filters.data.data);
      setCurrFran(dashboard_filters.data.data[0]);
      setBranchOptions(dashboard_filters.data.data[0].branches);
      setCurrBranch(dashboard_filters.data.data[0].branches[0]);
    }
  };

  const setDisplayOrders = () => {
    if (orders.data && orders.data.status === "success") {
      const displayableOrdersClone = orders.data.data.map((o) => {
        let order_items = "";
        o.order_items.forEach((oi) => {
          order_items += `${oi.product_name}, `;
        });

        return {
          ...o,
          order_items,
          applied_coupons: o.applied_coupons.coupon,
          createdAt: `${new Date(o.createdAt).toLocaleTimeString()} ${new Date(
            o.createdAt
          ).toDateString()}`,
        };
      });

      setDisplayableOrders(displayableOrdersClone);
    } else {
      setDisplayableOrders([]);
    }
  };

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    if (row.action === "search") return "";
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
          to={`/orders/viewOrder/${row.order_id}`}
          onClick={(e) => (!props.viewPermission ? e.preventDefault() : "")}
          className="btn btn-sm btn-warning"
        >
          View
        </Link>
        <Link
          exact="true"
          to={`/orders/editOrder/${row.order_id}`}
          onClick={(e) => (!props.editPermission ? e.preventDefault() : "")}
          className="btn btn-sm btn-warning"
          style={{ marginLeft: "0.6rem" }}
        >
          Edit
        </Link>
      </div>
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const onChangeForSearchFields = (field, value) => {
    const filters_clone = { ...filters };
    filters_clone[field] = value;
    setFilters(filters_clone);
  };

  const displayBranches = () => {
    return branchOptions.map((item, index) => {
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
  };
  const handleSelectB = (e) => {
    const item = JSON.parse(e);
    setCurrBranch({ branch_id: item[1], branch_name: item[0] });
  };

  const displayFranchises = () => {
    return franchiseOptions.map((item, index) => {
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
  };
  const handleSelectF = (e) => {
    const item = JSON.parse(e);
    const branches = franchiseOptions.filter(
      (fr) => fr.franchise_id === item[1]
    )[0].branches;
    setBranchOptions(branches);
    setCurrBranch({});
    setCurrFran({ franchise_id: item[1], franchise_name: item[0] });
  };

  const showFilteredOrders = (page) => {
    const queryString = getFilterQuery();
    dispatch(fetchOrderList(page, queryString));
    dispatch(setOrderPagination(page));
    setOrderListVisible(true);
  };

  const showFilteredCustomers = (page) => {
    const queryString = getFilterQuery();
    dispatch(fetchCustomerList(page, queryString));
    dispatch(setOrderPagination(page));
    setOrderListVisible(false);
  };

  const searchBoxes = {
    order_id: (
      <input
        type="text"
        id="order_id"
        placeholder="search by Order Id "
        onChange={(e) => onChangeForSearchFields("order_id", e.target.value)}
      />
    ),
    order_items: (
      <input
        type="text"
        id="product_name"
        placeholder="Enter product names seperated by ,"
        onChange={(e) =>
          onChangeForSearchFields("product_name", e.target.value)
        }
      />
    ),
    customer_no: (
      <input
        type="text"
        id="customer_no"
        placeholder="search by customer number"
        onChange={(e) => onChangeForSearchFields("customer_no", e.target.value)}
      />
    ),
    createdAt: (
      <span className="d-flex">
        <div>
          <div>Start Date</div>
          <input
            type="date"
            id="start_date"
            placeholder="start date"
            style={{ width: "7rem" }}
            onChange={(e) =>
              onChangeForSearchFields("start_date", e.target.value)
            }
          />
        </div>
        <div style={{ marginLeft: "1rem" }}>
          <div>End Date</div>
          <input
            type="date"
            id="end_date"
            placeholder="end date"
            style={{ width: "7rem" }}
            onChange={(e) =>
              onChangeForSearchFields("end_date", e.target.value)
            }
          />
        </div>
      </span>
    ),
    paid_price: (
      <span>
        <input
          type="number"
          id="min_price"
          placeholder="min price"
          style={{ width: "6rem" }}
          onChange={(e) => onChangeForSearchFields("min_price", e.target.value)}
        />
        <input
          type="number"
          id="max_price"
          placeholder="max price"
          style={{ width: "6rem", marginLeft: "1rem" }}
          onChange={(e) => onChangeForSearchFields("max_price", e.target.value)}
        />
      </span>
    ),
    payment_method: (
      <input
        type="text"
        id="payment_method"
        placeholder="search by payment method"
        onChange={(e) =>
          onChangeForSearchFields("payment_method", e.target.value)
        }
      />
    ),
    order_type: (
      <input
        type="text"
        id="order_type"
        placeholder="search by order type"
        onChange={(e) => onChangeForSearchFields("order_type", e.target.value)}
      />
    ),
    applied_coupons: (
      <input
        type="text"
        id="coupon"
        placeholder="search by coupon"
        onChange={(e) => onChangeForSearchFields("coupon", e.target.value)}
      />
    ),
    action: "search",
  };

  const columns = [
    {
      dataField: "order_id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "customer_no",
      text: "Customer No.",
      sort: true,
    },
    {
      dataField: "total_items",
      text: "Total Items",
      sort: true,
    },
    {
      dataField: "paid_price",
      text: "Paid Price",
      sort: true,
    },
    {
      dataField: "sub_total",
      text: "Sub total",
      sort: true,
    },
    {
      dataField: "tax",
      text: "tax",
      sort: true,
    },
    {
      dataField: "discount",
      text: "Discount",
      sort: true,
    },
    {
      dataField: "applied_coupons",
      text: "Applied Coupons",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "paid",
      text: "Paid",
      sort: true,
    },
    {
      dataField: "payment_id",
      text: "Payment ID",
      sort: true,
    },
    {
      dataField: "payment_method",
      text: "Payment Method",
      sort: true,
    },
    {
      dataField: "order_type",
      text: "Order Type",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Placed At",
      sort: true,
    },
    {
      dataField: "order_items",
      text: "Order Items",
      sort: true,
    },
    {
      dataField: "change",
      text: "Change",
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
    totalSize: orders.data ? orders.data.total_orders_count : 0, // replace later with size(customers),
    custom: true,
  };

  const getAllRows = () => {
    const rows = [...displayableOrders];
    rows.unshift(searchBoxes);
    return rows;
  };

  return (
    <React.Fragment>
      <div className="page-content ">
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-12">
              <Card>
                <Card.Body>
                  <div className="d-flex">
                    <Card.Title className="h4 mb-4 my-auto">
                      {orderListVisible
                        ? "Orders Datatable"
                        : "Customers Datatable"}
                    </Card.Title>
                  </div>
                  <div className="d-flex">
                    <DropdownButton
                      variant="light"
                      title={
                        currfranchise.franchise_name
                          ? currfranchise.franchise_name
                          : "Franchise"
                      }
                      id="dropdown-menu-align-right"
                      onSelect={handleSelectF}
                    >
                      {displayFranchises()}
                    </DropdownButton>
                    <DropdownButton
                      variant="light"
                      title={
                        currbranch.branch_name
                          ? currbranch.branch_name
                          : "Branch"
                      }
                      id="dropdown-menu-align-right"
                      style={{ marginLeft: "1rem" }}
                      onSelect={handleSelectB}
                    >
                      {displayBranches()}
                    </DropdownButton>
                    <Button
                      className="btn btn-warning mb-3 ml-auto "
                      style={{ marginLeft: "auto", marginRight: "1rem" }}
                      onClick={() => showFilteredOrders(1)}
                    >
                      Show filtered orders
                    </Button>
                    <Button
                      className="btn btn-warning mb-3 "
                      onClick={() => showFilteredCustomers(1)}
                      style={{ marginRight: "1rem" }}
                    >
                      Show Customer List
                    </Button>
                    <Button
                      className="btn btn-warning mb-3 "
                      onClick={() => setAddCustomerToGrpModal(true)}
                    >
                      Add Customers to Group
                    </Button>
                    <AddCustomerToModal
                      show={addCustomerToGrpModal}
                      close={() => setAddCustomerToGrpModal(false)}
                      queryString={getFilterQuery()}
                    />
                  </div>
                  {orderListVisible ? (
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="order_id"
                      columns={columns}
                      data={getAllRows()}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="order_id"
                          columns={columns}
                          data={getAllRows()}
                          search
                        >
                          {(toolkitProps) => (
                            <React.Fragment>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"order_id"}
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
                              <Row className="mt-3">
                                <OrderPagination
                                  pageNum={Math.ceil(
                                    (orders.data
                                      ? orders.data.total_orders_count
                                      : 0) / 10
                                  )}
                                  onPageChange={showFilteredOrders}
                                />
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  ) : (
                    <CustomerList
                      showFilteredCustomers={showFilteredCustomers}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AllOrders;
