import React from 'react';
import { Card, Col, Row, } from 'react-bootstrap';
const NoData = ({ data }) => {
    return (
        <Row>
        <Col >
        <Card className="smallCard" style={{ width: '300px',height:"100px" }}>
                <Card.Body>
                    {/* <Card.Img width="150px" height="150px" variant="top" src={item.product_list.card_img} /> */}
                    <Card.Title>{"HeeBee"}</Card.Title>
                    {data}

                </Card.Body>
            </Card>
        </Col>
           
        </Row>
    );
};

export default NoData;