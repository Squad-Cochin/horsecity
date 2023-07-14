// import React, { useState, useEffect, useRef  } from 'react';
// import { useFormik } from "formik";
// import jsPDF from 'jspdf';
// import List from "list.js";
// import Flatpickr from "react-flatpickr";
// import { Link } from 'react-router-dom';
// import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import Logo from "../../assets/images/black-logo.png";
// import { Invoices } from '../../CommonData/Data/Invoices';
// import { getInvoice } from '../../helpers/ApiRoutes/authApiRoutes';
// import html2canvas from 'html2canvas';
// import { Ledger } from '../../CommonData/Data';

// const InvoiceDetails = () =>
// {
//     const [ add_list, setAdd_list ] = useState(false);
//     const [ ledger, setLedger] = useState([])
//     const [modal_list, setmodal_list] = useState(false);
//     const [view_modal, setView_modal] = useState(false);
//     const [modal, setModal] = useState(false);
//     const [invoices, setInvoices] = useState([]);
//     const [invoice, setInvoice] = useState([]);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [toValue, setToValue] = useState('');
//     const [subjectValue, setSubjectValue] = useState('');
//     const [bodyValue, setBodyValue] = useState('');
//     const invoiceRef = useRef(null); // Reference to the invoice section for PDF generation
//     const [modalInvoiceOpen, setModalInvoiceOpen] = useState(false);
//     const [viewInvoiceModalOpen, setViewInvoiceModalOpen] = useState(false);
  
//     const handleOpenModal = () =>
//     {
//       setModalOpen(true);     
//     };

//   const initialValues = 
//   {
//     invoiceNo: "",
//     invoiceDate: "",
//     cusName: "",
//     comName: "",
//     cusStreetAddress: "",
//     comStreetAddress: "",
//     cusCountry: "",
//     comCountry: "",
//     cusEmail: "",
//     comEmail: "",
//     iSubTotal: "",
//     iTaxRate: "",
//     iTaxAmount: "",
//     iDiscountRate: "",
//     iDiscountAmount: "",
//     iFinalAmount: "",
//   };

//   const handleOpenInvoiceModal = () =>
//   {
//     setModalInvoiceOpen(true);     
//   };
  
//   const handleCloseModal = () => 
//   {
//     setModalOpen(false);
//   };

//   const handleCloseInvoiceModal = () => 
//   {
//     setModalInvoiceOpen(false);
//   };

//   const handleSendMail = () => 
//   {
//     handleCloseModal();
//   };

//   const toggleModal = () => 
//   {
//     setModal(!modal);
//   };

//   const validation = useFormik({
//     // enableReinitialize : use this flag when initial values needs to be changed
//     enableReinitialize: true,
//     initialValues,
//     onSubmit: (values) => {
//       console.log(values);
//       setmodal_list(false);
//     },
//   });

//   function toggleStatus(button, invoiceID) {
//     var currentStatus = button.innerText.trim();
//     if (currentStatus === "ACTIVE") {
//       button.innerText = "INACTIVE";
//       button.classList.remove("btn-success");
//       button.classList.add("btn-danger");

//       // Find the corresponding customer by ID
//       const invoice = invoices.find((i) => i.id === invoiceID);
//       console.log("Quotation:", invoice);
//       if (invoice) {
//         console.log("Came here");
//         invoice.status = "INACTIVE";
//       }
//     } else if (currentStatus === "INACTIVE") {
//       button.innerText = "ACTIVE";
//       button.classList.remove("btn-danger");
//       button.classList.add("btn-success");

//       // Find the corresponding customer by ID
//       const invoice = invoices.find((i) => i.id === invoiceID);
//       if (invoice) {
//         invoice.status = "ACTIVE";
//       }
//     }
//   }

//   const handleDownloadPDF = () => {
//     const invoiceSection = invoiceRef.current;
  
//     if (invoiceSection) {
//       html2canvas(invoiceSection).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
  
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save(`invoice.pdf`);
//       });
//     }
//   }; 
  


//   function tog_list() {
//     setmodal_list(!modal_list);
//   }
//   console.log(invoice);
//   //view
//   function tog_view(productId) {
//     const data = Invoices?.find((item) => item?.id == productId);
//     console.log(data);
//     setInvoice([data]);
//     setView_modal(!view_modal);
//   }

//   useEffect(() => {
//     setInvoices(getInvoice());
//     // setLedger(Ledger())

//   }, []);

//   useEffect(() => {
//     // Existing List
//     const existOptionsList = {
//       valueNames: ["contact-name", "contact-message"],
//     };

//     new List("contact-existing-list", existOptionsList);

//     // Fuzzy Search list
//     new List("fuzzysearch-list", {
//       valueNames: ["name"],
//     });

//     // pagination list
//     new List("pagination-list", {
//       valueNames: ["pagi-list"],
//       page: 3,
//       pagination: true,
//     });
//   });

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Breadcrumbs title="Tables" breadcrumbItem="Invoices" />
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <CardHeader>
//                   {/* <h4 className="card-title mb-0">Add, Edit & Remove</h4> */}
//                 </CardHeader>
//                 <CardBody>
//                   <div id="invoiceList">
//                     <div className="table-responsive table-card mt-3 mb-1">
//                       <table className="table align-middle table-nowrap" id="Table">
//                         <thead className="table-light">
//                           <tr>
//                             <th className="index" data-sort="index">#</th>
//                             <th className="sort" data-sort="invoice_number">Invoice Number</th>
//                             <th className="sort" data-sort="quotation_id">Quotation Id</th>
//                             <th className="sort" data-sort="customer_name">Customer Name</th>
//                             <th className="sort" data-sort="customer_email">Customer Email</th>
//                             {/* <th className="sort" data-sort="service_provider_name">Service Provider Name</th> */}
//                             <th className="sort" data-sort="view_invoice">View Invoice</th>
//                             <th className="sort" data-sort="send_email">Send Email</th>
//                           </tr>
//                         </thead>
//                         <tbody className="list form-check-all">
//                           {Invoices.map((item, index) => (
//                             <tr key={item}>
//                               <td className="index text-center">{index + 1}</td> 
//                               <td className="invoice_number">{item.iId}</td>
//                               <td className="quotation_id">{item.quotation_id}</td>
//                               <td className="customer_name">{item.customer_name}</td>
//                               <td className="customer_email">{item.customer_email}</td>
//                               {/* <td className="service_provider_name">{item.service_provider_name}</td> */}
//                               {/* <td className="quotation_id">{item.quotation_id}</td> */}
//                               <td className="view_invoice">
//                                 <button type="button" className="btn btn-success" id="add-btn" onClick={() => tog_view(item.id)}>
//                                   View Invoice
//                                 </button>
//                               </td>
//                               <td className="send_email">
//                                 <button type="button" className="btn btn-success" id="add-btn" onClick={handleOpenModal}>
//                                   Send Mail
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                     <div className="d-flex justify-content-end">
//                       <div className="pagination-wrap hstack gap-2">
//                         <Link className="page-item pagination-prev disabled" to="#">Previous</Link>
//                         <ul className="pagination listjs-pagination mb-0"></ul>
//                         <Link className="page-item pagination-next" to="#">Next</Link>
//                       </div>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <Modal className="extra-width" isOpen={view_modal} toggle={() => {setView_modal(false);}} centered>
//         <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => {setView_modal(false); }} >Invoice</ModalHeader>
//         <ModalBody>
//           {invoice.map((item, index) => (
//             <div key={index} className="tm_container" ref={invoiceRef}>
//               <div className="tm_invoice_wrap">
//                 <div className="tm_invoice tm_style1" id="tm_download_section">
//                   <div className="tm_invoice_in">
//                     <div className="tm_invoice_head tm_align_center tm_mb20">
//                       <div className="tm_invoice_left">
//                         <div className="tm_logo">
//                           <img src={Logo} alt="Logo" style={{ height: '50px', width: '50px' }} />
//                         </div>
//                       </div>
//                       <div className="tm_invoice_right tm_text_right">
//                         <div className="tm_primary_color tm_f50 tm_text_uppercase tm_font_sixe=50px">
//                           <font size="6">INVOICE</font>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="tm_invoice_info tm_mb20">
//                       <div className="tm_invoice_seperator tm_gray_bg"></div>
//                       <div className="tm_invoice_info_list">
//                         <p className="tm_invoice_number tm_m0">Invoice No: <b className="tm_primary_color">{item.iId}</b></p> &nbsp; &nbsp; &nbsp;
//                         <p className="tm_invoice_date tm_m0"> Date: <b className="tm_primary_color">{item.iDate}</b></p>
//                       </div>
//                     </div>
//                     <div className="tm_invoice_head tm_mb10">
//                       <div className="tm_invoice_section tm_invoice_to">
//                         <p className="tm_mb2"><b className="tm_primary_color">Invoice To:</b></p>
//                         <div>
//                           <p>{item.customer_name}<br />{item.customerAddress.Plot_No} {item.customerAddress.Road_Number}, {item.customerAddress.Area}<br />{item.cusCountry}<br />{item.customer_email}</p>
//                         </div>
//                       </div>
//                       <div className="tm_invoice_section tm_pay_to">
//                         <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
//                         {/* <p>Laralink Ltd<br />86-90 Paul Street, Londo<br />England EC2A 4NE<br />demo@gmail.com</p> */}
//                         <p>{item.companName}<br />{item.companyAddress.Plot_No} {item.companyAddress.Road_Number}, {item.companyAddress.Area}<br />{item.comCountry}<br />{item.com_email}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tm_table tm_style1 tm_mb3">
//                     <div className="tm_round_border">
//                       <div className="tm_table_responsive">
//                         <table>
//                           <thead>
//                             <tr>
//                               <th className="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg text-center">Item</th>
//                               <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Description</th>
//                               <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg text-center">Price</th>
//                               <th className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg text-center">Qty</th>
//                               <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right text-center">Total</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td className="tm_width_3 text-center">1</td>
//                               <td className="tm_width_4 text-center">Vehicle 1, Driver 1</td>
//                               <td className="tm_width_2 text-center">350 AED</td>
//                               <td className="tm_width_1 text-center">1</td>
//                               <td className="tm_width_2 text-center">350 AED</td>
//                             </tr>
//                             <tr>
//                               <td className="tm_width_3 text-center">2</td>
//                               <td className="tm_width_4 text-center">Vehicle 2, Driver 2</td>
//                               <td className="tm_width_2 text-center">600 AED</td>
//                               <td className="tm_width_1 text-center">1</td>
//                               <td className="tm_width_2 text-center">600 AED</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tm_invoice_footer">
//                     <div className="tm_left_footer">
//                       <p className="tm_mb2">
//                         <b className="tm_primary_color">
//                           {/* Payment info: */}
//                         </b>
//                       </p>
//                       <p className="tm_m0">
//                         {/* Credit Card - 236***********928  */}
//                         <br />
//                         {/* Amount: AED 1732 */}
//                       </p>
//                     </div>
//                     <div className="tm_right_footer">
//                       <table>
//                         <tbody>
//                           <tr>
//                             <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtotal</td>
//                             <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">{item.iSubTotal} AED</td>
//                           </tr>
//                           <tr>
//                             <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Discount <span className="tm_ternary_color">({item.iDiscountRate}%)</span></td>
//                             <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">- {item.iDiscountAmount} AED</td>
//                           </tr>
//                           <tr>
//                             <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Tax <span className="tm_ternary_color">({item.iTaxRate}%)</span></td>
//                             <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">+ {item.iTaxAmount} AED</td>
//                           </tr>
//                           <tr className="tm_border_top tm_border_bottom">
//                             <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">Grand Total</td>
//                             <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">{item.iFinalAmount} AED</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//                 <Button color="primary"
//                  style={{ marginBottom: '1rem' }} onClick={toggleModal}> Enter Amount </Button>
//                 {/* <Button color="secondary" style={{ marginBottom: '1rem' }}>Enter Amount</Button>     */}
//                 <div className="tm_padd_15_20 no-padding tm_round_border .tm_table_responsive">
//                   <p className="tm_mb5"><b className="tm_primary_color"></b></p>
//                   {/* <Button color="secondary">Enter Amount</Button> */}
//                   {/* <Button color="secondary" style={{ marginBottom: '1rem' }}>Enter Amount</Button> */}
//                   <table>
//                           <thead>
//                             <tr>
//                               <th className="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center">#</th>
//                               <th className="tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center" style={{ width: '30%' }}>Recieved Money</th>
//                               <th className="tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center" style={{ width: '30%' }}>Received Date</th>
//                               <th className="tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center" style={{ width: '10%' }}>Remaining Amount</th>

//                               {/* <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right text-center">Total</th> */}
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <td className="tm_width_3 text-center">1</td>
//                               {/* <td className="tm_width_4 text-center">Vehicle 1, Driver 1</td> */}
//                               <td className="tm_width_2 text-center">300 AED</td>
//                               <td className="tm_width_1 text-center">2023/07/09</td>
//                               <td className="tm_width_2 text-center">1000 AED</td>
//                             </tr>
//                             <tr>
//                               <td className="tm_width_3 text-center">2</td>
//                               {/* <td className="tm_width_4 text-center">Vehicle 2, Driver 2</td> */}
//                               <td className="tm_width_2 text-center">1000 AED</td>
//                               <td className="tm_width_1 text-center">2023/07/14</td>
//                               <td className="tm_width_2 text-center">0 AED</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                   {/* <ul className="tm_m0 tm_note_list">
//                     <li></li>
//                     <li></li>
//                   </ul> */}
//                 </div>  
//                 {/* <div className="tm_padd_15_20 tm_round_border">
//                   <p className="tm_mb5"><b className="tm_primary_color">Terms & Conditions</b></p>
//                   <ul className="tm_m0 tm_note_list">
//                     <li>All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to Seller within thirty (30) days after delivery of goods to the address stated.</li>
//                     <li>Delivery dates are not guaranteed and Seller has no liability for damages that may be incurred due to any delay in shipment of goods hereunder. Taxes are excluded unless otherwise stated.</li>
//                   </ul>
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </ModalBody>
//         <ModalFooter>
//             {/* <Button color="secondary" onClick={handleCloseInvoiceModal}>Close</Button> */}
//             <Button color="secondary" onClick={() => { setView_modal(false); }}>Close</Button>
//                 <Button color="primary" onClick={handleDownloadPDF}>
//                 {/* <Button color="primary"> */}
//                     {/* <a href={Pdf} download style={{ color: 'white', textDecoration: 'none' }}> */}
//                         Download PDF
//                     {/* </a> */}
//                 </Button>
//         </ModalFooter>

//         <Modal className="extra-width" isOpen={modal} toggle={toggleModal}>
//         {/* <Modal className="extra-width" isOpen={modal_list} toggle={() => { tog_list(add_list ? 'ADD' : 'EDIT'); }} centered > */}
//           {/* <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleModal}>Enter Amount</ModalHeader> */}
//           <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={toggleModal}>Enter Amount</ModalHeader>
//             <form className="tablelist-form" onSubmit={validation.handleSubmit}>
//               <ModalBody>
//                 <div className="mb-3">
//                   <label htmlFor="total_amount-field" className="form-label">Total Invoice Amount</label>
//                     <input type="text" className="form-control mb-3" placeholder="1300" /> 
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="total_amount-field" className="form-label">Received Amount</label>
//                   <input type="text" name='totalinvoiceamount' id = 'total_amount-field' className="form-control" placeholder="Enter Received Amount" required/>
//                 </div>
//               </ModalBody>
//             </form>
//         <ModalFooter>
//           <Button color="primary" onClick={toggleModal}>Save</Button>
//           <Button color="secondary" onClick={toggleModal}>Cancel</Button>
//         </ModalFooter>
//       </Modal>

//       </Modal>

//       {modalOpen && (
//         <Modal isOpen={modalOpen} toggle={handleCloseModal}>
//           <ModalHeader toggle={handleCloseModal}>Send Email</ModalHeader>
//           <ModalBody>
//             <div className="form-group">
//               <label htmlFor="to-field">To:</label>
//               <input
//                 type="text"
//                 id="to-field"
//                 className="form-control"
//                 value={toValue}
//                 onChange={(e) => setToValue(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="subject-field">Subject:</label>
//               <input
//                 type="text"
//                 id="subject-field"
//                 className="form-control"
//                 value={subjectValue}
//                 onChange={(e) => setSubjectValue(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="body-field">Body:</label>
//               <textarea
//                 id="body-field"
//                 className="form-control"
//                 rows="5"
//                 value={bodyValue}
//                 onChange={(e) => setBodyValue(e.target.value)}
//               ></textarea>
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="secondary" onClick={handleCloseModal}>Close</Button>
//             <Button color="success" onClick={handleSendMail}>Send</Button>
//           </ModalFooter>
//         </Modal>
//       )}
//     </React.Fragment>
//   );
// };

// export default InvoiceDetails;




import React, { useState, useEffect, useRef  } from 'react';
import { useFormik } from "formik";
import jsPDF from 'jspdf';
import List from "list.js";
import Flatpickr from "react-flatpickr";
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, Row, ModalHeader } from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Logo from "../../assets/images/black-logo.png";
import { Invoices } from '../../CommonData/Data/Invoices';
import { getInvoice, getLedgerData } from '../../helpers/ApiRoutes/authApiRoutes';

import html2canvas from 'html2canvas';
// import { Ledger } from '../../CommonData/Data/ledger';

// console.log(Ledger);


const InvoiceDetails = () =>
{
    const [ add_list, setAdd_list ] = useState(false);
    const [ ledger, setLedger] = useState([])
    const [ ledg, setLedg] = useState([]);
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
    const [modalInvoiceOpen, setModalInvoiceOpen] = useState(false);
    const [viewInvoiceModalOpen, setViewInvoiceModalOpen] = useState(false);

    useEffect(() => {
      setInvoices(getInvoice());
      setLedger(getLedgerData());
    }, []);

    const handleOpenModal = () =>
    {
      setModalOpen(true);     
    };

  const initialValues = 
  {
    invoiceNo: "",
    invoiceDate: "",
    cusName: "",
    comName: "",
    cusStreetAddress: "",
    comStreetAddress: "",
    cusCountry: "",
    comCountry: "",
    cusEmail: "",
    comEmail: "",
    iSubTotal: "",
    iTaxRate: "",
    iTaxAmount: "",
    iDiscountRate: "",
    iDiscountAmount: "",
    iFinalAmount: "",
  };

  const handleOpenInvoiceModal = () =>
  {
    setModalInvoiceOpen(true);     
  };
  
  const handleCloseModal = () => 
  {
    setModalOpen(false);
  };

  const handleCloseInvoiceModal = () => 
  {
    setModalInvoiceOpen(false);
  };

  const handleSendMail = () => 
  {
    handleCloseModal();
  };

  const toggleModal = () => 
  {
    setModal(!modal);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      // console.log(values);
      setmodal_list(false);
    },
  });

  function toggleStatus(button, invoiceID) {
    var currentStatus = button.innerText.trim();
    if (currentStatus === "ACTIVE") {
      button.innerText = "INACTIVE";
      button.classList.remove("btn-success");
      button.classList.add("btn-danger");

      // Find the corresponding customer by ID
      const invoice = invoices.find((i) => i.id === invoiceID);
      // console.log("Quotation:", invoice);
      if (invoice) {
        // console.log("Came here");
        invoice.status = "INACTIVE";
      }
    } else if (currentStatus === "INACTIVE") {
      button.innerText = "ACTIVE";
      button.classList.remove("btn-danger");
      button.classList.add("btn-success");

      // Find the corresponding customer by ID
      const invoice = invoices.find((i) => i.id === invoiceID);
      if (invoice) {
        invoice.status = "ACTIVE";
      }
    }
  }

  const handleDownloadPDF = () => {
    const invoiceSection = invoiceRef.current;
  
    if (invoiceSection) {
      html2canvas(invoiceSection).then((canvas) => {
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


  function tog_list() {
    setmodal_list(!modal_list);
  }


  function tog_view(productId) {
    const data = Invoices?.find((item) => item?.id === productId);
    console.log('Data : ',data.iId);

    const data2 = ledger?.filter((item) => item?.invoiceId === data.iId);
    console.log("dat2",data2);

    setInvoice([data]);
    setLedg(data2);
    setView_modal(!view_modal);
  }


  useEffect(() => {
    // Existing List
    const existOptionsList = {
      valueNames: ["contact-name", "contact-message"],
    };

    new List("contact-existing-list", existOptionsList);

    // Fuzzy Search list
    new List("fuzzysearch-list", {
      valueNames: ["name"],
    });

    // pagination list
    new List("pagination-list", {
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
                <CardHeader>
                  {/* <h4 className="card-title mb-0">Add, Edit & Remove</h4> */}
                </CardHeader>
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
                          {Invoices.map((item, index) => (
                            <tr key={item}>
                              <td className="index text-center">{index + 1}</td> 
                              <td className="invoice_number">{item.iId}</td>
                              <td className="quotation_id">{item.quotation_id}</td>
                              <td className="customer_name">{item.customer_name}</td>
                              <td className="customer_email">{item.customer_email}</td>
                              {/* <td className="service_provider_name">{item.service_provider_name}</td> */}
                              {/* <td className="quotation_id">{item.quotation_id}</td> */}
                              <td className="view_invoice">
                                <button type="button" className="btn btn-success" id="add-btn" onClick={() => tog_view(item.id)}>
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

      {/* Payment Table */}

      <Modal className="extra-width" isOpen={view_modal} toggle={() => {setView_modal(false);}} centered>
        <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => {setView_modal(false); }} >Invoice</ModalHeader>
        <ModalBody>
          {invoice.map((item, index) => (
            <div key={index} className="tm_container" ref={invoiceRef}>
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
                          <p>{item.customer_name}<br />{item.customerAddress.Plot_No} {item.customerAddress.Road_Number}, {item.customerAddress.Area}<br />{item.cusCountry}<br />{item.customer_email}</p>
                        </div>
                      </div>
                      <div className="tm_invoice_section tm_pay_to">
                        <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
                        {/* <p>Laralink Ltd<br />86-90 Paul Street, Londo<br />England EC2A 4NE<br />demo@gmail.com</p> */}
                        <p>{item.companName}<br />{item.companyAddress.Plot_No} {item.companyAddress.Road_Number}, {item.companyAddress.Area}<br />{item.comCountry}<br />{item.com_email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tm_table tm_style1 tm_mb3">
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
                              <td className="tm_width_3 text-center">1</td>
                              <td className="tm_width_4 text-center">Vehicle 1, Driver 1</td>
                              <td className="tm_width_2 text-center">350 AED</td>
                              <td className="tm_width_1 text-center">1</td>
                              <td className="tm_width_2 text-center">350 AED</td>
                            </tr>
                            <tr>
                              <td className="tm_width_3 text-center">2</td>
                              <td className="tm_width_4 text-center">Vehicle 2, Driver 2</td>
                              <td className="tm_width_2 text-center">600 AED</td>
                              <td className="tm_width_1 text-center">1</td>
                              <td className="tm_width_2 text-center">600 AED</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="tm_invoice_footer">
                    <div className="tm_left_footer">
                      <p className="tm_mb2">
                        <b className="tm_primary_color">
                          {/* Payment info: */}
                        </b>
                      </p>
                      <p className="tm_m0">
                        {/* Credit Card - 236***********928  */}
                        <br />
                        {/* Amount: AED 1732 */}
                      </p>
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
                            <tr key = {item}>
                              <td className="tm_width_3 text-center">{index + 1}</td>
                              {/* <td className="tm_width_4 text-center">Vehicle 1, Driver 1</td> */}
                              <td className="tm_width_2 text-center">{item.recievedMoney} AED</td>
                              <td className="tm_width_1 text-center">{item.receivedDate}</td>
                              <td className="tm_width_2 text-center">{item.remainingAmount} AED</td>
                            </tr>
                            // <tr>
                            //   <td className="tm_width_3 text-center">2</td>
                            //   {/* <td className="tm_width_4 text-center">Vehicle 2, Driver 2</td> */}
                            //   <td className="tm_width_2 text-center">1000 AED</td>
                            //   <td className="tm_width_1 text-center">2023/07/14</td>
                            //   <td className="tm_width_2 text-center">0 AED</td>
                            // </tr>
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
                {invoice.map((item, index) => (
                  <div key={index} className="tm_container">
                <div className="mb-3">
                  <label htmlFor="total_amount-field" className="form-label">Total Invoice Amount</label>
                    <input type="text" className="form-control mb-3" placeholder={item.iFinalAmount} readOnly /> 
                </div>
                </div>
                ))}
                <div className="mb-3">
                  <label htmlFor="total_amount-field" className="form-label">Received Amount</label>
                  <input type="text" name='totalinvoiceamount' id = 'total_amount-field' className="form-control" placeholder="Enter Received Amount" required/>
                </div>
              </ModalBody>
            </form>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Save</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
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



