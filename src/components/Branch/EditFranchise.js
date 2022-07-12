import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateFranchise } from "./../../store/actionCreators/Franchise/AddNewFranchiseAction";

const EditFranchiseModal = ({ show, close, data }) => {
  const [franchise, setFranchise] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFranchise(data);
  }, [data]);

  const closeModal = () => {
    close();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(updateFranchise(franchise));
    close();
  };

  const onChangeFields = (field_name, value) => {
    const data = { ...franchise };
    data[field_name] = value;
    setFranchise(data);
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
        <Modal.Title>Edit Franchise Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmitForm}>
          <div className="mb-2">
            <label>Franchise Name</label>
            <input
              required
              type="text"
              className="form-control"
              value={franchise.franchise_name}
              onChange={(e) => onChangeFields("franchise_name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Franchise Location</label>
            <input
              required
              type="text"
              className="form-control"
              value={franchise.location}
              onChange={(e) => onChangeFields("location", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>No. of branches</label>
            <input
              required
              type="number"
              className="form-control"
              value={franchise.no_branches}
              onChange={(e) => onChangeFields("no_branches", e.target.value)}
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

export default EditFranchiseModal;
