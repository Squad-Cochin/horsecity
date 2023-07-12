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
import { getTripDeatails } from '../../helpers/ApiRoutes/authApiRoutes'

import { updatTripData} from '../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";
const TripDeatails = () => {

    const [ modal_list, setmodal_list] = useState(false);
    const [ tripDatas, setTripDatas] = useState([]);
    const [ tripData, setTripData] = useState([])
    function tog_list(productId) {

        const data = tripDatas?.find((item)=>item?.id === productId)
        setTripData([data]);
        setmodal_list(!modal_list);

    }
    const initialValues = {
        service_provider:  tripData[0]?.service_provider || '',
        vehicle_number: tripData[0]?.vehicle_number || '',
        start_location:  tripData[0]?.start_location || '',
        end_location:  tripData[0]?.end_location || '',
        booking_date:  tripData[0]?.booking_date || '',
        quotation_date:  tripData[0]?.quotation_date || '',
        trip_date:  tripData[0]?.trip_date || '',
        amount: tripData[0]?.amount || '',
        payment_status:  tripData[0]?.payment_status || '',
        trip_status :  tripData[0]?.trip_status || '',
      };
      
      // Later in your code, when setting the initial state
  
      
      
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
                console.log(values);
        
                    //update previes one
                    console.log("update previues one ");
                    updatTripData(values);
           
                    setmodal_list(false);
                 
                
    
        }
      });

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    useEffect(()=>{
    // let TripDeatails = getTripDeatails();
    setTripDatas(getTripDeatails)
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
                                                {/* <th className="sort" data-sort="licence_img">Licence image</th> */}
                                                <th className="sort" data-sort="amount">Amount</th>
                                                <th className="sort" data-sort="payment-status">Payment Status</th>
                                                <th className="sort" data-sort="trip-status">Trip Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list form-check-all">
                                                {tripDatas.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                    </div>
                                                    </td>
                                                    <td className="service-provider">{item.service_provider}</td>
                                                    <td className="vehicle-number">{item.vehicle_number}</td>
                                                    <td className="start-location">{item.start_location}</td>
                                                    {/* <td className="email">{item.profile_image}</td> */}
                                                    <td className="end-location">{item.end_location}</td>
                                                    <td className="booking-date">{item.booking_date}</td>
                                                    <td className="quotation-date">{item.quotation_date}</td>
                                                    <td className="trip-date">{item.trip_date}</td>
                                                    {/* <td className="licence_IMG">{item.licence_img}</td> */}
                                                    <td className="amount">{item.amount}</td>
                                                    <td className="payment-status">
                                                    <span className="badge badge-soft-success text-uppercase">{item.payment_status}</span>
                                                    </td>
                                                    <td className="trip-status">
                                                    <span className="badge badge-soft-success text-uppercase">{item.trip_status}</span>
                                                    </td>
                                                    <td>
                                                    <div className="d-flex gap-2">
                                                        <div className="edit">
                                                        <button
                                                            className="btn btn-sm btn-success edit-item-btn"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#showModal"
                                                            onClick={() => tog_list(item.id)}
                                                        >
                                                            Edit
                                                        </button>
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Edit Trip Deatails </ModalHeader>
                <form className="tablelist-form"
                onSubmit={validation.handleSubmit}>
                    <ModalBody   >
                      {/* Provider Name */}
                        <div className="mb-3">
                        <label htmlFor="providerName-field" className="form-label">Provider Name</label>
                        <input
                            type="text"
                            name="service_provider"
                            id="providerName-field"
                            className="form-control"
                            value={validation.values.service_provider || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter Provider Name"
                            required
                        />
                        </div>

                        {/* Vehicle Number */}
                        <div className="mb-3">
                        <label htmlFor="vehicleNumber-field" className="form-label">Vehicle Number</label>
                        <input
                            type="text"
                            name="vehicle_number"
                            id="vehicleNumber-field"
                            className="form-control"
                            value={validation.values.vehicle_number || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter Vehicle Number"
                            required
                        />
                        </div>

                        {/* Start Location */}
                        <div className="mb-3">
                        <label htmlFor="startLocation-field" className="form-label">Start Location</label>
                        <input
                            type="text"
                            name="start_location"
                            id="startLocation-field"
                            className="form-control"
                            value={validation.values.start_location || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter Start Location"
                            required
                        />
                        </div>

                        {/* End Location */}
                        <div className="mb-3">
                        <label htmlFor="endLocation-field" className="form-label">End Location</label>
                        <input
                            type="text"
                            name="end_location"
                            id="endLocation-field"
                            className="form-control"
                            value={validation.values.end_location || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter End Location"
                            required
                        />
                        </div>
                       {/* Booking Date */}
                    <div className="mb-3">
                    <label htmlFor="bookingDate-field" className="form-label">Booking Date</label>
                    <Flatpickr
                        className="form-control"
                        id="bookingDate-field"
                        name="booking_date"
                        options={{
                        dateFormat: "d M, Y"
                        }}
                        value={validation.values.booking_date || ""}
                        onChange={validation.handleChange}
                        placeholder="Select Date"
                        required
                    />
                    </div>

                        {/* Quotation Date */}
                        <div className="mb-3">
                        <label htmlFor="quotationDate-field" className="form-label">Quotation Date</label>
                        <Flatpickr
                        className="form-control"
                        id="bookingDate-field"
                        name="booking_date"
                        options={{
                        dateFormat: "d M, Y"
                        }}
                        value={validation.values.quotation_date || ""}
                        onChange={validation.handleChange}
                        placeholder="Select Date"
                        required
                    />
                        </div>

                        {/* Trip Date */}
                        <div className="mb-3">
                        <label htmlFor="tripDate-field" className="form-label">Trip Date</label>
                        <Flatpickr
                        className="form-control"
                        id="tripDate-field"
                        name="booking_date"
                        options={{
                        dateFormat: "d M, Y"
                        }}
                        value={validation.values.trip_date || ""}
                            onChange={validation.handleChange}
                        placeholder="Select Date"
                        required
                    />
                        </div>

                        {/* Amount */}
                        <div className="mb-3">
                        <label htmlFor="amount-field" className="form-label">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            id="amount-field"
                            className="form-control"
                            value={validation.values.amount || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter Amount"
                            required
                        />
                        </div>

                        {/* Payment Status */}
                        <div className="mb-3">
                        <label htmlFor="paymentStatus-field" className="form-label">Payment Status</label>
                        <input
                            type="text"
                            name="payment_status"
                            id="paymentStatus-field"
                            className="form-control"
                            value={validation.values.payment_status || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter Payment Status"
                            required
                        />
                        </div>

                        {/* Trip Status */}
                        <div className="mb-3">
                        <label htmlFor="tripStatus-field" className="form-label">Trip Status</label>
                        <input
                            type="text"
                            name="trip_status"
                            id="tripStatus-field"
                            className="form-control"
                            value={validation.values.trip_status || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter Trip Status"
                            required
                        />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Update Trip Deatails</button>
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
