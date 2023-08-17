
import { useSelector, useDispatch } from "react-redux";
import { filter_suppliers } from "../../../features/listingFilter/listingFilter";
import { useEffect } from "react";
import serviceProvidersApi from "../../../pages/api/serviceProvidersApi";
import axios from "axios";
import { useState } from "react";

const SupplierFilters = () => {
  const [ suppliers, setSuppliers ] = useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
    initialLoad()
  },[])
  
  async function initialLoad(){
    let packageList = await serviceProvidersApi()
    console.log("response",packageList)
    setSuppliers(packageList)
    // let details = await axios.get(`/api/serviceProvidersApi`);
  }
  return (
    <>
      {suppliers?.map((val) => {
        return(
        <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" />
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
      
      {/* End .row */}
      {/* <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Budget</div>
          </div>
        </div> */}
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">45</div>
        </div> */}
      {/* </div> */}
      {/* End .row */}
      {/* <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" onChange={()=> {}} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Sixt</div>
          </div>
        </div> */}
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">21</div>
        </div> */}
      {/* </div> */}
      {/* End .row */}
      {/* <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Europcar</div>
          </div>
        </div> */}
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">78</div>
        </div> */}
      {/* </div> */}
      {/* End .row */}
      {/* <div className="row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <div className="text-15 ml-10">Enterprise</div>
          </div>
        </div> */}
        {/* <div className="col-auto">
          <div className="text-15 text-light-1">679</div>
        </div> */}
      {/* </div> */}
      {/* End .row */}
    </>
  );
};

export default SupplierFilters;
