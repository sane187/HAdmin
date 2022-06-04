export const ordersReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return action.orders;
    default:
      return state;
  }
};

export const AllOrdersPaginationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_ALLORDERS_PAGE":
      return action.page;
    default:
      return state;
  }
};

export const FilteredCustomersReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_FILTERED_CUSTOMERS":
      return action.customers;
    default:
      return state;
  }
};
