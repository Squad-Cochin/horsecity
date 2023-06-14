// { On the component page that displays the homepage, the search bar allows the user to search for a location and select a start date. Additionally, 
// the user can select an end date and the number of adults and thair functionalities  using this component}

import React from "react";
// import Select,{components} from 'react-select';
// import Container from "react-bootstrap/Container";
import { Row, Col } from 'react-bootstrap';
// import Dropdown from "react-bootstrap/Dropdown";
// import DatePicker from "react-datepicker";

// We are displaying the location search input here , We have passed values into the input component so that it can be reused.
import InputType from "../../elementComponents/Input/Input";

// This component is designed for reusing buttons
import ButtonType from "../../elementComponents/Button/Button";
import Styles from "./ListingSearchbar.module.scss";
// import Checkbox from "../../Checkbox/Checkbox";

function ActivitySearchWidgetHome() {


  return (
    <>
      <div className={Styles['listingSearchbar']}>
        <Row className={`${Styles.myRow} g-2`}>
          <Col lg={6} md={12} xs={12}>
            {/*Search input*/}

            <InputType
              className='search_formbox'
              label=""
              placeholder="Search..."
            />

          </Col>

          <Col lg={1} md={3} xs={12}>
            {/* Clicking the search button will submit the data */}
            <ButtonType className={'btntype2'} name="Search" />
          </Col>
        </Row>
      </div>
    </>
  );
}


function listingSearchbar(props) {
  /*const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());*/

  const widgetTemplate = props.template;
  return widgetTemplate === "home" && <ActivitySearchWidgetHome />;
}



export default listingSearchbar;
// export { ListingCarSearchbar };
export { ActivitySearchWidgetHome };
// export { ActivitySearchWidgetListing };


// <div className={styles["container"]}>
// <div className={styles["button-group"]}>
//   <ButtonType className='my-bookings-button' name='My Bookings' />
//   <ButtonType className='my-payments-button' name='My payments' />
//   {/* <button className={styles['my-bookings-button']}>My Bookings</button>
// <button className={styles["my-payments-button"]}>My Payments</button> */}
// </div>
// </div>