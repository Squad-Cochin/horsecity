import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

// Import Images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import Drivers
import { getTripDeatails } from '../../helpers/AuthType/apiRoutes'
const TripDeatails = () => {

    const [ modal_list, setmodal_list] = useState(false);
    const [ tripData, setTripData] = useState([])
    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    useEffect(()=>{
    // let TripDeatails = getTripDeatails();
    setTripData(getTripDeatails)
    },[])
    useEffect(() => {

        // const attroptions = {
        //     valueNames: [
        //         'name',
        //         'born',
        //         {
        //             data: ['id']
        //         },
        //         {
        //             attr: 'src',
        //             name: 'image'
        //         },
        //         {
        //             attr: 'href',
        //             name: 'link'
        //         },
        //         {
        //             attr: 'data-timestamp',
        //             name: 'timestamp'
        //         }
        //     ]
        // };
        // const attrList = new List('users', attroptions);
        // attrList.add({
        //     name: 'Leia',
        //     born: '1954',
        //     image: avatar5,
        //     id: 5,
        //     timestamp: '67893'
        // });

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
                    <Breadcrumbs title="Tables" breadcrumbItem="Trip details" />

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
                                                    {/* <Button color="success" className="add-btn" onClick={() => tog_list()} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button> */}
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
                                                        <th className="sort" data-sort="service-provider">Service Provider</th>
                                                        <th className="sort" data-sort="vehicle-number">Vehicle Number</th>
                                                        <th className="sort" data-sort="start-location">Start Location</th>
                                                        {/* <th className="sort" data-sort="image">Image</th> */}
                                                        <th className="sort" data-sort="end-location">End Location</th>
                                                      
                                                        <th className="sort" data-sort="booking-date">Booking Date</th>
                                                        <th className="sort" data-sort="quotation-date">Quotation Date</th>
                                                        <th className="sort" data-sort="trip-date">Trip Date</th>
                                                        {/* <th className="sort" data-sort="licence_img">Licence image  </th> */}
                                                        <th className="sort" data-sort="amount">Amount</th>
                                                        <th className="sort" data-sort="payment-status">Trip Status</th>
                                                        <th className="sort" data-sort="trip-status">Trip Status</th>
                                                  
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {tripData.map((item)=>(

                                        
                                                    <tr key={item.id}> 
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td className="service-provider">{item.service_provider}</td>
                                                        <td className="vehicle-number">{item.vehicle_number}</td>
                                                        <td className="start-lication">{item.start_location}</td>
                                                        {/* <td className="email">{item.profile_image}</td> */}
                                                        <td className="end-location">{item.end_location}</td>
                                                        <td className="booking-date">{item.booking_date}</td>
                                                        <td className="quotation-date">{item.quotation_date}</td>
                                                        <td className="trip-date">{item.trip_date}</td>
                                                        <td className="amount">{item.amount}</td>
                                                        {/* <td className="licence_IMG">{item.licence_img}</td> */}
                                                        <td className="payment-status"><span className="badge badge-soft-success text-uppercase">{item.payment_status}</span></td>
                                                        <td className="trip-status"><span className="badge badge-soft-success text-uppercase">{item.trip_status}</span></td>
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

                    {/* <Row>
                 <Col xl={4}>
                            <Card>
                           
                                <CardBody>    
                                    <div id="users">
                                        <SimpleBar style={{ height: "242px" }} className="mx-n3">
                                            <ListGroup className="list mb-0" flush>
                                                <ListGroupItem data-id="1">
                                              </ListGroupItem>
                                            </ListGroup>
                                        </SimpleBar>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>


                       
                    </Row> */}

                
                </Container>
            </div>

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Add Driver </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Name</label>
                            <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input type="email" id="email-field" className="form-control" placeholder="Enter Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone-field" className="form-label">Phone</label>
                            <input type="text" id="phone-field" className="form-control" placeholder="Enter Phone no." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date-field" className="form-label">Joining Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y"
                                }}
                                placeholder="Select Date"
                            />
                        </div>

                        <div>
                            <label htmlFor="status-field" className="form-label">Status</label>
                            <select className="form-control" data-trigger name="status-field" id="status-field" >
                                <option value="">Status</option>
                                <option value="Active">Active</option>
                                <option value="Block">Block</option>
                            </select>
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

export default TripDeatails;
