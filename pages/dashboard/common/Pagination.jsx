import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wishlist_page } from "../../../features/wishlist/wishlist";
const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { limit } = useSelector((state) => state.listingFilter) || {};
  const { total_count } = useSelector((state) => state.wishlist) || {};
  const dispatch = useDispatch();
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(wishlist_page({page : pageNumber}))

  };

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

  const renderPages = () => {
    const totalPages =  Math.ceil(total_count/ limit);
    //  Math.ceil(list_data?.totalCount / limit); // Change this to the actual total number of pages
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
          {/* <button className="button -blue-1 size-40 rounded-full border-light">
            <i className="icon-chevron-left text-12" />
          </button> */}
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
            {/* <div className="col-auto">
              <div className="size-40 flex-center rounded-full">...</div>
            </div>
            <div className="col-auto">
              <div className="size-40 flex-center rounded-full">20</div>
            </div> */}
          </div>

          {/* <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div> */}
        </div>

        <div className="col-auto md:order-2">
          {/* <button className="button -blue-1 size-40 rounded-full border-light">
            <i className="icon-chevron-right text-12" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Pagination;