///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
//                              This file is for implementing CRUD operations for service providers                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
//IMPORTED FROM REACT BOOTSTRAP
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

/**Navigation UI element */
import Breadcrumbs from "../../components/Common/Breadcrumb";

/**Using for form validation */
import { useFormik } from "formik";

/**IMPORTED APIs */
import { addNewProvider } from '../../helpers/ApiRoutes/addApiRoutes';  //For adding new service providers
import { removeSProvider } from '../../helpers/ApiRoutes/removeApiRoutes'; //For removing service providers
import { updateSProvider } from '../../helpers/ApiRoutes/editApiRoutes'; //For updating  service providers
import { getSPAllData } from '../../helpers/ApiRoutes/authApiRoutes';  //For getting all service providers

const ListTables = () => {
    const [modal_list, setmodal_list] = useState(false); /**Using for showing ADD & EDIT modal */
    const [view_modal, setView_modal] = useState(false); /**Using for showing VIEW modal */
    const [add_list, setAdd_list] = useState(false); /**Using for controlling ADD & EDIT modal */
    const [sproviders, setSproviders] = useState([]); /**Using for storing All service providers */
    const [sprovider, setSprovider] = useState([]);  /**Using for storing All particul  service providers based of thair ID */
    const [updateImage, setUpdateImage] = useState("") /**Using for storing licensce image file */
    const [licenscePreview, setLicenscePreview] = useState(null);  /**Using for storing licensce image URL*/

    /**This hook is used to fetch service provider data */
    useEffect(() => {
        let getSPdata = getSPAllData()
        setSproviders(getSPdata);
    }, [])

    /**This object sets the initial values for the form fields managed by formik */
    const initialValues = {
        name: !add_list ? sprovider[0]?.name : '',
        email: !add_list ? sprovider[0]?.email : '',
        username: !add_list ? sprovider[0]?.user_name : '',
        role_name: !add_list ? sprovider[0]?.role_name : '',
        contact_person: !add_list ? sprovider[0]?.contact_person : '',
        contact_no: !add_list ? sprovider[0]?.contact_no : '',
        emergency_contact_no: !add_list ? sprovider[0]?.emergency_contact_no : '',
        contact_address: !add_list ? sprovider[0]?.contact_address : '',
        licence_no: !add_list ? sprovider[0]?.licence_no : '',
        licence_image: !add_list ? sprovider[0]?.licence_image : '',
    };

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            values.licence_image = updateImage;
            if (add_list) {
                 //add new SProvider
                console.log("add new");
                addNewProvider(values);
                setAdd_list(false);
                setmodal_list(false);
            } else {
                //update previes SProvider
                console.log("update previues one ");
                console.log(values)
                updateSProvider(values);
                setAdd_list(false);
                setmodal_list(false);
            }
        }
    });

    /**This function is an event handler that triggers when the user
     *  selects a file for the license image */
    const handleLicensceImageChange = (event) => {
        const file = event.target.files[0];
        setUpdateImage(file)
        setLicenscePreview(URL.createObjectURL(file));
    };

    /**Function for changing service provider status */
    function toggleStatus(button, serviceProviderId) {
        var currentStatus = button.innerText.trim();
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            // Find the corresponding customer by ID
            const service_provider = sproviders.find((s) => s.id === serviceProviderId);
            console.log("Service Provider ", service_provider);
            if (service_provider) {
                console.log('Came here');
                service_provider.status = 'INACTIVE';
                console.log("Service Provider", service_provider);
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            // Find the corresponding customer by ID
            const service_provider = sproviders.find((s) => s.id === serviceProviderId);
            if (service_provider) {
                service_provider.status = 'ACTIVE';
            }
        }
    }

    /**This function is used to toggle the modal for adding/editing service providers 
     * and set the selected service provider */
    function tog_list(param, productId) {
        if (param === 'ADD') {
            setAdd_list(!add_list);
        }
        const data = sproviders?.find((item) => item?.id === productId)
        setSprovider([data]);
        setmodal_list(!modal_list);
        setLicenscePreview(data?.licence_image);
    }

    /**This function toggles the view modal for displaying details
     *  of a service provider */
    function tog_view(productId) {
        const data = sproviders?.find((item) => item?.id === productId)
        setSprovider([data]);
        setView_modal(!view_modal);

    }

    /**This function is used to remove a service provider*/
    function remove_data(id) {
        removeSProvider(id)
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
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
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
                                            <th className="username" data-sort="username">Role</th>
                                            <th className="contactperson" data-sort="contactperson">Contact Person</th>
                                            <th className="phone" data-sort="phone">Contact Number</th>
                                            <th className="status" data-sort="status">Status</th>
                                            <th className="action" data-sort="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {sproviders.map((value, index) => (
                                            <tr key={value?.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td className="name">{value.name}</td>
                                                <td className="email">{value.email}</td>
                                                <td className="role">{value.role_name}</td>
                                                <td className="contact_person">{value.contact_person}</td>
                                                <td className="phone">{value.contact_no}</td>
                                                <td className="status">
                                                <button
                                                    className="btn btn-sm btn-success status-item-btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#showModal"
                                                    onClick={(event) => toggleStatus(event.target, value.id)}
                                                >
                                                    {value.status}
                                                </button>
                                                </td>
                                                <td>
                                                <div className="d-flex gap-2">
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
                                                    <div className="edit">
                                                    <button
                                                        className="btn btn-sm btn-primary edit-item-btn"
                                                        onClick={() => tog_list("EDIT", value.id)}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal"
                                                    >
                                                        Edit
                                                    </button>
                                                    </div>
                                                    <div className="remove">
                                                    <button
                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                        onClick={() => remove_data(value.id)}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteRecordModal"
                                                    >
                                                        Remove
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
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { setmodal_list(false); setAdd_list(false);; setLicenscePreview(null) }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setmodal_list(false); setAdd_list(false);; setLicenscePreview(null) }}>{add_list ? 'Add service provider' : 'Edit service provider'}</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
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
                                        onChange={validation.handleChange}
                                        placeholder="Enter Provider Name"
                                        required
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
                                        onChange={validation.handleChange}
                                        placeholder="Enter Email"
                                        required
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
                                        value={validation.values.username || ""}
                                        onChange={validation.handleChange}
                                        placeholder="Enter User Name"
                                        required
                                    />
                                </div>
                                {/* Role */}
                                <div className="mb-3">
                                    <label htmlFor="status-field" className="form-label">Role</label>
                                    <select
                                        className="form-control"
                                        data-trigger
                                        name="role_name"
                                        id="status-field"
                                        value={validation.values.role_name || ""}
                                        onChange={validation.handleChange}
                                    >
                                        {!add_list ? (
                                            <>
                                                <option value="service provider">{item?.role_name}</option>
                                                <option value="super admin">super admin</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="">Select Role</option>
                                                <option value="service provider">service provider</option>
                                                <option value="super admin">super admin</option>
                                            </>
                                        )}
                                    </select>
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
                                                <img src={licenscePreview} alt="Licensce Image Preview" style={{ maxWidth: '100px' }} />
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
                            </div>
                        ))}
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
            <Modal className="extra-width" isOpen={view_modal} toggle={() => { tog_view('view'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_view('view'); }}>View service provider</ModalHeader>
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
                                        value={validation.values.username || ""}
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
                                        <img src={validation.values.licence_image || ""} alt="Licence Image" style={{ maxWidth: '100px' }} />
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
