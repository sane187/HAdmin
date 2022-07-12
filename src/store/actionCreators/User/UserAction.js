import axios from "axios";
import { toast } from "react-toastify";

export const addAdmin = (OB) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}api/v1/admin/admin_signup`, {
      username: OB.username,
      phone: OB.phone,
      email: OB.email,
      password: OB.password,
      date_of_birth: OB.date_of_birth,
      branch_id: OB.branch_id,
      franchise_id: OB.franchise_id,
      admin_role_id: OB.admin_role_id,
      gender: OB.gender,
      Permissions: OB.Permissions,
    })
    .then((res) => {
      toast.success(`successFully Added Admin`, {
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

export const getAdminRoles = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/get_admin_roles`)
      .then((admin_role) => {
        dispatch({
          type: "GET_ADMIN_ROLES",
          admin_role,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getAllAdmins = () => {
  return (dispatch, getState) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/admin/fetch_all_admin`)
      .then((admins) => {
        dispatch({
          type: "GET_ALL_ADMINS",
          admins,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const fetchSingleAdmin = (admin_id) => {
  return (dispatch, getState) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/fetch_single_admin?admin_id=${admin_id}`
      )
      .then((admins) => {
        dispatch({
          type: "FETCH_SINGLE_ADMIN",
          admins,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const updateSingleAdminInfo = (OB) => {
  return (dispatch, getState) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/admin/update_admin_info`, {
        admin_id: OB.admin_id,
        username: OB.username,
        phone: OB.phone,
        email: OB.email,
        password: OB.password,
        date_of_birth: OB.date_of_birth,
        branch_id: OB.branch_id,
        franchise_id: OB.franchise_id,
        admin_role_id: OB.admin_role_id,
        gender: OB.gender,
        Permissions: OB.Permissions,
      })
      .then((res) => {
        dispatch({
          type: "UPDATE_SINGLE_ADMIN",
          admins: {
            data: { admins: [{ ...OB, admin_permissions: OB.Permissions }] },
          },
        });
        toast.success(`successfully Updated Admin Information`, {
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
