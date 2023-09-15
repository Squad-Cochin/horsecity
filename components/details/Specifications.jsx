///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//              File using for showing the specification in the DETAILS page                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for showing the specification in detail page
const Specifications = (props) => {
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
