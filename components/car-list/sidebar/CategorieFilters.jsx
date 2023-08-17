import { useSelector, useDispatch } from "react-redux";
import { addTripType } from "../../../features/search/initalSearch";
import { useEffect } from "react";
import { useState } from "react";
 
const CategorieFilters = () => {
  const { price_from, price_to, suppliers, sort, limit } = useSelector((state) => state.listingFilter) || {};
  const [ trip_type, setTrip_type ] = useState([])
  const [ searchData, setSearchData ] = useState({})
  useEffect(()=>{
    initialLoad();
  },[])
  async function initialLoad(){
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    console.log("Ss",search)
    setTrip_type(search.trip_type)
    setSearchData(search)
  }
  // dispatch(addTripType(trip_type_data))
  
  

  let data = [
    {
      name : "Private",
      value : "PRIVATE"
    },
    {
      name : "GCC",
      value : "GCC"
    },
    {
      name : "Public",
      value : "PUBLIC"
    },
  ]  

  async function checkType(val){
    console.log(val,"val")
    if(trip_type.includes(val)){
      const newArray = trip_type.filter(value => value !== val);
      // let search_data = search;
      setTrip_type(newArray)
      let modifiedData = searchData;
      modifiedData.trip_type = newArray
      setSearchData(modifiedData)
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      // await dispatch(addTripType(newArray))
      applySearch(newArray)
    }else{
      const newArray = [...trip_type];
      newArray.push(val);
      setTrip_type(newArray)
      let modifiedData = searchData;
      modifiedData.trip_type = newArray
      setSearchData(modifiedData)
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      applySearch(modifiedData)
    }
  }

  async function applySearch(val){
    console.log("trip_type",val)
    let reqObj = {
      trip_type : val.trip_type,
      number_of_horses : val.number_of_horses,
      price_from : price_from,
      price_to : price_to,
      suppliers : suppliers,
      sort : sort,
      page : 1,
      limit : limit
    };
    console.log("reqObj",reqObj)
  } 
  return (
    <>
      {data.map((item) => {
        return(
          <div className="row y-gap-10 items-center justify-between">
            <div className="col-auto">
              <div className="form-checkbox d-flex items-center">
                {trip_type.includes(item.value) ? 
                  <input type="checkbox" onChange={ () => {checkType(item.value); }} checked /> 
                : <input type="checkbox" onChange={ () => {checkType(item.value); }}/>
                }
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
                <div className="text-15 ml-10">{item.name}</div>
              </div>
            </div>
          </div>
        )})}
    </>
  );
};

export default CategorieFilters;
