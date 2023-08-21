
import { useEffect,useState } from "react";
import {addbooking} from "../../../pages/api/detailDataApi";
import { useSelector } from "react-redux";
const LocationSearch = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [pickupCountry, setPickupCountry] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropCountry, setDropCountry] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [tripType, setTripType] = useState("");
  const [noOfHorse, setNoOfHorse] = useState("");
  const [description, setDescription] = useState("");



  const { customer_id, vehicle_id, serviceprovider_id } = useSelector((state) => state.bookingData) || {};
  useEffect(() => {
    initialLoad();
  },[])

  async function initialLoad(){
    const bookings = await JSON.parse(localStorage.getItem('searchObject'));
    setPickupLocation(bookings?.from_location);
    setDropLocation(bookings?.to_location);
    setTripType(bookings?.trip_type[0]);
    setNoOfHorse(bookings?.number_of_horses);
  }

  const locationSearchContent = [
    {
      id: 1,
      name: "Bahrain",
    },
    {
      id: 2,
      name: "Kuwait"
    },
    {
      id: 3,
      name: "Oman"
    },
    {
      id: 4,
      name: "Qatar"
    },
    {
      id: 5,
      name: "Saudi Arabia"
    },
    {
      id: 6,
      name: "United Arab Emirates"
    },
  ];
  const noOfHorses = [
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2"
    },
    {
      id: 3,
      name: "3"
    },
    {
      id: 4,
      name: "4"
    },
    {
      id: 5,
      name: "5"
    },
    {
      id: 6,
      name: "6"
    },
    {
      id: 7,
      name: "7"
    },
    {
      id: 8,
      name: "8"
    },
    {
      id: 9,
      name: "9"
    },
    {
      id: 10,
      name: "10"
    },
  ];


  const tripTypes = [
    {id : 1,name : "PRIVATE"},
    {id : 2,name : "SHARING"},
    {id : 3,name : "GCC"},
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      vehicle_id : vehicle_id,
      service_provider_id : serviceprovider_id,
      pickup_country : pickupCountry,
      pickup_location : pickupLocation,
      drop_country : dropCountry,
      drop_location : dropLocation,
      vehicle_type : tripType,
      no_of_horse : noOfHorse,
      description : description,
    };
    console.log("data",formData);
      if(customer_id){
        let packageDetails =  addbooking(formData,customer_id);
      }


  };



  return (
    <>

    <form onSubmit={handleSubmit}>
      <div className="searchMenu-loc mt-3 px-20 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <div>
          <h4 className="text-15 fw-500 ls-2 lh-16">Pickup Country</h4>
          <select
            className="js-search js-dd-focus"
            value={pickupCountry}
            onChange={(e) => setPickupCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {locationSearchContent.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchMenu-loc mt-3 px-20 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">Pickup Location</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Enter Location"
            className="js-search js-dd-focus"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="searchMenu-loc mt-3 px-20 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <div>
          <h4 className="text-15 fw-500 ls-2 lh-16">Drop Country</h4>
          <select
            className="js-search js-dd-focus"
            value={dropCountry}
            onChange={(e) => setDropCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {locationSearchContent.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchMenu-loc px-20 mt-3 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">Drop Location</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Enter Location"
            className="js-search js-dd-focus"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="searchMenu-loc px-20 mt-3 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">Trip Type</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <select
            className="js-search js-dd-focus"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            required>
            {tripTypes.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchMenu-loc px-20 mt-3 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">No Of Horse</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <select
            className="js-search js-dd-focus"
            value={noOfHorse}
            onChange={(e) => setNoOfHorse(e.target.value)}
            required>
            {noOfHorses.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchMenu-loc px-20 mt-3 py-10 border-light rounded-4 js-form-dd js-liverSearch">
        <h4 className="text-15 fw-500 ls-2 lh-16">Description</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Enter Description"
            className="js-search js-dd-focus"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="col-12">
        <button
        type="submit"
          className="button -dark-1 mt-3 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
        >
          <i className="icon-search text-20 mr-10" />
          Book Now
        </button>
      </div>
    </form>

    </>
  );
};

export default LocationSearch;
