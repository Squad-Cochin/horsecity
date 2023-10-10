///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//          File using for showing Specifications and Amenities of a product in DETAILS page         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import Amenities from "./Amenities";
import Specifications from "./Specifications";

// Function for showing the Specifications and Amenities
const Overview = (props) => {
  return (     
    <>
      <div className="border-top-light mt-40 pt-40 mb-40">
        <h3 className="text-22 fw-500">Specifications</h3>
        <div className="col-xl-9">
          <Specifications vehicleData={props.vehicle}/>
        </div>
      </div>
      {/* End specifications */}

      <div className="border-top-light mt-40 pt-40 mb-40">
        <h3 className="text-22 fw-500">Amenities</h3>
        <Amenities vehicleData={props.vehicle} />
      </div>
    </>
  );
};

export default Overview;
