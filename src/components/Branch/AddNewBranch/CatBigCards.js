import React from "react";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import CatSmall from "./CatSmall";

const CatBigCards = ({
  item,
  prefilledProducts,
  isChecked,
  setCategory,
  setProduct,
}) => {
  const products = useSelector((state) => state.products);

  // console.log(prefilledProducts)

  const subProducts = () => {
    if (products.data) {
      return products.data.data.map((prod, index) => {
        return (
          <CatSmall
            product_items_available={
              prefilledProducts
                ? prefilledProducts[prod.product_list_id]
                : undefined
            }
            item={prod}
            index={index}
            key={prod.product_list_id}
            product_checkable={isChecked}
            category_list_id={item.category_list_id}
            setProduct={setProduct}
          />
        );
      });
    }
  };
  return (
    <Col xl={3} lg={4} md={6} sm={12} className="mb-3">
      <Card className="bigCardIm">
        <Card.Img variant="top" src={item.card_img} />
        <Card.Body style={{ height: "400px", overflowY: "hidden" }}>
          <Card.Title className="mb-2">
            <div className="d-flex">
              <input
                className="form-check-input my-auto"
                type="checkbox"
                checked={isChecked}
                onChange={() =>
                  setCategory({
                    category_list_id: item.category_list_id,
                    isChecked: !isChecked,
                  })
                }
              />
              <div className="my-auto ms-2">{item.category_name}</div>
            </div>
            <div className="d-flex mt-3 justify-content-between">
              <h6>
                Product
              </h6>
              <div className="d-flex">
              <h6 className="ms-4 me-2"
              >
                Item_Count
              </h6>
              <h6>
                Price
              </h6>
              </div>
            </div>
          </Card.Title>
          <div>
            {["checkbox"].map((type) => (
              <div
                key={`default-${type}`}
                style={{ height: "280px", overflowY: "scroll" }}
                className="mb-4"
              >
                {subProducts()}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CatBigCards;
