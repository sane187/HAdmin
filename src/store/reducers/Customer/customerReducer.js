import { bindActionCreators } from "redux";

export const fetchCustomersReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return action.fetch_customer;
    case "SET_CUSTOMERS":
      return "";
    default:
      return state;
  }
};

export const singleCustomerReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_SINGLE_CUSTOMER":
      return action.customer;
    case "UPDATE_CUSTOMER":
      return action.customer;
    default:
      return state;
  }
};

export const CustomerDashboardReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_CUSTOMER_DASHBOARD":
      return action.customer_dashboard;
    case "SET_CUSTOMER_DASHBOARD":
      return "";
    default:
      return state;
  }
};
export const CustomerAnalyticsGraphReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_CUSTOMER_ANALYTICS_GRAPH":
      return action.customer_analytics_graph;
    case "SET_CUSTOMER_ANALYTICS_GRAPH":
      return "";
    default:
      return state;
  }
};
export const CustomerAnalyticsPieReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_CUSTOMER_ANALYTICS_PIE":
      return action.customer_analytics_pie;
    case "SET_CUSTOMER_ANALYTICS_PIE":
      return "";
    default:
      return state;
  }
};
export const CustomerOrderHistoryReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_CUSTOMER_ORDER_HISTORY":
      return action.customer_order_history;
    case "SET_CUSTOMER_ORDER_HISTORY":
      return "";
    default:
      return state;
  }
};
export const OrderAnalyticsGraphReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ORDER_ANALYTICS_GRAPH":
      return action.order_analytics_graph;
    case "SET_ORDER_ANALYTICS_GRAPH":
      return "";
    default:
      return state;
  }
};
export const CustomerAvgPurchaseReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_CUSTOMER_AVG_PURCHASE":
      return action.customer_avg_purchase;
    case "SET_CUSTOMER_AVG_PURCHASE":
      return "";
    default:
      return state;
  }
};
export const CustomerPaginationReducer = (state = 1, action) => {
  switch (action.type) {
    case "GET_CUSTOMER_PAGE":
      return state;
    case "SET_CUSTOMER_PAGE":
      return action.page;
    default:
      return state;
  }
};
export const MostOrderPaginationReducer = (state = 1, action) => {
  switch (action.type) {
    case "GET_MOST_ORDER_PAGE":
      return state;
    case "SET_MOST_ORDER_PAGE":
      return action.page;
    default:
      return state;
  }
};
