import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { get_category_branches,get_product_branch} from "../../../store/actionCreators/Catalog/Catalog";
import NoData from "../../NoData";
import Unauthorized from "../../unauthorized";
import BigCard from "./BigCard";

const IndividualCat = (props) => {
  const dispatch = useDispatch();
  const Branches = useSelector((state) => state.getBranchInCat);
  const jj = useSelector((state) => state.getCurrentCat);
  const branch = useSelector((state) => state.getCurrentBranch);
  const [currbranch, setCurrBranch] = useState(branch);
  const [selected,setSelected]=useState(+false);
  let CategoryData = useSelector((state) => state.getCatByBranch);
  
  
  
  const displayBranches = () => {
    
    if (Branches.data) {
      return Branches.data.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.branch_id}
            eventKey={`["${item.branch.branch_name}","${item.branch_id}"]`}
          > 
            {" "}
            {item.branch.branch_name}
          </Dropdown.Item>
        );
      });
    }
  };

  console.log(CategoryData)

  
  
   
  useEffect(() => {
    dispatch(
      get_product_branch(
      jj.category_list_id));
      if(currbranch.branch){
        dispatch(
          get_category_branches(
            jj.category_list_id,
            currbranch.branch_id
          )
        );
      }
     
     else{
      dispatch(
        get_category_branches(
          jj.category_list_id,
          currbranch[1]
        )
      );
        }
        
           
  }, [currbranch]);
  

  const handleSelectB = (e) => {
    const item = JSON.parse(e);
    setSelected(+true)

    setCurrBranch([item[0], item[1]]);
  };
  
  const BigCard1 = () => {
    if (CategoryData.status === "success") {
      return CategoryData.data.map((item, index) => {
        return <BigCard key={index} item={item} index={index} />;
      });
    }
  };
  const main = () => {
    if (props.viewPermission) {
      if(CategoryData){

      if (
        CategoryData.data.length>0 && 
        Branches.data && branch
      ) {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <Row>
              <Col lg={10} xs={12} className="dash-head">
                DASHBOARD
              </Col>
              <Col lg={2} xs={12}>
                <Row>
                  <Col>
                    {" "}
                    <div className=" p-2 ">
                      <div className="d-flex">
                        <DropdownButton
                          variant="light"
                          title={selected===0?currbranch.branch.branch_name:currbranch[0]}
                          id="dropdown-menu-align-right"
                          onSelect={handleSelectB}
                        >
                          {displayBranches()}
                        </DropdownButton>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xl={6} sm={12} className="mb-4">
                <Card
                  className=""
                  style={{ backgroundColor: "#fff", color: "grey" }}
                >
                  <Card.Body className="">
                    <h5>
                      <b>
                        {jj.category_name} category in{" "}
                        {selected==0? currbranch.branch.branch_name:currbranch[0]}
                      </b>
                    </h5>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>{BigCard1()}</Row>
          </Container>
        );
      } 

      else {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <NoData data="Not Available Currently" />
          </Container>
        );
      }

    }
    else {
      return (
        <Container
          fluid
          className={props.sideToggle === true ? "closeDash" : "openDash"}
          style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
        >
          <NoData data="Not Available Currently" />
        </Container>
      );
    }
   
    }
    
  };
  return <>{main()}</>;
};

export default IndividualCat;
