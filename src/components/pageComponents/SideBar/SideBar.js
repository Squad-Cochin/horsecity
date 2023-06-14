// { On the component page that displays the homepage, a sidebar filter will also be included. 
// This component will include all filter type functionalities on the homepage. }

import React from "react";
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
const Sidebar = () => {
  // This function is used to close the sidebar

  const closeIcon = () => {
    document.body.classList.toggle("sidebarActive");
  };
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
                <label className="w-100">
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
          <CheckboxType label={'GCC'} />
          <CheckboxType label={'Private'} />
          <CheckboxType label={'Sharing'} />
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;


