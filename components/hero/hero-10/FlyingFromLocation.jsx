///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                      File using for from location search box in HOME page                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFromLocation } from "../../../features/search/initalSearch";

// Function for from location searchbox
const FlyingFromLocation = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <div className="searchMenu-loc px-24 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">From</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Start location ?"
            className="js-search js-dd-focus"
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value); dispatch(addFromLocation(e.target.value))}}
          />
        </div>
      </div>
    </>
  );
};

export default FlyingFromLocation;
