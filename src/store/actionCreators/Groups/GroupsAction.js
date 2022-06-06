import axios from "axios";
import { toast } from "react-toastify";

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

export const addCustomersToGroup = (customer_group_name, queryString) => {
  return (dispatch, getState) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/add_customer_to_group?customer_group_name=${customer_group_name}&${queryString}`
      )
      .then((res) => {
        dispatch({
          type: "ADD_CUSTOMERS_TO_GROUP",
        });

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
