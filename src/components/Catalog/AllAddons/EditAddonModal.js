import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row ,Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateAddonProduct } from "../../../store/actionCreators/Catalog/Catalog";


const EditAddonModal = ({show,close,data}) => {
  const dispatch =useDispatch()
  const [formData,setFormData]=useState(data);
  useEffect(()=>{
    setFormData(data)
      },[data])

  const onChangeFields = (feild_name, value) => {
    const feild = {...formData};
    feild[feild_name] = value;
    setFormData(feild);     

  };

  const handleAddonChange=(feild_name,e)=>{
const arr=formData.add_on_options;
arr.forEach(val=>{
  if(val.add_on_option_id===e.target.id){
    val[feild_name]=e.target.value;
  }
})
setFormData({...formData,add_on_options:arr})


  }

  const onSubmitForm =(e) =>{
    e.preventDefault();
    dispatch(updateAddonProduct(formData))
  }
  return (

   <React.Fragment>
 <Modal
      show={show}
      onHide={close}
      size="lg"  
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Category Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmitForm}>
          <div className="mb-2">
            <label>Addon Name</label>
            <input
              required
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) => onChangeFields("title", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Add on Type</label>
              {/* {formData.add_on_type!=="radio"?  onClick={(e)=>setType(e.target.value)}*/ }
              <div className="mb-1 d-flex ">
              {formData.add_on_type==="radio"?
              <select className="form-select" onChange={(e) => onChangeFields("add_on_type", e.target.value)}>
  <option value="radio">Radio</option>
  <option value="checkbox">Checkbox</option>
</select>:<select className="form-select" onChange={(e) => onChangeFields("add_on_type", e.target.value)}>
<option value="checkbox">Checkbox</option>
  <option value="radio">Radio</option>
</select>}
         </div>
          </div>
          <h5 style={{fontWeight:"400"}}>Add On Options</h5>
          {formData.add_on_options.map(item=>{
          
          
          return <Row key={item.add_on_option_id} className="gx-1 mb-0">
            <Col lg={3} xl={3}>
          <div className="p-2">
                            <label className="form-label">Title</label>
                            <input
                              name="title"
                              type="text"
                              className="form-control"
                              value={item.title}  
                              required
                              id={item.add_on_option_id}
                              onChange={(e)=>handleAddonChange("title",e)}
                            />
                          </div>
                          </Col>
                          <Col lg={3} xl={3}>
          <div className="p-2">
                            <label className="form-label">Price</label>
                            <input
                              name="title"
                              type="text"
                              className="form-control"
                              value={item.price}
                              required
                              id={item.add_on_option_id}
                              onChange={(e)=>handleAddonChange("price",e)}
                            />
                          </div>
                          </Col>
                          <Col lg={3} xl={3}>
          <div className="p-2">
                            <label className="form-label">SKU</label>
                            <input
                              name="title"
                              type="text"
                              className="form-control"
                              value={item.sku}
                              required
                              id={item.add_on_option_id}
                              onChange={(e)=>handleAddonChange("sku",e)}
                            />
                          </div>
                          </Col>
                          <Col lg={3} xl={3}>
          <div className="p-2">
                            <label className="form-label">Order</label>
                            <input
                              name="title"
                              type="text"
                              className="form-control"
                              value={item.order}
                              required
                              id={item.add_on_option_id}
                              onChange={(e)=>handleAddonChange("order",e)}
                            />
                          </div>
                          </Col>
          </Row> })}
          <div>
            <Button className="btn btn-warning" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
    
   </React.Fragment>
  )
}

export default EditAddonModal