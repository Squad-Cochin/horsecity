///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                        File for showing the pagination in DASHBORD pages                          //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wishlist_page } from "../../../features/wishlist/wishlist";

// Function for showing pagination
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { limit } = useSelector((state) => state.listingFilter) || {};
  const { total_count } = useSelector((state) => state.wishlist) || {};
  const dispatch = useDispatch();

  // Function for pagenumber's onclick  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(wishlist_page({page : pageNumber}))
  };

  // Function for showing the page number
  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  // Function for calulating number for pages
  const renderPages = () => {
    const totalPages =  Math.ceil(total_count/ limit);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i); 
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage)
    );
    return pages;
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
          </div>
        </div>

        <div className="col-auto md:order-2">
        </div>
      </div>
    </div>
  );
};

export default Pagination;
