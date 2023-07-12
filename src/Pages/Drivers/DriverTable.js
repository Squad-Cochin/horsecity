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
import { getDriversData } from '../../helpers/ApiRoutes/authApiRoutes'
import { Drivers } from '../../CommonData/Data';
import { addNewDriver } from '../../helpers/ApiRoutes/addApiRoutes';
import { updateDriver } from '../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";
const ListTables = () => {

    function toggleStatus(button, driverID) {
        var currentStatus = button.innerText.trim();

        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');

            // Find the corresponding customer by ID
            const driver = Drivers.find((d) => d.id === driverID);
            console.log("Driver", driver);
            if (driver) {
                console.log('Came here');
                driver.status = 'INACTIVE';
                console.log("Driver", driver);
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');

            // Find the corresponding customer by ID
            const driver = Drivers.find((d) => d.id === driverID);
            if (driver) {
                driver.status = 'ACTIVE';
            }
        }
    }


    const [modal_list, setmodal_list] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState([]);
    const [add_list, setAdd_list] = useState(false);

    function tog_list(param, productId) {
        if (param === 'ADD') {
            setAdd_list(!add_list);
        }
        const data = drivers?.find((item) => item?.id === productId)
        setDriver([data]);
        setmodal_list(!modal_list);

    }

    const initialValues = {
        name: !add_list ? driver[0]?.name : '',
        email: !add_list ? driver[0]?.email : '',
        contact_no: !add_list ? driver[0]?.contact_no : '',
        emergency_contact_no: !add_list ? driver[0]?.emergency_contact_no : '',
        date_of_birth: !add_list ? driver[0]?.date_of_birth : '',
        profile_image: !add_list ? driver[0]?.profile_image : '',
        licence_no: !add_list ? driver[0]?.licence_no : '',
        licence_img: !add_list ? driver[0]?.licence_img : '',
        description: !add_list ? driver[0]?.description : ''
    };

    // Later in your code, when setting the initial state



    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            console.log(values);
            if (add_list) {
                //add new
                console.log("add new");
                addNewDriver(values);
                setAdd_list(false);
                setmodal_list(false);
            } else {
                //update previes one
                console.log("update previues one ");
                updateDriver(values);
                setAdd_list(false);
                setmodal_list(false);

            }

        }
    });

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    useEffect(() => {
        let getDrivers = getDriversData();
        setDrivers(getDrivers)
    }, [])
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
                    <Breadcrumbs title="Tables" breadcrumbItem="Drivers" />

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
                                                    <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Name</th>
                                                        {/* <th className="sort" data-sort="image">Image</th> */}
                                                        <th className="sort" data-sort="email">Email</th>
                                                        <th className="sort" data-sort="phone">Contact Number</th>
                                                        <th className="sort" data-sort="phone">Emergency Contct Number</th>
                                                        <th className="sort" data-sort="date">Date Of Birth </th>
                                                        <th className="sort" data-sort="phone">Licence Number</th>
                                                        {/* <th className="sort" data-sort="licence_img">Licence image  </th> */}
                                                        <th className="sort" data-sort="description ">Description </th>
                                                        <th className="sort" data-sort="date"> Created At</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {drivers.map((item,index) => (


                                                        <tr key={item.id}>
                                                                <th scope="row">
                                                        {index + 1}

                                                        </th>
                                                            <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                            <td className="customer_name">{item.name}</td>
                                                            {/* <td className="email">{item.profile_image}</td> */}
                                                            <td className="phone">{item.email}</td>
                                                            <td className="phone">{item.contact_no}</td>
                                                            <td className="phone">{item.emergency_contact_no}</td>
                                                            <td className="date">{item.date_of_birth}</td>
                                                            <td className="licence_no">{item.licence_no}</td>
                                                            {/* <td className="licence_IMG">{item.licence_img}</td> */}
                                                            <td className="name">{item.description}</td>
                                                            <td className="date">{item.created_at}</td>
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
                                                                        <button className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal" onClick={() => tog_list('EDIT', item.id)}>Edit</button>
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ? 'Add Driver' : 'Edit Driver'} </ModalHeader>
                <form className="tablelist-form"
                 onSubmit={validation.handleSubmit}>
                    <ModalBody>

                        {/* <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="driver-field" className="form-label">Name</label>
                            <input type="text" id="driver-field" className="form-control"  name='name'      value={validation.values.name || ""}
                             onChange={validation.handleChange}  placeholder="Enter Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email-field" className="form-label">Email</label>
                            <input type="email" id="email-field" className="form-control" name='email'   value={validation.values.email || ""}
                             onChange={validation.handleChange}  placeholder="Enter Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contactNumber-field" className="form-label">Contact Number</label>
                            <input type="text" id="contactNumber" className="form-control" name='contact_no'   value={validation.values.contact_no || ""}
                             onChange={validation.handleChange} placeholder="Enter Contact Number" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emergencyContactNumber" className="form-label">Emergency Contact Number</label>
                            <input type="text" id="emergencyContactNumber" className="form-control" name='emergency_contact_no'   value={validation.values.emergency_contact_no || ""}
                             onChange={validation.handleChange} placeholder="Enter Emergency Contact Number" required />
                        </div>
                        
                     <div className="mb-3">
                    <label htmlFor="date_of_birth-field" className="form-label">Date Of Birth</label>
                    <Flatpickr
                        className="form-control"
                        name='date_of_birth'
                        options={{
                        dateFormat: "d M, Y"
                        }}
                        value={validation.values.date_of_birth || ""}
                        onChange={validation.handleChange}
                        placeholder="Select Date"
                    />
                    </div>

                        <div className="mb-3">
                            <label htmlFor="profileImage" className="form-label">Profile Image</label>
                            <input type="file" id="profileImage" className="form-control"   name='profile_image'   
                                // value={validation.values.profile_image || ""}
                                // onChange={validation.handleChange} 
                                placeholder="Ender Profile Image" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="idNumber" className="form-label">Licensce Number</label>
                            <input type="text" id="idNumber" className="form-control"       name='licence_no'   
                                value={validation.values.licence_no || ""}
                                onChange={validation.handleChange} 
                                placeholder="Enter Licensce Number" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="idProofImage" className="form-label">Licensce Image</label>
                            <input type="file" id="idProofImage" className="form-control" name='licence_img' placeholder="Ender Licensce Image" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="idProofImage" className="form-label">Description: </label>
                            <input type="text" id="idProofImage" className="form-control" name='description' placeholder="Enter Discription"      value={validation.values.description || ""}
                                onChange={validation.handleChange}  required />
                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }} >Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add Customer' : 'Update Customer'}</button>
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

export default ListTables;
