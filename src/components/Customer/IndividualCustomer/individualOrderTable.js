import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import faker from "@faker-js/faker";
import { Link } from "react-router-dom";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useDispatch, useSelector } from "react-redux";
import { MostOrderPaginationReducer } from "../../../store/reducers/Customer/customerReducer";
import MostPopularOrderPagination from "./MostPopularOrderPagiantion";
import { CustomerOrderHistory } from "../../../store/actionCreators/Customers/CustomerAction";
const IndividualOrderTable = (props) => {
  const orderHistory = useSelector(state => state.customer_order_history)
  const dispatch=useDispatch();
  function getDateFromUTC(date){
    var d = new Date(date);
    let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
     const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return(`${dayArr[d.getDay()]} ${monthArray[d.getMonth()]} ${d.getHours()}:${d.getMinutes()} ${d.getFullYear()}`)
    }
  
  const Data = () => {
    let array = [];
    if (orderHistory.data) {
      if (orderHistory.data.orders_data) {
        for (let i = 0; i < orderHistory.data.orders_data.length; i++) {
          let item=orderHistory.data.orders_data[i];
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
          "Orderid": item.order_id, 
          "Ordered Items": `${individOrder}`,
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
  const products = Data();
  const [productData, setProductData] = useState(products);
  const [pageNum,setPageNum]=useState(1);
  async function handleSubmit(event) {
    event.preventDefault();
  
  }
  const page = useSelector(state => state.mostOrderPage);
  // useEffect(()=>{
  //   if(orderHistory.data){  
  //     dispatch(CustomerOrderHistory(page,orderHistory.data.customer_data[0].mobile_no))}
  // },[page])
  useEffect(()=>{
    if(orderHistory.data){
      console.log("page Num",pageNum)
      setPageNum(Math.ceil(orderHistory.data.total_orders/10))}
      setProductData(Data())
  },[orderHistory])
  const columns = [
    {
      dataField: 'Orderid',
      text: 'Order ID',
      sort: true
    }, {
      dataField: 'Ordered Items',
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
      dataField: 'tax',
      text: 'Tax',
      sort: false
    }, {
      dataField: 'order date',
      text: 'Order date',
      sort: true
    }, {
      dataField: 'PaymentId',
      text: 'PaymentId',
      sort: true
    }, {
      dataField: 'coupon',
      text: 'Coupon',
      sort: false
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
                  <Card.Title className="h4 mb-2">Total Orders </Card.Title>

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
                              <MostPopularOrderPagination pageNum={pageNum} />
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

export default IndividualOrderTable;