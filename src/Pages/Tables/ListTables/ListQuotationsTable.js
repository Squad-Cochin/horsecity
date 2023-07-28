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
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from "react-router-dom";
import List from "list.js";
// Import Flatepicker
import Flatpickr from "react-flatpickr";
import config from '../../../config';

// import { item } from "../../../CommonData/Data";
import Logo from "../../../assets/images/black-logo.png";
import { getQuotationData, getConfirmQut, getSingleQuotationData } from "../../../helpers/ApiRoutes/getApiRoutes";
import { addNewQuotaion } from "../../../helpers/ApiRoutes/addApiRoutes";
import { updatQuotaion } from "../../../helpers/ApiRoutes/editApiRoutes";
import { useFormik } from "formik";

const ListQuotationsTable = () => {
  const [modal_list, setmodal_list] = useState(false);
  const [view_modal, setView_modal] = useState(false);
  const [quatlist_modal, setQuatList_modal] = useState(false);
  const [quotaions, setQuotaions] = useState([]);
  const [quotaion, setQuotaion] = useState([]);
  const [add_list, setAdd_list] = useState(false);
  const [ quotaionListDetails, setQuotaionListDetails ] = useState([])
  const [ quotaionList, setQuotaionList ] = useState([])
  const [ enquires, setEnquires] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);
  const [ numberOfData, setNumberOfData ] = useState(0);
  const [ errors, setErrors ] = useState("")
  const pageLimit = config.pageLimit;
  // const [ enquiry_data, setEnquery_data] = useState({})
  // const [ enquiry, setEnquiry ] = useState("");
  // function toggleStatus(button, quotationID) {
  //   var currentStatus = button.innerText.trim();
  //   if (currentStatus === "ACTIVE") {
  //     button.innerText = "INACTIVE";
  //     button.classList.remove("btn-success");
  //     button.classList.add("btn-danger");

  //     // Find the corresponding customer by ID
  //     const quotation = quotaions.find((q) => q.id === quotationID);
  //     console.log("Quotation:", quotation);
  //     if (quotation) {
  //       console.log("Came here");
  //       quotation.status = "INACTIVE";
  //       console.log("Quotation", quotation);
  //     }
  //   } else if (currentStatus === "INACTIVE") {
  //     button.innerText = "ACTIVE";
  //     button.classList.remove("btn-danger");
  //     button.classList.add("btn-success");

  //     // Find the corresponding customer by ID
  //     const quotation = quotaions.find((q) => q.id === quotationID);
  //     if (quotation) {
  //       quotation.status = "ACTIVE";
  //     }
  //   }
  // }
  
  const initialValues = {
    quotation_id : quotaions ? quotaions[0]?.quotation_id : "",
    enquiry_id : quotaions ? quotaions[0]?.enquiry_id : "",
    customer_name : quotaions ? quotaions[0]?.customer_name : "",
    customer_email : quotaions ? quotaions[0]?.customer_email : "",
    status : quotaions ? quotaions[0]?.status : "",
    // cName: !add_list ? quotaions[0]?.cName : "",
    // cEmail: !add_list ? quotaions[0]?.cEmail : "",
    // cUser_name: !add_list ? quotaions[0]?.cUser_name : "",
    // cPhone: !add_list ? quotaions[0]?.cPhone : "",
    // cId_proof_no: !add_list ? quotaions[0]?.cId_proof_no : "",
    // enquiry_id: !add_list ? enquires[0]?.enquiry_id : "",
    // driver : !add_list ? enquires[0]?.driver : "",
    // driver_cost : !add_list ? enquires[0]?.driver_cost : "",
    // enquiry_date: !add_list ? quotaions[0]?.enquiry_date : "",
    // enquiry_updated_date: !add_list ? quotaions[0]?.enquiry_updated_date : "",
    // service_provider: !add_list ? quotaions[0]?.Service_provider : "",
    // Vehicle_number: !add_list ? quotaions[0]?.Vehicle_number : "",
    // Vehicle_Make: !add_list ? quotaions[0]?.Vehicle_Make : "",
    // vehicle_cost : !add_list ? enquires[0]?.vehicle_cost : "",
    // trip_type: !add_list ? quotaions[0]?.trip_type : "",
    // pickup_location: !add_list ? quotaions[0]?.pickup_location : "",
    // pickup_country: !add_list ? quotaions[0]?.pickup_country : "",
    // pickup_date: !add_list ? quotaions[0]?.pickup_date : "",
    // pickup_time: !add_list ? quotaions[0]?.pickup_time : "",
    // drop_location: !add_list ? quotaions[0]?.drop_location : "",
    // drop_country: !add_list ? quotaions[0]?.drop_country : "",
    // drop_date: !add_list ? quotaions[0]?.drop_date : "",
    // drop_time: !add_list ? quotaions[0]?.drop_time : "",
    // no_of_horse: !add_list ? quotaions[0]?.no_of_horse : "",
    // special_requirement: !add_list
    //   ? quotaions[0]?.special_requirement
    //   : ["Washing", "Bathing"],
    // additional_service: !add_list
    //   ? quotaions[0]?.additional_service
    //   : ["Medicine", "Water"],
    // transportation_insurance_coverage: !add_list
    //   ? quotaions[0]?.transportation_insurance_coverage
    //   : "",
    // tax_amount: !add_list ? quotaions[0]?.tax_amount : "",
    // discount_amount: !add_list ? quotaions[0]?.discount_amount : "",
    // final_amount: !add_list ? quotaions[0]?.final_amount : "",
    // status: !add_list ? quotaions[0]?.status : "",
    // created_at: !add_list ? quotaions[0]?.created_at : "",
  };

  const enquiry_details = (val) => {
    const data = enquires ?.find((item) => item?.id === val);
    if(data && data !== undefined){
      validation.values.service_provider = data.service_provider;
      validation.values.Vehicle_number = data.vehicle_number;
      // validation.values.driver = data.driver;
      validation.values.pickup_location = data.pickup_location;
      validation.values.pickup_date = data.pickup_date;
      validation.values.drop_location = data.drop_location;
      validation.values.drop_date = data.drop_date;
      validation.values.no_of_horse = data.no_of_horse;
      validation.values.trip_type = data.trip_type;
    }
    
  }

  // Later in your code, when setting the initial state

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      setmodal_list(false);
      if (add_list) {
        //add new
        console.log("add new");
        console.log(values);
        addNewQuotaion(values);
        setAdd_list(false);
        setmodal_list(false);
      } else {
        //update previes one
        console.log("update previues one ");
        console.log(values);
        updatQuotaion(values);
        setAdd_list(false);
        setmodal_list(false);
      }
    },
  });

  /************ */
  function tog_list(param, productId) {
    if (param === "ADD") {
      setAdd_list(!add_list);
    }
    const data = quotaions?.find((item) => item?.id === productId);
    setQuotaion([data]);
    setmodal_list(!modal_list);
  }

  console.log("modal", modal_list);
  //view
  async function tog_view(productId) {
    console.log("f1",productId)
    let confirmData = await getConfirmQut(productId)
    setQuotaion(confirmData.quotation);
    setView_modal(!view_modal);
  }

  async function quat_list(productId) {
    let qutData = await getSingleQuotationData(productId)
    setQuotaionListDetails(qutData.quotation.details);
    console.log("qq",qutData.quotation.quotations)
    setQuotaionList(qutData.quotation.quotations)
    setQuatList_modal(!quatlist_modal);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  
  function toggleStatus(button, quatationId) {
    var currentStatus = button.innerText.trim();

    if (currentStatus === 'ACTIVE') {
        button.innerText = 'INACTIVE';
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');

        // Find the corresponding customer by ID
        const quotaion = quotaions.find((q) => q.id === quatationId);
        if (quotaion) {
            quotaion.status = 'INACTIVE';
        }
    }
    else if (currentStatus === 'INACTIVE') {
        button.innerText = 'ACTIVE';
        button.classList.remove('btn-danger');
        button.classList.add('btn-success');

        // Find the corresponding customer by ID
        const quotaion = quotaions.find((q) => q.id === quatationId);
        if (quotaion) {
          quotaion.status = 'ACTIVE';
        }
    }
  }

  useEffect(() => {
    getAllData(1)
  }, []);

  // function for get data all service provider data
  async function getAllData(page) {
    let quotationData = await getQuotationData(page || 1);
    setQuotaions(quotationData.quotations);
    setPageNumber(page);
    setNumberOfData(quotationData.totalCount);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Quotations" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    {/* <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1">
                          <Button
                            color="success"
                            className="add-btn"
                            onClick={() => tog_list("ADD")}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button>
                        </div>
                      </Col>
                    </Row> */}

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
                            <th className="sort" data-sort="quatationId">
                              Quatation Id
                            </th>
                            <th className="sort" data-sort="enquiryId">
                              Enquiry Id
                            </th>
                            <th className="sort" data-sort="name">
                              Customer Name
                            </th>
                            <th className="sort" data-sort="email">
                              Customer Email
                            </th>
                            <th className="sort" data-sort="status">
                              Status
                            </th>
                            <th className="sort" data-sort="action">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {quotaions?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                              <td className="quatationId">{item?.quotation_id}</td>
                              <td className="enquiryId">{item?.enquiry_id}</td>
                              <td className="customer_name">{item?.customer_name}</td>
                              <td className="customer_email">{item?.customer_email}</td>
                              <td className="customer_email">{item?.status}</td>
                              <td>
                                <div className="d-flex gap-2">

                                <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_view(item?.quotation_id)}
                                    >
                                      Confirm
                                    </button>
                                  </div>

                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => quat_list(item?.quotation_id)}
                                    >
                                      Quot List
                                    </button>
                                  </div>

                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_list("EDIT", item?.id)}
                                    >
                                      Edit
                                    </button>
                                  </div>

                                  <button
                                    className="btn btn-sm btn-success edit-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                  >
                                    Send Email
                                  </button>

                                  {/* <button
                                    className="btn btn-sm btn-danger remove-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteRecordModal"
                                  >
                                    Remove
                                  </button> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#121331,secondary:#08a88a"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* the below is having the code of the pagination of the page.
                    The previous and next button are also in side this function */}
                    <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                            {pageNumber > 1 ?
                                <Link 
                                    className="page-item pagination-prev disabled" 
                                    onClick={()=> getAllData(pageNumber - 1)}
                                >
                                    Previous
                                </Link>
                            : null }
                            <ul className="pagination listjs-pagination mb-0"></ul>
                            {numberOfData > pageLimit * pageNumber ? 
                                <Link className="page-item pagination-next" onClick={() => getAllData(pageNumber + 1)}>
                                    Next
                                </Link> 
                            : null }
                        </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          tog_list(add_list ? "ADD" : "EDIT");
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            tog_list(add_list ? "ADD" : "EDIT");
          }}
        >
          {add_list ? "Add Quotaion" : "Edit Quotaion"}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {/* {quotaion?.map((item, index) => (
                    <div key={index}> */}

            {/* <div className="mb-3">
              <label htmlFor="customerName-field" className="form-label">
                Customer Name
              </label>
              <input
                type="text"
                name="cName"
                id="customerName-field"
                className="form-control"
                value={validation.values.cName || ""}
                placeholder="Enter Customer Name"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerEmail-field" className="form-label">
                Customer Email
              </label>
              <input
                type="text"
                name="cEmail"
                id="customerEmail-field"
                className="form-control"
                value={validation.values.cEmail || ""}
                placeholder="Enter Customer Email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customerUsername-field" className="form-label">
                Customer Username
              </label>
              <input
                type="text"
                name="cUser_name"
                id="customerUsername-field"
                className="form-control"
                value={validation.values.cUser_name || ""}
                placeholder="Enter Customer Username"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customerPhone-field" className="form-label">
                Customer Contact Number
              </label>
              <input
                type="text"
                name="cPhone"
                id="customerPhone-field"
                className="form-control"
                value={validation.values.cPhone || ""}
                placeholder="Enter Customer Contact Number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customerIdProofno-field" className="form-label">
                Customer Id Proof Number
              </label>
              <input
                type="text"
                name="cId_proof_no"
                id="customerIdProofno-field"
                className="form-control"
                value={validation.values.cId_proof_no || ""}
                placeholder="Enter Customer Id Proof Number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="service-provider-field" className="form-label">
                Service Provider
              </label>
              <input
                type="text"
                name="service_provider"
                id="service-provider-field"
                className="form-control"
                value={validation.values.service_provider || ""}
                placeholder="Enter Service Provider Name"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div> */}

            {add_list ?
            <div className="mb-3">
              <label htmlFor="trip-type-field" className="form-label">
                Enquiry Id
              </label>
              <select
                data-trigger
                name="enquiry_id"
                id="trip-type-field"
                className="form-control"
                value={validation.values.enquiry_id || ""}
                onSelect={enquiry_details(validation.values.enquiry_id)}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              >
                <option value="">Select Enquiry Id</option>
              {enquires.map((item) => (
                <option value={item.id}>{item.id}</option>
              ))}
              </select>
            </div> : null}

            {/* {!add_list ? */}
            <div className="mb-3">
            <label htmlFor="service-provider-field" className="form-label">
              Service Provider
            </label>
            <input
              type="text"
              name="service_provider"
              id="service-provider-field"
              className="form-control"
              value={validation.values.service_provider || ""}
              placeholder="Enter Service Provider Name"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              required
            />
          </div>
          {/* : null} */}

            <div className="mb-3">
              <label htmlFor="vehicle-number-field" className="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                name="Vehicle_number"
                id="vehicle-number-field"
                className="form-control"
                value={validation.values.Vehicle_number || ""}
                placeholder="Enter Vehicle Number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="trip-type-field" className="form-label">
                Trip Type
              </label>
              <select
                data-trigger
                name="trip_type"
                id="trip-type-field"
                className="form-control"
                value={validation.values.trip_type || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              >
                <option value="">Select Trip Type</option>
                <option value="international">International</option>
                <option value="private">Private</option>
                <option value="sharing">Sharing</option>
              </select>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="pickup-country-field" className="form-label">
                Pickup Country
              </label>
              <select
                data-trigger
                name="pickup_country"
                id="pickup-country-field"
                className="form-control"
                value={validation.values.pickup_country || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              >
                <option value="">Select Country</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Dubai">Dubai</option>
                <option value="Sharjah">Sharjah</option>
              </select>
            </div> */}

            <div className="mb-3">
              <label htmlFor="pickup-location-field" className="form-label">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup_location"
                id="pickup-location-field"
                className="form-control"
                value={validation.values.pickup_location || ""}
                placeholder="Enter Pickup Location"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pickup-date-field" className="form-label">
                Pickup Date
              </label>
              <Flatpickr
                className="form-control"
                name="pickup_date"
                id="pickup-date-field"
                options={{
                  dateFormat: "d M, Y",
                }}
                value={validation.values.pickup_date || ""}
                placeholder="Select Drop Date"
                onChange={(date) =>
                  validation.setFieldValue("pickup_date", date)
                }
                onBlur={validation.handleBlur}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label
                htmlFor="pickup-time-input"
                className="col-md-2 col-form-label"
              >
                Pickup Time
              </label>
                <input
                  className="form-control"
                  name="pickup_time"
                  value={validation.values.pickup_time || ""}
                  type="time"
                  id="drop-time-input"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                />
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="drop-country-field" className="form-label">
                Drop Country
              </label>
              <select
                data-trigger
                name="drop_country"
                id="drop-country-field"
                className="form-control"
                value={validation.values.drop_country || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              >
                <option value="">Select Country</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Dubai">Dubai</option>
                <option value="Sharjah">Sharjah</option>
              </select>
            </div> */}

            <div className="mb-3">
              <label htmlFor="drop-location-field" className="form-label">
                Drop Location
              </label>
              <input
                type="text"
                name="drop_location"
                id="drop-location-field"
                className="form-control"
                value={validation.values.drop_location || ""}
                placeholder="Enter Pickup Location"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="drop-date-field" className="form-label">
                Drop Date
              </label>
              <Flatpickr
                className="form-control"
                name="drop_date"
                id="drop-date-field"
                options={{
                  dateFormat: "d M, Y",
                }}
                value={validation.values.drop_date || ""}
                placeholder="Select Drop Date"
                onChange={(date) => validation.setFieldValue("drop_date", date)}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            {/* <div className="mb-3">
              <label
                htmlFor="drop-time-input"
                className="col-md-2 col-form-label"
              >
                Drop Time
              </label>
                <input
                  className="form-control"
                  name="drop_time"
                  value={validation.values.drop_time || ""}
                  type="time"
                  id="drop-time-input"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                />
            </div> */}

            <div className="mb-3">
              <label htmlFor="no_of_horses-field" className="form-label">
                No Of Horses
              </label>
              <select
                id="no_of_horses-field"
                className="form-control"
                name="no_of_horse"
                value={validation.values.no_of_horse || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="special-requirement-field" className="form-label">
                Special Requirements
              </label>
              <div>
                <input
                  type="checkbox"
                  id="washing"
                  name="special_requirement"
                  value="Washing"
                  // checked={validation.values.special_requirement?.includes("Washing")}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                />
                <label htmlFor="washing">Washing</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="bathing"
                  name="special_requirement"
                  value="Bathing"
                  // checked={validation.values.special_requirement?.includes("Bathing")}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                />
                <label htmlFor="bathing">Bathing</label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="additional-service-field" className="form-label">
                Additional Service
              </label>
              <div>
                <input
                  type="checkbox"
                  id="medicine"
                  name="additional_service"
                  value="Medicine"
                  // defaultChecked={validation.values.additional_service.includes("Medicine")}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                />
                <label htmlFor="medicine">Medicine</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="water"
                  name="additional_service"
                  value="Water"
                  // defaultChecked={validation.values.additional_service.includes("Water")}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                />
                <label htmlFor="water">Water</label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Transportation Insurance Coverage
              </label>
              <div className="form-check">
                <input
                  type="radio"
                  id="transportation-insurance-coverage-yes"
                  name="transportation_insurance_coverage"
                  className="form-check-input"
                  value="YES"
                  checked={
                    validation.values.transportation_insurance_coverage ===
                    "YES"
                  }
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  required
                />
                <label
                  htmlFor="transportation-insurance-coverage-yes"
                  className="form-check-label"
                >
                  YES
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="transportation-insurance-coverage-no"
                  name="transportation_insurance_coverage"
                  className="form-check-input"
                  value="NO"
                  checked={
                    validation.values.transportation_insurance_coverage === "NO"
                  }
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  required
                />
                <label
                  htmlFor="transportation-insurance-coverage-no"
                  className="form-check-label"
                >
                  NO
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="driver-field" className="form-label">
                Driver Name
              </label>
              <input
                type="text"
                name="driver"
                id="driver_cost-field"
                className="form-control"
                value={validation.values.driver || ""}
                placeholder="Enter Driver Name"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="driver_cost-field" className="form-label">
                Driver Cost
              </label>
              <input
                type="text"
                name="driver_cost"
                id="driver_cost-field"
                className="form-control"
                value={validation.values.driver_cost || ""}
                placeholder="Enter Driver Cost"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Vehicle_cost-field" className="form-label">
                Vehicle Cost
              </label>
              <input
                type="text"
                name="vehicle_cost"
                id="vehicle_cost-field"
                className="form-control"
                value={validation.values.vehicle_cost || ""}
                placeholder="Enter Vehicle Cost"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tax-amount-field" className="form-label">
                Tax Amount
              </label>
              <input
                type="text"
                name="tax_amount"
                id="tax-amount-field"
                className="form-control"
                value={validation.values.tax_amount || ""}
                placeholder="Enter Tax Amount"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="discount-amount-field" className="form-label">
                Discount Amount
              </label>
              <input
                type="text"
                name="discount_amount"
                id="discount-amount-field"
                className="form-control"
                value={validation.values.discount_amount || ""}
                placeholder="Enter Discount Amount"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="final-amount-field" className="form-label">
                Final Amount
              </label>
              <input
                type="text"
                name="final_amount"
                id="final-amount-field"
                className="form-control"
                value={validation.values.final_amount || ""}
                placeholder="Enter Final Amount"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setmodal_list(false);
                  setAdd_list(false);
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {add_list ? "Add Quotation" : "Edit Quotation"}
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/**Quatation list */}
      <Modal
        className="extra-width"
        isOpen={quatlist_modal}
        toggle={() => {
          setQuatList_modal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setQuatList_modal(false);
          }}
        >
          Quotation List
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            {quotaionListDetails?.map((item, index) => (
              <div key={index} className="tm_container">
                <div className="tm_invoice_wrap">
                  <div
                    className="tm_invoice tm_style1"
                    id="tm_download_section"
                  >
                    <div className="tm_invoice_in">
                      <div className="tm_invoice_head tm_align_center tm_mb20">
                        <div className="tm_invoice_left">
                          <div className="tm_logo">
                            <img
                              src={Logo}
                              alt="Logo"
                              style={{ height: "50px", width: "50px" }}
                            />
                          </div>
                        </div>
                        <div className="tm_invoice_right tm_text_right">
                          <div className="tm_primary_color tm_f50 tm_text_uppercase tm_font_sixe=50px">
                            <font size="6">QUOTATION</font>
                          </div>
                        </div>
                      </div>
                      <div className="tm_invoice_info tm_mb20">
                        <div className="tm_invoice_seperator tm_gray_bg"></div>
                        <div className="tm_invoice_info_list">
                          <p className="tm_invoice_number tm_m0 ms-2">
                            Quotation No:{" "}
                            <b className="tm_primary_color ms-2">{item?.quotation_id}</b>
                          </p>
                          <p className="tm_invoice_date tm_m0 ms-2">
                            Enquiry Date:{" "}
                            <b className="tm_primary_color ms-2">
                              {item?.enquiry_date}
                            </b>
                          </p>
                        </div>
                      </div>
                      <div className="tm_invoice_head tm_mb10">
                        <div className="tm_invoice_section tm_invoice_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Customer Details:
                            </b>
                          </p>
                          <div>
                            <div>
                              <b>Name:</b> {item?.customer_user_name}
                              <br />
                              <b>Email:</b> {item?.customer_email}
                              <br />
                              <b>Phone:</b> {item?.customer_contact_no}
                              <br />
                              <b>Id Proof No:</b> {item?.customer_id_proof_no}
                            </div>
                          </div>
                        </div>
                        <div className="tm_invoice_section tm_pay_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Service Provider Details:
                            </b>
                          </p>
                          <div>
                            <b>Name:</b> {item?.service_provider_name}
                            <br />
                            <b>Vehicle Number:</b> {item?.vehicle_number}
                            <br />
                            <b>Make:</b> {item?.make}
                            <br />
                            <b>Model:</b> {item?.model}
                            <br />
                            <b>Driver:</b> {item?.driver}
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="Table"
                        >
                          <thead className="table-light">
                            <tr>
                              {/* <th className="index" data-sort="index">#</th> */}
                              <th className="sort" data-sort="customer_name">
                                Quot ID
                              </th>
                              <th
                                className="sort"
                                data-sort="service_provider_name"
                              >
                                Trip Type
                              </th>
                              <th className="sort" data-sort="quotation_id">
                                Pickup Location
                              </th>
                              <th className="sort" data-sort="view_invoice">
                                Drop Location
                              </th>
                              <th className="sort" data-sort="send_email">
                                No Of Horse
                              </th>
                              {/* <th className="sort" data-sort="quotation_id">
                                Tax
                              </th>
                              <th className="sort" data-sort="view_invoice">
                                Discount
                              </th> */}
                              <th className="sort" data-sort="send_email">
                                Final Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {quotaionList.map((item, index)=>{
                              return(
                                <tr key={index}>
                                  {/* <td className="index text-center">{index + 1}</td> */}
                                  <td className="customer_name">{item.quotation_id}</td>
                                  <td className="service_provider_name">{item.trip_type}</td>
                                  <td className="quotation_id">{item.pickup_location}</td>
                                  <td className="quotation_id">{item.drop_location}</td>
                                  <td className="quotation_id">{item.no_of_horse}</td>
                                  {/* <td className="quotation_id">{item.tax_amount}</td>
                                  <td className="quotation_id">{item.discount_amount}</td> */}
                                  <td className="quotation_id">{item.final_amount}</td>
                                </tr>
                            )})}
                            {/* Add more rows as needed */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))} 
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setQuatList_modal(false);
                }}
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* View modal */}
      <Modal
        className="extra-width"
        isOpen={view_modal}
        toggle={() => {
          setView_modal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setView_modal(false);
          }}
        >
          Confirm Quotation
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            {quotaion?.map((item, index) => (
              <div key={index} className="tm_container">
                <div className="tm_invoice_wrap">
                  <div
                    className="tm_invoice tm_style1"
                    id="tm_download_section"
                  >
                    <div className="tm_invoice_in">
                      <div className="tm_invoice_head tm_align_center tm_mb20">
                        <div className="tm_invoice_left">
                          <div className="tm_logo">
                            <img
                              src={Logo}
                              alt="Logo"
                              style={{ height: "50px", width: "50px" }}
                            />
                          </div>
                        </div>
                        <div className="tm_invoice_right tm_text_right">
                          <div className="tm_primary_color tm_f50 tm_text_uppercase tm_font_sixe=50px">
                            <font size="6">QUOTATION</font>
                          </div>
                        </div>
                      </div>
                      <div className="tm_invoice_info tm_mb20">
                        <div className="tm_invoice_seperator tm_gray_bg"></div>
                        <div className="tm_invoice_info_list">
                          <p className="tm_invoice_number tm_m0 ms-2">
                            Quotation No:{" "}
                            <b className="tm_primary_color ms-2">{item?.quotation_id}</b>
                          </p>
                          <p className="tm_invoice_date tm_m0 ms-2">
                            Enquiry Date:{" "}
                            <b className="tm_primary_color ms-2">
                              {item?.enquiry_date}
                            </b>
                          </p>
                        </div>
                      </div>
                      <div className="tm_invoice_head tm_mb10">
                        <div className="tm_invoice_section tm_invoice_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Customer Details:
                            </b>
                          </p>
                          <div>
                            <p>
                              Name: 
                              {item?.cName}
                              <br />
                              Email: 
                              {item?.customer_email}
                              <br />
                              Username: 
                              {item?.customer_user_name}
                              <br />
                              Phone: 
                              {item?.customer_contact_no}
                              <br />
                              Id Proof No: 
                              {item?.customer_id_proof_no}
                            </p>
                          </div>
                        </div>
                        <div className="tm_invoice_section tm_pay_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Service Provider Details:
                            </b>
                          </p>
                          <p>
                            Name: 
                            {item?.service_provider_name}
                            <br />
                            Vehicle Number: 
                            {item?.vehicle_number}
                            <br />
                            Make: 
                            {item?.make}
                          </p>
                        </div>
                      </div>
                      <div className="tm_invoice_footer">
                        <div className="tm_left_footer">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Reqirments:
                            </b>
                          </p>
                          <p className="tm_m0">
                            <h5>Special Requirements : </h5>
                            {item?.special_requirement}
                            <br />
                            <h5>Additional Service :</h5> 
                            {item?.additional_service}
                          </p>
                        </div>
                        <div className="tm_right_footer">
                          <div className="tm_card">
                            <div className="tm_card_header">
                              Quotation Summary
                            </div>
                            <div className="tm_card_content">
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Trip Type:
                                </span>
                                <span className="tm_card_value">
                                  {item?.trip_type}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Pickup Location:
                                </span>
                                <span className="tm_card_value">
                                  {item?.pickup_location},{" "}
                                  {item?.pickup_country}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Pickup Date:
                                </span>
                                <span className="tm_card_value">
                                  {item?.pickup_date}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Drop Location:
                                </span>
                                <span className="tm_card_value">
                                  {item?.drop_location}, {item?.drop_country}
                                </span>
                              </div>
                              {/* <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Drop Time:
                                </span>
                                <span className="tm_card_value">
                                  {item?.drop_time}
                                </span>
                              </div> */}
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Drop Date:
                                </span>
                                <span className="tm_card_value">
                                  {item?.drop_date}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Number of Horses:
                                </span>
                                <span className="tm_card_value">
                                  {item?.no_of_horse}
                                </span>
                              </div>
                            </div>
                            <div className="tm_card_footer">
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label">
                                  Transportation Insurance:
                                </span>
                                <span className="tm_card_footer_value">
                                  {item?.transportation_insurance_coverage}
                                </span>
                              </div>
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label">
                                  Tax:
                                </span>
                                <span className="tm_card_footer_value">
                                  {item?.tax_amount}
                                </span>
                              </div>
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label">
                                  Discount:
                                </span>
                                <span className="tm_card_footer_value">
                                  {item?.discount_amount}
                                </span>
                              </div>
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label tm_bold">
                                  Final Amount:
                                </span>
                                <span className="tm_card_footer_value tm_bold">
                                  {item?.final_amount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setView_modal(false);
                }}
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        className="modal fade zoomIn"
        id="deleteRecordModal"
        centered
      >
        <div className="modal-header">
          <Button
            type="button"
            onClick={() => setmodal_delete(false)}
            className="btn-close"
            aria-label="Close"
          >
            {" "}
          </Button>
        </div>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you Sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Record ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => setmodal_delete(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ListQuotationsTable;
