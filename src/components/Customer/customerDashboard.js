import { Container, Row, Col, Card } from "react-bootstrap";
import MiniWidgetsC from "./miniWidgetsC";
import { FaUsers } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import CustomerAnalytics from "./customerAnalytics";
import CustomerDoughnut from "./customerDoughnut";
import CustomerTable from "./customerTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerAnalyticsGraph,
  CustomerAnalyticsPie,
  CustomerDashboardAction,
  fetchCustomers,
  setCustomerPagination,
} from "../../store/actionCreators/Customers/CustomerAction";
import { CustomerDashboardReducer } from "../../store/reducers/Customer/customerReducer";
import { RevenueAnalyticsDashboard } from "../../store/actionCreators/dashboard/dasboardActions";
import Unauthorized from "../unauthorized";

const CustomerDashboard = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  // Filters dropdown
  const filters = useSelector((state) => state.dashboard_filters);
  const [current, setcurrent] = useState({
    month: "Jan",
    year: 2022,
  });
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
  // Variables in redux store
  const page = useSelector((state) => state.customer_page);
  const customers = useSelector((state) => state.customers);
  const customer_dashboard = useSelector((state) => state.customer_dashboard);
  const customer_analytics_pie = useSelector(
    (state) => state.customer_analytics_pie
  );
  const customer_analytics_graph = useSelector(
    (state) => state.customer_analytics_graph
  );
  const revenueGraph = useSelector((state) => state.dashboard_revenue);
  // Variables in redux store ENDS
  const [customerDashboardCards, setDashCards] = useState({
    Total_customers: 0,
    Total_orders: 0,
  });
  const [currentRevenuedate, setcurrentRevenue] = useState({
    month: "Jan",
    year: 2022,
  });
  const [revFilter, setRevFilter] = useState("yearly");
  // customer dashboard cards
  useEffect(() => {
    if (customer_dashboard.data) {
      setDashCards({
        Total_customers: customer_dashboard.data.Total_customers,
        Total_orders: customer_dashboard.data.Total_orders,
      });
    }
  }, [customer_dashboard]);
  const reports = [
    {
      icon: FaUsers,
      title: "Total Customers",
      value: customerDashboardCards.Total_customers,
      rate: "2.7%",
      desc: "From previous period",
    },
    {
      icon: MdFastfood,
      title: "Total Orders",
      value: customerDashboardCards.Total_orders,
      rate: "2.4%",
      desc: "From previous period",
    },
  ];

  const yearArray = () => {
    let arrYear = ["All"];
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
  }, [page]);
  useEffect(() => {
    dispatch(
      fetchCustomers(
        page,
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        "mumbai"
      )
    );
    dispatch(
      CustomerDashboardAction(
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        current.month,
        current.year
      )
    );
    // dispatch(CustomerAnalyticsGraph(currentFilter.franchise.franchise_id, currentFilter.branch.branch_id, current.month, current.year))
    dispatch(
      CustomerAnalyticsPie(
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id
      )
    );
  }, [current, currentFilter]);
  
  useEffect(() => {
    dispatch(
      RevenueAnalyticsDashboard(
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        currentRevenuedate.year,
        currentRevenuedate.month,
        revFilter
      )
    );
  }, [currentRevenuedate, currentFilter, revFilter]);
  // customer Pie
  const [Doughnutstate, setDoughnutState] = useState({
    series: [42, 26, 15],
    options: {
      labels: ["Product A", "Product B", "Product C"],
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c", "#eeb902"],
    },
  });
  useEffect(() => {
    let labels = [];
    let series = [];
    let colors = [];
    var dynamicColors = function () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    };
    if (customer_analytics_pie.data) {
      for (let i = 0; i < customer_analytics_pie.data.value.length; i++) {
        colors.push(dynamicColors());
        series.push(parseFloat(customer_analytics_pie.data.value[i]));
      }

      setDoughnutState({
        series: series,
        options: {
          labels: customer_analytics_pie.data.key,
          plotOptions: {
            pie: {
              donut: {
                size: "75%",
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          colors: colors,
        },
      });
    }
  }, [customer_analytics_pie]);
  // customer pie ends

  // customer GRAPH
  const handleMonthChangeRev = (e) => {
    setcurrentRevenue({
      ...current,
      month: e.target.value,
    });
  };

  const handleYearChangeRev = (e) => {
    setcurrentRevenue({
      ...current,
      year: e.target.value,
    });
  };
  const [revenueAnalytics, setRevenueAnalytics] = useState({
    series: [
      {
        name: "2021",
        type: "column",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 3],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      colors: ["#1CBB8C"],
      labels: [
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
      ],
    },
  });

  useEffect(() => {
    if (revenueGraph.data) {
      let points = [];
      let labels = [];
      for (let i = 0; i < revenueGraph.data.y.length; i++) {
        points.push(parseFloat(revenueGraph.data.y[i]).toFixed(2));
      }
      for (let i = 0; i < revenueGraph.data.x.length; i++) {
        labels.push(String(revenueGraph.data.x[i]));
      }
      setRevenueAnalytics({
        series: [
          {
            name: "2021",
            type: "column",
            data: points,
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          stroke: {
            width: [0, 3],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
            },
          },
          dataLabels: {
            enabled: false,
          },

          legend: {
            show: false,
          },
          colors: ["#1CBB8C"],
          labels: labels,
        },
      });
    }
  }, [revenueGraph]);
  // CUSTOMER BAR GRAPH ENDS
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
  const main = () => {
    if (props.viewPermission) {
      if (customers.data) {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <Row>
              <Col lg={8} sm={6} xs={12} className="dash-head">
                CUSTOMER
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

            <Row>
              <Col lg="8">
                <Row>
                  <MiniWidgetsC
                    customer_dashboard={customer_dashboard}
                    reports={reports}
                  />
                </Row>

                <CustomerAnalytics
                  setRevFilter={setRevFilter}
                  handleYearChange={handleYearChangeRev}
                  handleMonthChange={handleMonthChangeRev}
                  yearDrop={yearDrop}
                  monthDrop={monthDrop}
                  revenueGraph={revenueGraph}
                  revenueAnalytics={revenueAnalytics}
                />
              </Col>
              <Col lg="4">
                <Row>
                  <Col xl={12}>
                    <Card
                      className="mb-4 text-muted d-flex  justify-content-center"
                      style={{
                        width: "100%",
                        height: "150px",
                        boxShadow: " 0 2px 4px rgb(0 0 0 / 8%)",
                      }}
                    >
                      <Card.Body
                        className="pt-3"
                        style={{ overflowX: "auto", paddingRight: "10px" }}
                      >
                        <table className="table table-borderless indi-table mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Current Franchise</th>
                              <td>
                                {currentFilter.franchise.franchise_name.toUpperCase()}
                              </td>
                            </tr>

                            <tr>
                              <th scope="row">Current Branch</th>
                              <td>
                                {currentFilter.branch.branch_name.toUpperCase()}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Current Year </th>
                              <td>{current.year}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xl={12}>
                    <Card
                      style={{
                        width: "100%",
                        boxShadow: " 0 2px 4px rgb(0 0 0 / 8%)",
                      }}
                    >
                      <Card.Body>
                        <CustomerDoughnut
                          options={Doughnutstate.options}
                          series={Doughnutstate.series}
                        ></CustomerDoughnut>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-4">
              {customers.data.status === "success" ? (
                <CustomerTable permission={props}
                  products={props.products}
                  currentCustomer={props.currentCustomer}
                  setCustomer={props.setCustomer}
                />
              ) : (
                <></>
              )}
            </Row>
          </Container>
        );
      }
    }
    return <Unauthorized />;
  };

  return <>{main()}</>;
};
export default CustomerDashboard;

