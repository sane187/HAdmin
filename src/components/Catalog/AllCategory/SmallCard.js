import React, { useState } from 'react';
import { Card, Col, Modal, Row,Button, Dropdown } from 'react-bootstrap';
import {deleteProductCat} from "../../../store/actionCreators/Catalog/Catalog";
import { useDispatch } from 'react-redux';
import EditItemAvailableModal from './EditItemAvailableModal';

const SmallCard = ({item,index}) => {
          // MOdal popup vars
          const [show, setShow] = useState(false);
          const [hide, setHide] = useState(false);
          const handleClose = () => setShow(false);
          const handleShow = () => {setShow(true);}
        

          const dispatch=useDispatch();
          // MOdal popup vars end
       
      return (
          <Col lg={2} md={6} sm={6} xs={12} className="mb-4">
              <Card onClick={handleShow} className="smallCard" style={{ width: '100%' }}>
                  <Card.Body>
                      <Card.Img width="150px" height="150px" variant="top" src={item.product_list.card_img} />
                      <div className="d-flex mt-2 ">
            <Card.Title onClick={handleShow}>
              {item.product_list.product_name}
            </Card.Title>
            <div className="ml-auto" style={{ marginLeft: "auto" }}>
              <Button
                className="btn btn-danger btn-sm py-0"
                onClick={() =>dispatch(deleteProductCat(item.product_id))}
              >
                X
              </Button>
            </div>
          </div>
                      {item.product_list.food_type === "Veg" ? <div className='veg'></div> : <div className='nonVeg'></div>}
                      <Button className="edit-card-btn" onClick={(e)=>{setHide(true);e.stopPropagation();}}>Edit</Button>
                  </Card.Body>
              </Card>
              <Modal className='remove-border' show={show} onHide={handleClose} centered>
                  <Modal.Header className=" bg-light text-dark remove-border" closeButton>
                      <Modal.Title >{item.product_list.product_name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className=" bg-light text-light remove-border">
                      <table className="table table-borderless indi-table mb-0">
                          <tbody>
                              <tr>
                                  <th scope="row">Description</th>
                                  <td>{item.product_list.description}</td>
                              </tr>
                              <tr>
                                  <th scope="row">SKU</th>
                                  <td>{item.product_list.sku}</td>
                              </tr>
  
  
                              <tr>
                                  <th scope="row">Price</th>
                                  <td>{item.price}</td>
                                 
                              </tr>
                              <tr>
                              <th scope="row">Prepare time</th>
                                  <td>{item.product_list.prepare_time}</td>
                              </tr>
                              <tr>
                              <th scope="row">Available items</th>
                                  <td>{item.items_available}</td>
                              </tr>
                              <tr>
                                  <th scope="row">Product Type</th>
                                  <td>{item.product_list.product_type}</td>
                               
                              </tr>
  
  
                          </tbody>
                      </table>
                  </Modal.Body>
  
              </Modal> 
              <EditItemAvailableModal show={hide} close={setHide} data={item} centered onClick={(e)=>console.log(e.target.value)}/>
          </Col>
          
      )
};

export default SmallCard;