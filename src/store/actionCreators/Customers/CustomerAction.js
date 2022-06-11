import axios from "axios";
import { toast } from "react-toastify";

export const fetchCustomers = (page, franchise, branch, city) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/fetch_customers/${page}?franchise_id=${franchise}&branch_id=${branch}&role=City Head&city=${city}`
      )
      .then((fetch_customer) => {
        dispatch({
          type: "GET_CUSTOMERS",
          fetch_customer,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const CustomerDashboardAction = (franchise, branch, month, year) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/customer_dashboard?franchise_id=${franchise}&branch_id=${branch}&Year=${year}&month=${month}`
      )
      .then((customer_dashboard) => {
        dispatch({
          type: "GET_CUSTOMER_DASHBOARD",
          customer_dashboard,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const CustomerAnalyticsGraph = (franchise, branch, month, year) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/customer_analytics_graph?Year=${year}&month=${month}&franchise_id=${franchise}&branch_id=${branch}`
      )
      .then((customer_analytics_graph) => {
        dispatch({
          type: "GET_CUSTOMER_ANALYTICS_GRAPH",
          customer_analytics_graph,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const CustomerAnalyticsPie = (franchise, branch) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/customer_analytics_pie?franchise_id=${franchise}&branch_id=${branch}`
      )
      .then((customer_analytics_pie) => {
        dispatch({
          type: "GET_CUSTOMER_ANALYTICS_PIE",
          customer_analytics_pie,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
// Individual Customer Related

export const CustomerOrderHistory = (page, contact) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/customer_order_history/${page}?customer_no=${contact}`
      )
      .then((customer_order_history) => {
        dispatch({
          type: "GET_CUSTOMER_ORDER_HISTORY",
          customer_order_history,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const OrderAnalyticsGraph = (month, year, contact, filter) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/order_analytics_graph?filter_by=${filter}&year=${year}&customer_no=${contact}&month=${month}`
      )
      .then((order_analytics_graph) => {
        dispatch({
          type: "GET_ORDER_ANALYTICS_GRAPH",
          order_analytics_graph,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const CustomerAvgPurchase = (filter, contact) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/avg_purchase?customer_no=${contact}&filter_by=${filter}`
      )
      .then((customer_avg_purchase) => {
        dispatch({
          type: "GET_CUSTOMER_AVG_PURCHASE",
          customer_avg_purchase,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getCustomerPagination = () => {
  return (dispatch, getSate) => {
    dispatch({
      type: "GET_CUSTOMER_PAGE",
    });
  };
};
export const setCustomerPagination = (page) => {
  return (dispatch, getSate) => {
    dispatch({
      type: "SET_CUSTOMER_PAGE",
      page,
    });
  };
};
export const getMostOrderPagination = () => {
  return (dispatch, getSate) => {
    dispatch({
      type: "GET_MOST_ORDER_PAGE",
    });
  };
};
export const setMostOrderPagination = (page) => {
  return (dispatch, getSate) => {
    dispatch({
      type: "SET_MOST_ORDER_PAGE",
      page,
    });
  };
};
// FOR CLEARING ALL VARS DATA
export const setCustomerVars = (page) => {
  return (dispatch, getSate) => {
    dispatch({
      type: "SET_CUSTOMER_PAGE",
      page: 1,
    });

    dispatch({
      type: "SET_CUSTOMER_AVG_PURCHASE",
    });
    dispatch({
      type: "SET_ORDER_ANALYTICS_GRAPH",
    });
    dispatch({
      type: "SET_CUSTOMER_ORDER_HISTORY",
    });
    dispatch({
      type: "SET_CUSTOMER_ANALYTICS_PIE",
    });
    dispatch({
      type: "SET_CUSTOMER_ANALYTICS_GRAPH",
    });
    dispatch({
      type: "SET_CUSTOMER_DASHBOARD",
    });
    dispatch({
      type: "SET_CUSTOMERS",
    });
  };
};
export const addNewCustomer = (OB) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/customer/add_customer`,
      {
        first_name: OB.first_name,
        last_name: OB.last_name,
        profile_pic:
          "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png",
        mobile_no: OB.mobile_no,
        email: OB.email,
        date_of_birth: OB.date_of_birth,
        gender: OB.gender,
        branch: OB.branch,
        branch_id: OB.branch_id,
        shipping_address: {
          address: OB.shipping_address.address,
          pincode: OB.shipping_address.pincode,
        },
        billing_address: {
          address: OB.billing_address.address,
          pincode: OB.billing_address.pincode,
        },
      }
    )
    .then((res) => {
      toast.success(`SuccessFully Added Customer`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //  setTimeout(()=>{window.location.reload(false)},4000)
    })
    .catch((err) => {
      console.log("error", err);
    });
};
