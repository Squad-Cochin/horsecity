
import { useSelector, useDispatch } from "react-redux";
import { filter_suppliers } from "../../../features/listingFilter/listingFilter";
import { useEffect } from "react";
import serviceProvidersApi from "../../../pages/api/serviceProvidersApi";
import axios from "axios";
import { useState } from "react";
import { add_list_data } from "../../../features/listData/listData";
import listingDataApi from "../../../pages/api/listingDataApi";

const SupplierFilters = () => {
  const { price_from, price_to, sort, page, limit, suppliers } = useSelector((state) => state.listingFilter) || {};
  // const [ suppliers, setSuppliers ] = useState([])
  const [ suppliersData, setSuppliersData ] = useState([]);
  const [ searchData, setSearchData ] = useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    initialLoad()
  },[])
  
  async function initialLoad(){
    // setSearchData(search)
    // console.log("searchsearch",search)
    // setSuppliersData(search.suppliers)
    let packageList = await serviceProvidersApi()
    console.log("response",packageList)
    setSuppliersData(packageList)
  }

  async function checkType(val){
    console.log(val,"val")
    console.log("suppliersData",suppliers)
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    if(suppliers.includes(val)){
      console.log("yes")
      const newArray = suppliers.filter(value => value !== val);
      
      // setSuppliersData(newArray);
      let modifiedData = search;
      modifiedData.suppliers = newArray;
      // setSearchData(modifiedData);
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      dispatch(filter_suppliers(newArray))
      // applySearch(newArray);
      updateListData(modifiedData);
    } else {
      console.log("no")
      const newArray = [...suppliers];
      newArray.push(val);
      dispatch(filter_suppliers(newArray))
      // setSuppliersData(newArray);
      let modifiedData = search;
      modifiedData.suppliers = newArray;
      // setSearchData(modifiedData);
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      // applySearch(modifiedData);
      updateListData(modifiedData);
    }
  }

  async function updateListData(modifiedData){
    let reqObj = {
      "trip_type": modifiedData.trip_type,
      "number_of_horses": modifiedData.number_of_horses,
      "price_from": price_from,
      "price_to" : price_to,
      "suppliers" : modifiedData.suppliers,
      "sort" : sort,
      "page" : page,
      "limit" : limit
    }
    console.log("reqqqqq", reqObj)
    let packageList = await listingDataApi(reqObj)
    console.log("response",packageList)
    dispatch(add_list_data(packageList))
  }

  return (
    <>
      {suppliersData?.map((val, index) => {
        return(
        <div key={index} className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" onChange={ () => {checkType(val.id); }} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{val.user_name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{val.vehicle_count}</div>
          </div>
        </div>
      )})}
      
      
    </>
  );
};

export default SupplierFilters;
