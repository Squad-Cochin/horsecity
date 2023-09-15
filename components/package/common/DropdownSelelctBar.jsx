///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for showing dropdown box in LISTING page(Feature)                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";

// Function for showing dropdown
const useDropdowns = (dropdowns) => {
  const [values, setValues] = useState(() =>
    dropdowns.reduce((acc, curr) => {
      acc[curr.title] = curr.defaultValue;
      return acc;
    }, {})
  );

  // Function for handle changes in dropdown value
  const handleChange = (title, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [title]: value,
    }));
  };

  const getHandlers = (title) => ({
    value: values[title],
    onChange: (value) => handleChange(title, value),
  });

  const dropdownComponents = dropdowns.map((dropdown) => (
    <div className="col-auto" key={dropdown.title}>
      <div className="dropdown js-dropdown js-amenities-active">
        <div
          className="dropdown__button d-flex items-center text-14 rounded-100 border-light px-15 h-34"
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          aria-expanded="false"
          data-bs-offset="0,10"
        >
          <span className="js-dropdown-title">{values[dropdown.title]}</span>
          <i className="icon icon-chevron-sm-down text-7 ml-10" />
        </div>
        {/* End dropdown__button */}

        <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
          <div className="text-15 y-gap-15 js-dropdown-list">
          </div>
        </div>
        {/* End dropdown-menu */}
      </div>
      {/* End dropdown */}
    </div>
  ));

  return {
    dropdownComponents,
    getHandlers,
  };
};

const DropdownSelectBar = () => {
  const dropdowns = [
    {
      title: "Category",
      defaultValue: "Category",
      options: ["Desert", "Mountains", "Ocean"],
    },
    {
      title: "Price",
      defaultValue: "Price",
      options: ["Less than $500", "$500 - $1000", "$1000 - $2000", "$2000+"],
    },
    {
      title: "Supplier",
      defaultValue: "Supplier",
      options: ["Mercedes", "BMW", "Hundai", "Volkswagen"],
    },
    {
      title: "Specifications",
      defaultValue: "Specifications",
      options: ["Airbags", "Engine", "Horse Power"],
    },
    {
      title: "Mileage",
      defaultValue: "Mileage",
      options: ["Limited", "Unlimited"],
    },
    {
      title: "Transmission",
      defaultValue: "Transmission",
      options: ["Manual", "Auto"],
    },
    {
      title: "Passenger",
      defaultValue: "Passenger",
      options: ["1", "2", "3"],
    },
  ];

  const { dropdownComponents, getHandlers } = useDropdowns(dropdowns);

  return <>{dropdownComponents}</>;
};

export default DropdownSelectBar;
