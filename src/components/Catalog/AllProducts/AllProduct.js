import React, { useState } from "react";
import { Card, Col, Container, Row,Button,Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "../../unauthorized";
import EditProduct from "./EditProduct";
import ProductDescModal from "./ProductDescModal";
import { deleteProduct } from "../../../store/actionCreators/Catalog/Catalog";

const AllProducts = (props) => {

  const productData = useSelector((state) => state.products);
  const [currentProduct,setCurrentProduct]=useState({})
  const dispatch = useDispatch();

 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
//   function getDateFromUTC(date) {
//     var d = new Date(date);
//     let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const monthArray = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Deci",
//     ];

//     return `${dayArr[d.getDay()]} ${
//       monthArray[d.getMonth()]
//     } ${d.getHours()}:${d.getMinutes()} ${d.getFullYear()}`;
//   }
const deleteFunction =(row)=>{
  
   dispatch(deleteProduct(row.product_list_id));
  }

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    if(props.editPermission){
    return (
      <div
        style={{
          textAlign: "start",
          cursor: "pointer",
          lineHeight: "normal",
        }}
      >
        <Button        
          onClick={()=>{setCurrentProduct({...row});
          setShowModal(true);}}
          className="btn btn-sm btn-warning me-2"
        >
          Edit
        </Button>
      
        <Button
          className="btn btn-sm btn-warning"
          onClick={()=>{setCurrentProduct({...row}); setShow(true)}}
        >
          View
        </Button>
        <Button
          className="btn btn-sm btn-danger ms-2"
          onClick={()=>deleteFunction(row)}
        >
          Delete
        </Button>
      </div>
    );
      }
      else{
        return (
          <div
            style={{
              textAlign: "start",
              cursor: "pointer",
              lineHeight: "normal",
            }}
          >          
            <Button
              className="btn btn-sm btn-warning"
              onClick={()=>{setCurrentProduct({...row}); setShow(true)}}
            >
              View
            </Button>
          </div>
        );
      }
  }
  async function handleSubmit(event) {
    event.preventDefault();
  }

  const columns = [
    {
      dataField: "product_list_id",
      text: "Product Id",
      sort: false,
    },
    {
      dataField: "product_name",
      text: "Product Name",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: false,
    },
    {
      dataField: "sku",
      text: "SKU",
      sort: false,
    },
    {
        dataField:"price",
        text: "Price",
        sort: true,
      }, 
      {
        dataField: "food_type",
        text: "Food Type",
        sort: false,
      }, 
      {
        dataField: "product_type",
        text: "Product Type",
        sort: false,
      },
      {
        dataField: "prepare_time",
        text: "Prepare Time",
        sort: true,
      },
    {
      dataField: "view",
      text: "Actions",
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "category_name",
      order: "asc",
    },
  ];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };

  const { SearchBar } = Search;
  const main = () => {
    if (props.viewPermission) {
      if (productData.data) {
        if (productData.data.data) {
          return (
            <Container
              fluid
              className={props.sideToggle === true ? "closeDash" : "openDash"}
              style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
            >
              <Row>
                <div className="page-content ">
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="col-12">
                        <Card>
                          <Card.Body>
                            <Card.Title className="h4 mb-2 ">
                             All Products Datatable{" "}
                            </Card.Title>

                            <PaginationProvider
                              pagination={paginationFactory(pageOptions)}
                              keyField="category_list_id"
                              columns={columns}
                              data={productData.data.data}
                            >
                              {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                  keyField="category_list_id"
                                  columns={columns}
                                  data={productData.data.data}
                                  search
                                >
                                  {(toolkitProps) => (
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
                                              keyField={"EmpId"}
                                              responsive
                                              bordered={false}
                                              striped={false}
                                              defaultSorted={defaultSorted}
                                              classes={
                                                "table align-middle table-nowrap"
                                              }
                                              headerWrapperClasses={
                                                "thead-light"
                                              }
                                              {...toolkitProps.baseProps}
                                              {...paginationTableProps}
                                              
                                            />
                                          </div>
                                        </Col>
                                      </Row>

                                      <Row className="align-items-md-center mt-30">
                                        <Col className="inner-custom-pagination d-flex">
                                          <div className="d-inline">
                                            <SizePerPageDropdownStandalone
                                              {...paginationProps}
                                            />
                                          </div>
                                          <div className="text-md-right ms-auto">
                                            <PaginationListStandalone
                                              {...paginationProps}
                                              className="table-pagination"
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                    </React.Fragment>
                                  )}
                                </ToolkitProvider>
                              )}
                            </PaginationProvider>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Row>
              <EditProduct show={showModal}
            close={() => setShowModal(false)} data={currentProduct}/>
            <ProductDescModal show={show} item={currentProduct} handleClose={handleClose} />
            </Container>
            
          );
        }
      }
    }
    return <Unauthorized />;
  };
  return <React.Fragment>{main()}</React.Fragment>;
};

export default AllProducts;
