import { Col, Row } from "react-bootstrap";
import gif from "../assets/images/404.gif"
import "../css/error404.css"
const Error404 = () => {
  return <div
    style={{ zIndex: "2000", display: "inline-block", width: "99vw", height: "100vh", backgroundColor: "white", position: 'absolute', top: '0p', left: "0" }}>

    <Row>
      <Col xs={12} sm={6} className="d-flex flex-column justify-content-center align-items-center"> <img src={gif} width="80%"></img></Col>
      <Col xs={12} sm={6} className="d-flex flex-column justify-content-center align-items-center fontPress text-center" ><h1 style={{fontSize:"50px"}}>404</h1><h2>This page is taking a nap</h2></Col>
    </Row>
    </div>
}
export default Error404;