import React, { useEffect,useState } from 'react';
import { Col, Container, Row,Form,Table,Button } from 'react-bootstrap';

const AddCategoryToBranches = (props) => {
    const [productArr,setProductArr]=useState([]);
    const [item,setItem]=useState([])
    const [view,setView]=useState(false)

    useEffect(()=>{
setProductArr(props.selectedProducts)

    },[props.selectedProducts])
 

    const handleClickPrice =(e)=>{
            let index = productArr.findIndex(element => element.label === e.target.id)
            let arr=[...productArr]
            if(index!==-1){
                arr[index].price=e.target.value; 
                setProductArr(arr)
              }
        }
   



    const handleClickItems =(e)=>{
        let index = productArr.findIndex(element => element.label === e.target.id)
        let arr=[...productArr]
        if(index!==-1){
            arr[index].item=e.target.value; 
            setProductArr(arr)
          } 
    }

    return (
        <Container fluid className={props.sideToggle === true ? "closeDash" : "openDash"} style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }} >
            <div className='row d-flex justify-content-center'>
                <div className='form-container'>
                    <div className='form-head'>Add Category To Branches</div>
                    <div className='form-body'>
                        <form >
                            <Row >
                                {view?"":
                                <Col lg={4}> <div className="mb-2 p-2" >
                                    <label className="form-label">Select Categories(S)</label>
                                    {props.displayCategory()}
                                    <button className="btn btn-primary" onClick={()=>setView(true)}>Edit selected Products</button>
                                </div></Col> }
 
                                {view?
                                <Col lg={8} >
                               
                                    <div className='d-flex align-items-center'><h1 className="mb-2">Selected Products</h1><button className='btn btn-primary ms-4' onClick={()=>setView(false)}>Add More products</button></div>
                                <Table bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>ITEM</th>
          <th>PRICE</th>
          <th>Item Available</th>
          
        </tr>
      </thead>
      <tbody>
      {productArr.map((item,index)=>(
       <tr><td>{item.label}</td><td><Form.Control
                                              type="text"
                                              id={item.label}
                                             required
                                             onInput={(e)=>handleClickPrice(e)}
                                            /></td><td><Form.Control
                                            type="text"
                                            id={item.label}
                                            onInput={(e)=>handleClickItems(e)}
                                           required
                                          /></td></tr>
                        
                                    ))}
                                    </tbody>
                                    </Table>
                                           
                                </Col>:""}
                               
                            </Row>
                            {/* <Row>
                                <Col></Col>
                            </Row> */}
                             {view?
                            <Row>
                                <Col> <div className="mb-2 p-2">
                                <button className='btn btn-primary me-2  ' onClick={()=>props.setStep(1)} >Back</button>
                                <button className='btn btn-primary me-2  '
                                 onClick={(e)=>{
                                    props.onSubmit(e,productArr)}} >Submit</button>
                                </div></Col> 
                            </Row> :""
                             }              
                           
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AddCategoryToBranches;