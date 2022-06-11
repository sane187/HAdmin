import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getGroupList,
  DeleteGroup,
  addNewGroup,
} from "../../store/actionCreators/Groups/GroupsAction";
import { toast } from "react-toastify";

const AllGroups = () => {
  const groups = useSelector((state) => state.groups);
  const group = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const [newGroup, setNewGroup] = useState("");

  const addNewGroupButton = () => {
    if (newGroup === "") {
      toast.error(`Please enter a name for the group`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      dispatch(addNewGroup(newGroup));
    }
  };

  useEffect(() => {
    dispatch(getGroupList());
  }, [group]);

  const deleteSingleGroup = (customer_group_name) => {
    dispatch(DeleteGroup({ customer_group_name }));
  };

  const displayAllGroups = () => {
    if (groups.data && groups.data.status === "success") {
      const group_list = [...groups.data.data];
      return group_list.map((g) =>
        g !== null ? (
          <Col className="col-6 my-2" key={g.customer_group_name}>
            <Card>
              <Card.Body>
                <div className="d-flex">
                  <Link to={`/groups/${g.customer_group_name}`}>
                    <h5 className="h5 my-3 text-dark">
                      {g.customer_group_name}
                    </h5>
                  </Link>
                  <div
                    className="ml-auto my-auto"
                    style={{ marginLeft: "auto" }}
                  >
                    <Button
                      className="btn btn-danger ml-auto"
                      onClick={() => deleteSingleGroup(g.customer_group_name)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          ""
        )
      );
    }
  };

  return (
    <React.Fragment>
      <div className="page-content ">
        <Row>
          <Col className="col-12">
            <Card>
              <Card.Body>
                <Card.Title className="">Add New Group</Card.Title>
                <div className="d-flex">
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setNewGroup(e.target.value)}
                      value={newGroup}
                    />
                  </div>
                  <Button
                    style={{ marginLeft: "1rem" }}
                    className="btn btn-warning"
                    onClick={() => addNewGroupButton()}
                  >
                    ADD GROUP
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
                    All Groups
                  </Card.Title>
                </div>

                <Row>{displayAllGroups()}</Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AllGroups;
