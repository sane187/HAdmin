import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateBranch } from "./../../store/actionCreators/Branch/BranchAction";
import { useNavigate } from "react-router-dom";
const EditBranchModal = ({ show, close, data }) => {
  const [branch, setBranch] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setBranch(data);
  }, [data]);

  const closeModal = () => {
    close();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(updateBranch(branch));
    close();
  };

  const onChangeFields = (field_name, value) => {
    const data = { ...branch };
    data[field_name] = value;
    setBranch(data);
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
        <Modal.Title>Edit Branch Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmitForm}>
          <div className="mb-2">
            <label>Branch Name</label>
            <input
              required
              type="text"
              className="form-control"
              value={branch.branch_name}
              onChange={(e) => onChangeFields("branch_name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>City</label>
            <input
              required
              type="text"
              className="form-control"
              value={branch.city}
              onChange={(e) => onChangeFields("city", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Region</label>
            <input
              required
              type="text"
              className="form-control"
              value={branch.region}
              onChange={(e) => onChangeFields("region", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Address</label>
            <input
              required
              type="text"
              className="form-control"
              value={branch.address}
              onChange={(e) => onChangeFields("address", e.target.value)}
            />
          </div>
          <div>
            <Button className="btn btn-warning" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBranchModal;
