/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the enquiries overall functionalities are coded in this file         //
//      The file contain the View all enquiry model, View particular enquiry data model    //
//       The object and functionalities are written in this file.                          //
/////////////////////////////////////////////////////////////////////////////////////////////


// Importing the react component
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import List from 'list.js';

// Importing the Enquiry Data 
import { getEnquiriesData } from "../../../helpers/ApiRoutes/authApiRoutes";

//The purpose of the Breadcrumbs component is to display a breadcrumb navigation element. 
import Breadcrumbs from "../../../components/Common/Breadcrumb";

// The name of the function. Which will be executed and used all over program. This funtion is having all the code
const ListEnquiriesTable = () => 
{
    const [view_modal, setView_modal] = useState(false);
    const [enquirie, setEnquirie] = useState(null);
    const [enquiries, setEnquiries] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('')
    // the useEffect hook is used to perform some initialization logic when the component mounts.
    useEffect(() => 
    {
        const existOptionsList =
        {
            valueNames: ['contact-name', 'contact-message']
        };
        new List('contact-existing-list', existOptionsList);
        new List('fuzzysearch-list',
        {
            valueNames: ['name']
        });
        new List('pagination-list',
        {
            valueNames: ['pagi-list'],
            page: 3,
            pagination: true
        });
    });

    //  The useEffect hook is used to perform some initialization logic when the component mounts

    useEffect(() => 
    {
        setEnquiries(getEnquiriesData());
    }, []);

    /**
     * The below function is for the view buttone. It will be used for getting the details of the particular enquiry.
     */

    function tog_view(productId)
    {
        const data = enquiries?.find((item) => item?.id === productId);
        setEnquirie([data]);
        setView_modal(prevState => !prevState);
    }

    /**
     * This function is typically used in a React component and is responsible for toggling the value of a state variable, modal, by calling the setModal function.
     */

    const toggleModal = () => 
    {
        setModal(!modal);
    };    


    // the execution of all the object and element are written inside the return. Whenever this file will be called only the code inside the return written will be returned
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Header of the Page */}
                    <Breadcrumbs title="Tables" breadcrumbItem="Enquiries" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">View</h4>
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
                                                        {/* This are the columns and column heading in the enquiry page */}
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Customer Name</th>
                                                        <th className="sort" data-sort="customer_email">Customer Email</th>
                                                        <th className="sort" data-sort="contact_no">Contact Number</th>
                                                        <th className="sort" data-sort="description">Description</th>
                                                        <th className="sort" data-sort="created_date">Created At</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {/* The data we will be getting to showcase on enquiry page is
                                                    from a object. We will map and show them one by one. The below function will be used this */}
                                                    {/* 'enquiries' is having all the enquiry data. */}
                                                    {/* Index is the number of the data. i.e Serial number */}
                                                    {enquiries.map((item,index) => (
                                                        <tr key={item.id}>
                                                        {/* Below we are intialize the enquiry data */}
                                                            <th scope="row"> {index + 1} </th> {/* // Serial Number */}
                                                            <td className="customer_name">{item.cName}</td> {/* Customer name */}
                                                            <td className="customer_email">{item.cEmail}</td> {/* Customer Email */}
                                                            <td className="contact_no">{item.cPhone}</td> {/* Customer Phone */}
                                                            <td className="description">{item.description}</td> {/* Enquiry Description */}
                                                            <td className="created_date">{item.created_at}</td> {/* Enquiry Time */}
                                                            {/* This is the place from where we are calling he view button and function. Which is used to show
                                                            particular enquiry data fully. */}
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => tog_view(item.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">
                                                                                View
                                                                        </button>
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
                                                    <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                        orders for you search.</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* the below is having the code of the pagination of the page.
                                        The previous and next button are also in side this function */}
                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">Previous</Link>
                                                <ul className="pagination customers-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#"> Next</Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalBody>
                    <img src={selectedImage} alt="Vehicle Image" style={{ width: '100%', maxHeight: '500px' }} />
                </ModalBody>
            </Modal>

            {/* View Modal function code*/}
            <Modal className="extra-width" isOpen={view_modal} centered >
            <ModalHeader toggle={() => setView_modal(false)}>View Enquiry</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                    {enquirie && enquirie.length > 0 && enquirie.map((item, index) => (
                            <div key={index}>
                                {/* The below element is for the customer name feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    name="cName"
                                    id="customerName-field"
                                    className="form-control"
                                    value={item.cName}
                                    readOnly
                                    />
                                </div>
                                {/* The below element is for the customer contact number feild in the view button.
                                Which is for details of particular enquiry detail */}
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
                                {/* The below element is for the service provider name feild in the view button.
                                Which is for details of particular enquiry detail */}                                
                                <div className="mb-3">
                                    <label htmlFor="service_provider-field" className="form-label">Service Provider Name</label>
                                    <input
                                        type="text"
                                        name="service_provider"
                                        id="service_provider-field"
                                        className="form-control"
                                        value={item.vService_provider}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the vehicle number feild in the view button.
                                Which is for details of particular enquiry detail */}
                                <div className="mb-3">
                                    <label htmlFor="vNumber-field" className="form-label">Vehicle Number</label>
                                    <input
                                        type="text"
                                        name="vNumber"
                                        id="vNumber-field"
                                        className="form-control"
                                        value={item.vVvehicle_number}
                                        readOnly
                                    />
                                </div>
                                {/* The below element is for the pickup location feild in the view button.
                                Which is for details of particular enquiry detail */}
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
                                {/* The below element is for the drop location feild in the view button.
                                Which is for details of particular enquiry detail */}
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
                                {/* The below element is for the description feild in the view button.
                                Which is for details of particular enquiry detail */}
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
                            </div>
                        ))}
                    </ModalBody> {/* Here all the element will be done*/}
                    {/* All the buttons are add from the footer */}
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

export default ListEnquiriesTable;