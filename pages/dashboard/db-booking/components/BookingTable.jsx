///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                  File for showing the ENQUIRIES HISTORY table in DASHBORD pages                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import enquiriesListDataApi from "../../../api/enquiriesListDataApi";

// Function for showing the enquiries history table in dashboard
const BookingTable = () => {
  const [ data, setData ] = useState([]);
  
  useEffect(()=>{
    initialLoad();
  },[])

  // Function at the initial load of the page for getting the data from api
  async function initialLoad(){
    let loginData = await JSON.parse(localStorage.getItem("loginData"))
    let enqList = await enquiriesListDataApi(loginData?.id)
    setData(enqList);
  }
  
  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="overflow-scroll scroll-bar-2">
              <table className="table-3 -border-bottom col-12">
                <thead className="bg-light-2">
                  <tr>
                    <th>Service Provider Name</th>
                    <th>Vehicle Number</th>
                    <th>Pickup Location</th>
                    <th>Drop Location</th>
                    <th>Trip Type</th>
                    <th>Number Of Horse</th>
                    <th>Pickup Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index)=>{
                    return(
                      <tr key={index}>
                        <td>{item.service_provider_name}</td>
                        <td>{item.vehicle_number}</td>
                        <td>{item.pickup_location}</td>
                        <td>{item.drop_location}</td>
                        <td>{item.trip_type}</td>
                        <td>{item.no_of_horse}</td>
                        <td>{item.pickup_date}</td>
                        <td>{item.status}</td>
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
