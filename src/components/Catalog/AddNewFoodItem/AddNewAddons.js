import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const AddNewAddons = (props) => {
    return (
        <Container fluid style={{ backgroundColor: "#F1F5F7" }} >
      <div className='row d-flex justify-content-center'>
        <div className='form-container'>
          <div className='form-head'>Add New Addons</div>
          <div className='form-body'>
          
              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.addon.title} onChange={ props.handleChange("title")} required/>
                </div></Col>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Price</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.addon.price}   onChange={ props.handleChange("price")} required />
                </div></Col>


              </Row>
              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">SKU</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.addon.sku}  onChange={ props.handleChange("sku")} required />
                </div></Col>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Order</label>
                  <input type="textarea" className="form-control" aria-describedby="emailHelp" value={props.addon.order} onChange={ props.handleChange("order")} required />
                </div></Col>
              </Row>
              {/* <div className="p-2"><button className='btn btn-primary ' onClick={props.nextStep} >Submit</button></div> */}
        
          </div>
        </div>
      </div>
    </Container>
    );
};

export default AddNewAddons;