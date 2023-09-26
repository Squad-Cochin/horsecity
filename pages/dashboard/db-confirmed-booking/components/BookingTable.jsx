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
import completedBookingListApi from "../../../api/completedBookingApi";
import CustomModal from "../../common/CustomModal";
import StarRating from "../../common/StarRating";
import addReviewApi from "../../../api/addReviewApi";
import { Alert } from 'reactstrap'
import { IoIosCloseCircleOutline } from 'react-icons/io';

// Function for showing the BOOKING history table in dashboard
const BookingTable = () => {
  const [ data, setData ] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [ customerId, setCustomer ] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0); 
  const [reviewText, setReviewText] = useState('');
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");
  
  useEffect(()=>{
    initialLoad();
  },[])

  // Function for modal open 
  const openModal = () => {
    setIsModalOpen(true); 
    setRating(0);
    setReviewText('');
    setError("");
    setSuccess("")
  }

  // Function for modal close
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form values when closing the modal
    setRating(0);
    setReviewText('');
    setError("")
    setSuccess("")
  };

  // Function for add review
  const handleAddReview = async (bookingId) => {
    let dataObject = {
      "booking_id" : bookingId,
      "rating" : rating,
      "review" : reviewText
    }
    let res = await addReviewApi(dataObject);
    if(res?.code === 200){
      setError("");
      setSuccess(res?.message)
      setTimeout(() => {
        closeModal(); 
      }, 2000);
      
    } else {
      setSuccess("")
      setError(res?.message);
    }
    
  };

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

  // Getting completed data only
  async function completedData(){
    let activeEnqList = await completedBookingListApi(customerId)
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
    {name :"Completed", fun : completedData},
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
            <div className="overflow-scroll scroll-bar-2">
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
                    { activeTab == 4 ? <th colSpan={2}> Action </th> : null }
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
                        {parseInt(item.remaining_payment) == 0 && activeTab == 4 ? 
                          <td colSpan={2}>
                             <div>
                              <button
                                className="button h-30 px-24 bg-dark-1 -yellow-1 text-white mt-14"
                                onClick={openModal}
                              >
                                Add Review 
                              </button>
                              <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
                                <div className="customer-review-modal">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h2>Add a Review</h2>
                                      <button
                                        onClick={closeModal}
                                        style={{
                                          position: 'absolute',
                                          background: 'none',
                                          border: 'none',
                                          cursor: 'pointer',
                                          fontSize: '24px',
                                          display: 'contents',
                                        }}
                                      >
                                        <IoIosCloseCircleOutline />
                                      </button>
                                    </div>
                                  <form 
                                    onSubmit={(e)=>{
                                      e.preventDefault();
                                      handleAddReview(item.id)
                                  }}>
                                    {success !== "" ? <Alert color="success"  className="custom-alert"><div>{success}</div></Alert> : null}
                                    {error !== "" ? <Alert color="danger" ><div>{error}</div></Alert> : null}
                                    <div className="star_rate">
                                    <label className="rating">Choose Your Rating : </label>
                                      <StarRating value={rating} onChange={setRating} />
                                     
                                    </div>
                                    <div>
                                      <label htmlFor="reviewText">Review:</label>
                                      <textarea
                                        id="reviewText"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Write your review here..."
                                        rows="4"
                                        cols="50"
                                        style={{
                                          border: '1px solid #ccc',
                                          borderRadius: '8px',
                                          padding: '8px',
                                        }}
                                      />
                                    </div>
                                    <div style={{textAlign: "end", marginTop: "6px"}}>
                                      <button 
                                        type="submit" 
                                        style={{ padding: '4px 16px', background: '#007bff', color: 'white', borderRadius: '4px', border: 'none' }}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                    </form>
                                    </div>
                                </div>
                              </CustomModal>
                            </div>
                          </td> 
                        : null}
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
