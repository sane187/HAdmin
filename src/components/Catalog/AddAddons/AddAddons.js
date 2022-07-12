import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { addNewAddon } from "../../../store/actionCreators/Catalog/Catalog";
import Unauthorized from "../../unauthorized";
const AddAddons = (props) => {
  const [addon, setAddon] = useState("");
  const [type, setType] = useState("radio");


  const [serviceList, setServiceList] = useState([
    { title: "", price: 0, order: 0, sku: "" },
  ]);

  

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    if (name === "title") {
      list[index][name] = value;
    } else {
      list[index][name] = parseInt(value);
    }
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    console.log(serviceList);
    setServiceList([
      ...serviceList,
      { title: "", price: 0, order: 0, sku: "" },
    ]);
  };
  const handleSubmit = (e) => {
    addNewAddon(addon,type,serviceList);
    console.log(addon, serviceList);
    e.preventDefault();
  };
  if (props.editPermission)
    return (
      <Container
        fluid
        className={props.sideToggle === true ? "closeDash" : "openDash"}
        style={{ paddingTop: "95px", backgroundColor: "#F1F5F7" }}
      >
        <div className="row d-flex justify-content-center">
          <div className="form-container">
            <div className="form-head">Add New Addons</div>
            <div className="form-body">
              <form>
                <Row>
                  <Col>
                    {" "}
                    <div className="mb-1 p-2">
                      <label className="form-label">Addon Title</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={addon}
                        onChange={(e) => {
                          setAddon(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="addontype px-2 mb-1">
                     <p className="mb-1 me-2">Addon Type</p> 
                     <select className="form-select" onClick={(e)=>setType(e.target.value)}>
  <option value="radio">Radio</option>
  <option value="checkbox">Checkbox</option>
 
</select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-2 p-2">
                    <small className="p-2">Add Options to the Addon</small>
                  </Col>
                </Row>
                <Row>
                  {serviceList.map((singleService, index) => (
                    <div key={index} className="services">
                      <Row>
                        <Col xl={3} md={6} sm={12}>
                          <div className="mb-3 p-2">
                            <label className="form-label">Title</label>
                            <input
                              name="title"
                              type="text"
                              id="service"
                              className="form-control"
                              value={singleService.service}
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            />
                          </div>

                        </Col>
                        <Col xl={3} md={6} sm={12}>
                          <div className="mb-3 p-2">
                            <label className="form-label">Price</label>
                            <input
                              name="price"
                              type="text"
                              className="form-control"
                              id="service"
                              value={singleService.service}
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            />
                          </div>
                        </Col>
                        <Col xl={3} md={6} sm={12}>
                          <div className="mb-3 p-2">
                            <label className="form-label">Order</label>
                            <input
                              name="order"
                              type="text"
                              className="form-control"
                              id="service"
                              value={singleService.service}
                              onChange={(e) => handleServiceChange(e, index)}
                              required
                            />
                          </div>
                        </Col>
                        <Col xl={3} md={6} sm={12}>
                          <div className="mb-3 p-2">
                            <label className="form-label">SKU</label>
                            <div className="d-flex ">
                              <input
                                name="sku"
                                type="text"
                                className="form-control"
                                id="service"
                                value={singleService.service}
                                onChange={(e) => handleServiceChange(e, index)}
                                required
                                style={{ display: "inline" }}
                              />

                              {serviceList.length !== 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleServiceRemove(index)}
                                  className="btn btn-danger m-0 p-0 ms-3"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <span>-</span>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="second-division"></div>
                        </Col>
                      </Row>
                      {serviceList.length - 1 === index && (
                        <button
                          type="button"
                          onClick={handleServiceAdd}
                          className="btn btn-info ms-2"
                        >
                          <span>Add new options</span>
                        </button>
                      )}
                    </div>
                  ))}
                </Row>
                <div className="p-2">
                  <button className="btn btn-primary " onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  return <Unauthorized />;
};

export default AddAddons;
