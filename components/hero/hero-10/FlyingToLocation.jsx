///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                      File using for to location search box in HOME page                           //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToLocation } from "../../../features/search/initalSearch";

// Function for to location searchbox
const FlyingToLocation = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="searchMenu-loc px-24 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">To</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="End location ?"
            className="js-search js-dd-focus"
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value); dispatch(addToLocation(e.target.value))}}
          />
        </div>
      </div>
    </>
  );
};

export default FlyingToLocation;
