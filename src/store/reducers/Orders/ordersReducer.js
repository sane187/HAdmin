export const ordersReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return action.orders;
    default:
      return state;
  }
};

export const orderReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_ORDER":
      return action.order;
    case "UPDATE_ORDER":
      return action.order;
    case "UPDATE_ORDER_ITEM":
      return {
        ...state,
        data: {
          ...state.data,
          order_items: state.data.order_items.map((oi) =>
            oi.product_id === action.order.data.product_id
              ? action.order.data
              : oi
          ),
        },
      };
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
