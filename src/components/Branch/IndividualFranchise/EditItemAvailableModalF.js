import React,{useEffect, useState} from 'react';
import { Card, Col, Modal, Row,Button, Dropdown } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { ItemsAvailable } from '../../../store/actionCreators/Catalog/Catalog';


const EditItemAvailableModalF = ({data,close,show}) => {
    const dispatch=useDispatch();
    const[val,setVal]=useState({ "product_id":data.product_id,"items_available":data.items_available,"price":data.price});
    const onChangeFields = (field_name, value) => {
        const feild = {...val};
        
     feild[field_name] = value;
    
       
        setVal(feild);   
      };
    const closeModal = () => {
        close();
      };

      const handleSubmit =(e)=>
      {  e.preventDefault();
        console.log(val)
        dispatch(
            ItemsAvailable(val)
          );
            closeModal();
    }
  return (
    <>
 <Modal
    show={show}
    onHide={closeModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title >Add Product to category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        
       <form onSubmit={handleSubmit}>
        <Row>
         
          <div className="mb-2">
            <label>Items Available</label>
            <input
              required
              type="number"
              className="form-control" 
              value={val.items_available}
              onChange={(e)=>onChangeFields("items_available",e.target.value)} 
            />
          </div>
          <div className="mb-2">
            <label>Price</label>
            <input
              required
              type="number"
              className="form-control"
              value={val.price}
              onChange={(e)=>onChangeFields("price",e.target.value)} 
            />
          </div>
        </Row>
        <div>
          <Button className="btn btn-warning" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal.Body>
  </Modal> 
    </>
  )
}

export default EditItemAvailableModalF