import axios from "axios";
import { toast } from "react-toastify";

export const fetchSingleEmployee = (emp_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/employee/get_employee?employee=${emp_id}`
      )
      .then((employee) => {
        dispatch({
          type: "GET_SINGLE_EMPLOYEE",
          employee,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const fetchEmployees = (page, franchise_id, branch_id, search) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/employee/get_all_employees/${page}?franchise=${franchise_id}&branch=${branch_id}&search=${search}`
      )
      .then((employees) => {
        dispatch({
          type: "GET_EMPLOYEES",
          employees,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const EmployeeSalesAnalytics = (emp_id, filter, year, month) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/employee/employee_sales_analytics?employee=${emp_id}&filter_by=${filter}&year=${year}&month=${month}`
      )
      .then((employee_sales_analytics) => {
        dispatch({
          type: "EMPLOYEE_SALES_ANALYTICS",
          employee_sales_analytics,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const addEmployees = (OB) => {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}api/v1/admin/employee/add_new_employee`,
      {
        full_name: OB.full_name,
        mobile_no: OB.mobile_no,
        email: OB.email,
        password: OB.password,
        profile_pic:
          "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png",
        date_of_birth: OB.date_of_birth,
        address: OB.address,
        branch: OB.branch,
        branch_id: OB.branch_id,
        employee_role: OB.employee_role,
        employee_role_id: OB.employee_role_id,
        gender: OB.gender,
      }
    )
    .then((res) => {
      toast.success(`successFully Added Employee`, {
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

export const getEmployeePagination = () => {
  return (dispatch, getSate) => {
    dispatch({
      type: "GET_EMPLOYEE_PAGE",
    });
  };
};
export const setEmployeePagination = (page) => {
  return (dispatch, getSate) => {
    dispatch({
      type: "SET_EMPLOYEE_PAGE",
      page,
    });
  };
};
export const EmployeeOrdersTaken = (page, emp_id, search) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/employee/get_employee_orders/${page}?employee=${emp_id}&search=${search}`
      )
      .then((employee_orders_taken) => {
        dispatch({
          type: "EMPLOYEE_ORDERS_TAKEN",
          employee_orders_taken,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getOrderPagination = () => {
  return (dispatch, getSate) => {
    dispatch({
      type: "GET_ORDER_PAGE",
    });
  };
};
export const setOrderPagination = (page) => {
  return (dispatch, getSate) => {
    dispatch({
      type: "SET_ORDER_PAGE",
      page,
    });
  };
};

export const getEmployeeRoles = () => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/employee/get_employee_roles`
      )
      .then((roles) => {
        dispatch({
          type: "GET_ROLES",
          roles,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const resetEmployee = () => {
  return (dispatch, getState) => {
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
