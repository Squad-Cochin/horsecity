///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File using for main search bar at the top of LISTING page                        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import DateSearch from "../common/DateSearch";
import { useSelector } from "react-redux";
import FromLocationSearch from "../common/FromLocationSearch";
import ToLocationSearch from "../common/ToLocationSearch";
import { useEffect, useState } from "react";

// Function for main filter serch box component
const MainFilterSearchBox = () => {
  const { from_location, to_location, departDate, returnDate } = useSelector((state) => state.initialSearch) || {};
  const [ searchData, setSearchData ] = useState({})
  useEffect(() => {
    async function initialLoad(){
      const search = await JSON.parse(localStorage.getItem('searchObject'));
      setSearchData(search)
    }
    initialLoad();
  },[])

  // Function for storing the search bar details in to localstorage
  function saveLocal(){
    if(from_location != ""){
      searchData.from_location = from_location;
    }
    if(to_location != ""){
      searchData.to_location = to_location;
    }
    if(departDate != ""){
      searchData.departDate = departDate;
    }
    if(returnDate != ""){
      searchData.returnDate = returnDate;
    }
    localStorage.setItem('searchObject', JSON.stringify(searchData));
  }
  
  return (
    <>
      <div className="mainSearch -col-5 border-light bg-white px-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center">
          <FromLocationSearch />
          {/* End Pickup Location */}

          <ToLocationSearch /> 
          {/* End Drop off location  */}
          {searchData?.trip === "Return Also" || searchData?.trip === "One Way" ? 
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>

              <h4 className="text-15 fw-500 ls-2 lh-16">Depart</h4>
              {Object.keys(searchData).length > 0 && searchData?.departDate != "" ? <DateSearch use = "fromDate" dateDate = {searchData?.departDate}/> : <DateSearch use = "fromDate" dateDate = {new Date}/>}
            </div>
          </div>
          : null }
          {/* End Pick Up Date */}
          {searchData?.trip === "Return Also" ? 
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Return</h4>
              {Object.keys(searchData).length > 0 && searchData?.returnDate != "" ? <DateSearch use = "toDate" dateDate = {searchData?.returnDate}/> : <DateSearch use = "toDate" dateDate = {new Date}/>}
            </div>
          </div>
          : null}   
          {/* EndDrop off Date */}

          <div className="button-item">
            <button 
              className="mainSearch__submit button -dark-1 py-20 px-35 col-12 rounded-4 bg-yellow-1 text-dark-1"
              onClick={() => { saveLocal() ;}}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
