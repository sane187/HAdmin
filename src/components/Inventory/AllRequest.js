import React,{useState,useEffect,useRef} from 'react';
import '../../css/inventory/allRequest.css';
import ReactToPrint from 'react-to-print';
import { useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
  Card,Button,Modal
} from "react-bootstrap";
import { AiFillPrinter } from 'react-icons/ai';

const AllRequest = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [item,setItem]=useState([]);

  
 
const [data,setData]=useState([{requestId:194426,requestedBy:"Mr Arpit",subTotal:18000,status:"pending"},{requestId:194427,requestedBy:"Mr Arpit",subTotal:18000,status:"completed"},{requestId:194428,requestedBy:"Mr Arpit",subTotal:18000,status:"pending"},{requestId:194429,requestedBy:"Mr Arpit",subTotal:18000,status:"processing"},{requestId:194430,requestedBy:"Mr Arpit",subTotal:18000,status:"pending"},{requestId:194431,requestedBy:"Mr Arpit",subTotal:18000,status:"completed"},{requestId:194432,requestedBy:"Mr Arpit",subTotal:18000,status:"processing"},{requestId:194433,requestedBy:"Mr Arpit",subTotal:18000,status:"processing"}]);


function Example(props) {
  return (
    <>
            <Modal {...props} fullscreen={true}>

        <Modal.Header closeButton>
          <Modal.Title>Bill Summary</Modal.Title>
        </Modal.Header>
       {item?
        <Modal.Body style={{background:"#F1F5F7"}}> 
          <h2 className="text-center mt-5">Order Id: {item.requestId}</h2>
    
          <div className='d-flex flex-column align-items-center modal-div mt-3'>
            <div className='p-4' style={{background:"#fff",borderRadius:"10px",boxShadow:"0 0 10px #000"}}>
    <p className='mb-1'>Requested By : {item.requestedBy}</p>
    <p className='mb-1'>Bill Amount: ₹{item.subTotal}</p>
    <p className="text-uppercase">Status: {item.status}</p>
    {/* <Button variant="info">Print<AiFillPrinter className="ms-2"/></Button> */}
    
       
  </div>

  </div>
        </Modal.Body>:"" }
        <ReactToPrint className="pt-5 " trigger={()=>{
        return <Button variant='info'>Print<AiFillPrinter className="ms-2"/></Button>}}
      content={()=>this.componentRef} documentTitle='Bill Summary' pageStyle="print" />
      </Modal>
    </>
  );
}


const pendingRequest = data.filter(item=>item.status==="pending");
const completedRequest = data.filter(item=>item.status==="completed");
const processingRequest = data.filter(item=>item.status==="processing");


const cards =(item)=>{
    return (
     
    <Col lg={4} md={4} key={item.requestId} className="g-2">
    <Card style={{borderRadius:"6px"}}>
    <Card.Body>
    <Card.Title className='fw-bold'>Order Id: {item.requestId}</Card.Title>
    <hr className="my-1"/>
    <div className='d-flex flex-column'>
      <p className='text-truncate mb-1'>Requested By : {item.requestedBy}</p>
      <p className='mb-1'>Bill Amount: ₹{item.subTotal}</p>
      <p className="text-uppercase">Status: {item.status}</p>
    </div>
    <Button variant="info" onClick={()=>{setItem(item);handleShow()}}>View Details</Button>
    </Card.Body>
    </Card>
    </Col>)
}
 
  return (
    <React.Fragment>
       <Example show={show}
        onHide={() => setShow(false)} />
       
    <Container
    fluid
    className={props.sideToggle === true ? "closeDash" : "openDash"}
    style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}>
      
  <Row>
  <h1>All Requests</h1>
  {data.map(item=>(
    cards(item)
    ))}
  </Row>
  <Row className="mt-3">
  <h1>Pending Requests</h1>
  {pendingRequest.map(item=>(
      cards(item)
    ))}
  </Row>
  <Row className="mt-3">
  <h1>Completed Requests</h1>
  {completedRequest.map(item=>(
     cards(item)
    ))}
  </Row>
  <Row className="mt-3">
  <h1>Processing Requests</h1>
  {processingRequest.map(item=>(
      cards(item)
   ))}
  </Row>


    </Container>
    </React.Fragment>
  )
}

export default AllRequest
