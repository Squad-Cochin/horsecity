///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for search to pagination in LISTING page                           //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter_page } from "../../../features/listingFilter/listingFilter";
import listingDataApi from "../../../pages/api/listingDataApi";
import { add_list_data } from "../../../features/listData/listData";

// Function for pagination in listing
const Pagination = () => {
  const { list_data } = useSelector((state) => state.listData) || {};
  const { price_from, price_to, sort, limit, page, suppliers } = useSelector((state) => state.listingFilter) || {};
  const dispatch = useDispatch();

  useEffect(()=>{
    initialLoad()
  },[price_from, price_to, sort, limit, suppliers])
  

  // Function for work only at the initial load of the page
  async function initialLoad(){
    dispatch(filter_page(1))
  }

  // Function for onclick in pagination numbers
  const handlePageClick = async (pageNumber) => {
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    dispatch(filter_page(pageNumber))
    updateListData(pageNumber, search);
  };

  // Function for listing packages with new page number
  async function updateListData(pageNumber, search){
    let reqObj = {
      "trip_type": search.trip_type,
      "number_of_horses": search.number_of_horses,
      "price_from": price_from,
      "price_to" : price_to,
      "suppliers" : suppliers,
      "sort" : sort,
      "page" : pageNumber,
      "limit" : limit
    }
    let packageList = await listingDataApi(reqObj)
    dispatch(add_list_data(packageList))
  }

  // Function for style page numbers
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

  // Function for loop page numbers
  const renderPages = () => {
    const totalPages =  Math.ceil(list_data?.totalCount / limit); // Change this to the actual total number of pages
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === page)
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

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
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
