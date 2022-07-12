import React, { useState } from "react";
import { Card, Col, Container, Row,Button } from "react-bootstrap";
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
import { useNavigate } from "react-router-dom";
import { get_product_branch,currentCat,currentBranch,get_category_branches,deleteCategory } from "../../../store/actionCreators/Catalog/Catalog";
import Unauthorized from "../../unauthorized";
import EditCategory from "./EditCategory";

const AllCategory = (props) => {
  let navigate=useNavigate()
const Branches = useSelector((state) => state.getBranchInCat);
  
  const productData = useSelector((state) => state.categories);
  const [currentCategory,setCurrentCategory]=useState({})
  const dispatch = useDispatch();

const deleteFunction =(row)=>{
dispatch(deleteCategory(row.category_list_id));
}
const routeChange = () =>{ 
  let path = `/catalog/Individual_category`; 
  navigate(path);
}

  const onClickFunction = (row) => {
      console.log(Branches)
    if(row){ 
      props.setCategory(row);
    dispatch(get_product_branch(row.category_list_id));
  dispatch(currentCat(row))
  dispatch(currentBranch(Branches.data[0]))
  dispatch(get_category_branches(row.category_list_id,Branches.data[0].branch_id))
  
  }
  routeChange();
  };
  
  const [showModal, setShowModal] = useState(false);
  // function getDateFromUTC(date) {
  //   var d = new Date(date);
  //   let dayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   const monthArray = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   return `${dayArr[d.getDay()]} ${
  //     monthArray[d.getMonth()]
  //   } ${d.getHours()}:${d.getMinutes()} ${d.getFullYear()}`;
  // }

 
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
          onClick={()=>{setCurrentCategory({...row});
          setShowModal(true)}}
          className="btn btn-sm btn-warning me-2"
        >
          Edit
        </Button>
      
        <Button        
          onClick={() => onClickFunction(row)}
          className="btn btn-sm btn-warning"
        >
          View
        </Button>
        <Button className="btn btn-sm btn-danger ms-2" onClick={()=> deleteFunction(row)}>Delete</Button>
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
      dataField: "category_list_id",
      text: "Category Id",
      sort: false,
    },
    {
      dataField: "category_name",
      text: "Category Name",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
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
              <EditCategory show={showModal}
            close={() => setShowModal(false)} data={currentCategory}/>
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
