/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the enquiries overall functionalities are coded in this file         //
//      The file contain the View all enquiry model, View particular enquiry data model    //
//       The object and functionalities are written in this file.                          //
/////////////////////////////////////////////////////////////////////////////////////////////


// Importing the react component
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import config from '../../../config';

/**Using for form validation */
import { useFormik } from "formik";

// Importing the Enquiry Data 
import { getEnquiriesData, getSingleEnquiryData, getSPUserName, getSPVehiclesData, getSPDriverData, getDiscounts } from "../../../helpers/ApiRoutes/getApiRoutes";

//The purpose of the Breadcrumbs component is to display a breadcrumb navigation element. 
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { func } from 'prop-types';
// Import Flatepicker for using  date pick
import Flatpickr from "react-flatpickr";

// The name of the function. Which will be executed and used all over program. This funtion is having all the code
const ListEnquiriesTable = () => 
{
    const [view_modal, setView_modal] = useState(false);
    const [enquiry, setEnquiry] = useState(null);
    const [enquiries, setEnquiries] = useState([]);
    const [modal, setModal] = useState(false);
    const [ serviceProviders, setServiceProviders ] = useState([]);
    const [ sPVechiles, setSPVechiles ] = useState([]);
    const [ sPDrivers, setSPDrivers ] = useState([]);
    const [ discounts, setDiscounts ] = useState([]);
    // const [selectedImage, setSelectedImage] = useState('')
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("")
    const pageLimit = config.pageLimit;

    //  The useEffect hook is used to perform some initialization logic when the component mounts

    useEffect(() => {
        getAllData(1)
    }, []);

    const initialValues = {
        customer_id : enquiry ? enquiry[0]?.customer_id : "",
        customer_name : enquiry ? enquiry[0]?.customer_name : "",
        enquiry_id : enquiry ? enquiry[0]?.id : "",
        vehicle_id : enquiry ? enquiry[0]?.vehicle_id : "",
        vehicle_number : enquiry ? enquiry[0]?.vehicle_number : "",
        service_provider_id : enquiry ? enquiry[0]?.service_provider_id : "",
        service_provider_name : enquiry ? enquiry[0]?.service_provider_name : "",
        trip_type : enquiry ? enquiry[0]?.trip_type : "",
        pickup_location : enquiry ? enquiry[0]?.pickup_location : "",
        pickup_country : enquiry ? enquiry[0]?.pickup_country : "",
        drop_location : enquiry ? enquiry[0]?.drop_location : "",
        drop_country : enquiry ? enquiry[0]?.drop_country : "",
        no_of_horse : enquiry ? enquiry[0]?.no_of_horse : "",

        tax_amount : "",
        discount_amount : "",
        final_amount : "",
        special_requirement : "",
        additional_service : "",
        
        transportation_insurance_coverage : "",
        drop_date : "",
        pickup_date : "",
        discount_type_id : "",
        driver_id : "",
    };

    // validation function
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            addQuatation(values)
        }
    });

    async function addQuatation(val){
        console.log("vvv",val)
        // let getEnqData = await getEnquiriesData(1);
    }


    // function for get data all service provider data
    async function getAllData(page) {
        let getEnqData = await getEnquiriesData(page || 1);
        setEnquiries(getEnqData.enquiries);
        setPageNumber(page);
        setNumberOfData(getEnqData.totalCount);
    }

    /**
     * The below function is for the view buttone. It will be used for getting the details of the particular enquiry.
     */

    async function tog_view(productId)
    {
        let singleEnqData = await getSingleEnquiryData(productId)
        setEnquiry(singleEnqData.enquiry);
        setView_modal(prevState => !prevState);
    }

    /**
     * This function is typically used in a React component and is responsible for toggling the value of a state variable, modal, by calling the setModal function.
     */

    const tog_confirm = async (id) => 
    {
        console.log("enq",validation.values.customer_id)
        let singleEnqData = await getSingleEnquiryData(id)
        let serviceProviderData = await getSPUserName()
        console.log("spid",singleEnqData.enquiry[0]?.service_provider_id)
        const sPVechilesData = await getSPVehiclesData(singleEnqData.enquiry[0]?.service_provider_id) 
        setSPVechiles(sPVechilesData.vehicles)
        const sPDriverData = await getSPDriverData(singleEnqData.enquiry[0]?.service_provider_id)
        setSPDrivers(sPDriverData.drivers)
        const discountsData = await getDiscounts()
        setDiscounts(discountsData)
        console.log("serviceProviderData",sPDriverData)
        setServiceProviders(serviceProviderData.serviceProviders)
        setEnquiry(singleEnqData.enquiry);
        setModal(!modal);
    };  
    
    async function serviceProviderSelected(id){
        const sPVechilesData = await getSPVehiclesData(id) 
        const sPDriverData = await getSPDriverData(id)
        setSPDrivers(sPDriverData.drivers)
        setSPVechiles(sPVechilesData.vehicles)
        

    }


    // the execution of all the object and element are written inside the return. Whenever this file will be called only the code inside the return written will be returned
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Header of the Page */}
                    <Breadcrumbs title="Tables" breadcrumbItem="Enquiries" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">View</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                            </Col>
                                        </Row>
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        {/* This are the columns and column heading in the enquiry page */}
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Customer Name</th>
                                                        <th className="sort" data-sort="service_provider">Service Provider Name</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="created_date">Created At</th>
                                                        <th className="sort" colSpan={2} data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {/* The data we will be getting to showcase on enquiry page is
                                                    from a object. We will map and show them one by one. The below function will be used this */}
                                                    {/* 'enquiries' is having all the enquiry data. */}
                                                    {/* Index is the number of the data. i.e Serial number */}
                                                    {enquiries.map((item,index) => (
                                                        <tr key={item.id}>
                                                        {/* Below we are intialize the enquiry data */}
                                                            <th scope="row"> {index + 1} </th> {/* // Serial Number */}
                                                            <td className="customer_name">{item.customer_name}</td> {/* Customer name */}
                                                            <td className="service_provider">{item.service_provider}</td> {/* Customer Email */}
                                                            <td className="status">{item.status}</td> {/* Customer Phone */}
                                                            <td className="created_date">{item.created_at}</td> {/* Enquiry Time */}
                                                            {/* This is the place from where we are calling he view button and function. Which is used to show
                                                            particular enquiry data fully. */}
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_view(item.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">
                                                                                View
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => tog_confirm(item.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">
                                                                                Confirm
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {/* The below the message when there is not data to showcase on the page */}
                                            <div className="noresult" style={{ display: "none" }}>
                                                <div className="text-center">
                                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                                                    </lord-icon>
                                                    <h5 className="mt-2">Sorry! No Result Found</h5>
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                        orders for you search.</p>
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

               {/****************************** Add Modal *************/}
            <Modal className="extra-width" isOpen={modal} toggle={() => { setModal(false); setEnquiry(null) }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setModal(false); setEnquiry(null) }}>Confirm Enquery</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {/* {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null} */}
                        <div className="mb-3">
                                <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    name="customer_name"
                                    id="customerName-field"
                                    className="form-control"
                                    value={validation.values.customer_name || ""}
                                    onChange={validation.handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="service_provider_id-field" className="form-label">Service Provider Name</label>
                                    <select
                                        data-trigger
                                        name="service_provider_id"
                                        id="service_provider_id-field"
                                        className="form-control"
                                        value={validation.values.service_provider_id || ""}
                                        onChange={(e) => {validation.handleChange(e); serviceProviderSelected(e.target.value);}}
                                        onBlur={validation.handleBlur}
                                        required
                                    >
                                        <option value="">Select Service Provider</option>
                                    {serviceProviders.map((item, index) => (
                                        <option key={index} value={item.id}>{item.user_name}</option>
                                    ))}
                                    </select>
                                </div>
                                {/* The below element is for the vehicle number feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="vehicle_id-field" className="form-label">Vehicle Number</label>
                                    <select
                                        data-trigger
                                        name="vehicle_id"
                                        id="vehicle_id-field"
                                        className="form-control"
                                        value={validation.values.vehicle_id || ""}
                                        // onSelect={enquiry_details(validation.values.service_provider_id)}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        // required
                                    >
                                        <option value="">Select Any Vehicle Number</option>
                                        {sPVechiles.map((item, index) => (
                                            <option key={index} value={item.id}>{item.vehicle_number}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="trip_type-field" className="form-label">Trip Type</label>
                                    <select
                                        data-trigger
                                        name="trip_type"
                                        id="trip_type-field"
                                        className="form-control"
                                        value={validation.values.trip_type || ""}
                                        // onSelect={enquiry_details(validation.values.service_provider_id)}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        required
                                    >
                                        <option value="">Select Trip Type</option>
                                        <option value="PRIVATE">Private</option>
                                        <option value="GCC">GCC</option>
                                        <option value="SHARING">Sharing</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pickup_country-field" className="form-label">Pickup Country</label>
                                    <input
                                        type="text"
                                        name="pickup_country"
                                        id="pickup_country-field"
                                        className="form-control"
                                        value={validation.values.pickup_country || ""}
                                        onChange={validation.handleChange}
                                        required
                                    />
                                </div>

                                {/* The below element is for the pickup location feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="pickup_location-field" className="form-label">Pickup Location</label>
                                    <input
                                        type="text"
                                        name="pickup_location"
                                        id="pickup_location-field"
                                        className="form-control"
                                        value={validation.values.pickup_location || ""}
                                        onChange={validation.handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="drop_country-field" className="form-label">Drop Country</label>
                                    <input
                                        type="text"
                                        name="drop_country"
                                        id="drop_country-field"
                                        className="form-control"
                                        value={validation.values.drop_country || ""}
                                        onChange={validation.handleChange}
                                        required
                                    />
                                </div>

                                {/* The below element is for the drop location feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="drop_location-field" className="form-label">Drop Location</label>
                                    <input
                                        type="text"
                                        name="drop_location"
                                        id="drop_location-field"
                                        className="form-control"
                                        value={validation.values.drop_location || ""}
                                        onChange={validation.handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="no_of_horse-field" className="form-label">Number of Hourse</label>
                                    <input
                                        type="text"
                                        name="no_of_horse"
                                        id="no_of_horse-field"
                                        className="form-control"
                                        value={validation.values.no_of_horse || ""}
                                        onChange={validation.handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="driver_id-field" className="form-label">Driver</label>
                                    <select
                                        data-trigger
                                        name="driver_id"
                                        id="driver_id-field"
                                        className="form-control"
                                        value={validation.values.driver_id || ""}
                                        // onSelect={enquiry_details(validation.values.service_provider_id)}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        // required
                                    >
                                        <option value="">Select Any Vehicle Number</option>
                                        {sPDrivers.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="discount_type_id-field" className="form-label">Discount</label>
                                    <select
                                        data-trigger
                                        name="discount_type_id"
                                        id="discount_type_id-field"
                                        className="form-control"
                                        value={validation.values.discount_type_id || ""}
                                        // onSelect={enquiry_details(validation.values.service_provider_id)}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        // required
                                    >
                                        <option value="">Select Discount</option>
                                        {discounts.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pickup_date-field" className="form-label">Pickup Date</label>
                                    <Flatpickr
                                        className="form-control"
                                        name='pickup_date'
                                        options={{
                                            dateFormat: "d-m-Y"
                                        }}
                                        value= ""
                                        onChange={(dates) =>validation.setFieldValue('pickup_date', dates[0])}
                                        placeholder={validation.values.pickup_date || "Select Date"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="drop_date-field" className="form-label">Drop Date</label>
                                    <Flatpickr
                                        className="form-control"
                                        name='drop_date'
                                        options={{
                                            dateFormat: "d-m-Y"
                                        }}
                                        value= ""
                                        onChange={(dates) =>validation.setFieldValue('drop_date', dates[0])}
                                        placeholder={validation.values.drop_date || "Select Date"}
                                    />
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
                                                        
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setModal(false); setEnquiry(null) }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Confirm Enquery</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>


            {/* View Modal function code*/}
            <Modal className="extra-width" isOpen={view_modal} centered >
            <ModalHeader toggle={() => {setView_modal(false);  setEnquiry(null);}}>View Enquiry</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        {enquiry && enquiry.length > 0 && enquiry.map((item, index) => (
                            <div key={index}>
                                {/* The below element is for the customer name feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    name="customer_name"
                                    id="customerName-field"
                                    className="form-control"
                                    value={item.customer_name}
                                    readOnly
                                    />
                                </div>
                                {/* The below element is for the customer contact number feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="customer_contact_no-field" className="form-label">Customer Contact Number</label>
                                    <input
                                        type="text"
                                        name="customer_contact_no"
                                        id="customer_contact_no-field"
                                        className="form-control"
                                        value={item.customer_contact_no}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the service provider name feild in the view button.
                                Which is for details of particular enquiry detail */}                                
                                <div className="mb-3">
                                    <label htmlFor="service_provider-field" className="form-label">Service Provider Name</label>
                                    <input
                                        type="text"
                                        name="service_provider"
                                        id="service_provider-field"
                                        className="form-control"
                                        value={item.service_provider_name}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the vehicle number feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="vehicle_number-field" className="form-label">Vehicle Number</label>
                                    <input
                                        type="text"
                                        name="vehicle_number"
                                        id="vehicle_number-field"
                                        className="form-control"
                                        value={item.vehicle_number}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="trip_type-field" className="form-label">Trip Type</label>
                                    <input
                                        type="text"
                                        name="trip_type"
                                        id="trip_type-field"
                                        className="form-control"
                                        value={item.trip_type}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pickup_country-field" className="form-label">Pickup Country</label>
                                    <input
                                        type="text"
                                        name="pickup_country"
                                        id="pickup_country-field"
                                        className="form-control"
                                        value={item.pickup_country}
                                        readOnly
                                    />
                                </div>

                                {/* The below element is for the pickup location feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="pickup_location-field" className="form-label">Pickup Location</label>
                                    <input
                                        type="text"
                                        name="pickup_location"
                                        id="pickup_location-field"
                                        className="form-control"
                                        value={item.pickup_location}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="drop_country-field" className="form-label">Drop Country</label>
                                    <input
                                        type="text"
                                        name="drop_country"
                                        id="drop_country-field"
                                        className="form-control"
                                        value={item.drop_country}
                                        readOnly
                                    />
                                </div>

                                {/* The below element is for the drop location feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="drop_location-field" className="form-label">Drop Location</label>
                                    <input
                                        type="text"
                                        name="drop_location"
                                        id="drop_location-field"
                                        className="form-control"
                                        value={item.drop_location}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="no_of_horse-field" className="form-label">Number of Hourse</label>
                                    <input
                                        type="text"
                                        name="no_of_horse"
                                        id="no_of_horse-field"
                                        className="form-control"
                                        value={item.no_of_horse}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="created_at-field" className="form-label">Created At</label>
                                    <input
                                        type="text"
                                        name="created_at"
                                        id="created_at-field"
                                        className="form-control"
                                        value={item.created_at}
                                        readOnly
                                    />
                                </div>

                                {/* The below element is for the description feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="description-field" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description-field"
                                        className="form-control"
                                        value={item.description}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ))}
                    </ModalBody> {/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setView_modal(false); setEnquiry(null);}}>Close</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default ListEnquiriesTable;