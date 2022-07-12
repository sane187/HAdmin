import axios from "axios";

export const getAllCustomerRoles = () => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/customer/fetch_customer_roles`
      )
      .then((roles) => {
        dispatch({
          type: "GET_ALL_CUSTOMER_ROLES",
          roles,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
