const Specifications = (props) => {
  const speciContent = [
    { id: 1, name: "Make", content: "Honda" },
    { id: 2, name: "Model", content: "Honda" },
    { id: 3, name: "Made Year", content: "2022" },
    { id: 4, name: "Mileage", content: "120,556" },
    { id: 5, name: "Mileage", content: "120,556" },
    { id: 6, name: "Version", content: "2.0 Turbo" },
    { id: 7, name: "Horsepower (hp)", content: "200" },
    { id: 8, name: "Transmission", content: "Auto" },
    { id: 9, name: "Condition", content: "New" },
  ];
  // console.log("props",props);
  return (
    <>
    <div className="row y-gap-30 pt-15">
        <div className="col-sm-4" >
          <div className="fw-500">Make</div>
          <div className="text-15">{props.vehicleData?.make}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Model</div>
          <div className="text-15">{props.vehicleData?.model}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Vehicle Number</div>
          <div className="text-15">{props.vehicleData?.vehicle_number}</div>
        </div>
    </div>
    <div className="row y-gap-30 pt-15">
        <div className="col-sm-4" >
          <div className="fw-500">Height</div>
          <div className="text-15">{props.vehicleData?.height}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Length</div>
          <div className="text-15">{props.vehicleData?.length}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Breadth</div>
          <div className="text-15">{props.vehicleData?.breadth}</div>
        </div>
    </div>
    <div className="row y-gap-30 pt-15">
        <div className="col-sm-4" >
          <div className="fw-500">Air Condition</div>
          <div className="text-15">{props.vehicleData?.air_condition}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Temperature Manageable</div>
          <div className="text-15">{props.vehicleData?.temperature_manageable}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Gcc Travel Allowed</div>
          <div className="text-15">{props.vehicleData?.gcc_travel_allowed}</div>
        </div>
    </div>
    <div className="row y-gap-30 pt-15">
        <div className="col-sm-4" >
          <div className="fw-500">Vehicle Registration Date</div>
          <div className="text-15">{props.vehicleData?.vehicle_registration_date}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Vehicle Expiration Date</div>
          <div className="text-15">{props.vehicleData?.vehicle_expiration_date}</div>
        </div>
    </div>
    <div className="row y-gap-30 pt-15">
        <div className="col-sm-4" >
          <div className="fw-500">Insurance Date</div>
          <div className="text-15">{props.vehicleData?.insurance_date}</div>
        </div>
        <div className="col-sm-4" >
          <div className="fw-500">Insurance Expiration Date</div>
          <div className="text-15">{props.vehicleData?.insurance_expiration_date}</div>
        </div>
    </div>
    </>
  );
};

export default Specifications;
