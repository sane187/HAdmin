import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import Header from "./header";
import { FaUsers } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { RiBuilding2Fill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";


import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../css/sidebar.css";
import "../css/sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSideToggle } from "../store/actionCreators/SideBar";
const Sidebar = (props) => {
  const [widthSideMax, setWidthMax] = useState("240px");
  const [widthOfSideMin, setWidthMin] = useState("80px");
  const [widthSide, setWidthSide] = useState("270px");
  const size = useWindowSize();
  const open = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  useEffect(() => {
    if (window.innerWidth <= "768") {
      setWidthMax("0");
      setWidthMin("80px");
    }
    if (window.innerWidth > "768") {
      setWidthMax("240px");
      setWidthMin("80px");
      setWidthSide("270px");
    }
  }, []);

  const clickHandler = () => {
    if (size.width <= "768") {
      if (props.sideToggle === false) {
        props.setSideToggle(true);
      } else {
        props.setSideToggle(false);
      }
    }
    if (size.width > "768") {
      if (props.sideToggle === true) {
        props.setSideToggle(false);
        setWidthSide("270px");
      } else {
        props.setSideToggle(true);
        setWidthSide("100px");
      }
    }
  };

  function openChange(name) {
    for (var i = 1; i < 10; i++) {
      if (name === `open${i}`) {
        dispatch(setSideToggle(`open${i}`, true));
      } else {
        if (open[`open${i}`] === true) {
          dispatch(setSideToggle(`open${i}`, false));
        }
      }
    }
  }

  return (
    <React.Fragment>
      <Header handle={props.handle} widthSide={widthSide} />
      <div
        id="sidebar-main"
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          zIndex: "1001",
          position: "fixed",
          top: "0",
        }}
        className={props.sideToggle === true ? "widthOfSide" : "widthUntoggled"}
      >
        <ProSidebar
          id="my-sidebar"
          width={widthSideMax}
          collapsedWidth={widthOfSideMin}
          collapsed={props.sideToggle}
        >
          <SidebarHeader>
            <div
              id="mainLeftTrigger"
              className="w-100 "
              style={{ height: "77px" }}
              onClick={clickHandler}
            >
              <div className="h-100 d-flex justify-content-center align-items-center">
                <img src={logo} width="26px" alt="logo" className=""></img>
                <div className="w-75 heebee-logo ">HeeBee</div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="round">
              <SubMenu
                open={open.open1}
                onOpenChange={() => openChange("open1")}
                title="Dashboard"
                icon={<RiDashboardFill />}
              >
                <MenuItem>
                  My Dashboard
                  <NavLink to="/" />
                </MenuItem>
              </SubMenu>

              <SubMenu
                open={open.open2}
                onOpenChange={() => openChange("open2")}
                title="Customer"
                icon={<FaUsers />}
              >
                <MenuItem>
                  Customer Dashboard
                  <NavLink exact="true" to="/customer" />
                </MenuItem>
                <MenuItem>
                  All Customers
                  <NavLink exact="true" to="/customer/allCustomer" />
                </MenuItem>
                <MenuItem>
                  Add New Customers
                  <NavLink exact="true" to="/customer/addCustomer" />
                </MenuItem>
              </SubMenu>
              <SubMenu
                open={open.open3}
                onOpenChange={() => openChange("open3")}
                title="Employees"
                icon={<ImUserTie />}
              >
                <MenuItem>
                  All Employees
                  <NavLink exact="true" to="/employee" />
                </MenuItem>
                {/* <MenuItem>Add New<NavLink exact="true" to="/employee/addNew" /></MenuItem> */}
              </SubMenu>
              <SubMenu
                open={open.open4}
                onOpenChange={() => openChange("open4")}
                title="Catalog"
                icon={<FaClipboardList />}
              >
                <MenuItem>
                  All Category
                  <NavLink to="/catalog/" />
                </MenuItem>
                <MenuItem>
                  All Products
                  <NavLink to="/catalog/AllProducts" />
                </MenuItem>
                <MenuItem>
                  Add Category
                  <NavLink to="/catalog/AddCategory" />
                </MenuItem>
                <MenuItem>
                  Add Food Item
                  <NavLink to="/catalog/AddProduct" />
                </MenuItem>
                <MenuItem>
                  Add Addons
                  <NavLink to="/catalog/AddAddons" />
                </MenuItem>
              </SubMenu>
              <SubMenu
                open={open.open5}
                onOpenChange={() => openChange("open5")}
                title="Franchise"
                icon={<RiBuilding2Fill />}
              >
                <MenuItem>
                  All Franchise
                  <NavLink to="/branch/AllBranch" />
                </MenuItem>
                <MenuItem>
                  Add Branch
                  <NavLink to="/branch/AddBranch" />
                </MenuItem>
                <MenuItem>
                  Add Franchise
                  <NavLink to="/branch/AddFranchise" />
                </MenuItem>
              </SubMenu>
              <SubMenu
                open={open.open6}
                onOpenChange={() => openChange("open6")}
                title="Orders"
                icon={<IoFastFood />}
              >
                <MenuItem>
                  All Orders
                  <NavLink to="/orders" />
                </MenuItem>
              </SubMenu>
              <SubMenu
                open={open.open7}
                onOpenChange={() => openChange("open7")}
                title="Groups"
                icon={<HiUserGroup />}
              >
                <MenuItem>
                  All Groups
                  <NavLink to="/groups" />
                </MenuItem>
              </SubMenu>
              <SubMenu
                open={open.open8}
                onOpenChange={() => openChange("open8")}
                title="Coupons"
                icon={<IoFastFood />}
              >
                <MenuItem>
                  All Coupons
                  <NavLink to="/coupons" />
                </MenuItem>
                <MenuItem>
                  Add New Coupon
                  <NavLink to="/coupons/addCoupon" />
                </MenuItem>
              </SubMenu>
              <SubMenu
                open={open.open9}
                onOpenChange={() => openChange("open9")}
                title="User"
                icon={<RiAdminFill />}
              >
                <MenuItem>
                  Add Employee
                  <NavLink to="/employee/addNew" />
                </MenuItem>
                <MenuItem>
                  All Admins
                  <NavLink to="/user/alladmins" />
                </MenuItem>
                <MenuItem>
                  Add Admin
                  <NavLink to="/user" />
                </MenuItem>
                <MenuItem>
                  Role
                  <NavLink to="/user/role" />
                </MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </React.Fragment>
  );
};
export default Sidebar;
