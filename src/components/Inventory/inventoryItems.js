import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {
  Col,
  Container,
  Row,
 InputGroup,FormControl,Dropdown,
  Card,Button
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BiSearchAlt2 } from 'react-icons/bi';
import { Link } from "react-router-dom";


const InventoryItems = (props) => {
    const [viewPermission, setViewPermission] = useState(false);
  const [editPermission, setEditPermission] = useState(false);
  const login = useSelector((state) => state.login);
 

  const editPermissions = () => {
    if (login && login.login.status === "success") {
      const { admin_permissions } = login.login.data;
      admin_permissions.forEach((item) => {
        if (item.module === "Franchise") {
          if (item.read === true) setViewPermission(true);
          if (item.write === true) setEditPermission(true);
        }
      });
    }
  };
  useEffect(() => {
    editPermissions();
  }, []);
const [data,setData]=useState([{name:"Coffe",sku:98145,quantity:"10kg",price:`₹500`},{name:"Olives",sku:98148,quantity:"4kg",price:`₹400`},{name:"Hazelnut",sku:98146,quantity:"6kg",price:`₹500`},{name:"Flour",sku:98147,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98157,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98167,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98177,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98187,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98197,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98947,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98179,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62222,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62223,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62224,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62225,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62226,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62227,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62228,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62292,quantity:"10kg",price:`₹500`}]);

const [arrv,setArrv]=useState([{name:"Coffe",sku:98145,quantity:"10kg",price:`₹500`},{name:"Olives",sku:98148,quantity:"4kg",price:`₹400`},{name:"Hazelnut",sku:98146,quantity:"6kg",price:`₹500`},{name:"Flour",sku:98147,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98157,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98167,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98177,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98187,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98197,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98947,quantity:"10kg",price:`₹500`},{name:"Flour",sku:98179,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62222,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62223,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62224,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62225,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62226,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62227,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62228,quantity:"10kg",price:`₹500`},{name:"Flour",sku:62292,quantity:"10kg",price:`₹500`}]);

    async function handleSubmit(event) {
        event.preventDefault();
      }

      const handleSearch =(e)=>{
      if(e.target.value.length>1){

       setArrv(data.filter(item=>(

         item.name.slice(0,e.target.value.length).toLowerCase()== e.target.value

       )))  }
       else{
         setArrv(data)
       }
   }
   const handleClick =()=>{
            setArrv(data.sort())
   }
 

      
     
      function rankFormatter(cell, row, rowIndex, formatExtraData) {
        return (
          <div
            style={{
              cursor: "pointer",
              lineHeight: "normal",
            }}
          >
            <Link
              exact="true"
              to={`${row.admin_id}`}
              onClick={(e) => {
                if (!editPermission) {
                  alert("You are not authorized to edit info of admins");
                  e.preventDefault();
                }
              }}
              
              className="btn btn-sm btn-danger"
            >
             DELETE
            </Link>
          </div>
        );
      }
      const columns=[{dataField:"name",text:"Product Name"},{dataField:"sku",text:"Product Id"},
      {dataField:"quantity",text:"Quantity",sort:true},{dataField:"price",text:"Price"},{dataField: "view",
      text: "Actions",
      isDummyField: true,
      csvExport: false,
      formatter: rankFormatter,
    }];
      const defaultSorted = [
        {
          dataField: "name",
          order: "asc",
        },
      ];
    
  return (
    <Container
    fluid
    className={props.sideToggle === true ? "closeDash" : "openDash"}
    style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
  >
    <div className="page-content"  >
    <form onSubmit={handleSubmit}>
      <Row>
        <Col className="col-12">
          <Card>
              <h4 className='ms-4 mt-3' style={{fontFamily:"Nunito"}}>Inventory Items</h4>
            <Card.Body className='table-responsive'>
            
   <div className='d-flex align-items-center mb-2'>
   <InputGroup style={{width:"40%"}}>
    <FormControl
      placeholder="Search here..."
      aria-label="Search"
      aria-describedby="basic-addon2" onChange={handleSearch}
    />
    <Button variant="outline-secondary" id="button-addon2">
     <BiSearchAlt2 />
    </Button>
  </InputGroup> 
  <Dropdown className='ms-3'>
  <Dropdown.Toggle variant="info" id="dropdown-basic">
    Search Filter
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1" onClick={handleClick}>High To Low</Dropdown.Item>
    <Dropdown.Item href="#/action-2" onClick={handleClick}>Low To High</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
   </div>
  
            <BootstrapTable data={arrv} keyField="sku" columns={columns} 
                                    responsive
                                    hover
                                    condensed
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    classes={"table align-middle table-nowrap"}
                                    pagination={paginationFactory()}/>
                                   
            </Card.Body>

            </Card>
</Col>    
      </Row>
    </form>
  </div>
  </Container>
  )
}

export default InventoryItems;