///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
//                              This file is for implementing CRUD operations for customers                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
//IMPORTED FROM REACT BOOTSTRAP
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
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import { useSelector } from "react-redux";
/**IMPORTED FILES */
import { removeCustomer } from "../../helpers/ApiRoutes/removeApiRoutes"; //For removing customers
import { addNewCustomer } from "../../helpers/ApiRoutes/addApiRoutes"; //For adding new customer
import withRouter from "../../components/Common/withRouter";
import {
  updateCustomer,
  updateCustomerStatus,
} from "../../helpers/ApiRoutes/editApiRoutes"; //For updating  customer
import {
  getSingleCustomerData,
  getCustomersData,
} from "../../helpers/ApiRoutes/getApiRoutes";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import config from "../../config";
import dateConverter from "../../helpers/dateConverter";

// Function for customer page
const ListCustomerTable = (props) => {
  const [modal_list, setmodal_list] = useState(false); /**Using for showing ADD & EDIT modal */
  const [view_modal, setView_modal] = useState(false); /**Using for showing VIEW modal */
  const [add_list, setAdd_list] = useState(false); /**Using for controlling ADD & EDIT modal */
  const [customers, setCustomers] = useState([]); /**Using for storing All customers */
  const [customer, setCustomer] = useState([]); /**Using for storing All particul  customer based of thair ID */
  const [updateImage, setUpdateImage] = useState(""); /**Using for storing id proof image file */
  const [idProofPreview, setIdProofPreview] = useState(null); /**Using for storing idproof image URL*/
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [role, setRole] = useState(false);
  const [searchInp, setSearchInp] = useState("");
  const [module, setModule] = useState({});
  const [errors, setErrors] = useState("");
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const pageLimit = config.pageLimit;

  /**This hook is used to fetch customers data initital time */
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    const data = JSON.parse(localStorage.getItem("authUser"));
    let user_Id = data[0]?.user[0]?.id;
    let role_Name = data[0]?.user[0]?.role_name;
    let role_id = data[0]?.user[0]?.role_Id;
    setUserId(user_Id);
    setRole(role_Name);
    setRoleId(role_id);
    getAllData(1);
  }, [userId, role, roleId]);

  /**This object sets the initial values for the form fields managed by formik */
  const initialValues = {
    name: !add_list ? customer[0]?.name : "",
    email: !add_list ? customer[0]?.email : "",
    userName: !add_list ? customer[0]?.user_name : "",
    password: !add_list ? customer[0]?.password : "",
    contact_no: !add_list ? customer[0]?.contact_no : "",
    date_of_birth: !add_list ? customer[0]?.date_of_birth : "",
    id_proof_no: !add_list ? customer[0]?.id_proof_no : "",
    id_proof_image: !add_list ? customer[0]?.id_proof_image : "",
  };

  // Later in your code, when setting the initial state
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      values.id_proof_image = updateImage;
      if (add_list) {
        //add new customer
        addCustomer(values);
      } else {
        //update previes customer
        editCustomer(values);
      }
    },
  });

  // function for add customer
  async function addCustomer(values) {
    let addCustomer = await addNewCustomer(values, userId);
    if (addCustomer.code === 200) {
      setErrors("");
      setAdd_list(false);
      setmodal_list(false);
      getAllData(pageNumber);
      setUpdateImage("");
    } else {
      setErrors("");
      setErrors(addCustomer.message);
    }
  }

  // Update customer
  async function editCustomer(data) {
    let updatedCustomer = await updateCustomer(customer[0]?.id, data);
    if (updatedCustomer.code === 200) {
      setErrors("");
      setAdd_list(false);
      setmodal_list(false);
      getAllData(pageNumber);
      setUpdateImage("");
    } else {
      setErrors("");
      setErrors(updatedCustomer.message);
    }
  }

  /**This function is an event handler that triggers when the user
   *  selects a file for the idproof image */
  const handleIdProofImageChange = (event) => {
    const file = event.target.files[0];
    setUpdateImage(file);
    setIdProofPreview(URL.createObjectURL(file));
  };

  /**This function is used to toggle the modal for adding/editing customers
   * and set the selected customer */
  async function tog_list(param, productId) {
    setErrors("");
    if (param === "ADD") {
      setIdProofPreview(null);
      setAdd_list(!add_list);
    } else {
      setCustomer([]);
      let singleCustomer = await getSingleCustomerData(productId);
      setCustomer(singleCustomer);
      setIdProofPreview(singleCustomer[0]?.id_proof_image);
    }
    setmodal_list(!modal_list);
  }

  /**This function toggles the view modal for displaying details
   *  of a customer */
  async function tog_view(productId) {
    let singleCustomer = await getSingleCustomerData(productId);
    setCustomer(singleCustomer);
    setView_modal(!view_modal);
  }

  /**This function is used to remove a service provider*/
  async function remove_data(id) {
    await removeCustomer(id);
    getAllData(pageNumber);
  }

  /**Function for changing customers status */
  function toggleStatus(button, customerId) {
    var currentStatus = button.innerText.trim();
    const customerData = customers.find((s) => s.id === customerId);
    updateCustomerStatus(customerData.id);
    if (currentStatus === "ACTIVE") {
      button.innerText = "INACTIVE";
      button.classList.remove("btn-success");
      button.classList.add("btn-danger");
      if (customerData) {
        customerData.status = "INACTIVE";
      }
    } else if (currentStatus === "INACTIVE") {
      button.innerText = "ACTIVE";
      button.classList.remove("btn-danger");
      button.classList.add("btn-success");
      if (customerData) {
        customerData.status = "ACTIVE";
      }
    }
  }

  // function for get data all customer data
  async function getAllData(page) {
    if (userId) {
      let getCustomers = await getCustomersData(page || 1, userId);
      setCustomers(getCustomers?.customer || []);
      setModule(getCustomers?.module[0] || []);
      setPageNumber(page);
      setNumberOfData(getCustomers?.totalCount || "");
    }
  }
    /**Filter data */
    const filteredCustomers = customers?.filter(value => 
      value?.name.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
      value?.email.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
      value?.contact_no.toLowerCase().includes(searchInp.toLowerCase().trim())
    );
    const {  dir } = useSelector(state => ({
      dir: state.Layout.dir,
    }));
  
  document.title = `${props.t("Customers")} | ${pageTitle} `;
  return (
    <React.Fragment>
      <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid>
          <Breadcrumbs title={props.t("Tables")} breadcrumbItem={props.t("Customers")} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                <div className="row align-items-md-center">
                  <h4 className="card-title mb-0 col-md-8  p-3">{props.t("Add, Edit & Remove")} <br/> 
                   <span className="d-block mt-2 fs-16 text-success">{props.t("Total")} {numberOfData}</span></h4>
                  <form className="col-md-4">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={props.t("Search") + "..."}
                          onChange={(e)=>setSearchInp(e.target.value)}
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
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1">
                          <Button
                            color="success"
                            className="add-btn"
                            onClick={() => tog_list("ADD")}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            {props.t("Add")}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="index" data-sort="customer_name">
                              #
                            </th>
                            <th
                              className="customer_name"
                              data-sort="customer_name"
                            >
                              {props.t("Name")}
                            </th>
                            <th className="email" data-sort="email">
                            {props.t("Email")}
                            </th>
                            <th className="contact_no" data-sort="contact_no">
                            {props.t("Contact Number")}
                            </th>
                            <th
                              className="registered_date"
                              data-sort="registered_date"
                            >
                              {props.t("Registered Date")}
                            </th>
                            <th className="status" data-sort="status">
                              {props.t("Status")}
                            </th>
                            <th className="action" data-sort="action">
                              {props.t("Action")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {filteredCustomers?.map((item, index) => (
                            <tr key={item?.id}>
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="customer_name">{item.name}</td>
                              <td className="email">{item.email}</td>
                              <td className="contact_no">{item.contact_no}</td>
                              <td className="registered_date">
                                {item.created_at}
                              </td>
                              <td>
                                {item.status === "ACTIVE" ? (
                                  <button
                                    className="btn btn-sm btn-success status-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={(event) =>
                                      toggleStatus(event.target, item.id)
                                    }
                                  >
                                    {item.status}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-sm btn-danger status-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={(event) =>
                                      toggleStatus(event.target, item.id)
                                    }
                                  >
                                    {item.status}
                                  </button>
                                )}
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="view">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      onClick={() => tog_view(item.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                    >
                                      {props.t("View")}
                                    </button>
                                  </div>
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      onClick={() => tog_list("EDIT", item.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                    >
                                      {props.t("Edit")}
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      onClick={() => remove_data(item.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                    >
                                      {props.t("Remove")}
                                    </button>
                                  </div>
                                </div>
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
                            {props.t("Previous")}
                          </Link>
                        ) : null}
                        <ul className="pagination listjs-pagination mb-0"><b>{pageNumber!== 1 ? pageNumber : null}</b></ul>
                        {numberOfData > pageLimit * pageNumber ? (
                          <Link
                            className="page-item pagination-next"
                            onClick={() => getAllData(pageNumber + 1)}
                          >
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

      {/********* Add  & Edit Modal*************** */}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          setmodal_list(false);
          setAdd_list(false);
          setIdProofPreview(null);
        }}
        centered
      >
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            setmodal_list(false);
            setAdd_list(false);
            setIdProofPreview(null);
            setUpdateImage("");
          }}
        >
          {add_list ? props.t("Add Customer") : props.t("Edit Customer")}{" "}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {errors !== "" ? (
              <Alert color="danger">
                <div>{errors}</div>
              </Alert>
            ) : null}
            {/** Customer name */}
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
              {props.t("Name")}
              </label>
              <input
                type="text"
                name="name"
                id="customername-field"
                className="form-control"
                value={validation.values.name || ""}
                onChange={validation.handleChange}
                placeholder={props.t("Enter Name")}
                required
              />
            </div>
            {/** Customer email */}
            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
              {props.t("Email")}
              </label>
              <input
                type="email"
                name="email"
                id="email-field"
                value={validation.values.email || ""}
                onChange={validation.handleChange}
                className="form-control"
                placeholder={props.t("Enter Email")}
                required
              />
            </div>
            {/** Customer username */}
            <div className="mb-3">
              <label htmlFor="username-field" className="form-label">
              {props.t("Username")}
              </label>
              <input
                type="text"
                name="userName"
                id="username-field"
                value={validation.values.userName || ""}
                onChange={validation.handleChange}
                className="form-control"
                placeholder={props.t("Enter User Name")}
                required
              />
            </div>
            {/** Customer Password */}
            {add_list ? (
              <div className="mb-3">
                <label htmlFor="password-field" className="form-label">
                {props.t("Password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password-field"
                  value={validation.values.password || ""}
                  onChange={validation.handleChange}
                  className="form-control"
                  placeholder={props.t("Enter Password")}
                  required
                />
              </div>
            ) : null}
            {/** Customer contact_no number */}
            <div className="mb-3">
              <label htmlFor="contact_no-field" className="form-label">
              {props.t("Contact Number")}
              </label>
              <input
                type="text"
                name="contact_no"
                id="contact_no-field"
                value={validation.values.contact_no || ""}
                onChange={validation.handleChange}
                className="form-control"
                placeholder={props.t("Enter Contact Number")}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date_of_birth-field" className="form-label">
              {props.t("Date Of Birth")}
              </label>
              <Flatpickr
                className="form-control"
                name="date_of_birth"
                options={{
                  dateFormat: "d-m-Y",
                  maxDate: dateConverter.convertTodayDate_DD_MM_YYYY_ForDateOfBirth()
                }}
                value=""
                onChange={(dates) =>
                  validation.setFieldValue("date_of_birth", dates[0])
                }
                placeholder={validation.values.date_of_birth || props.t("Select Date")}
              />
            </div>

            {/** Customer Id proof no */}
            <div className="mb-3">
              <label htmlFor="id_proof_no-field" className="form-label">
              {props.t("Id Proof Number")}
              </label>
              <input
                type="text"
                id="id_proof_no-field"
                name="id_proof_no"
                className="form-control"
                value={validation.values.id_proof_no || ""}
                onChange={validation.handleChange}  
                placeholder={props.t("Enter Id Proof Number")}
              />
            </div>

            {/* Id proof Image */}
            <div className="mb-3">
              <label htmlFor="id_proof-field" className="form-label">
              {props.t("Id Proof Image")}
              </label>
              <div className="col-md-10">
                {idProofPreview && (
                  <div>
                    <img
                      name="id_proof_image"
                      src={idProofPreview}
                      alt="Id Proof Preview"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                )}
                <input
                  className="form-control"
                  name="id_proof_image"
                  type="file"
                  placeholder={props.t("Certificate Image")}
                  onChange={handleIdProofImageChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setUpdateImage("");
                  setmodal_list(false);
                  setAdd_list(false);
                  setIdProofPreview(null);
                }}
              >
                {props.t("Close")}
              </button>
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={() => {
                  window.location.href = "#exampleModalLabel"; // Change the URL here
                }}
              >
                {add_list ? props.t("Add Customer") : props.t("Update Customer")}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      {/***************** View Modal *************/}
      <Modal
        className="extra-width"
        isOpen={view_modal}
        toggle={() => {
          setView_modal(false);
        }}
      >
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            setView_modal(false);
          }}
        >
          {props.t("View Customer")}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {/** Customer name */}
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
              {props.t("Name")}
              </label>
              <input
                type="text"
                name="name"
                id="customername-field"
                className="form-control"
                value={validation.values.name || ""}
                readOnly
              />
            </div>
            {/** Customer email */}
            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
              {props.t("Email")}
              </label>
              <input
                type="email"
                name="email"
                id="email-field"
                value={validation.values.email || ""}
                className="form-control"
                readOnly
              />
            </div>
            {/** Customer username */}
            <div className="mb-3">
              <label htmlFor="username-field" className="form-label">
              {props.t("Username")}
              </label>
              <input
                type="text"
                name="username"
                id="username-field"
                value={validation.values.userName || ""}
                className="form-control"
                readOnly
              />
            </div>
            {/** Customer contact_no number */}
            <div className="mb-3">
              <label htmlFor="contact_no-field" className="form-label">
              {props.t("Contact Number")}
              </label>
              <input
                type="text"
                name="contact_no"
                id="contact_no-field"
                value={validation.values.contact_no || ""}
                className="form-control"
                readOnly
              />
            </div>
            {/** Customer Date of Birth */}
            <div className="mb-3">
              <label htmlFor="date_of_birth-field" className="form-label">
              {props.t("Date Of Birth")}
              </label>
              <input
                type="text"
                id="date_of_birth-field"
                name="date_of_birth"
                className="form-control"
                value={validation.values.date_of_birth || ""}
                readOnly
              />
            </div>
            {/** Customer Id proof no */}
            <div className="mb-3">
              <label htmlFor="id_proof_no-field" className="form-label">
              {props.t("Id Proof Number")}
              </label>
              <input
                type="text"
                id="id_proof_no-field"
                name="id_proof_no"
                className="form-control"
                value={validation.values.id_proof_no || ""}
                readOnly
              />
            </div>
            {/* certificate image */}
            <div className="mb-3">
              <label htmlFor="id_proof_image-field" className="form-label">
              {props.t("Id Proof Image")}
              </label>
              <div>
                <img
                  src={validation.values.id_proof_image || ""}
                  alt="id_proof Image"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            </div>
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
                {props.t("Close")}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(ListCustomerTable));
