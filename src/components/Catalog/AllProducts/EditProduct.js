import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import '../../../css/catalog/editCategory.css';
import { BiImageAdd } from 'react-icons/bi';
import { updateProduct } from "../../../store/actionCreators/Catalog/Catalog";

const EditProduct = ({ show, close, data}) => {
  const dispatch = useDispatch();
  
 
const [product,setProduct]=useState({});
    const [image, setImg] = useState("");
    const [upload,setUpload]=useState(null)
    
    useEffect(() => {
      setProduct(data);
    }, [data]);

  const closeModal = () => {
      close();
    }; 

    const onChangeFields = (field_name, value) => {
        const feild = {...product};
        feild[field_name] = value;
        setProduct(feild);      
      };
      
    const onImageChange = (e) => {
      const file = e.target.files[0];
        const aj={...product,image:file};
        setUpload(file)
        setProduct(aj);
      setImg(URL.createObjectURL(file));
          
      };
      
    
      const onSubmitForm =(e) =>{
        e.preventDefault();
dispatch(updateProduct(product))
        
       close();
      }


  return (

    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Category Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmitForm}>
          <div style={{overflowY:"auto",maxHeight:"60vh"}}>
          <div className="mb-2">
            <label>Category Name</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.product_name}
              onChange={(e) => onChangeFields("product_name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.description}
              onChange={(e) => onChangeFields("description", e.target.value)}
             
            />
          </div>
          <div className="mb-2">
            <label>SKU</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.sku}
              onChange={(e) => onChangeFields("sku", e.target.value)}
             
            />
          </div>
          <div className="mb-2">
            <label>Price</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.price}
              onChange={(e) => onChangeFields("price", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Prepare Time</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.prepare_time}
              onChange={(e) => onChangeFields("prepare_time", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Product Type</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.product_type}
              onChange={(e) => onChangeFields("product_type", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Food Type</label>
            <input
              required
              type="text"
              className="form-control"
              value={product.food_type}
              onChange={(e) => onChangeFields("food_type", e.target.value)}
            />
          </div>
          <div className="mb-3">
          <p className="mb-1">Image</p>
              <figure className="edit-cat-cont" >
              <label htmlFor="file-upload" className="custom-file-upload">
<BiImageAdd /> Add
</label>
<input id="file-upload" type="file" onChange={onImageChange} accept="image/*"/>
            {image===""?<img src={product.card_img} style={{width:"100%",height:"100%"}}/>:<img src={image} style={{width:"100%",height:"100%"}}/>}
            </figure>
          </div>
          </div>
          <div>
            <Button className="btn btn-warning" type="submit">
              Submit
            </Button>
          </div>
          
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default EditProduct