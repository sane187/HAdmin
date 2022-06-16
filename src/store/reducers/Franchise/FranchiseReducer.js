const FranchiseReducer = (state = "", action) => {
  switch (action.type) {
    case "ADD_FRANCHISE":
      return state;
    case "GET_FRANCHISE":
      return action.franchise;
    case "UPDATE_FRANCHISE":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.map((fr) =>
            fr.franchise_id === action.franchise.franchise_id
              ? action.franchise
              : fr
          ),
        },
      };
    case "DELETE_FRANCHISE":
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter(
            (fr) => fr.franchise_id !== action.franchise_id
          ),
        },
      };
    default:
      return state;
  }
};
export default FranchiseReducer;
