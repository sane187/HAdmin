import axios from "axios";
import { toast } from "react-toastify";

export const getAllCategories = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category`)
      .then((categories) => {
        dispatch({
          type: "GET_ALL_CATEGORIES",
          categories,
        });
      });
  };
};
export const getAllProducts = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_products`)
      .then((products) => {
        dispatch({
          type: "GET_ALL_PRODUCTS",
          products,
        });
      });
  };
};
export const getAddons = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/product/get_addons`)
      .then((addons) => {
        dispatch({
          type: "GET_ALL_ADDONS",
          addons,
        });
      });
  };
};
export const addNewCategory = (object) => {
  const form = new FormData();

  for (let key in object) {
    console.log(key, object[key]);
    form.append(key, object[key]);
  }
  console.log(object);
  console.log(form.getAll);

  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/product/add_category`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      toast.success(`NEW CATEGORY ADDED SUCCESFULLY`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const myTimeout = setTimeout(window.location.reload(false), 3000);
      clearTimeout(myTimeout);
    })
    .catch((err) => {
      console.log("error", err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};
export const addNewFoodItem = (object) => {
  const form = new FormData();

  for (let key in object) {
    form.append(key, object[key]);
  }

  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/product/add_fooditem`,
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      toast.success(`New Product added successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const myTimeout = setTimeout(window.location.reload(false), 3000);
      clearTimeout(myTimeout);
    })
    .catch((err) => {
      console.log("error", err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};
export const addNewAddon = (title, options) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}api/v1/admin/product/add_addons`, {
      title: title,
      add_on_options: options,
    })
    .then((res) => {
      toast.success(`New Addon added successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // setTimeout(window.location.reload(false), 3000);
    })
    .catch((err) => {
      console.log("error", err);
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};
export const get_category_branches = (cat_list_id, branch_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category_by_branches?category_list_id=${cat_list_id}&branch_id=${branch_id}`
      )
      .then((data) => {
        dispatch({
          type: "GET_BRANCH_PRODUCT",
          data: data.data,
        });
      });
  };
};

export const get_product_branch = (cat_list_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category_branches?category_list_id=${cat_list_id}`
      )
      .then((data) => {
        dispatch({
          type: "GET_CATEGORY_BRANCHES",
          data: data.data,
        });
        if (data.data.data[0]) {
          axios
            .get(
              `${process.env.REACT_APP_API_URL}api/v1/admin/product/get_category_by_branches?category_list_id=${cat_list_id}&branch_id=${data.data.data[0].branch_id}`
            )
            .then((data) => {
              dispatch({
                type: "GET_BRANCH_PRODUCT",
                data: data.data,
              });
            });
        } else {
          dispatch({
            type: "GET_BRANCH_PRODUCT",
            data: null,
          });
          toast.error("No data available ", {
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
      });
  };
};
