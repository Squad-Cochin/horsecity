////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       service provider page functionality done over here.                  //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik } from "formik";

/**IMPORTED FILES */
import { addNewProvider } from '../../helpers/ApiRoutes/addApiRoutes';  //For adding new service providers
import { removeSProvider } from '../../helpers/ApiRoutes/removeApiRoutes'; //For removing service providers
import { updateSProvider, updateSPStatus } from '../../helpers/ApiRoutes/editApiRoutes'; //For updating  service providers
import { getSPAllData, getSPSingleData,getRoleList } from '../../helpers/ApiRoutes/getApiRoutes';  //For getting all service providers
import config from '../../config';

const ListTables = () => {

    const [modal_list, setmodal_list] = useState(false); /**Using for showing ADD & EDIT modal */
    const [view_modal, setView_modal] = useState(false); /**Using for showing VIEW modal */
    const [add_list, setAdd_list] = useState(false); /**Using for controlling ADD & EDIT modal */
    const [sproviders, setSproviders] = useState([]); /**Using for storing All service providers */
    const [sprovider, setSprovider] = useState([]);  /**Using for storing All particul  service providers based of there ID */
    const [updateImage, setUpdateImage] = useState("") /**Using for storing licensce image file */
    const [licenscePreview, setLicenscePreview] = useState(null);  /**Using for storing licensce image URL*/
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfData, setNumberOfData] = useState(0);
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState('');
    const [module, setModule] = useState({});
    const [errors, setErrors] = useState("");
    const [roleList, setRoleList] = useState([]);

    const pageLimit = config.pageLimit;


    /**THIS HOOK WILL RENDER INITIAL TIME */
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("authUser"));
        let userIdd = data[0]?.user[0]?.id
        const user_role = data[0]?.user[0]?.role_Id

        setRole(user_role)
        setUserId(userIdd);
        getAllData(1)
    }, [userId, role])

    /**INITIAL VALUES */
    const initialValues = {
        service_provider_id: userId,
        name: !add_list ? sprovider[0]?.name : '',
        email: !add_list ? sprovider[0]?.email : '',
        user_name: !add_list ? sprovider[0]?.user_name : '',
        password: !add_list ? sprovider[0]?.password : '',
        role_id: !add_list ? sprovider[0]?.role_id : '',
        role_name: !add_list ? sprovider[0]?.role_name : '',
        contact_person: !add_list ? sprovider[0]?.contact_person : '',
        contact_no: !add_list ? sprovider[0]?.contact_no : '',
        emergency_contact_no: !add_list ? sprovider[0]?.emergency_contact_no : '',
        contact_address: !add_list ? sprovider[0]?.contact_address : '',
        licence_no: !add_list ? sprovider[0]?.licence_no : '',
        licence_image: !add_list ? sprovider[0]?.licence_image : '',
    };

    /**VALIDATION */
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            values.licence_image = updateImage;
            if (add_list) {

                addProvider(values)
            } else {
                //update previes SProvider
                editProvider(values);
            }
        }
    });

    // ADD SERVICE PROVIDER
    async function addProvider(val) {
        let addSP = await addNewProvider(val);
        if (addSP.code === 200) {
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        } else {
            setErrors("")
            setErrors(addSP.message)
        }
    }

    // UPDATE SERVICE PROVIDER
    async function editProvider(data) {
        let updateSP = await updateSProvider(sprovider[0]?.id, data);
        if (updateSP.code === 200) {
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        } else {
            setErrors("")
            setErrors(updateSP.message)
        }
    }

    /**
     *  selects a file for the license image */
    const handleLicensceImageChange = (event) => {
        const file = event.target.files[0];
        setUpdateImage(file)
        setLicenscePreview(URL.createObjectURL(file));
    };

    /**Function for changing service provider status */
    function toggleStatus(button, serviceProviderId) {
        var currentStatus = button.innerText.trim();
        const service_provider = sproviders.find((s) => s.id === serviceProviderId);
        updateSPStatus(service_provider.id)
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (service_provider) {
                service_provider.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (service_provider) {
                service_provider.status = 'ACTIVE';
            }
        }
    }

    /**This function is used to toggle the modal for adding/editing service providers 
     * and set the selected service provider */
    async function tog_list(param, productId) {
        let role_items = await getRoleList()
        if(role_items.code == 200){
             setRoleList(role_items.data?.roles)
            if (param === 'ADD') {
                setLicenscePreview(null);
                setAdd_list(!add_list);
            } else {
                
                let serviceProvider = await getSPSingleData(productId)
                setSprovider(serviceProvider.serviceProvider)
                setLicenscePreview(serviceProvider.serviceProvider[0]?.licence_image);
            }
            setmodal_list(!modal_list);
        }else{
            //ERRRRR
        }

    }

    /**This function toggles the view modal for displaying details
     *  of a service provider */
    async function tog_view(productId) {
        let serviceProvider = await getSPSingleData(productId)
        setSprovider(serviceProvider.serviceProvider)
        setView_modal(!view_modal);
    }

    /**This function is used to remove a service provider*/
    async function remove_data(id) {
        await removeSProvider(id)
        getAllData(pageNumber)
    }

    // function for get data all service provider data
    async function getAllData(page) {
        if (userId) {
            let getSPdataNext = await getSPAllData(page || 1, userId);
            setSproviders(getSPdataNext.serviceProviders);
            setModule(getSPdataNext.module[0])
            setPageNumber(page);
            setNumberOfData(getSPdataNext.totalCount);
        }
    }



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Service providers" />
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
                                                    {
                                                        JSON.parse(module?.create || 'true') ? (
                                                            <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn">
                                                                <i className="ri-add-line align-bottom me-1"></i> Add
                                                            </Button>
                                                        ) : null
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sprovider_name" data-sort="sprovider_name">Name</th>
                                                        <th className="email" data-sort="email">Email</th>
                                                        <th className="contactperson" data-sort="contactperson">Contact Person</th>
                                                        <th className="phone" data-sort="phone">Contact Number</th>
                                                        {!(config.Role.service_provider === role) ? (
                                                            <th className="status" data-sort="status">Status</th>
                                                        ) : null
                                                        }
                                                        <th className="action" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {sproviders.map((value, index) => (
                                                        <tr key={value?.id}>
                                                            <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                            <td className="name">{value.name}</td>
                                                            <td className="email">{value.email}</td>
                                                            <td className="contact_person">{value.contact_person}</td>
                                                            <td className="phone">{value.contact_no}</td>
                                                            {!(config.Role.service_provider === role) ? (
                                                                <td className="status">
                                                                    {value.status === "ACTIVE" ?
                                                                        <button
                                                                            className="btn btn-sm btn-success status-item-btn"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#showModal"
                                                                            onClick={(event) => toggleStatus(event.target, value.id)}
                                                                        >
                                                                            {value.status}
                                                                        </button> :
                                                                        <button
                                                                            className="btn btn-sm btn-danger status-item-btn"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#showModal"
                                                                            onClick={(event) => toggleStatus(event.target, value.id)}
                                                                        >
                                                                            {value.status}
                                                                        </button>

                                                                    }
                                                                </td>
                                                            ) : null}
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    {JSON.parse(module?.read || 'true') ? (
                                                                        <div className="edit">
                                                                            <button
                                                                                className="btn btn-sm btn-success edit-item-btn"
                                                                                onClick={() => tog_view(value.id)}
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#showModal"
                                                                            >
                                                                                View
                                                                            </button>
                                                                        </div>
                                                                    ) : null}
                                                                    <div className="edit">
                                                                        {JSON.parse(module?.update || 'true') ? (
                                                                            <button
                                                                                className="btn btn-sm btn-primary edit-item-btn"
                                                                                onClick={() => tog_list("EDIT", value.id)}
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#showModal"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="remove">
                                                                        {JSON.parse(module?.delete || 'true') ? (
                                                                            <button
                                                                                className="btn btn-sm btn-danger remove-item-btn"
                                                                                onClick={() => remove_data(value?.id)}
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#deleteRecordModal"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        ) : null}
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

            {/****************************** Add Modal *************/}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { setmodal_list(false); setAdd_list(false); setLicenscePreview(null) }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setmodal_list(false); setAdd_list(false); setLicenscePreview(null) }}>{add_list ? 'Add service provider' : 'Edit service provider'}</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}

                        {/* Provider Name */}
                        <div className="mb-3">
                            <label htmlFor="providerName-field" className="form-label">Provider Name</label>
                            <input
                                type="text"
                                name="name"
                                id="providerName-field"
                                className="form-control"
                                value={validation.values.name || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Provider Name"
                                required
                            />
                        </div>
                        {/* Email */}
                        {add_list ?
                            <div className="mb-3">
                                <label htmlFor="email-field" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email-field"
                                    className="form-control"
                                    value={validation.values.email || ""}
                                    onChange={validation.handleChange}
                                    placeholder="Enter Email"
                                    required
                                />
                            </div> : null}
                        {/* User Name */}
                        <div className="mb-3">
                            <label htmlFor="userName-field" className="form-label">User Name</label>
                            <input
                                type="text"
                                id="userName-field"
                                name="user_name"
                                className="form-control"
                                value={validation.values.user_name || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter User Name"
                                required
                            />
                        </div>
                        {/* Password */}
                        {add_list ?
                            <div className="mb-3">
                                <label htmlFor="userName-field" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password-field"
                                    name="password"
                                    className="form-control"
                                    value={validation.values.password || ""}
                                    onChange={validation.handleChange}
                                    placeholder="Enter User Password"
                                    required
                                />
                            </div> : null}
                        {!(config.Role.service_provider === role) ? (
                            <div className="mb-3">
                                <label htmlFor="status-field" className="form-label">Role</label>
                                <select
                                    className="form-control"
                                    data-trigger
                                    name="role_id"
                                    id="status-field"
                                    value={validation.values.role_id || ""}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                >
                                    {!add_list ? (
                                        <>
                                            {roleList.map((item) => (
                                                <option key={item?.id} value={item?.id}> {item?.name} </option>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <option value="">Select Role</option>
                                            {roleList.map((item) => (
                                                <option key={item.id} value={item.id}> {item.name} </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                        ) : null}

                        {/* Contact Person */}
                        <div className="mb-3">
                            <label htmlFor="contactPerson-field" className="form-label">Contact Person</label>
                            <input
                                type="text"
                                id="contactPerson-field"
                                className="form-control"
                                name="contact_person"
                                value={validation.values.contact_person || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Person Name"
                                required
                            />
                        </div>
                        {/* Contact Number */}
                        <div className="mb-3">
                            <label htmlFor="phone-field" className="form-label">Contact Number</label>
                            <input
                                type="text"
                                id="phone-field"
                                className="form-control"
                                name="contact_no"
                                value={validation.values.contact_no || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Phone No"
                                required
                            />
                        </div>
                        {/* Emergency Contact Number */}
                        <div className="mb-3">
                            <label htmlFor="emergencyPhone-field" className="form-label">Emergency Contact Number</label>
                            <input
                                type="text"
                                id="emergencyPhone-field"
                                name="emergency_contact_no"
                                className="form-control"
                                value={validation.values.emergency_contact_no || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Emergency Phone No."
                                required
                            />
                        </div>
                        {/* Contact Address */}
                        <div className="mb-3">
                            <label htmlFor="contactAddress-field" className="form-label">Contact Address</label>
                            <input
                                type="text"
                                id="contactAddress-field"
                                name="contact_address"
                                className="form-control"
                                value={validation.values.contact_address || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Contact Address"
                                required
                            />
                        </div>
                        {/* Certificate Number */}
                        <div className="mb-3">
                            <label htmlFor="LicenceNumber-field" className="form-label">Licence Number</label>
                            <input
                                type="text"
                                id="LicenceNumber-field"
                                name="licence_no"
                                value={validation.values.licence_no || ""}
                                onChange={validation.handleChange}
                                className="form-control"
                                placeholder="Enter Licence Number"
                                required
                            />
                        </div>
                        {/* Certificate Image */}
                        <div className="mb-3">
                            <label htmlFor="LicenseImage-field" className="form-label">Licence Image</label>
                            <div className="col-md-10">
                                {licenscePreview && (
                                    <div>
                                        <img src={licenscePreview} alt="Licensce Preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                )}
                                <input
                                    className="form-control"
                                    name="licence_image"
                                    type="file"
                                    placeholder="Licence Image"
                                    onChange={handleLicensceImageChange}
                                />
                            </div>
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); setLicenscePreview(null) }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add service provider' : 'Update service provider'}</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/****************************  View Modal*************** */}
            <Modal className="extra-width" isOpen={view_modal} toggle={() => { setView_modal(false); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_view('view'); setView_modal(false); }}>View service provider</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        {sprovider?.map((item, index) => (
                            <div key={index}>
                                {/* Provider Name */}
                                <div className="mb-3">
                                    <label htmlFor="providerName-field" className="form-label">Provider Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="providerName-field"
                                        className="form-control"
                                        value={validation.values.name || ""}
                                        readOnly
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email-field" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email-field"
                                        className="form-control"
                                        value={validation.values.email || ""}
                                        readOnly
                                    />
                                </div>

                                {/* User Name */}
                                <div className="mb-3">
                                    <label htmlFor="userName-field" className="form-label">User Name</label>
                                    <input
                                        type="text"
                                        id="userName-field"
                                        name="username"
                                        className="form-control"
                                        value={validation.values.user_name || ""}
                                        readOnly
                                    />
                                </div>

                                {/* Role */}
                                <div className="mb-3">
                                    <label htmlFor="role-field" className="form-label">Role</label>
                                    <input
                                        type="text"
                                        id="role-field"
                                        name="role_name"
                                        className="form-control"
                                        value={validation.values.role_name || ""}
                                        readOnly
                                    />
                                </div>
                                {/* Contact Person */}
                                <div className="mb-3">
                                    <label htmlFor="contactPerson-field" className="form-label">Contact Person</label>
                                    <input
                                        type="text"
                                        id="contactPerson-field"
                                        className="form-control"
                                        name="contact_person"
                                        value={validation.values.contact_person || ""}
                                        readOnly
                                    />
                                </div>
                                {/* Contact Number */}
                                <div className="mb-3">
                                    <label htmlFor="phone-field" className="form-label">Contact Number</label>
                                    <input
                                        type="text"
                                        id="phone-field"
                                        className="form-control"
                                        name="contact_no"
                                        value={validation.values.contact_no || ""}
                                        readOnly
                                    />
                                </div>
                                {/* Emergency Contact Number */}
                                <div className="mb-3">
                                    <label htmlFor="emergencyPhone-field" className="form-label">Emergency Contact Number</label>
                                    <input
                                        type="text"
                                        id="emergencyPhone-field"
                                        name="emergency_contact_no"
                                        className="form-control"
                                        value={validation.values.emergency_contact_no || ""}
                                        readOnly
                                    />
                                </div>

                                {/* Contact Address */}
                                <div className="mb-3">
                                    <label htmlFor="contactAddress-field" className="form-label">Contact Address</label>
                                    <input
                                        type="text"
                                        id="contactAddress-field"
                                        name="contact_address"
                                        className="form-control"
                                        value={validation.values.contact_address || ""}
                                        readOnly
                                    />
                                </div>

                                {/* Certificate Number */}
                                <div className="mb-3">
                                    <label htmlFor="licensceNumber-field" className="form-label">Licence Number</label>
                                    <input
                                        type="text"
                                        id="licensceNumber-field"
                                        name="licence_no"
                                        className="form-control"
                                        value={validation.values.licence_no || ""}
                                        readOnly
                                    />
                                </div>

                                {/* certificate image */}
                                <div className="mb-3">
                                    <label htmlFor="LicenceImage-field" className="form-label">Licence Image</label>
                                    <div>
                                        <img src={validation.values.licence_image || ""} alt="Licence Preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setView_modal(false); }}>Close</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default ListTables;
