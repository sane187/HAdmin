import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import '../../../css/catalog/editCategory.css';
import { BiImageAdd } from 'react-icons/bi';
import { updateCategory } from "../../../store/actionCreators/Catalog/Catalog";

const EditCategory = ({ show, close, data}) => {
  const dispatch = useDispatch();

const [category,setCategory]=useState({});
    const [image, setImg] = useState("");
    const [upload,setUpload]=useState(null)
    
    useEffect(() => {
      setCategory(data);
    }, [data]);

  const closeModal = () => {
      close();
    }; 

    const onChangeFields = (field_name, value) => {
        const feild = {...category};
        feild[field_name] = value;
        setCategory(feild);       
      };
      
    const onImageChange = (e) => {
      const file = e.target.files[0];
        const aj={...category,image:file};
        setUpload(file)
        setCategory(aj);
      setImg(URL.createObjectURL(file));
          
      };
      
    
      const onSubmitForm =(e) =>{
        e.preventDefault();

       setCategory({...category,image:upload})
        dispatch(updateCategory(category));
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
          <div className="mb-2">
            <label>Category Name</label>
            <input
              required
              type="text"
              className="form-control"
              value={category.category_name}
              onChange={(e) => onChangeFields("category_name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Description</label>
            <input
              required
              type="text"
              className="form-control"
              value={category.description}
              onChange={(e) => onChangeFields("description", e.target.value)}
             
            />
          </div>
          <div className="mb-3">
          <p className="mb-1">Category Image</p>
              <figure className="edit-cat-cont" >
              <label htmlFor="file-upload" className="custom-file-upload">
<BiImageAdd /> Add
</label>
<input id="file-upload" type="file" onChange={onImageChange} accept="image/*"/>
            {image===""?<img src={category.card_img} style={{width:"100%",height:"100%"}}/>:<img src={image} style={{width:"100%",height:"100%"}}/>}
            </figure>
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

export default EditCategory