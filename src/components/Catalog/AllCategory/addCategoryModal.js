import React,{useState} from 'react';
import { Modal, Button, Row } from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import Select from "react-select";
import {addProductToCategory} from '../../../store/actionCreators/Catalog/Catalog';


//add product branch , delete product branch

const AddCategoryModal = ({ show, close, data }) => {
  const dispatch=useDispatch()
    const [product, setProduct] = useState({});
  const [productsAvailable, setProductsAvailable] = useState(0);

  const products = useSelector((state) => state.products);



    const closeModal = () => {
        close();
      };

      const onSubmitForm =(e)=>{
        e.preventDefault();
        const productdata={
          ...data,
          product_list_id: product.value,
          items_available: productsAvailable,
          price: product.price
        }
        dispatch(
          addProductToCategory(productdata)
        );
        

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
      <Modal.Title>Add Product to category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={onSubmitForm}>
        <Row>
          <div className="mb-2">
            <label>Product</label>
            <Select
              required
              options={products.data.data.map((p) => ({
                label: p.product_name,
                value: p.product_list_id,
                price: p.price,
              }))}
              onChange={(e) =>setProduct(e)}
                value={product}
                            
            />
          </div>
          <div className="mb-2">
            <label>Products Available</label>
            <input
              required
              type="number"
              className="form-control"
              value={productsAvailable}
              onChange={(e)=>setProductsAvailable(e.target.value)}
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
  )
}

export default AddCategoryModal