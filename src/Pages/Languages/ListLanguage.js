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
// Import Images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import Drivers
import { getLanguages } from '../../helpers/ApiRoutes/authApiRoutes'
const LanguageDeatails = () => {

    const [ modal_list, setmodal_list] = useState(false);
    const [ languages, setLanguges] = useState([])
    const [ add_list, setAdd_list ] = useState(false);
    const [ language, setLanguge] = useState([])
    const [modal_delete, setmodal_delete] = useState(false);


      
 
  
      
      
 

    useEffect(()=>{
    // let TripDeatails = getTripDeatails();
    setLanguges(getLanguages())
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
    function tog_list(param,productId) {
        if(param === 'ADD'){
            setAdd_list(!add_list);
        }
        const data = languages?.find((item)=>item?.id === productId)
        setLanguge([data]);
        setmodal_list(!modal_list);

    }
    const initialValues = {
        name: !add_list ? language[0]?.name : '',
        abbreviation: !add_list ? language[0]?.abbreviation : '',
        file: '',
      };
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
                console.log(values);
                if(add_list){
                    //add new
                    console.log("add new");
                    addNewLanguage(values);
                    setAdd_list(false);
                    setmodal_list(false);
                }else{
                    //update previes one
                    console.log("update previues one ");
                    updateLanguage(values);
                    setAdd_list(false);
                    setmodal_list(false);
                 
                }
    
        }
      });

    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Languages" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Add, Edit & Remove</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="List">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                    <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
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
                                        <table className="table align-middle table-nowrap" id="Table">
                                        <thead className="table-light">
                                            <tr>
                                            <th scope="col" style={{ width: "50px" }}>
                                                <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                                </div>
                                            </th>
                 
                                            <th className="sort" data-sort="name">Name</th>
                                            <th className="sort" data-sort="abbreviation">Abbreviation</th>
                                            <th className="sort" data-sort="status">Status</th>
                                            <th className="sort" data-sort="created_at">Created At</th>
                                            <th className="sort" data-sort="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {languages.map((item) => (
                                            <tr key={item.id}>
                                                <th scope="row">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                </div>
                                                </th>
                                                <td className="id" style={{ display: "none" }}>
                                                <Link to="#" className="fw-medium link-primary">#{item.id}</Link>
                                                </td>
                                                <td className="name">{item.name}</td>
                                                <td className="abbreviation">{item.abbreviation}</td>
                                                <td className="status">
                                                <span className="badge badge-soft-success text-uppercase">{item.status}</span>
                                                </td>
                                                <td className="created_at">{item.created_at}</td>
                                                <td>
                                                <div className="d-flex gap-2">
                                                    <div className="edit">
                                                    <button
                                                        className="btn btn-sm btn-success edit-item-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal" onClick={() => tog_list('EDIT',item.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    </div>
                                                    <div className="remove">
                                                    <button
                                                        className="btn btn-sm btn-danger remove-item-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#deleteRecordModal"
                                                    >
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}  centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ?  'Add language' : 'Edit language' }</ModalHeader>
                <form className="tablelist-form"
                  onSubmit={validation.handleSubmit}>
                    <ModalBody>
                    {language?.map((item, index) => (
                    <div key={index}>
                        {/* <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div> */}

                        <div className="mb-3">
                        <label htmlFor="languagename-field" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name='name'
                            value={validation.values.name || ""}
                            onChange={validation.handleChange}
                            placeholder="Enter  Name"
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="abb-field" className="form-label">Abbreviation</label>
                        <input
                            type="text"
                           name='abbreviation'
                            className="form-control"
                            placeholder="Enter Abbreviation"
                            value={validation.values.abbreviation || ""}
                            onChange={validation.handleChange}
                            required
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="certificateNumber-field" className="form-label">Language File</label>
                        <input
                            type="file"
                            id="certificateNumber-field"
                            name="certification_or_license_img"
                            className="form-control"
                            required
                        />
                        </div>

                </div>
                ))}
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() =>{ setmodal_list(false); setAdd_list(false);}}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ?  'Add language' : 'Update language' }</button>
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

export default LanguageDeatails;
