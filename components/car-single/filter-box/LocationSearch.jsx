
import { useEffect,useState } from "react";
import {addbooking} from "../../../pages/api/detailDataApi";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import DateSearch from "../../hero/DateSearch";
import 'react-toastify/dist/ReactToastify.css';
const LocationSearch = () => {
  const [filteredNoOfHorse, setFilteredNoOfHorse] = useState([]);
  const [pickupCountry, setPickupCountry] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropCountry, setDropCountry] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [tripType, setTripType] = useState("");
  const [noOfHorse, setNoOfHorse] = useState("");
  const [description, setDescription] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());



  const { customer_id, vehicle_id, serviceprovider_id, no_of_horse } = useSelector((state) => state.bookingData) || {};
  useEffect(() => {
    console.log("no",no_of_horse);
    initialLoad();
  },[no_of_horse])
  const noOfHorses = [
    {
      id: 1,
      no: "1",
    },
    {
      id: 2,
      no: "2"
    },
    {
      id: 3,
      no: "3"
    },
    {
      id: 4,
      no: "4"
    },
    {
      id: 5,
      no: "5"
    },
    {
      id: 6,
      no: "6"
    },
    {
      id: 7,
      no: "7"
    },
    {
      id: 8,
      no: "8"
    },
    {
      id: 9,
      no: "9"
    },
    {
      id: 10,
      no: "10"
    },
  ];

  async function initialLoad(){
    const bookings = await JSON.parse(localStorage.getItem('searchObject'));
    setPickupLocation(bookings?.from_location);
    setDropLocation(bookings?.to_location);
    setTripType(bookings?.trip_type[0]);
    setNoOfHorse(bookings?.number_of_horses);
    setPickupDate(bookings?.departDate);
   const filterData = noOfHorses.filter((value) => parseInt(value.no, 10) <= no_of_horse)

   setFilteredNoOfHorse(filterData);
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
  
console.log("piii",pickupDate);

  const tripTypes = [
    {id : 1,name : "PRIVATE"},
    {id : 2,name : "SHARING"},
    {id : 3,name : "GCC"},
  ]
  const handleSubmit = async (e) => {
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
      pickup_date : pickupDate,
      description : description,
    };
    console.log("data",formData);
      if(customer_id){
        let packageDetails = await addbooking(formData,customer_id);
        console.log("package",packageDetails);
        if(packageDetails?.code == 200){
          console.log("success",packageDetails);
          toast.success(packageDetails?.message, {
            position: 'top-right', // Position of the toast on the screen
          });
          setPickupCountry("");
          setDropCountry("");
          setDescription("");
        }else{
          toast.error(packageDetails?.message, {
            position: 'top-right',
          });
        }

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
           <option value=''>Select Trip Type</option>
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
            <option value=''>Select No OF Horse</option>
            {filteredNoOfHorse.map((item) => (
              <option value={item.no} key={item.id}>
                {item.no} 
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchMenu-loc px-20 mt-3 py-10 border-light rounded-4 js-form-dd js-liverSearch">
      <h4 className="text-15 fw-500 ls-2 lh-16">Pickup Date</h4>
      <div className="text-15 text-light-1 ls-2 lh-16">
      {pickupDate != "" ? <DateSearch use="pickupDate" pickupDate={pickupDate} setPickupDate={setPickupDate} /> : <DateSearch use="pickupDate" pickupDate={new Date()} setPickupDate={setPickupDate} />}  
      {/* <DateSearch use="pickupDate" pickupDate={pickupDate} setPickupDate={setPickupDate} /> */}
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
