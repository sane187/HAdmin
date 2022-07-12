export const BranchReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_BRANCHES":
      return action.branch;
    case "SET_BRANCHES":
      return "";
    case "UPDATE_BRANCH":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.map((b) =>
            b.branch_id === action.branch.branch_id ? action.branch : b
          ),
        },
      };
    case "DELETE_BRANCH":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter(
            (b) => b.branch_id === action.branch.branch_id
          ),
        },
      };
    default:
      return state;
  }
};
export const SingleBranchReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_SINGLE_BRANCHES":
      return action.single_branch;
    case "UPDATE_BRANCH":
      return action.branch;
    case "SET_SINGLE_BRANCHES":
      return "";
    case "DELETE_BRANCH":
      return "";
    case "DELETE_PRODUCT_FROM_CAT":
      return {
        ...state,
        data: {
          ...state.data,
          categories: state.data.categories.map((c) => ({
            ...c,
            products: c.products.filter(
              (p) => p.product_id !== action.product_id
            ),
          })),
        },
      };
    default:
      return state;
  }
};
