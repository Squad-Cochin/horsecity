import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter_page } from "../../../features/listingFilter/listingFilter";
import listingDataApi from "../../../pages/api/listingDataApi";
import { add_list_data } from "../../../features/listData/listData";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ searchData, setSearchData ] = useState({});
  const { list_data } = useSelector((state) => state.listData) || {};
  const { price_from, price_to, sort, limit, page, suppliers } = useSelector((state) => state.listingFilter) || {};
  const dispatch = useDispatch();

  useEffect(()=>{
    initialLoad()
  },[price_from, price_to, sort, limit, suppliers])
  

  async function initialLoad(){
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    setSearchData(search)
    dispatch(filter_page(1))
  }

  const handlePageClick = (pageNumber) => {
    dispatch(filter_page(pageNumber))
    setCurrentPage(pageNumber);
    updateListData(pageNumber);
  };

  async function updateListData(pageNumber){
    let reqObj = {
      "trip_type": searchData.trip_type,
      "number_of_horses": searchData.number_of_horses,
      "price_from": price_from,
      "price_to" : price_to,
      "suppliers" : searchData.suppliers,
      "sort" : sort,
      "page" : pageNumber,
      "limit" : limit
    }
    console.log("reqw", reqObj)
    let packageList = await listingDataApi(reqObj)
    console.log("response",packageList)
    dispatch(add_list_data(packageList))
  }

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

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>

          {/* <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
              1 – 20 of 300+ properties found
            </div>
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
