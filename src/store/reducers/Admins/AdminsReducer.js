export const get_all_adminsReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ALL_ADMINS":
      return action.admins;
    case "UPDATE_SINGLE_ADMIN":
      return state;
    default:
      return state;
  }
};
