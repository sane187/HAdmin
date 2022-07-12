import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
const AddNewCategory = (props) => {
  return (
    <Container fluid className={props.sideToggle === true ? "closeDash" : "openDash"} style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }} >
      <div className='row d-flex justify-content-center'>
        <div className='form-container'>
          <div className='form-head'>Add New Category</div>
          <div className='form-body'>
            <form >
              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Category Name</label>
                  <input type="text" className="form-control" aria-describedby="CategoryName" value={props.catName.name} onChange={props.handleChange("name")} required/>
                </div></Col>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Description</label>
                  <input type="textarea" className="form-control" aria-describedby="Description" value={props.catName.description} onChange={props.handleChange("description")} required/>
                </div></Col>
              
              </Row>

              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label d-block">Image Upload</label>
                  <input className="d-block" type="file" id="NewCategoryImage" name="img" accept="image/*" onChange={props.imageUpload} required/>
                  {props.uploadedImage &&  <img className="mt-2" src={props.preview} style={{width:"200px",maxHeight:"200px"}} /> }
                </div></Col>

                <Col><div className="mb-3 p-2" >
                <label className="form-label d-block">Branches</label>
                  {props.displayBranch()}
                  </div>

                </Col>
             
              </Row>
              <Row>
                <Col><div className="mb-3 p-2"> <button className='btn btn-primary me-2 ' onClick={props.onClickCat} >Next</button></div></Col>
              </Row>
             
  

            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddNewCategory;