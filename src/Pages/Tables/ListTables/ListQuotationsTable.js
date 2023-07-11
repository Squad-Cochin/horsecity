import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

import { quotationData } from '../../../CommonData/Data';

import { getQuotationData } from "../../../helpers/ApiRoutes/authApiRoutes";

const ListQuotationsTable = () => 
{

    function toggleStatus(button, quotationID) 
    {
        var currentStatus = button.innerText.trim();
        if (currentStatus === 'ACTIVE') 
        {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');

            // Find the corresponding customer by ID
            const quotation = quotationData.find((q) => q.id === quotationID);
            console.log("Quotation:", quotation);
            if (quotation) 
            {
                console.log('Came here');
                quotation.status = 'INACTIVE';
                console.log("Quotation", quotation);
            }
        }
        else if (currentStatus === 'INACTIVE')
        {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');

            // Find the corresponding customer by ID
            const quotation = quotationData.find((q) => q.id === quotationID);
            if (quotation)
            {
                quotation.status = 'ACTIVE';
            }
        }
    }

    const [modal_list, setmodal_list] = useState(false);
    const [quotaions, setQuotaions] =useState([]);
    const [ add_list, setAdd_list ] = useState(false);
    const [quotaion, setQuotaion] =useState([]);
    function tog_list(param,productId) {
        if(param === 'ADD'){
            setAdd_list(!add_list);
        }
        const data = quotaions?.find((item)=>item?.id === productId)
        setQuotaion([data]);

        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    useEffect(()=>{
        setQuotaions(getQuotationData());
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

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Quotations" />

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
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')}  id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
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
                                                        <th className="sort" data-sort="email">Email</th>
                                                        <th className="sort" data-sort="username">User Name</th>
                                                        <th className="sort" data-sort="contact_no">Contact Number</th>
                                                        <th className="sort" data-sort="id_proof">Id Proof</th>
                                                        <th className="sort" data-sort="enquiry_date">Enquiry Date</th>
                                                        <th className="sort" data-sort="enquiry_update">Enquiry Update</th>
                                                        <th className="sort" data-sort="service_provider">Service Provider</th>
                                                        <th className="sort" data-sort="vehicle_number">Vehicle Number</th>
                                                        <th className="sort" data-sort="vehicle_maker">Maker</th>
                                                        <th className="sort" data-sort="trip_type">Trip Type</th>
                                                        <th className="sort" data-sort="pickup_location">Pickup Location</th>
                                                        <th className="sort" data-sort="pickup_country">Pickup Country</th>
                                                        <th className="sort" data-sort="pickup_date">Pickup Date</th>
                                                        <th className="sort" data-sort="drop_location">Drop Location</th>
                                                        <th className="sort" data-sort="drop_country">Drop Country</th>
                                                        <th className="sort" data-sort="drop_date">Drop Date</th>
                                                        <th className="sort" data-sort="total_horse">Number Of Horse</th>   
                                                        <th className="sort" data-sort="special_requirement">Special Requirement</th>
                                                        <th className="sort" data-sort="additional_service">Additional Service</th>
                                                        <th className="sort" data-sort="transportation_insurance_coverage">Transportation Insurance</th>
                                                        <th className="sort" data-sort="tax_rate">Tax Rate</th>
                                                        <th className="sort" data-sort="tax_amount">Tax Amount</th>
                                                        <th className="sort" data-sort="discount_rate">Discount Rate</th>
                                                        <th className="sort" data-sort="discount_amount">Discount Amount</th>
                                                        <th className="sort" data-sort="final_amount">Final Amount</th>
                                                        <th className="sort" data-sort="quotation_date">Quotation Date</th>
                                                        <th className="sort" data-sort="quotation_updated">Quotation Updated</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                {quotaions.map((item,index) => ( 
                                                    <tr key={index}>
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
                                                        <td className="id_proof">{item.cId_proof}</td>
                                                        <td className="enquiry_date">{item.enquiry_date}</td>
                                                        <td className="enquiry_update">{item.enquiry_updated_date}</td>
                                                        <td className="service_provider">{item.Service_provider}</td>
                                                        <td className="vehicle_number">{item.Vehicle_number}</td>
                                                        <td className="vehicle_maker">{item.sMake}</td>
                                                        <td className="trip_type">{item.trip_type}</td>
                                                        <td className="pickup_location">{item.pickup_location}</td>
                                                        <td className="pickup_country">{item.pickup_country}</td>
                                                        <td className="pickup_date">{item.pickup_date}</td>
                                                        <td className="drop_location">{item.drop_location}</td>
                                                        <td className="drop_country">{item.drop_country}</td>
                                                        <td className="drop_date">{item.drop_date}</td>
                                                        <td className="total_horse text-center">{item.no_of_horse}</td>
                                                        <td className="special_requirement">{item.special_requirement}</td>
                                                        <td className="additional_service">{item.additional_service}</td>
                                                        <td className="transportation_insurance_coverage text-center"><span className="badge badge-soft-success text-uppercase">{item.transportation_insurance_coverage}</span></td>
                                                        <td className="tax_rate text-center">{item.trate}</td>
                                                        <td className="tax_amount text-center">{item.tax_amount}</td>
                                                        <td className="discount_rate text-center">{item.drate}</td>
                                                        <td className="discount_amount text-center">{item.discount_amount}</td>
                                                        <td className="final_amount text-center">{item.final_amount}</td>
                                                        <td className="quotation_date">{item.created_at}</td>
                                                        <td className="quotation_updated">{item.updated_at}</td>
                                                        {/* <td className="status text-center"><span className="badge badge-soft-success text-uppercase">ACTIVE</span></td> */}
                                                        
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
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal"  onClick={() => tog_list('EDIT',item.id)}>Edit</button>
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

                    {/* <Row> */}
                        {/* <Col xl={4}>
                            <Card>
                                
                                <CardBody>
                                    <p className="text-muted">Use data attributes and other custom attributes as keys</p>
                                    <div id="users">
                                        

                                        <SimpleBar style={{ height: "242px" }} className="mx-n3">
                                            <ListGroup className="list mb-0" flush>
                                                <ListGroupItem data-id="1">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link name text-dark">Jonny Stromberg</Link></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="12345">1986</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar1} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                                <ListGroupItem data-id="2">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link name text-dark">Jonas Arnklint</Link></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="23456">1985</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar2} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                                <ListGroupItem data-id="3">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link name text-dark">Martina Elm</Link></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="34567">1986</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar3} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                                <ListGroupItem data-id="4">
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link name text-dark">Gustaf Lindqvist</Link></h5>
                                                            <p className="born timestamp text-muted mb-0" data-timestamp="45678">1983</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar4} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                            </ListGroup>
                                        </SimpleBar>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}

                        {/* <Col xl={4}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Existing List</h4>
                                </CardHeader>

                                <CardBody>
                                    <p className="text-muted">Basic Example with Existing List</p>
                                    <div id="contact-existing-list">
                                        <Row className="mb-2">
                                            <Col>
                                                <div>
                                                    <input className="search form-control" placeholder="Search" />
                                                </div>
                                            </Col>
                                            <Col className="col-auto">
                                                <button className="btn btn-light sort" data-sort="contact-name">
                                                    Sort by name
                                                </button>
                                            </Col>
                                        </Row>

                                        <SimpleBar style={{ height: "242px" }} className="mx-n3">
                                            <ListGroup className="list mb-0" flush>
                                                <ListGroupItem data-id="01">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar1} />
                                                            </div>
                                                        </div>

                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="contact-name fs-14 mb-1"><Link to="#" className="link text-dark">Jonny Stromberg</Link></h5>
                                                            <p className="contact-born text-muted mb-0">New updates for ABC Theme</p>
                                                        </div>

                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="fs-11 text-muted">06 min</div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem data-id="02">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar2} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="contact-name fs-14 mb-1"><Link to="#" className="link text-dark">Jonas Arnklint</Link></h5>
                                                            <p className="contact-born text-muted mb-0">Bug Report - abc theme</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="fs-12 text-muted">12 min</div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem data-id="03">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar3} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="contact-name fs-14 mb-1"><Link to="#" className="link text-dark">Martina Elm</Link></h5>
                                                            <p className="contact-born text-muted mb-0">Nice to meet you</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="fs-12 text-muted">28 min</div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                                <ListGroupItem data-id="04">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar4} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="contact-name fs-13 mb-1"><Link to="#" className="link text-dark">Gustaf Lindqvist</Link></h5>
                                                            <p className="contact-born text-muted mb-0">I've finished it! See you so</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div className="fs-12 text-muted">01 hrs</div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            </ListGroup>
                                        </SimpleBar>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}

                        {/* <Col xl={4}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Fuzzy Search</h4>
                                </CardHeader>
                                <CardBody>
                                    <p className="text-muted">Example of how to use the fuzzy search plugin</p>
                                    <div id="fuzzysearch-list">
                                        <input type="text" className="fuzzy-search form-control mb-2" placeholder="Search" />

                                        <SimpleBar style={{ height: "242px" }}>
                                            <ul className="list mb-0">
                                                <li><p className="name">Guybrush Threepwood</p></li>
                                                <li><p className="name">Elaine Marley</p></li>
                                                <li><p className="name">LeChuck</p></li>
                                                <li><p className="name">Stan</p></li>
                                                <li><p className="name">Voodoo Lady</p></li>
                                                <li><p className="name">Herman Toothrot</p></li>
                                                <li><p className="name">Meathook</p></li>
                                                <li><p className="name">Carla</p></li>
                                                <li><p className="name">Otis</p></li>
                                                <li><p className="name">Rapp Scallion</p></li>
                                                <li><p className="name">Rum Rogers Sr.</p></li>
                                                <li><p className="name">Men of Low Moral Fiber</p></li>
                                                <li><p className="name">Murray</p></li>
                                                <li><p className="name">Cannibals</p></li>
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col> */}
                    {/* </Row> */}

                    {/* <Row>
                        <Col xl={4}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Pagination</h4>
                                </CardHeader>

                                <CardBody>
                                    <p className="text-muted">Example of how to use the pagination plugin</p>

                                    <div id="pagination-list">
                                        <div className="mb-2">
                                            <input className="search form-control" placeholder="Search" />
                                        </div>

                                        <div className="mx-n3">
                                            <ListGroup className="list mb-0" flush>
                                                <ListGroupItem>
                                                    
                                                </ListGroupItem>

                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center pagi-list">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar2} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link text-dark">Jonas Arnklint</Link></h5>
                                                            <p className="born fs-12 timestamp text-muted mb-0">Backend Developer</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div>
                                                                <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center pagi-list">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar3} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link text-dark">Martina Elm</Link></h5>
                                                            <p className="born fs-12 timestamp text-muted mb-0">UI/UX Designer</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div>
                                                                <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                                <ListGroupItem>
                                                    <div className="d-flex align-items-center pagi-list">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                <img className="avatar-xs rounded-circle" alt="" src={avatar4} />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-14 mb-1"><Link to="#" className="link text-dark">Gustaf Lindqvist</Link></h5>
                                                            <p className="born fs-12 timestamp text-muted mb-0">Full Stack Developer</p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div>
                                                                <button type="button" className="btn btn-sm btn-light"><i className="ri-mail-line align-bottom"></i> Message</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>

                                              

                                               
                                            </ListGroup>

                                            <div className="d-flex justify-content-center">
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
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row> */}
                </Container>
            </div>

            {/* Add Modal */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ?  'Add Quotation' : 'Edit Quotation' }</ModalHeader>
                <form className="tablelist-form">
                <ModalBody>
  {quotaion?.map((item, index) => (
    <div key={index}>
      <div className="mb-3">
        <label htmlFor="username-field" className="form-label">User Name</label>
        <input type="username" id="username-field" className="form-control" defaultValue={!add_list ? item?.cName : ''} placeholder="Enter User Name" required />
      </div>

      <div className="mb-3">
        <label htmlFor="email-field" className="form-label">Email</label>
        <input type="email" id="email-field" className="form-control" defaultValue={!add_list ? item?.cEmail : ''} placeholder="Enter Email" required />
      </div>

      <div className="mb-3">
        <label htmlFor="contact_no-field" className="form-label">Contact Number</label>
        <input type="text" id="contact_no-field" className="form-control" defaultValue={!add_list ? item?.cPhone : ''} placeholder="Enter Contact Number" required />
      </div>

      <div className="mb-3">
        <label htmlFor="startLocation" className="form-label">Start Location</label>
        <input type="text" id="startLocation" className="form-control" defaultValue={!add_list ? item?.pickup_location : ''} placeholder="Enter Start Location" required />
      </div>

      <div className="mb-3">
        <label htmlFor="endLocation" className="form-label">End Location</label>
        <input type="text" id="endLocation" className="form-control" defaultValue={!add_list ? item?.drop_location : ''} placeholder="Enter End Location" required />
      </div>

      <div className="mb-3">
        <label htmlFor="pickup_date-field" className="form-label">Pick-up Date</label>
        <Flatpickr
          className="form-control"
          options={{
            dateFormat: "d M, Y"
          }}
          defaultValue={!add_list ? item?.pickup_date : ''}
          placeholder="Select Pick-up Date"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contact_number_verified-field" className="form-label">Quotation Status</label>
        <select className="form-control" data-trigger name="contact_number_verified-field" id="contact_number_verified-field">
          <option value="">Status</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>
      </div>
    </div>
  ))}
</ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setmodal_list(false); setAdd_list(false);}}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Add Quotation</button>
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

export default ListQuotationsTable;