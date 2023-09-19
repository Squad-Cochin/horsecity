////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Quotation page functionality done over here.                         //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { useFormik } from "formik";

/**IMPORTED FILES */
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import config from '../../../config';
import Logo from "../../../assets/images/black-logo.png";
import { getQuotationData, getConfirmQut, getSingleQuotationData,getTemplateQuotationData, getSPVehiclesData, getSPDriverData, getDiscounts, getSPUserName } from "../../../helpers/ApiRoutes/getApiRoutes";
import { sendEmailFunction } from "../../../helpers/ApiRoutes/addApiRoutes";
import { updatQuotation, confirmQuotation } from "../../../helpers/ApiRoutes/editApiRoutes";


const ListQuotationsTable = () => {
  const [ view_modal, setView_modal ] = useState(false);
  const [ quatlist_modal, setQuatList_modal ] = useState(false);
  const [ quotations, setQuotations ] = useState([]);
  const [ quotation, setQuotation ] = useState([]);
  const [ quotationListDetails, setQuotationListDetails ] = useState([])
  const [ quotationList, setQuotationList ] = useState([]);
  const [ modalEmail, setModalEmail] = useState(false);
  const [ qutId, setQutId ] = useState("");
  const [ pageNumber, setPageNumber ] = useState(1);
  const [ numberOfData, setNumberOfData ] = useState(0);
  const [userId, setUserId ] = useState("");
  const [module,setModule] = useState({});
  const [ template_data ,setTemplateData] = useState({});
  const [ errors, setErrors ] = useState("")
  const pageLimit = config.pageLimit;

  
  const [ tAmount, setTAmount ] = useState(0)
  const [ driverAmount, setDriverAmount ] = useState(0)
  const [ vehicleAmount, setVehicleAmount ] = useState(0)
  const [ taxation, setTaxation ] = useState([]);
  const [ taxAmount, setTaxAmount ] = useState(0)
  const [ taxApplayed, setTaxApplayed ] = useState("NO")
  const [ finalAmount, setFinalAmount ] = useState(0);
  const [ modal, setModal ] = useState(false);
  const [ serviceProviders, setServiceProviders ] = useState([]);
  const [ sPVechiles, setSPVechiles ] = useState([]);
  const [ sPDrivers, setSPDrivers ] = useState([]);
  const [ discounts, setDiscounts ] = useState([]);
  const [ selectedDiscount, setSelectedDiscount ] = useState("");
  const [ discountAmount, setDiscountAmount ] = useState(0);
  const [pageTitle, setPageTitle] = useState('KailPlus');
  const [ isActive, setActive ] = useState(false);
  const [ transportationInsuranceCoverage, setTransportationInsuranceCoverage ] = useState("FALSE");

    useEffect(() => {
      const settings = JSON.parse(localStorage.getItem("settingsData"));
      setPageTitle(settings.application_title);
      const data = JSON.parse(localStorage.getItem("authUser"));
      let userIdd = data[0]?.user[0]?.id
      setUserId(userIdd);
      getAllData(1)
      }, [userId, transportationInsuranceCoverage, taxApplayed])
 
  // function for getting data all quotation
  async function getAllData(page) {
    if(userId){ 
    let quotationData = await getQuotationData(page || 1,userId);
    setQuotations(quotationData.quotations);
    setModule(quotationData.module[0])
    setPageNumber(page);
    setNumberOfData(quotationData.totalCount);
  }
  }

  /**INITIAL VALUES */
  const initialValues = {
    quotation_id : quotation ? quotation[0]?.quotation_id : "",
    enquiry_id : quotation ? quotation[0]?.enquiry_id : "",
    customer_name : quotation ? quotation[0]?.customer_name : "",
    customer_email : quotation ? quotation[0]?.customer_email : "",
    status : quotation ? quotation[0]?.status : "",
    customer_id : quotation ? quotation[0]?.customer_id : "",
    customer_user_name : quotation ? quotation[0]?.customer_user_name : "",
    vehicle_id : quotation ? quotation[0]?.vehicle_id : "",
    vehicle_number : quotation ? quotation[0]?.vehicle_number : "",
    service_provider_id : quotation ? quotation[0]?.service_provider_id : "",
    service_provider_name : quotation ? quotation[0]?.service_provider_name : "",
    trip_type : quotation ? quotation[0]?.trip_type : "",
    pickup_location : quotation ? quotation[0]?.pickup_location : "",
    pickup_country : quotation ? quotation[0]?.pickup_country : "",
    drop_location : quotation ? quotation[0]?.drop_location : "",
    drop_country : quotation ? quotation[0]?.drop_country : "",
    no_of_horse : quotation ? quotation[0]?.no_of_horse : "",
    current_amount : "",
    tax_amount : quotation ? quotation[0]?.tax_amount : "",
    discount_amount : quotation ? quotation[0]?.discount_amount : "",
    vehicle_amount : quotation ? quotation[0]?.vehicle_amount : "",
    driver_amount : quotation ? quotation[0]?.driver_amount : "",
    special_requirement : quotation ? quotation[0]?.special_requirement : "",
    additional_service : quotation ? quotation[0]?.additional_service : "",
    transportation_insurance_coverage : quotation ? quotation[0]?.transportation_insurance_coverage : "",
    drop_date : quotation ? quotation[0]?.drop_date : "",
    pickup_date : quotation ? quotation[0]?.pickup_date : "",
    pickup_time : quotation ? quotation[0]?.pickup_time : "",
    drop_time : quotation ? quotation[0]?.drop_time : "",
    discount_type_id : quotation ? quotation[0]?.discount_type_id : "",
    driver_id : quotation ? quotation[0]?.driver_id : "",
    final_amount : quotation ? quotation[0]?.final_amount : "",

    subject : template_data.subject,
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      initialValues.current_amount = tAmount
      values.tax_amount = taxAmount
      values.final_amount = finalAmount
      if (modalEmail) {
        //SEND MAIL 

        sendEmail(values);
      } else {
        //update previes one
        editQuotation(values);
      }
    },
  });

  function modalClose(){
    setQuotation(null);
    setTAmount(0);
    setDriverAmount(0);
    setVehicleAmount(0);
    setTaxAmount(0)
    setFinalAmount(0);
    setTaxation([]);
    setTaxApplayed("NO");
    setServiceProviders([]);
    setSPVechiles([]);
    setSPDrivers([]);
    setDiscounts([]);
    setSelectedDiscount("");
    setDiscountAmount(0);
    setModal(false);
    setView_modal(false);
    setQutId("");
    setModalEmail(false);
    setErrors("")
  }

  /**IT WILL OPEN CONFIRM POPUP */
  async function confirmQut(){
    await confirmQuotation(qutId);
    setErrors("")
    setModal(false)
    modalClose()
    getAllData(pageNumber)
  }

  // UPDATE QUATATION DATA
  async function editQuotation(data){
    let updateQut = await updatQuotation(qutId, data);
    if(updateQut.code === 200){
        setErrors("")
        setModal(false)
        modalClose()
        getAllData(pageNumber)
    }else{
        setErrors("")
        setErrors(updateQut.message)
    }
  }
  
  // SEND EMAIL
  async function sendEmail(data){
    setActive(true);
    let sendEmail = await sendEmailFunction(qutId, data);
    if(sendEmail.code === 200){
      setActive(false);
        setErrors("")
        setModalEmail(false);
        modalClose();
    }else{
      setActive(false);
        setErrors("")
        setErrors(sendEmail.message)
    }
  }
  /*IT WILL OPEN EDIT QUOTATION POP UP*/
  async function tog_list(id) {

    setQutId(id)
    let singleQut = await getConfirmQut(id)
    let serviceProviderData = await getSPUserName()
    const sPVechilesData = await getSPVehiclesData(singleQut.quotation[0]?.service_provider_id) 
    setSPVechiles(sPVechilesData.vehicles)
    const sPDriverData = await getSPDriverData(singleQut.quotation[0]?.service_provider_id)
    setSPDrivers(sPDriverData.drivers)
    const discountsData = await getDiscounts()
    setDiscounts(discountsData)
    setServiceProviders(serviceProviderData.serviceProviders)
    setQuotation(singleQut.quotation);
    setTaxation(singleQut.tax);
    setFinalAmount(Number(singleQut.quotation[0]?.final_amount))
    setTaxAmount(Number(singleQut.quotation[0]?.tax_amount))
    setDiscountAmount(Number(singleQut.quotation[0]?.discount_amount))
    setVehicleAmount(Number(singleQut.quotation[0]?.vehicle_amount))
    setDriverAmount(Number(singleQut.quotation[0]?.driver_amount))
    setSelectedDiscount(singleQut.quotation[0]?.discount_type_id);
    setTAmount(Number(singleQut.quotation[0]?.vehicle_amount) + Number(singleQut.quotation[0]?.driver_amount))
    setTransportationInsuranceCoverage(singleQut.quotation[0]?.transportation_insurance_coverage)
    if(Number(singleQut.quotation[0]?.tax_amount) > 0){
      setTaxApplayed("YES")
    }
    setModal(!modal);
  }

 /*IT WILL OPEN VIEW QUOTATION POP UP*/
  async function tog_view(productId) {
    setQutId(productId)
    let confirmData = await getConfirmQut(productId)
    setQuotation(confirmData.quotation);
    setView_modal(!view_modal);
  }
 /*IT WILL LIST QUOTATION POP UP DATAS*/
  async function quat_list(productId) {
    let qutData = await getSingleQuotationData(productId)
    setQuotationListDetails(qutData.quotation.details);
    setQuotationList(qutData.quotation.quotations)
    setQuatList_modal(!quatlist_modal);
  }

  // IT WILL OPEN SEND MAIL POP UP
  async function tog_sendMail(qId, cEmail) {
    setQutId(qId)
    let temp_data = await getTemplateQuotationData()
    setTemplateData(temp_data.templates_quotation[0])
    setModalEmail(!modalEmail);
  }


  /**BASIS OF CHANGING DISCOUNT WILL CHANGE TAXAMOUNT & FINAL AMOUNT */
  async function calcDiscount(val){
    setSelectedDiscount(val);
    if(val !== ""){
        let discountType = discounts.find((d) => d.id === Number(val));
        if(discountType.type === "PERCENTAGE"){
            let discount = Number(tAmount) * (Number(discountType.rate)/100);
            setDiscountAmount(discount)
            setFinalAmount(Number(tAmount) - Number(discount));
            if(taxApplayed === "YES"){
                if(taxation[0]?.type === "PERCENTAGE"){
                    let taxAmount = (Number(tAmount) - Number(discount)) * (Number(taxation[0].value) / 100)
                    setTaxAmount(taxAmount)
                    setFinalAmount(Number(tAmount) - Number(discount) + Number(taxAmount));
                }else{
                    if(Number(taxation[0].value) < (Number(tAmount) - Number(discount))){
                        setTaxAmount(0)
                        setFinalAmount(Number(tAmount) - Number(discount));
                    }else {
                        setTaxAmount(Number(taxation[0].value))
                        setFinalAmount(Number(tAmount) - Number(discount) + Number(taxation[0].value));
                    }
                    
                }
            }else{
                setTaxAmount(0)
                setFinalAmount(Number(tAmount) - Number(discount));
            }
        }else{
            if(Number(discountType.rate) < Number(tAmount)){
                setDiscountAmount(Number(discountType.rate))
                setFinalAmount(Number(tAmount) - Number(discountType.rate));
                if(taxApplayed === "YES"){
                    if(taxation[0]?.type === "PERCENTAGE"){
                        let taxAmount = (Number(tAmount) - Number(discountType.rate) ) * (Number(taxation[0].value) / 100)
                        setTaxAmount(Number(taxAmount))
                        setFinalAmount(Number(tAmount) - Number(discountType.rate));
                    }else{
                        if(Number(taxation[0].value) < (Number(tAmount) - Number(discountType.rate) )){
                            setTaxAmount(0)
                            setFinalAmount(Number(tAmount) - Number(discountType.rate));
                        }else {
                            setTaxAmount(Number(taxation[0].value))
                            setFinalAmount(Number(tAmount) - Number(discountType.rate) + Number(taxation[0].value));
                        }
                        
                    }
                }else{
                    setTaxAmount(0)
                    setFinalAmount(Number(tAmount) - Number(discountType.rate))
                }
            }else{
                setDiscountAmount(0)
                if(taxApplayed === "YES"){
                    if(taxation[0]?.type === "PERCENTAGE"){
                        let taxAmount = (Number(tAmount)) * (Number(taxation[0].value) / 100)
                        setTaxAmount(taxAmount)
                        setFinalAmount(Number(tAmount) + Number(taxAmount));
                    }else{
                        if(Number(taxation[0].value) < (Number(tAmount) )){
                            setTaxAmount(0)
                            setFinalAmount(Number(tAmount))
                        }else {
                            setTaxAmount(taxation[0].value)
                            setFinalAmount(Number(tAmount) + Number(taxation[0].value));
                        }
                    }
                }else{
                    setTaxAmount(0)
                    setFinalAmount(Number(tAmount))
                }
            }
        }
    }else{
        setDiscountAmount(0)
        if(taxApplayed === "YES"){
            if(taxation[0]?.type === "PERCENTAGE"){
                let taxAmount = (Number(tAmount)) * (Number(taxation[0].value) / 100)
                setTaxAmount(taxAmount)
                setFinalAmount(Number(tAmount) + Number(taxAmount));
            }else{
                if(Number(taxation[0].value) < (Number(tAmount) )){
                    setTaxAmount(0)
                    setFinalAmount(Number(tAmount))
                }else {
                    setTaxAmount(Number(taxation[0].value))
                    setFinalAmount(Number(tAmount) + Number(Number(taxation[0].value)))
                }
                
            }
        }else{
            setTaxAmount(0)
            setFinalAmount(Number(tAmount))
        }
    }
  }
  /**BASIS OF CHANGING VEHICLE & DRIVER AMOUNT THAT TIME WILL CHANGE FINAL AMOUNT */
  async function totalAmount(val){
      if(selectedDiscount !== ""){
          let discountType = discounts.find((d) => d.id === Number(selectedDiscount));
          if(discountType.type === "PERCENTAGE"){
              let discount = Number(val) * (Number(discountType.rate)/100);
              setDiscountAmount(Number(discount))
              setFinalAmount(Number(val) - Number(discount));
              if(taxApplayed === "YES"){
                  if(taxation[0]?.type === "PERCENTAGE"){
                      let taxAmount = (Number(val) - Number(discount)) * (Number(taxation[0].value) / 100)
                      setTaxAmount(Number(taxAmount))
                      setFinalAmount(Number(val) - Number(discount) + Number(taxAmount));
                  }else{
                      if(taxation[0].value > (Number(val) - Number(discount))){
                          setTaxAmount(0)
                          setFinalAmount(Number(val) - Number(discount));
                      }else {
                          setTaxAmount(Number(taxation[0].value))
                          setFinalAmount(Number(val) - Number(discount) + Number(taxation[0].value));
                      }
                      
                  }
              }else{
                  setTaxAmount(0)
                  setFinalAmount(Number(val) - Number(discount));
              }
          }else{
              if(Number(discountType.rate) < Number(val)){
                  setDiscountAmount(Number(discountType.rate))
                  setFinalAmount(Number(val) - Number(discountType.rate));
                  if(taxApplayed === "YES"){
                      if(taxation[0]?.type === "PERCENTAGE"){
                          let taxAmount = (Number(val) - Number(discountType.rate)) * (Number(taxation[0].value) / 100)
                          setTaxAmount(Number(taxAmount))
                          setFinalAmount(Number(val) - Number(discountType.rate) + Number(taxAmount));
                      }else{
                          if(taxation[0].value > (Number(val) - Number(discountType.rate))){
                              setTaxAmount(0)
                              setFinalAmount(Number(val) - Number(discountType.rate));
                          }else {
                              setTaxAmount(Number(taxation[0].value))
                              setFinalAmount(Number(val) - Number(discountType.rate) + Number(taxation[0].value));
                          }
                          
                      }
                  }else{
                      setTaxAmount(0)
                      setFinalAmount(Number(val));
                  }
              }else{
                  setDiscountAmount(0)
                  if(taxApplayed === "YES"){
                      if(taxation[0]?.type === "PERCENTAGE"){
                          let taxAmount = Number(val) * (Number(taxation[0].value) / 100)
                          setTaxAmount(taxAmount)
                          setFinalAmount(Number(val) + Number(taxAmount));
                      }else{
                          if(Number(taxation[0].value) > Number(val)){
                              setTaxAmount(0)
                              setFinalAmount(Number(val));
                          }else {
                              setTaxAmount(Number(taxation[0].value))
                              setFinalAmount(Number(val) + Number(taxation[0].value));
                          }
                          
                      }
                  }else{
                      setTaxAmount(0)
                      setFinalAmount(Number(val));
                  }
              }
          }
      }else{
          setDiscountAmount(0)
          setFinalAmount(Number(val));
          if(taxApplayed === "YES"){
              if(taxation[0]?.type === "PERCENTAGE"){
                  let taxAmount = Number(val) * (Number(taxation[0].value) / 100)
                  setTaxAmount(taxAmount)
                  setFinalAmount(Number(val) + taxAmount);
                  
              }else{
                  if(Number(taxation[0].value) > Number(val)){
                      setTaxAmount(0)
                      setFinalAmount(Number(val));
                      
                  }else {
                      setTaxAmount(Number(taxation[0].value))
                      setFinalAmount(Number(val) + Number(taxation[0].value));
                  }
                  
              }
          }else{
              setTaxAmount(0)
              setFinalAmount(Number(val));
          }
      }
      setTAmount(val)
  }
  /**BASIS OF CHANGING TAX AMOUNT THAT TIME WILL CHANGE FINAL AMOUNT */
  async function applyTaxation(val){
      setTaxApplayed(val);
      if(val === "YES"){
          if(taxation[0]?.type === "PERCENTAGE"){
              let taxAmount = (Number(tAmount) - Number(discountAmount)) * (Number(taxation[0].value) / 100)
              setTaxAmount(taxAmount)
              setFinalAmount(Number(tAmount) - Number(discountAmount) + Number(taxAmount));
          }else{
              if(Number(taxation[0].value) > (Number(tAmount) - Number(discountAmount))){
                  setTaxAmount(0)
                  setFinalAmount(Number(tAmount) - Number(discountAmount));
              }else {
                  setTaxAmount(Number(taxation[0].value))
                  setFinalAmount(Number(tAmount) - Number(discountAmount) + Number(taxation[0].value));
              }
              
          }
      }else{
          setTaxAmount(0)
          setFinalAmount(Number(tAmount) - Number(discountAmount))
      }
      
  }
  /**SETTING DRIVER & VEHICLES BASIS OF SERVICE PROVIDER */
  async function serviceProviderSelected(id){
    const sPVechilesData = await getSPVehiclesData(id) 
    const sPDriverData = await getSPDriverData(id)
    setSPDrivers(sPDriverData.drivers)
    setSPVechiles(sPVechilesData.vehicles)
  }

  document.title = `Quotation | ${pageTitle} `;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Tables" breadcrumbItem="Quotations" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Edit & Remove</h4>
                </CardHeader>
                <CardBody>
                  <div id="customerList">
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="quatationId">
                              Quatation Id
                            </th>
                            <th className="sort" data-sort="enquiryId">
                              Enquiry Id
                            </th>
                            <th className="sort" data-sort="name">
                              Customer Name
                            </th>
                            <th className="sort" data-sort="email">
                              Customer Email
                            </th>
                            <th className="sort" data-sort="status">
                              Status
                            </th>
                            <th className="sort" data-sort="action">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {quotations?.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{(index + 1) + ((pageNumber - 1) * pageLimit)}</th>
                              <td className="quatationId">{item?.quotation_id}</td>
                              <td className="enquiryId">{item?.enquiry_id}</td>
                              <td className="customer_name">{item?.customer_name}</td>
                              <td className="customer_email">{item?.customer_email}</td>
                              <td className="customer_email">{item?.status}</td>
                              <td>
                                <div className="d-flex gap-2">
                                {JSON.parse(module?.update ||  'true') ?(
                                <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_view(item?.quotation_id)}
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                  ) : null }
                                  {JSON.parse(module?.read ||  'true') ?(
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => quat_list(item?.quotation_id)}
                                    >
                                      Quot List
                                    </button>
                                  </div>
                                 ) : null }
                                {JSON.parse(module?.update ||  'true') ?(
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_list(item?.quotation_id)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                               ) : null }
                                  <button
                                    className="btn btn-sm btn-success edit-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={() => tog_sendMail(item?.quotation_id, item?.customer_email)}
                                  >
                                    Send Email
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#121331,secondary:#08a88a"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* the below is having the code of the pagination of the page.
                    The previous and next button are also in side this function */}
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

      {/* Edit */}
      <Modal className="extra-width" isOpen={modal} toggle={() => { modalClose() }} centered >
        <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { modalClose() }}>Edit Quotation</ModalHeader>
        <form className="tablelist-form"
            onSubmit={validation.handleSubmit}>
            <ModalBody>
                {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                <div className="mb-3">
                <label htmlFor="customerName-field" className="form-label">Customer Name</label>
                <input
                    type="text"
                    name="customer_name"
                    id="customerName-field"
                    className="form-control"
                    value={validation.values.customer_name || ""}
                    onChange={validation.handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="service_provider_id-field" className="form-label">Service Provider Name</label>
                    <select
                        data-trigger
                        name="service_provider_id"
                        id="service_provider_id-field"
                        className="form-control"
                        value={validation.values.service_provider_id || ""}
                        onChange={(e) => {validation.handleChange(e); serviceProviderSelected(e.target.value);}}
                        onBlur={validation.handleBlur}
                        required
                    >
                        <option value="">Select Service Provider</option>
                    {serviceProviders.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="vehicle_id-field" className="form-label">Vehicle Number</label>
                    <select
                        data-trigger
                        name="vehicle_id"
                        id="vehicle_id-field"
                        className="form-control"
                        value={validation.values.vehicle_id || ""}
                        // onSelect={enquiry_details(validation.values.service_provider_id)}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        // required
                    >
                        <option value="">Select Any Vehicle Number</option>
                        {sPVechiles.map((item, index) => (
                            <option key={index} value={item.id}>{item.vehicle_number}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="trip_type-field" className="form-label">Trip Type</label>
                    <select
                        data-trigger
                        name="trip_type"
                        id="trip_type-field"
                        className="form-control"
                        value={validation.values.trip_type || ""}
                        // onSelect={enquiry_details(validation.values.service_provider_id)}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        required
                    >
                        <option value="">Select Trip Type</option>
                        <option value="PRIVATE">Private</option>
                        <option value="GCC">GCC</option>
                        <option value="SHARING">Sharing</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="pickup_country-field" className="form-label">Pickup Country</label>
                    <input
                        type="text"
                        name="pickup_country"
                        id="pickup_country-field"
                        className="form-control"
                        value={validation.values.pickup_country || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pickup_location-field" className="form-label">Pickup Location</label>
                    <input
                        type="text"
                        name="pickup_location"
                        id="pickup_location-field"
                        className="form-control"
                        value={validation.values.pickup_location || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="drop_country-field" className="form-label">Drop Country</label>
                    <input
                        type="text"
                        name="drop_country"
                        id="drop_country-field"
                        className="form-control"
                        value={validation.values.drop_country || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="drop_location-field" className="form-label">Drop Location</label>
                    <input
                        type="text"
                        name="drop_location"
                        id="drop_location-field"
                        className="form-control"
                        value={validation.values.drop_location || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="no_of_horse-field" className="form-label">Number of Hourse</label>
                    <input
                        type="text"
                        name="no_of_horse"
                        id="no_of_horse-field"
                        className="form-control"
                        value={validation.values.no_of_horse || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="driver_id-field" className="form-label">Driver</label>
                    <select
                        data-trigger
                        name="driver_id"
                        id="driver_id-field"
                        className="form-control"
                        value={validation.values.driver_id || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        required
                    >
                        <option value="">Select Any Vehicle Number</option>
                        {sPDrivers.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="discount_type_id-field" className="form-label">Discount</label>
                    <select
                        data-trigger
                        name="discount_type_id"
                        id="discount_type_id-field"
                        className="form-control"
                        value={validation.values.discount_type_id || ""}
                        onChange={(e)=> { validation.handleChange(e); calcDiscount(e.target.value);}}
                        onBlur={validation.handleBlur}
                        // required
                    >
                        <option value="">Select Discount</option>
                        {discounts.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="pickup_date-field" className="form-label">Pickup Date</label>
                    <Flatpickr
                        className="form-control"
                        name='pickup_date'
                        options={{
                            dateFormat: "d-m-Y"
                        }}
                        value= ""
                        onChange={(dates) =>validation.setFieldValue('pickup_date', dates[0])}
                        placeholder={validation.values.pickup_date || "Select Date"}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pickup_time-field" className="form-label">Pickup Time</label>
                    <input
                        type="time"
                        name="pickup_time"
                        id="pickup_time-field"
                        className="form-control"
                        value={validation.values.pickup_time || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="drop_date-field" className="form-label">Drop Date</label>
                    <Flatpickr
                        className="form-control"
                        name='drop_date'
                        options={{
                            dateFormat: "d-m-Y"
                        }}
                        value= ""
                        onChange={(dates) =>validation.setFieldValue('drop_date', dates[0])}
                        placeholder={validation.values.drop_date || "Select Date"}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="drop_time-field" className="form-label">Drop Time</label>
                    <input
                        type="time"
                        name="drop_time"
                        id="drop_time-field"
                        className="form-control"
                        value={validation.values.drop_time || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Transportation Insurance Coverage
                    </label>
                    <div className="form-check">
                        <input
                        type="radio"
                        id="transportation-insurance-coverage-yes"
                        name="transportation_insurance_coverage"
                        className="form-check-input"
                        value="TRUE"
                        checked={transportationInsuranceCoverage === "TRUE"}
                        onClick={(e)=> { validation.handleChange(e); setTransportationInsuranceCoverage("TRUE");} }
                        onBlur={validation.handleBlur}
                        required
                        />
                        <label
                        htmlFor="transportation-insurance-coverage-yes"
                        className="form-check-label"
                        >
                        Yes
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                        type="radio"
                        id="transportation-insurance-coverage-no"
                        name="transportation_insurance_coverage"
                        className="form-check-input"
                        value="FALSE"
                        checked={transportationInsuranceCoverage === "FALSE"}
                        onClick={(e)=> { validation.handleChange(e); setTransportationInsuranceCoverage("FALSE");} }
                        onBlur={validation.handleBlur}
                        required
                        />
                        <label
                        htmlFor="transportation-insurance-coverage-no"
                        className="form-check-label"
                        >
                        No
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="additional_service-field" className="form-label">Additional Service</label>
                    <input
                        type="text"
                        name="additional_service"
                        id="additional_service-field"
                        className="form-control"
                        value={validation.values.additional_service || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="special_requirement-field" className="form-label">Special Requirement</label>
                    <input
                        type="text"
                        name="special_requirement"
                        id="special_requirement-field"
                        className="form-control"
                        value={validation.values.special_requirement || ""}
                        onChange={validation.handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="vehicle_amount-field" className="form-label">Vehicle Payment</label>
                    <input
                        type="text"
                        name="vehicle_amount"
                        id="vehicle_amount-field"
                        className="form-control"
                        value={validation.values.vehicle_amount || ""}
                        onChange={(e)=> { validation.handleChange(e); setVehicleAmount(e.target.value); totalAmount(Number(e.target.value) + Number(driverAmount))}}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="driver_amount-field" className="form-label">Driver Payment</label>
                    <input
                        type="text"
                        name="driver_amount"
                        id="driver_amount-field"
                        className="form-control"
                        value={validation.values.driver_amount || ""}
                        onChange={(e)=> { validation.handleChange(e); setDriverAmount(e.target.value); totalAmount(Number(e.target.value) + Number(vehicleAmount))}}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="discount_amount-field" className="form-label">Discount Payment</label>
                    <input
                        type="text"
                        name="discount_amount"
                        id="discount_amount-field"
                        className="form-control"
                        value={discountAmount}
                        onChange={validation.handleChange}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Applay Tax
                    </label>
                    <div className="form-check">
                        <input
                          type="radio"
                          id="tax_applayed-yes"
                          name="tax_applayed"
                          className="form-check-input"
                          value="YES"
                          checked={taxApplayed === "YES"}
                          onClick={(e)=> {applyTaxation(e.target.value); setTaxApplayed("YES");} }
                          onBlur={validation.handleBlur}
                        />
                        <label
                        htmlFor="tax_applayed-yes"
                        className="form-check-label"
                        >
                        Yes
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                        type="radio"
                        id="tax_applayed-no"
                        name="tax_applayed"
                        className="form-check-input"
                        value="NO"
                        checked={taxApplayed === "NO"}
                        onClick={(e)=> {applyTaxation(e.target.value); setTaxApplayed("NO");} }
                        onBlur={validation.handleBlur}
                        />
                        <label
                        htmlFor="tax_applayed-no"
                        className="form-check-label"
                        >
                        No
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="tax_amount-field" className="form-label">Tax Payment</label>
                    <input
                        type="text"
                        name="tax_amount"
                        id="tax_amount-field"
                        className="form-control"
                        value={taxAmount}
                        onChange={validation.handleChange}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="final_amount-field" className="form-label">Final Payment</label>
                    <input
                        type="text"
                        name="final_amount"
                        id="final_amount-field"
                        className="form-control"
                        value={finalAmount}
                        onChange={validation.handleChange}
                        readOnly
                    />
                </div>
                                                
            </ModalBody>
            <ModalFooter>
            {quotation?.map((item, index) => (
                <div key={index} className="hstack gap-2 justify-content-end">
                    <button type="button" className="btn btn-light" onClick={() => { modalClose() }}>Close</button>
                  
                    <button type="submit" className="btn btn-success" id="add-btn" disabled = {item.status==config.status.confirmed}  onClick={() => {
                                    window.location.href = '#exampleModalLabel'; // Change the URL here
                            }}>Edit Quotation</button>
                        
                </div>
                    ))}
            </ModalFooter>
        </form>
      </Modal>

      {/**Quatation list */}
      <Modal
        className="extra-width"
        isOpen={quatlist_modal}
        toggle={() => {
          setQuatList_modal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setQuatList_modal(false);
          }}
        >
          Quotation List
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            {quotationListDetails?.map((item, index) => (
              <div key={index} className="tm_container">
                <div className="tm_invoice_wrap">
                  <div
                    className="tm_invoice tm_style1"
                    id="tm_download_section"
                  >
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
                            <font size="6">QUOTATION</font>
                          </div>
                        </div>
                      </div>
                      <div className="tm_invoice_info tm_mb20">
                        <div className="tm_invoice_seperator tm_gray_bg"></div>
                        <div className="tm_invoice_info_list">
                          <p className="tm_invoice_number tm_m0 ms-2">
                            Quotation No:{" "}
                            <b className="tm_primary_color ms-2">{item?.quotation_id}</b>
                          </p>
                          <p className="tm_invoice_date tm_m0 ms-2">
                            Enquiry Date:{" "}
                            <b className="tm_primary_color ms-2">
                              {item?.enquiry_date}
                            </b>
                          </p>
                        </div>
                      </div>
                      <div className="tm_invoice_head tm_mb10">
                        <div className="tm_invoice_section tm_invoice_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Customer Details:
                            </b>
                          </p>
                          <div>
                            <div>
                              <b>Name:</b> {item?.customer_user_name}
                              <br />
                              <b>Email:</b> {item?.customer_email}
                              <br />
                              <b>Phone:</b> {item?.customer_contact_no}
                              <br />
                              <b>Id Proof No:</b> {item?.customer_id_proof_no}
                            </div>
                          </div>
                        </div>
                        <div className="tm_invoice_section tm_pay_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Service Provider Details:
                            </b>
                          </p>
                          <div>
                            <b>Name:</b> {item?.service_provider_name}
                            <br />
                            <b>Vehicle Number:</b> {item?.vehicle_number}
                            <br />
                            <b>Make:</b> {item?.make}
                            <br />
                            <b>Model:</b> {item?.model}
                            <br />
                            <b>Driver:</b> {item?.driver}
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive table-card mt-3 mb-1">
                        <table
                          className="table align-middle table-nowrap"
                          id="Table"
                        >
                          <thead className="table-light">
                            <tr>
                              {/* <th className="index" data-sort="index">#</th> */}
                              <th className="sort" data-sort="customer_name">
                                Quot ID
                              </th>
                              <th
                                className="sort"
                                data-sort="service_provider_name"
                              >
                                Trip Type
                              </th>
                              <th className="sort" data-sort="quotation_id">
                                Pickup Location
                              </th>
                              <th className="sort" data-sort="view_invoice">
                                Drop Location
                              </th>
                              <th className="sort" data-sort="send_email">
                                No Of Horse
                              </th>
                              <th className="sort" data-sort="send_email">
                                Final Payment
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {quotationList.map((item, index)=>{
                              return(
                                <tr key={index}>
                                  <td className="customer_name">{item.quotation_id}</td>
                                  <td className="service_provider_name">{item.trip_type}</td>
                                  <td className="quotation_id">{item.pickup_location}</td>
                                  <td className="quotation_id">{item.drop_location}</td>
                                  <td className="quotation_id">{item.no_of_horse}</td>
                                  <td className="quotation_id">{item.final_amount}</td>
                                </tr>
                            )})}
                            {/* Add more rows as needed */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))} 
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setQuatList_modal(false);
                }}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* View modal */}
      <Modal
        className="extra-width"
        isOpen={view_modal}
        toggle={() => {
          setView_modal(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setView_modal(false);
          }}
        >
          Confirm Quotation
        </ModalHeader>
        <form className="tablelist-form">
          <ModalBody>
            {quotation?.map((item, index) => (
              <div key={index} className="tm_container">
                <div className="tm_invoice_wrap">
                  <div
                    className="tm_invoice tm_style1"
                    id="tm_download_section"
                  >
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
                            <font size="6">QUOTATION</font>
                          </div>
                        </div>
                      </div>
                      <div className="tm_invoice_info tm_mb20">
                        <div className="tm_invoice_seperator tm_gray_bg"></div>
                        <div className="tm_invoice_info_list">
                          <p className="tm_invoice_number tm_m0 ms-2">
                            Quotation No:{" "}
                            <b className="tm_primary_color ms-2">{item?.quotation_id}</b>
                          </p>
                          <p className="tm_invoice_date tm_m0 ms-2">
                            Enquiry Date:{" "}
                            <b className="tm_primary_color ms-2">
                              {item?.enquiry_date}
                            </b>
                          </p>
                        </div>
                      </div>
                      <div className="tm_invoice_head tm_mb10">
                        <div className="tm_invoice_section tm_invoice_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Customer Details:
                            </b>
                          </p>
                          <div>
                            <p>
                              Name: 
                              {item?.cName}
                              <br />
                              Email: 
                              {item?.customer_email}
                              <br />
                              Username: 
                              {item?.customer_user_name}
                              <br />
                              Phone: 
                              {item?.customer_contact_no}
                              <br />
                              Id Proof No: 
                              {item?.customer_id_proof_no}
                            </p>
                          </div>
                        </div>
                        <div className="tm_invoice_section tm_pay_to">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Service Provider Details:
                            </b>
                          </p>
                          <p>
                            Name: 
                            {item?.service_provider_name}
                            <br />
                            Vehicle Number: 
                            {item?.vehicle_number}
                            <br />
                            Make: 
                            {item?.make}
                          </p>
                        </div>
                      </div>
                      <div className="tm_invoice_footer">
                        <div className="tm_left_footer">
                          <p className="tm_mb2">
                            <b className="tm_primary_color">
                              Reqirments:
                            </b>
                          </p>
                          <p className="tm_m0">
                            <h5>Special Requirements : </h5>
                            {item?.special_requirement}
                            <br />
                            <h5>Additional Service :</h5> 
                            {item?.additional_service}
                          </p>
                        </div>
                        <div className="tm_right_footer">
                          <div className="tm_card">
                            <div className="tm_card_header">
                              Quotation Summary
                            </div>
                            <div className="tm_card_content">
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Trip Type:
                                </span>
                                <span className="tm_card_value">
                                  {item?.trip_type}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Pickup Location:
                                </span>
                                <span className="tm_card_value">
                                  {item?.pickup_location},{" "}
                                  {item?.pickup_country}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Pickup Date:
                                </span>
                                <span className="tm_card_value">
                                  {item?.pickup_date}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Pickup Time:
                                </span>
                                <span className="tm_card_value">
                                  {item?.pickup_time}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Drop Location:
                                </span>
                                <span className="tm_card_value">
                                  {item?.drop_location}, {item?.drop_country}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Drop Time:
                                </span>
                                <span className="tm_card_value">
                                  {item?.drop_time}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Drop Date:
                                </span>
                                <span className="tm_card_value">
                                  {item?.drop_date}
                                </span>
                              </div>
                              <div className="tm_card_item">
                                <span className="tm_card_label">
                                  Number of Horses:
                                </span>
                                <span className="tm_card_value">
                                  {item?.no_of_horse}
                                </span>
                              </div>
                            </div>
                            <div className="tm_card_footer">
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label">
                                  Transportation Insurance:
                                </span>
                                <span className="tm_card_footer_value">
                                  {item?.transportation_insurance_coverage}
                                </span>
                              </div>
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label">
                                  Tax:
                                </span>
                                <span className="tm_card_footer_value">
                                  {item?.tax_amount}
                                </span>
                              </div>
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label">
                                  Discount:
                                </span>
                                <span className="tm_card_footer_value">
                                  {item?.discount_amount}
                                </span>
                              </div>
                              <div className="tm_card_footer_item">
                                <span className="tm_card_footer_label tm_bold">
                                  Final Amount:
                                </span>
                                <span className="tm_card_footer_value tm_bold">
                                  {item?.final_amount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setView_modal(false);
                }}
              >
                Close
              </button>
              {quotation?.map((item, index) => (
              <div key={index} className="tm_container">
              <button type="button" disabled = {item.status==config.status.confirmed} onClick={() => { confirmQut(); }} className="btn btn-success" id="edit-btn">Confirm</button>
              </div>
            ))}
            </div>
          </ModalFooter>
        </form>
      </Modal>
      
      
      <Modal className="extra-width" isOpen={modalEmail} toggle={() => { modalClose() }} centered >
          <ModalHeader className="bg-light p-3" id="exampleModalLabel" toggle={() => { modalClose() }}>Send Mail</ModalHeader>
          <form className="tablelist-form" onSubmit={validation.handleSubmit}>
              <ModalBody>
              {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                <div className="mb-3">
                  <label htmlFor="customer_email-field" className="form-label">Customer Email</label>
                  <input
                      type="text"
                      name="customer_email"
                      id="customer_email-field"
                      className="form-control"
                      value={validation.values.customer_email || ""}
                      onChange={validation.handleChange}
                      required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject-field" className="form-label">Subject</label>
                  <input
                      type="text"
                      name="subject"
                      id="subject-field"
                      className="form-control"
                      value={validation.values.subject || ""}
                      onChange={validation.handleChange}
                      required
                  />
                </div>

              </ModalBody>
              <ModalFooter>
                  <div className="hstack gap-2 justify-content-end">
                    <button type="button" className="btn btn-light" onClick={() => { modalClose(); }}>Close</button>
                    <button type="submit" className="btn btn-success" id="add-btn"  disabled={isActive}>Send Email</button>
                  </div>
              </ModalFooter>
          </form>
      </Modal>
    </React.Fragment>
  );
};

export default ListQuotationsTable;
