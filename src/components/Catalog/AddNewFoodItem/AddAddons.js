import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Unauthorized from "../../unauthorized";

const AddAddons = (props) => {
  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <div className="row d-flex justify-content-center">
        <div className="form-container">
          <div className="form-head">Add Addons</div>
          <div className="form-body">
            <form>
              <Row>
                <Col>
                  {" "}
                  <div className="mb-2 p-2">
                    <label className="form-label">Select Addons</label>
                    {props.displayCategory()}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  {" "}
                  <div className="mb-2 p-2">
                    <button
                      className="btn btn-primary me-2  "
                      onClick={props.handleBackSecondForm}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary me-2  "
                      onClick={props.handleNextSecondForm}
                    >
                      Next
                    </button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddAddons;
