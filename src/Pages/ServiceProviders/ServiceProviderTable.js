import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';

import { serviceProviders } from '../../CommonData/Data/serviceProvider';
import { addNewProvider } from '../../helpers/ApiRoutes/addApiRoutes';
import { removeProvider } from '../../helpers/ApiRoutes/removeApiRoutes';
import { updateSProvider } from '../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";
// Import Flatepicker
// import Flatpickr from "react-flatpickr";

// Import Images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import get Api
import { getSPAllData } from '../../helpers/ApiRoutes/authApiRoutes'
const ListTables = () => 
{
    const [modal_list, setmodal_list] = useState(false);
    const [view_modal, setView_modal] = useState(false);
    const [ add_list, setAdd_list ] = useState(false);
    const [sproviders, setSproviders] = useState([]);
    const [sprovider, setSprovider] = useState([]);
    const [certificateChanged, setcertificateChanged] = useState(false);
    const [updateImage, setUpdateImage] = useState("")
    const [certificatePreview, setcertificatePreview] = useState(null);

    const handleCertificateLogoChange = (event) => 
    {
      const file = event.target.files[0];
      setUpdateImage(file)
      setcertificatePreview(URL.createObjectURL(file));
    };


    function toggleStatus(button, serviceProviderId)
    {
        var currentStatus = button.innerText.trim();
        if (currentStatus === 'ACTIVE')
        {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            // Find the corresponding customer by ID
            const service_provider = serviceProviders.find((s) => s.id === serviceProviderId);
            console.log("Service Provider ", service_provider);
            if (service_provider)
            {
                console.log('Came here');
                service_provider.status = 'INACTIVE';
                console.log("Service Provider", service_provider);
            }
        }
        else if (currentStatus === 'INACTIVE')
        {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            // Find the corresponding customer by ID
            const service_provider = serviceProviders.find((s) => s.id === serviceProviderId);
            if (service_provider)
            {
                service_provider.status = 'ACTIVE';
            }
        }
    }

    function tog_list(param,productId) {
        if(param === 'ADD'){
            setAdd_list(!add_list);
        }
        const data = sproviders?.find((item)=>item?.id === productId)
        setSprovider([data]);
        setmodal_list(!modal_list);
        setcertificatePreview(null)
    }

    function tog_view(productId) {
        const data = sproviders?.find((item)=>item?.id === productId)
        setSprovider([data]);
        setView_modal(!view_modal);

    }

    function remove_data(id){
        removeProvider(id)
    }
    
    const initialValues = {
        name: !add_list ? sprovider[0]?.name : '',
        email: !add_list ? sprovider[0]?.email : '',
        username: !add_list ? sprovider[0]?.user_name : '',
        role: !add_list ? sprovider[0]?.role_name : '',
        contact_person: !add_list ? sprovider[0]?.contact_person : '',
        contact_no: !add_list ? sprovider[0]?.contact_no : '',
        emergency_contact_no: !add_list ? sprovider[0]?.emergency_contact_no : '',
        contact_address: !add_list ? sprovider[0]?.contact_address : '',
        certification_or_license_no: !add_list ? sprovider[0]?.certification_or_license_no : '',
        certificate_image : !add_list ? sprovider[0]?.certificate_image : '',
      };
      
      // Later in your code, when setting the initial state
  
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            values.certificate_image = updateImage;
            if(add_list){
                //add new
                console.log("add new");
                addNewProvider(values);
                setAdd_list(false);
                setmodal_list(false);
                setcertificatePreview(null);
                initialValues.certificate_image = '';
            }else{
                //update previes one
                console.log("update previues one ");
                console.log(values)
                updateSProvider(values);
                setAdd_list(false);
                setmodal_list(false);
                setcertificatePreview(null);
                initialValues.certificate_image = '';
            }
        }
      });
    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    useEffect(() => {
        let getSPdata = getSPAllData()
        setSproviders(getSPdata);
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


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity()) {
          // Perform form submission logic here
          
          // Update the logo image in the header if certificatePreview is set
          if (certificatePreview) {
            // Assuming you have a function to update the logo image in the header component
            // Replace "updateHeaderLogo" with the actual function name and pass the certificatePreview as a parameter
            // updateHeaderLogo(certificatePreview);
            setcertificateChanged(true);
          }
    
          console.log('Form submitted');
        } else {
          form.reportValidity();
        }
      };

    
    //  const handleProviderNameChange = (e) =>{
    //     console.log(e);
    // }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Service providers" />

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
                                                    {/* <Button color="soft-danger"
                                                    // onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
                                                </div>
                                            </Col>
                                            {/* <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col> */}
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                        {/* <th scope="col" style={{ width: "50px" }}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                            </div>
                                                        </th> */}
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sprovider_name" data-sort="sprovider_name">Name</th>
                                                        <th className="email" data-sort="email">Email</th>
                                                        {/* <th className="sort" data-sort="username">User Name</th> */}
                                                        <th className="username" data-sort="username">Role</th>
                                                        <th className="contactperson" data-sort="contactperson">Contact Person</th>
                                                        {/* <th className="sort" data-sort="idproof">Id Proof</th> */}
                                                        <th className="phone" data-sort="phone">Contact Number</th>
                                                        {/* <th className="sort" data-sort="customer_address">Contact Address</th> */}
                                                        {/* <th className="sort" data-sort="phone">Emergency Contact Number</th> */}
                                                        {/* <th className="sort" data-sort="certification">Certification or license image</th> */}
                                                        {/* <th className="sort" data-sort="license no">License Number</th> */}

                                                        {/* <th className="sort" data-sort="date">Created At</th> */}
                                                        {/* <th className="sort" data-sort="date">Expiry At</th> */}
                                                        <th className="status" data-sort="status">Status</th>
                                                        <th className="action" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {sproviders.map((value, index) => (
                                                        <tr key={value?.id}>
                                                            {/* <th scope="row">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                                </div>
                                                            </th> */}
                                                               <th scope="row">
                                                        {index + 1}

                                                        </th>
                                                            <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                            <td className="name">{value.name}</td>
                                                            <td className="email">{value.email}</td>
                                                            {/* <td className="name">{value.user_name}</td> */}
                                                            <td className="role">{value.role_name}</td>
                                                            <td className="contact_person">{value.contact_person}</td>
                                                            {/* <td className="idproof">{value.id_proof}</td> */}
                                                            <td className="phone">{value.contact_no}</td>
                                                            {/* <td className="address">{value.contact_address}</td> */}
                                                            {/* <td className="emergency_phone">{value.emergency_contact_no}</td> */}
                                                            {/* <td className="lisenceimage">{value.certification_or_license_img}</td> */}
                                                            {/* <td className="licenseno">{value.certification_or_license_no}</td> */}
                                                            {/* <td className="date">{value.created_at}</td> */}
                                                            {/* <td className="date">{value.expiry_at}</td> */}
                                                            {/* <td className="status"><span className="badge badge-soft-success text-uppercase">{value.status}</span></td> */}
                                                            
                                                            <div>
                                                                <div className="d-flex gap-2">
                                                                    <div className="status">
                                                                        <button className="btn btn-sm btn-success status-item-btn"
                                                                            data-bs-toggle="modal" data-bs-target="#showModal"
                                                                            onClick={(event) => toggleStatus(event.target, value.id)}>
                                                                            {value.status}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>  

                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-success edit-item-btn" onClick={() => tog_view(value.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">View</button>
                                                                    </div>
                                                                    <div className="edit">
                                                                        <button className="btn btn-sm btn-primary edit-item-btn" onClick={() => tog_list('EDIT',value.id)}
                                                                            data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                    </div>
                                                                    <div className="remove">
                                                                        <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => remove_data(value.id)} data-bs-toggle="modal" data-bs-target="#deleteRecordModal">Remove</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )}

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
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ?  'Add service provider' : 'Edit service provider' }</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
      
                    <ModalBody>
                {sprovider?.map((item, index) => (
                    <div key={index}>
                    {/* Provider Name */}
                    <div className="mb-3">
                        <label htmlFor="providerName-field" className="form-label">Provider Name</label>
                        <input
                        type="text"
                        name="name"
                        id="providerName-field"
                        className="form-control"
                        value={validation.values.name || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Provider Name"
                        required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">Email</label>
                        <input
                        type="email"
                        name="email"
                        id="email-field"
                        className="form-control"
                        value={validation.values.email || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Email"
                        required
                        />
                    </div>

                    {/* User Name */}
                    <div className="mb-3">
                        <label htmlFor="userName-field" className="form-label">User Name</label>
                        <input
                        type="text"
                        id="userName-field"
                        name="username"
                        className="form-control"
                        value={validation.values.username || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter User Name"
                        required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label htmlFor="status-field" className="form-label">Role</label>
                        <select
                        className="form-control"
                        data-trigger
                        name="role"
                        id="status-field"
                        value={validation.values.role || ""}
                        onChange={validation.handleChange}
                        >
                        {!add_list ? (
                            <>
                            <option value="service provider">{item?.role_name}</option>
                            <option value="super admin">super admin</option>
                            </>
                        ) : (
                            <>
                            <option value="">Select role</option>
                            <option value="service provider">service provider</option>
                            <option value="super admin">super admin</option>
                            </>
                        )}
                        </select>
                    </div>

                    {/* Contact Person */}
                    <div className="mb-3">
                        <label htmlFor="contactPerson-field" className="form-label">Contact Person</label>
                        <input
                        type="text"
                        id="contactPerson-field"
                        className="form-control"
                        name="contact_person"
                        value={validation.values.contact_person || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Person Name"
                        required
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">Contact Number</label>
                        <input
                        type="text"
                        id="phone-field"
                        className="form-control"
                        name="contact_no"
                        value={validation.values.contact_no || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Phone No."
                        required
                        />
                    </div>

                    {/* Emergency Contact Number */}
                    <div className="mb-3">
                        <label htmlFor="emergencyPhone-field" className="form-label">Emergency Contact Number</label>
                        <input
                        type="text"
                        id="emergencyPhone-field"
                        name="emergency_contact_no"
                        className="form-control"
                        value={validation.values.emergency_contact_no || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Emergency Phone No."
                        required
                        />
                    </div>

                    {/* Contact Address */}
                    <div className="mb-3">
                        <label htmlFor="contactAddress-field" className="form-label">Contact Address</label>
                        <input
                        type="text"
                        id="contactAddress-field"
                        name="contact_address"
                        className="form-control"
                        value={validation.values.contact_address || ""}
                        onChange={validation.handleChange}
                        placeholder="Enter Contact Address"
                        required
                        />
                    </div>

                    {/* Certificate Number */}
                    <div className="mb-3">
                        <label htmlFor="certificateNumber-field" className="form-label">Certificate Number</label>
                        <input
                        type="text"
                        id="certificateNumber-field"
                        name="certification_or_license_no"
                        value={validation.values.certification_or_license_no || ""}
                        onChange={validation.handleChange}
                        className="form-control"
                        placeholder="Enter Certificate Number"
                        required
                        />
                    </div>

                    {/* Certificate Image */}
                    <div className="mb-3">
                        <label htmlFor="certificateNumber-field" className="form-label">Certificate Image</label>
                        <div className="col-md-10">
                            {certificatePreview && (
                              <div>
                                <h5>Certificate Image Preview:</h5>
                                <img src={certificatePreview} alt="Certificate Image Preview" style={{ maxWidth: '100px' }} />
                              </div>
                            )}
                            {!certificateChanged && (
                              <input
                                className="form-control"
                                name="certification_or_license_img"
                                type="file"
                                placeholder="Certificate Image"
                                onChange={handleCertificateLogoChange}
                              />
                            )}
                          </div>
                        
                        
                        {/* <input
                        type="file"
                        id="certificateNumber-field"
                        name="certification_or_license_img"
                        className="form-control"
                        placeholder="Upload Certificate image"
                        required
                        /> */}
                    </div>

                    {/* Continue> adding other fields in a similar pattern */}
                    </div>
                ))}
                </ModalBody>

                      
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setmodal_list(false); setAdd_list(false); setcertificatePreview(null)}}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ?  'Add service provider' : 'Update service provider' }</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* View Modal */}
            <Modal className="extra-width" isOpen={view_modal} centered >
            <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_view('view'); }}>View service provider</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                {sprovider?.map((item, index) => (
                    <div key={index}>
                    {/* Provider Name */}
                    <div className="mb-3">
                        <label htmlFor="providerName-field" className="form-label">Provider Name</label>
                        <input
                        type="text"
                        name="name"
                        id="providerName-field"
                        className="form-control"
                        value={validation.values.name || ""}
                        readOnly
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email-field" className="form-label">Email</label>
                        <input
                        type="email"
                        name="email"
                        id="email-field"
                        className="form-control"
                        value={validation.values.email || ""}
                        readOnly
                        />
                    </div>

                    {/* User Name */}
                    <div className="mb-3">
                        <label htmlFor="userName-field" className="form-label">User Name</label>
                        <input
                        type="text"
                        id="userName-field"
                        name="username"
                        className="form-control"
                        value={validation.values.username || ""}
                        readOnly
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label htmlFor="role-field" className="form-label">Role</label>
                        <input
                        type="text"
                        id="role-field"
                        name="role"
                        className="form-control"
                        value={validation.values.role || ""}
                        readOnly
                        />
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="status-field" className="form-label">Role</label>
                        <select
                        className="form-control"
                        data-trigger
                        name="role"
                        id="status-field"
                        value={validation.values.role || ""}
                        readOnly
                        >
                        {!add_list ? (
                            <>
                            <option value="service provider">{item?.role_name}</option>
                            <option value="super admin">super admin</option>
                            </>
                        ) : (
                            <>
                            <option value="">Select role</option>
                            <option value="service provider">service provider</option>
                            <option value="super admin">super admin</option>
                            </>
                        )}
                        </select> */}
                    {/* </div> */}

                    {/* Contact Person */}
                    <div className="mb-3">
                        <label htmlFor="contactPerson-field" className="form-label">Contact Person</label>
                        <input
                        type="text"
                        id="contactPerson-field"
                        className="form-control"
                        name="contact_person"
                        value={validation.values.contact_person || ""}
                        readOnly
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="mb-3">
                        <label htmlFor="phone-field" className="form-label">Contact Number</label>
                        <input
                        type="text"
                        id="phone-field"
                        className="form-control"
                        name="contact_no"
                        value={validation.values.contact_no || ""}
                        readOnly
                        />
                    </div>

                    {/* Emergency Contact Number */}
                    <div className="mb-3">
                        <label htmlFor="emergencyPhone-field" className="form-label">Emergency Contact Number</label>
                        <input
                        type="text"
                        id="emergencyPhone-field"
                        name="emergency_contact_no"
                        className="form-control"
                        value={validation.values.emergency_contact_no || ""}
                        readOnly
                        />
                    </div>

                    {/* Contact Address */}
                    <div className="mb-3">
                        <label htmlFor="contactAddress-field" className="form-label">Contact Address</label>
                        <input
                        type="text"
                        id="contactAddress-field"
                        name="contact_address"
                        className="form-control"
                        value={validation.values.contact_address || ""}
                        readOnly
                        />
                    </div>

                    {/* Certificate Number */}
                    <div className="mb-3">
                        <label htmlFor="certificateNumber-field" className="form-label">Licensce Number</label>
                        <input
                        type="text"
                        id="certificateNumber-field"
                        name="certification_or_license_no"
                        className="form-control"
                        value={validation.values.certification_or_license_no || ""}
                        readOnly
                        />
                    </div>

                    {/* certificate image */}
                    <div className="mb-3">
                        <label htmlFor="certificateImage-field" className="form-label">Licensce Image</label>
                        <div>
                            <img src={validation.values.certificate_image || ""} alt="License Image" style={{ maxWidth: '100px' }} />
                        </div>
                    </div>

                    {/* Certificate Image */}
                    {/* <div className="mb-3">
                        <label htmlFor="certificateNumber-field" className="form-label">Certificate Image</label>
                        <div className="col-md-10">
                            {certificatePreview && (
                              <div>
                                <h5>Menu Logo Preview:</h5>
                                <img src={certificatePreview} alt="Menu Logo Preview" style={{ maxWidth: '100px' }} />
                              </div>
                            )}
                            {!certificateChanged && (
                              <input
                                className="form-control"
                                type="file"
                                placeholder="Upload Menu Logo Image"
                                onChange={handleCertificateLogoChange}
                                required
                              />
                            )}
                          </div>
                        
                        
                        <input
                        type="file"
                        id="certificateNumber-field"
                        name="certification_or_license_img"
                        className="form-control"
                        // value={validation.values.certification_or_license_img || ""}
                        // onChange={validation.handleChange}
                        placeholder="Upload Certificate image"
                        required
                        />
                    </div> */}

                    {/* Continue> adding other fields in a similar pattern */}
                    </div>
                ))}
                </ModalBody>

                      
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setView_modal(false);}}>Close</button>
                            {/* <button type="submit" className="btn btn-success" id="add-btn">{add_list ?  'Add service provider' : 'Update service provider' }</button> */}
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
