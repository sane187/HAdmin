export const CustomerRolesReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ALL_CUSTOMER_ROLES":
      return action.roles;
    default:
      return state;
  }
};
