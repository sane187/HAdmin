import React,{useState} from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import SmallCard from './SmallCard';
import AddCategoryModal from "./addCategoryModal";
const plus = require("./../../../assets/images/plusSign.jpg");


const BigCard = ({item,index}) => {
  const [showProductModal, setShowPrModal] = useState(false);


    const SmallCard1 = (i, index) => {
   
        return i.products.map((item, index) => {
            return (
               <SmallCard key={index} item={item}  />
            )
        })
    
}


return (
    <Col xxl={12} className="mb-4">
    <Card style={{ width: '100%' }}>
        <Card.Body>
            <Card.Title className='mb-3' style={{ backgroundColor: "#fff", color: "grey", fontWeight: "800" }}>{}</Card.Title>
            <div>
                <Row>
                    {SmallCard1(item, index)}
                    <Col lg={2} md={6} sm={6} xs={12} className="mb-4">
                <Card onClick={() => setShowPrModal(true)}>
                  <Card.Body>
                    <h6>Add New Product</h6>
                    <Card.Img
                      width="100px"
                      height="150px"
                      variant="bottom"
                      src={plus}
                    />
                  </Card.Body>
                </Card>
                <AddCategoryModal
                  show={showProductModal}
                  close={setShowPrModal}
                  data={{ "branch_id":item.branch_id,"category_id":item.category_id}}
                />
              </Col>
                </Row>
            </div>

        </Card.Body>
    </Card>
</Col>
);
};

export default BigCard;