import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
import { useFormik } from "formik";
// Import Flatepicker
// import Flatpickr from "react-flatpickr";
import { qetEnquiriesData } from "../../../helpers/ApiRoutes/authApiRoutes";


import { enquiriesData } from '../../../CommonData/Data';

const ListEnquiriesTable = () => {
    function toggleStatus(button, enquiryId) {
        var currentStatus = button.innerText.trim();
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');

            // Find the corresponding customer by ID
            const enquiry = enquiriesData.find((e) => e.id === enquiryId);
            console.log("Enquiry", enquiry);
            if (enquiry) {
                console.log('Came here');
                enquiry.status = 'INACTIVE';
                console.log("Enquiry", enquiry);
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');

            // Find the corresponding customer by ID
            const enquiry = enquiriesData.find((e) => e.id === enquiryId);
            if (enquiry) {
                enquiry.status = 'ACTIVE';
            }
        }
    }

    const [modal_list, setmodal_list] = useState(false);
    const [enquiries, setEnquiries] = useState([])
    const [enquirie, setEnquirie] = useState([])

    function tog_list(param, productId) {

        const data = enquiries?.find((item) => item?.id === productId)
        setEnquirie([data]);
        setmodal_list(!modal_list);
        // setcertificatePreview(null)
    }




    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    useEffect(() => {
        setEnquiries(qetEnquiriesData());
    }, [])

    useEffect(() => {

        // Existing List
        const existOptionsList = {
            valueNames: ['contact-name', 'contact-message']
        };

        new List('contact-existing-list', existOptionsList);

        // Fuzzy Search list
        new List('fuzzysearch-list', {
            valueNames: ['name']
        });

        // pagination list

        new List('pagination-list', {
            valueNames: ['pagi-list'],
            page: 3,
            pagination: true
        });
    });

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Enquiries" />

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

                                            </Col>

                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Customer Name</th>
                                                        {/* <th className="sort" data-sort="customer_email">Customer Email</th> */}
                                                        {/* <th className="sort" data-sort="customer_username">Customer User Name</th> */}
                                                        {/* <th className="sort" data-sort="contact_no">Customer Contact Number</th> */}
                                                        {/* <th className="sort" data-sort="vehicle_requested">Vehicle Requested</th> */}
                                                        <th className="sort" data-sort="service_provider">Service Provider</th>
                                                        <th className="sort" data-sort="driver">Driver</th>
                                                        <th className="sort" data-sort="vehicle_number">Vehicle Number</th>
                                                        {/* <th className="sort" data-sort="vehicle_maker">Maker</th>
                                                        <th className="sort" data-sort="pickup_location">Pickup Location</th>
                                                        <th className="sort" data-sort="drop_location">Drop Location</th>*/}
                                                        <th className="sort" data-sort="total_horse">Number Of Horse</th>
                                                            {/*<th className="sort" data-sort="description">Description</th>
                                                        <th className="sort" data-sort="created_date">Created Date</th>
                                                        <th className="sort" data-sort="updated_date">Update Date</th> */}
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {enquiries.map((item,index) => (
                                                        <tr key={item.id}>
                                                    
                                                           <td className="index">{index + 1}</td>
                                                            <td className="customer_name">{item.cName}</td>
                                                           {/*  <td className="customer_email">{item.cEmail}</td>
                                                            <td className="customer_username">{item.cUser_name}</td> */}
                                                            {/* <td className="contact_no">{item.cPhone}</td> */}
                                                            {/* <td className="vehicle_requested">BMW</td> */}
                                                            <td className="service_provider">{item.vService_provider}</td>
                                                            <td className="driver">{item.driver}</td>
                                                            <td className="vehicle_number">{item.vVvehicle_number}</td>
                                                            {/* <td className="vehicle_maker">{item.vMake}</td>
                                                            <td className="pickup_location">{item.pickup_location}</td>
                                                            <td className="drop_location">{item.drop_location}</td>*/}
                                                            <td className="total_horse">{item.no_of_horse}</td>
                                                              {/*<td className="description">{item.description}</td>
                                                            <td className="created_date">{item.created_at}</td>
                                                            <td className="updated_date">{item.updated_at}</td> */}
                                                            <td className="status">
                                                                <div>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="status">
                                                                            <button
                                                                                className="btn btn-sm btn-success status-item-btn"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#showModal"
                                                                                onClick={(event) => toggleStatus(event.target, item.id)}
                                                                            >
                                                                                {item.status}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => tog_list(item.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">View</button>
                                                                    </div>
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>




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

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination customers-pagination mb-0"></ul>
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
            {/* View Modal */}
            <  Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}>View Enquiry </ModalHeader>
                <form className="tablelist-form"
                >
                                       <ModalBody>
                                       {enquiries?.map((item, index) => (
                        <div key={index}>
                            {/* <div className="mb-3">
                            <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                            <input
                                type="text"
                                name="cName"
                                id="customerName-field"
                                className="form-control"
                                value={item.cName}
                                readOnly
                            />
                            </div> */}

                            <div className="mb-3">
                            <label htmlFor="customerEmail-field" className="form-label">Customer Email</label>
                            <input
                                type="text"
                                name="cEmail"
                                id="customerEmail-field"
                                className="form-control"
                                value={item.cEmail}
                                readOnly
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="customerUsername-field" className="form-label">Customer Username</label>
                            <input
                                type="text"
                                name="cUser_name"
                                id="customerUsername-field"
                                className="form-control"
                                value={item.cUser_name}
                                readOnly
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="customerPhone-field" className="form-label">Customer Contact Number</label>
                            <input
                                type="text"
                                name="cPhone"
                                id="customerPhone-field"
                                className="form-control"
                                value={item.cPhone}
                                readOnly
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="customerIdProofno-field" className="form-label">Customer ID Proof Number</label>
                            <input
                                type="text"
                                name="cId_proof_no"
                                id="customerIdProofno-field"
                                className="form-control"
                                value={item.cId_proof_no}
                                readOnly
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="cStatus-field" className="form-label">Customer Status</label>
                            <input
                                type="text"
                                name="cStatus"
                                id="cStatus-field"
                                className="form-control"
                                value={item.cStatus}
                                readOnly
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="cCreated_at-field" className="form-label">Customer Created At</label>
                            <input
                                type="text"
                                name="cCreated_at"
                                id="cCreated_at-field"
                                className="form-control"
                                value={item.cCreated_at}
                                readOnly
                            />
                            </div>

                            {/* <div className="mb-3">
                            <label htmlFor="driverId-field" className="form-label">Driver ID</label>
                            <input
                                type="text"
                                name="driver_id"
                                id="driverId-field"
                                className="form-control"
                                value={item.driver_id}
                                readOnly
                            />
                            </div> */}
{/* 
                            <div className="mb-3">
                            <label htmlFor="driver-field" className="form-label">Driver</label>
                            <input
                                type="text"
                                name="driver"
                                id="driver-field"
                                className="form-control"
                                value={item.driver}
                                readOnly
                            />
                            </div> */}

                            {/* <div className="mb-3">
                            <label htmlFor="vId-field" className="form-label">Vehicle ID</label>
                            <input
                                type="text"
                                name="vId"
                                id="vId-field"
                                className="form-control"
                                value={item.vId}
                                readOnly
                            />
                            </div> */}
{/* 
                            <div className="mb-3">
                            <label htmlFor="vService_provider-field" className="form-label">Vehicle Service Provider</label>
                            <input
                                type="text"
                                name="vService_provider"
                                id="vService_provider-field"
                                className="form-control"
                                value={item.vService_provider}
                                readOnly
                            />
                            </div> */}

                            {/* <div className="mb-3">
                            <label htmlFor="vVehicle_number-field" className="form-label">Vehicle Number</label>
                            <input
                                type="text"
                                name="vVehicle_number"
                                id="vVehicle_number-field"
                                className="form-control"
                                value={item.vVehicle_number}
                                readOnly
                            />
                            </div> */}

                            <div className="mb-3">
                            <label htmlFor="vMake-field" className="form-label">Vehicle Make</label>
                            <input
                                type="text"
                                name="vMake"
                                id="vMake-field"
                                className="form-control"
                                value={item.vMake}
                                readOnly
                            />
                            </div>

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

                            {/* <div className="mb-3">
                            <label htmlFor="no_of_horse-field" className="form-label">Number of Horses</label>
                            <input
                                type="text"
                                name="no_of_horse"
                                id="no_of_horse-field"
                                className="form-control"
                                value={item.no_of_horse}
                                readOnly
                            />
                            </div> */}

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

                            {/* <div className="mb-3">
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <input
                                type="text"
                                name="status"
                                id="status-field"
                                className="form-control"
                                value={item.status}
                                readOnly
                            />
                            </div> */}

                            {/* <div className="mb-3">
                            <label htmlFor="created_at-field" className="form-label">Created At</label>
                            <input
                                type="text"
                                name="created_at"
                                id="created_at-field"
                                className="form-control"
                                value={item.created_at}
                                readOnly
                            />
                            </div> */}
{/* 
                            <div className="mb-3">
                            <label htmlFor="updated_at-field" className="form-label">Updated At</label>
                            <input
                                type="text"
                                name="updated_at"
                                id="updated_at-field"
                                className="form-control"
                                value={item.updated_at}
                                readOnly
                            />
                            </div> */}

                            {/* Continue adding other fields */}
                        </div>
                        ))}


                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); }}>Close</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>



            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} className="modal fade zoomIn" id="deleteRecordModal" centered >
                <div className="modal-header">
                    <Button type="button" onClick={() => setmodal_delete(false)} className="btn-close" aria-label="Close"> </Button>
                </div>
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
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default ListEnquiriesTable;