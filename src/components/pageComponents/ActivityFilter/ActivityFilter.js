// { On the component page that displays the homepage, this page is used to sort the activities and show search results.
// This component is displayed under the location search.}

// Importing necessary dependencies and components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Select, { components } from 'react-select';
import Styles from "./ActivityFilter.module.scss";
import ButtonType from "../../elementComponents/Button/Button";
import Select from "react-select";
// Defining the ActivityFilter component
const ActivityFilter = (props) => {
  // This function is used to show/hide the sidebar by toggling the "sidebarActive" class on the body element
  const handleClick = () => {
    document.body.classList.toggle("sidebarActive");
  };
  
  const vehiclesLength = props.vehicles[0].vehicle.length
  // Function for sort on the basis select.
  // const handleSort = (e) => {
  //   let value = e.value
  //   props.setSortValue(value);
  //   // props.page == 0 ? props.setPage(1) : props.setPage(0);
  // }
  // Drop down options.

  const sortByOptions = [
    { value: "PRICE:ASCENDING", label: "Price (low to high)", key: "1" },
    { value: "PRICE:DESCENDING", label: "Price (high to low)", key: "2" },
  ];

  const handleSortChange = (e) => {
    const option = e.value;

    if (option === "PRICE:ASCENDING") {
      const vehicle = props.vehicles[0].vehicle.sort((a, b) => {
        return (
          parseFloat(a.price.replace(/,/g, "")) -
          parseFloat(b.price.replace(/,/g, ""))
        );
      });

      let boxData = [{ currency: "AED", vehicle: vehicle }];
      console.log("ascHomes", boxData);

      props.setVehicles(boxData);
    } else if (option === "PRICE:DESCENDING") {
      const vehicle = [...props.vehicles[0].vehicle].sort((a, b) => {
        return (
          parseFloat(b.price.replace(/,/g, "")) -
          parseFloat(a.price.replace(/,/g, ""))
        );
      });
      let boxData = [{ currency: "AED", vehicle: vehicle }];
      console.log("ascHomes", boxData);

      props.setVehicles(boxData);
    }
  };

  return (
    // The main container with a class name of "filterbox"
    <div className={Styles.filterbox}>
      {/* A row containing two columns */}
      <Row className="align-items-center">
        {/* First column */}
        <Col md={6}>
          {/* A span element to display the total search results */}
          <span className={Styles.filterpoint}>{vehiclesLength} Total Search Results</span>
          {/* Commented out span element, presumably for future use */}
          {/* <span className={Styles.filterpoint}>
            Total includes taxes and fees
          </span> */}
        </Col>
        {/* Second column */}
        <Col md={6} className={`${Styles.sortOption} text-end`}>
          <div className={Styles.filterWrapper}>
            {/* A div representing a filter button, which triggers the handleClick function */}
            <div className={Styles.FilterButton} onClick={handleClick}>
              {/* SVG icon */}
              <svg
                stroke="#fe6652"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </div>
            <div className="">
              {/* Two instances of a custom ButtonType component, with different names and classNames */}
              <ButtonType name={"My bookings"} className="my-bookings-button" />
              <ButtonType name={"My payments"} className="my-payments-button" />

              <div className="mt-2">
                <span className="d-inline-block align-middle me-2">
                  Sort by
                </span>
                {/* We will show the select dropdown here */}
                <Select
                  class="d-inline-block sort-select"
                  label="Sort by"
                  defaultValue={sortByOptions[0]}
                  options={sortByOptions}
                  onChange={handleSortChange}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Exporting the ActivityFilter component as the default export
export default ActivityFilter;
