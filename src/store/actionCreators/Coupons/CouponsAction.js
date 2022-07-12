import axios from "axios";
import { toast } from "react-toastify";
import qs from "qs";

export const setCouponsPagination = (page) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_COUPONS_PAGE",
      page,
    });
  };
};

export const getCouponList = (page, search_filters = {}) => {
  const search = qs.stringify(search_filters);
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_coupons/search_coupons/${page}?${search}`
      )
      .then((res) => {
        dispatch({
          type: "GET_COUPONS",
          coupons: res,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getCoupon = (coupon_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_coupons/fetch_sngle_coupon?coupon_id=${coupon_id}`
      )
      .then((res) => {
        dispatch({
          type: "GET_COUPON",
          coupon: res.data.data,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const updateCoupon = (coupon) => {
  const data = {};
  const {
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
    coupon_id,
  } = coupon;
  data.coupon_id = coupon_id;
  if (coupon_code) data.coupon_code = coupon_code;
  if (title) data.title = title;
  if (start) data.start = start;
  if (end) data.end = end;
  if (disc_percent) data.disc_percent = disc_percent;
  if (flat_discount) data.flat_discount = flat_discount;
  if (customer_no) data.customer_no = customer_no;
  if (employee_id) data.employee_id = employee_id;
  if (branch_id) data.branch_id = branch_id;
  if (min_cart) data.min_cart = min_cart;
  if (customer_group_name) data.customer_group_name = customer_group_name;
  console.log(data);
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_coupons/update_coupons`,
        data
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          dispatch({
            type: "UPDATE_COUPON",
            coupon: coupon,
          });
          toast.success(`successFully Updated Coupon`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setTimeout(() => {
          window.location.reload(false);
        }, 4000);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const addNewCoupon = (coupon) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_coupons/add_coupon`,
        coupon
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_COUPON",
          res,
        });
        if (res.data.status === "success")
          toast.success(`successFully Added Coupon`, {
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
