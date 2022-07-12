export const dashboard_card = (state = "", action) => {
    switch (action.type) {
        case "GET_DASHBOARD_CARD":
            return action.dashboard_card;
        case "SET_DASHBOARD_CARD":
            return "";
        default:
            return state;
    }
}
export const dashboard_filters = (state = "", action) => {
    switch (action.type) {
        case "GET_DASHBOARD_FILTERS":
            return action.dashboard_filters;
        case "SET_DASHBOARD_FILTERS":
            return "";
        default:
            return state;
    }
}
export const dashboard_sales_pie = (state = "", action) => {
    switch (action.type) {
        case "GET_DASHBOARD_SALES_PIE":
            return action.dashboard_sales_pie;
        case "SET_DASHBOARD_SALES_PIE":
            return "";
        default:
            return state;
    }
}

export const dashboard_revenue = (state = "", action) => {
    switch (action.type) {
        case "GET_DASHBOARD_REVENUE":
            return action.dashboard_revenue;
        case "SET_DASHBOARD_REVENUE":
            return "";
        default:
            return state;
    }
}


