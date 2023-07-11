import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker
import Flatpickr from "react-flatpickr";

import { useFormik } from "formik";

import { updateDiscounts } from '../../helpers/ApiRoutes/authApiRoutes';

// Import Images
// import avatar1 from "../../assets/images/users/avatar-1.jpg";
// import avatar2 from "../../assets/images/users/avatar-2.jpg";
// import avatar3 from "../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../assets/images/users/avatar-4.jpg";
// import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import Drivers
import { getAccounts } from '../../helpers/ApiRoutes/authApiRoutes'
const Accounts = () => {

    const [ modal_list, setmodal_list] = useState(false);
    const [ accounts, setAccounts] = useState([])
    const [account, setAccount] = useState([]);
    function tog_list(q_id) {
        const data = accounts?.find((item)=>item?.quotation_id === q_id)
        setAccount([data]);
        setmodal_list(!modal_list);
    }

    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }

    const initialValues = {
        customer_name: account[0]?.customer_name ,
        service_provider_name: account[0]?.service_provider_name,
        quotation_id: account[0]?.quotation_id ,
        payment_status: account[0]?.payment_status,
        total_amount: account[0]?.total_amount,
        new_payment: '',
      };

      const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
                updateDiscounts(values)
                setmodal_list(false);
        }
      });

    useEffect(()=>{
        setAccounts(getAccounts())
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
                    <Breadcrumbs title="Tables" breadcrumbItem="Accounts" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Edit & Remove</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            {/* <Col className="col-sm-auto">
                                                <div className="d-flex gap-1">
                                                    <Button color="success" className="add-btn" onClick={() => tog_list()} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                    <Button color="soft-danger"
                                                    onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button>
                                                </div>
                                            </Col> */}
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
                                            <th className="sort" data-sort="cName">Customer Name</th>
                                            <th className="sort" data-sort="sName">Service Provider Name</th>
                                            <th className="sort" data-sort="quatationId">Quotation Id</th>
                                            <th className="sort" data-sort="status">Payment Status</th>
                                            <th className="sort" data-sort="totalAmount">Total Amount</th>
                                            <th className="sort" data-sort="paidAmount">Paid Amount</th>
                                            <th className="sort" data-sort="pendingAmount">Pending Amount</th>
                                            <th className="sort" data-sort="created_at">Created At</th>
                                            <th className="sort" data-sort="updated_at">Updated At</th>
                                            <th className="sort" data-sort="action">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list form-check-all">
                                            {accounts.map((item) => (
                                            <tr key={item.id}>
                                                {/* <th scope="row">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                </div>
                                                </th> */}
                                                <td className="cName">{item.customer_name}</td>
                                                <td className="sName">{item.service_provider_name}</td>
                                                <td className="quatationId">{item.quotation_id}</td>
                                                <td className="status">
                                                <span className="badge badge-soft-success text-uppercase">{item.payment_status}</span>
                                                </td>
                                                <td className="totalAmount">{item.total_amount}</td>
                                                <td className="paidAmount">{item.paid_amount}</td>
                                                <td className="pendingAmount">{item.total_amount - item.paid_amount}</td>
                                                <td className="created_at">{item.created_at}</td>
                                                <td className="updated_at">{item.updated_at}</td>

                                                <td>
                                                <div className="d-flex gap-2">
                                                    <div className="edit">
                                                    <button
                                                        className="btn btn-sm btn-success edit-item-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#showModal"
                                                        onClick={() => tog_list(item.quotation_id)}
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
            <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_list(); }}> Edit {validation.values.quotation_id} </ModalHeader>
                <form className="tablelist-form" onSubmit={validation.handleSubmit}>
                <ModalBody>
                {account?.map((item, index) => (
                    <div key={index}>
                    {/* Customer Name */}
                    <div className="mb-3">
                        <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                        <input
                        type="text"
                        name="customer_name"
                        id="customerName-field"
                        className="form-control"
                        value={validation.values.customer_name || ""}
                        onChange={validation.handleChange}
                        readOnly
                        required
                        />
                    </div>

                    {/* Provider Name */}
                    <div className="mb-3">
                        <label htmlFor="providerName-field" className="form-label">Service Provider Name</label>
                        <input
                        type="text"
                        name="service_provider_name"
                        id="providerName-field"
                        className="form-control"
                        value={validation.values.service_provider_name || ""}
                        onChange={validation.handleChange}
                        readOnly
                        required
                        />
                    </div>

                    {/* Total amount */}
                    <div className="mb-3">
                        <label htmlFor="providerName-field" className="form-label">Total Amount</label>
                        <input
                        type="text"
                        name="total_amount"
                        id="providerName-field"
                        className="form-control"
                        value={validation.values.total_amount || ""}
                        onChange={validation.handleChange}
                        readOnly
                        required
                        />
                    </div>

                    {/* new payment */}
                    <div className="mb-3">
                        <label htmlFor="providerName-field" className="form-label">New Payment Amount</label>
                        <input
                        type="number"
                        name="new_payment"
                        id="providerName-field"
                        className="form-control"
                        // value={validation.values.new_payment || ""}
                        onChange={validation.handleChange}
                        required
                        />
                    </div>

                    {/* Continue> adding other fields in a similar pattern */}
                    </div>
                ))}
                </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">Update Accounts</button>
                            {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

        </React.Fragment>
    );
};

export default Accounts;
