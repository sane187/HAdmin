import React,{ useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import faker from "@faker-js/faker";
import { Link } from "react-router-dom";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useSelector } from "react-redux";
import TotalOrderPage from "./TotalOrderPage";
const TotalOrdersTaken = (props) => {
  function getDateFromUTC(date) {
    var d = new Date(date);
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (`${dayArr[d.getDay()]} ${monthArray[d.getMonth()]} ${d.getHours()}:${d.getMinutes()} ${d.getFullYear()}`)
  }


  const [page,setPage]=useState(1);
  const orderHistory = useSelector(state => state.employee_orders_taken)

  const [productData,setProductData]=useState([
    { "Orderid": "", "Ordered Items": "", "Amount": "", "PaymentMethod":"", "PaymentId": "", "coupon": "", "Group": `${faker.name.jobDescriptor()}`, "order date": "" }
  ]);
  const Data = () => {
    let array = [];
    if (orderHistory.data) {
      if (orderHistory.data.data) {
        for (let i = 0; i < orderHistory.data.data.length; i++) {
          let item=orderHistory.data.data[i];
          let individOrder=''
          for(let x=0;x<item.order_items.length;x++){
            if(x===item.order_items.length-1){
              individOrder=individOrder+ item.order_items[x].product_name+" "
            }
            else{
              individOrder=individOrder+ item.order_items[x].product_name+" ,"
            }
            
          }
      
          const element = { 
            "order_id":  item.order_id, 
          "order_items": `${individOrder}`,
           "Amount": item.paid_price, 
           "PaymentMethod": item.payment_method, 
           "PaymentId": item.payment_id,  
           "tax": item.tax, 
           "coupon": item.applied_coupons.coupon, 
           "order date": `${getDateFromUTC(item.createdAt)}` }
          array.push(element);
        }
      }
    }
    return array;
  }
  useEffect(()=>{
     if(orderHistory.data){
       if(orderHistory.data.status==="success"){
        setProductData(Data())
        setPage(Math.ceil(orderHistory.data.total_orders/10))
       }  
       else{
        setProductData(Data())
        setPage(1)
       }  
       
     }
  },[orderHistory])

  async function handleSubmit(event) {
    event.preventDefault();

  }

  const columns = [
    {
      dataField: 'order_id',
      text: 'Order ID',
      sort: true
    }, {
      dataField: 'order_items',
      text: 'Ordered Items',
      sort: false
    }, {
      dataField: 'Amount',
      text: 'Amount',
      sort: false
    }, {
      dataField: 'PaymentMethod',
      text: 'Payment Method',
      sort: true
    }, {
      dataField: 'PaymentId',
      text: 'PaymentId',
      sort: true
    }, {
      dataField: 'coupon',
      text: 'Coupon',
      sort: false
    },{
        dataField: 'Group',
        text: 'Group',
        sort: false
      },{
        dataField: 'order date',
        text: 'Order date',
        sort: true
      }
  ];

  const defaultSorted = [{
    dataField: 'order date',
    order: 'desc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  }

  const { SearchBar } = Search;

  return (
    <React.Fragment>
      <div className="page-content mt-4 mb-3">
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-12">
              <Card>
                <Card.Body>
                  <Card.Title className="h4 mb-2">Total Orders Taken</Card.Title>

                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField='Orderid'
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField='Orderid'
                        columns={columns}
                        data={productData}
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>

                            <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar
                                      {...toolkitProps.searchProps}
                                    />
                                    <i className="search-box chat-search-box" />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"Orderid"}
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

                            <Row>
                            <TotalOrderPage pageNum={page}/>
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
  )

}

export default TotalOrdersTaken;