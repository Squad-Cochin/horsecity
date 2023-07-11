


import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../../components/Common/Breadcrumb";
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

//Get vehicles data
import { getVehiclesData } from '../../../helpers/ApiRoutes/authApiRoutes'
import { addNewVehicle } from '../../../helpers/ApiRoutes/addApiRoutes';
import { updateVehicle } from '../../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";
// Define the toggleStatus function outside the component
import { Vehicles } from '../../../CommonData/Data';


const ListVehiclesTable = () => {
    const [vehicles, setVehicles] = useState([]);
    const [modal_list, setmodal_list] = useState(false);
    const [add_list, setAdd_list] = useState(false);
    const [vehicle, setVehicle] = useState([]);
    const [modal_delete, setmodal_delete] = useState(false);

    function tog_list(param, productId) {
        if (param === 'ADD') {
            setAdd_list(!add_list);
        }
        const data = vehicles?.find((item) => item?.id === productId)
        setVehicle([data]);
        setmodal_list(!modal_list);

    }
    const initialValues = {
        service_provider: !add_list ? vehicle[0]?.service_provider : '',
        vehicle_number: !add_list ? vehicle[0]?.vehicle_number : '',
        make: !add_list ? vehicle[0]?.make : '',
        models: !add_list ? vehicle[0]?.models : '',
        color: !add_list ? vehicle[0]?.color : '',
        length: !add_list ? vehicle[0]?.length : '',
        breadth: !add_list ? vehicle[0]?.breadth : '',
        height: !add_list ? vehicle[0]?.height : '',
        max_no_of_horse: !add_list ? vehicle[0]?.max_no_of_horse : '',
        air_conditioner: !add_list ? vehicle[0]?.air_conditioner : '',
        temperature_manageable: !add_list ? vehicle[0]?.temp_manageable : '',
        vehicle_image: '',
        vehicle_registration_number: !add_list ? vehicle[0]?.registration_no : '',
        gcc_travel_allowed: !add_list ? vehicle[0]?.gcc_travel_allowed : '',
        insurance_covered: !add_list ? vehicle[0]?.insurance_covered : '',
        insurance_date: !add_list ? vehicle[0]?.insurance_date : '',
        insurance_policy_no: !add_list ? vehicle[0]?.insurance_policy_no : '',
        insurance_policy_provider: !add_list ? vehicle[0]?.insurance_provider : '',
        insurance_expiry_date: !add_list ? vehicle[0]?.insurance_expiration_date : '',
        vehicle_type: !add_list ? vehicle[0]?.vehicle_type : '',
        vehicle_registration_date: !add_list ? vehicle[0]?.vehicle_registration_date : '',
        vehicle_expiration_date: !add_list ? vehicle[0]?.vehicle_expiration_date : '',
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
                addNewVehicle(values);
                setAdd_list(false);
                setmodal_list(false);
            } else {
                //update previes one
                console.log("update previues one ");
                updateVehicle(values);
                setAdd_list(false);
                setmodal_list(false);

            }

        }
    });


    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    useEffect(() => {
        let getvehicles = getVehiclesData();
        setVehicles(getvehicles);
    }, [])


    function toggleStatus(button, vehiclesId) {
        var currentStatus = button.innerText.trim();

        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');

            // Find the corresponding customer by ID
            const vehicle = Vehicles.find((v) => v.id === vehiclesId);
            console.log("Vehicle", vehicle);
            if (vehicle) {
                console.log('Came here');
                vehicle.status = 'INACTIVE';
                console.log("Customer", vehicle);
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');

            // Find the corresponding customer by ID
            const vehicle = Vehicles.find((v) => v.id === vehiclesId);
            if (vehicle) {
                vehicle.status = 'ACTIVE';
            }
        }
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
        //     image: "",
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
                    <Breadcrumbs title="Tables" breadcrumbItem="Vechiles" />

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
                                                        <th className="sort" data-sort="customer_name">Provider</th>
                                                        <th className="sort" data-sort="image">Vehicle Number</th>
                                                        <th className="sort" data-sort="email">Make</th>
                                                        <th className="sort" data-sort="phone">Models</th>
                                                        <th className="sort" data-sort="phone">Color</th>
                                                        <th className="sort" data-sort="date">Length(cm)</th>
                                                        <th className="sort" data-sort="phone">Breadth(cm)</th>
                                                        <th className="sort" data-sort="licence_img">Height(cm)</th>
                                                        <th className="sort" data-sort="description ">Capacity</th>
                                                        <th className="sort" data-sort="date"> Air Conditioner</th>
                                                        <th className="sort" data-sort="date"> Temperature Manageable</th>
                                                        {/* <th className="sort" data-sort="date"> Image</th> */}
                                                        <th className="sort" data-sort="phone">Insurance Cover</th>
                                                        <th className="sort" data-sort="date">Insurance Date</th>
                                                        <th className="sort" data-sort="phone">Registration Number</th>
                                                        <th className="sort" data-sort="licence_img">GCC Travel Allowed </th>
                                                        <th className="sort" data-sort="description ">Insurance Policy Number</th>
                                                        <th className="sort" data-sort="date">Insurance Provider</th>
                                                        <th className="sort" data-sort="description ">Insurance Expiration Date</th>
                                                        <th className="sort" data-sort="date">Safety Certificate Number</th>
                                                        <th className="sort" data-sort="date">Vehicle Type</th>
                                                        <th className="sort" data-sort="description ">Vehicle Registration Date</th>
                                                        <th className="sort" data-sort="date">Vehicle Expiration Date</th>
                                                        <th className="sort" data-sort="date">Created At</th>
                                                        <th className="sort" data-sort="status">Status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {vehicles.map((item) => (


                                                        <tr key={item.id}>
                                                            <th scope="row">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                </div>
                                                            </th>
                                                            <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                            <td className="name">{item.service_provider}</td>
                                                            <td className="vhnumber">{item.vehicle_number}</td>
                                                            <td className="make">{item.make}</td>
                                                            <td className="model">{item.models}</td>
                                                            <td className="color">{item.color}</td>
                                                            <td className="length">{item.length}</td>
                                                            <td className="breadth">{item.breadth}</td>
                                                            <td className="hight">{item.height}</td>
                                                            <td className="capacity">{item.max_no_of_horse}</td>
                                                            <td className="status">{item.air_conditioner}</td>
                                                            <td className="phone">{item.temp_manageable}</td>
                                                            {/* <td className="date">{item.image}</td> */}
                                                            <td className="email">{item.insurance_cover}</td>
                                                            {/* <td className="email">{item.insurance_cover}</td> */}
                                                            <td className="phone">{item.insurance_date}</td>
                                                            <td className="date">{item.registration_no}</td>
                                                            <td className="phone">{item.gcc_travel_allowed}</td>
                                                            <td className="date">{item.insurance_policy_no}</td>
                                                            <td className="date">{item.insurance_provider}</td>
                                                            <td className="phone">{item.insurance_expiration_date}</td>
                                                            <td className="date">{item.safety_certificate}</td>
                                                            <td className="date">{item.vehicle_type}</td>
                                                            <td className="phone">{item.vehicle_registration_date}</td>
                                                            <td className="date">{item.vehicle_expiration_date}</td>
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

                                                    ))
                                                    }

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

                </Container>
            </div>

            {/* Add Modal */}
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}> {add_list ? 'Add Vehicle' : 'Edit Vehicle'} </ModalHeader>
                <form className="tablelist-form"
                onSubmit={validation.handleSubmit}>
                    <ModalBody>
              

                            <div className="mb-3">
                            <label htmlFor="serviceprovider-field" className="form-label">Service Provider</label>
                            <input
                                type="text"
                                id="serviceprovider-field"
                                className="form-control"
                                name='service_provider'
                                value={validation.values.service_provider || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Name"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_number-field" className="form-label">Vehicle Number</label>
                            <input
                                type="text"
                                id="vehicle_number-field"
                                className="form-control"
                                name='vehicle_number'
                                value={validation.values.vehicle_number || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Number"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_company-field" className="form-label">Vehicle Company</label>
                            <input
                                type="text"
                                id="vehicle_company-field"
                                name='make'
                                className="form-control"
                                value={validation.values.make || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Company"
                                required
                            />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="modal-field" className="form-label">Vehicle Model</label>
                            <input
                                type="text"
                                id="modal-field"
                                name='models' // Updated the name attribute to 'models'
                                className="form-control"
                                value={validation.values.models || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Model"
                                required
                            />
                            </div>

                    <div className="mb-3">
                            <label htmlFor="vehicle_color-field" className="form-label">Vehicle Color</label>
                            <input
                                type="text"
                                id="vehicle_color-field"
                                className="form-control"
                                name='color'
                                value={validation.values.color || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Color"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_length-field" className="form-label">Vehicle Length (cm)</label>
                            <input
                                type="text"
                                id="vehicle_length-field"
                                className="form-control"
                                name='length'
                                value={validation.values.length || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Length In (cm)"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_breadth-field" className="form-label">Vehicle Breadth (cm)</label>
                            <input
                                type="text"
                                id="vehicle_breadth-field"
                                className="form-control"
                                name='breadth'
                                value={validation.values.breadth || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Breadth In (cm)"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_height-field" className="form-label">Vehicle Height (cm)</label>
                            <input
                                type="text"
                                id="vehicle_height-field"
                                className="form-control"
                                name='height'
                                value={validation.values.height || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Height in (cm)"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="max_no_of_horses-field" className="form-label">Max No Of Horses</label>
                            <select
                                id="max_no_of_horses-field"
                                className="form-control"
                                name='max_no_of_horse'
                                value={validation.values.max_no_of_horse || ""}
                                onChange={validation.handleChange}
                                required
                            >
                                {Array.from({ length: 10 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                            </div>

                            <div className="mb-3">
  <label className="form-label">Air Conditioner</label>
  <div className="form-check">
    <input
      type="radio"
      id="air_conditioner-yes"
      name="air_conditioner"
      className="form-check-input"
      value="YES"
      checked={validation.values.air_conditioner === 'YES'}
      onChange={validation.handleChange}
      required
    />
    <label htmlFor="air_conditioner-yes" className="form-check-label">YES</label>
  </div>
  <div className="form-check">
    <input
      type="radio"
      id="air_conditioner-no"
      name="air_conditioner"
      className="form-check-input"
      value="NO"
      checked={validation.values.air_conditioner === 'NO'}
      onChange={validation.handleChange}
      required
    />
    <label htmlFor="air_conditioner-no" className="form-check-label">NO</label>
  </div>
</div>


  
  


                            <div className="mb-3">
                            <label className="form-label">Temperature Manageable</label>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="temperature_manageable-yes"
                                name="temperature_manageable"
                                className="form-check-input"
                                value={"YES"}
                                checked = {validation.values.temperature_manageable === 'YES'}
                                onChange={validation.handleChange}
                                required
                                />
                                <label htmlFor="temperature_manageable-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="temperature_manageable-no"
                                name="temperature_manageable"
                                className="form-check-input"
                               
                                value={"NO"}
                                checked = {validation.values.temperature_manageable === 'NO'}
                                onChange={validation.handleChange}
                                required
                                />
                                <label htmlFor="temperature_manageable-no" className="form-check-label">NO</label>
                            </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_image-field" className="form-label">Vehicle Image</label>
                            <input
                                type="file"
                                name='vehicle_image'
                                id="vehicle_image-field"
                                className="form-control"
                                placeholder="Upload Vehicle Image"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_registration_number-field" className="form-label">Vehicle Registration Number</label>
                            <input
                                type="text"
                                id="vehicle_registration_number-field"
                                className="form-control"
                                name='vehicle_registration_number'
                                value={validation.values.vehicle_registration_number || ""}
                                onChange={validation.handleChange}
                                placeholder="Enter Vehicle Registration Number"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label className="form-label">GCC Travel Allowed</label>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="gcc_travel_allowed-yes"
                                name="gcc_travel_allowed"
                                className="form-check-input"
                                value = "YES"
                                checked={validation.values.gcc_travel_allowed == "YES"}
                                onChange={validation.handleChange}
                                required
                                />
                                <label htmlFor="gcc_travel_allowed-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="gcc_travel_allowed-no"
                                name="gcc_travel_allowed"
                                className="form-check-input"
                                value = "NO"
                                checked={validation.values.gcc_travel_allowed === "NO"}
                                onChange={validation.handleChange}
                                required
                                />
                                <label htmlFor="gcc_travel_allowed-no" className="form-check-label">NO</label>
                            </div>
                            </div>

                            <div className="mb-3">
                            <label className="form-label">Insurance Covered</label>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="insurance_covered-yes"
                                name="insurance_covered"
                                className="form-check-input"
                                value = "YES"
                                checked={validation.values.insurance_covered === "YES"}
                                onChange={validation.handleChange}
                                required
                                />
                                <label htmlFor="insurance_covered-yes" className="form-check-label">YES</label>
                            </div>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="insurance_covered-no"
                                name="insurance_covered"
                                value='NO'
                                checked={validation.values.insurance_covered === "NO"}
                                onChange={validation.handleChange}
                                className="form-check-input"
                                required
                                />
                                <label htmlFor="insurance_covered-no" className="form-check-label">NO</label>
                            </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="insurance_date-field" className="form-label">Insurance Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                dateFormat: "d M, Y"
                                }}
                                name='insurance_date'
                                value={validation.values.insurance_date || ""}
                                onChange={validation.handleChange}
                                placeholder="Select Insurance Date"
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="insurance_policy_no-field" className="form-label">Insurance Policy Number</label>
                            <input
                                type="text"
                                id="insurance_policy_no-field"
                                className="form-control"
                                name='insurance_policy_no'
                                value={validation.values.insurance_policy_no || ""}
                                onChange={validation.handleChange}
                               
                                placeholder="Enter Insurance Policy Number"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="insurance_policy_provider-field" className="form-label">Insurance Policy Provider</label>
                            <input
                                type="text"
                                id="insurance_policy_provider-field"
                                className="form-control"
                                name='insurance_policy_provider'
                                value={validation.values.insurance_policy_provider || ""}
                                onChange={validation.handleChange}
                             
                                placeholder="Enter Insurance Policy Provider"
                                required
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="insurance_expiry_date-field" className="form-label">Insurance Expiry Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                dateFormat: "d M, Y"
                                }}
                                name='insurance_expiry_date'
                                value={validation.values.insurance_expiry_date || ""}
                                onChange={validation.handleChange}
                                placeholder="Select Insurance Expiry Date"
                            />
                            </div>

                            <div className="mb-3">
                            <label className="form-label">Vehicle Type</label>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="vehicle_type-private"
                                name="vehicle_type"
                                className="form-check-input"
                                value ="PRIVATE"
                                checked={validation.values.vehicle_type == "PRIVATE"}
                                onChange={validation.handleChange}
                                required
                                />
                                <label htmlFor="vehicle_type-private" className="form-check-label">PRIVATE</label>
                            </div>
                            <div className="form-check">
                                <input
                                type="radio"
                                id="vehicle_type-commercial"
                                name="vehicle_type"
                                className="form-check-input"
                                value ="COMMERCIAL"
                                checked={validation.values.vehicle_type == "COMMERCIAL"}
                                required
                                />
                                <label htmlFor="vehicle_type-commercial" className="form-check-label">COMMERCIAL</label>
                            </div>
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_registration_date-field" className="form-label">Vehicle Registration Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                dateFormat: "d M, Y"
                                }}
                                name='vehicle_registration_date'
                                value={validation.values.vehicle_registration_date || ""}
                                onChange={validation.handleChange}
                                placeholder="Select Vehicle Registration Date"
                            />
                            </div>

                            <div className="mb-3">
                            <label htmlFor="vehicle_expiration_date-field" className="form-label">Vehicle Expiration Date</label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                dateFormat: "d M, Y"
                                }}
                                name='vehicle_expiration_date'
                                value={validation.values.vehicle_expiration_date || ""}
                                onChange={validation.handleChange}
                                placeholder="Select Vehicle Expiration Date"
                            />
                            </div>


                                {/* <div className="mb-3">
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
                        </div> */}
       
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add Vehicle' : 'Update vehicle'}</button>
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

export default ListVehiclesTable;