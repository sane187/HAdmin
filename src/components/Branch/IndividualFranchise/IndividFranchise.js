import React, { useEffect, useState } from "react";
import { Card, Col, Container, Modal, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBranch } from "../../../store/actionCreators/Branch/BranchAction";
import NoData from "../../NoData";
import Unauthorized from "../../unauthorized";
import EditBranchModal from "../EditBranch";
import BigCard from "./BigCard";
import { deleteBranch } from "./../../../store/actionCreators/Branch/BranchAction";
import { useParams } from "react-router-dom";
import { getSingleFranchise } from "../../../store/actionCreators/Franchise/AddNewFranchiseAction";
import AddcategoryModal from "./AddCategoryModal";

const IndividFranchise = (props) => {
  const [branchArray, setBranchArray] = useState([]);
  const dispatch = useDispatch();
  const branchData = useSelector((state) => state.single_branch);
  const single_franchise = useSelector((state) => state.single_franchise);

  const [currentFilter, setCurrentFilters] = useState({
    branch: { branch_name: "", branch_id: "" },
  });
  const [branchModal, setBranchModal] = useState(false);
  const params = useParams();
  const [categoryModal, setCategoryModal] = useState(false);
  const [categoryObj, setCategoryObj] = useState({});

  const createCategoryObj = () => {
    if (branchData.data && branchData.data.categories) {
      const co = {};
      branchData.data.categories.forEach((c) => {
        co[c.category_list_id] = true;
      });
      setCategoryObj(co);
    }
  };

  useEffect(() => {
    createCategoryObj();
  }, [branchData]);

  useEffect(() => {
    dispatch(getSingleFranchise(params.franchise_id));
  }, []);
  useEffect(() => {
    if (
      single_franchise &&
      single_franchise.branches &&
      single_franchise.branches[0]
    ) {
      dispatch(getSingleBranch(single_franchise.branches[0].branch_id));
    }
    setBranchArray(single_franchise.branches);
  }, single_franchise);
  useEffect(() => {
    dispatch(getSingleBranch(currentFilter.branch.branch_id));
  }, [currentFilter]);

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
  console.log(props);
  const handleBranchChange = (e) => {
    let item = JSON.parse(e.target.value);
    setCurrentFilters({
      ...currentFilter,
      branch: { branch_name: item[0], branch_id: item[1] },
    });
  };

  const deleteSelectedBranch = () => {
    const confirm = prompt(
      "Are you sure you want to delete the selected branch ? Type yes to continue"
    );
    if (confirm === "yes") {
      dispatch(deleteBranch(branchData.data.branch_id));
    }
  };

  const BigCard1 = () => {
    if (branchData.status === "success") {
      if (branchData.data.categories) {
        return branchData.data.categories.map((item, index) => {
          return (
            <BigCard
              key={index}
              item={item}
              index={index}
              branch_id={branchData.data.branch_id}
              franchise_id={single_franchise.franchise_id}
            />
          );
        });
      }
    }
  };
  const main = () => {
    if (props.viewPermission) {
      if (single_franchise.branches && branchData.data) {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <Row>
              <Col lg={6} sm={6} xs={12} className="dash-head">
                Franchise Dashboard
              </Col>
              <Col lg={4} sm={6} xs={12}>
                <Row>
                  {" "}
                  <Col>
                    <div className="form-group drop-dash w-100">
                      <Button
                        className="btn btn-warning btn-sm"
                        onClick={deleteSelectedBranch}
                      >
                        Delete Selected Branch
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    {" "}
                    <div className="form-group drop-dash w-100">
                      <Button
                        className="btn btn-warning btn-sm"
                        onClick={() => setBranchModal(true)}
                      >
                        Edit Selected Branch
                      </Button>
                    </div>
                    <EditBranchModal
                      data={branchData.data}
                      show={branchModal}
                      close={() => setBranchModal(false)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={2} sm={6} xs={12}>
                <Row>
                  <Col>
                    <div className="form-group drop-dash w-100">
                      {/* <div className="" style={{ marginLeft: "1rem" }}> */}
                      <select
                        className="form-control form-select form-select-sm"
                        name="year"
                        onChange={handleBranchChange}
                      >
                        {BranchDrop()}
                      </select>
                      {/* </div> */}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <Card style={{ backgroundColor: "#518BFF", color: "white" }}>
                  <Card.Body>
                    <div className="d-flex">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-truncate font-size-14 mb-2 text-light">
                          Franchise Name
                        </p>
                        <h4 className="mb-0">
                          {single_franchise.franchise_name}
                        </h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <Card style={{ backgroundColor: "#FFC257", color: "white" }}>
                  <Card.Body>
                    <div className="d-flex">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-truncate font-size-14 mb-2 text-light">
                          Current Selected Branch
                        </p>
                        <h4 className="mb-0">{branchData.data.branch_name}</h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <Card style={{ backgroundColor: "#FF7FAF", color: "white" }}>
                  <Card.Body>
                    <div className="d-flex">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-truncate font-size-14 mb-2 text-light">
                          Location
                        </p>
                        <h4 className="mb-0">{single_franchise.location}</h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <Card style={{ backgroundColor: "#8254FF", color: "white" }}>
                  <Card.Body>
                    <div className="d-flex">
                      <div className="flex-1 overflow-hidden">
                        <p className="text-truncate font-size-14 mb-2 text-light">
                          Number of Branches
                        </p>
                        <h4 className="mb-0">{single_franchise.no_branches}</h4>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl={12} sm={12} className="mt-4 mb-4">
                <Card
                  className=""
                  style={{ backgroundColor: "#fff", color: "grey" }}
                >
                  <Card.Body className="p-3 d-flex">
                    <h5 className="my-auto">
                      <b>Products And Categories</b>
                    </h5>
                    <div className="ml-auto" style={{ marginLeft: "auto" }}>
                      <Button
                        onClick={() => setCategoryModal(true)}
                        className="btn btn-warning"
                      >
                        Add Category{" "}
                      </Button>
                      <AddcategoryModal
                        show={categoryModal}
                        close={() => setCategoryModal(false)}
                        categoryObj={categoryObj}
                        branch_id={branchData.data.branch_id}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>{BigCard1()}</Row>
          </Container>
        );
      } else {
        return (
          <Container
            fluid
            className={props.sideToggle === true ? "closeDash" : "openDash"}
            style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
          >
            <NoData data={"No Franchise Selected "} />
          </Container>
        );
      }
    }
    return <Unauthorized />;
  };
  return <>{main()}</>;
};

export default IndividFranchise;
