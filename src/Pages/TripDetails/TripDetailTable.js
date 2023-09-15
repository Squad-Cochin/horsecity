////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Tripdetails page functionality done over here.                       //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody, 
  ModalFooter,
  Row,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

//IMPORTED FILES
import {
  getTripDeatails,
  getSPUserName,
} from "../../helpers/ApiRoutes/getApiRoutes";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getLIstBreakDownVehicles,
  getSPVehiclesData,
  getSPDriverData,
} from "../../helpers/ApiRoutes/getApiRoutes";
import { updateTripStatus } from "../../helpers/ApiRoutes/addApiRoutes";
import config from "../../config";

const TripDeatails = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [tripDatas, setTripDatas] = useState([]);
  const [breakdown_list_modal, setBreakdown_list_modal] = useState(false);
  const [trip_list_data, setTrip_list_data] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [sPVechiles, setSPVechiles] = useState([]);
  const [sPDrivers, setSPDrivers] = useState([]);
  const [trip_status, setTrip_status] = useState(false);
  const [ store_trip_status,setStoreTripStatus] = useState("")
  const [booking_id, setBooking_id ] = useState("");
  const [invoice_id, setInvoice_id ] = useState("");
  const [userId, setUserId ] = useState("");
  const [module,setModule] = useState({});
  const [list_or_view, setListOrView ] = useState(false);
  const [ errors, setErrors ] = useState("");
  const [pageTitle, setPageTitle] = useState('KailPlus');
  const pageLimit = config.pageLimit;



  /**Initial render wIll load this hook */
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    const data = JSON.parse(localStorage.getItem("authUser"));
    let userIdd = data[0]?.user[0]?.id
    setUserId(userIdd);
    getAllData(1);
  }, [userId]);

  const initialValues = {
    invoice_id: invoice_id,
    booking_id:  booking_id,
    trip_status : store_trip_status,
    service_provider_id: trip_list_data[0]?.service_provider_id,
    service_provider: trip_list_data[0]?.service_provider || "",
    driver_name:trip_list_data[0]?.driver_name || "",
    driver_id:trip_list_data[0]?.driver_id ,
    vehicle_number: trip_list_data[0]?.vehicle_number || "",
    vehicle_id: trip_list_data[0]?.vehicle_id ,
    pickup_location:  "",
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      updateTrip(values)

    },
  });

  // function for get data all customer data
  async function getAllData(page) {
    if(userId){ 
    let Tripdetails = await getTripDeatails(page || 1,userId);
  
    setTripDatas(Tripdetails?.tripDetails);
    setModule(Tripdetails?.module[0])
    setPageNumber(page);
    setNumberOfData(Tripdetails?.totalCount);
    }
  }
  /**ADDING BREAKDOWN */
  async function updateTrip(values){
  let updateTrip = await   updateTripStatus(values);
      if(updateTrip.code == 200){
        getAllData(1);
        setmodal_list(false);
      }else{
        setErrors("")
        setErrors(updateTrip.message)
    }
     
  }

  /** THIS FUNCTION WILL DISPLAY THE BREAKDOWN LIST */
  async function breakdown_list(productId) {
    setTrip_list_data([]);
    let breakOut = await getLIstBreakDownVehicles(productId);
    if(breakOut.vehicles_breakouts.length != 0){
      setTrip_list_data(breakOut.vehicles_breakouts);
      setListOrView(true)
    }else{
      let filterTrpDetailsData = tripDatas.filter((item)=> item.booking_id  == productId)
      setTrip_list_data(filterTrpDetailsData);
      setListOrView(false)
    }
    setBreakdown_list_modal(!breakdown_list_modal);
  }
  /** THIS FUNCTION WILL OPEN THE EDIT POPUP  */
  async function tog_list(bkId ,invId) {
    setTrip_list_data([]);
    setBooking_id(bkId);
    setInvoice_id(invId);
    setTrip_status(false);
    let filterTrpDetailsData = tripDatas.filter((item)=> item.booking_id  == bkId)
    setTrip_list_data(filterTrpDetailsData);
    let serviceProviderData = await getSPUserName();
    setServiceProviders(serviceProviderData.serviceProviders);
    
    setmodal_list(!modal_list);
  }
  /**SETTING DRIVER & VEHICLES BASIS OF SERVICE PROVIDER */
  async function serviceProviderSelected(id) {
    const sPVechilesData = await getSPVehiclesData(id);
    const sPDriverData = await getSPDriverData(id);
    setSPDrivers(sPDriverData.drivers);
    setSPVechiles(sPVechilesData.vehicles);
  }

  /**SETTING TRIP STATUS */
   function tripStatusSelected(value) {
    setStoreTripStatus(value)
    if(value === tripStatus.breakout){
        setTrip_status(true)
    }else if(value === tripStatus.compleated){
      setTrip_status(false)
    }
  }

  const tripStatus = {
    breakout: "BREAKOUT",
    compleated: "COMPLETED",
  };
  document.title = `Trip details | ${pageTitle} `;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Trip details" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0"> Edit & View</h4>
                </CardHeader>
                <CardBody>
                  <div id="break-down-list">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="service-provider">
                             Customer Name
                            </th>
                            <th className="sort" data-sort="service-provider">
                              Service Provider
                            </th>
                            <th className="sort" data-sort="start-date">
                              Started At
                            </th>
                            <th className="sort" data-sort="End-date">
                              Ended At
                            </th>
                            <th className="sort" data-sort="booking-date">
                              Trip status
                            </th>
                            <th className="sort" data-sort="quotation-date">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {tripDatas?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="customer_name">
                                {item?.customer_name}
                              </td>
                              <td className="service-provider">
                                {item?.service_provider}
                              </td>
                              <td className="start-date">
                                {item?.trip_starting_date} {item?.pickup_time}
                              </td>
                              <td className="end-date">
                                {item?.trip_ending_date} {item?.drop_time}
                              </td>
                              <td className="amount">{item?.trip_status}</td>
                              <td>
                                <div className="d-flex gap-2">
                             
                                {JSON.parse(module?.read ||  'true') ?(
                                <div className="edit">
                                <button
                                  className="btn btn-sm btn-success edit-item-btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() => breakdown_list(item?.booking_id)}
                                >
                                  View
                                </button>
                              </div>
                               ) : null }
                         
                               {tripDatas[index].trip_status != tripStatus.compleated? (
                                  <div className="edit">
                                          {JSON.parse(module?.read ||  'true') ?(
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_list(item.booking_id,item.invoice_id)}
                                    >
                                      Edit
                                    </button>
                                         ): null }
                                  </div>
                       
                                  ) : null }
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        {pageNumber > 1 ? (
                          <Link
                            className="page-item pagination-prev disabled"
                            onClick={() => getAllData(pageNumber - 1)}
                          >
                            Previous
                          </Link>
                        ) : null}
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        {numberOfData > pageLimit * pageNumber ? (
                          <Link
                            className="page-item pagination-next"
                            onClick={() => getAllData(pageNumber + 1)}
                          >
                            Next
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        className="extra-width"
        isOpen={breakdown_list_modal}
        toggle={() => {
          setBreakdown_list_modal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setBreakdown_list_modal(false);
          }}
        >
        {list_or_view ? 'Break Down List' : 'Trip Details'}  
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
          {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
            <div className="tm_container">
              <div className="tm_invoice_wrap">
                <div className="tm_invoice tm_style1" id="tm_download_section">
                  <div className="tm_invoice_in">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="Table"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="customer_name">
                              Service Provider
                            </th>
                            <th
                              className="sort"
                              data-sort="service_provider_name"
                            >
                              Driver Name
                            </th>
                            <th className="sort" data-sort="quotation_id">
                              Vehicle Number
                            </th>
                            <th className="sort" data-sort="view_invoice">
                              Pickup Location
                            </th>
                            <th className="sort" data-sort="send_email">
                              Drop Location
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {trip_list_data?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th key={index}>{index + 1}</th>
                                <td className="customer_name">
                                  {item?.service_provider}
                                </td>
                                <td className="service_provider_name">
                                  {item?.driver_name}
                                </td>
                                <td className="quotation_id">
                                  {item?.vehicle_number}
                                </td>
                                <td className="quotation_id">
                                  {item?.pickup_location}
                                </td>
                                <td className="quotation_id">
                                  {item?.drop_location}
                                </td>
                              </tr>
                            );
                          })}
                          {/* Add more rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setBreakdown_list_modal(false);
                }}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          setmodal_list(false)
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setmodal_list(false)
          }}
        >
          {" "}
          Edit Trip Deatails{" "}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            <div className="mb-3">
              {/* <label className="form-label"></label> */}
              <div className="form-check">
                <input
                  type="radio"
                  id="air_conditioner-yes"
                  name="air_conditioner"
                  className="form-check-input"
                  value={tripStatus.compleated}
                  onChange={(e) => {
                    tripStatusSelected(e.target.value);
                  }}
                  required
                />
                <label
                  htmlFor="air_conditioner-yes"
                  className="form-check-label"
                >
                  COMPLETE
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="air_conditioner-no"
                  name="air_conditioner"
                  className="form-check-input"
                  value={tripStatus.breakout}
                  onChange={(e) => {
                    tripStatusSelected(e.target.value);
                  }}
                  required
                />
                <label
                  htmlFor="air_conditioner-no"
                  className="form-check-label"
                >
                  BREAKDOWN
                </label>
              </div>
            </div>

            {trip_status ? (
                <div>
                  {/* Service Provider */}
                  <div className="mb-3">
                    <label htmlFor="service_provider_id-field" className="form-label">
                      Service Provider Name
                    </label>
                    <select
                      data-trigger
                      name="service_provider_id"
                      id="service_provider_id-field"
                      className="form-control"
                      value={validation.values.service_provider_id || ""}
                      onChange={(e) => {
                        validation.handleChange(e);
                        serviceProviderSelected(e.target.value);
                      }}
                      onBlur={validation.handleBlur}
                      required
                    >
                      <option value={validation.values.service_provider_id || ""}>{validation.values.service_provider}</option>
                      {serviceProviders.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Number */}
                  <div className="mb-3">
                    <label htmlFor="vehicle_id-field" className="form-label">
                      Vehicle Number
                    </label>
                    <select
                      data-trigger
                      name="vehicle_id"
                      id="vehicle_id-field"
                      className="form-control"
                      value={validation.values.vehicle_id || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      required
                    >
                      <option value={validation.values.vehicle_id || ""}>{validation.values.vehicle_number}</option>
                      {sPVechiles.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.vehicle_number}
                        </option>
                      ))}
                    </select>
                  </div>
                {/* Driver */}
                <div className="mb-3">
                    <label htmlFor="driver_id-field" className="form-label">
                      Driver
                    </label>
                    <select
                      data-trigger
                      name="driver_id"
                      id="driver_id-field"
                      className="form-control"
                      value={validation.values.driver_id || ""}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      required
                    >
                      <option    value={validation.values.driver_id || ""}>{validation.values.driver_name}</option>
                      {sPDrivers?.map((item, index) => (
                        <option key={index} value={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Location */}
                  <div className="mb-3">
                    <label htmlFor="startLocation-field" className="form-label">
                      Start Location
                    </label>
                    <input
                      type="text"
                      name="pickup_location"
                      id="startLocation-field"
                      className="form-control"
                      value={validation.values.pickup_location || ""}
                      onChange={validation.handleChange}
                      placeholder="Enter Start Location"
                      required
                    />
                  </div>

                </div>
              ) : null}

        
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setmodal_list(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                Update Trip Deatails
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default TripDeatails;
