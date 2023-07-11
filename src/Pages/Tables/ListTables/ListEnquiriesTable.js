import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
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
    const [add_list, setAdd_list] = useState(false);
    const [enquirie, setEnquirie] = useState([])
    function tog_list(param, productId) {
        if (param === 'ADD') {
            setAdd_list(!add_list);
        }
        const data = enquiries?.find((item) => item?.id === productId)
        setEnquirie([data]);

        setmodal_list(!modal_list);
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
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
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
                                                        <th className="sort" data-sort="created_date">Created Date</th>
                                                        <th className="sort" data-sort="updated_date">Update Date</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {enquiries.map((item) => (
                                                        <tr key={item.id}>
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
                                                            <td className="created_date">{item.created_at}</td>
                                                            <td className="updated_date">{item.updated_at}</td>
                                                            {/* <td className="status"><span className="badge badge-soft-success text-uppercase">{item.status}</span></td> */}

                                                            <div>
                                                                <div className="d-flex gap-2">
                                                                    <div className="status">
                                                                        <button className="btn btn-sm btn-success status-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal"
                                                                            onClick={(event) => toggleStatus(event.target, item.id)}>
                                                                            {item.status}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_list('EDIT', item.id)}
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ? 'Add Enquirie' : 'Edit Enquirie'}</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        {enquirie?.map((item, index) => (
                            <div key={index}>
                                {/* <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div> */}
                                <div className="mb-3">
                                    <label htmlFor="customer_name-field" className="form-label">Customer Name</label>
                                    <input type="text" id="customer_name-field" className="form-control" defaultValue={!add_list ? item?.cName : ''} placeholder="Enter Customer Name" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="customer_username-field" className="form-label">Customer Username</label>
                                    <input type="username" id="customer_username-field" className="form-control" defaultValue={!add_list ? item?.cUser_name : ''} placeholder="Enter Customer Username" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="vehicle-field" className="form-label">Desired Vehicle Number</label>
                                    <input type="text" id="vehicle-field" className="form-control" defaultValue={!add_list ? item?.vVvehicle_number : ''} placeholder="Enter Desired Vehicle Number" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contact_no-field" className="form-label">Contact Number</label>
                                    <input type="text" id="contact_no-field" className="form-control" defaultValue={!add_list ? item?.cPhone : ''} placeholder="Enter Contact Number" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pickup_location-field" className="form-label">Pick-Up Location</label>
                                    <input type="text" id="pickup_location-field" className="form-control" defaultValue={!add_list ? item?.pickup_location : ''} placeholder="Enter Pick-Up Location" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="drop_location-field" className="form-label">Drop Location</label>
                                    <input type="text" id="drop_location-field" className="form-control" defaultValue={!add_list ? item?.drop_location : ''} placeholder="Enter Drop Location" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="drop_location-field" className="form-label">Number Of Horses</label>
                                    <select id="drop_location-field" className="form-control" defaultValue={!add_list ? item?.no_of_horse : ''} required>
                                        {Array.from({ length: 50 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="description-field" className="form-label">Description</label>
                                    <input type="text" id="description-field" className="form-control" defaultValue={!add_list ? item?.description : ''} placeholder="Description" required />
                                </div>
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add enquiries' : 'Update enquiries'}</button>
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