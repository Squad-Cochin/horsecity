///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for search from location box in LISTING page                       //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import { useSelector, useDispatch } from "react-redux";
import { addFromLocation } from "../../../features/search/initalSearch";

// Function for from location
const FromLocationSearch = () => {
  const { from_location } = useSelector((state) => state.initialSearch) || {};
  const dispatch = useDispatch();
  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
          <h4 className="text-15 fw-500 ls-2 lh-16">From</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Start location ?"
              className="js-search js-dd-focus"
              value={from_location}
              onChange={(e) => {dispatch(addFromLocation(e.target.value));}}
            />
          </div>
        {/* End location Field */}
      </div>
    </>
  );
};

export default FromLocationSearch;
