import axios from "axios";
import { toast } from "react-toastify";
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

export const getSingleOrder = (order_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_orders/fetch_single_order?order_id=${order_id}`
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDER",
          order: res.data,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const updateSingleProductItem = (product_item) => {
  console.log(product_item);
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_orders/update_order_items`,
        product_item
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_ORDER_ITEM",
          order: { ...res, data: product_item },
        });
        toast.success(`Successfully Updated Product item`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 4000);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const updateSingleOrder = (order) => {
  console.log(order);
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_orders/update_order`,
        order
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_ORDER",
          order: { ...res, data: order },
        });
        toast.success(`Successfully Updated Order Info`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 4000);
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
