export const get_admin_rolesReducer = (state = "", action) => {
    switch (action.type) {
        case  "GET_ADMIN_ROLES":
            return action.admin_role;
        case "SET_ADMIN_ROLES":
            return "";
        default:
            return state;
    }
}