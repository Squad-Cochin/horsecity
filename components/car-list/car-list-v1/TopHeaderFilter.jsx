///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                          File using for applay sort in LISTING page                               //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useSelector, useDispatch } from "react-redux";
import { filter_sort } from "../../../features/listingFilter/listingFilter";
import { useState } from "react";
import { useEffect } from "react";
import { add_list_data } from "../../../features/listData/listData";
import listingDataApi from "../../../pages/api/listingDataApi";

// Function for applying sort 
const TopHeaderFilter = () => {
  const dispatch = useDispatch();
  const [ searchData, setSearchData] = useState({})
  const { list_data } = useSelector((state) => state.listData) || {
                                                                      listing_data :[],
                                                                      totalCount : 0
                                                                  } ;
  const { price_from, price_to, suppliers, limit } = useSelector((state) => state.listingFilter) || {};

  useEffect(()=>{
    initialLoad();
  },[])

  // Function for work at the initial page load
  async function initialLoad(){
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    setSearchData(search)
  }

  // Function for handle changes while selecting different sort options
  const handleSelectChange = async (event) => {
    const newValue = event.target.value;
    dispatch(filter_sort(newValue))
    let reqObj = {
      trip_type : searchData.trip_type,
      number_of_horses : searchData.number_of_horses,
      price_from : price_from,
      price_to : price_to,
      suppliers : suppliers,
      sort : newValue,
      page : 1,
      limit : limit
    };
    let packageList = await listingDataApi(reqObj)
    dispatch(add_list_data(packageList))
  };
  
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">{list_data?.totalCount} Results</span>
          </div>
        </div>
        {/* End .col */}

        <div className="col-auto">
          <div className="row x-gap-20 y-gap-20">
            <div className="col-auto">
              <select 
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
                onChange={handleSelectChange}
              >
                  <option value="">Sort</option>
                  <option value="low">Price low to high</option>
                  <option value="high">Price high to low</option>
              </select>
            </div>
            {/* End .col */}

            <div className="col-auto d-none xl:d-block">
              <button
                data-bs-toggle="offcanvas"
                data-bs-target="#listingSidebar"
                className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
              >
                <i className="icon-up-down text-14 mr-10" />
                Filter
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </>
  );
};

export default TopHeaderFilter;