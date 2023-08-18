import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import FlyingFromLocation from "./FlyingFromLocation";
import FlyingToLocation from "./FlyingToLocation";

const MainFilterSearchBox = () => {
  const { from_location, to_location, departDate, returnDate, trip, trip_type, number_of_horses } = useSelector((state) => state.initialSearch) || {};

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
    console.log("before",searchObject)
    localStorage.setItem('searchObject', JSON.stringify(searchObject));
    if(number_of_horses && number_of_horses != "" && number_of_horses != 0 && trip_type && trip_type != [] && trip && trip != ""){
      Router.push("/car/car-list-v1")
    }
    
    // return false;
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

          {/* <GuestSearch /> */}
          {/* End guest */}

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
