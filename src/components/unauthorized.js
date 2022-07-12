import { Col, Container, Row } from "react-bootstrap";

const Unauthorized = () => {
  return (
    <Container
      fluid
      className="openDash"
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <Row>
        <Col className="dash-head">Unauthorized</Col>
      </Row>
      <Row>
        <div>
        You are not authorized to view this module. Ask for view/edit
        permissions from respective owners.
        </div>
      </Row>
    </Container>
  );
};

export default Unauthorized;
