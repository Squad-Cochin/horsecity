// { On the component page that displays the homepage, a sidebar filter will also be included. 
// This component will include all filter type functionalities on the homepage. }

import React, {useState} from "react";
// We installed react-bootstrap and used the Accordion component from the library

import { Link } from "react-router-dom";
// This component is for reusing a checkbox input.
import CheckboxType from "../../elementComponents/Checkbox/Checkbox";
// Slide bar css page 
import Styles from "./SideBar.module.scss";
// This is an NPM package for displaying a price range
import RangeSlider from '../../../../node_modules/react-range-slider-input/dist/components/RangeSlider';
import 'react-range-slider-input/dist/style.css';
import { Form } from "react-bootstrap";
const Sidebar = (props) => {

  const [rangeMinValue, setrangeMinValue] = useState(2108/*Math.min(...props.searchData.map(obj => obj.price))*/);
  const [rangeMaxValue, setrangeMaxValue] = useState(4000/*Math.max(...props.searchData.map(obj => obj.price))*/);
  const [appliedFilters, setappliedFilters] = useState([]);
  const [checking, setChecking] = useState([])
  const [checkedItems, setCheckedItems] = useState([]);


  // This function is used to close the sidebar
  const closeIcon = () => {
    document.body.classList.toggle("sidebarActive");
  };
  const checkboxOptions = [
    { id: 0, label: "GCC" },
    { id: 1, label: "Private" },
    { id: 2, label: "Sharing" },
  ];




 
  
  // let array = [];
  // const handleCheckboxChange = (checkedItems) => {

  //   array.push(checkedItems);
  //   console.log("updated!!!!!!!!!!!!!", array);
  
  //   let updatedArray = [];
  //   for (let i = 0; i < array.length; i++) {
  //     const currentItem = array[i];
  //     if (currentItem.status) {
  //       for (let j = 0; j < props.boxData[0].vehicle.length; j++) {
  //         if (props.boxData[0].vehicle[j].vehicleType === currentItem.name) {
  //           updatedArray.push(props.boxData[0].vehicle[j]);
  //         }
  //       }
  //     } else {
  //       for (let j = 0; j < props.boxData[0].vehicle.length; j++) {
  //         updatedArray.push(props.boxData[0].vehicle[j]);
  //       }
  //     }
  //   }

  //   // console.log("updateArray",updatedArray);
  //   let boxData = [{ currency: "AED", vehicle: updatedArray }];
  //   // console.log("boxx",boxData);
  //   props.setVhFilter(boxData); 


   
  // };


  // Function to handle checkbox change
  const handleCheckboxChange = (checkedItem) => {
    // Create a copy of the checked items array
    const updatedCheckedItems = [...checkedItems];
    console.log("updatedCheckeditems",updatedCheckedItems);
    // Find the index of the item in the array based on its name
    const existingIndex = updatedCheckedItems.findIndex(item => item.name === checkedItem.name);
    console.log("existingIndex",existingIndex);
    // If the item already exists, update it; otherwise, add it to the array
    if (existingIndex !== -1) {
      updatedCheckedItems[existingIndex] = checkedItem;
    } else {
      console.log("-1");
      updatedCheckedItems.push(checkedItem);
    }
  
    // Log the updated items
    console.log("Updated Items:", updatedCheckedItems);
  
    // Create an array to store the updated vehicles based on the checked items
    let updatedArray = [];
  
    // Check if any item in updatedCheckedItems has status true
    const hasCheckedItems = updatedCheckedItems.some(item => item.status);
    if (hasCheckedItems) {
      // Include only the vehicles that match the checked items with status true
      updatedArray = props.boxData[0].vehicle.filter(vehicle =>
        updatedCheckedItems.some(item =>
          item.name === vehicle.vehicleType && item.status
        )
      );
    } else {
      // If no checked item has status true, include all vehicles
      updatedArray = props.boxData[0].vehicle;
    }
  
    // Create the boxData object with the updatedArray
    let boxData = [{ currency: "AED", vehicle: updatedArray }]; 
    // Call the setVhFilter function with the updated boxData
    props.setVhFilter(boxData);
    // Update the checkedItems state with the updatedCheckedItems array
    setCheckedItems(updatedCheckedItems);

  };
    
    const setSliderValue = (e) => {
      setrangeMinValue(e[0]);
      setrangeMaxValue(e[1]);
      }
     const resetFilters = () => {
    console.log("reset");
      setCheckedItems([])
      setrangeMaxValue(4000);
      setrangeMinValue(2108);

    }
    // var valuesArray = [];
    const filterResult = ()=>{
      // valuesArray.push('PF:' + rangeMinValue + '&' + rangeMaxValue);
      // const splitValue = valuesArray.split('&');
      // const minValue  = splitValue[0].split(':')[1]
      // const maxValue  = splitValue[1];
      // console.log(minValue,maxValue);
      let vehiclesLength = props.boxData[0].vehicle.length
      let vehicleData = props.boxData[0].vehicle
      let updatedArray = []
      for(let i = 0 ; i < vehiclesLength ;i++){
     
          if(rangeMinValue<parseFloat(vehicleData[i].price.replace(/,/g, '')) && parseFloat(vehicleData[i].price.replace(/,/g, '')) < rangeMaxValue ){
            console.log("parse",parseFloat(vehicleData[i].price.replace(/,/g, '')));
            updatedArray.push(vehicleData[i]);
          }

      }
     // Create the boxData object with the updatedArray
    let boxData = [{ currency: "AED", vehicle: updatedArray }]; 
  
    // Call the setVhFilter function with the updated boxData
    props.setVhFilter(boxData);

    }

  return (
    <aside>
      <div className={Styles.sidebar_section}>
        <div className={`${Styles.sidebar_header_wrapper} d-flex justify-content-between align-items-center`}>
          <h2 className={`clearfix ${Styles.sidebar_header}`}>Filter</h2>
          {/* Reset option */}
          <Link className={Styles['reset_lnk']} onClick={resetFilters} to={'#'} >Reset</Link>
          <div className={Styles.closeButton} onClick={closeIcon}>
            <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 16 16" height="35" width="35" xmlns="http://www.w3.org/2000/svg"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
          </div>
        </div>
        <div className={Styles.sidebar_box}>
          <div className={Styles.sidebar_result}>
            123 Results
          </div>
          <div className="mb-3">
            <Form>
              <Form.Group>
                <Form.Label className={Styles.rangeTitle}>
                  Price
                </Form.Label>
                <label className="w-100" data-testid="rangeslider">
                  {/* The price range bar will be displayed here */}
                  <RangeSlider
                    aria-label="Choose a value"
                    min= {2108}
                    max= {4000}
                    // defaultValue={[2108, 4000]}
                    tooltip={true}
                    onThumbDragEnd={filterResult}
                    onInput={setSliderValue}
                    step={1}
                    />

                </label>
              </Form.Group>
            </Form>
          </div>
          <CheckboxType checkboxOptions={checkboxOptions} onChange={handleCheckboxChange} />
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;


