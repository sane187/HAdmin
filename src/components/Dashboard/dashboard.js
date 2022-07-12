import {
  Container,
  Row,
  Col,
  Card,
  Button,
  DropdownButton,
} from "react-bootstrap";
import DoughnutGraph from "./doughnutGraph";
import React, { useEffect, useState } from "react";
import RevenueAnalytics from "./revenueAnalytics";
import MiniWidgets from "./miniWidgets";
import "../../css/dashboard.css";
import { RiStackLine } from "react-icons/ri";
import { RiStore2Line } from "react-icons/ri";
import { RiBriefcase4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardCards,
  getDashboardFilters,
  RevenueAnalyticsDashboard,
  salesAnalyticsDashboardPie,
} from "../../store/actionCreators/dashboard/dasboardActions";
import { setCustomerVars } from "../../store/actionCreators/Customers/CustomerAction";
import Unauthorized from "../unauthorized";

const Dashboard = (props) => {
  const filters = useSelector((state) => state.dashboard_filters);
  const cards = useSelector((state) => state.dashboard_card);
  const revenueGraph = useSelector((state) => state.dashboard_revenue);
  const salespie = useSelector((state) => state.dashboard_sales_pie);
  const login = useSelector((state) => state.login);
  const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const dispatch = useDispatch();
  const currYear = new Date().getFullYear();
  const [current, setcurrent] = useState({
    month: "Jan",
    year: 2022,
  });
  const [currentRevenuedate, setcurrentRevenue] = useState({
    month: "Jan",
    year: 2022,
  });

  const [revFilter, setRevFilter] = useState("yearly");
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
  const yearArray = () => {
    let arrYear = ["All"];
    for (let i = 0; i < currYear - 2017 + 1; i++) {
      arrYear.push(2017 + i);
    }
    return arrYear;
  };
  let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentFilter, setCurrentFilters] = useState({
    branch: { branch_name: "All", branch_id: "All" },
    franchise: { franchise_name: "All", franchise_id: "All" },
  });
  useEffect(() => {
    dispatch(setCustomerVars());
    editPermissions();
  }, []);
  useEffect(() => {
    dispatch(getDashboardFilters("Super Admin"));
    dispatch(
      getDashboardCards(
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        current.year,
        current.month
      )
    );
    dispatch(
      salesAnalyticsDashboardPie(
        currentFilter.franchise.franchise_id,
        currentFilter.branch.branch_id,
        current.year,
        current.month
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

  const [salesCarddata, setSalesCard] = useState({
    avg_sales_per_day: 0,
    num_of_sales: 0,
    sales_revenue: 0,
  });
  useEffect(() => {
    if (cards.data) {
      setSalesCard({
        avg_sales_per_day: cards.data.avg_sales_per_day,
        num_of_sales: cards.data.num_of_sales,
        sales_revenue: cards.data.sales_revenue.toFixed(2),
      });
    }
  }, [cards]);
  const reports = [
    {
      icon: RiStackLine,
      title: "Number of Sales",
      value: salesCarddata.num_of_sales,
      rate: "2.4%",
      desc: "From previous period",
    },
    {
      icon: RiStore2Line,
      title: "Sales Revenue",
      value: `₹ ${salesCarddata.sales_revenue}`,
      rate: "2.4%",
      desc: "From previous period",
    },
    {
      icon: RiBriefcase4Line,
      title: "Average Sales per Day",
      value: `₹ ${salesCarddata.avg_sales_per_day}`,
      rate: "2.4%",
      desc: "From previous period",
    },
  ];

  // doughnut Graph
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
    if (salespie.data) {
      for (let i = 0; i < salespie.data.sales_analytics.length; i++) {
        const key = Object.keys(salespie.data.sales_analytics[i]);
        labels.push(key[0]);
        series.push(
          parseInt(salespie.data.sales_analytics[i][key[0]].slice(0, -1))
        );
        colors.push(dynamicColors());
      }

      setDoughnutState({
        series: series,
        options: {
          labels: labels,
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
  }, [salespie]);

  // Revenue analytics

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

  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "Dashboard") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };

  function monthDrop() {
    return monthArray.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  }
  const handleMonthChange = (e) => {
    setcurrent({
      ...current,
      month: e.target.value,
    });
  };
  const yearDrop = () => {
    const year = yearArray();
    return year.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };
  const handleYearChange = (e) => {
    setcurrent({
      ...current,
      year: e.target.value,
    });
  };
  // Revenue ANALYTICS month and year dropdown
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
  // Filters dropdown
  const [franchiseName, setfranchiseName] = useState("All");
  const [branchArray, setBranchArray] = useState(["All"]);

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
  if (editPermission)
    return (
      <React.Fragment>
        <Container
          fluid
          className={props.sideToggle === true ? "closeDash" : "openDash"}
          style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
        >
          <Row>
            <Col lg={8} sm={6} xs={12} className="dash-head">
              DASHBOARD
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
                <MiniWidgets reports={reports} />
              </Row>

              <RevenueAnalytics
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
                      <DoughnutGraph
                        options={Doughnutstate.options}
                        series={Doughnutstate.series}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  return <Unauthorized />;
};
export default Dashboard;
