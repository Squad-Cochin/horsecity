
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

//Import discounts
import { getDiscounts } from '../../helpers/ApiRoutes/authApiRoutes'
import { addNewDiscounts } from '../../helpers/ApiRoutes/addApiRoutes';
import { updateDiscounts } from '../../helpers/ApiRoutes/editApiRoutes';
import { useFormik } from "formik";
const DiscountsDeatails = () => {

    const [modal_list, setmodal_list] = useState(false);
    const [discounts, setDiscounts] = useState([])
    const [add_list, setAdd_list] = useState(false);
    const [discount, setDiscount] = useState([])

    function toggleStatus(button, discountId) {
        console.log(button, discountId);
        var currentStatus = button.innerText.trim();
        if (currentStatus === 'ACTIVE') {
            button.innerText = 'INACTIVE';
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            // Find the corresponding customer by ID
            const discount = discounts.find((s) => s.id === discountId);
            console.log("Service Provider ", discount);
            if (discount) {
                console.log('Came here');
                discount.status = 'INACTIVE';
                console.log("Service Provider", discount);
            }
        }
        else if (currentStatus === 'INACTIVE') {
            button.innerText = 'ACTIVE';
            button.classList.remove('btn-danger');
            button.classList.add('btn-success');
            // Find the corresponding customer by ID
            const discount = discounts.find((s) => s.id === discountId);
            if (discount) {
                discount.status = 'ACTIVE';
            }
        }
    }


    function tog_list(param, productId) {
        if (param === 'ADD') {
            setAdd_list(!add_list);
        }
        const data = discounts?.find((item) => item?.id === productId)
        setDiscount([data]);
        setmodal_list(!modal_list);


    }
    const initialValues = {
        name: !add_list ? discount[0]?.name : '',
        type: !add_list ? discount[0]?.type : '',
        rate: !add_list ? discount[0]?.rate : '',
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
                addNewDiscounts(values);
                setAdd_list(false);
                setmodal_list(false);
            } else {
                //update previes one
                console.log("update previues one ");
                updateDiscounts(values);
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

        setDiscounts(getDiscounts())
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
                    <Breadcrumbs title="Tables" breadcrumbItem="Discounts" />
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
                                                        <th className="sort" data-sort="name">Name</th>
                                                        <th className="sort" data-sort="type">Type</th>
                                                        <th className="sort" data-sort="abbreviation">Rate</th>
                                                        <th className="sort" data-sort="date">Created At</th>
                                                        <th className="sort" data-sort="status">status</th>
                                                        <th className="sort" data-sort="action">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {discounts.map((item, index) => (
                                                        <tr key={item.id}>

                                                            <th scope="row">   {index + 1} </th>

                                                            <td className="name">{item.name}</td>
                                                            <td className="name">{item.type}</td>
                                                            <td className="abbreviation">{item.rate}</td>


                                                            <td className="created_at">{item.created_at}</td>
                                                            <td>
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
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                              
                                                                    <div className="edit">
                                                                        <button
                                                                            className="btn btn-sm btn-success edit-item-btn"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#showModal"
                                                                            onClick={() => tog_list('EDIT', item.id)}
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }}>{add_list ? 'Add discount' : 'Edit discount'}</ModalHeader>
                <form className="tablelist-form"
                    onSubmit={validation.handleSubmit}>
                    <ModalBody>
                        {/* <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                            <label htmlFor="id-field" className="form-label">ID</label>
                            <input type="text" id="id-field" className="form-control" placeholder="ID" readOnly />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="taxationname-field" className="form-label">Name</label>
                            <input type="text" id="taxationname-field" name='name' className="form-control" placeholder="Enter Name" value={validation.values.name || ""}
                                onChange={validation.handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="discount-type-field" className="form-label">
                                Discount Type
                            </label>
                            <select
                                data-trigger
                                name="type"
                                id="discount-type-field"
                                className="form-control"
                                value={validation.values.type || ""}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="PERCENTAGE">PERCENTAGE</option>
                                <option value="FLAT">FLAT</option>

                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="rate-field" className="form-label">Rate </label>
                            <input type="text" id="rate-field" name='rate' className="form-control" placeholder="Enter Rate" value={validation.values.rate || ""}
                                onChange={validation.handleChange} required />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setmodal_list(false); setAdd_list(false); }}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{add_list ? 'Add discount' : 'Update discount'}</button>
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

export default DiscountsDeatails;