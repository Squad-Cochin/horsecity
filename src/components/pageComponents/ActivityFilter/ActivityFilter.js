// { On the component page that displays the homepage, this page is used to sort the activities and show search results.
// This component is displayed under the location search.}

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Select, { components } from 'react-select';
import Styles from "./ActivityFilter.module.scss";
import ButtonType from "../../elementComponents/Button/Button";
const ActivityFilter = (props) => {

  // This function is used to show the sidebar.
  const handleClick = () => {
    document.body.classList.toggle("sidebarActive");
  };

  return (
    <div className={Styles.filterbox}>
      <Row className="align-items-center">
        <Col md={6}>

          <span className={Styles.filterpoint}>123 Total Search Results</span>
          {/* <span className={Styles.filterpoint}>
            Total includes taxes and fees
          </span> */}
        </Col>
        <Col md={6} className={`${Styles.sortOption} text-end`}>
          <div className={Styles.filterWrapper}>

            <div className={Styles.FilterButton} onClick={handleClick}>
              <svg stroke="#fe6652" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            </div>
            <div className="" >
              <ButtonType name={'My bookings'} className='my-bookings-button' />
              <ButtonType name={'My payments'} className='my-payments-button' />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityFilter;
