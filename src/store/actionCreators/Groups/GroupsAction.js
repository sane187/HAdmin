import axios from "axios";
import { toast } from "react-toastify";
import qs from "qs";

export const setGroupCustomerPagination = (page) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_GROUP_CUSTOMER_PAGE",
      page,
    });
  };
};

export const searchForCustomers = (customer) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/search_customer?search=${customer}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_CUSTOMER",
          res,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getGroupList = () => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/get_all_customer_group`
      )
      .then((res) => {
        dispatch({
          type: "GET_GROUPS",
          groups: res,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getSingleGroup = (page = 1, group_name) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/get_single_customer_group/${page}?group_name=${group_name}`
      )
      .then((res) => {
        dispatch({
          type: "GET_SINGLE_GROUP",
          group: res,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const DeleteAllCustomersFromGroup = (group) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/delete_all_customer_from_group`,
        group
      )
      .then((res) => {
        dispatch({
          type: "DELETE_ALL_CUSTOMERS_FROM_GROUP",
          group,
        });
        toast.success(`Successfully Deleted All Customers`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const DeleteCustomerFromGroup = (group) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/delete_customer_from_group`,
        group
      )
      .then((res) => {
        dispatch({
          type: "DELETE_CUSTOMER_FROM_GROUP",
          group,
        });
        toast.success(`Successfully Deleted Customer`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const DeleteGroup = (group) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/delete_customer_group`,
        group
      )
      .then((res) => {
        dispatch({
          type: "DELETE_SINGLE_GROUP",
          group,
        });
        toast.success(`Successfully Deleted group`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const UpdateSingleGroup = (group) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/update_customer_group`,
        group
      )
      .then((res) => {
        dispatch({
          type: "UPDATE_SINGLE_GROUP",
          group: { ...res, customer_group_name: group.new_val },
        });
        toast.success(`Successfully Updated group info`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const addCustomerToGroup = (customer_group_name, customer_no) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/add_single_customer_from_group`,
        { customer_group_name, customer_no }
      )
      .then((res) => {
        dispatch({
          type: "ADD_CUSTOMER_TO_GROUP",
          customer_no,
        });

        if (res.data.status === "success")
          toast.success(`Successfully Added Customer to the group`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        else {
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

export const addCustomersToGroup = (customer_group_name, queryString) => {
  return (dispatch, getState) => {
    const qstr = qs.stringify({
      customer_group_name,
    });
    console.log(qstr);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_orders/add_customer_to_group?${queryString}&${qstr}`
      )
      .then((res) => {
        dispatch({
          type: "ADD_CUSTOMERS_TO_GROUP",
        });

        if (res.data.status === "success")
          toast.success(`Successfully Added Customers to the selected group`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        else {
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

export const addNewGroup = (customer_group_name) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/add_new_group`,
        { customer_group_name }
      )
      .then((res) => {
        dispatch({
          type: "ADD_NEW_GROUP",
          group: res.data,
        });
        if (res.data.status === "success")
          toast.success(`successFully Added Group`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        else {
          toast.error(`${res.data.msg}`, {
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
