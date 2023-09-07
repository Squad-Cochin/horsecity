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
  const [isLogin, setLogin] = useState(false);

  const { customer_id, vehicle_id, serviceprovider_id, no_of_horse } = useSelector((state) => state.bookingData) || {};
  const router = useRouter();
  useEffect(() => {
    initialLoad();
  },[no_of_horse])

  // Options for selecting number of horses
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
    {
      id: 11,
      no: "11"
    },
    {
      id: 12,
      no: "12"
    },
    {
      id: 13,
      no: "13"
    },
    {
      id: 14,
      no: "14"
    },
    {
      id: 15,
      no: "15"
    }
  ];

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
   const filterData = noOfHorses.filter((value) => parseInt(value.no, 10) <= no_of_horse)
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
      if(customer_id){
        let packageDetails = await addbooking(formData,customer_id);
        if(packageDetails?.code == 200){
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
