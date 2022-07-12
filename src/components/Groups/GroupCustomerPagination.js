import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setGroupCustomerPagination } from "./../../store/actionCreators/Groups/GroupsAction";

const GroupCustomerPagination = ({ pageNum, onPageChange }) => {
  // const [currentpage, setCurrentPage] = useState(null);
  const [pageCount, setPageCount] = useState(pageNum);
  const page = useSelector((state) => state.customer_page);
  const dispatch = useDispatch();
  useEffect(() => {
    setPageCount(pageNum);
  }, [pageNum]);

  const handlePageClick = (event) => {
    dispatch(setGroupCustomerPagination(event.selected + 1));
    // onPageChange(event.selected + 1);
  };

  return (
    <div className="container ">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page - 1}
      />
    </div>
  );
};

export default GroupCustomerPagination;
