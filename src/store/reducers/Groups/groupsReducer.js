export const groupsReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return action.groups;
    case "ADD_NEW_GROUP":
      return {
        ...state,
        data: { ...state.data, data: [...state.data.data] },
      };
    case "DELETE_SINGLE_GROUP":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter(
            (g) => g.customer_group_name !== action.group.customer_group_name
          ),
        },
      };
    default:
      return state;
  }
};

export const SearchCustomerReducer = (state = "", action) => {
  switch (action.type) {
    case "SEARCH_CUSTOMER":
      return action.res;
    default:
      return state;
  }
};

export const groupReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_SINGLE_GROUP":
      return action.group;
    case "UPDATE_SINGLE_GROUP":
      return { ...state, data: { ...state.data, data: action.group } };
    case "DELETE_CUSTOMER_FROM_GROUP":
      return {
        ...state,
        data: {
          ...state.data,
          members: state.data.members.filter(
            (m) => m.customer_no !== action.group.customer_no
          ),
        },
      };
    case "DELETE_ALL_CUSTOMERS_FROM_GROUP":
      return {
        ...state,
        data: {
          ...state.data,
          members: [],
        },
      };
    case "ADD_CUSTOMER_TO_GROUP":
      return {
        ...state,
        data: {
          ...state.data,
          members: [...state.data.members, { customer_no: action.customer_no }],
        },
      };
    default:
      return state;
  }
};

export const GroupCustomersPaginationReducer = (state = 1, action) => {
  switch (action.type) {
    case "GET_GROUP_CUSTOMER_PAGE":
      return state;
    case "SET_GROUP_CUSTOMER_PAGE":
      return action.page;
    default:
      return state;
  }
};
