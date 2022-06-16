import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import AddProductModal from "./AddProductModal";
import SmallCard from "./SmallCard";
import { useDispatch } from "react-redux";
import { deleteCategoryFromBranch } from "../../../store/actionCreators/Branch/BranchAction";

const plus = require("./../../../assets/images/plusSign.jpg");

const BigCard = ({ item, index, branch_id, franchise_id }) => {
  const [showProductModal, setShowPrModal] = useState(false);
  const dispatch = useDispatch();

  const SmallCard1 = (i, index) => {
    return i.products.map((item, index) => {
      return <SmallCard key={index} item={item} />;
    });
  };

  const deleteCategory = () => {
    const confirm = prompt(
      "Are your sure you want to delete this category ? Type yes to continue "
    );
    if (confirm === "yes") dispatch(deleteCategoryFromBranch(item.category_id));
  };

  return (
    <Col xxl={12} className="mb-4">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <div className="d-flex">
            <Card.Title
              className="mb-3"
              style={{
                backgroundColor: "#fff",
                color: "grey",
                fontWeight: "800",
              }}
            >
              {item.category_list.category_name.toUpperCase()}
            </Card.Title>
            <div style={{ marginLeft: "auto" }}>
              <Button
                onClick={deleteCategory}
                className="btn btn-danger btn-sm py-0"
              >
                x
              </Button>
            </div>
          </div>
          <Card.Text>
            <Row>
              {SmallCard1(item, index)}
              <Col lg={2} md={6} sm={6} xs={12} className="mb-4">
                <Card onClick={() => setShowPrModal(true)}>
                  <Card.Body>
                    <Card.Title>Add New Product</Card.Title>
                    <Card.Img
                      width="100px"
                      height="150px"
                      variant="bottom"
                      src={plus}
                    />
                  </Card.Body>
                </Card>
                <AddProductModal
                  show={showProductModal}
                  close={setShowPrModal}
                  data={{
                    category_id: item.category_id,
                    branch_id,
                  }}
                />
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BigCard;
