import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";
import { useFormik } from "formik";
import { addNewLanguage } from "../../helpers/ApiRoutes/addApiRoutes";
import { updateLanguage } from "../../helpers/ApiRoutes/editApiRoutes"

import { Invoices } from '../../CommonData/Data/Invoices';

// Import Images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import Drivers
// import { getLanguages } from '../../helpers/ApiRoutes/authApiRoutes'
import { getInvoice } from '../../helpers/ApiRoutes/authApiRoutes';

const InvoiceDetails = () => 
{
    const [ modal_list, setmodal_list] = useState(false);
    // const [ languages, setLanguges] = useState([])
    const [ invoices, setInvoices] = useState([])

    const [ add_list, setAdd_list ] = useState(false);
    const [ language, setLanguge] = useState([])
    const [modal_delete, setmodal_delete] = useState(false);

    useEffect(()=>{
    // let TripDeatails = getTripDeatails();
    setInvoices(getInvoice())
    },[])
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
    function tog_list(param,productId) {
        if(param === 'ADD'){
            setAdd_list(!add_list);
        }
        const data = invoices?.find((item)=>item?.id === productId)
        setInvoices([data]);
        setmodal_list(!modal_list);
    }
    

    
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Invoices" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    {/* <h4 className="card-title mb-0">Add, Edit & Remove</h4> */}
                                </CardHeader>

                                <CardBody>
                                    <div id="List">
                                        <Row className="g-4 mb-3">

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
                                        <table className="table align-middle table-nowrap" id="Table">
                                        <thead className="table-light">
                                            <tr>
                                            {/* <th scope="col" style={{ width: "50px" }}>
                                                <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                </div>
                                            </th> */}
                                            {/* <th className="sort" data-sort="serial_number">Sr.No</th> */}
                                            <th className="sort" data-sort="customer_name">Customer Name</th>
                                            <th className="sort" data-sort="service_provider_name">Service Provider Name</th>
                                            <th className="sort" data-sort="quotation_id">Quotation Id</th>
                                            <th className="sort" data-sort="view_invoice">View Invoice</th>
                                            <th className="sort" data-sort="send_email">Send Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {Invoices.map((item) => (
                                                <tr key={item.id}>
                                                   
                                                <td className="id" style={{ display: "none" }}>
                                                <Link to="#" className="fw-medium link-primary text-center">#{item.id}</Link>
                                                </td>

                                                <td className="customer_name">{item.customer_name}</td>
                                                
                                                <td className="service_provider_name">{item.service_provider_name}</td>
                                                
                                                <td className="quotation_id">{item.quotation_id}</td>
                                                
                                                
                                                {/* <td className="view_invoice">
                                                <button type = "viewinvoice" className="btn btn-success" id="add-btn"> View Invoice </button>
                                                </td> */}

                                                <td className="view_invoice">
                                                <a href = 'https://invoma.vercel.app/general_1.html' target="_blank"className="btn btn-success" id="add-btn"> View Invoice </a>
                                                </td>
                                                
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <button type = "sendmail" className="btn btn-success" id="add-btn">
                                                             {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Send Mail </ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                        <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customername-field" className="form-label">Name </label>
                            <input type="text" id="customername-field" className="form-control" placeholder="Enter Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input type="email" id="email-field" className="form-control" placeholder="Enter Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username-field" className="form-label">Username</label>
                            <input type="username" id="username-field" className="form-control" placeholder="Enter Username" required />
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
                            <button type="submit" className="btn btn-success" id="add-btn">Submit</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal> Send 
                                                        </button>
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
        </React.Fragment>
    );


};

export default InvoiceDetails;