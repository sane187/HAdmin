import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import { Link } from "react-router-dom";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useState } from 'react';
import faker from "@faker-js/faker";
import { useSelector } from "react-redux";
const MostPopularOrder = props => {
  const orderHistory = useSelector(state => state.customer_order_history)

  const [productData,setProductData]=useState(orderHistory.data.popular_purchase);
  useEffect(()=>{
     if(orderHistory.data.status){
        setProductData(orderHistory.data.popular_purchase)
     }
  },[orderHistory])
  async function handleSubmit(event) {
    event.preventDefault();

  }

  const columns = [
    {
      dataField: 'name',
      text: 'Most Popular Item',
      sort: true
    }, {
      dataField: 'Total_purchase',
      text: 'Total Purchase',
      sort: true
    }, {
      dataField: 'avg_purchase',
      text: 'Average Purchase',
      sort: false
    }
  ];

  const defaultSorted = [{
    dataField: 'TotalPurchase',
    order: 'desc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  }

  const { SearchBar } = Search;
    return(
        <React.Fragment>
        <div className="page-content mt-4">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col className="col-12">
                <Card>
                  <Card.Body>
                    <Card.Title className="h4 mb-4 mt-2">Most Popular Orders </Card.Title>
  
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField='name'
                      columns={columns}
                      data={productData}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField='name'
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
                                      keyField={"Num"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
  
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
  
                                  </div>
                                </Col>
                              </Row>
  
                              
                            </React.Fragment>
                          )
                          }
                        </ToolkitProvider>
                      )
                      }</PaginationProvider>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            </form>
        </div>
      </React.Fragment>
    );
    
        
};


export default MostPopularOrder;