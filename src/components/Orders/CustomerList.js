import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { useSelector } from "react-redux";

import OrderPagination from "./OrderPagination";
import { Link } from "react-router-dom";

const CustomerList = ({ showFilteredCustomers }) => {
  const [displayableCustomers, setDisplayableCustomers] = useState([]);
  const filtered_customers = useSelector((state) => state.filtered_customers);

  useEffect(() => {
    if (
      filtered_customers.data &&
      filtered_customers.data.status === "success"
    ) {
      const customers = filtered_customers.data.data.map((c) => ({
        ...c,
        shipping_address: `${c.shipping_address.address}, ${c.shipping_address.pincode} `,
        billing_address: `${c.billing_address.address}, ${c.billing_address.pincode} `,
      }));
      setDisplayableCustomers(customers);
    }
  }, [filtered_customers]);

  const columns = [
    {
      dataField: "customer_id",
      text: "Customer ID",
      sort: true,
    },
    {
      dataField: "first_name",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "mobile_no",
      text: "Mobile No.",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "date_of_birth",
      text: "Date of Birth",
      sort: true,
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
    },
    {
      dataField: "branch",
      text: "Branch",
      sort: true,
    },
    {
      dataField: "customer_type",
      text: "Customer Type",
      sort: true,
    },
    {
      dataField: "shipping_address",
      text: "Shipping Address",
      sort: true,
    },
    {
      dataField: "billing_address",
      text: "Billing Address",
      sort: true,
    },
    {
      dataField: "start_date",
      text: "Start Date",
      sort: true,
    },
    {
      dataField: "memb_days_left",
      text: "Membership days left",
      sort: true,
    },
    {
      dataField: "memb_upg_categ",
      text: "Membership Upgrade Category",
      sort: true,
    },
    {
      dataField: "memb_amount",
      text: "Membership Amount",
      sort: true,
    },
    {
      dataField: "memb_upg_amount",
      text: "Membership Upgrade Amount",
      sort: true,
    },
    {
      dataField: "memb_reduce_amount",
      text: "Membership Reduce Amount",
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
          to="#"
          onClick={(e) => e.preventDefault()}
          className="btn btn-sm btn-warning"
        >
          View
        </Link>
      </div>
    );
  }

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: filtered_customers.data
      ? filtered_customers.data.total_customer_count
      : 0, // replace later with size(customers),
    custom: true,
  };

  return (
    <PaginationProvider
      pagination={paginationFactory(pageOptions)}
      keyField="customer_id"
      columns={columns}
      data={displayableCustomers}
    >
      {({ paginationProps, paginationTableProps }) => (
        <ToolkitProvider
          keyField="customer_id"
          columns={columns}
          data={displayableCustomers}
          search
        >
          {(toolkitProps) => (
            <React.Fragment>
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
              <Row className="mt-3">
                <OrderPagination
                  pageNum={Math.ceil(
                    (filtered_customers.data
                      ? filtered_customers.data.total_customer_count
                      : 0) / 10
                  )}
                  onPageChange={showFilteredCustomers}
                />
              </Row>
            </React.Fragment>
          )}
        </ToolkitProvider>
      )}
    </PaginationProvider>
  );
};

export default CustomerList;
