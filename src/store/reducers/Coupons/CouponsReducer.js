export const couponsReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_COUPONS":
      return action.coupons;
    default:
      return state;
  }
};

export const couponReducer = (state = "", action) => {
  switch (action.type) {
    case "GET_COUPON":
      return action.coupon;
    case "UPDATE_COUPON":
      return action.coupon;
    default:
      return state;
  }
};

export const CouponsPaginationReducer = (state = 1, action) => {
  switch (action.type) {
    case "SET_COUPONS_PAGE":
      return action.page;
    default:
      return state;
  }
};
