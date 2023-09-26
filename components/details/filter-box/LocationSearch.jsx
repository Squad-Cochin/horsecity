///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//            File using for showing input boxes of booking details in DETAILS page                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import { useEffect,useState } from "react";
import {addbooking} from "../../../pages/api/detailDataApi";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import DateSearch from "../../hero/DateSearch";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

// Function for showing input boxes of booking details
const LocationSearch = (props) => {
  const [filteredNoOfHorse, setFilteredNoOfHorse] = useState([]);
  const [pickupCountry, setPickupCountry] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropCountry, setDropCountry] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [tripType, setTripType] = useState("");
  const [noOfHorse, setNoOfHorse] = useState("");
  const [description, setDescription] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [hourseCountSelected, setHourseCountSelected] = useState(false);

  const { customer_id, vehicle_id, serviceprovider_id, no_of_horse } = useSelector((state) => state.bookingData) || {};
  const router = useRouter();
  useEffect(() => {
    initialLoad();
  },[no_of_horse,props.noOfHorse])

  // Function for work at the begining of the page loading
  async function initialLoad(){
    const bookings = await JSON.parse(localStorage.getItem('searchObject'));
    const loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (Object.keys(loginData).length !== 0) {
      setLogin(true);
    }
    setPickupLocation(bookings?.from_location);
    setDropLocation(bookings?.to_location);
    setTripType(bookings?.trip_type[0]); 
    setNoOfHorse(bookings?.number_of_horses);
    setPickupDate(bookings?.departDate);
    let array = [];
    for(let i = 1 ;i<=parseInt(noOfHorse);i++){
      array.push(i)
    }
   const filterData = array.filter((value) => parseInt(value, 10) <= props.noOfHorse)
  
   setFilteredNoOfHorse(filterData);
  }

  // Options for selecting country
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

  // Options for selecting trip type
  const tripTypes = [
    {id : 1,name : "PRIVATE"},
    {id : 2,name : "SHARING"},
    {id : 3,name : "GCC"},
  ]

  // Funtion for getting data form and for making new enquery
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      router.push('/others-pages/login');
      return; 
    }
    if(Number(noOfHorse) > filteredNoOfHorse){
      setNoOfHorse("")
    }
    const formData = {
      vehicle_id : `${vehicle_id}`,
      service_provider_id : `${serviceprovider_id}`,
      pickup_country : `${pickupCountry}`,
      pickup_location : `${pickupLocation}`,
      drop_country : `${dropCountry}`,
      drop_location : `${dropLocation}`,
      vehicle_type : `${tripType}`,
      no_of_horse : `${parseInt(noOfHorse) > parseInt(filteredNoOfHorse) && !hourseCountSelected ? "" : noOfHorse}`,
      pickup_date : `${pickupDate}`,
      description : `${description}`,
    };
      if(customer_id){
        console.log("formData",formData)
        let packageDetails = await addbooking(formData,customer_id);
        console.log("ress",packageDetails)
        if(packageDetails?.code == 200){
          toast.success(packageDetails?.message, {
            position: 'top-right', // Position of the toast on the screen
          });
          setPickupCountry("");
          setDropCountry("");
          setDescription("");
          setTripType("");
          setPickupLocation("");
          setDropLocation("");
          setNoOfHorse("");
          setPickupDate("");
          setHourseCountSelected(false);
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
          >
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
            onChange={(e) => {setNoOfHorse(e.target.value); setHourseCountSelected(true)}}
          >
            <option value=''>Select No OF Horse</option>
            {filteredNoOfHorse.map((item,index) => (
              <option value={item} key={index}>
                {item} 
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchMenu-loc px-20 mt-3 py-10 border-light rounded-4 js-form-dd js-liverSearch">
      <h4 className="text-15 fw-500 ls-2 lh-16">Pickup Date</h4>
      <div className="text-15 text-light-1 ls-2 lh-16">
      <DateSearch use="pickupDate" pickupDate={pickupDate} setPickupDate={setPickupDate} />
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
