import React, { useState ,useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addDepart, addReturn } from "../../features/search/initalSearch";

const DateSearch = (props) => {
  const dispatch = useDispatch();

  const [ dateData, setDateData ] = useState(new Date()) 

  // async function initialLoad(){
  //   const bookings = await JSON.parse(localStorage.getItem('searchObject'));
  //   setPickupDate(bookings?.departDate)
  // }
console.log("Date",props.pickupDate);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
    {props.use === "fromDate" ? (
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        selected={dateData}
        onChange={(date) => {
          setDateData(date);
          dispatch(addDepart(date));
        }}
        minDate={new Date()}
        dateFormat="MMM dd"
      />
    ) : props.use === "pickupDate"? (
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        selected={props.pickupDate ? new Date(props.pickupDate) : null}
        onChange={(date) => {
          console.log("FFF",date);
          props.setPickupDate(date);
        }}
        minDate={new Date()}
        dateFormat="MMM dd"
        required
      />
    //   <DatePicker
    //   inputClass="custom_input-picker"
    //   containerClassName="custom_container-picker"
    //   selected={dateData}
    //   onChange={(date) => {
    //     setDateData(date);
    //     dispatch(addDepart(date));
    //   }}
    //   minDate={new Date()}
    //   dateFormat="MMM dd"
    // />
    ) : (
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        selected={dateData}
        onChange={(date) => {
          setDateData(date);
          dispatch(addReturn(date));
        }}
        minDate={new Date()}
        dateFormat="MMM dd"
      />
)}

    </div>
  );
};

export default DateSearch;
