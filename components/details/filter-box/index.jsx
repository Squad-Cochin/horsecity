///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for insert booking details in DETAILS page                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import LocationSearch from "./LocationSearch";

// Function having the booking details inserting box
const index = (props) => {
  return (
    <>
      <div className="col-12">
        <LocationSearch noOfHorse={props.noOfHorse}/>
      </div>
    </>
  );
};

export default index;
