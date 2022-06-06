export const groupsReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return action.groups;
    case "ADD_NEW_GROUP":
      return {
        ...state,
        data: { ...state.data, data: [...state.data.data, action.group.data] },
      };
    default:
      return state;
  }
};
