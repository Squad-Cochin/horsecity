// { This component displays the check availability details
//   Check availability" usually refers to a feature that allows a user to see if a product or service is currently available
//   for booking }
// Importing necessary dependencies and components
import React, { useState } from "react";
import Styles from "./AvailabilityPopup.module.scss";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// This component is designed for reusing buttons
import ButtonType from "../../elementComponents/Button/Button";
// This component is designed for reusing select option
import SelectType from "../../elementComponents/Select/Select";

// Define the AvailabilityPopup component
const AvailabilityPopup = () => {
  // Declare state variables for input fields
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Define the options for sorting by
  const sortByOptions = [
    { name: "Adult", id: "1" },
    { name: "Child", id: "2" }
  ];

  // Define the tour language options
  const tourLanguage = [
    { name: "English", id: "1" },
    { name: "French", id: "2" }
  ];

  // Define the time options
  const timeOption = [
    { name: "10:00pm", id: "1" },
    { name: "10:00pm", id: "2" },
    { name: "08:00am", id: "3" },
    { name: "05:00am", id: "4" }
  ];

  // Define the radio box options
  const radiobox = [
    {
      id: 1,
      title: "Sagrada Familia Regular Entry",
      content:
        "What is included on this option description. Loren ipsum all the facts dolor maer sit consecuteur adisciplining.",
      linklabel: "Read more",
      url: "#",
      subtitle: "Total $171,20 per adult",
      subdesc: "2 Adults x $85.60",
    },
    {
      id: 2,
      title: "Sagrada Familia Regular Entry + Museum",
      content:
        "What is included on this option description. Loren ipsum all the facts dolor maer sit consecuteur adisciplining.",
      linklabel: "Read more",
      url: "#",
      subtitle: "Total $171,20 per adult",
      subdesc: "2 Adults x $85.60",
    },
    {
      id: 3,
      title: "Sagrada Familia Regular Entry + Tower",
      content:
        "What is included on this option description. Loren ipsum all the facts dolor maer sit consecuteur adisciplining.",
      linklabel: "Read more",
      url: "#",
      subtitle: "Total $171,20 per adult",
      subdesc: "2 Adults x $85.60",
    },
  ];

  // Render the component
  return (
    <div className={Styles.AvailabilityPopup}>
      <div className={Styles.priceSection}>
        <h2 className="header-type2">From $85.60 per adult</h2>
        <div className={Styles.duration}>
          Offer ID: 98292 <span className={Styles.durationSeparator}></span>{" "}
          Exp: 1/31/2022
        </div>
        <div className={`${Styles.freeText} mt-2`}>
          Free cancellation available
        </div>
      </div>
      <Form className="mt-4">
        {/* Render a SelectType component with sortByOptions and label */}
        <SelectType selectarr={sortByOptions} label="Who’s going?" />
        {/* Render a SelectType component with tourLanguage options and label */}
        <SelectType selectarr={tourLanguage} label="Tour Language" />
        <div className="position-relative formbox mb-3">
          <div className="form-label">Date</div>
          <DatePicker
            dateFormat="MM/dd/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        {/* Render a SelectType component with timeOption options and label */}
        <SelectType selectarr={timeOption} label="Time" />
        <div className="form-label">3 options available</div>

        {/* Map through the radiobox options and render radio buttons */}
        {radiobox.map((radiolist) => {
          return (
            <>
              {/* In here, we will show the available options */}
              <label className={Styles.radioLabel} key={radiolist.id}>
                <input type="radio" name="Innerradio" />
                <div className={Styles.radioinnerBox}>
                  {radiolist.title ? (
                    <h3 className={Styles.radioTitle}>{radiolist.title}</h3>
                  ) : null}
                  {radiolist.content ? (
                    <div className={Styles.radioContent}>
                      {radiolist.content}
                    </div>
                  ) : null}
                  {radiolist.url ? (
                    <a className={Styles.radioLink} href={radiolist.url}>
                      {radiolist.linklabel}
                    </a>
                  ) : null}
                  {radiolist.subtitle ? (
                    <h4 className={Styles.radioSubhd}>{radiolist.subtitle}</h4>
                  ) : null}
                  {radiolist.subdesc ? (
                    <div className={Styles.radioSubdesc}>
                      {radiolist.subdesc}
                    </div>
                  ) : null}
                </div>
              </label>
            </>
          );
        })}
        {/* Render a ButtonType component for booking */}
        <ButtonType
          class={`btntype1 mt-4 ${Styles.offcanvasBtn}`}
          name="Book Now"
        />
      </Form>
    </div>
  );
};

// Export the AvailabilityPopup component as the default export
export default AvailabilityPopup;
