import React, { useState, useEffect } from "react";
import {
  Button,
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
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from "react-router-dom";
import List from "list.js";
// Import Flatepicker
import Flatpickr from "react-flatpickr";

//Import Trip details
import {
  getTripDeatails,
  getSPUserName,
} from "../../helpers/ApiRoutes/getApiRoutes";
//Import Trip details
import {
  getLIstBreakDownVehicles,
  getSPVehiclesData,
  getSPDriverData,
} from "../../helpers/ApiRoutes/getApiRoutes";

import { updatTripData } from "../../helpers/ApiRoutes/editApiRoutes";
import { useFormik } from "formik";
import config from "../../config";
const TripDeatails = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [tripDatas, setTripDatas] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [breakdown_list_modal, setBreakdown_list_modal] = useState(false);
  const [breakdown_list_data, setBreakdown_list_data] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [sPVechiles, setSPVechiles] = useState([]);
  const [sPDrivers, setSPDrivers] = useState([]);
  const [trip_status, setTrip_status] = useState(false);
  const pageLimit = config.pageLimit;
  useEffect(() => {
    getAllData(1);
  }, []);

  async function tog_list(productId) {
    setTrip_status(false);
    let serviceProviderData = await getSPUserName();
    setServiceProviders(serviceProviderData.serviceProviders);

    setmodal_list(!modal_list);
  }
  const initialValues = {
    invoice_id: tripData[0]?.service_provider || "",
    booking_id: tripData[0]?.vehicle_number || "",
    service_provider_id: tripData[0]?.service_provider || "",
    driver_id: tripData[0]?.vehicle_number || "",
    vehicle_id: tripData[0]?.start_location || "",
    pickup_location: tripData[0]?.end_location || "",
  };

  // Later in your code, when setting the initial state

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      console.log(values);

      //update previes one
      console.log("update previues one ");
      updatTripData(values);

      setmodal_list(false);
    },
  });

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  async function breakdown_list(productId) {
    let breakOut = await getLIstBreakDownVehicles(productId);
    console.log("breakdowns", breakOut);
    setBreakdown_list_data(breakOut.vehicles_breakouts);
    setBreakdown_list_modal(!breakdown_list_modal);
  }
  // function for get data all customer data
  async function getAllData(page) {
    let Tripdetails = await getTripDeatails(page || 1);
    console.log("Tripdetails", Tripdetails);
    setTripDatas(Tripdetails?.tripDetails);
    setPageNumber(page);
    setNumberOfData(Tripdetails?.totalCount);
  }
  async function serviceProviderSelected(id) {
    console.log("d",id);
    const sPVechilesData = await getSPVehiclesData(id);
    const sPDriverData = await getSPDriverData(id);
    console.log("drivers",sPDriverData);
    setSPDrivers(sPDriverData.drivers);
    setSPVechiles(sPVechilesData.vehicles);
  }
   function tripStatusSelected(value) {
    if(value === tripStatus.breakout){
        setTrip_status(true)
    }else if(value === tripStatus.compleated){
      setTrip_status(false)
    }
 
  }
  const tripStatus = {
    breakout: "BREAKOUT",
    compleated: "COMPLEATED",
  };
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
                              Service Provider
                            </th>
                            <th className="sort" data-sort="driver-name">
                              Driver name
                            </th>
                            <th className="sort" data-sort="vehicle-number">
                              Vehicle Number
                            </th>
                            <th className="sort" data-sort="start-location">
                              Start Location
                            </th>
                            <th className="sort" data-sort="start-date">
                              Start Date
                            </th>
                            <th className="sort" data-sort="end-location">
                              End Location
                            </th>
                            <th className="sort" data-sort="End-date">
                              End Date
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
                              <td className="service-provider">
                                {item?.service_provider}
                              </td>
                              <td className="driver-name">
                                {item?.driver_name}
                              </td>
                              <td className="vehicle-number">
                                {item?.vehicle_number}
                              </td>
                              <td className="start-location">
                                {item?.pickup_location}
                              </td>
                              <td className="start-date">
                                {item?.trip_starting_date}
                              </td>
                              <td className="end-location">
                                {item?.drop_location}
                              </td>
                              <td className="end-date">
                                {item?.trip_ending_date}
                              </td>
                              <td className="amount">{item?.trip_status}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() =>
                                        breakdown_list(item?.booking_id)
                                      }
                                    >
                                      View
                                    </button>
                                  </div>
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_list(item.id)}
                                    >
                                      Edit
                                    </button>
                                  </div>
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
          Break Down List
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
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
                          {breakdown_list_data?.map((item, index) => {
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
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            tog_list();
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
                  // checked={validation.values.air_conditioner === 'YES'}
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
                  // checked={validation.values.air_conditioner === 'NO'}
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
                      <option value="">Select Service Provider</option>
                      {serviceProviders.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.user_name}
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
                      <option value="">Select Any Vehicle Number</option>
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
                      <option value="">Select Any Driver</option>
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
                      name="start_location"
                      id="startLocation-field"
                      className="form-control"
                      value={validation.values.start_location || ""}
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
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default TripDeatails;
