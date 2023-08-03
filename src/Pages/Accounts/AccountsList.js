import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container,  Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import List from 'list.js';
// Import Flatepicker for using  date pick
import Flatpickr from "react-flatpickr";
/**Using for form validation */
import { useFormik } from "formik";

import { getAccountsData, getSingleAccountsData } from '../../helpers/ApiRoutes/getApiRoutes';
import config from '../../config';

//Import reports
const Accounts  = () => {
    const [ accounts, setAccounts ] = useState([]);
    const [ singleData, setSingleData ] = useState([]);
    const [ view_modal, setView_modal ] = useState(false); /**Using for showing VIEW modal */
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const pageLimit = config.pageLimit;

    useEffect(()=>{
        getAllData(1)
    },[])


    async function getAllData(page) {
        let getAccountsdata = await getAccountsData(page || 1);
        setAccounts(getAccountsdata.accounts);
        setPageNumber(page);
        setNumberOfData(getAccountsdata.totalCount);
    }

    async function tog_view(productId) {
        let singleAccount = await getSingleAccountsData(productId)
        setSingleData(singleAccount?.accounts)
        setView_modal(!view_modal);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Trip Details Reports" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <div id="customerList">
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="customerTable">
                                                <thead className="table-light">
                                                    <tr>
                                                    <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="month">Customer Name</th>
                                                        <th className="sort" data-sort="month">Service Provider Name</th>
                                                        <th className="sort" data-sort="number">Quotation Id</th>
                                                        <th className="sort" data-sort="number">Total Amount</th>
                                                        <th className="sort" data-sort="number">Pending Amount</th>
                                                        <th className="sort" data-sort="number">Status</th>
                                                        <th className="sort" data-sort="number">Payment Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {accounts.map((item, index)=>(
                                                    <tr key={index}> 
                                                        <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                                        <td className="customer_name">{item.customer_name}</td>
                                                        <td className="service_provider_name">{item.service_provider_name}</td>
                                                        <td className="phone">{item.quotation_id}</td>
                                                        <td className="date">{item.total_amount}</td>
                                                        <td className="date">{item.pending_amount}</td>
                                                        <td className="phone">{item.status}</td>
                                                        <td>
                                                            <div className="edit">
                                                                <button
                                                                    className="btn btn-sm btn-success edit-item-btn"
                                                                    onClick={() => tog_view(item.quotation_id)}
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#showModal"
                                                                >
                                                                    View
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                 ))}
                                                
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                {pageNumber > 1 ?
                                                    <Link 
                                                        className="page-item pagination-prev disabled" 
                                                        onClick={()=> getAllData(pageNumber - 1)}
                                                    >
                                                        Previous
                                                    </Link>
                                                : null }
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                {numberOfData > pageLimit * pageNumber ? 
                                                    <Link className="page-item pagination-next" onClick={() => getAllData(pageNumber + 1)}>
                                                        Next
                                                    </Link> 
                                                : null }
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>

            {/****************************  View Modal*************** */}
            <Modal className="extra-width" isOpen={view_modal} toggle={() => { tog_view('view'); }} centered >
                <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { tog_view('view'); setView_modal(false);}}>Payment Details</ModalHeader>
                <form className="tablelist-form">
                    <ModalBody>
                    <div className="table-responsive table-card mt-3 mb-1">
                        <table className="table align-middle table-nowrap" id="paymentTable">
                            <thead className="table-light">
                                <tr>
                                <th className="index" data-sort="index">#</th>
                                    <th className="sort" data-sort="month">Recived Amount</th>
                                    <th className="sort" data-sort="month">Recived Date</th>
                                    <th className="sort" data-sort="number">Pending Amount</th>
                                </tr>
                            </thead>
                            <tbody className="list form-check-all">
                                {singleData.map((item, index)=>(
                                <tr key={index}> 
                                    <th scope="row">{index + 1}</th>
                                    <td className="recived_amount">{item.received_amount}</td>
                                    <td className="recived_date">{item.received_date}</td>
                                    <td className="pending_amount">{item.pending_amount}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => { setView_modal(false); setSingleData([]);}}>Close</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>
        </React.Fragment>
    );
};

export default Accounts ;
