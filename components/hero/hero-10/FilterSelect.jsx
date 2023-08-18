import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTrip, addTripType, addNumberOfHorses } from "../../../features/search/initalSearch";

const FilterSelect = () => {
  const dispatch = useDispatch();
  const [ways, setWays] = useState("");
  const [tripTypeValue, setTripTypeValue] = useState("");
  const [noOfHorsesValue, setNoOfHorsesValue] = useState("");
  const [ searchData, setSearchData ] = useState({});

  // const { trip } = useSelector((state) => state.initialSearch) || {};
  // console.log(" tess",trip)
  // useEffect(() => {
    useEffect(() => {
      let searchObject = {
        "from_location" : "",
        "to_location" : "",
        "departDate" : "",
        "returnDate" : "",
        "trip" : "",
        "suppliers" : [],
        "trip_type" : [],
        "number_of_horses" : 0
      }
      localStorage.setItem('searchObject', JSON.stringify(searchObject));
      // const searchData = JSON.parse(localStorage.getItem('searchObject'));
      // console.log("ss",searchData)
    })
    
  // })

  const handleWaysChange = (value) => {
    setWays(value);
  };

  const handleTripTypeValueChange = (value) => {
    setTripTypeValue(value);
  };

  const handleNoOfHorsesValueChange = (value) => {
    setNoOfHorsesValue(value);
  };

  const dropdownOptions = [
    {
      title: "Trip",
      key : "trip",
      reduxFunction: addTrip,
      value: ways,
      list: [
        { label: "One Way", value : "One Way" },
        { label: "Return Also", value : "Return Also" },
      ],
      onChange: handleWaysChange,
    },
    {
      title: "Trip Type",
      key: "trip_type",
      reduxFunction: addTripType,
      value: tripTypeValue,
      list: [{ label: "Private" , value: ["PRIVATE"] }, { label: "GCC", value: ["GCC"] }, { label: "Public", value: ["PUBLIC"] }],
      onChange: handleTripTypeValueChange,
    },
    {
      title: "Number Of Horses",
      key: "number_of_horses",
      reduxFunction: addNumberOfHorses,
      value: noOfHorsesValue,
      list: [
        { label: "1 Horse" , value : 1},
        { label: "2 Horses", value : 2 },
        { label: "3 Horses", value : 3 },
        { label: "4 Horses", value : 4 },
        { label: "5 Horses", value : 5 },
        { label: "6 Horses", value : 6 },
        { label: "7 Horses", value : 7 },
        { label: "8 Horses", value : 8 },
        { label: "9 Horses", value : 9 },
        { label: "10 Horses", value : 10 },
        { label: "11 Horses", value : 11 },
        { label: "12 Horses", value : 12 },
        { label: "13 Horses", value : 13 },
        { label: "14 Horses", value : 14 },
        { label: "15 Horses", value : 15 },
      ],
      onChange: handleNoOfHorsesValueChange,
    },
  ];
  // console.log(searchData);
  console.log();
  return (
    <>
      {dropdownOptions.map((option, index) => (
        
        <div className="col-auto" key={index}>
          {/* <h1>{searchData[option.key]}</h1> */}
          <div className="dropdown js-dropdown">
            <div
              className="dropdown__button d-flex items-center text-15"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              data-bs-offset="0,0"
            >
              {option.value == ""?
                <span className="js-dropdown-title" style={{ color: 'Red' }}>{ option.value == "" ? option.title : option.value}</span>
                : <span className="js-dropdown-title">{ option.value == "" ? option.title : option.value}</span>
              } 

              <i className="icon icon-chevron-sm-down text-7 ml-10" />
            </div>
            <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
              <div className="text-14 y-gap-15 js-dropdown-list">
                {option.list.map((item, index) => (
                  <div key={index}>
                    <div
                      role="button"
                      className={`${
                        item.label === option.value ? "text-blue-1 " : ""
                      }d-block js-dropdown-link`}
                      onClick={() => {option.onChange(item.label); dispatch(option.reduxFunction(item.value)) }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FilterSelect;
