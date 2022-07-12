import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row,Button, Modal } from "react-bootstrap";
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
 import { getSingleAddon,deleteSingleAddon } from "../../../store/actionCreators/Catalog/Catalog";
import EditAddonModal from "./EditAddonModal";
import Unauthorized from "../../unauthorized";
import "../../../css/catalog/editAddonModal.css"

const AllCategory = (props) => {  
  const productData = useSelector((state) => state.addons);
  const dispatch = useDispatch();
  console.log(props) 
  let single= useSelector((state) => state.singleAddon);
  const [currentAddon,setCurrentAddon]=useState(single.data)
  const [show, setShow] = useState(false);
  useEffect(()=>{
setCurrentAddon(single.data)
  },[single])
  
  const onClickFunction = (row) => {
    
    const id=row.add_ons_id;
    dispatch(getSingleAddon(id));
    setShow(true)
  }
  const onClickFunction2 = (row) => {
    const id=row.add_ons_id;
    dispatch(getSingleAddon(id));
    setShowModal(true)
  }
  const handleDeleteAddon = (row) => {
    const id=row.add_ons_id;
    dispatch(deleteSingleAddon(id));
  }
  
  const handleClose =()=>{
    setShow(false)
  }
  const handleCloseModal =()=>{
    setShowModal(false);
  }
  
 
  const [showModal, setShowModal] = useState(false);
  
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
          className="btn btn-sm btn-warning me-2" onClick={()=>onClickFunction2(row)}
        >
          Edit
        </Button>
      
        <Button        
          onClick={() => onClickFunction(row)}
          className="btn btn-sm btn-warning"
        >
          View
        </Button>
        <Button        
          className="btn btn-sm btn-danger ms-2" onClick={()=>handleDeleteAddon(row)}
        >
          Delete
        </Button>
      </div>
    );}
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
            onClick={() => onClickFunction(row)}
            className="btn btn-sm btn-warning"
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
      dataField: "add_ons_id",
      text: "Addon Id",
      sort: false,
    },
    {
      dataField: "title",
      text: "Addon Name",
      sort: true,
    },
    {
      dataField: "add_on_type",
      text: "Addon type",
      sort: false,
    },
    {
      dataField: "createdAt",
      text: "Created At ",
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
                              Category Datatable{" "}
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
            
              <Modal className='remove-border' show={show} onHide={handleClose} centered>
                  <Modal.Header className=" bg-light text-dark remove-border" closeButton>
                      <Modal.Title >{currentAddon.title.toUpperCase()}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className=" bg-light text-light remove-border">
                  <div className="d-flex text-dark">
                                  <p className="fw-bold me-2">Addon ID :</p>
                                  <p >{currentAddon.add_ons_id}</p>
                              </div>
                              <div className="d-flex text-dark">
                              <p className="fw-bold me-2">Addon Type :</p>
                                  <p>{currentAddon.add_on_type}</p>
                              </div>
                              <div className="d-flex text-dark">
                              <p className="fw-bold me-2">CreatedAt :</p>
                                  <p>{currentAddon.createdAt}</p>
                              </div>
                      <table className="table table-borderless indi-table mb-0">
                          <tbody>
                          
                             
                              <tr style={{paddingTop:"3rem"}}>
                    <th style={{width:"8vw"}}>Addon Options</th>         
    <th style={{textAlign:"center"}}>TITLE</th>
    <th>PRICE</th>
    <th>SKU</th>
  </tr>   
                                {
                                  currentAddon.add_on_options.map((item,index)=>{
                              return <tr >
                                <th>{index+1}</th> <td style={{textAlign:"center"}}>{item.title}</td> <td>{item.price}</td> <td>{item.sku}</td>
                               
                              </tr>})}
                             
                              
                              
                              
                          </tbody>
                      </table>
                  </Modal.Body>
  
              </Modal>
       <EditAddonModal show={showModal} close={handleCloseModal} data={currentAddon}/>
            </Container>
          );
        }
      }
    }
    return <Unauthorized />;
  };
  return <React.Fragment>{main()}</React.Fragment>;
};

export default AllCategory;
