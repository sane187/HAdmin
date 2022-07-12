import React, { useState, useEffect } from "react";
import { Col, Container, Row, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CatBigCards from "./CatBigCards";
import { getSingleBranch } from "./../../../store/actionCreators/Branch/BranchAction";

const AddCatToBranch = (props) => {
  const categories = useSelector((state) => state.categories);
  const branch = useSelector((state) => state.branch);
  const single_branch= useSelector((state) => state.single_branch);
  const [currbranch, setCurrBranch] = useState({});
  const [categoriesObj, setCategoriesObj] = useState({});

  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getSingleBranch(currbranch.branch_id));
},[currbranch])

  const setBranchData = () => {
    let prefilledcategories = {};
    if (single_branch.data) {
      console.log("Branch data found!");
      const prefilledcategoriesArr = single_branch.data.categories;
      prefilledcategoriesArr.forEach((cat) => {
        const productObj = {};
        cat.products.forEach((prod) => {
          productObj[prod.product_list_id] = [prod.items_available,prod.price]
          
        });
        prefilledcategories[cat.category_list_id] = productObj;
      });
    }
    setCategoriesObj(prefilledcategories);
  };

  const setCategory = (category) => {
    const catObj = { ...categoriesObj };
    catObj[category.category_list_id] = category.isChecked ? {} : null;
    setCategoriesObj(catObj);
  };

  const setProduct = (product) => {
    
    const catObj = { ...categoriesObj };
    const prodObj = catObj[product.category_list_id]
      ? catObj[product.category_list_id]
      : {};
    prodObj[product.product_list_id] = [parseInt(product.items_available, 10),parseInt(product.price, 10)] 
    catObj[product.category_list_id] = prodObj;
     setCategoriesObj(catObj);
   
  };

  const BigCard = () => {
   
    if (categories.data) {
      return categories.data.data.map((item, index) => {
        return (
        
          <CatBigCards
            item={item}
            index={index}
            key={item.category_list_id}
            prefilledProducts={categoriesObj[item.category_list_id]}
            isChecked={categoriesObj[item.category_list_id] ? true : false}
            setCategory={setCategory}
            setProduct={setProduct}
          />
        );
      });
    }
  };

  const displayBranches = () => {
    if (branch.data) {
      return branch.data.data.map((item, index) => {
        return (
          <Dropdown.Item
            key={item.branch_id}
            eventKey={`["${item.branch_name}","${item.branch_id}"]`}
          >
            {" "}
            {item.branch_name}
          </Dropdown.Item>
        );
      });
    }
  };
  const handleSelectB = (e) => {
    const item = JSON.parse(e);
    setCurrBranch({ branch_name: item[0], branch_id: item[1] });
    setBranchData();
    // console.log(categoriesObj);
  };

  return (
    <Container
      fluid
      className={props.sideToggle === true ? "closeDash" : "openDash"}
      style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
    >
      <div className="row d-flex justify-content-center">
        <div className="form-container">
          <div className="form-head">Add Categories and Products</div>
          <div className="d-flex">
            <div className="d-flex my-2 mx-auto">
              <label className="my-auto mr-2">
                Select a branch to clone categories and items:{" "}
              </label>
              <DropdownButton
                variant="light"
                title={
                  currbranch.branch_name ? currbranch.branch_name : "Branch"
                }
                id="dropdown-menu-align-right"
                onSelect={handleSelectB}
              >
                {displayBranches()}
              </DropdownButton>
            </div>
          </div>
          <div className="form-body">
            <form>
              <Row className="gx-1">{BigCard()}</Row>
              <Row>
                <Col>
                  {" "}
                  <div className="mb-2 p-2">
                    <button
                      className="btn btn-primary me-2  "
                      onClick={() => props.setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary me-2"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        props.handleSubmit(categoriesObj);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddCatToBranch;
