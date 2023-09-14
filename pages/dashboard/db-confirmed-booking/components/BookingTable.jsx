///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File for showing the BOOKING HISTORY table in DASHBORD pages                     //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import allBookingListApi from "../../../api/allBookingListApi";
import activeBookingListApi from "../../../api/activeBookingListApi";
import inactiveBookingListApi from "../../../api/inactiveBookingListApi";
import startedBookingListApi from "../../../api/startedBookingListApi";

// Function for showing the BOOKING history table in dashboard
const BookingTable = () => {
  const [ data, setData ] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [ customerId, setCustomer ] = useState();
  
  useEffect(()=>{
    initialLoad();
  },[])

   // Function at the initial load of the page for getting the data from api
  async function initialLoad(){
    let loginData = await JSON.parse(localStorage.getItem("loginData"))
    let enqList = await allBookingListApi(loginData?.id)
    setCustomer(loginData?.id)
    setData(enqList);
    setActiveTab(0)
  }

  // Getting active booking data only
  async function activeData(){
    let activeEnqList = await activeBookingListApi(customerId)
    setData(activeEnqList);
  }

  // Getting inactive booking data only
  async function inactiveData(){
    let activeEnqList = await inactiveBookingListApi(customerId)
    setData(activeEnqList);
  }

  // Getting started data only
  async function startedData(){
    let activeEnqList = await startedBookingListApi(customerId)
    setData(activeEnqList);
  }

  // Function for set the hedding as active
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Tabs just above to the table
  const tabItems = [
    {name :"All Booking", fun : initialLoad},
    {name :"Confirmed", fun : activeData},
    {name :"Cancelled", fun : inactiveData},
    {name :"Started", fun : startedData},
  ];


  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
          {tabItems.map((item, index) => (
            <div className="col-auto" key={index}>
              <button
                className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                  activeTab === index ? "is-tab-el-active" : ""
                }`}
                onClick={async () =>{ await item.fun() ; handleTabClick(index)}}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>
        {/* End tabs */}

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-1">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Service Provider Name</th>
                    <th>Vehicle Number</th>
                    <th>Pickup Location</th>
                    <th>Drop Location</th>
                    <th>Pickup Date</th>
                    <th>Trip Type</th>
                    <th>Number Of Horse</th>
                    <th>Total Payment</th>
                    <th>Pending Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index)=>{
                    return(
                      <tr key={index}>
                        <td>{item.service_provider_name}</td>
                        <td>{item.vehicle_number}</td>
                        <td>{item.pickup_point}</td>
                        <td>{item.drop_point}</td>
                        <td>{item.pickup_date}</td>
                        <td>{item.trip_type}</td>
                        <td>{item.no_of_horse}</td>
                        <td>{item.invoice_amount}</td>
                        <td>{item.remaining_payment}</td>
                        <td>{item.invoice_status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default BookingTable;
