export const fetchEmployeesReducer=(state="",action)=>{
    switch (action.type) {
        case "GET_EMPLOYEES":
            return action.employees;
        case "SET_EMPLOYEES":
            return "";
        default:
            return state;
    }
}
export const fetchSingleEmployeeReducer=(state="",action)=>{
    switch (action.type) {
        case "GET_SINGLE_EMPLOYEE":
            return action.employee;
        case "SET_SINGLE_EMPLOYEE":
            return "";
        default:
            return state;
    }
}
export const EmployeeSalesAnalyticsReducer=(state="",action)=>{
    switch (action.type) {
        case "EMPLOYEE_SALES_ANALYTICS":
            return action.employee_sales_analytics;
        case "SET_EMPLOYEE_SALES_ANALYTICS":
            return "";
        default:
            return state;
    }
}
export const EmployeePaginationReducer=(state=1,action)=>{
    switch (action.type) {
        case "GET_EMPLOYEE_PAGE":
            return state;
        case "SET_EMPLOYEE_PAGE":
            return action.page;
        default:
            return state;
    }
}
export const OrdersPaginationReducer=(state=1,action)=>{
    switch (action.type) {
        case "GET_ORDER_PAGE":
            return state;
        case "SET_ORDER_PAGE":
            return action.page;
        default:
            return state;
    }
}
export const EmployeeOrdersTakenReducer=(state="",action)=>{
    switch (action.type) {
        case "EMPLOYEE_ORDERS_TAKEN":
            return action.employee_orders_taken;
        case "SET_EMPLOYEE_ORDERS_TAKEN":
            return "";
        default:
            return state;
    }
}

export const RolesReducer=(state="",action)=>{
    switch (action.type) {
        case "GET_ROLES":
            return action.roles;
        case "SET_ROLES":
            return "";
        default:
            return state;
    }
}