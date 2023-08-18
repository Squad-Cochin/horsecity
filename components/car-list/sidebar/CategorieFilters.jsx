import { useSelector, useDispatch } from "react-redux";
import { addTripType } from "../../../features/search/initalSearch";
import { useEffect,useState } from "react";
import { add_list_data } from "../../../features/listData/listData";
import listingDataApi from "../../../pages/api/listingDataApi";
 
const CategorieFilters = () => {
  const { price_from, price_to, suppliers, sort, limit, page } = useSelector((state) => state.listingFilter) || {};
  const [ trip_type, setTrip_type ] = useState([])
  const [ searchData, setSearchData ] = useState({})
  const dispatch = useDispatch();
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
    if(trip_type?.includes(val)){
      const newArray = trip_type.filter(value => value !== val);
      setTrip_type(newArray);
      let modifiedData = searchData;
      modifiedData.trip_type = newArray;
      setSearchData(modifiedData);
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      // await dispatch(addTripType(newArray))
      updateListData(modifiedData);
    } else {
      const newArray = [...trip_type];
      newArray.push(val);
      setTrip_type(newArray);
      let modifiedData = searchData;
      modifiedData.trip_type = newArray;
      setSearchData(modifiedData);
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      updateListData(modifiedData);
    }
  }

  async function updateListData(search){
    let reqObj = {
      "trip_type": search.trip_type,
      "number_of_horses": search.number_of_horses,
      "price_from": price_from,
      "price_to" : price_to,
      "suppliers" : suppliers,
      "sort" : sort,
      "page" : page,
      "limit" : limit
    }
    console.log("req", reqObj)
    let packageList = await listingDataApi(reqObj)
    console.log("response",packageList)
    dispatch(add_list_data(packageList))
  }

  return (
    <>
      {data.map((item, index) => {
        return(
          <div key={index} className="row y-gap-10 items-center justify-between">
            <div className="col-auto">
              <div className="form-checkbox d-flex items-center">
                {trip_type?.includes(item.value) ? 
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
