import DateSearch from "../common/DateSearch";
import { useSelector, useDispatch } from "react-redux";
import GuestSearch from "../common/GuestSearch";
import FromLocationSearch from "../common/FromLocationSearch";
import ToLocationSearch from "../common/ToLocationSearch";
import { useEffect, useState } from "react";

const MainFilterSearchBox = () => {
  const { from_location, to_location, departDate, returnDate } = useSelector((state) => state.initialSearch) || {};
  const [ searchData, setSearchData ] = useState({})
  useEffect(() => {
    async function initialLoad(){
      const search = await JSON.parse(localStorage.getItem('searchObject'));
      console.log("Dd",search)
      setSearchData(search)
      // console.log("searchh",search)
    }
    initialLoad();
  },[])

  
  // console.log("searchData",searchData)
  function saveLocal(){
    // console.log("before",searchData)
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
    console.log("ss",searchData)
    localStorage.setItem('searchObject', JSON.stringify(searchData));
    // return false;
  }
  
  return (
    <>
      <div className="mainSearch -col-5 border-light bg-white px-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center">
          {Object.keys(searchData).length > 0 ? <FromLocationSearch from_location = {searchData?.from_location}/> : <FromLocationSearch from_location = ''/>}
          {/* End Pickup Location */}

          {Object.keys(searchData).length > 0 ? <ToLocationSearch to_location = {searchData?.to_location}/> : <ToLocationSearch to_location = ''/>}
          {/* End Drop off location  */}
          {searchData?.trip === "Return Also" || searchData?.trip === "One Way" ? 
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>

              <h4 className="text-15 fw-500 ls-2 lh-16">Depart</h4>
              {Object.keys(searchData).length > 0 && searchData?.departDate != "" ? <DateSearch use = "fromDate" dateDate = {searchData?.departDate}/> : <DateSearch use = "fromDate" dateDate = {new Date}/>}
              {/* <DateSearch dateDate = {searchData?.departDate}/> */}
            </div>
          </div>
          : null }
          {/* : null}  */}
          {/* End Pick Up Date */}
          {searchData?.trip === "Return Also" ? 
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Return</h4>
              {Object.keys(searchData).length > 0 && searchData?.returnDate != "" ? <DateSearch use = "toDate" dateDate = {searchData?.returnDate}/> : <DateSearch use = "toDate" dateDate = {new Date}/>}
              {/* <DateSearch dateDate = {searchData?.returnDate}/> */}
            </div>
          </div>
          : null}   
          {/* EndDrop off Date */}

          {/* <GuestSearch /> */}
          {/* End guest */}

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
