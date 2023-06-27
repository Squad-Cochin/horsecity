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
  // This function is used to close the sidebar
  const closeIcon = () => {
    document.body.classList.toggle("sidebarActive");
  };
  const checkboxOptions = [
    { id: 0, label: "GCC" },
    { id: 1, label: "Private" },
    { id: 2, label: "Sharing" },
  ];

  // const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);


 
  const [checkedItems, setCheckedItems] = useState([]);

  // const handleCheckboxChange = (checkedItems) => {
  //   console.log("SS",checkedItems);

  //   const selectedItems = checkedItems.filter((item) => item.status !== false);
  //   console.log("selectedItems",checkedItems);
  //   let filteredData;
  //   if (selectedItems.length === 0) {
  //     console.log("one");
  //     filteredData = [...props.vehicles[0].vehicle];
  //   } else {
  //     console.log("two");
  //     filteredData = [...props.vehicles[0].vehicle].filter((vehicle) => {
  //       return selectedItems.some((item) => item.name === vehicle.vehicleType && item.status) && vehicle.isActive;
  //     });
  //   }
  //   console.log("filter",filteredData);
  //   const updatedBoxData = [{ currency: 'AED', vehicle: filteredData }];
  //   props.setVehicles(updatedBoxData);
  // };

  // const filterResult = (e) => {
  //   let checkBoxArray = document.querySelectorAll(".checkbox-filter input[type='checkbox']");
  //   let filteredArray = Array.from(checkBoxArray).filter((value) => {
  //     return value.checked  === true
  //   });

  //   let filterValuesArray = filteredArray.concat(filteredArrayRadio);
  //   filterValuesArray.forEach((item) => {
  //     valuesArray.push(item.value);
  //     filtersArray.push(item.nextElementSibling.innerText)
  //   });
  //   valuesArray.push('PF:' + rangeMinValue + '&' + rangeMaxValue);
  //   setappliedFilters(filtersArray);
  //   props.setFilterData(valuesArray);
  //   props.page == 0 ? props.setPage(1) : props.setPage(0);

  // }
  

  return (
    <aside>
      <div className={Styles.sidebar_section}>
        <div className={`${Styles.sidebar_header_wrapper} d-flex justify-content-between align-items-center`}>
          <h2 className={`clearfix ${Styles.sidebar_header}`}>Filter</h2>
          {/* Reset option */}
          <Link className={Styles['reset_lnk']} to={'/'} >Reset</Link>
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
                    aria-label= "Choose a value"
                    min= '0'
                    max= '2000'
                    defaultValue={[0, 1000]}
                    tooltip={true}
                  />
                </label>
              </Form.Group>
            </Form>
          </div>
          {/* <CheckboxType checkboxOptions={checkboxOptions}  /> */}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;


