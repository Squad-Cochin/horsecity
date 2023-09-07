///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for sidebar supplier filter in LISTING page                        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useSelector, useDispatch } from "react-redux";
import { filter_suppliers } from "../../../features/listingFilter/listingFilter";
import { useEffect } from "react";
import serviceProvidersApi from "../../../pages/api/serviceProvidersApi";
import { useState } from "react";
import { add_list_data } from "../../../features/listData/listData";
import listingDataApi from "../../../pages/api/listingDataApi";

// Function for supplier filter
const SupplierFilters = () => {
  const { price_from, price_to, sort, page, limit, suppliers } = useSelector((state) => state.listingFilter) || {};
  const [ suppliersData, setSuppliersData ] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    initialLoad()
  },[])
  
  // Function for initial load of the page for showing service providers list
  async function initialLoad(){
    let packageList = await serviceProvidersApi()
    setSuppliersData(packageList)
  }

  // Function for onclick of the check box
  async function checkType(val){
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    if(suppliers.includes(val)){
      const newArray = suppliers.filter(value => value !== val);
      let modifiedData = search;
      modifiedData.suppliers = newArray;
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      dispatch(filter_suppliers(newArray))
      updateListData(modifiedData);
    } else {
      const newArray = [...suppliers];
      newArray.push(val);
      dispatch(filter_suppliers(newArray))
      let modifiedData = search;
      modifiedData.suppliers = newArray;
      localStorage.setItem('searchObject', JSON.stringify(modifiedData));
      updateListData(modifiedData);
    }
  }

  // Function for getting new package list on the basis of new filter list
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
    let packageList = await listingDataApi(reqObj)
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
