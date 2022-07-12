import React,{useState,useEffect} from 'react';
import '../../css/inventory/dashboard.css'
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Table,
  Row,
  Alert,
  Card,Button
} from "react-bootstrap";
import "../../css/dashboard.css";
import { RiStackLine } from "react-icons/ri";
import { BsChevronDoubleDown } from "react-icons/bs";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { GrDropbox } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";


const DashBoard = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.dashboard_filters);
 
const arr=[{name:"All Requests",total:1234},{name:"Processing Requests",total:1234},{name:"Pending Requests",total:1234},{name:"Completed Requests",total:1234},{name:"Rejected Requests",total:1234}]

const tableArrHead=["Name","SKU","Quantity","Price"];
const tableArrBody=[{name:"Coffe Beans",sku:9416,quant:"5kg",price:"$10"},{name:"Virgin Mojito",sku:9417,quant:"5kg",price:"$10",},{name:"Dark Choclate",sku:9418,quant:"5kg",price:"$10"},{name:"Coffe Beans",sku:9419,quant:"5kg",price:"$10"},{name:"Coffe Beans",sku:9420,quant:"5kg",price:"$10"},{name:"Coffe Beans",sku:9421,quant:"5kg",price:"$10"},{name:"Coffe Beans",sku:9422,quant:"5kg",price:"$10"}];

const recentArr=[{orderId:98765,Products:"All",Total:"25000"},{orderId:78456,Products:"Coffe, Hazelnut, Cocoa, Sugar",Total:"30000"},{orderId:88766,Products:"All",Total:"24000"},{orderId:98654,Products:"All",Total:"15000"}]

{/* Month Dropdown*/}
  const monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthDrop=()=>{
    return monthArray.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  }

{/* Year Select*/}
  const currYear = new Date().getFullYear();
  const yearArray = () => {
    let arrYear = ["All"];
    for (let i = 0; i < currYear - 2017 + 1; i++) {
      arrYear.push(2017 + i);
    }
    return arrYear;
  };
  const yearDrop = () => {
    const year = yearArray();
    return year.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  };
{/* Franchise Select*/}
const [currentFilter, setCurrentFilters] = useState({
  branch: { branch_name: "All", branch_id: "All" },
  franchise: { franchise_name: "All", franchise_id: "All" },
});

const [franchiseName, setfranchiseName] = useState("All");
const [branchArray, setBranchArray] = useState(["All"]);

const FranchiseDrop = () => {
  if (filters.data) {
    return filters.data.data.map((item, index) => {
      return (
        <option key={index} value={index}>
          {item.franchise_name}
        </option>
      );
    });
  }
};
const handleFranchiseChange = (e) => {
  const index = e.target.value;
  setfranchiseName(filters.data.data[index].franchise_name);
  setBranchArray(filters.data.data[index].branches);
  setCurrentFilters({
    branch: {
      branch_name: filters.data.data[index].branches[0].branch_name,
      branch_id: filters.data.data[index].branches[0].branch_id,
    },
    franchise: {
      franchise_name: filters.data.data[index].franchise_name,
      franchise_id: filters.data.data[index].franchise_id,
    },
  });
};
const BranchDrop = () => {
  return branchArray.map((item, index) => {
    return (
      <option
        key={index}
        value={`["${item.branch_name}","${item.branch_id}"]`}
      >
        {item.branch_name ? item.branch_name : item}
      </option>
    );
  });
};
const handleBranchChange = (e) => {
  let item = JSON.parse(e.target.value);
  setCurrentFilters({
    ...currentFilter,
    branch: { branch_name: item[0], branch_id: item[1] },
  });
};
  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <Row>
        <Col lg={8} sm={4} xs={12} className='inventory-dash-head'>
          DashBoard </Col>
        <Col lg={4} sm={8} xs={12} >
          <Row>
            <Col className="px-1" lg={2} sm={2} xs={2}>
              <div className="form-group inv-drop-dash">
                <select
                  className="form-control form-select form-select-sm"
                  name="month"
                >
                  {monthDrop()}
                </select>
              </div>
            </Col>
           <Col className="px-2" lg={3} sm={3} xs={3}>
                  <div className="form-group inv-drop-dash">
                    <select
                      className="form-control form-select form-select-sm"
                      name="year"
                      
                    >
                      {yearDrop()}
                    </select>
                  </div>
                </Col>  
                <Col className="px-2" lg={3} sm={3} xs={3}>
                  <div className="form-group inv-drop-dash">
                    <select
                      className="form-control form-select form-select-sm"
                      name="year" onChange={handleFranchiseChange}>
                        {FranchiseDrop()}
                    </select>
                  </div>
                </Col>
                <Col className="px-2" lg={4} sm={4} xs={4}>
                  <div className="form-group inv-drop-dash">
                    <select
                      className="form-control form-select form-select-sm"
                      name="year"  onChange={handleBranchChange}>
                     {BranchDrop()}
                    </select>
                  </div>
                </Col>
          </Row>
        </Col>
      </Row>
      
      <Row>
{arr.map((item)=> <Col lg sm={6} xs={6} key={item.total}>
   <Card className="dash-inv-card">
<Card.Body>
  <div className='d-flex'>
    <div className='flex-1'>
<Card.Title className='card-title'>{item.name}</Card.Title>
<Card.Text>
 {item.total}
</Card.Text>
</div>
<div className="text-primary icon-color" style={{fontSize:"24px"}}>
                                            <RiStackLine/>
                                        </div>
</div>
</Card.Body>
</Card>
   </Col>)
}

      
      </Row>
  <section className='mt-2 mt-lg-5 table-dash-inv'>
  <Row>
    <Col lg={6} md sm xs> 
    <h3 className='d-flex align-items-center mb-4'>Items that are required to refil <GrDropbox className='ms-2' style={{color:"E59F1D"}}/></h3>
    <Table responsive style={{border:"1.5px solid #e4e4e4",borderRadius:"10px"}}>
  <thead>
    <tr>
      <th></th>
      {tableArrHead.map((item,index) => (
        <th key={`${item}`}>{item}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {
      tableArrBody.map((item,index)=>(
        <tr key={item.sku}>
         <td className='name-icon'><HiOutlineChevronDoubleDown /></td>
        <td>{item.name}</td>
        <td>{item.sku}</td>
        <td>{item.quant}</td>
        <td>{item.price}</td>
       
    
    </tr>

      ))
   
}
  </tbody>
</Table></Col>
    <Col>
    <h3 className='d-flex align-items-center mb-3'>Recent Requests</h3>
    <Row>
      {recentArr.map(item=>(
 <Col lg={6} className="g-2" key={item.orderId}>
 <Card style={{borderRadius:"6px"}}>
<Card.Body>
<Card.Title className='fw-bold'>Order Id: {item.orderId}</Card.Title>
<hr className="my-1"/>
<div className='d-flex flex-column'>
  <p className='text-truncate mb-1'>Products : {item.Products}</p>
  <p>Total: ₹{item.Total}  </p>
  <p></p>
</div>
<Button variant="info" >View Details</Button>
</Card.Body>
</Card>
  </Col> 
      ))}
      
     </Row>
    </Col>
  </Row>
   </section>
   
    </Container>
  )
}

export default DashBoard;