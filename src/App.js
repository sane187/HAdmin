import Sidebar from "./components/sidebar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard/dashboard";
import Customer from "./components/Customer/customer";
import Employee from "./components/Employees/employee";
import Error404 from "./components/error404";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer";
import Branch from "./components/Branch/Branch";
import Catalog from "./components/Catalog/Catalog";
import { ToastContainer } from "react-toastify";
import User from "./components/User/user";
import Login from "./components/authentication/Login";
import { useDispatch } from "react-redux";
import {
  getAddons,
  getAllCategories,
  getAllProducts,
} from "./store/actionCreators/Catalog/Catalog";
import { getAllFranchise } from "./store/actionCreators/Franchise/AddNewFranchiseAction";
import { getBranches } from "./store/actionCreators/Branch/BranchAction";
import { getEmployeeRoles } from "./store/actionCreators/Employees/EmployeeAction";
import Protected from "./Protected";
import { getAdminRoles } from "./store/actionCreators/User/UserAction";
import Orders from "./components/Orders/orders";
function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const handle = useFullScreenHandle();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
    dispatch(getAddons());
    dispatch(getBranches());
    dispatch(getEmployeeRoles());
    dispatch(getAllFranchise());
    dispatch(getAdminRoles());
  }, []);
  return (
    <Router>
      <FullScreen handle={handle}>
        <React.Fragment>
          <Sidebar
            handle={handle}
            setSideToggle={setSideToggle}
            sideToggle={sideToggle}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            <Route
              path="/login"
              element={<Login sideToggle={sideToggle} />}
            ></Route>
            <Route
              path="/customer/*"
              element={
                <Protected>
                  <Customer sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            <Route
              path="/employee/*"
              element={
                <Protected>
                  <Employee sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            <Route
              path="/branch/*"
              element={
                <Protected>
                  <Branch sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            <Route
              path="/catalog/*"
              element={
                <Protected>
                  <Catalog sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            <Route
              path="/user/*"
              element={
                <Protected>
                  <User sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            {/* <Route
              path="/groups/*"
              element={
                <Protected>
                  <Orders sideToggle={sideToggle} />
                </Protected>
              }
            ></Route> */}
            <Route
              path="/orders/*"
              element={
                <Protected>
                  <Orders sideToggle={sideToggle} />
                </Protected>
              }
            ></Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </React.Fragment>
      </FullScreen>
      <ToastContainer />
    </Router>
  );
}

export default App;
