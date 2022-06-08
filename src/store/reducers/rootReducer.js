import FranchiseReducer from "./Franchise/FranchiseReducer";
import { BranchReducer, SingleBranchReducer } from "./Branch/BranchReducer";
import { combineReducers } from "redux";
import {
  ProductsReducer,
  AddonsReducer,
  CategoryReducer,
  get_category_branchesReducer,
  get_product_branchReducer,
} from "./Catalog/getProductsRed";
import SidebarReducer from "./sidebarReducer";
import {
  dashboard_card,
  dashboard_filters,
  dashboard_revenue,
  dashboard_sales_pie,
} from "./dashboardReducer";
import {
  CustomerAnalyticsGraphReducer,
  CustomerAnalyticsPieReducer,
  CustomerAvgPurchaseReducer,
  CustomerDashboardReducer,
  CustomerOrderHistoryReducer,
  CustomerPaginationReducer,
  fetchCustomersReducer,
  MostOrderPaginationReducer,
  OrderAnalyticsGraphReducer,
} from "./Customer/customerReducer";
import {
  EmployeeOrdersTakenReducer,
  EmployeePaginationReducer,
  EmployeeSalesAnalyticsReducer,
  fetchEmployeesReducer,
  fetchSingleEmployeeReducer,
  OrdersPaginationReducer,
  RolesReducer,
} from "./Employee/EmployeeReducer";
import authReducer from "./loginReducer";
import { get_admin_rolesReducer } from "./User/UserReducer";
import { get_all_adminsReducer } from "./Admins/AdminsReducer";
import { single_adminReducer } from "./Admins/singleAdminReducer";
import {
  AllOrdersPaginationReducer,
  ordersReducer,
  FilteredCustomersReducer,
  orderReducer,
} from "./Orders/ordersReducer";
import { groupsReducer } from "./Groups/groupsReducer";

const rootReducer = combineReducers({
  login: authReducer,
  franchise: FranchiseReducer,
  branch: BranchReducer,
  products: ProductsReducer,
  addons: AddonsReducer,
  categories: CategoryReducer,
  toggle: SidebarReducer,
  role: RolesReducer,
  admin_role: get_admin_rolesReducer,
  single_branch: SingleBranchReducer,
  // admin vars
  admins: get_all_adminsReducer,
  single_admin: single_adminReducer,
  // groups vars
  groups: groupsReducer,
  // orders vars
  order: orderReducer,
  orders: ordersReducer,
  all_orders_page: AllOrdersPaginationReducer,
  filtered_customers: FilteredCustomersReducer,
  // Dashboard vars
  dashboard_card: dashboard_card,
  dashboard_filters: dashboard_filters,
  dashboard_revenue: dashboard_revenue,
  dashboard_sales_pie: dashboard_sales_pie,
  //  Customer vars
  customers: fetchCustomersReducer,
  customer_dashboard: CustomerDashboardReducer,
  customer_analytics_pie: CustomerAnalyticsPieReducer,
  customer_analytics_graph: CustomerAnalyticsGraphReducer,
  customer_order_history: CustomerOrderHistoryReducer,
  order_analytics_graph: OrderAnalyticsGraphReducer,
  customer_avg_purchase: CustomerAvgPurchaseReducer,
  customer_page: CustomerPaginationReducer,
  mostOrderPage: MostOrderPaginationReducer,
  //  employees
  employees: fetchEmployeesReducer,
  empPage: EmployeePaginationReducer,
  employee: fetchSingleEmployeeReducer,
  employee_sales_analytics: EmployeeSalesAnalyticsReducer,
  employee_orders_taken: EmployeeOrdersTakenReducer,
  emp_orders_page: OrdersPaginationReducer,
  // CATALOG
  getBranchInCat: get_category_branchesReducer,
  getCatByBranch: get_product_branchReducer,
});
export default rootReducer;
