import React from "react"
import { Row, Col, Card, Container } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useState } from 'react';
import {TiTick} from "react-icons/ti"
import {FaTimes} from "react-icons/fa"
import {FaEdit} from "react-icons/fa"
const IndividualEmployeeRole = (props) => {
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [productData, setProductData] = useState(props.access);
  
    console.log(props);
    function Read(cell, row, rowIndex, formatExtraData) {
        return (
            <div
                style={{

                    cursor: "pointer",
                    lineHeight: "normal",
                    fontSize:"25px"
                }}>
                <div
                     >
                    {row.Read===true?<TiTick  className="text-success"/>:<FaTimes className="text-danger"/>}
                </div>
            </div >
        );
    }
    function Write(cell, row, rowIndex, formatExtraData) {
        console.log("cell",row.Read)
        return (
            <div
            style={{

                cursor: "pointer",
                lineHeight: "normal",
                fontSize:"25px",
           
            }}>
            <div>
                {row.Write===true?<TiTick className="text-success"/>:<FaTimes className="text-danger"/>}
            </div>
        </div >
        );
    }
    function rankFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            <div
                style={{

                    cursor: "pointer",
                    lineHeight: "normal"
                }}>
                <div
                    className="btn btn-sm btn-secondary ms-0 align-left" >
                   <FaEdit/> Read
                </div>
            </div >
        );
    }
    function rankFormatter2(cell, row, rowIndex, formatExtraData) {
        console.log("cell",row)
        return (
            <div
            style={{

                cursor: "pointer",
                lineHeight: "normal"
            }}>
            <div
                className="btn btn-sm btn-primary ms-0 align-left" >
                <FaEdit/> Write
            </div>
        </div >
        );
    }
    async function handleSubmit(event) {
        event.preventDefault();

    }

    const columns = [
        {
            dataField: 'Module_Name',
            text: 'Module Name',
            sort: false
        },
        {
            dataField: 'Read',
            text: 'Read access',
            isDummyField: true,
            csvExport: false,
            formatter: Read,
        }, {
            dataField: 'Write',
            text: 'Write Access',
            isDummyField: true,
            csvExport: false,
            formatter: Write,
        }, {
            dataField: 'Edit Read',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: rankFormatter,
        }, {
            dataField: 'Edit Write',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: rankFormatter2,
        }
    ];

    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: productData.length, // replace later with size(customers),
        custom: true,
    }

    const { SearchBar } = Search;
    return (
        <Container fluid className={props.sideToggle === true ? "closeDash" : "openDash"} style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }} >
        <React.Fragment>
            <div className="page-content ">
                <form onSubmit={handleSubmit}>
                    <Row>
                    <Col >
          <Card>
            <Card.Header className="pt-3 pb-3" style={{ borderBottom: "0 solid white", backgroundColor: "#fff", color: "grey" }} ><b className="Customer-font ">{props.currEmployee.name}</b></Card.Header>
            <Card.Body className="pt-0" style={{ overflowX: "auto", paddingRight: "10px" }} >
              <table className="table table-borderless indi-table mb-0">
                <tbody>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>{props.currEmployee.telephone}</td>
                  </tr>

                  <tr>
                    <th scope="row">Email</th>
                    <td>{props.currEmployee.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{props.currEmployee.gender}</td>

                  </tr>
                  <tr>
                    <th scope="row">Account Creation</th>
                    <td>{props.currEmployee["order date"]}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{props.currEmployee.address}</td>
                  </tr>
                  <tr>
                    <th scope="row">Group</th>
                    <td>{"GroupName"}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
                        <Col className="col-12 mt-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title className="h4 mb-4 " style={{ borderBottom: "0 solid white", backgroundColor: "#fff", color: "grey" }}>{props.currEmployee.name}'s Data Access </Card.Title>

                                            <ToolkitProvider
                                                keyField='Module_Name'
                                                columns={columns}
                                                data={productData}
                                                search
                                            >
                                                {toolkitProps => (
                                                    <React.Fragment>

                                                     

                                                        <Row>
                                                            <Col xl="12">
                                                                <div className="table-responsive">
                                                                    <BootstrapTable

                                                                        keyField={"EmpId"}
                                                                        responsive
                                                                        bordered={false}
                                                                        striped={false}
                                                                        defaultSorted={defaultSorted}

                                                                        classes={
                                                                            "table align-middle table-nowrap"
                                                                        }
                                                                        headerWrapperClasses={"thead-light"}
                                                                        {...toolkitProps.baseProps}
                                                                    
                                                                    />

                                                                </div>
                                                            </Col>
                                                        </Row>

                                                       
                                                    </React.Fragment>
                                                )
                                                }
                                            </ToolkitProvider>
                                        
                                        
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </div>
        </React.Fragment>
        </Container>
    );
};

export default IndividualEmployeeRole;