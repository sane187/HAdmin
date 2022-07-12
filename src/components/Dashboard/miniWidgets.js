import React, { Component } from 'react';
import { Col, Card } from "react-bootstrap";
import "../../css/miniWidgets.css";
import {VscTriangleUp} from "react-icons/vsc";
class MiniWidgets extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.reports.map((report, key) =>
                        <Col key={key} md={4}>
                            <Card>
                                <Card.Body>
                                    <div className="d-flex">
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-truncate font-size-14 mb-2">{report.title}</p>
                                            <h4 className="mb-0">{report.value}</h4>
                                        </div>
                                        <div className="text-primary icon-color" style={{fontSize:"24px"}}>
                                            <report.icon/>
                                        </div>
                                    </div>
                                </Card.Body>
{/* 
                               <Card.Body className="border-top py-3">
                                    <div >
                                        <span style={{backgroundColor:"#1cbb8c2e",color:"#1cbb8c",fontSize:"11px",padding:"2.75px 4.4px",borderRadius:"0.25em" }}> <VscTriangleUp/> {report.rate}</span>
                                        <span className="text-muted ms-2 font-size-14">{report.desc}</span>
                                    </div>
                                </Card.Body> */}
                            </Card>
                        </Col>
                    )
                }
            </React.Fragment>
        );
    }
}

export default MiniWidgets;