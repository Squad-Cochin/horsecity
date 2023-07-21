/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//      The design of the vehicles overall functionalities are coded in this file          //
//      The file contain the view all vehicle model, view particular vehicle data model    //
//      The object and functionalities are written in this file.                           //
//      Addittion and deletion of the vehicles are done from this file itself.             //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

// Importing the inbuilt component
import React, { useState, useEffect } from 'react';
import {Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
// import List from 'list.js';
import Flatpickr from "react-flatpickr";
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';

// The code you provided imports the useFormik hook from the "formik" library. The useFormik hook is a custom hook provided by Formik, which is a popular form library for React.
import { useFormik } from "formik";

//The purpose of the Breadcrumbs component is to display a breadcrumb navigation element. 
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//Get vehicles data
import { removeVehicle } from '../../../helpers/ApiRoutes/removeApiRoutes';
import { getVehiclesData, getSPUserName, getSingleVechileData } from '../../../helpers/ApiRoutes/getApiRoutes'
import { addNewVehicle } from '../../../helpers/ApiRoutes/addApiRoutes';
import { updateVehicle, updateVechileStatus } from '../../../helpers/ApiRoutes/editApiRoutes';
// import { Vehicles } from '../../../CommonData/Data';
import config from '../../../config';

// The name of the function is ListVehiclesTable. Which will be executed and used all over program. This funtion is having all the code
const ListVehiclesTable = () => 
{
    const [vehicles, setVehicles] = useState([]); // State variable to store vehicles
    const [modal_list, setmodal_list] = useState(false); // State variable to control list modal visibility
    const [add_list, setAdd_list] = useState(false); // State variable to control add modal visibility
    const [vehicle, setVehicle] = useState([]); // State variable to store a single vehicle
    const [modal_delete, setmodal_delete] = useState(false); // State variable to control delete modal visibility
    const [view_modal, setView_modal] = useState(false); // State variable to control view modal visibility
    const [sproviders, setSproviders] = useState([]);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("")
    const pageLimit = config.pageLimit;

    const navigate = useNavigate(); // Use the 'useNavigate' hook from React Router

    // // Execute the code inside the useEffect hook when the component mounts
    // useEffect(() => {
    // // Existing List
    // const existOptionsList = {
    //     valueNames: ['contact-name', 'contact-message'],
    // };
    // new List('contact-existing-list', existOptionsList);
    // // Initialize List.js with ID 'contact-existing-list' and options from 'existOptionsList'.
    // // This creates a list with the ability to filter based on the values of 'contact-name' and 'contact-message'.

    // // Fuzzy Search list
    // new List('fuzzysearch-list', {
    //     valueNames: ['name'],
    // });
    // // Initialize List.js with ID 'fuzzysearch-list' and options specifying that fuzzy search should be performed on 'name'.
    // // This enables searching and filtering the list based on the values of 'name' using fuzzy search algorithm.

    // // Pagination list
    // new List('pagination-list', {
    //     valueNames: ['pagi-list'],
    //     page: 3,
    //     pagination: true,
    // });
    // // Initialize List.js with ID 'pagination-list' and options specifying pagination.
    // // This creates a paginated list where each page displays three items at a time.
    // });

    // Execute the code inside the useEffect hook when the component mounts
    useEffect(() => {
        getAllData(1)
    }, []);

    // The Below function is used when we are adding the vehicle
    function tog_list(param, productId) 
    {
    if (param === 'ADD') {
        setAdd_list(!add_list); // Toggle 'add_list' state
    }
        const data = vehicles?.find((item) => item?.id === productId); // Find the vehicle data with matching 'productId' in the 'vehicles' array
        setVehicle([data]); // Set the 'vehicle' state to the found vehicle data
        setmodal_list(!modal_list); // Toggle 'modal_list' state
    }

    // The Below function is used when we are displaying the particular vehicle data.
    async function tog_view(productId) {
        console.log("rr",productId)
        let data = await getSingleVechileData(productId)
        setVehicle(data); // Set the 'vehicle' state to the found vehicle data
        setView_modal(!view_modal); // Toggle 'view_modal' state
    }

    // The below function is for remove button of a particular vehicle.
    async function remove_data(id)
    {
        await removeVehicle(id); // Call the 'removeVehicle' function with 'id' parameter
        window.location.reload();
    }

    // The below function is for delete button of a particular vehicle.
    function tog_delete()
    {
        setmodal_delete(!modal_delete); // Toggle 'modal_delete' state
    }

     // The below function is the Status button
    function toggleStatus(button, vehiclesId)
    {
        console.log("vid",vehiclesId)
        var currentStatus = button.innerText.trim();
        const vehicle = vehicles.find((v) => v.id === vehiclesId);
        updateVechileStatus(vehicle.id)
        if (currentStatus === 'ACTIVE')
        {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (vehicle)
            {
                vehicle.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE')
        {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (vehicle)
            {
                vehicle.status = 'ACTIVE';
            }
        }
    }
  
    // Later in your code, when setting the initial state
    const initialValues = 
    {
        service_provider: !add_list ? vehicle[0]?.service_provider : '',
        service_provider_id: !add_list ? vehicle[0]?.service_provider_id : '',
        vehicle_number: !add_list ? vehicle[0]?.vehicle_number : '',
        make: !add_list ? vehicle[0]?.make : '',
        model: !add_list ? vehicle[0]?.model : '',
        color: !add_list ? vehicle[0]?.color : '',
        length: !add_list ? vehicle[0]?.length : '',
        breadth: !add_list ? vehicle[0]?.breadth : '',
        height: !add_list ? vehicle[0]?.height : '',
        no_of_horse: !add_list ? vehicle[0]?.no_of_horse : '',
        air_conditioner: !add_list ? vehicle[0]?.air_conditioner : '',
        temperature_manageable: !add_list ? vehicle[0]?.temp_manageable : '',
        vehicle_images: !add_list ? vehicle[0]?.images : [],
        vehicle_registration_number: !add_list ? vehicle[0]?.registration_no : '',
        gcc_travel_allowed: !add_list ? vehicle[0]?.gcc_travel_allowed : '',
        insurance_cover: !add_list ? vehicle[0]?.insurance_cover : '',
        insurance_date: !add_list ? vehicle[0]?.insurance_date : '',
        insurance_policy_no: !add_list ? vehicle[0]?.insurance_policy_no : '',
        insurance_policy_provider: !add_list ? vehicle[0]?.insurance_provider : '',
        insurance_expiry_date: !add_list ? vehicle[0]?.insurance_expiration_date : '',
        vehicle_type: !add_list ? vehicle[0]?.vehicle_type : '',
        vehicle_registration_date: !add_list ? vehicle[0]?.vehicle_registration_date : '',
        vehicle_exipration_date: !add_list ? vehicle[0]?.vehicle_exipration_date : '',
    };

    const validation = useFormik
    ({
        // enableReinitialize: use this flag when initial values need to be changed
        enableReinitialize: true,
        initialValues, // Initial values for the form
        onSubmit: (values) =>
        {
            setmodal_list(false);
            if (add_list) 
            {   
                addVechile(values);
            }
            else
            {
                // Update existing vehicle
                updateVehicle(values); // Call the 'updateVehicle' function with form values as a parameter
                setAdd_list(false); // Reset 'add_list' state to false
                setmodal_list(false); // Reset 'modal_list' state to false
            }
        },
    });

    // function for get data all Vechile data
    async function getAllData(page) {
        let getvehicles = await getVehiclesData(page || 1);
        console.log("ggg",getvehicles)
        let getSP = await getSPUserName();
        setSproviders(getSP.serviceProviders);
        setVehicles(getvehicles?.vehicles);
        setPageNumber(page);
        setNumberOfData(getvehicles?.totalCount);
    }

    async function addVechile(values){
        console.log("adddd",values)
        let addedVechile = await addNewVehicle(values);
        if(addedVechile.code === 200){
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        }else{
            setErrors("")
            setErrors(addedVechile?.message)
        }
    }

    // The execution of all the object and element are written inside the return. Whenever this file will be called only the code inside this return coded will be returned
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Header of the Page */}
                    <Breadcrumbs title="Tables" breadcrumbItem="Vehicles" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="vehiclesTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        {/* This are the columns and column heading in the enquiry page */}
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Provider</th>
                                                        <th className="sort" data-sort="vNumber">Vehicle Number</th>
                                                        <th className="sort" data-sort="email">Make</th>
                                                        <th className="sort" data-sort="no_of_horse">Number of Horse</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {/* The data we will be getting to showcase on vehicle page is
                                                    from a object. We will map and show them one by one. The below function will be used this */}
                                                    {/* 'Vehicles' is having all the enquiry data. */}
                                                    {/* Index is the number of the data. i.e Serial number */}
                                                    {vehicles.map((item, index) => (
                                                        <tr key={item.id}>
                                                            {/* Below we are intialize the vehicle data */}
                                                            <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                            <th scope="row"> {index + 1} </th> {/* Serial Number */}
                                                            <td className="name">{item.service_provider}</td> {/* Name of the service provider */}
                                                            <td className="vhnumber">{item.vehicle_number}</td> {/* Vehicle number of the vehicle */}
                                                            <td className="make">{item.make}</td> {/* Manufaturer of the vehicle */}
                                                            <td className="no_of_horse text-center">{item.no_of_horse}</td> {/* Maximum number of horses a vehicle can carry */}
                                                            {/* This is the place from where we are calling the status button and function */}
                                                            <td>{item.status === "ACTIVE" ?
                                                                <button
                                                                    className="btn btn-sm btn-success status-item-btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#showModal"
                                                                    onClick={(event) => toggleStatus(event.target, item.id)}
                                                                >
                                                                    {item.status}
                                                                </button> :
                                                                <button
                                                                    className="btn btn-sm btn-danger status-item-btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#showModal"
                                                                    onClick={(event) => toggleStatus(event.target, item.id)}
                                                                >
                                                                    {item.status}
                                                                </button>
                                                                }
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    {/* This is the place from where we are calling the view button and function */}
                                                                    <div className="view">
                                                                        <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_view(item.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">View</button>
                                                                    </div>
                                                                    {/* This is the place from where we are calling the edit button and function */}
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => tog_list('EDIT', item.id)}>Edit</button>
                                                                    </div>
                                                                    {/* This is the place from where we are calling the 'view image' button and function */}
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={()=>navigate(`/image-gallery/${item.id}`)}>View Images</button>
                                                                    </div>
                                                                    
                                                                    {/* This is the place from where we are calling the remove button and function */}
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => remove_data(item.id)} data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* If there are no data to show, then thic line of code will be executed */}
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

                                        {/* The below is having the code of the pagination of the page.
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

            {/* Add new vehicle modal */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                {/* The below line is for the heading of pop up of edit exixing vehicle or adding new vehicle. */}
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}> {add_list ? 'Add Vehicle' : 'Edit Vehicle'} </ModalHeader>
                <form className="tablelist-form" onSubmit={validation.handleSubmit}>
                    <ModalBody>                        
                        {/* The below element is adding the name of the service provider. Whose vehicle is being added */}
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        <div className="mb-3">
                            <label htmlFor="serviceprovider-field" className="form-label">
                                Service Provider
                            </label>
                            <select
                                data-trigger
                                name="service_provider_id"
                                id="serviceprovider-field"
                                className="form-control"
                                value={validation.values.service_provider_id || ""}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            >
                                <option value="">Select Service Provider</option>
                            {sproviders.map((item, index) => (
                                <option key={index} value={item.id}>{item.user_name}</option>
                            ))}
                            </select>
                        </div>

                        {/* The below element is adding the number of the number plate of the vehcile */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_number-field" className="form-label">Vehicle Number</label>
                            <input
                                type="text"
                                id="vehicle_number-field"
                                className="form-control"
                                name='vehicle_number'
                                value={validation.values.vehicle_number || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Number"
                                required
                            />
                        </div>

                        {/* The below element is adding the name of the manufacturer of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_company-field" className="form-label">Vehicle Company</label>
                            <input
                                type="text"
                                id="vehicle_company-field"
                                name='make'
                                className="form-control"
                                value={validation.values.make || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Company"
                                required
                            />
                        </div>
                        {/* The below element is adding the model vehicle */}
                        <div className="mb-3">
                            <label htmlFor="modal-field" className="form-label">Vehicle Model</label>
                            <input
                                type="text"
                                id="modal-field"
                                name='models' // Updated the name attribute to 'models'
                                className="form-control"
                                value={validation.values.models || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Model"
                                required
                            />
                        </div>

                        {/* The below element is for adding the color of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_color-field" className="form-label">Vehicle Color</label>
                            <input
                                type="color"
                                id="vehicle_color-field"
                                className="form-control"
                                name='color'
                                value={validation.values.color || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Color"
                                required
                            />
                        </div>
                        
                        {/* The below element is for adding the length of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_length-field" className="form-label">Vehicle Length (feet)</label>
                            <input
                                type="text"
                                id="vehicle_length-field"
                                className="form-control"
                                name='length'
                                value={validation.values.length || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Length In (feet)"
                                required
                            />
                        </div>

                        {/* The below element is for adding the breadth of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_breadth-field" className="form-label">Vehicle Breadth (feet)</label>
                            <input
                                type="text"
                                id="vehicle_breadth-field"
                                className="form-control"
                                name='breadth'
                                value={validation.values.breadth || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Breadth In (feet)"
                                required
                            />
                        </div>

                        {/* The below element is for adding the height of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_height-field" className="form-label">Vehicle Height (feet)</label>
                            <input
                                type="text"
                                id="vehicle_height-field"
                                className="form-control"
                                name='height'
                                value={validation.values.height || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Height in (feet)"
                                required
                            />
                        </div>

                        {/* The below element is for adding the maximum number of horses a vehicle can carry. */}
                        <div className="mb-3">
                            <label htmlFor="no_of_horses-field" className="form-label">Number Of Horses</label>
                            <select
                                id="no_of_horses-field"
                                className="form-control"
                                name='no_of_horse'
                                value={validation.values.no_of_horse || ""}
                                onChange={validation.handleChange}
                                required
                            >
                                {Array.from({ length: 10 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>

                        {/* The below element is for select. Whether the vehicle have a air conditioner or not. */}
                        <div className="mb-3">
                            <label className="form-label">Air Conditioner</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="air_conditioner-yes"
                                    name="air_conditioner"
                                    className="form-check-input"
                                    value="YES"
                                    // checked={validation.values.air_conditioner === 'YES'}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label htmlFor="air_conditioner-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="air_conditioner-no"
                                    name="air_conditioner"
                                    className="form-check-input"
                                    value="NO"
                                    // checked={validation.values.air_conditioner === 'NO'}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label htmlFor="air_conditioner-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for select. Whether the vehicle have a Temperature Manageable functionality or not. */}
                        <div className="mb-3">
                            <label className="form-label">Temperature Manageable</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="temperature_manageable-yes"
                                    name="temperature_manageable"
                                    className="form-check-input"
                                    value={"YES"}
                                    // checked={validation.values.temperature_manageable === 'YES'}
                                    onChange={validation.handleChange}
                                    required
                                />
                                <label htmlFor="temperature_manageable-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="temperature_manageable-no"
                                    name="temperature_manageable"
                                    className="form-check-input"

                                    value={"NO"}
                                    // checked={validation.values.temperature_manageable === 'NO'}
                                    onChange={validation.handleChange}
                                    required
                                />
                                <label htmlFor="temperature_manageable-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for uploading the images of the vehicle. */} 
                        {/* <div className="mb-3">
                            <label htmlFor="vehicle_image-field" className="form-label">Vehicle Image</label>
                            <input
                                type="file"
                                name='vehicle_image'
                                id="vehicle_image-field"
                                className="form-control"
                                placeholder="Upload Vehicle Image"
                                required
                            />
                        </div> */}

                        {/* The below element is for adding the registration number of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="vehicle_registration_number-field" className="form-label">Vehicle Registration Number</label>
                            <input
                                type="text"
                                id="vehicle_registration_number-field"
                                className="form-control"
                                name='vehicle_registration_number'
                                value={validation.values.vehicle_registration_number || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Registration Number"
                                required
                            />
                        </div>

                        {/* The below element is for Selecting. Whether vehicle is allowed to travel within the GCC countries. */} 
                        <div className="mb-3">
                            <label className="form-label">GCC Travel Allowed</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="gcc_travel_allowed-yes"
                                    name="gcc_travel_allowed"
                                    className="form-check-input"
                                    value="YES"
                                    // checked={validation.values.gcc_travel_allowed === "YES"}
                                    onChange={validation.handleChange}
                                    required
                                />
                                <label htmlFor="gcc_travel_allowed-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="gcc_travel_allowed-no"
                                    name="gcc_travel_allowed"
                                    className="form-check-input"
                                    value="NO"
                                    // checked={validation.values.gcc_travel_allowed === "NO"}
                                    onChange={validation.handleChange}
                                    required
                                />
                                <label htmlFor="gcc_travel_allowed-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for selecting. Whether vehicle has the insuarance. */} 
                        <div className="mb-3">
                            <label className="form-label">Insurance Covered</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="insurance_covered-yes"
                                    name="insurance_cover"
                                    className="form-check-input"
                                    value="YES"
                                    // checked={validation.values.insurance_cover === "YES"}
                                    onChange={validation.handleChange}
                                    required
                                />
                                <label htmlFor="insurance_covered-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="insurance_covered-no"
                                    name="insurance_cover"
                                    value='NO'
                                    // checked={validation.values.insurance_cover === "NO"}
                                    onChange={validation.handleChange}
                                    className="form-check-input"
                                    required
                                />
                                <label htmlFor="insurance_covered-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for adding the insurance date of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_date-field" className="form-label">Insurance Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name='insurance_date'
                                value={validation.values.insurance_date || ""}
                                onChange={(dates) =>validation.setFieldValue('insurance_date', dates[0])}
                                placeholder="Select Insurance Date"
                            />
                        </div>

                        {/* The below element is for adding the insurance policy number of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_policy_no-field" className="form-label">Insurance Policy Number</label>
                            <input
                                type="text"
                                id="insurance_policy_no-field"
                                className="form-control"
                                name='insurance_policy_no'
                                value={validation.values.insurance_policy_no || ""}
                                onChange={validation.handleChange}

                                placeholder="Enter Insurance Policy Number"
                                required
                            />
                        </div>

                        {/* The below element is for adding the company of the insurance provider of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_policy_provider-field" className="form-label">Insurance Policy Provider</label>
                            <input
                                type="text"
                                id="insurance_policy_provider-field"
                                className="form-control"
                                name='insurance_policy_provider'
                                value={validation.values.insurance_policy_provider || ""}
                                onChange={validation.handleChange}

                                placeholder="Enter Insurance Policy Provider"
                                required
                            />
                        </div>

                        {/* The below element is for adding the date. When the insurance of the vehicle will expire. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_expiry_date-field" className="form-label">Insurance Expiry Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name='insurance_expiry_date'
                                value={validation.values.insurance_expiry_date || ""}
                                onChange={(dates) =>validation.setFieldValue('insurance_expiry_date', dates[0])}
                                placeholder="Select Insurance Expiry Date"
                            />
                        </div>

                        {/* The below element is for seleting the type of vehicle. */} 
                        <div className="mb-3">
                            <label className="form-label">Vehicle Type</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="vehicle_type-private"
                                    name="vehicle_type"
                                    className="form-check-input"
                                    value="PRIVATE"
                                    // checked={validation.values.vehicle_type === "PRIVATE"}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label htmlFor="vehicle_type-private" className="form-check-label">PRIVATE</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="vehicle_type-gcc"
                                    name="vehicle_type"
                                    className="form-check-input"
                                    value="GCC"
                                    // checked={validation.values.vehicle_type === "GCC"}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label htmlFor="vehicle_type-gcc" className="form-check-label">GCC</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="vehicle_type-sharing"
                                    name="vehicle_type"
                                    className="form-check-input"
                                    value="SHARING"
                                    // checked={validation.values.vehicle_type === "SHARING"}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    required
                                />
                                <label htmlFor="vehicle_type-sharing" className="form-check-label">SHARING</label>
                            </div>
                        </div>

                        {/* The below element is for seleting the vehicle registration date. */} 
                        <div className="mb-3">
                            <label htmlFor="vehicle_registration_date-field" className="form-label">Vehicle Registration Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name='vehicle_registration_date'
                                value={validation.values.vehicle_registration_date || ""}
                                onChange={(dates) =>validation.setFieldValue('vehicle_registration_date', dates[0])}
                                placeholder="Select Vehicle Registration Date"
                            />
                        </div>

                        {/* The below element is for seleting the vehicle expiration date. */} 
                        <div className="mb-3">
                            <label htmlFor="vehicle_exipration_date-field" className="form-label">Vehicle Expiration Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                name='vehicle_exipration_date'
                                value={validation.values.vehicle_exipration_date || ""}
                                onChange={(dates) =>validation.setFieldValue('vehicle_exipration_date', dates[0])}
                                placeholder="Select Vehicle Expiration Date"
                            />
                        </div>
                    </ModalBody>{/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            {/* Close Button */}
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }}>Close</button>
                            {/* Add Driver or Update Driver button */}
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add Vehicle' : 'Update vehicle'}</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* View Modal */}
            {/* This is the view button model. We will get all the details of a particular vehcile. */}
            <Modal className="extra-width" isOpen={view_modal}>
                {/* The below line is for the heading of pop up of view particular vehicle detail . */}
                <ModalHeader className="bg-light p-3" id="exampleModalLabel"  toggle={() =>{ setView_modal(false)}}> View Vehicles</ModalHeader>
                <form className="tablelist-form" onSubmit={validation.handleSubmit}>
                    <ModalBody>

                        {/* The below element is displaying the name of the service provider. Whose vehicle is being added */}
                        <div className="mb-3">
                            <label htmlFor="serviceprovider-field" className="form-label">Service Provider</label>
                            <input
                                type="text"
                                id="serviceprovider-field"
                                className="form-control"
                                name='service_provider'
                                value={validation.values.service_provider || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is displaying the number of the number plate of the vehcile */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_number-field" className="form-label">Vehicle Number</label>
                            <input
                                type="text"
                                id="vehicle_number-field"
                                className="form-control"
                                name='vehicle_number'
                                value={validation.values.vehicle_number || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is displaying the name of the manufacturer of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_company-field" className="form-label">Vehicle Company</label>
                            <input
                                type="text"
                                id="vehicle_company-field"
                                name='make'
                                className="form-control"
                                value={validation.values.make || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is displaying the model vehicle */}
                        <div className="mb-3">
                            <label htmlFor="modal-field" className="form-label">Vehicle Model</label>
                            <input
                                type="text"
                                id="modal-field"
                                name='models' // Updated the name attribute to 'models'
                                className="form-control"
                                value={validation.values.models || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the color of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_color-field" className="form-label">Vehicle Color</label>

                            <div className="col-md-10">
                                <input
                                    className="form-control form-control-color mw-100"
                                    type="color"
                                    value={validation.values.color || ""}
                                    id="example-color-input"
                                />
                            </div>
                        </div>

                        {/* The below element is for displaying the length of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_length-field" className="form-label">Vehicle Length (feet)</label>
                            <input
                                type="text"
                                id="vehicle_length-field"
                                className="form-control"
                                name='length'
                                value={validation.values.length || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the breadth of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_breadth-field" className="form-label">Vehicle Breadth (feet)</label>
                            <input
                                type="text"
                                id="vehicle_breadth-field"
                                className="form-control"
                                name='breadth'
                                value={validation.values.breadth || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the height of the vehicle */}                        
                        <div className="mb-3">
                            <label htmlFor="vehicle_height-field" className="form-label">Vehicle Height (feet)</label>
                            <input
                                type="text"
                                id="vehicle_height-field"
                                className="form-control"
                                name='height'
                                value={validation.values.height || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the maximum number of horses a vehicle can carry. */}

                        <div className="mb-3">
                            <label htmlFor="no_of_horses-field" className="form-label">Number Of Horses</label>
                            <input
                                type="text"
                                id="no_horse-field"
                                className="form-control"
                                name='no_of_horse'
                                value={validation.values.no_of_horse || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for select2. Whether the vehicle have a air conditioner or not. */}
                        <div className="mb-3">
                            <label className="form-label">Air Conditioner</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="air_conditioner-yes"
                                    name="air_conditioner"
                                    className="form-check-input"
                                    value="YES"
                                    checked={validation.values.air_conditioner === 'YES'}
                                    disabled
                                />
                                <label htmlFor="air_conditioner-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="air_conditioner-no"
                                    name="air_conditioner"
                                    className="form-check-input"
                                    value="NO"
                                    checked={validation.values.air_conditioner === 'NO'}
                                    disabled
                                />
                                <label htmlFor="air_conditioner-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for select2. Whether the vehicle have a Temperature Manageable functionality or not. */}
                        <div className="mb-3">
                            <label className="form-label">Temperature Manageable</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="temperature_manageable-yes"
                                    name="temperature_manageable"
                                    className="form-check-input"
                                    value={"YES"}
                                    checked={validation.values.temperature_manageable === 'YES'}
                                    disabled
                                />
                                <label htmlFor="temperature_manageable-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="temperature_manageable-no"
                                    name="temperature_manageable"
                                    className="form-check-input"
                                    value={"NO"}
                                    checked={validation.values.temperature_manageable === 'NO'}
                                    disabled
                                />
                                <label htmlFor="temperature_manageable-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for displaying the images of the vehicle. */} 
                        {/* <div className="mb-3">
                            <label htmlFor="vehicle_image-field" className="form-label">Vehicle Image</label>
                            <input
                                type="file"
                                name='vehicle_image'
                                id="vehicle_image-field"
                                className="form-control"
                                placeholder="Upload Vehicle Image"
                                required
                            />
                        </div> */}

                        {/* The below element is for displaying the registration number of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="vehicle_registration_number-field" className="form-label">Vehicle Registration Number</label>
                            <input
                                type="text"
                                id="vehicle_registration_number-field"
                                className="form-control"
                                name='vehicle_registration_number'
                                value={validation.values.vehicle_registration_number || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for selecting2. Whether vehicle is allowed to travel within the GCC countries. */} 
                        <div className="mb-3">
                            <label className="form-label">GCC Travel Allowed</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="gcc_travel_allowed-yes"
                                    name="gcc_travel_allowed"
                                    className="form-check-input"
                                    value="YES"
                                    checked={validation.values.gcc_travel_allowed === "YES"}
                                    disabled
                                />
                                <label htmlFor="gcc_travel_allowed-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="gcc_travel_allowed-no"
                                    name="gcc_travel_allowed"
                                    className="form-check-input"
                                    value="NO"
                                    checked={validation.values.gcc_travel_allowed === "NO"}
                                    disabled
                                />
                                <label htmlFor="gcc_travel_allowed-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for selecting2. Whether vehicle has the insuarance. */} 
                        <div className="mb-3">
                            <label className="form-label">Insurance Covered</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="insurance_covered-yes"
                                    name="insurance_covered"
                                    className="form-check-input"
                                    value="YES"
                                    checked={validation.values.insurance_cover === "YES"}
                                    disabled
                                />
                                <label htmlFor="insurance_covered-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="insurance_covered-no"
                                    name="insurance_covered"
                                    className="form-check-input"
                                    value="NO"
                                    checked={validation.values.insurance_cover === "NO"}
                                    disabled
                                />
                                <label htmlFor="insurance_covered-no" className="form-check-label">NO</label>
                            </div>
                        </div>

                        {/* The below element is for displaying the insurance date of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_date-field" className="form-label">Insurance Date</label>
                            <input
                                type="text"
                                id="insurance_date-field"
                                className="form-control"
                                name='insurance_date'
                                value={validation.values.insurance_date || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the insurance policy number of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_policy_no-field" className="form-label">Insurance Policy Number</label>
                            <input
                                type="text"
                                id="insurance_policy_no-field"
                                className="form-control"
                                name='insurance_policy_no'
                                value={validation.values.insurance_policy_no || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the company of the insurance provider of the vehicle. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_policy_provider-field" className="form-label">Insurance Policy Provider</label>
                            <input
                                type="text"
                                id="insurance_policy_provider-field"
                                className="form-control"
                                name='insurance_policy_provider'
                                value={validation.values.insurance_policy_provider || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the date. When the insurance of the vehicle will expire. */} 
                        <div className="mb-3">
                            <label htmlFor="insurance_expiry_date-field" className="form-label">Insurance Expiry Date</label>
                            <input
                                type="text"
                                id="insurance_expiry_date-field"
                                className="form-control"
                                name='insurance_expiry_date'
                                value={validation.values.insurance_expiry_date || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the type of vehicle. */} 
                        <div className="mb-3">
                            <label className="form-label">Vehicle Type</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="vehicle_type-private"
                                    name="vehicle_type"
                                    className="form-check-input"
                                    value="PRIVATE"
                                    checked={validation.values.vehicle_type === "PRIVATE"}
                                    disabled
                                />
                                <label htmlFor="vehicle_type-private" className="form-check-label">PRIVATE</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="vehicle_type-gcc"
                                    name="vehicle_type"
                                    className="form-check-input"
                                    value="GCC"
                                    checked={validation.values.vehicle_type === "GCC"}
                                    disabled
                                />
                                <label htmlFor="vehicle_type-gcc" className="form-check-label">GCC</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="vehicle_type-sharing"
                                    name="vehicle_type"
                                    className="form-check-input"
                                    value="SHARING"
                                    checked={validation.values.vehicle_type === "SHARING"}
                                    disabled
                                />
                                <label htmlFor="vehicle_type-sharing" className="form-check-label">SHARING</label>
                            </div>
                        </div>

                        {/* The below element is for displaying the vehicle registration date. */} 
                        <div className="mb-3">
                            <label htmlFor="vehicle_registration_date-field" className="form-label">Vehicle Registration Date</label>
                            <input
                                type="text"
                                id="vehicle_registration_date-field"
                                className="form-control"
                                name='vehicle_registration_date'
                                value={validation.values.vehicle_registration_date || ""}
                                readOnly
                            />
                        </div>

                        {/* The below element is for displaying the vehicle expiration date. */} 
                        <div className="mb-3">
                            <label htmlFor="vehicle_exipration_date-field" className="form-label">Vehicle Expiration Date</label>
                            <input
                                type="text"
                                id="vehicle_exipration_date-field"
                                className="form-control"
                                name='vehicle_exipration_date'
                                value={validation.values.vehicle_exipration_date || ""}
                                readOnly
                            />
                        </div>
                    </ModalBody> {/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
                    <ModalFooter>
                       {/* Close Button */}
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setView_modal(false); }}>Close</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>          

            {/* Remove Modal */}
            {/* This is the Remove button model. We will remove the particular vehicle from this button. */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} className="modal fade zoomIn" id="deleteRecordModal" centered >
                {/* Close Button */}
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                {/* The below modal is the pop up bar. Which will taken confirmation one more time from the user before deleting */}
                <ModalBody>
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        {/* Close Button */}
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        {/* Delete Button */}
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default ListVehiclesTable; // Export the ListVehicles function.
