import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { getCouponList } from "../../store/actionCreators/Coupons/CouponsAction";
import CouponPagination from "./CouponsPagination";
import Select from "react-select";
import AddCouponModal from "./AddCoupon";
import { setCouponsPagination } from "./../../store/actionCreators/Coupons/CouponsAction";

const AllCoupons = (props) => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons);
  const coupons_page = useSelector((state) => state.coupons_page);
  const [displayableCoupons, setDisplayableCoupons] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    coupon_id: "",
    coupon_code: "",
    title: "",
    start: "",
    end: "",
    disc_percent: "",
    flat_discount: "",
    customer_no: "",
    employee_id: "",
    branch_id: "",
    min_cart: "",
    customer_group_name: "",
  });
  const [addCouponModal, setAddCouponModal] = useState(false);

  useEffect(() => {
    dispatch(getCouponList(coupons_page));
  }, [coupons_page]);

  useEffect(() => {
    setDefaultData();
  }, [coupons]);

  const setDefaultData = () => {
    let couponList = [];
    if (coupons.data && coupons.data.data) {
      couponList = coupons.data.data.map((c) => ({
        ...c,
        branch_name: props.branchObj[c.branch_id],
        employee_name: props.empObj[c.employee_id],
      }));
    }

    setDisplayableCoupons(couponList);
  };

  const onChangeForSearchFields = (field, value) => {
    const searchOptionsClone = { ...searchOptions };
    searchOptionsClone[field] = value;
    setSearchOptions(searchOptionsClone);
  };

  const showFilteredCoupons = () => {
    const filters = {};
    const {
      coupon_id,
      coupon_code,
      title,
      start,
      end,
      disc_percent,
      flat_discount,
      customer_no,
      employee_id,
      branch_id,
      min_cart,
      customer_group_name,
    } = searchOptions;
    if (coupon_id !== "") filters.coupon_id = coupon_id;
    if (coupon_code !== "") filters.coupon_code = coupon_code;
    if (title !== "") filters.title = title;
    if (start !== "") filters.start = start;
    if (end !== "") filters.end = end;
    if (disc_percent !== "") filters.disc_percent = disc_percent;
    if (flat_discount !== "") filters.flat_discount = flat_discount;
    if (customer_no !== "") filters.customer_no = customer_no;
    if (employee_id !== "") filters.employee_id = employee_id;
    if (branch_id !== "") filters.branch_id = branch_id;
    if (min_cart !== "") filters.min_cart = min_cart;
    if (customer_group_name !== "")
      filters.customer_group_name = customer_group_name;

    dispatch(setCouponsPagination(1));
    dispatch(getCouponList(1, filters));
  };

  const searchBoxes = {
    coupon_id: (
      <input
        type="text"
        id="coupon_id"
        placeholder="search by Coupon Id "
        onChange={(e) => onChangeForSearchFields("coupon_id", e.target.value)}
      />
    ),
    coupon_code: (
      <input
        type="text"
        id="coupon_code"
        placeholder="search by Coupon Code"
        onChange={(e) => onChangeForSearchFields("coupon_code", e.target.value)}
      />
    ),
    title: (
      <input
        type="text"
        id="title"
        placeholder="search by Title"
        onChange={(e) => onChangeForSearchFields("title", e.target.value)}
      />
    ),
    start: (
      <input
        type="date"
        id="start"
        placeholder="search by start"
        onChange={(e) => onChangeForSearchFields("start", e.target.value)}
      />
    ),
    end: (
      <input
        type="date"
        id="start"
        placeholder="search by start"
        onChange={(e) => onChangeForSearchFields("end", e.target.value)}
      />
    ),
    disc_percent: (
      <input
        type="number"
        id="disc_percent"
        placeholder="search by Discount Percent"
        onChange={(e) =>
          onChangeForSearchFields("disc_percent", e.target.value)
        }
      />
    ),
    flat_discount: (
      <input
        type="number"
        id="flat_discount"
        placeholder="search by Flat Discount"
        onChange={(e) =>
          onChangeForSearchFields("flat_discount", e.target.value)
        }
      />
    ),
    customer_no: (
      <input
        type="number"
        id="customer_no"
        placeholder="search by Customer mobile number"
        onChange={(e) => onChangeForSearchFields("customer_no", e.target.value)}
      />
    ),
    employee_name: (
      <Select
        options={props.empArray.map((e) => ({
          label: e.full_name,
          value: e.employee_id,
        }))}
        id="employee_name"
        value={{
          value: searchOptions.employee_id,
          label: props.empObj[searchOptions.employee_id] || "Employee",
        }}
        onChange={(e) => onChangeForSearchFields("employee_id", e.value)}
      />
    ),
    branch_name: (
      <Select
        options={props.branchArray.map((b) => ({
          label: b.branch_name,
          value: b.branch_id,
        }))}
        id="branch_name"
        value={{
          value: searchOptions.branch_id,
          label: props.branchObj[searchOptions.branch_id] || "Branch",
        }}
        onChange={(e) => onChangeForSearchFields("branch_id", e.value)}
      />
    ),
    min_cart: (
      <input
        type="number"
        id="min_cart"
        placeholder="search by Minimum cart value"
        onChange={(e) => onChangeForSearchFields("min_cart", e.target.value)}
      />
    ),
    customer_group_name: (
      <Select
        options={props.groupsArr.map((g) => ({
          label: g,
          value: g,
        }))}
        id="customer_group_name"
        value={{
          value: searchOptions.customer_group_name,
          label: searchOptions.customer_group_name || "Group",
        }}
        onChange={(e) =>
          onChangeForSearchFields("customer_group_name", e.value)
        }
      />
    ),
    action: "search",
  };

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    if (row.action === "search") return "";
    if(props.editPermission){
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
          to={`viewCoupon/${row.coupon_id}`}
          onClick={(e) => (!props.viewPermission ? e.preventDefault() : "")}
          className="btn btn-sm btn-warning"
        >
          View
        </Link>
        <Link
          exact="true"
          to={`editCoupon/${row.coupon_id}`}
          onClick={(e) => (!props.editPermission ? e.preventDefault() : "")}
          className="btn btn-sm btn-warning"
          style={{ marginLeft: "0.6rem" }}
        >
          Edit
        </Link>
      </div>
    );}
    else{
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
            to={`viewCoupon/${row.coupon_id}`}
            onClick={(e) => (!props.viewPermission ? e.preventDefault() : "")}
            className="btn btn-sm btn-warning"
          >
            View
          </Link>
          
        </div>
      );
    }
  }

  const columns = [
    {
      dataField: "coupon_id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "coupon_code",
      text: "Coupon Code",
      sort: true,
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
    },
    {
      dataField: "start",
      text: "Start",
      sort: true,
    },
    {
      dataField: "end",
      text: "End",
      sort: true,
    },
    {
      dataField: "disc_percent",
      text: "Discount Percent",
      sort: true,
    },
    {
      dataField: "flat_discount",
      text: "Flat Discount",
      sort: true,
    },

    {
      dataField: "customer_no",
      text: "Customer Mobile Number",
      sort: true,
    },
    {
      dataField: "employee_name",
      text: "Employee Name",
      sort: true,
    },
    {
      dataField: "branch_name",
      text: "Branch name",
      sort: true,
    },
    {
      dataField: "min_cart",
      text: "Minimum cart Value",
      sort: true,
    },
    {
      dataField: "customer_group_name",
      text: "Customer Group Name",
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
    totalSize: coupons.data
      ? coupons.data.total_coup_count
        ? coupons.data.total_coup_count
        : 0
      : 0, // replace later with size(customers),
    custom: true,
  };

  const getAllRows = () => {
    const couponList = [...displayableCoupons];
    couponList.unshift(searchBoxes);

    return couponList;
  };

  return (
    <React.Fragment>
      <div className="page-content ">
        <Row>
          <Col className="col-12">
            <Card>
              <Card.Body>
                <div className="d-flex">
                  <Card.Title className="h4 mb-4 my-auto">
                    All Coupons
                  </Card.Title>
                  <Button
                    className="btn btn-warning mb-3 ml-auto "
                    style={{ marginLeft: "auto" }}
                    onClick={() => showFilteredCoupons()}
                  >
                    Show filtered Coupons
                  </Button>
                  <Link
                    className="btn btn-warning mb-3"
                    style={{ marginLeft: "1rem", marginRight: "1rem" }}
                    to={"/coupons/addCoupon"}
                  >
                    Add New Coupon
                  </Link>
                </div>

                <PaginationProvider
                  pagination={paginationFactory(pageOptions)}
                  keyField="coupon_id"
                  columns={columns}
                  data={getAllRows()}
                >
                  {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                      keyField="coupon_id"
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
                                  keyField={"coupon_id"}
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
                            <CouponPagination
                              pageNum={Math.ceil(
                                coupons.data
                                  ? coupons.data.total_coup_count
                                    ? coupons.data.total_coup_count
                                    : 0
                                  : 0
                              )}
                            />
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
      </div>
    </React.Fragment>
  );
};

export default AllCoupons;
