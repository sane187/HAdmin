import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addCustomersToGroup,
  addNewGroup,
  getGroupList,
} from "./../../store/actionCreators/Groups/GroupsAction";
import { toast } from "react-toastify";

const AddCustomerToModal = ({ show, close, queryString }) => {
  const [createNewGroup, setCreateNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const groups = useSelector((state) => state.groups);
  const filtered_customers = useSelector((state) => state.filtered_customers);
  const dispatch = useDispatch();
  const [currGroup, setCurrGroup] = useState("");

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  const displayGroups = () => {
    if (groups.data) {
      return groups.data.data.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.customer_group_name}
            eventKey={`${item.customer_group_name}`}
          >
            {" "}
            {item.customer_group_name}
          </Dropdown.Item>
        );
      });
    }
  };

  const addNewGroupButton = () => {
    if (newGroupName === "") {
      toast.error(`Please enter a name for the group`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      dispatch(addNewGroup(newGroupName));
    }
  };

  const closeModal = () => {
    setCreateNewGroup(false);
    setNewGroupName("");
    setCurrGroup("");
    close();
  };

  const handleAddCustomers = () => {
    if (currGroup === "") {
      toast.error(`Please choose a group or create one`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      dispatch(addCustomersToGroup(currGroup, queryString));
    }
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Customers to a Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Check
          type={"checkbox"}
          id={`default-check`}
          label={"Create a new group"}
          checked={createNewGroup}
          onChange={() => setCreateNewGroup(!createNewGroup)}
        />
        {createNewGroup ? (
          <div className="mt-4">
            <div className="mb-2">
              <Form.Label className="my-auto">Enter Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter group name"
                style={{ width: "70%" }}
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <Button onClick={addNewGroupButton} className="btn btn-warning">
              Create New Group
            </Button>
          </div>
        ) : (
          <DropdownButton
            variant="light"
            title={currGroup ? currGroup : "Group"}
            id="dropdown-menu-align-right"
            className="mt-4"
            onSelect={(e) => setCurrGroup(e)}
          >
            {displayGroups()}
          </DropdownButton>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddCustomers}>
          Add{" "}
          {filtered_customers.data
            ? filtered_customers.data.total_customer_count
            : 0}{" "}
          customers to the Selected Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCustomerToModal;
