///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//               File using for from, to, travelling dates search box in HOME page                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import DateSearch from "../DateSearch";
import FlyingFromLocation from "./FlyingFromLocation";
import FlyingToLocation from "./FlyingToLocation";
import { useEffect } from "react";
import { filter_tripType, filter_number_of_horses, filter_price_from, filter_price_to, filter_suppliers, filter_sort, filter_page } from "../../../features/listingFilter/listingFilter";

// Function for main filter searchbox
const MainFilterSearchBox = () => {
  const { from_location, to_location, departDate, returnDate, trip, trip_type, number_of_horses } = useSelector((state) => state.initialSearch) || {};
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(filter_tripType([]));
    dispatch(filter_number_of_horses(""));
    dispatch(filter_price_from(0));
    dispatch(filter_price_to(2000));
    dispatch(filter_suppliers([]));
    dispatch(filter_sort(""));
    dispatch(filter_page(1));
  })

  // Function for save location while make a click on search and redirect to the listing
  function saveLocal(){
    let searchObject = {
      "from_location" : from_location,
      "to_location" : to_location,
      "departDate" : departDate,
      "returnDate" : returnDate,
      "trip" : trip,
      "suppliers" : [],
      "trip_type" : trip_type,
      "number_of_horses" : number_of_horses
    }
    localStorage.setItem('searchObject', JSON.stringify(searchObject));
    if(number_of_horses && number_of_horses != "" && number_of_horses != 0 && trip_type && trip_type != [] && trip && trip != ""){
      Router.push("/package/listing")
    }
  }
  return (
    <>
      <div className="mainSearch -col-4 -w-1070 bg-white shadow-1 rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
        <div className="button-grid items-center">
          <FlyingFromLocation />
          {/* End Location Flying From */}

          <FlyingToLocation />
          {/* End Location Flying To */}

          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Depart</h4>
              <DateSearch use="fromDate" />
            </div>
          </div>
          {/* End Depart */}
          {trip === "Return Also" ? 
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Return</h4>
              <DateSearch use="toDate"/>
            </div>
          </div>
          : null }
          {/* End Return */}

          <div className="button-item">
            <button
              className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-dark-1 text-white"
              onClick={() => { saveLocal() ;}}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
