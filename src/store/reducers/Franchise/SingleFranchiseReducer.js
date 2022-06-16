const SingleFranchiseReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_SINGLE_FRANCHISE":
      return action.franchise;

    default:
      return state;
  }
};
export default SingleFranchiseReducer;
