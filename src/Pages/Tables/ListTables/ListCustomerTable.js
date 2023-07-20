///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
//                              This file is for implementing CRUD operations for customers                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
//IMPORTED FROM REACT BOOTSTRAP
import { Alert, Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

/**Navigation UI element */
import Breadcrumbs from "../../../components/Common/Breadcrumb";

/**Using for form validation */
import { useFormik } from "formik";

// Import Flatepicker for using  date pick
import Flatpickr from "react-flatpickr";

/**IMPORTED APIs */
// import { getCustomersData } from '../../../helpers/ApiRoutes/authApiRoutes'; //For getting all customers
import { removeCustomer } from '../../../helpers/ApiRoutes/removeApiRoutes'; //For removing customers
import { addNewCustomer } from '../../../helpers/ApiRoutes/addApiRoutes'; //For adding new customer
import { updateCustomer, updateCustomerStatus } from '../../../helpers/ApiRoutes/editApiRoutes'; //For updating  customer
import { getSingleCustomerData, getCustomersData } from '../../../helpers/ApiRoutes/getApiRoutes';
import config from '../../../config';

// Function for customer page
const ListCustomerTable = () => {

    const [modal_list, setmodal_list] = useState(false); /**Using for showing ADD & EDIT modal */
    const [view_modal, setView_modal] = useState(false); /**Using for showing VIEW modal */
    const [add_list, setAdd_list] = useState(false); /**Using for controlling ADD & EDIT modal */
    const [customers, setCustomers] = useState([]); /**Using for storing All customers */
    const [customer, setCustomer] = useState([]); /**Using for storing All particul  customer based of thair ID */
    const [updateImage, setUpdateImage] = useState(""); /**Using for storing id proof image file */
    const [idProofPreview, setIdProofPreview] = useState(null);  /**Using for storing idproof image URL*/
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("")
    const pageLimit = config.pageLimit;

    /**This hook is used to fetch customers data */
    useEffect(() => {
        getAllData(1)
    }, [])

    /**This object sets the initial values for the form fields managed by formik */
    const initialValues = {
        name: !add_list ? customer[0]?.name : '',
        email: !add_list ? customer[0]?.email : '',
        userName: !add_list ? customer[0]?.user_name : '',
        password: !add_list ? customer[0]?.password : '',
        contact_no: !add_list ? customer[0]?.contact_no : '',
        date_of_birth: !add_list ? customer[0]?.date_of_birth : '',
        id_proof_no: !add_list ? customer[0]?.id_proof_no : '',
        id_proof_image: !add_list ? customer[0]?.id_proof_image : '',
    };

    // Later in your code, when setting the initial state
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            console.log(values);
            values.id_proof_image = updateImage;
            if (add_list) {
                //add new customer
                addCustomer(values)
            } else {
                //update previes customer
                console.log("update previues one ");
                updateCustomer(values);
                setAdd_list(false);
                setmodal_list(false);
            }
        }
    });

    // function for add customer
    async function addCustomer(values){
        let addCustomer = await addNewCustomer(values);
        if(addCustomer.code === 200){
            setErrors("")
            setAdd_list(false);
            setmodal_list(false);
            getAllData(pageNumber)
        }else{
            setErrors("")
            setErrors(addCustomer.message)
        }
    }

    /**This function is an event handler that triggers when the user
     *  selects a file for the idproof image */
    const handleIdProofImageChange = (event) => {
        const file = event.target.files[0];
        setUpdateImage(file)
        setIdProofPreview(URL.createObjectURL(file));
    };

    /**This function is used to toggle the modal for adding/editing customers 
    * and set the selected customer */
    function tog_list(param, productId) {
        if (param === 'ADD') {
            setAdd_list(!add_list);
        }else{
            const data = customers?.find((item) => item?.id === productId)
            setCustomer([data]);
            setIdProofPreview(data?.id_proof_image)
        }
        setmodal_list(!modal_list);
    }

    /**This function toggles the view modal for displaying details
    *  of a customer */
    async function tog_view(productId) {
        let singleCustomer = await getSingleCustomerData(productId)
        setCustomer(singleCustomer.singleCustomer)
        setView_modal(!view_modal);
    }

    /**This function is used to remove a service provider*/
    function remove_data(id) {
        removeCustomer(id)
    }

    /**Function for changing customers status */
    function toggleStatus(button, customerId) {
        var currentStatus = button.innerText.trim();
        const customerData = customers.find((s) => s.id === customerId);
        updateCustomerStatus(customerData.id)
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            if (customerData) {
                customerData.status = 'INACTIVE';
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            if (customerData) {
                customerData.status = 'ACTIVE';
            }
        }
    }

    // function for get data all service provider data
    async function getAllData(page) {
        let getCustomers = await getCustomersData(page || 1);
        console.log(getCustomers)
        setCustomers(getCustomers?.customers);
        setPageNumber(page);
        setNumberOfData(getCustomers?.totalCount);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Customers" />
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
                                            <th className="index" data-sort="customer_name">
                                                #
                                            </th>
                                            <th className="customer_name" data-sort="customer_name">
                                                Name
                                            </th>
                                            <th className="email" data-sort="email">
                                                Email
                                            </th>
                                            <th className="contact_no" data-sort="contact_no">
                                                Contact Number
                                            </th>
                                            <th className="registered_date" data-sort="registered_date">
                                                Registered Date
                                            </th>
                                            <th className="status" data-sort="status">
                                                Status
                                            </th>
                                            <th className="action" data-sort="action">
                                                Action
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {customers.map((item, index) => (
                                            <tr key={item.id}>
                                                <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                <td className="customer_name">{item.name}</td>
                                                <td className="email">{item.email}</td>
                                                <td className="contact_no">{item.contact_no}</td>
                                                <td className="registered_date">{item.created_at}</td>
                                                <td>
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
                                                <td>
                                                <div className="d-flex gap-2">
                                                    <div className="view">
                                                    <button
                                                        className="btn btn-sm btn-success edit-item-btn"
                                                        onClick={() => tog_view(item.id)}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal"
                                                    >
                                                        View
                                                    </button>
                                                    </div>
                                                    <div className="edit">
                                                    <button
                                                        className="btn btn-sm btn-primary edit-item-btn"
                                                        onClick={() => tog_list("EDIT", item.id)}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal"
                                                    >
                                                        Edit
                                                    </button>
                                                    </div>
                                                    <div className="remove">
                                                    <button
                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                        onClick={() => remove_data(item.id)}
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

            {/********* Add Modal*************** */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { setmodal_list(false); setAdd_list(false); setIdProofPreview(null) }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { setmodal_list(false); setAdd_list(false); setIdProofPreview(null) }}>{add_list ? 'Add Customer' : 'Edit Customer'} </ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                        {/** Customer name */}
                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Name</label>
                            <input
                                type="text"
                                name='name'
                                id="customername-field"
                                className="form-control"
                                value={validation.values.name || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                        {/** Customer email */}
                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input
                                type="email"
                                name='email'
                                id="email-field"
                                value={validation.values.email || ""}
                                onChange={validation.handleChange}
                                className="form-control"
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                        {/** Customer username */}
                        <div className="mb-3">
                            <label htmlFor="username-field" className="form-label">Username</label>
                            <input
                                type="text"
                                name='userName'
                                id="username-field"
                                value={validation.values.userName || ""}
                                onChange={validation.handleChange}
                                className="form-control"
                                placeholder="Enter Username"
                                required
                            />
                        </div>
                        {/** Customer Password */}
                        {add_list ?
                            <div className="mb-3">
                                <label htmlFor="password-field" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    id="password-field"
                                    value={validation.values.password || ""}
                                    onChange={validation.handleChange}
                                    className="form-control"
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>
                        : null }
                        {/** Customer contact_no number */}
                        <div className="mb-3">
                            <label htmlFor="contact_no-field" className="form-label">Contact Number</label>
                            <input
                                type="text"
                                name='contact_no'
                                id="contact_no-field"
                                value={validation.values.contact_no || ""}
                                onChange={validation.handleChange}
                                className="form-control"
                                placeholder="Enter Contact Number"
                                required
                            />
                        </div>
                        {/** Customer Date of Birth */}
                        <div className="mb-3">
                            <label htmlFor="date_of_birth-field" className="form-label">Date Of Birth</label>
                            <Flatpickr
                                className="form-control"
                                name='date_of_birth'
                                options={{
                                    dateFormat: "d-m-Y"
                                }}
                                value={validation.values.date_of_birth || ""}
                                onChange={(dates) =>validation.setFieldValue('date_of_birth', dates[0])}
                                placeholder="Select Date"
                            />
                        </div>
                        {/** Customer Id proof no */}
                        <div className="mb-3">
                            <label htmlFor="id_proof_no-field" className="form-label">Id Proof Number</label>
                            <input
                                type="text"
                                id="id_proof_no-field"
                                name='id_proof_no'
                                className="form-control"
                                value={validation.values.id_proof_no || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Id Proof Number"
                                required
                            />
                        </div>

                        {/* Id proof Image */}
                        <div className="mb-3">
                            <label htmlFor="id_proof-field" className="form-label">Id Proof Image</label>
                            <div className="col-md-10">
                                {idProofPreview && (
                                    <div>
                                        <img src={idProofPreview} alt="Id Proof Preview" style={{ maxWidth: '100px' }} />
                                    </div>
                                )}

                                <input
                                    className="form-control"
                                    name="certification_or_license_img"
                                    type="file"
                                    placeholder="Certificate Image"
                                    onChange={handleIdProofImageChange}
                                />

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); setIdProofPreview(null) }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add Customer' : 'Update Customer'}
                            </button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/***************** View Modal *************/}
            <Modal className="extra-width" isOpen={view_modal} toggle={() => { tog_view('view'); }}>
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_view('view'); }}>View Customer</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {/** Customer name */}
                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Name</label>
                            <input
                                type="text"
                                name='name'
                                id="customername-field"
                                className="form-control"
                                value={validation.values.name || ""}
                                readOnly
                            />
                        </div>
                        {/** Customer email */}
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
                        {/** Customer username */}
                        <div className="mb-3">
                            <label htmlFor="username-field" className="form-label">Username</label>
                            <input
                                type="text"
                                name='username'
                                id="username-field"
                                value={validation.values.userName || ""}
                                className="form-control"
                                readOnly
                            />
                        </div>
                        {/** Customer contact_no number */}
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
                        {/** Customer Date of Birth */}
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
                        {/** Customer Id proof no */}
                        <div className="mb-3">
                            <label htmlFor="id_proof_no-field" className="form-label">Id Proof Number</label>
                            <input
                                type="text"
                                id="id_proof_no-field"
                                name='id_proof_no'
                                className="form-control"
                                value={validation.values.id_proof_no || ""}
                                readOnly
                            />
                        </div>

                        {/* certificate image */}
                        <div className="mb-3">
                            <label htmlFor="id_proof_image-field" className="form-label">Id Proof Image</label>
                            <div>
                                <img src={validation.values.id_proof_image || ""} alt="id_proof Image" style={{ maxWidth: '100px' }} />
                            </div>
                        </div>
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

export default ListCustomerTable;