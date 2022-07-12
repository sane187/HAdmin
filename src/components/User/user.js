import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddAdminmain from "./AddAdmin/AddAdminmain";
import faker from "@faker-js/faker";
import Role from "./Role/Role";
import IndividualEmployeeRole from "./Role/IndividualEmployeeRole";

import AdminDashboard from "./AllAdmins/adminDashboard";
import UpdateAdminInfo from "./UpdateAdminInfo/UpdateAdminInfo";
import ViewAdminInfo from "./UpdateAdminInfo/ViewAdminInfo";
class User extends React.Component {
  constructor(props) {
    super(props);
    const fakeData = () => {
      let array = [];
      for (let index = 0; index < 10; index++) {
        const element = {
          EmpId: `${faker.datatype.uuid().slice(0, 8)}`,
          name: `${faker.name.findName()}`,
          empRole: `${faker.commerce.department()}`,
          address: `${faker.address.streetAddress()} ${faker.address.cityName()}`,
          email: `${faker.internet.email()}`,
          telephone: `${faker.phone.phoneNumber()}`,
          DOB: `${String(faker.date.past(40)).slice(4, -39)}`,
          status: `status`,
          token: `token`,
          Branchname: `${faker.address.streetAddress()} ${faker.address.cityName()}`,
          gender: `${faker.name.gender(true)}`,
        };
        array.push(element);
      }
      return array;
    };
    const emp = fakeData();
    let access = [
      { Module_Name: "Dashboard", Read: true, Write: false },
      { Module_Name: "Customer", Read: true, Write: false },
      { Module_Name: "Employees", Read: false, Write: true },
      { Module_Name: "Catalog", Read: true, Write: false },
      { Module_Name: "Franchise", Read: true, Write: true },
      { Module_Name: "User", Read: false, Write: false },
    ];
    this.state = {
      employeeData: fakeData(),
      employee: emp[0],
      access: access,
    };
  }
  setEmployee = (emp) => {
    this.setState({ employee: emp });
  };
  //  iNDIVIDULA DATA

  render() {
    return (
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={<AddAdminmain sideToggle={this.props.sideToggle} />}
          />
          <Route
            path="/alladmins"
            element={<AdminDashboard sideToggle={this.props.sideToggle} />}
          />
          <Route
            path="/alladmins/:admin_id"
            element={<UpdateAdminInfo sideToggle={this.props.sideToggle} />}
          />
          <Route
            path="/alladmins/viewadmin/:admin_id"
            element={<ViewAdminInfo sideToggle={this.props.sideToggle} />}
          />
          <Route
            path="/role"
            element={
              <Role
                sideToggle={this.props.sideToggle}
                employee={this.state.employeeData}
                currEmployee={this.state.employee}
                setEmployee={this.setEmployee}
              />
            }
          />
          <Route
            path="/edit"
            element={
              <IndividualEmployeeRole
                sideToggle={this.props.sideToggle}
                employee={this.state.employeeData}
                currEmployee={this.state.employee}
                access={this.state.access}
              />
            }
          />
        </Routes>
      </React.Fragment>
    );
  }
}

export default User;
