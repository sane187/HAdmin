import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { Modal, Row, Form, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const AddcategoryModal = ({ show, close, categoryObj, branch_id }) => {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [displayableCategories, setDisplayableCategories] = useState([]);
  const [displayableProducts, setDisplayableProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    setDefaultData();
  }, [categories, categoryObj, products]);

  const setDefaultData = () => {
    const dc = [];
    if (categories.data && categories.data.data) {
      categories.data.data.forEach((c) => {
        if (categoryObj[c.category_list_id] !== true) {
          dc.push(c);
        }
      });
      setDisplayableCategories(dc);
    }

    const dp = [];
    if (products.data && products.data.data) {
      products.data.data.forEach((p) => {
        dp.push({
          id: p.product_list_id,
          items_available: 0,
          product_name: p.product_name,
          checked: false,
        });
      });
      setDisplayableProducts(dp);
    }
  };

  const onChangeFields = (field_name, value, product_list_id) => {
    const dp = displayableProducts.map((p) => {
      if (p.id === product_list_id) {
        return { ...p, [field_name]: value };
      }
      return p;
    });

    setDisplayableProducts(dp);
  };

  const onSubmit = () => {
    if (!selectedCategory.value) {
      toast.error(`Please select a category to continue`, {
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
    }
  };

  const displayProducts = () => {
    return displayableProducts.map((p) => (
      <li className="d-flex mb-0 " key={p.id}>
        <div className="d-flex my-auto col-9">
          <Form.Check
            onChange={() => onChangeFields("checked", !p.checked, p.id)}
            type="checkbox"
            checked={p.checked}
            className="my-auto"
          />
          <p className="ml-2 my-auto" style={{ marginLeft: "1rem" }}>
            {p.product_name}
          </p>
        </div>
        <div className="ml-auto w-50 col-3" style={{ marginLeft: "auto" }}>
          <input
            type="number"
            className=" sm"
            style={{ height: "70%", width: "30%" }}
            value={p.items_available}
            onChange={(e) => {
              onChangeFields("items_available", e.target.value, p.id);
              //   onChangeFields("checked", true, p.id);
            }}
          />
        </div>
      </li>
    ));
  };

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Product to category</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: "auto" }}>
        <Row>
          <label>Select Category to add to this branch</label>
          <Select
            options={displayableCategories.map((dc) => ({
              value: dc.category_list_id,
              label: dc.category_name,
            }))}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e)}
            style={{ width: "50%" }}
          />
        </Row>
        <Row className="mt-2 d-flex">
          <div className="mx-auto">
            <div className="d-flex">
              <Col className="col-1"></Col>
              <Col className="col-7">Products</Col>
              <Col className="col-4"> Items Available</Col>
            </div>
            <ul>{displayProducts()}</ul>
          </div>
        </Row>
        <Button type="submit" className="btn btn-warning">
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddcategoryModal;
