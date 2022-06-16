import React, { useState, useEffect } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  addProductToBranch,
  getSingleBranch,
} from "../../../store/actionCreators/Branch/BranchAction";
import { toast } from "react-toastify";

const AddProductModal = ({ show, close, data }) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [productsAvailable, setProductsAvailable] = useState(0);

  const closeModal = () => {
    close();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!product.value) {
      toast.error(`Please select a product to proceed`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      console.log({
        ...data,
        product_list_id: product.value,
        items_available: productsAvailable,
        price: product.price,
        product_id: product.product_id,
      });
      dispatch(
        addProductToBranch({
          ...data,
          product_list_id: product.value,
          items_available: productsAvailable,
          price: product.price,
          product_id: product.product_id,
        })
      );
      dispatch(getSingleBranch(data.branch_id));
      close();
    }
  };

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
              <label>Poduct</label>
              <Select
                required
                options={products.data.data.map((p) => ({
                  label: p.product_name,
                  value: p.product_list_id,
                  price: p.price,
                  product_id: p.product_id,
                }))}
                onChange={(e) => setProduct(e)}
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
                onChange={(e) => setProductsAvailable(e.target.value)}
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
  );
};

export default AddProductModal;
