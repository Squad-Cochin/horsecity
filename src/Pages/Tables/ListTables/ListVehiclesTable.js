/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//      The design of the vehicles overall functionalities are coded in this file          //
//      The file contain the view all vehicle model, view particular vehicle data model    //
//      The object and functionalities are written in this file.                           //
//      Addittion and deletion of the vehicles are done from this file itself.             //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useFormik } from "formik";

//IMPORTED FILES
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { removeVehicle } from '../../../helpers/ApiRoutes/removeApiRoutes';
import { getVehiclesData, getSPUserName, getSingleVechileData } from '../../../helpers/ApiRoutes/getApiRoutes'
import { addNewVehicle } from '../../../helpers/ApiRoutes/addApiRoutes';
import { updateVehicle, updateVechileStatus } from '../../../helpers/ApiRoutes/editApiRoutes';
import config from '../../../config';

const ListVehiclesTable = () => {
    const [vehicles, setVehicles] = useState([]); // State variable to store vehicles
    const [modal_list, setmodal_list] = useState(false); // State variable to control list modal visibility
    const [add_list, setAdd_list] = useState(false); // State variable to control add modal visibility
    const [vehicle, setVehicle] = useState([]); // State variable to store a single vehicle
    const [modal_delete, setmodal_delete] = useState(false); // State variable to control delete modal visibility
    const [view_modal, setView_modal] = useState(false); // State variable to control view modal visibility
    const [certificatePreview, setCertificatePreview] = useState(null);
    const [certificateImage, setCertificateImage] = useState("");
    const [sproviders, setSproviders] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState(false);
    const [roleID, setRoleID] = useState("");
    const [module, setModule] = useState({});
    const [user_name, setuser_name] = useState('')
    const [numberOfData, setNumberOfData] = useState(0);
    const [errors, setErrors] = useState("")
    const pageLimit = config.pageLimit;
    const role_Id = config.Role

    const navigate = useNavigate();

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
        price: !add_list ? vehicle[0]?.price : '',
        no_of_horse: !add_list ? vehicle[0]?.no_of_horse : '',
        air_conditioner: !add_list ? vehicle[0]?.air_conditioner : '',
        temperature_manageable: !add_list ? vehicle[0]?.temperature_manageable : '',
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
        safety_certicate: !add_list ? vehicle[0]?.safety_certicate : '',
    };
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("authUser"));
        let user_Id = data[0]?.user[0]?.id
        let role_Name = data[0]?.user[0]?.role_name
        let userName = data[0]?.user[0]?.user_name
        let role_Id = data[0]?.user[0].role_Id
        setUserId(user_Id);
        setRole(role_Name);
        setuser_name(userName);
        setRoleID(role_Id);
        getAllData(1)
    }, [userId, role, user_name, roleID]);
    /**This function is an event handler that triggers when the user
     *  selects a file for the idproof image */
    const handleIdProofImageChange = (event) => {
        const file = event.target.files[0];
        setCertificateImage(file)
        setCertificatePreview(URL.createObjectURL(file));
    };
    // The Below function is used when we are adding the vehicle
    async function tog_list(param, productId) {
        setErrors("")
        if (param === 'ADD') {
            setCertificatePreview(null)
            setAdd_list(!add_list);
        } else {
            let data = await getSingleVechileData(productId)
            setVehicle([data]);
            setCertificatePreview(data.safety_certicate)
        }
        setmodal_list(!modal_list);
    }
    // The Below function is used when we are displaying the particular vehicle data.
    async function tog_view(productId) {
        let data = await getSingleVechileData(productId)
        setVehicle([data]);
        setCertificatePreview(data.safety_certicate)
        setView_modal(!view_modal);
    }
    // The below function is for remove button of a particular vehicle.
    async function remove_data(id) {
        await removeVehicle(id);
        getAllData(pageNumber)
    }
    // The below function is for delete button of a particular vehicle.
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    // The below function is the changging Status button
    function toggleStatus(button, vehiclesId) {
        var currentStatus = button.innerText.trim();
        const vehicle = vehicles.find((v) => v.id === vehiclesId);
        updateVechileStatus(vehicle.id)
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (vehicle) {
                vehicle.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (vehicle) {
                vehicle.status = 'ACTIVE';
            }
        }
    }
    const validation = useFormik
        ({
            // enableReinitialize: use this flag when initial values need to be changed
            enableReinitialize: true,
            initialValues,
            onSubmit: (values) => {
                values.safety_certicate = certificateImage
                if (roleID === role_Id.service_provider) {
                    values.service_provider_id = userId
                }
                if (add_list) {
                    addVechile(values);
                }
                else {
                    editVehicles(values);
                }
            },
        });
    // function for get data all Vechile data
    async function getAllData(page) {
        if (userId) {
            let getvehicles = await getVehiclesData(page || 1, userId);
            let getSP = await getSPUserName();
            setSproviders(getSP.serviceProviders);
            setVehicles(getvehicles?.vehicles);
            setModule(getvehicles.module[0]);
            setPageNumber(page);
            setNumberOfData(getvehicles?.totalCount);
        }
    }
    // Update vehicle
    async function editVehicles(data) {
        let updatedVehicle = await updateVehicle(vehicle[0]?.id, data);
        if (updatedVehicle.code === 200) {
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
            setCertificateImage("")
        }
        else {
            setErrors("")
            setErrors(updatedVehicle.message)
        }
    }
    /**Add new vehicle */
    async function addVechile(values) {
      
        let addedVechile = await addNewVehicle(values, userId);
        if (addedVechile.code === 200) {
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
            setCertificateImage("")
        } else {
            setErrors("")
            setErrors(addedVechile?.message)
        }
    }
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
                                                        <th className="index" data-sort="index">#</th>
                                                        {(roleID === role_Id.admin) ? (<th className="sort" data-sort="customer_name">Provider</th>) : null}
                                                        <th className="sort" data-sort="vNumber">Vehicle Number</th>
                                                        <th className="sort" data-sort="email">Make</th>
                                                        <th className="sort" data-sort="no_of_horse">Number of Horse</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {vehicles.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                            {(roleID === role_Id.admin)?(<td className="name">{item.service_provider}</td>) : null}
                                                            <td className="vhnumber">{item.vehicle_number}</td>
                                                            <td className="make">{item.make}</td>
                                                            <td className="no_of_horse text-center">{item.no_of_horse}</td>
                                                            <td>{item.status === "ACTIVE"?<button
                                                                    className="btn btn-sm btn-success status-item-btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#showModal"
                                                                    onClick={(event) => toggleStatus(event.target, item.id)}
                                                                >{item.status}
                                                                </button> :
                                                                <button
                                                                    className="btn btn-sm btn-danger status-item-btn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#showModal"
                                                                    onClick={(event) => toggleStatus(event.target, item.id)}
                                                                >{item.status}
                                                                </button>
                                                            }</td>
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
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => navigate(`/image-gallery/${item.id}`)}>View Images</button>
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
                                        </div>
                                        {/* The below is having the code of the pagination of the page.
                                            The previous and next button are also in side this function */}
                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                {pageNumber > 1 ?
                                                    <Link
                                                        className="page-item pagination-prev disabled"
                                                        onClick={() => getAllData(pageNumber - 1)}
                                                    >
                                                        Previous
                                                    </Link>
                                                    : null}
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                {numberOfData > pageLimit * pageNumber ?
                                                    <Link className="page-item pagination-next" onClick={() => getAllData(pageNumber + 1)}>
                                                        Next
                                                    </Link>
                                                    : null}
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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setCertificateImage(""); setmodal_list(false); tog_list(add_list ? 'ADD' : 'EDIT'); }}> {add_list ? 'Add Vehicle' : 'Edit Vehicle'} </ModalHeader>
                <form className="tablelist-form" onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {/* The below element is adding the name of the service provider. Whose vehicle is being added */}
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        <div className="mb-3">
                            {roleID === role_Id.admin ? (
                                <label htmlFor="serviceprovider-field" className="form-label">
                                    Service Provider
                                </label>
                            ) : (
                                null
                            )}
                            {roleID === role_Id.admin ? (
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
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                null
                            )}
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
                                name='model' // Updated the name attribute to 'models'
                                className="form-control"
                                value={validation.values.model || ""}
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
                        {/* The below element is for adding the price of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_price-field" className="form-label">Vehicle Minimum Price</label>
                            <input
                                type="text"
                                id="vehicle_price-field"
                                className="form-control"
                                name='price'
                                value={validation.values.price || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Minimum Price"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="no_of_horses-field" className="form-label">
                                Number Of Horses
                            </label>
                            <select
                                id="no_of_horses-field"
                                className="form-control"
                                name="no_of_horse"
                                value={validation.values.no_of_horse || ""}
                                onChange={validation.handleChange}
                                required
                            >
                                {Array.from({ length: 10 }, (_, index) => (
                                    // The value attribute of each option should range from 1 to 10
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
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
                        {/* The below element is for uploading the images of safty certificate*/}
                        <div className="mb-3">
                            {certificatePreview && (
                                <div>
                                    <img name="id_proof_image" src={certificatePreview} alt="Id Proof Preview" style={{ maxWidth: '100px' }} />
                                </div>
                            )}
                            <label htmlFor="vehicle_image-field" className="form-label">Safety Certificate Image</label>
                            <input
                                type="file"
                                name='safety_certicate'
                                id="vehicle_image-field"
                                className="form-control"
                                placeholder="Upload Safety Certificate Image"
                                onChange={handleIdProofImageChange}
                            />
                        </div>
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
                                    dateFormat: "d-m-Y",
                                    maxDate: new Date(),
                                }}
                                name='insurance_date'
                                value={validation.values.insurance_date || ""}
                                onChange={(dates) => validation.setFieldValue('insurance_date', dates[0])}
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
                        <div className="mb-3">
                            <label htmlFor="insurance_expiry_date-field" className="form-label">Insurance Expiry Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d-m-Y",
                                    minDate: "today", // Set the minimum date to today
                                }}
                                name='insurance_expiry_date'
                                value={validation.values.insurance_expiry_date || ""}
                                onChange={(dates) => validation.setFieldValue('insurance_expiry_date', dates[0])}
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
                                    dateFormat: "d-m-Y",
                                    maxDate: new Date(),
                                }}
                                name='vehicle_registration_date'
                                value={validation.values.vehicle_registration_date || ""}
                                onChange={(dates) => validation.setFieldValue('vehicle_registration_date', dates[0])}
                                placeholder="Select Vehicle Registration Date"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vehicle_exipration_date-field" className="form-label">Vehicle Expiration Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d-m-Y",
                                    minDate: "today", // Set the minimum date to today
                                }}
                                name='vehicle_exipration_date'
                                value={validation.values.vehicle_exipration_date || ""}
                                onChange={(dates) => validation.setFieldValue('vehicle_exipration_date', dates[0])}
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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setView_modal(false) }}> View Vehicles</ModalHeader>
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
                                name='model' // Updated the name attribute to 'models'
                                className="form-control"
                                value={validation.values.model || ""}
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
                        {/* The below element is for displaying the minimum price of the vehicle */}
                        <div className="mb-3">
                            <label htmlFor="vehicle_price-field" className="form-label">Vehicle Minimum Price </label>
                            <input
                                type="text"
                                id="vehicle_price-field"
                                className="form-control"
                                name='price'
                                value={validation.values.price || ""}
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
                        <div className="mb-3">
                            <div><label htmlFor="vehicle_certification_image-field" className="form-label">Vehicle Safety Certicate</label></div>
                            <img id="vehicle_certification_image-field" name="safety_certicate" src={certificatePreview || ""} alt="Id Proof Preview" style={{ maxWidth: '100px' }} />
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
