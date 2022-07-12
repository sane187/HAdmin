import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewFranch } from "../../store/actionCreators/Franchise/AddNewFranchiseAction";
import Unauthorized from "../unauthorized";

const AddNewFranchise = (props) => {
  const [franchise, setFranchise] = useState({
    franchiseName: null,
    location: null,
    BranchNum: 1,
  });
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewFranch(
        franchise.franchiseName,
        franchise.location,
        franchise.BranchNum
      )
    );
  };
  if (props.editPermission)
    return (
      <Container
        fluid
        className={props.sideToggle === true ? "closeDash" : "openDash"}
        style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
      >
        <div className="row d-flex justify-content-center">
          <div className="form-container">
            <div className="form-head">Add New Franchise</div>
            <div className="form-body">
              <Form onSubmit={onSubmit}>
                <Row>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <Form.Label>Franchise Name </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Full name"
                        defaultValue="Franchise"
                        value={franchise.franchiseName}
                        onChange={(e) => {
                          setFranchise({
                            ...franchise,
                            franchiseName: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Location</label>
                      <Form.Control
                        required
                        type=" "
                        placeholder="Location"
                        defaultValue="Location"
                        value={franchise.location}
                        onChange={(e) => {
                          setFranchise({
                            ...franchise,
                            location: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="mb-3 p-2">
                      <label className="form-label">Number of Branches</label>
                      <Form.Control
                        required
                        type=" "
                        placeholder="Location"
                        defaultValue="Location"
                        value={franchise.BranchNum}
                        onChange={(e) => {
                          setFranchise({
                            ...franchise,
                            BranchNum: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="p-2">
                  <button type="submit" className="btn btn-primary  ">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    );
  return <Unauthorized />;
};

export default AddNewFranchise;
