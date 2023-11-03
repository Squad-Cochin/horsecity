////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       invoice page functionality done over here.                           //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef } from "react";
import List from "list.js";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
} from "reactstrap";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
/**IMPORTED*/
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Logo from "../../assets/images/black-logo.png";
import html2pdf from "html2pdf.js"; // Make sure to include the library properly
import withRouter from "../../components/Common/withRouter";
import config from "../../config";
import {
  getInvoicesData,
  getSingleInvoiceData,
  getLatestPayementHistroy,
  getSendEmailButtonData,
  startTrip,
  cancelTrip,
} from "../../helpers/ApiRoutes/getApiRoutes";
import { addAmount, sendEmail } from "../../helpers/ApiRoutes/addApiRoutes";

const ListInvoiceDetails = (props) => {
  const [ledg, setLedg] = useState([]);
  const [isActiveTwo, setActiveTwo] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [paymentHistroy, setPaymentHistroy] = useState([]);
  const [sendEmailButtonData, setsendEmailButtonData] = useState([]);
  const [view_modal, setView_modal] = useState(false);
  const [modal, setModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [errors, setErrors] = useState("");
  const [showEnterAmountModal, setShowEnterAmountModal] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [startedTrips, setStartedTrips] = useState([]);
  const [cancelledTrip, setCancelledTrip] = useState([]);
  const [userId, setUserId] = useState("");
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const invoiceRef = useRef(null); // Reference to the invoice section for PDF generation
  const pageLimit = config.pageLimit;
  const [isActive, setActive] = useState(false);
  const [searchInp, setSearchInp] = useState("");
  // THIS HOOK RENDERING INITIAL TIME
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    const data = JSON.parse(localStorage.getItem("authUser"));
    let user_Id = data[0]?.user[0]?.id;
    setUserId(user_Id);
    getAllData(1);
  }, [userId]);

  const handleOpenModal = async (productId) => {
    let sendEmailbuttondata = await getSendEmailButtonData(productId);
    setsendEmailButtonData(sendEmailbuttondata);
    setModalEmailOpen(true);
  };

  const toggleEnterAmountModal = () => {
    setShowEnterAmountModal(!showEnterAmountModal);
  };

  const initialValues = {
    totalInvoiceAmount: "",
    totalRecievedAmount: "",
    invoiceId: invoice[0]?.id,
    recepientEmail: sendEmailButtonData[0]?.email,
    invoiceSubject: `${sendEmailButtonData[0]?.subject} - ${sendEmailButtonData[0]?.invoice_no}`,
    invoiceBody: sendEmailButtonData[0]?.template,
  };
  const handleCloseModal = () => {
    setModalEmailOpen(false);
    setErrors("");
  };
  const toggleModal = () => {
    setModal(!modal);
    setModalOpen2(!modalOpen2);
    setErrors("");
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      if (modal) {
        setActiveTwo(true);

        let addedData = await addAmount(
          values.invoiceId,
          values.totalRecievedAmount
        );
        if (addedData.code === 200) {
          setErrors("");
          getAllData(pageNumber);
          setModal(!modal);
          setActiveTwo(false);
          modalClose(values.invoiceId);
          values.totalRecievedAmount = "";
        } else {
          setErrors("");
          setActiveTwo(false);
          setErrors(addedData.message);
        }
      }
      if (modalEmailOpen) {
        setActive(true);
        let email = await sendEmail(
          sendEmailButtonData[0]?.id,
          values.recepientEmail,
          values.invoiceSubject
        );
        if (email.code === 200) {
          setActive(false);
          setErrors("");
          setModalEmailOpen(false);
          getAllData(pageNumber);
        } else {
          setActive(false);
          setErrors("");
          setErrors(email.message);
        }
      }
    },
  });

  async function modalClose(productId) {
    let invoiceData = await getSingleInvoiceData(productId);
    setView_modal(!view_modal);
    setInvoice(invoiceData.invoice);
    setLedg(invoiceData.payment);
    setVehicles(invoiceData.vehicles);
  }

  const handleDownloadPDF = () => {
    const invoiceSection = invoiceRef.current;
    if (invoiceSection) {
      setDownloadingPDF(true);
      const opt = {
        margin: 5,
        filename: "invoice.pdf",
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "px", format: "a4", orientation: "portrait" },
      };

      const customWidth = 800; // Width in pixels
      const customHeight = 1000; // Height in pixels
      opt.jsPDF.unit = "px";
      opt.jsPDF.format = [customWidth, customHeight]; // Set the custom width and height
      html2pdf()
        .from(invoiceSection)
        .set(opt)
        .save()
        .then(() => {
          setDownloadingPDF(false);
          toggleEnterAmountModal();
        });
    }
  };

  const handleStartTrip = async (tripId) => {
    const tripButton = await startTrip(tripId);
    if (tripButton.code === 200) {
      setStartedTrips((prevStartedTrips) => [...prevStartedTrips, tripId]);
    }

    if (tripButton.code === 404) {
      setStartedTrips((prevStartedTrips) => [...prevStartedTrips, tripId]);
    }
  };

  const handleCancelTrip = async (tripId) => {
    const tripButton = await cancelTrip(tripId);
    if (tripButton.code === 200) {
      setCancelledTrip((prevStartedTrips) => [...prevStartedTrips, tripId]);
      await getAllData(pageNumber);
    }

    if (tripButton.code === 404) {
      setCancelledTrip((prevStartedTrips) => [...prevStartedTrips, tripId]);
    }
  };

  const isTripStarted = (tripId) => startedTrips.includes(tripId);
  const isTripActive = (status) => status === "ACTIVE";
  const isTripCancel = (tripId) => cancelledTrip.includes(tripId);

  async function tog_view(productId) {
    let invoiceData = await getSingleInvoiceData(productId);
    setView_modal(!view_modal);
    setInvoice(invoiceData.invoice);
    setLedg(invoiceData.payment);
    setVehicles(invoiceData.vehicles);
    setPaymentHistroy([]);
    let latestPaymentHistroy = await getLatestPayementHistroy(productId);
    setPaymentHistroy(latestPaymentHistroy.invoice);
    setView_modal(!view_modal);
  }

  // function for get data all drivers data

  async function getAllData(page) {
    if (userId) {
      let getInvoices = await getInvoicesData(page || 1, userId);
      setInvoices(getInvoices?.invoices);
      setPageNumber(page);
      setNumberOfData(getInvoices?.totalCount);
    }
  }

  useEffect(() => {
    const existOptionsList = {
      valueNames: ["contact-name", "contact-message"],
    };

    new List("contact-existing-list", existOptionsList);

    new List("fuzzysearch-list", {
      valueNames: ["name"],
    });

    new List("pagination-list", {
      valueNames: ["pagi-list"],
      page: 3,
      pagination: true,
    });
  });

  /**Filter data */
  const filteredInvoice = invoices?.filter(
    (value) =>
      value?.iId
        .toString()
        .toLowerCase()
        .includes(searchInp.toLowerCase().trim()) ||
      value?.quotation_id.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
      value?.customer_name.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
      value?.customer_email.toLowerCase().includes(searchInp.toLowerCase().trim()) 
  );
  
  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  document.title = `${props.t("Invoice")} | ${pageTitle} `;
  return (
    <React.Fragment>
      <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid>
          <Breadcrumbs title={props.t("Tables")} breadcrumbItem={props.t("Invoices")} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="row align-items-md-center">
                    <h4 className="card-title mb-0 col-md-8  p-3"><br/>  <span className="d-block mt-2 fs-16 text-success">{props.t("Total")} {numberOfData}</span></h4>
                    <form className="col-md-4">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={props.t("Search") + "..."}
                            onChange={(e) => setSearchInp(e.target.value)}
                            aria-label="Recipient's username"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="ri-search-line" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardHeader>
                <CardBody>
                  <div id="invoiceList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="Table"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="invoice_number">
                            {props.t("Invoice Number")}
                            </th>
                            <th className="sort" data-sort="quotation_id">
                            {props.t("Quotation Id")}
                            </th>
                            <th className="sort" data-sort="customer_name">
                              {props.t("Customer Name")}
                            </th>
                            <th className="sort" data-sort="customer_email">
                            {props.t("Customer Email")}
                            </th>
                            <th className="sort" data-sort="view_invoice">
                            {props.t("View Invoice")}
                            </th>
                            <th className="sort" data-sort="send_email">
                            {props.t("Send Email")}
                            </th>
                            <th className="sort" data-sort="action">
                            {props.t("Action")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {filteredInvoice?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="invoice_number">{item.iId}</td>
                              <td className="quotation_id">
                                {item.quotation_id}
                              </td>
                              <td className="customer_name">
                                {item.customer_name}
                              </td>
                              <td className="customer_email">
                                {item.customer_email}
                              </td>
                              <td className="view_invoice">
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success status-item-btn"  
                                  id="add-btn"
                                  onClick={() => tog_view(item.id)}
                                >
                                  {" "}
                                  {props.t("View Invoice")}
                                </button>{" "}
                              </td>
                              <td className="send_email">
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success status-item-btn"
                                  id="add-btn"
                                  onClick={() => handleOpenModal(item.id)}
                                >
                                  {" "}
                                  {props.t("Send Email")}
                                </button>{" "}
                              </td>
                              <td className="start_booking">
                                {" "}
                                <button
                                  onClick={() => handleStartTrip(item.id)}
                                  disabled={
                                    !isTripActive(item.status) ||
                                    isTripStarted(item.id) ||
                                    isTripCancel(item.id)
                                  }
                                  className="btn btn-sm btn-success status-item-btn"
                                  id="add-btn"
                                >
                                  {props.t("Start Journey")}
                                </button>{" "}
                              </td>
                              <td className="cancel_booking">
                                {" "}
                                <button
                                  onClick={() => handleCancelTrip(item.id)}
                                  disabled={
                                    !isTripActive(item.status) ||
                                    isTripCancel(item.id) ||
                                    isTripStarted(item.id)
                                  }
                                  className="btn btn-danger"
                                  id="add-btn"
                                >
                                  {props.t("Cancel")}
                                </button>{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        {pageNumber > 1 ? (
                          <Link
                            className="page-item pagination-prev disabled"
                            onClick={() => getAllData(pageNumber - 1)}
                          >
                            {" "}
                            {props.t("Previous")}
                          </Link>
                        ) : null}
                        <ul className="pagination listjs-pagination mb-0"><b>{pageNumber!== 1 ? pageNumber : null}</b></ul>
                        {numberOfData > pageLimit * pageNumber ? (
                          <Link
                            className="page-item pagination-next"
                            onClick={() => getAllData(pageNumber + 1)}
                          >
                            {" "}
                            {props.t("Next")}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* View invoice model*/}
      <Modal
        className="extra-width"
        isOpen={view_modal}
        toggle={() => {
          setView_modal(false);
        }}
        centered
      >
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            setView_modal(false);
          }}
        >
          {props.t("Invoice")}
        </ModalHeader>
        <ModalBody>
          {invoice.map((item, index) => (
            <div key={index} className="tm_container" ref={invoiceRef}>
              <div className="tm_invoice_wrap">
                <div className="tm_invoice tm_style1" id="tm_download_section">
                  <div className="tm_invoice_in">
                    <div className="tm_invoice_head tm_align_center tm_mb20">
                      <div className="tm_invoice_left">
                        <div className="tm_logo">
                          <img
                            src={Logo}
                            alt="Logo"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </div>
                      </div>
                      <div className="tm_invoice_right tm_text_right">
                        <div className="tm_primary_color tm_f50 tm_text_uppercase tm_font_sixe=50px">
                          <font size="6">{props.t("INVOICE")}</font>
                        </div>
                      </div>
                    </div>
                    <div className="tm_invoice_info tm_mb20">
                      <div className="tm_invoice_seperator tm_gray_bg"></div>
                      <div className="tm_invoice_info_list">
                        <p className="tm_invoice_number tm_m0">
                        {props.t("Invoice No")}:{" "}
                          <b className="tm_primary_color">{item.iId}</b>
                        </p>{" "}
                        &nbsp; &nbsp; &nbsp;
                        <p className="tm_invoice_date tm_m0">
                          {" "}
                          {props.t("Date")}: <b className="tm_primary_color">{item.iDate}</b>
                        </p>
                      </div>
                    </div>
                    <div className="tm_invoice_head tm_mb10">
                    <div className={`tm_invoice_section tm_invoice_to ${dir === 'rtl' ? 'tm-section-rtl': ''}`}>
                        <p className="tm_mb2">
                          <b className="tm_primary_color">{props.t("Invoice To")}:</b>
                        </p>
                        <div>
                          <p>
                            {item.customer_name}
                            <br />
                            {item.customerAddress}
                            <br />
                            {item.cusCountry}
                            <br />
                            {item.customer_email}
                          </p>
                        </div>
                      </div>
                      <div className={`tm_invoice_section tm_pay_to ${dir === 'rtl' ? 'tm-section-rtl': ''}`}>
                        <p className="tm_mb2">
                          <b className="tm_primary_color">{props.t("Pay To")}:</b>
                        </p>
                        <p>
                          {item.service_provider_name}
                          <br />
                          {item.companyAddress}
                          <br />
                          {item.comCountry}
                          <br />
                          {item.com_email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tm_table tm_style1 tm_mb3">
                    <div className="tm_round_border">
                      <div className="tm_table_responsive">
                        <table>
                          <thead>
                            <tr>
                              <th className="tm_width_6 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center">
                                #
                              </th>
                              <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center">
                              {props.t("Pick Up Location")}
                              </th>
                              <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center">
                              {props.t("Vehicle Number")}
                              </th>
                              <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center">
                                {props.t("Driver Name")}
                              </th>
                              <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center">
                                {props.t("Drop Location")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {vehicles.map((item, index) => (
                              <tr key={index}>
                                <td className="tm_width_3 text-center">
                                  {index + 1}
                                </td>
                                <td className="tm_width_4 text-center">
                                  {item.pickup_location}
                                </td>
                                <td className="tm_width_2 text-center">
                                  {item.vehicle_number}
                                </td>
                                <td className="tm_width_2 text-center">
                                  {item.driver_name}
                                </td>
                                <td className="tm_width_1 text-center">
                                  {item.drop_location}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="tm_invoice_footer">
                    <div className="tm_left_footer">
                      <p className="tm_mb2">
                        <b className="tm_primary_color"> {props.t("Other Information")} :</b>
                      </p>
                      <p className="tm_m0">
                      {props.t("Horse")} - {item.no_of_horse} <br />
                        {props.t("Special Requirement")} : {item.special_requirement}
                      </p>
                    </div>
                    <div className="tm_right_footer">
                      <table>
                        <tbody>
                          <tr>
                            <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">
                            {props.t("Subtotal")}
                            </td>
                            <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                              {item.iSubTotal} AED
                            </td>
                          </tr>
                          <tr>
                            <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                            {props.t("Discount")}
                              <span className="tm_ternary_color">
                                ({item.iDiscountRate}%)
                              </span>
                            </td>
                            <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              - {item.iDiscountAmount} AED
                            </td>
                          </tr>
                          <tr>
                            <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                            {props.t("Tax")}
                              <span className="tm_ternary_color">
                                ({item.iTaxRate}%)
                              </span>
                            </td>
                            <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              + {item.iTaxAmount} AED
                            </td>
                          </tr>
                          <tr className="tm_border_top tm_border_bottom">
                            <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">
                            {props.t("Grand Total")}
                            </td>
                            <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                              {item.iFinalAmount} AED
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {downloadingPDF ||
                ledg[ledg.length - 1].remaining_amount == 0 ? null : (
                  <Button
                    color="primary"
                    style={{ marginBottom: "1rem" }}
                    onClick={toggleModal}
                  >
                    {" "}
                    {props.t("Enter Amount")}
                  </Button>
                )}
                <div className="tm_padd_15_20 no-padding tm_round_border .tm_table_responsive">
                  <p className="tm_mb5">
                    <b className="tm_primary_color"></b>
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th className="tm_width_6 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center">
                          #
                        </th>
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center">
                        {props.t("Received Payment")}
                        </th>
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd text-center">
                        {props.t("Received Date")}
                        </th>
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd3 text-center">
                        {props.t("Remaining Payment")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledg.map((item, index) => (
                        <tr key={index}>
                          <td className="tm_width_3 text-center">
                            {index + 1}
                          </td>
                          <td className="tm_width_2 text-center">
                            {item.received_amount === 0
                              ? "0 AED"
                              : `${item.received_amount} AED`}
                          </td>
                          <td className="tm_width_1 text-center">
                            {item.received_amount === 0
                              ? ""
                              : item.received_date}
                          </td>
                          <td className="tm_width_2 text-center">
                            {item.remaining_amount === 0
                              ? "0 AED"
                              : `${item.remaining_amount} AED`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setView_modal(false);
            }}
          >
            {props.t("Close")}
          </Button>
          <Button color="primary" onClick={handleDownloadPDF}>
          {props.t("Download PDF")}
          </Button>
        </ModalFooter>

        {/* This is the enter amount model */}
        <Modal className="extra-width" isOpen={modal} toggle={toggleModal}>
          <ModalHeader
            className="bg-light p-3"
            id="exampleModalLabel"
            toggle={toggleModal}
          >
            {props.t("Enter Payment")}
          </ModalHeader>
          <form className="tablelist-form" onSubmit={validation.handleSubmit}>
            <ModalBody>
              {errors !== "" ? (
                <Alert color="danger">
                  <div>{errors}</div>
                </Alert>
              ) : null}
              {paymentHistroy.map((item, index) => (
                <div key={index} className="tm_container">
                  <div className="mb-3">
                    <label htmlFor="total_amount-field" className="form-label">
                    {props.t("Total Invoice Payment")}
                    </label>
                    <input
                      type="text"
                      name="totalInvoiceAmount"
                      className="form-control mb-3"
                      placeholder={item.total_amount}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="remaining_amount-field"
                      className="form-label"
                    >
                      {props.t("Total Remaining Payment")}
                    </label>
                    <input
                      type="text"
                      name="totalRemainingAmount"
                      className="form-control mb-3"
                      placeholder={item.remaining_amount}
                      readOnly
                    />
                  </div>
                </div>
              ))}
              <div className="mb-3">
                <label htmlFor="total_amount-field" className="form-label">
                {props.t("Received Payment")}
                </label>
                <input
                  type="text"
                  value={validation.values.totalRecievedAmount || ""}
                  onChange={validation.handleChange}
                  name="totalRecievedAmount"
                  id="total_amount-field"
                  className="form-control"
                  placeholder={props.t("Enter Received Amount")}
                  required
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" type="submit" disabled={isActiveTwo}>
         
                {props.t("Save")}
              </Button>

              <Button color="secondary" onClick={toggleModal}>
              {props.t("Cancel")}
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </Modal>

      <Modal
        className="extra-width"
        isOpen={modalEmailOpen}
        toggle={handleCloseModal}
        centered
      >
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={handleCloseModal}
        >
          {props.t("Send Email")}
        </ModalHeader>

        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {errors !== "" ? (
              <Alert color="danger">
                <div>{errors}</div>
              </Alert>
            ) : null}

            {sendEmailButtonData && sendEmailButtonData.length > 0 ? (
              <div className="tm_container">
                <div className="mb-3">
                  <label htmlFor="recipient-email-field" className="form-label">
                  {props.t("To")}:
                  </label>

                  <input
                    type="text"
                    id="recipient-email-field"
                    name="recepientEmail"
                    className="form-control"
                    value={validation.values.recepientEmail || ""}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject-field">{props.t("Subject")}:</label>

                  <input
                    type="text"
                    id="subject-field"
                    name="invoiceSubject"
                    className="form-control"
                    value={validation.values.invoiceSubject || ""}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />
                </div>
              </div>
            ) : (
              <div className="tm_container">
                <div className="mb-3">
                  <label htmlFor="recipient-email-field" className="form-label">
                  {props.t("To")}:
                  </label>

                  <input
                    type="text"
                    id="recipient-email-field"
                    name="recipient email"
                    className="form-control"
                    value={validation.values.email || ""}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject-field">{props.t("Subject")}:</label>

                  <input
                    type="text"
                    id="subject-field"
                    name="subject email"
                    className="form-control"
                    value={validation.values.subject || ""}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                  />
                </div>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
            {props.t("Close")}
            </Button>

            <Button color="success" type="submit" disabled={isActive}>
            {props.t("Send")}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default (withTranslation()(ListInvoiceDetails));
