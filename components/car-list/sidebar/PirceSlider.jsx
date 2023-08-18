import { useState } from "react";
import InputRange from "react-input-range";
import { useSelector, useDispatch } from "react-redux";
import { filter_price_from, filter_price_to } from "../../../features/listingFilter/listingFilter";
import { add_list_data } from "../../../features/listData/listData";
import listingDataApi from "../../../pages/api/listingDataApi";

const PirceSlider = () => {
  const dispatch = useDispatch();
  const { price_from, price_to, suppliers, sort, page, limit } = useSelector((state) => state.listingFilter) || {};
  const [price, setPrice] = useState({
    value: { min: 0, max: 2000 },
  });

  const handleOnChange = (value) => {
    setPrice({ value });
    dispatch(filter_price_from(value.min))
    dispatch(filter_price_to(value.max))
    applySearch(value)
  };

  async function applySearch(val){
    console.log("min",val.min)
    console.log("max",val.max)
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    let reqObj = {
      "trip_type": search.trip_type,
      "number_of_horses": search.number_of_horses,
      "price_from": val.min,
      "price_to" : val.max,
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
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">AED {price.value.min}</span>-
          <span className="js-upper mx-1">AED {price.value.max}</span>
        </div>
      </div>

      <div className="px-5">
        <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={2000}
          value={price.value}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
