import React, { useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
const SmallCard = ({item,index}) => {
          // MOdal popup vars
          const [show, setShow] = useState(false);
          const handleClose = () => setShow(false);
          const handleShow = () => setShow(true);
          // MOdal popup vars end
      return (
          <Col lg={2} md={6} sm={6} xs={12} className="mb-4">
              <Card onClick={handleShow} className="smallCard" style={{ width: '100%' }}>
                  <Card.Body>
                      <Card.Img width="150px" height="150px" variant="top" src={item.product_list.card_img} />
                      <Card.Title>{item.product_list.product_name}</Card.Title>
  
                      {item.product_list.food_type === "Veg" ? <div className='veg'></div> : <div className='nonVeg'></div>}
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
                                  <td>{item.product_list.price}</td>
                                 
                              </tr>
                              <tr>
                              <th scope="row">Prepare time</th>
                                  <td>{item.product_list.prepare_time}</td>
                              </tr>
  
                              <tr>
                                  <th scope="row">Product Type</th>
                                  <td>{item.product_list.product_type}</td>
                              </tr>
  
  
                          </tbody>
                      </table>
                  </Modal.Body>
  
              </Modal>
          </Col>
      )
};

export default SmallCard;