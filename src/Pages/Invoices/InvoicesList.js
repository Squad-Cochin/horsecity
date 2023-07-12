import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import List from 'list.js';
import { Invoices } from '../../CommonData/Data/Invoices';
import { getInvoice } from '../../helpers/ApiRoutes/authApiRoutes';

const InvoiceDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [toValue, setToValue] = useState('');
    const [subjectValue, setSubjectValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');

    const handleOpenModal = () => {
        setModalOpen(true);     
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSendMail = () => {
        // Perform the necessary logic for sending the mail using the "toValue", "subjectValue", and "bodyValue"
        // After sending the mail, close the modal
        handleCloseModal();
    };

    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        setInvoices(getInvoice())
    }, [])

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
    }, []);

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
                                                            <td className="customer_name">{item.customer_name}</td>
                                                            <td className="service_provider_name">{item.service_provider_name}</td>
                                                            <td className="quotation_id">{item.quotation_id}</td>
                                                            <td className="view_invoice">
                                                                <a href={item.link} target="_blank" className="btn btn-success" id="add-btn">View Invoice</a>
                                                            </td>

                                                            <td className="send_email">
                                                                <button type="button" className="btn btn-success" id="add-btn" onClick={handleOpenModal}>
                                                                    Send Mail
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">Previous</Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">Next</Link>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {modalOpen && (
                <Modal isOpen={modalOpen} toggle={handleCloseModal}>
                    <ModalHeader toggle={handleCloseModal}>Send Mail</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="to-field">To:</label>
                            <input
                                type="text"
                                id="to-field"
                                className="form-control"
                                value={toValue}
                                onChange={(e) => setToValue(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject-field">Subject:</label>
                            <input
                                type="text"
                                id="subject-field"
                                className="form-control"
                                value={invoices.email}
                                onChange={(e) => setSubjectValue(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body-field">Body:</label>
                            <textarea
                                id="body-field"
                                className="form-control"
                                rows="5"
                                value={bodyValue}
                                onChange={(e) => setBodyValue(e.target.value)}
                            ></textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleCloseModal}>Close</Button>
                        <Button color="success" onClick={handleSendMail}>Send</Button>
                    </ModalFooter>
                </Modal>
            )}
        </React.Fragment>
    );
};

export default InvoiceDetails;