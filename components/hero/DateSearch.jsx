import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addDepart, addReturn } from "../../features/search/initalSearch";

const DateSearch = (props) => {
  const dispatch = useDispatch();
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  // const [dates, setDates] = useState([
  //   new DateObject().setDay(5),
  //   new DateObject().setDay(14).add(1, "month"),
  // ]);
  const [ dateData, setDateData ] = useState(new Date()) 
  console.log(dateData)
  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      {props.use == "fromDate" ?
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        selected={dateData}
        onChange={(date) => {
          setDateData(date) ; 
          dispatch(addDepart(date))
        }}
        minDate={new Date()}
        // numberOfMonths={2}
        // offsetY={10}
        // range
        // rangeHover
        dateFormat="MMM dd"
      /> :  
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
      }
    </div>
  );
};

export default DateSearch;
