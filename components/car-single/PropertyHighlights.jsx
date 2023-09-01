import { GiHorseHead } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { TbBus } from "react-icons/tb";

const PropertyHighlights = (props) => {
  const propertyContent = [
    {
      id: 1,
      icon: "icon-user-2",
      name: "User",
      content: "4",
    },
    {
      id: 2,
      icon: "icon-luggage",
      name: "Luggage",
      content: "2",
    },
    {
      id: 3,
      icon: "icon-transmission",
      name: "Transmission",
      content: "Automatic",
    },
    {
      id: 4,
      icon: "icon-speedometer",
      name: "Mileage",
      content: "Unlimited",
    },
  ];

  // console.log("propsVehicle",props.vehicle?.service_provider_name);
  return (
    <div className="row y-gap-30 justify-between pt-20">

        <div className="col-md-auto col-6">
          <div className="d-flex ">
            {/* <i className={`${item.icon} text-22 text-dark-1 mr-10`} /> */}
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
