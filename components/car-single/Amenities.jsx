const Amenities = (props) => {
  const amenitiesContent = [
    { id: 1, name: "Airbag" },
    { id: 2, name: "FM Radio" },
    { id: 3, name: "Power Windows" },
    { id: 4, name: "Sensor" },
    { id: 5, name: "Speed Km" },
    { id: 6, name: "Steering Wheel" },
  ];
  // console.log("Amenties",props.vehicleData.air_condition);
  return (
    <>
      <div className="row y-gap-10 pt-15">
        {/* {amenitiesContent.map((item) => ( */}
        { props.vehicleData?.air_condition === 'YES' ?
          <div className="col-sm-5" >
          <div className="d-flex items-center">
            <i className="icon-check text-10 mr-15" />
            <div className="text-15">Air Condition</div>
          </div>
        </div>
        : null
        }
        { props.vehicleData?.temperature_manageable === 'YES' ?
          <div className="col-sm-5" >
          <div className="d-flex items-center">
            <i className="icon-check text-10 mr-15" />
            <div className="text-15">Temperature Manageable</div>
          </div>
        </div>
        : null
        }
        { props.vehicleData?.gcc_travel_allowed === 'YES' ?
          <div className="col-sm-5" >
          <div className="d-flex items-center">
            <i className="icon-check text-10 mr-15" />
            <div className="text-15">Gcc Travel Allowed</div>
          </div>
        </div>
        : null
        }
        { props.vehicleData?.insurance_cover === 'YES' ?
          <div className="col-sm-5" >
          <div className="d-flex items-center">
            <i className="icon-check text-10 mr-15" />
            <div className="text-15">Insurance Cover</div>
          </div>
        </div>
        : null
        }
   
        {/* ))} */}
      </div>
    </>
  );
};

export default Amenities;
