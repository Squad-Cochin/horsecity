import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";
import enquiriesData from "../../../CommonData/Data/enquiriesPageData";

const ListEnquiriesTable = () => {

    const [modal_list, setmodal_list] = useState(false);
    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

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
                    <Breadcrumbs title = "Tables" breadcrumbItem = "Enquiries" />

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
                                                    <Button color="success" className="add-btn" onClick={() => tog_list()} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                    <Button color="soft-danger"
                                                    // onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button>
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th>
                                                        <th className="sort" data-sort="customer_name">Name</th>
                                                        <th className="sort" data-sort="customer_email">Email</th>
                                                        <th className="sort" data-sort="customer_username">User Name</th>
                                                        <th className="sort" data-sort="contact_no">Contact Number</th>
                                                        {/* <th className="sort" data-sort="vehicle_requested">Vehicle Requested</th> */}
                                                        <th className="sort" data-sort="service_provider">Service Provider</th>
                                                        <th className="sort" data-sort="vehicle_number">Vehicle Number</th>
                                                        <th className="sort" data-sort="vehicle_maker">Maker</th>
                                                        <th className="sort" data-sort="pickup_location">Pickup Location</th>
                                                        <th className="sort" data-sort="drop_location">Drop Location</th>
                                                        <th className="sort" data-sort="total_horse">Number Of Horse</th>
                                                        <th className="sort" data-sort="description">Description</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="created_date">Created Date</th>
                                                        <th className="sort" data-sort="updated_date">Update Date</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {enquiriesData.map((item) => ( 
                                                        <tr key = {item.id}>   
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td className="customer_name">{item.cName}</td>
                                                        <td className="customer_email">{item.cEmail}</td>
                                                        <td className="customer_username">{item.cUser_name}</td>
                                                        <td className="contact_no">{item.cPhone}</td>
                                                        {/* <td className="vehicle_requested">BMW</td> */}
                                                        <td className="service_provider">{item.vService_provider}</td>
                                                        <td className="vehicle_number">{item.vVvehicle_number}</td>
                                                        <td className="vehicle_maker">{item.vMake}</td>
                                                        <td className="pickup_location">{item.pickup_location}</td>
                                                        <td className="drop_location">{item.drop_location}</td>
                                                        <td className="total_horse">{item.no_of_horse}</td>
                                                        <td className="description">{item.description}</td>
                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">{item.status}</span></td>
                                                        <td className="created_date">{item.created_at}</td>
                                                        <td className="updated_date">{item.updated_at}</td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>
                                                                <div className="remove">
                                                                    <button className="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
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

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Add Customer </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>

                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customer_name-field" className="form-label">Name</label>
                            <input type="text" id="customer_name-field" className="form-control" placeholder="Enter Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customer_email-field" className="form-label">Email</label>
                            <input type="email" id="customer_email-field" className="form-control" placeholder="Enter Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customer_username-field" className="form-label">Username</label>
                            <input type="username" id="customer_username-field" className="form-control" placeholder="Enter Username" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contact_no-field" className="form-label">Contact Number</label>
                            <input type="text" id="contact_no-field" className="form-control" placeholder="Enter Contact Number" required />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="date_of_birth-field" className="form-label">Date Of Birth</label>
                            <input type="date_of_birth" id="date_of_birth-field" className="form-control" placeholder="Enter Date Of Birth" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_proof-field" className="form-label">Id Proof</label>
                            <input type="id_proof" id="id_proof-field" className="form-control" placeholder="Enter Id Proof" required />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field" >
                                <option value="">Status</option>
                                <option value="active">ACTIVE</option>
                                <option value="inactive">INACTIVE</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="contact_number_verified-field" className="form-label" s>Contact Number Verified</label>
                            <select className="form-control" data-trigger name="contact_number_verified-field" id="contact_number_verified-field" >
                                <option value="">Status</option>
                                <option value="true">TRUE</option>
                                <option value="false">FALSE</option>
                            </select>
                        </div>


                        <div>
                            <label htmlFor="email_verified-field" className="form-label">Email Verified</label>
                            <select className="form-control" data-trigger name="email_verified-field" id="email_verified-field" >
                                <option value="">Status</option>
                                <option value="true">TRUE</option>
                                <option value="false">FALSE</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="registered_date-field" className="form-label">Registered Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                placeholder="Select Date"
                            />
                        </div>

                        
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Add Customer</button>
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