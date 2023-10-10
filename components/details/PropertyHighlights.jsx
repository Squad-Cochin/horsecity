///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//          File using for showing content of Property Highlights of a product in DETAILS page       //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { GiHorseHead } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { TbBus } from "react-icons/tb";

// Function for property highlights
const PropertyHighlights = (props) => {
  return (
    <div className="row y-gap-30 justify-between pt-20">
        <div className="col-md-auto col-6">
          <div className="d-flex ">
            <div className="text-15 ms-3 lh-15">
             <GrUserWorker/> 
             {/* Service Provider */}
              <br /> {props.vehicle?.service_provider_name}
            </div>
            <div className="text-15 ms-3 lh-15">
             <TbBus/> 
             {/* Vehicle Type  */}
              <br /> {props.vehicle?.vehicle_type}
            </div>
            <div className="text-15 ms-3 lh-15">
             <GiHorseHead/>
              {/* No Of Horse */}
              <br /> {props.vehicle?.no_of_horses}
            </div>
          </div>
        </div>
    </div>
  );
};

export default PropertyHighlights;
