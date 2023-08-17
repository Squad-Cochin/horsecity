import { useSelector, useDispatch } from "react-redux";
import { filter_sort } from "../../../features/listingFilter/listingFilter";
import { useState } from "react";
import { useEffect } from "react";

const TopHeaderFilter = () => {
  const dispatch = useDispatch();
  const [ searchData, setSearchData] = useState({})
  // const { trip_type, number_of_horses } = useSelector((state) => state.initialSearch) || {};
  useEffect(()=>{
    initialLoad();
  },[])
  async function initialLoad(){
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    console.log("Ss",search)
    setSearchData(search)
  }
  const { price_from, price_to, suppliers, limit } = useSelector((state) => state.listingFilter) || {};
  const handleSelectChange = (event) => {
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
    console.log("req",reqObj)
  };
  return (
    <>
      <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="text-18">
            <span className="fw-500">3,269 Results</span>
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
