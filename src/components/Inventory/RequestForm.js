import { useSelector} from 'react-redux';
import React,{useState,useEffect} from 'react';
import '../../css/inventory/reqForm.css'
import { BiRightArrow } from "react-icons/bi";

import {
    Col,
    Container,
    Row,
   InputGroup,FormControl,Dropdown,
    Card,Button,Form,Stack
  } from "react-bootstrap";
  import { BiSearchAlt2 } from 'react-icons/bi';
  import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
  
  const RequestForm = (props) => {
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [selectArr,setSelectArr]=useState([{name:"Coffe Beans",sku:9416,quant:"",price:"10",label:"Coffe Beans",value:"Coffe Beans",unit:"kg"},{name:"Virgin Mojito",sku:9417,quant:"",price:"10",label:"Virgin Mojito",value:"Virgin Mojito",unit:"kg"},{name:"Dark Choclate",sku:9418,quant:"",price:"10",label:"Dark Choclate",value:"Dark Choclate",unit:"kg"},{name:"Flour",sku:9419,quant:"",price:"10",label:"Flour",value:"Flour",unit:"kg"},{name:"Hazelnut",sku:9420,quant:"",price:"10",label:"Hazelnut",value:"Hazelnut",unit:"kg"},{name:"Vanila extract",sku:9421,quant:"",price:"10",label:"Vanila extract",value:"Vanila extract",unit:"kg"},{name:"Ketchup",sku:9422,quant:"",price:"10",label:"Ketchup",value:"Ketchup",unit:"kg"}]);
   
    const [selectedItems,setSelectedItems] = useState([]);
    
  const handleInput =(event,sku)=>{
setSelectedItems(selectedItems.map(element => element.sku == sku ? Object.assign({}, element, {quant:event.target.value}) : element))

  }
  const handleDwn = (event,sku)=>{
   
setSelectedItems(selectedItems.map(element => element.sku == sku ? Object.assign({}, element, {unit:event.target.value}) : element))
  }
  
    function getDropdownButtonLabel1({placeholderButtonLabel,value}){
    
        if (value && value.some((o) => o.value === "*")) { 
          
          return `${placeholderButtonLabel}: All`;
        } else {
          return `${placeholderButtonLabel}: ${value.length} selected`;
        }
      }
        
      function onChange(value, event) {
               
               console.log(event.option)
               console.log(event)
               console.log(value)
              
                           

          if(event.option.value === '*'){
            if(event.action === "select-option"){
              setSelectedItems([...selectArr]);
              this.setState(this.options);
            }
           else{
            this.setState([])
            setSelectedItems([])
           }
          }
          else if (event.action === "deselect-option") {
            this.setState(value.filter(o => o.value !== "*"));
           
        }
        else if (value.length === this.options.length - 1) {
          this.setState(this.options);
      }
     else if(event.action === "select-option" && event.option.value!=="*"){
      setSelectedItems([...value])
this.setState(value)
     }
      else {
        this.setState(value);
     }
       
      }

  
  const filters = useSelector((state) => state.dashboard_filters);

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
      <React.Fragment>
    <Container
    fluid
    className={props.sideToggle === true ? "closeDash" : "openDash"}
    style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
  >
     <Row>
        <Col lg={8} sm={4} xs={12} className='inventory-dash-head'>
          DashBoard </Col>
      
      </Row>
      <Row>
        <Col xl={7} lg={7} sm={7} xs={12}>
          <Form >
            <h1 className='req-header-text'>Select the item to request</h1>
              <div className='item-select'>
              <ReactMultiSelectCheckboxes placeholderButtonLabel="Items to select" 
              getDropdownButtonLabel={getDropdownButtonLabel1}
              options={[{ label: "All", value: "*" },...selectArr]} 
              value={selectedBranches}
              onChange={onChange}
              setState={setSelectedBranches}/>
              </div>
              </Form>
          </Col>

          <Col xl={5} lg={5} sm={5} xs={12} style={{paddingTop:"3.6rem"}}>
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
<Row className='mt-4 dont' style={{height:"100vh"}}>{ 
  selectedItems &&
       selectedItems.map((item)=>(
    <Col lg={4} sm={6} ld xs={6} className="g-2" key={item.sku}>
 <Card style={{borderRadius:"6px"}}>
<Card.Body>
<Card.Title className='fw-bold'>{item.name}</Card.Title>
<hr className="my-1"/>
<div className='d-flex flex-column'>
  <p className='mb-0'>SKU: {item.sku}</p>
  <Stack gap={2} direction='horizontal' className='my-2'>
   <Form.Control placeholder="Enter Quantity" type="number" className='p-1' onInput={event=>handleInput(event,item.sku)}/>
  <select className='p-0' onChange={event=>handleDwn(event,item.sku)}>
  <option value="Kg">Kg</option>
  <option value="grams">g</option>
  <option value="carton">carton</option>
  <option value="liters">L</option>

</select>
</Stack>
  <p className='mb-2'>Price: ₹{item.price} per {item.unit}</p>
  <h5>Total Quantity: {item.quant?`${item.quant} ${item.unit}`:""}</h5>
  {item.quant.length>0?<h5>Price: ₹{item.price * item.quant}</h5>:""}
</div>
</Card.Body>
</Card>
  </Col> 
  ))
  }
  <Button variant="info" className="mt-5" style={{height:"5vh"}}onClick={()=> window.location.reload()}>Send Request</Button>
</Row>
         
      </Container>
      </React.Fragment>
  )
}

export default RequestForm;