/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the drivers overall functionalities are coded in this file           //
//      The file contain the view all driver model, view particular driver data model      //
//      The object and functionalities are written in this file.                           //
/////////////////////////////////////////////////////////////////////////////////////////////

// Importing the react component
import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import List from 'list.js';
import Flatpickr from "react-flatpickr";
// GET_DRIVERS_ALL_DATA_URL
//The purpose of the Breadcrumbs component is to display a breadcrumb navigation element. 
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Define the toggleStatus function outside the component
import { Drivers } from '../../CommonData/Data';
import { removeDriver } from '../../helpers/ApiRoutes/removeApiRoutes';
import { addNewDriver } from '../../helpers/ApiRoutes/addApiRoutes';
import { updateDriver } from '../../helpers/ApiRoutes/editApiRoutes';

// The code you provided imports the useFormik hook from the "formik" library. The useFormik hook is a custom hook provided by Formik, which is a popular form library for React.
import { useFormik } from "formik";

/**IMPORTED APIs */
import { addNewProvider } from '../../helpers/ApiRoutes/addApiRoutes';  //For adding new service providers
import { removeSProvider } from '../../helpers/ApiRoutes/removeApiRoutes'; //For removing service providers
import { updateSProvider , updateDriverStatus } from '../../helpers/ApiRoutes/editApiRoutes'; //For updating  service providers
import { getDriversData, getSingleDriverData } from '../../helpers/ApiRoutes/getApiRoutes';  //For getting all service providers
import config from '../../config';


// The name of the function. Which will be executed and used all over program. This funtion is having all the code
const ListTables = () => 
{
    
    // Define state variables and their corresponding setter functions using the useState hook
    const [drivers, setDrivers] = useState([]); // Array to store drivers
    const [driver, setDriver] = useState([]); // Array to store a single driver
    const [updateImage, setUpdateImage] = useState(""); // String to store the updated image
    const [modal_delete, setmodal_delete] = useState(false); // Boolean to control delete modal visibility
    const [modal_list, setmodal_list] = useState(false); // Boolean to control list modal visibility
    const [add_list, setAdd_list] = useState(false); // Boolean to control add modal visibility
    const [view_modal, setView_modal] = useState(false); // Boolean to control view modal visibility
    const [profileImagePreview, setProfileImagePreview] = useState(false); // Boolean to control profile image preview visibility
    const [licenceImagePreview, setLicenceImagePreview] = useState(false); // Boolean to control license image preview visibility
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("")
    const pageLimit = config.pageLimit;

    // Define a function to handle the profile image change event
    const handleProfileImageChange = (event) => 
    {
        // Get the selected file from the event
        const file = event.target.files[0];    
        // Update the state variable 'updateImage' with the selected file
        setUpdateImage(file);
        // Generate a preview URL for the selected image using the URL.createObjectURL method
        const previewURL = URL.createObjectURL(file); 
        // Update the state variable 'profileImagePreview' with the preview URL
        setProfileImagePreview(previewURL);
    };

    // The below effect for displaying the overall data of the driver page in the front.
    useEffect(() =>
    {
        getAllData(1)
    }, []);
    
    // The function is desing the handle the chnage in profile image of the driver.
    const handleLicenceImageChange = (event) => 
    {
      const file = event.target.files[0];
      setUpdateImage(file)
      setLicenceImagePreview(URL.createObjectURL(file));
    };    

    function tog_list(param, productId){
        // Toggle 'add_list' state if 'param' is 'ADD'
        if (param === 'ADD'){
          // Reset profile and license image previews
          setProfileImagePreview(null);
          setLicenceImagePreview(null);
          setAdd_list(!add_list);
        }
      
        // Find the driver data with matching 'productId' in the 'drivers' array
        const data = drivers?.find((item) => item?.id === productId);
      
        // Set the 'driver' state to the found driver data
        setDriver([data]);
      
        // Toggle 'modal_list' state
        setmodal_list(!modal_list);
      
        // Set profile and license image previews to driver's profile_image and licence_img
        setProfileImagePreview(data.profile_image);
        setLicenceImagePreview(data.licence_img);
    }
      
    async function tog_view(productId){
        let driver = await getSingleDriverData(productId)
        setDriver(driver.drivers)
        setView_modal(!view_modal);
    }  
    
    function remove_data(id)
    {
        // Call the 'removeDriver' function with 'id' parameter
        removeDriver(id);
    }

    // For delete, We will use this function
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    // The below function is for the status button functionalities.
    function toggleStatus(button, driverID) {
        var currentStatus = button.innerText.trim();
        const driver = drivers.find((s) => s.id === driverID);
        updateDriverStatus(driver.id)
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (driver) {
                driver.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (driver) {
                driver.status = 'ACTIVE';
            }
        }
    }

    function toggleAssign(id){
        console.log(id)
    }

     // function for get data all drivers data
    async function getAllData(page) {
        let getDrivers = await getDriversData(page || 1);
        setDrivers(getDrivers.drivers);
        setPageNumber(page);
        setNumberOfData(getDrivers.totalCount);
    }

    // The below intialValues variable is used for having the data the driver. When we will use the edit button.
    // We are usign the add module for editing the driver. That is why if we are having data of a particular then
    // We will store this in the initialValues object
    const initialValues = {
        name: !add_list ? driver[0]?.name : '',
        email: !add_list ? driver[0]?.email : '',
        contact_no: !add_list ? driver[0]?.contact_no : '',
        emergency_contact_no: !add_list ? driver[0]?.emergency_contact_no : '',
        date_of_birth: !add_list ? driver[0]?.date_of_birth : '',
        licence_no: !add_list ? driver[0]?.licence_no : '',
        profile_image: !add_list ? driver[0]?.profile_image : '',
        licence_img: !add_list ? driver[0]?.licence_img : '',
        description: !add_list ? driver[0]?.description : '',
        updated_at: !add_list ? driver[0]?.updated_at : ''
    };

    // The below unction will be used for the CRUD functionalites of he validation data.
    const validation = useFormik
    ({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) =>
        {
            values.licence_img = updateImage;
            if (add_list) {
                //add new
                console.log("vvv",values)
                addNewDriver(values);
                setAdd_list(false);
                setmodal_list(false);
            } else {
                //update previes one
                updateDriver(values);
                setAdd_list(false);
                setmodal_list(false);
            }
        }
    });
    
    // the execution of all the object and element are written inside the return. Whenever this file will be called only the code inside the return written will be returned
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Header of the Page */}
                    <Breadcrumbs title="Tables" breadcrumbItem="Drivers" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    {/* Header of the Particular Card */}
                                    <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                {/* The below element is for the 'Add' button. Which will be used for adding th customer */}
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>                                                 
                                                </div>
                                            </Col>  
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        {/* This are the columns and column heading in the driver page */}
                                                        <th className="index" data-sort="index">#</th> 
                                                        <th className="sort" data-sort="driver_name">Name</th>
                                                        <th className="sort" data-sort="driver_email">Email</th>
                                                        <th className="sort" data-sort="driver_phone">Contact Number</th>
                                                        <th className="sort" data-sort="registered_date">Registered Date</th>
                                                        <th className="sort" data-sort="status">Assign To</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {/* The data we will be getting to showcase on driver page is
                                                    from a object. We will map and show them one by one. The below function will be used this */}
                                                    {/* 'Driver' is having all the enquiry data. */}
                                                    {/* Index is the number of the data. i.e Serial number */}
                                                    {drivers.map((item,index) => (
                                                        <tr key={item.id}> 
                                                        {/* Below we are intialize the enquiry data */}
                                                        <th scope="row"> {index + 1} </th> {/* // Serial Number */}
                                                            <td className="driver_name">{item.name}</td> {/* // Driver Name */}
                                                            <td className="driver_email">{item.email}</td> {/* // Driver Email */}
                                                            <td className="driver_phone">{item.contact_no}</td> {/* // Driver Contact Number */}
                                                            <td className="registered_date">{item.created_at}</td> {/* // Driver Created Time */}
                                                            <td className="status">
                                                                <button
                                                                    className="btn btn-sm btn-success status-item-btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#showModal"
                                                                    onClick={ toggleAssign(item.id) }
                                                                >
                                                                    Assign
                                                                </button>
                                                            </td>
                                                            {/* This is the place from where we are calling the status button and function */}
                                                            <td className="status">
                                                                {item.status === "ACTIVE" ?
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
                                                            {/* The below column will have the 3 buttons
                                                                1. View button
                                                                2. Edit button
                                                                3. Remove button
                                                            */}
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    {/* This is the place from where we are calling he view button and function. */}
                                                                    <div className="view">
                                                                        <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_view(item.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">View</button>
                                                                    </div>
                                                                    {/* This is the place from where we are calling he edit button and function. */}
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => tog_list('EDIT', item.id)}>Edit</button>
                                                                    </div>
                                                                    {/* This is the place from where we are calling he remove button and function. */}
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => remove_data(item.id)} data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
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
                                                    <p className="text-muted mb-0">We've searched more than 150+ Drivers We did not find any
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

            {/* Add Driver or Edit Driver Modal */}
            {/* The below line is for the pop up of edit and add driver */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                {/* The below line is for the heading of pop up of edit and add driver */}
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setmodal_list(false); tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ? 'Add Driver' : 'Edit Driver'} </ModalHeader>
                <form className="tablelist-form"
                 onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        {/* The Below element is adding the name of the driver */}
                        <div className="mb-3">
                            <label htmlFor="driver-field" className="form-label">Name</label>
                            <input type="text" id="driver-field" className="form-control"  name='name' value={validation.values.name || ""}
                             onChange={validation.handleChange}  placeholder="Enter Name" required />
                        </div>

                        {/* The Below element is adding the email of the driver */}

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input type="email" id="email-field" className="form-control" name='email'   value={validation.values.email || ""}
                             onChange={validation.handleChange}  placeholder="Enter Email" required />
                        </div>

                        {/* The Below element is adding the contact number of the driver */}

                        <div className="mb-3">
                            <label htmlFor="contactNumber-field" className="form-label">Contact Number</label>
                            <input type="text" id="contactNumber" className="form-control" name='contact_no'  value={validation.values.contact_no || ""}
                             onChange={validation.handleChange} placeholder="Enter Contact Number" required />
                        </div>

                        {/* The Below element is adding the emenrgency contact number of the driver */}
                        <div className="mb-3">
                            <label htmlFor="emergencyContactNumber" className="form-label">Emergency Contact Number</label>
                            <input type="text" id="emergencyContactNumber" className="form-control" name='emergency_contact_no'   value={validation.values.emergency_contact_no || ""}
                             onChange={validation.handleChange} placeholder="Enter Emergency Contact Number" required />
                        </div>

                        {/* The Below element is adding the date of birth of the driver */}
                        <div className="mb-3">
                            <label htmlFor="date_of_birth-field" className="form-label">Date Of Birth</label>
                            <Flatpickr
                                className="form-control"
                                name='date_of_birth'
                                options={{
                                dateFormat: "d M, Y"
                                }}
                                value={validation.values.date_of_birth || ""}
                                onChange={(dates) =>validation.setFieldValue('date_of_birth', dates[0])}
                                placeholder="Select Date"
                            />
                        </div>

                        {/* Profile Photo Or Image of the driver*/}
                        <div className="mb-3">
                            <label htmlFor="profileImage" className="form-label">Profile Image</label>
                            <div className="col-md-10">
                                {profileImagePreview &&(
                                    <div>
                                        {/* <h5>Id Proof Preview:</h5> */}
                                        <img src={profileImagePreview} alt="Profile Preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                )}
                   
                                <input
                                    className="form-control"
                                    name="profile_image"
                                    type="file"
                                    placeholder="Profile Image"
                                    onChange={handleProfileImageChange}
                                />
                     
                            </div>
                        </div>

                        {/* The Below element is adding the licence number of the driver */}
                        <div className="mb-3">
                            <label htmlFor="idNumber" className="form-label">Licence Number</label>
                            <input type="text" id="idNumber" className="form-control" name='licence_no'   
                                value={validation.values.licence_no || ""}
                                onChange={validation.handleChange} 
                                placeholder="Enter Licensce Number" required />
                        </div>

                        {/* Licence Photo Or Image of the driver*/}
                        <div className="mb-3">
                            <label htmlFor="licenceImage" className="form-label">Licence Image</label>
                            <div className="col-md-10">
                                {licenceImagePreview &&(
                                    <div>
                                        <img src={licenceImagePreview} alt="Licence Preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                )}
                      
                                <input
                                    className="form-control"
                                    name="licence_image"
                                    type="file"
                                    placeholder="Profile Image"
                                    onChange={handleLicenceImageChange}
                                />
                      
                            </div>
                        </div>

                        {/* The Below element is adding the description of the driver */}
                        <div className="mb-3">
                            <label htmlFor="idProofImage" className="form-label">Description: </label>
                            <input type="text" id="idProofImage" className="form-control" name='description' placeholder="Enter Discription"      value={validation.values.description || ""}
                                onChange={validation.handleChange}  required />
                        </div>
                    </ModalBody>{/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            {/* Closed Button */}
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }} >Close</button>
                            {/* Add Driver or Update Driver button */}
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add Driver' : 'Update Driver'}</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* This is the view button model. We will get all the details of a particular driver */}
            <Modal className="extra-width" isOpen={view_modal} toggle={() => { tog_view('view'); }} >
                {/* The below line is for the heading of pop up of view driver */}
                <ModalHeader className="bg-light p-3" id="exampleModalLabel"toggle={() => { setView_modal(false); tog_view('view'); }}>View Driver</ModalHeader>
                <form className="tablelist-form"
                 onSubmit={validation.handleSubmit}>
                    <ModalBody>

                    {/* The Below element is displaying the name of the driver */}
                    <div className="mb-3">
                    <label htmlFor="drivername-field" className="form-label">Name</label>
                    <input
                        type="text"
                        name='name'
                        id="drivername-field"
                        className="form-control"
                        value={validation.values.name || ""}
                        readOnly
                    />
                    </div>

                    {/* The Below element is displaying the email of the driver */}
                    <div className="mb-3">
                    <label htmlFor="email-field" className="form-label">Email</label>
                    <input
                        type="email"
                        name='email'
                        id="email-field"
                        value={validation.values.email || ""}
                        className="form-control"
                        readOnly
                    />
                    </div>

                    {/* The below element is displaying the contact number of the driver */}
                    <div className="mb-3">
                    <label htmlFor="contact_no-field" className="form-label">Contact Number</label>
                    <input
                        type="text"
                        name='contact_no'
                        id="contact_no-field"
                        value={validation.values.contact_no || ""}
                        className="form-control"
                        readOnly
                    />
                    </div>

                    {/* The Below element is displaying the emergency contact number of the driver */}
                    <div className="mb-3">
                    <label htmlFor="emergency_contact_no-field" className="form-label">Emergency Contact Number</label>
                    <input
                        type="text"
                        name='emergency_contact_no'
                        id="emergency_contact_no-field"
                        value={validation.values.emergency_contact_no || ""}
                        className="form-control"
                        readOnly
                    />
                    </div>

                    {/* The Below element is displaying the emergency date of birth of the driver */}
                    <div className="mb-3">
                    <label htmlFor="date_of_birth-field" className="form-label">Date Of Birth</label>
                    <input
                        type="text"
                        id="date_of_birth-field"
                        name='date_of_birth'
                        className="form-control"
                        value={validation.values.date_of_birth || ""}
                        readOnly
                    />
                    </div>

                    {/* The Below element is displaying the licence number of the driver */}
                    <div className="mb-3">
                    <label htmlFor="licence_number-field" className="form-label">Licence Number</label>
                    <input
                        type="text"
                        id="licence_number-field"
                        name='licence_number'
                        className="form-control"
                        value={validation.values.licence_no || ""}
                        readOnly
                    />
                    </div>

                    {/* The Below element is displaying the description of the driver */}
                    <div className="mb-3">
                    <label htmlFor="description-field" className="form-label">Description</label>
                    <input
                        type="text"
                        id="description-field"
                        name='description'
                        className="form-control"
                        value={validation.values.description || ""}
                        readOnly
                    />
                    </div>

                    {/* The Below element is displaying the last time when the driver details are updated. */}
                    <div className="mb-3">
                    <label htmlFor="last_update_date-field" className="form-label">Last Update Date</label>
                    <input
                        type="text"
                        id="last_update_date-field"
                        name='last_update_date'
                        className="form-control"
                        value={validation.values.updated_at || ""}
                        readOnly
                    />
                    </div>

                    {/* Profile image of the image*/}
                    <div className="mb-3">
                        <label htmlFor="profile_image-field" className="form-label">Profile Image</label>
                        <div>
                            <img src={validation.values.profile_image || ""} alt="id_proof Image" style={{ maxWidth: '100px' }} />
                        </div>
                    </div>

                    {/* Licensce image of the driver */}
                    <div className="mb-3">
                        <label htmlFor="licence_image-field" className="form-label">Licence Image</label>
                        <div>
                            <img src={validation.values.licence_img || ""} alt="id_proof Image" style={{ maxWidth: '100px' }} />
                        </div>
                    </div>                      
                    </ModalBody> {/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setView_modal(false);}}>Close</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* This is the Remove button model. We will remove the particular driver. */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} className="modal fade zoomIn" id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
                <ModalBody>
                    {/* The below element is for the the confirmation of deleting any driver through pop up */}
                    <div className="mt-2 text-center">
                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548" style={{ width: "100px", height: "100px" }}></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you Sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default ListTables; // Export the driver function.
