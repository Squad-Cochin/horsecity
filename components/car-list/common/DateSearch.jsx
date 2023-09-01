import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addDepart, addReturn } from "../../../features/search/initalSearch";

const DateSearch = (props) => {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  useEffect(()=>{
    // console.log(props,"propssssssssssss")
    if(props.use == "fromDate"){
      setFromDate(new Date(props.dateDate))
    }else{
      setToDate(new Date(props.dateDate))
    }
  },[])
  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      {props.use == "fromDate" ?
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        selected={fromDate}
        onChange={(date) => {
          setFromDate(date) ; 
          dispatch(addDepart(date))
        }}
        minDate={new Date()}
        dateFormat="MMM dd"
      /> :  
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        selected={toDate}
        onChange={(date) => {
          setToDate(date);
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
