export const single_adminReducer = (state = "", action) => {
  switch (action.type) {
    case "FETCH_SINGLE_ADMIN":
      return action.admins;
    case "UPDATE_SINGLE_ADMIN":
      return action.admins;
    default:
      return state;
  }
};
