import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const getEmployeeToken = (email, password, role) => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/admin/admin_login`, {
        email: email,
        password: password,
      })
      .then((employeeInfo) => {
        if (employeeInfo.data.status === "success") {
          axios
            .get(
              `${process.env.REACT_APP_API_URL}api/v1/admin/get_admin_info`,
              {
                headers: { token: employeeInfo.data.token },
              }
            )
            .then((empInfo) => {
              dispatch({
                type: "GET_LOGIN",
                employeeInfo: empInfo.data,
                status: "success",
                role: role,
              });
              console.log(empInfo.data);
              axios
                .get(
                  `${process.env.REACT_APP_API_URL}api/v1/admin/filters/get_filters?role=${empInfo.data.data.admin_role.admin_role}&franchise_id=${empInfo.data.data.franchise_id}&branch=${empInfo.data.data.branch_id}`
                )
                .then((dashboard_filters) => {
                  dispatch({
                    type: "GET_DASHBOARD_FILTERS",
                    dashboard_filters,
                  });
                })
                .catch((err) => {
                  console.log("error", err);
                });
            })
            .catch((err) => {
              dispatch({
                type: "GET_EMPLOYEE",
                employeeInfo: [],
                status: "failure",
                role: role,
              });
            });
        } else {
          toast.error(employeeInfo.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          dispatch({
            type: "GET_EMPLOYEE",
            employeeInfo: employeeInfo.data.msg,
            status: employeeInfo.data.status,
            role: role,
          });
        }
      })
      .catch((err) => {
        console.log("Invalid", err);
        <Navigate to="/" replace />;
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    // customer reset
    dispatch({
      type: "SET_CUSTOMER_PAGE",
      page: 1,
    });

    dispatch({
      type: "SET_CUSTOMER_AVG_PURCHASE",
    });
    dispatch({
      type: "SET_ORDER_ANALYTICS_GRAPH",
    });
    dispatch({
      type: "SET_CUSTOMER_ORDER_HISTORY",
    });
    dispatch({
      type: "SET_CUSTOMER_ANALYTICS_PIE",
    });
    dispatch({
      type: "SET_CUSTOMER_ANALYTICS_GRAPH",
    });
    dispatch({
      type: "SET_CUSTOMER_DASHBOARD",
    });
    dispatch({
      type: "SET_CUSTOMERS",
    });
    // auth
    dispatch({
      type: "SET_LOGIN",
    });
    // dashboard Routes
    dispatch({
      type: "SET_DASHBOARD_CARD",
    });

    dispatch({
      type: "SET_DASHBOARD_REVENUE",
    });
    dispatch({
      type: "SET_DASHBOARD_SALES_PIE",
    });
    // employee reset
    dispatch({
      type: "SET_EMPLOYEES",
    });
    dispatch({
      type: "ET_SINGLE_EMPLOYEE",
    });
    dispatch({
      type: "SET_EMPLOYEE_SALES_ANALYTICS",
    });
    dispatch({
      type: "SET_EMPLOYEE_PAGE",
      page: 1,
    });
    dispatch({
      type: "SET_EMPLOYEE_ORDERS_TAKEN",
    });
    dispatch({
      type: "SET_ROLES",
    });
  };
};
