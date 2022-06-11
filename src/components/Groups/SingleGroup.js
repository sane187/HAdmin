import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupCustomerPagination,
  getSingleGroup,
  UpdateSingleGroup,
  DeleteCustomerFromGroup,
  DeleteAllCustomersFromGroup,
  addCustomerToGroup,
} from "./../../store/actionCreators/Groups/GroupsAction";
import GroupCustomerPagination from "./GroupCustomerPagination";
import axios from "axios";
import Async, { useAsync } from "react-select/async";
import { toast } from "react-toastify";

const SingleGroup = () => {
  const params = useParams();
  const group = useSelector((state) => state.group);
  const group_customer_page = useSelector((state) => state.group_customer_page);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newCustomer, setNewCustomer] = useState({});
  const { isLoading, setIsLoading } = useState(false);

  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    if (group.data && group.data.data)
      setGroupName(group.data.data.customer_group_name);
  }, [group]);

  useEffect(() => {
    dispatch(setGroupCustomerPagination(1));
  }, []);

  useEffect(() => {
    dispatch(getSingleGroup(group_customer_page, params.customer_group_name));
  }, [group_customer_page]);

  const deleteCustomer = (group) => {
    dispatch(DeleteCustomerFromGroup(group));
  };

  const deleteAllCustomers = (group) => {
    dispatch(DeleteAllCustomersFromGroup(group));
  };

  const loadData = async (customer) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/admin/all_groups/search_customer?search=${customer}`
      );
      if (res.data && res.data.data) {
        const data = res.data.data.map((c) => ({
          label: `${c.first_name} ${c.last_name ? c.last_name : ""}(${
            c.mobile_no
          })`,
          value: c.mobile_no,
        }));

        return Promise.resolve(data);
      }
    } catch (error) {
      console.log("error", error);
    }

    return Promise.resolve([]);
  };

  const addCustomerButton = () => {
    if (!newCustomer.value) {
      toast.error(
        `Please choose a customer to add, Type customer name or mobile number to search !`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } else {
      dispatch(
        addCustomerToGroup(params.customer_group_name, newCustomer.value)
      );
    }
  };

  const displayAllCustomers = () => {
    if (group.data && group.data.status === "success") {
      const group_list = [...group.data.members];
      return group_list.map((gm) => (
        <Col className="col-6 col-xl-4 my-2" key={gm.customer_no}>
          <Card>
            <Card.Body>
              <div className="d-flex">
                {/* <Link to={`/groups/${g.customer_no}`}> */}
                <h6 className="h5 my-3 text-dark">{gm.customer_no}</h6>
                {/* </Link> */}
                <div className="ml-auto my-auto" style={{ marginLeft: "auto" }}>
                  <Button
                    className="btn btn-danger ml-auto "
                    onClick={() =>
                      deleteCustomer({
                        customer_no: gm.customer_no,
                        customer_group_name: params.customer_group_name,
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ));
    }
  };

  return (
    <React.Fragment>
      <div className="page-content ">
        <Row>
          <Col className="col-12">
            <Card>
              <Card.Body>
                <Card.Title className="mb-4">
                  Add Customer To This Group
                </Card.Title>
                <div className="d-flex">
                  <div className="" style={{ width: "20rem" }}>
                    <Async
                      defaultOptions={[]}
                      cacheOptions={[{ label: "1234", value: "1234" }]}
                      isLoading={isLoading}
                      loadOptions={(e) => loadData(e)}
                      onChange={(e) => setNewCustomer(e)}
                    />
                  </div>
                  <Button
                    style={{ marginLeft: "1rem" }}
                    className="btn btn-warning"
                    onClick={addCustomerButton}
                  >
                    Add Customer
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-12">
            <Card>
              <Card.Body>
                <div className="d-flex">
                  <Card.Title className="h4 mb-4 my-auto">
                    Group data
                  </Card.Title>
                </div>

                <Row className="mb-4">
                  <div className="d-flex">
                    <label className="my-auto h5 ">Customer Group Name </label>
                    <input
                      className="form-control ml-2"
                      type="text"
                      value={groupName}
                      onChange={(e) => {
                        setGroupName(e.target.value);
                      }}
                      style={{ width: "40%", marginLeft: "1rem" }}
                    />
                    <div className="ml-auto" style={{ marginLeft: "auto" }}>
                      <Button
                        className="btn btn-warning ml-auto"
                        style={{ marginRight: "1rem" }}
                        onClick={() => {
                          dispatch(
                            UpdateSingleGroup({
                              ...group.data.data,
                              new_val: groupName,
                            })
                          );
                          navigate("/groups");
                        }}
                      >
                        Update Group Name
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => {
                          dispatch(
                            deleteAllCustomers({
                              customer_group_name: params.customer_group_name,
                            })
                          );
                        }}
                      >
                        Delete All Customers
                      </Button>
                    </div>
                  </div>
                </Row>

                <Row>{displayAllCustomers()}</Row>
                <Row>
                  <GroupCustomerPagination
                    pageNum={
                      group.data.total_customers
                        ? Math.ceil(group.data.total_customers / 10)
                        : 0
                    }
                  />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default SingleGroup;
