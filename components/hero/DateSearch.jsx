import React, { useState ,useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { addDepart, addReturn } from "../../features/search/initalSearch";

const DateSearch = (props) => {
  const dispatch = useDispatch();

  const [ dateData, setDateData ] = useState(new Date()) 
  // const today = new Date();
  // const minDate = new Date();
  // minDate.setFullYear(today.getFullYear() - 18);
  // async function initialLoad(){
  //   const bookings = await JSON.parse(localStorage.getItem('searchObject'));
  //   setPickupDate(bookings?.departDate)
  // }
  const today = new Date();
  const maxdate= new Date();
  maxdate.setFullYear(today.getFullYear() - 18);

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
    ): props.use === "date-of-birth"? (
      <DatePicker
          inputClass="custom_input-picker"
          containerClassName="custom_container-picker"
          selected={props.formData.birthday ? new Date(props.formData.birthday) : null}
          onChange={(date) => {
          const newFormdata = {
            ...props.formData,
            birthday : date
          } 
          props.setFormData(newFormdata);
          }}
          maxDate={maxdate}
          dateFormat="dd MMM"
          required
      />
    )  : (
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
