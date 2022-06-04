import axios from "axios";

// export const getOrderPagination = () => {
//   return (dispatch, getSate) => {
//     dispatch({
//       type: "GET_ORDER_PAGE",
//     });
//   };
// };
export const setOrderPagination = (page) => {
  return (dispatch, getSate) => {
    dispatch({
      type: "SET_ALLORDERS_PAGE",
      page,
    });
  };
};

export const fetchOrderList = (pageNo, queryString) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_orders/fetch_order_list/${pageNo}?${queryString}`
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDERS",
          orders: res,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const fetchCustomerList = (pageNo, queryString) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_orders/fetch_customer_list/${pageNo}?${queryString}`
      )
      .then((res) => {
        dispatch({
          type: "GET_FILTERED_CUSTOMERS",
          customers: res,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
