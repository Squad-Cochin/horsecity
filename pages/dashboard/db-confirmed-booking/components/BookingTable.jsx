import { use, useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import ActionsButton from "../components/ActionsButton";
import allBookingListApi from "../../../api/allBookingListApi";
import activeBookingListApi from "../../../api/activeBookingListApi";
import inactiveBookingListApi from "../../../api/inactiveBookingListApi";
import startedBookingListApi from "../../../api/startedBookingListApi";

const BookingTable = () => {

  const [ data, setData ] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [ customerId, setCustomer ] = useState();
  
  useEffect(()=>{
    initialLoad();
  },[])

  async function initialLoad(){
    let loginData = await JSON.parse(localStorage.getItem("loginData"))
    // if(loginData){
    //   setLogin(loginData);
    // }
    let enqList = await allBookingListApi(loginData?.id)
    setCustomer(loginData?.id)
    setData(enqList);
    setActiveTab(0)
  }

  async function activeData(){
    let activeEnqList = await activeBookingListApi(customerId)
    setData(activeEnqList);
  }

  async function inactiveData(){
    let activeEnqList = await inactiveBookingListApi(customerId)
    setData(activeEnqList);
  }

  async function startedData(){
    let activeEnqList = await startedBookingListApi(customerId)
    setData(activeEnqList);
  }

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    {name :"All Booking", fun : initialLoad},
    {name :"Confirmed", fun : activeData},
    {name :"Cancelled", fun : inactiveData},
    {name :"Started", fun : startedData},
    // "Confirmed",
    // "Cancelled",
    // "Started"
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
                    <th>Total Amount</th>
                    <th>Pending Amount</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                {data?.map((item, index)=>{
                  // console.log("ddddd",data)
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
                  


                  {/* <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-yellow-4 text-yellow-3">
                        Pending
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-red-3 text-red-2">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td>The May Fair Hotel</td>
                    <td>04/04/2022</td>
                    <td className="lh-16">
                      Check in : 05/14/2022
                      <br />
                      Check out : 05/29/2022
                    </td>
                    <td className="fw-500">$130</td>
                    <td>$0</td>
                    <td>$35</td>
                    <td>
                      <span className="rounded-100 py-4 px-10 text-center text-14 fw-500 bg-blue-1-05 text-blue-1">
                        Confirmed
                      </span>
                    </td>
                    <td>
                      <ActionsButton />
                    </td>
                  </tr> */}
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
