import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

// Import Images
// import avatar1 from "../../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../../assets/images/users/avatar-5.jpg";


const ListCustomerTable = () => {

    const [modal_list, setmodal_list] = useState(false);
    function tog_list() {
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

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
                                                        <th className="sort" data-sort="email">Email</th>
                                                        <th className="sort" data-sort="username">Username</th>
                                                        <th className="sort" data-sort="contact_no">Contact Number</th>
                                                        <th className="sort" data-sort="date_of_birth">Date Of Birth</th>
                                                        <th className="sort" data-sort="id_proof">Id Proof</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="contact_number_verified">Contact Number Verified</th>
                                                        <th className="sort" data-sort="email_verified">Email Verified</th>
                                                        <th className="sort" data-sort="registered_date">Registered Date</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td className="customer_name">Mary Cousar</td>
                                                        <td className="email">marycousar@velzon.com</td>
                                                        <td className="username">marycou1</td>
                                                        <td className="contact_no">580-464-4694</td>
                                                        <td className="date_of_birth">1997-11-06</td>
                                                        <td className="id_proof">1234567895142</td>
                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">ACTIVE</span></td>
                                                        <td className="contact_number_verified"><span className="badge badge-soft-success text-uppercase">TRUE</span></td>
                                                        <td className="email_verified"><span className="badge badge-soft-success text-uppercase">FALSE</span></td>
                                                        <td className="registered_date">2023-07-06 10:21:52</td>
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
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option2" />
                                                            </div>
                                                        </th>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2102</Link></td>
                                                        <td className="customer_name">Jeff Taylor</td>
                                                        <td className="email">jefftaylor@velzon.com</td>
                                                        <td className="username">jefftaylor1</td>
                                                        <td className="contact_no">863-577-5537</td>
                                                        <td className="date_of_birth">1997-11-06</td>
                                                        <td className="id_proof">1234567895142</td>
                                                        <td className="status"><span className="badge badge-soft-success text-uppercase">ACTIVE</span></td>
                                                        <td className="contact_number_verified"><span className="badge badge-soft-success text-uppercase">FALSE</span></td>
                                                        <td className="email_verified"><span className="badge badge-soft-success text-uppercase">TRUE</span></td>
                                                        <td className="registered_date">2023-09-22 10:21:52</td>
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
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Add Customer </ModalHeader>
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
                            <button type="submit" className="btn btn-success" id="add-btn">Add 
                            </button>
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

export default ListCustomerTable;