



import React, { useState, useEffect, useRef  } from 'react';
import { useFormik , Field} from "formik";
import jsPDF from 'jspdf';
import List from "list.js";
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Logo from "../../assets/images/black-logo.png";
import { Invoices } from '../../CommonData/Data/Invoices';
// import { getInvoice, getLedgerData } from '../../helpers/ApiRoutes/authApiRoutes';
import { getLedgerData } from '../../helpers/ApiRoutes/authApiRoutes';
import html2canvas from 'html2canvas';
import config from '../../config';
/**IMPORTED APIs */


import { getInvoicesData, getSingleInvoiceData, getAssignedProviders, getLatestPayementHistroy } from '../../helpers/ApiRoutes/getApiRoutes'; 
import { addAmount } from '../../helpers/ApiRoutes/addApiRoutes';
const InvoiceDetails = () =>
{
    const [ ledger, setLedger] = useState([])
    const [ ledg, setLedg] = useState([]);
    const [ paymentHistroy, setPaymentHistroy] = useState([]);
    const [modal_list, setmodal_list] = useState(false);
    const [view_modal, setView_modal] = useState(false);
    const [modal, setModal] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [toValue, setToValue] = useState('');
    const [subjectValue, setSubjectValue] = useState('');
    const [bodyValue, setBodyValue] = useState('');
    const invoiceRef = useRef(null); // Reference to the invoice section for PDF generation
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numberOfData, setNumberOfData ] = useState(0);
    const [ errors, setErrors ] = useState("")
    const pageLimit = config.pageLimit;

    useEffect(() => {
      // setInvoices(getInvoice());
      setLedger(getLedgerData());
      getAllData(1)
      
    }, []);

    const handleOpenModal = () =>{
      setModalOpen(true);     
    };

    const initialValues = {
                        totalInvoiceAmount: "",
                        totalRecievedAmount: "",
                        invoiceId:invoice[0]?.id
                      };

  // const handleOpenInvoiceModal = () =>
  // {
  //   setModalInvoiceOpen(true);     
  // };  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // const handleCloseInvoiceModal = () => 
  // {
  //   setModalInvoiceOpen(false);
  // };
  const handleSendMail = () => 
  {
    handleCloseModal();
  };

  const toggleModal = () => 
  {
    setModal(!modal);
  };

  const validation = useFormik
  ({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: async(values) => {
      setmodal_list(false);
      console.log("valuse",values);
      let addedData = await addAmount(values.invoiceId, values.totalRecievedAmount);
      console.log(addedData);
      console.log("valuse",values);
    },
  });

  const handleDownloadPDF = () =>
  {
    const invoiceSection = invoiceRef.current;  
    if (invoiceSection)
    {
      html2canvas(invoiceSection).then((canvas) =>
      {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice.pdf`);
      });
    }
  };

  async function tog_view(productId)
  {
    console.log("reach1",productId)
    let invoiceData = await getSingleInvoiceData(productId)
    console.log("dd",invoiceData)
    setView_modal(!view_modal)
    setInvoice(invoiceData.invoice)
    setLedg(invoiceData.payment)
    let latestPaymentHistroy = await getLatestPayementHistroy(1)
    console.log("Lates Payment Data:",latestPaymentHistroy)
    setPaymentHistroy(latestPaymentHistroy.invoice)
  }

  // function for get data all drivers data
  async function getAllData(page) {
    let getInvoices = await getInvoicesData(page || 1);
    console.log("Get",getInvoices)
    setInvoices(getInvoices.invoices);
    setPageNumber(page);
    setNumberOfData(getInvoices.totalCount);
}


  useEffect(() =>
  {
    // Existing List
    const existOptionsList =
    {
      valueNames: ["contact-name", "contact-message"],
    };
    new List("contact-existing-list", existOptionsList);
    // Fuzzy Search list
    new List("fuzzysearch-list",
    {
      valueNames: ["name"],
    });
    // pagination list
    new List("pagination-list",
    {
      valueNames: ["pagi-list"],
      page: 3,
      pagination: true,
    });
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Invoices" />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader> {/* <h4 className="card-title mb-0">Add, Edit & Remove</h4> */} </CardHeader>
                  <CardBody>
                    <div id="invoiceList">
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table className="table align-middle table-nowrap" id="Table">
                          <thead className="table-light">
                            <tr>
                              <th className="index" data-sort="index">#</th>
                              <th className="sort" data-sort="invoice_number">Invoice Number</th>
                              <th className="sort" data-sort="quotation_id">Quotation Id</th>
                              <th className="sort" data-sort="customer_name">Customer Name</th>
                              <th className="sort" data-sort="customer_email">Customer Email</th>
                              {/* <th className="sort" data-sort="service_provider_name">Service Provider Name</th> */}
                              <th className="sort" data-sort="view_invoice">View Invoice</th>
                              <th className="sort" data-sort="send_email">Send Email</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {invoices.map((item, index) => (
                              <tr key={index.id}>
                                <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                                {/* <td className="index text-center">{index + 1}</td>  */}
                                <td className="invoice_number">{item.iId}</td>
                                <td className="quotation_id">{item.quotation_id}</td>
                                <td className="customer_name">{item.customer_name}</td>
                                <td className="customer_email">{item.customer_email}</td>
                                {/* <td className="service_provider_name">{item.service_provider_name}</td> */}
                                {/* <td className="quotation_id">{item.quotation_id}</td> */}
                                <td className="view_invoice">
                                  <button type="button" className="btn btn-success" id="add-btn" onClick={() => tog_view(item.id)}> View Invoice </button>
                                </td>
                                <td className="send_email">
                                  <button type="button" className="btn btn-success" id="add-btn" onClick={handleOpenModal}> Send Mail </button>
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
                      {/* <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <Link className="page-item pagination-prev disabled" to="#">Previous</Link>
                            <ul className="pagination listjs-pagination mb-0"></ul>
                          <Link className="page-item pagination-next" to="#">Next</Link> */}
                        {/* </div>
                      </div> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        </Container>
      </div>

      {/* Payment Table */}
      <Modal className="extra-width" isOpen={view_modal} toggle={() => {setView_modal(false);}} centered>
        <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => {setView_modal(false); }} >Invoice</ModalHeader>
        <ModalBody>
          {invoice.map((item, index) => (
            <div key={index} className="tm_container" ref={invoiceRef}>
              {console.log(item)}
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
                          <p className="tm_invoice_number tm_m0">Invoice No: <b className="tm_primary_color">{item.iId}</b></p> &nbsp; &nbsp; &nbsp;
                          <p className="tm_invoice_date tm_m0"> Date: <b className="tm_primary_color">{item.iDate}</b></p>
                        </div>
                      </div>
                      <div className="tm_invoice_head tm_mb10">
                        <div className="tm_invoice_section tm_invoice_to">
                          <p className="tm_mb2"><b className="tm_primary_color">Invoice To:</b></p>
                          <div>
                            <p>{item.customer_name}<br />{item.customerAddress}<br />{item.cusCountry}<br />{item.customer_email}</p>
                          </div>
                        </div>
                        <div className="tm_invoice_section tm_pay_to">
                          <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
                            {/* <p>Laralink Ltd<br />86-90 Paul Street, Londo<br />England EC2A 4NE<br />demo@gmail.com</p> */}
                            <p>{item.companyName}<br />{item.companyAddress}<br />{item.comCountry}<br />{item.com_email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="tm_table tm_style1 tm_mb3">
                      <div className="tm_round_border">
                        <div className="tm_table_responsive">
                          <table>
                            <thead>
                              <tr>
                                {/* <th className="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg text-center">Item</th> */}
                                <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Pick Up Location</th>
                                <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Pick Up Date</th>
                                <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Drop Location</th>
                                <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Drop date</th>
                                <th className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg text-center">Horse</th>
                                <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right text-center">Special Service</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {/* <td className="tm_width_3 text-center">1</td> */}
                                <td className="tm_width_4 text-center">{item.pickup_location}</td>
                                <td className="tm_width_2 text-center">{item.pickup_date}</td>
                                <td className="tm_width_1 text-center">{item.pickup_location}</td>
                                <td className="tm_width_2 text-center">{item.drop_date}</td>
                                <td className="tm_width_2 text-center">{item.no_of_horse}</td>
                                <td className="tm_width_2 text-center">{item.special_requirement}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="tm_invoice_footer">
                      <div className="tm_left_footer">
                        <p className="tm_mb2"><b className="tm_primary_color">{/* Payment info: */}</b></p>
                        <p className="tm_m0">{/* Credit Card - 236***********928  */}<br />{/* Amount: AED 1732 */}</p>
                      </div>
                      <div className="tm_right_footer">
                        <table>
                          <tbody>
                            <tr>
                              <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtotal</td>
                              <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">{item.iSubTotal} AED</td>
                            </tr>
                            <tr>
                              <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Discount <span className="tm_ternary_color">({item.iDiscountRate}%)</span></td>
                              <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">- {item.iDiscountAmount} AED</td>
                            </tr>
                            <tr>
                              <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Tax <span className="tm_ternary_color">({item.iTaxRate}%)</span></td>
                              <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+ {item.iTaxAmount} AED</td>
                            </tr>
                            <tr className="tm_border_top tm_border_bottom">
                              <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">Grand Total</td>
                              <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">{item.iFinalAmount} AED</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Button color="primary"style={{ marginBottom: '1rem' }} onClick={toggleModal}> Enter Amount </Button>
                  {/* <Button color="secondary" style={{ marginBottom: '1rem' }}>Enter Amount</Button>     */}
                    <div className="tm_padd_15_20 no-padding tm_round_border .tm_table_responsive">
                      <p className="tm_mb5"><b className="tm_primary_color"></b></p>
                      {/* <Button color="secondary">Enter Amount</Button> */}
                      {/* <Button color="secondary" style={{ marginBottom: '1rem' }}>Enter Amount</Button> */}
                        <table>
                          <thead>
                            <tr>
                              <th className="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center">#</th>
                              <th className="tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center" style={{ width: '30%' }}>Recieved Money</th>
                              <th className="tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center" style={{ width: '30%' }}>Received Date</th>
                              <th className="tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center" style={{ width: '10%' }}>Remaining Amount</th>
                              {/* <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right text-center">Total</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {ledg.map((item, index) => (
                              <tr key = {index}>
                                <td className="tm_width_3 text-center">{index + 1}</td>
                                {/* <td className="tm_width_4 text-center">Vehicle 1, Driver 1</td> */}
                                <td className="tm_width_2 text-center">{item.received_amount === 0 ? "0 AED" : `${item.received_amount} AED`}</td>
                                <td className="tm_width_1 text-center">{item.received_amount === 0 ? "" : item.received_date}</td>
                                <td className="tm_width_2 text-center">{item.remaining_amount === 0 ? "0 AED" : `${item.remaining_amount} AED`}</td>
                                {/* <td className="tm_width_2 text-center">{item.received_amount} AED</td>
                                <td className="tm_width_1 text-center">{item.received_date}</td>
                                <td className="tm_width_2 text-center">{item.remaining_amount} AED</td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                  {/* <ul className="tm_m0 tm_note_list">
                    <li></li>
                    <li></li>
                  </ul> */}
                </div>  
                {/* <div className="tm_padd_15_20 tm_round_border">
                  <p className="tm_mb5"><b className="tm_primary_color">Terms & Conditions</b></p>
                  <ul className="tm_m0 tm_note_list">
                    <li>All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to Seller within thirty (30) days after delivery of goods to the address stated.</li>
                    <li>Delivery dates are not guaranteed and Seller has no liability for damages that may be incurred due to any delay in shipment of goods hereunder. Taxes are excluded unless otherwise stated.</li>
                  </ul>
                </div> */}
              </div>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
            {/* <Button color="secondary" onClick={handleCloseInvoiceModal}>Close</Button> */}
            <Button color="secondary" onClick={() => { setView_modal(false); }}>Close</Button>
                <Button color="primary" onClick={handleDownloadPDF}>
                {/* <Button color="primary"> */}
                    {/* <a href={Pdf} download style={{ color: 'white', textDecoration: 'none' }}> */}
                        Download PDF
                    {/* </a> */}
                </Button>
        </ModalFooter>

        <Modal className="extra-width" isOpen={modal} toggle={toggleModal}>
        {/* <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered > */}
          {/* <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleModal}>Enter Amount</ModalHeader> */}
          <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleModal}>Enter Amount</ModalHeader>
            <form className="tablelist-form" onSubmit={validation.handleSubmit}>
              <ModalBody>
                {paymentHistroy.map((item, index) => (
                  <div key={index} className="tm_container">
                <div className="mb-3">
                  <label htmlFor="total_amount-field" className="form-label">Total Invoice Amount</label>
                    <input type="text" name='totalInvoiceAmount' className="form-control mb-3" placeholder={item.total_amount} readOnly /> 
                </div>
                <div className="mb-3">
                  <label htmlFor="remaining_amount-field" className="form-label">Total Remaining Amount</label>
                    <input type="text" name='totalRemainingAmount' className="form-control mb-3" placeholder={item.remaining_amount} readOnly /> 
                </div>
                </div>
                ))}
                <div className="mb-3">
                  <label htmlFor="total_amount-field" className="form-label">Received Amount</label>
                  <input type="text" 
                  value={validation.values.totalRecievedAmount || ""}
                  onChange={validation.handleChange}
                  name='totalRecievedAmount' 
                  id = 'total_amount-field' 
                  className="form-control" 
                  placeholder="Enter Received Amount" 
                  required
                  />
                  <input type="hidden" name="invoiceId" value="1" />
                </div>
              </ModalBody>
              <ModalFooter>
              <Button color="primary" type='submit'>Save</Button>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </form>
        
      </Modal>
      </Modal>

      {modalOpen && (
        <Modal isOpen={modalOpen} toggle={handleCloseModal}>
          <ModalHeader toggle={handleCloseModal}>Send Email</ModalHeader>
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