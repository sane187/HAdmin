import axios from "axios";
import { toast } from "react-toastify";

export const getAllFranchise = () => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/get_franchise`
      )
      .then((franchise) => {
        dispatch({
          type: "GET_FRANCHISE",
          franchise,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getSingleFranchise = (franchise_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/get_franchise?franchise=${franchise_id}`
      )
      .then((res) => {
        dispatch({
          type: "GET_SINGLE_FRANCHISE",
          franchise: res.data.data,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const deleteFranchise = (franchise_id) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/delete_franchise?id=${franchise_id}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.msg === "deleted") {
          toast.success(`Franchise deleted succesfully`, {
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
            type: "DELETE_FRANCHISE",
            franchise_id,
          });
        } else {
          toast.error(`Failure`, {
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
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const addNewFranch = (franchise_name, location, branchNum) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/add_franchise`,
      {
        franchise_name: franchise_name,
        location: location,
        no_branches: branchNum,
      }
    )
    .then((res) => {
      toast.success(`Franchise Added succesfully`, {
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
      }, 3000);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const updateFranchise = (franchise) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/franchise/edit_franchise`,
        franchise
      )
      .then((res) => {
        if (res.data.status === "success") {
          
          dispatch({
            type: "UPDATE_FRANCHISE",
            franchise,
          });
          toast.success(`Franchise Data Updated succesfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          
        } else {
          toast.error(`Failure`, {
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
        }, 5000);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
