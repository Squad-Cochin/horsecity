import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from 'react-router-dom';
import { Invoices } from '../../CommonData/Data/Invoices';
import { getInvoice } from '../../helpers/ApiRoutes/authApiRoutes';
import Logo from "../../assets/images/black-logo.png"
import Pdf from "../../CommonData/Pdf/List-of-States-Capitals-and-Chief-Ministers.pdf"
import jsPDF from 'jspdf';


const InvoiceDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [toValue, setToValue] = useState('');
    const [subjectValue, setSubjectValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');

    const [modalInvoiceOpen, setModalInvoiceOpen] = useState(false);


    const handleOpenModal = () => {
        setModalOpen(true);     
    };

    const handleOpenInvoiceModal = () => {
        setModalInvoiceOpen(true);     
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleCloseInvoiceModal = () => {
        setModalInvoiceOpen(false);
    };

    const handleSendMail = () => {
        handleCloseModal();
    };

    // const handleDownloadPdf = () => {
    //     console.log('PDF Downloaded');
    //     handleCloseModal();
    // };

    const handleDownloadPdf = () =>
    {
      console.log('PDF Downloaded');
      const doc = new jsPDF();
      doc.text('Hello, this is a sample PDF!', 10, 10);
      // Save the PDF document
      doc.save('invoice.pdf');
    };
 
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Tables" breadcrumbItem="Invoices" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader></CardHeader>
                                <CardBody>
                                    <div id="List">
                                        <div className="table-responsive table-card mt-3 mb-1">
                                            <table className="table align-middle table-nowrap" id="Table">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="index" data-sort="index">#</th>
                                                        <th className="sort" data-sort="customer_name">Customer Name</th>
                                                        <th className="sort" data-sort="service_provider_name">Service Provider Name</th>
                                                        <th className="sort" data-sort="quotation_id">Quotation Id</th>
                                                        <th className="sort" data-sort="view_invoice">View Invoice</th>
                                                        <th className="sort" data-sort="send_email">Send Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    {Invoices.map((item, index) => (
                                                        <tr key={item.id}>
                                                                  <th scope="row">
                                                        {index + 1}

                                                        </th>
                                                            <td className="customer_name">{item.customer_name}</td>
                                                            <td className="service_provider_name">{item.service_provider_name}</td>
                                                            <td className="quotation_id">{item.quotation_id}</td>
                                                            <td className="view_invoice">
                                                                <button type="button" className="btn btn-success" id="add-btn" onClick={handleOpenInvoiceModal}>
                                                                    View Invoice
                                                                </button>
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
{/* Sample Link */}
{/* https://invoma.vercel.app/general_1.html */}
            {modalInvoiceOpen && (
                <Modal className="extra-width" isOpen={modalInvoiceOpen} toggle={handleCloseInvoiceModal}>
                    <ModalHeader toggle={handleCloseInvoiceModal}>Invoice</ModalHeader>
                    <ModalBody>
                        <div className="tm_container">
                            <div className="tm_invoice_wrap">
                                <div className="tm_invoice tm_style1" id="tm_download_section">
                                    <div className="tm_invoice_in">
                                        <div className="tm_invoice_head tm_align_center tm_mb20">
                                            <div className="tm_invoice_left">
                                                <div className="tm_logo">
                                                    <img src={Logo} alt="Logo" style={{ height: '50px', width: '50px' }} />
                                                </div>
                                            </div>
                                            <div className="tm_invoice_right tm_text_right">
                                                <div className="tm_primary_color tm_f50 tm_text_uppercase tm_font_sixe=50px">
                                                    <font size="6">INVOICE</font>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tm_invoice_info tm_mb20">
                                            <div className="tm_invoice_seperator tm_gray_bg"></div>
                                            <div className="tm_invoice_info_list">
                                                <p className="tm_invoice_number tm_m0">Invoice No: <b className="tm_primary_color">#LL93784</b></p> &nbsp; &nbsp; &nbsp;
                                                <p className="tm_invoice_date tm_m0">Date: <b className="tm_primary_color">01.07.2022</b></p>
                                            </div>
                                        </div>
                                        <div className="tm_invoice_head tm_mb10">
                                            <div className="tm_invoice_section tm_invoice_to">
                                                <p className="tm_mb2"><b className="tm_primary_color">Invoice To:</b></p>
                                                <div>
                                                    <p>Lowell H. Dominguez<br />84 Spilman Street, London<br />United Kingdom<br />lowell@gmail.com</p>
                                                </div>
                                            </div>
                                            <div className="tm_invoice_section tm_pay_to">
                                                <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
                                                <p>Laralink Ltd<br />86-90 Paul Street, Londo<br />England EC2A 4NE<br />demo@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tm_table tm_style1 tm_mb30">
                                        <div className="tm_round_border">
                                            <div className="tm_table_responsive">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th className="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg text-center">Item</th>
                                                            <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Description</th>
                                                            <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg text-center">Price</th>
                                                            <th className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg text-center">Qty</th>
                                                            <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right text-center">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="tm_width_3 text-center">1 </td>
                                                            <td className="tm_width_4 text-center">Vehicle 1, Driver 1</td>
                                                            <td className="tm_width_2 text-center">AED 350</td>
                                                            <td className="tm_width_1 text-center">1</td>
                                                            <td className="tm_width_2 text-center">AED 350</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tm_width_3 text-center">2.</td>
                                                            <td className="tm_width_4 text-center">Vehicle 2, Driver 2</td>
                                                            <td className="tm_width_2 text-center">AED 600</td>
                                                            <td className="tm_width_1 text-center">1</td>
                                                            <td className="tm_width_2 text-center">AED 600</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tm_width_3 text-center">3</td>
                                                            <td className="tm_width_4 text-center">Vehicle 3, Driver 3</td>
                                                            <td className="tm_width_2 text-center">AED 200</td>
                                                            <td className="tm_width_1 text-center">2</td>
                                                            <td className="tm_width_2 text-center">AED 400</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tm_width_3 text-center">4.</td>
                                                            <td className="tm_width_4 text-center">Vehicle 4, Driver 4</td>
                                                            <td className="tm_width_2 text-center">AED 100</td>
                                                            <td className="tm_width_1 text-center">3</td>
                                                            <td className="tm_width_2 text-center">AED 300</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tm_invoice_footer">
                                        <div className="tm_left_footer">
                                            <p className="tm_mb2"><b className="tm_primary_color">Payment info:</b></p>
                                            <p className="tm_m0">Credit Card - 236***********928 <br />Amount: AED 1732</p>
                                        </div>
                                        <div className="tm_right_footer">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtotal</td>
                                                        <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">AED 1650</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Tax <span className="tm_ternary_color">(5%)</span></td>
                                                        <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+ AED 82</td>
                                                    </tr>
                                                    <tr className="tm_border_top tm_border_bottom">
                                                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">Grand Total</td>
                                                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">AED 1732</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={handleCloseInvoiceModal}>Close</Button>
                        {/* <Button color="success" onClick={handleDownloadPdf}>Download</Button> */}
                        <Button color="primary">
                          <a href={Pdf} download style={{ color: 'white', textDecoration: 'none' }}>
                            Download PDF
                          </a>
                        </Button>


                    </ModalFooter>
                </Modal>
            )}

            {modalOpen && (
                <Modal isOpen={modalOpen} toggle={handleCloseModal}>
                    <ModalHeader toggle={handleCloseModal}></ModalHeader>
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
                                value={subjectValue}
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
