import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerPagination } from '../../store/actionCreators/Customers/CustomerAction';
const CustomerTablePagination = ({pageNum}) => {
    // We start with an empty list of items.
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const itemsPerPage = 10;
    const [currentpage, setCurrentPage] = useState(null);
    const [pageCount, setPageCount] = useState(pageNum);
    const page = useSelector(state => state.customer_page);
    const dispatch=useDispatch();
    useEffect(()=>{
        setPageCount(pageNum)
    },[pageNum])

    const handlePageClick = (event) => {
        dispatch(setCustomerPagination(event.selected + 1))// const newOffset = (event.selected * itemsPerPage) % items.length;
        setCurrentPage(event.selected + 1)
        console.log(
            `User requested page number ${event.selected + 1}, which is offset `
        );

    };

    return (
        <div className='container '>

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
                forcePage={page-1}
            />
        </div>
    );
};

export default CustomerTablePagination;