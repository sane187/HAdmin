import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const AddNewBranch = (props) => {

  return (
    <Container fluid className={props.sideToggle === true ? "closeDash" : "openDash"} style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }} >
      <div className='row d-flex justify-content-center'>
        <div className='form-container'>
          <div className='form-head'>Add New Branch</div>
          <div className='form-body'>
            <form onSubmit={props.onClickCat}>
              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Branch Name</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.newBranch.BranchName} onChange={props.onChange("BranchName")} required/>
                </div></Col>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">City Name</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.newBranch.city} onChange={props.onChange("city")} required />
                </div></Col>


              </Row>
              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Region</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.newBranch.region} onChange={props.onChange("region")}  required/>
                </div></Col>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" aria-describedby="emailHelp" value={props.newBranch.address} onChange={props.onChange("address")} required/>
                </div></Col>
              </Row>
              <Row>
                <Col> <div className="mb-3 p-2">
                  <label className="form-label">Franchise</label>
                  {props.displayFranchise()}
                </div></Col>
              </Row>
              <div className="p-2"><button className='btn btn-primary' type="submit" >Next</button></div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddNewBranch;