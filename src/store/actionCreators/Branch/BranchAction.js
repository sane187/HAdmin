import axios from "axios";
import { toast } from "react-toastify";

export const getBranches = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/franchise/get_branch`)
      .then((branch) => {
        dispatch({
          type: "GET_BRANCHES",
          branch,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const getSingleBranch = (branch_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/get_single_branch?branch=${branch_id}`
      )
      .then((single_branch) => {
        dispatch({
          type: "GET_SINGLE_BRANCHES",
          single_branch: single_branch.data,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const deleteBranch = (branch_id) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/delete_branch?branch_id=${branch_id}`
      )
      .then((res) => {
        dispatch({
          type: "DELETE_BRANCH",
          branch_id,
        });
        toast.success(`Branch Deleted successfully`, {
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

export const updateBranch = (branch) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/edit_branch`,
        branch
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_BRANCH",
          branch,
        });
        toast.success(`Branch Data Updated successfully`, {
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

export const addNewBranch = (branch) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/add_branch`,
        branch
      )
      .then((res) => {
        dispatch({
          type: "ADD_NEW_BRANCH",
          branch: res,
        });
        toast.success(`New branch added successfully`, {
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

export const addProductToBranch = (product) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/add_product_branch`,
        product
      )
      .then((res) => {
        if (res.data.msg === "success") {
          toast.success(`Product Added successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          dispatch({
            type: "ADD_PRODUCT_TO_BRANCH",
            product: res.data.data,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 4000);
        }
      });
  };
};

export const deleteProductFromCat = (product_id) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/del_product_branch?product_id=${product_id}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast.success(`Product Deleted successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          dispatch({
            type: "DELETE_PRODUCT_FROM_CAT",
            product_id,
          });
          setTimeout(() => {
            window.location.reload(false);
          }, 4000);
        }
      });
  };
};
