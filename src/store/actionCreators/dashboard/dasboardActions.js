import axios from "axios";
import { dashboard_card, dashboard_filters, dashboard_revenue, dashboard_sales_pie } from "../../reducers/dashboardReducer";
// Dasboard Analytics filter
export const getDashboardFilters = (role) => {
    return (dispatch, getState) => {
        axios.get(`${process.env.REACT_APP_API_URL}api/v1/admin/filters/get_filters?role=Super Admin`)
            .then(dashboard_filters => {

                dispatch({
                    type: "GET_DASHBOARD_FILTERS",
                    dashboard_filters
                })
            }).catch(err => {
                console.log("error", err);

            })
    }
}
// Dasboard Analytics card
export const getDashboardCards = (franchiseId, branchId, year, month) => {
    return (dispatch, getState) => {
        axios.get(`${process.env.REACT_APP_API_URL}api/v1/admin/dashboard_home/dashboard_analytics?franchise_id=${franchiseId}&branch_id=${branchId}&year=${year}&month=${month}`)
            .then(dashboard_card => {

                dispatch({
                    type: "GET_DASHBOARD_CARD",
                    dashboard_card
                })
            }).catch(err => {
                console.log("error", err);

            })
    }
}
// Revenue Analytics
export const RevenueAnalyticsDashboard = (franchiseId, branchId, year, month, revFilter) => {
    return (dispatch, getState) => {
        axios.get(`${process.env.REACT_APP_API_URL}api/v1/admin/dashboard_home/revenue_graph?franchise_id=${franchiseId}&branch_id=${branchId}&year=${year}&month=${month}&filter_by=${revFilter}`)
            .then(dashboard_revenue => {

                dispatch({
                    type: "GET_DASHBOARD_REVENUE",
                    dashboard_revenue
                })
            }).catch(err => {
                console.log("error", err);

            })
    }
}

// SALES Analytics PIE CHART DATA
export const salesAnalyticsDashboardPie = (franchiseId, branchId, year, month) => {
    return (dispatch, getState) => {
        axios.get(`${process.env.REACT_APP_API_URL}api/v1/admin/dashboard_home/sales_analytics_pie?franchise_id=${franchiseId}&branch_id=${branchId}&year=${year}&month=${month}`)
            .then(dashboard_sales_pie => {

                dispatch({
                    type: "GET_DASHBOARD_SALES_PIE",
                    dashboard_sales_pie
                })
            }).catch(err => {
                console.log("error", err);

            })
    }
}

export const clearDashBoard = () => {
    return (dispatch, getState) => {
        dispatch({
            type: "SET_DASHBOARD_CARD",
        })
        
        dispatch({
            type: "SET_DASHBOARD_REVENUE",
        })
        dispatch({
            type: "SET_DASHBOARD_SALES_PIE",
        })

    }

}