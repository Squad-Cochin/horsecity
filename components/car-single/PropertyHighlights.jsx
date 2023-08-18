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

  console.log("propsVehicle",props.vehicle?.service_provider_name);
  return (
    <div className="row y-gap-30 justify-between pt-20">

        <div className="col-md-auto col-6">
          <div className="d-flex ">
            {/* <i className={`${item.icon} text-22 text-dark-1 mr-10`} /> */}
            <div className="text-15 ms-2 lh-15">
             Service Provider
              <br /> {props.vehicle?.service_provider_name}
            </div>
            <div className="text-15 ms-2 lh-15">
             Vehicle Type 
              <br /> {props.vehicle?.vehicle_type}
            </div>
            <div className="text-15 ms-2 lh-15">
             No Of Horse
              <br /> {props.vehicle?.no_of_horses}
            </div>
          </div>
        </div>
  
    </div>
  );
};

export default PropertyHighlights;
