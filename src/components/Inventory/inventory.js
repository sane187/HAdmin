import  React, {useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; 
import DashBoard from './dashboard.js';
import InventoryItems from './inventoryItems.js';
import RequestForm from './RequestForm';
import AllRequest from './AllRequest';


const Inventory = (props) => {
  
const login = useSelector((state) => state.login);
const [viewPermission, setViewPermission] = useState(false);
const [editPermission, setEditPermission] = useState(false);
const editPermissions = () => {
  if (login && login.login.status === "success") {
    const { admin_permissions } = login.login.data;
    admin_permissions.forEach((item) => {
      if (item.module === "Franchise") {
        if (item.read === true) setViewPermission(true);
        if (item.write === true) setEditPermission(true);
      }
    });
  }
};
useEffect(() => {
  editPermissions();
}, []);
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<DashBoard sideToggle={props.sideToggle} viewPermission={viewPermission}
              editPermission={editPermission} />
          }
        />
          <Route path="/items" element={<InventoryItems sideToggle={props.sideToggle} viewPermission={viewPermission} editPermission={editPermission} />
          }
        />
        <Route path="/request" element={<RequestForm sideToggle={props.sideToggle} viewPermission={viewPermission} editPermission={editPermission} />
          }
        />
        <Route path="/allRequest" element={<AllRequest sideToggle={props.sideToggle} viewPermission={viewPermission} editPermission={editPermission} />
          }
        />
      
      </Routes>
    </React.Fragment>
  )
}

export default Inventory;