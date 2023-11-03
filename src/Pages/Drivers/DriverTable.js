/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the drivers overall functionalities are coded in this file           //
//      The file contain the view all driver model, view particular driver data model      //
//      The object and functionalities are written in this file.                           //
/////////////////////////////////////////////////////////////////////////////////////////////

// Importing the react component
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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";

/**IMPORTED FILES */
import withRouter from "../../components/Common/withRouter";
import {
  addNewDriver,
  assignNewSP,
} from "../../helpers/ApiRoutes/addApiRoutes";
import {
  removeDriver,
  removeAssignedDriver,
  removeDriverWithServiceProvider,
} from "../../helpers/ApiRoutes/removeApiRoutes";
import {
  updateDriver,
  updateDriverStatus,
} from "../../helpers/ApiRoutes/editApiRoutes";
import {
  getDriversData,
  getSingleDriverData,
  getAssignedProviders,
} from "../../helpers/ApiRoutes/getApiRoutes";
import config from "../../config";

const ListTables = (props) => {
  const [drivers, setDrivers] = useState([]); // Array to store drivers
  const [driver, setDriver] = useState([]); // Array to store a single driver
  const [updateLiscenceImage, setUpdateLiscenceImage] = useState(""); // String to store the updated image
  const [updateProfileImage, setUpdateProfileImage] = useState("");
  const [modal_assign, setModal_assign] = useState(false); // Boolean to control delete modal visibility
  const [modal_list, setmodal_list] = useState(false); // Boolean to control list modal visibility
  const [add_list, setAdd_list] = useState(false); // Boolean to control add modal visibility
  const [assignSP, setAssignSP] = useState(false);
  const [view_modal, setView_modal] = useState(false); // Boolean to control view modal visibility
  const [profileImagePreview, setProfileImagePreview] = useState(false); // Boolean to control profile image preview visibility
  const [licenceImagePreview, setLicenceImagePreview] = useState(false); // Boolean to control license image preview visibility
  const [assignedSProviders, setAssignedSProviders] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState();
  const [sproviders, setSproviders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [module, setModule] = useState({});
  const [numberOfData, setNumberOfData] = useState(0);
  const [errors, setErrors] = useState("");
  const pageLimit = config.pageLimit;
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const [searchInp, setSearchInp] = useState("");
  const role_id = config.Role;

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    const data = JSON.parse(localStorage.getItem("authUser"));
    let user_Id = data[0]?.user[0]?.id;
    let role_Name = data[0]?.user[0]?.role_name;
    let rId = data[0]?.user[0]?.role_Id;
    setUserId(user_Id);
    setRole(role_Name);
    setRoleId(rId);
    getAllData(1);
  }, [userId, role, roleId]);

  // The below intialValues variable is used for having the data the driver. When we will use the edit button.
  // We are usign the add module for editing the driver. That is why if we are having data of a particular then
  // We will store this in the initialValues object
  const initialValues = {
    name: !add_list && driver ? driver[0]?.name : "",
    service_providers_id: "",
    email: !add_list && driver ? driver[0]?.email : "",
    contact_no: !add_list && driver ? driver[0]?.contact_no : "",
    emergency_contact_no:
      !add_list && driver ? driver[0]?.emergency_contact_no : "",
    date_of_birth: !add_list && driver ? driver[0]?.date_of_birth : "",
    licence_no: !add_list && driver ? driver[0]?.licence_no : "",
    profile_image: !add_list && driver ? driver[0]?.profile_image : "",
    licence_img: !add_list && driver ? driver[0]?.licence_img : "",
    description: !add_list && driver ? driver[0]?.description : "",
    updated_at: !add_list && driver ? driver[0]?.updated_at : "",
  };

  // The below unction will be used for the CRUD functionalites of he validation data.
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      values.licence_img = updateLiscenceImage;
      values.profile_image = updateProfileImage;
      if (add_list) {
        //add new
        addDriver(values);
      } else if (modal_assign) {
        assignNewProvider(values);
      } else {
        //update previes one
        editDriver(values);
      }
    },
  });

  // Define a function to handle the profile image change event
  const handleProfileImageChange = (event) => {
    // Get the selected file from the event
    const file = event.target.files[0];
    // Update the state variable 'updateImage' with the selected file
    setUpdateProfileImage(file);
    // Generate a preview URL for the selected image using the URL.createObjectURL method
    const previewURL = URL.createObjectURL(file);
    // Update the state variable 'profileImagePreview' with the preview URL
    setProfileImagePreview(previewURL);
  };

  // The function is desing the handle the chnage in profile image of the driver.
  const handleLicenceImageChange = (event) => {
    const file = event.target.files[0];
    setUpdateLiscenceImage(file);
    setLicenceImagePreview(URL.createObjectURL(file));
  };

  // function for open add and edit modal
  async function tog_list(param, productId) {
    setUpdateLiscenceImage("");
    setUpdateProfileImage("");
    // Toggle 'add_list' state if 'param' is 'ADD'
    if (param === "ADD") {
      // Reset profile and license image previews
      setProfileImagePreview(null);
      setLicenceImagePreview(null);
      setAdd_list(!add_list);
    } else {
      setDriver([]);
      // Find the driver data with matching 'productId' in the 'drivers' array
      let driverData = await getSingleDriverData(productId);
      // Set the 'driver' state to the found driver data
      setDriver(driverData);
      if (driverData && driverData.length > 0) {
        // Set profile and license image previews to driver's profile_image and licence_img
        setProfileImagePreview(driverData[0]?.profile_image);
        setLicenceImagePreview(driverData[0]?.licence_img);
      }
    }
    // Toggle 'modal_list' state
    setmodal_list(!modal_list);
  }

  // function for open view modal
  async function tog_view(productId) {
    let driver = await getSingleDriverData(productId);
    setDriver(driver);
    setView_modal(!view_modal);
  }

  // The below function is for the status button functionalities.
  function toggleStatus(button, driverID) {
    var currentStatus = button.innerText.trim();
    const driver = drivers.find((s) => s.id === driverID);
    updateDriverStatus(driver.id);
    if (currentStatus === "ACTIVE") {
      button.innerText = "INACTIVE";
      button.classList.remove("btn-success");
      button.classList.add("btn-danger");
      if (driver) {
        driver.status = "INACTIVE";
      }
    } else if (currentStatus === "INACTIVE") {
      button.innerText = "ACTIVE";
      button.classList.remove("btn-danger");
      button.classList.add("btn-success");
      if (driver) {
        driver.status = "ACTIVE";
      }
    }
  }

  // function for display assigned drivers modal
  async function toggleAssign(id) {
    let data = await getAssignedProviders(id);
    setSproviders(data?.notexist);
    setAssignedSProviders(data?.exist);
    setModal_assign(!modal_assign);
    setAssignSP(!assignSP);
    setSelectedDriver(id);
  }

  // function for get data all drivers data
  async function getAllData(page) {
    if (userId) {
      let getDrivers = await getDriversData(page || 1, userId);
      setDrivers(getDrivers?.drivers);
      setModule(getDrivers?.module[0]);
      setPageNumber(page);
      setNumberOfData(getDrivers?.totalCount);
    }
  }

  // function for add Driver
  async function addDriver(val) {
    let addDriver = await addNewDriver(val, userId);
    if (addDriver.code === 200) {
      setErrors("");
      setAdd_list(false);
      setmodal_list(false);
      getAllData(pageNumber);
    } else {
      setErrors("");
      setErrors(addDriver.message);
    }
  }

  // function for edit driver
  async function editDriver(data) {
    let updatedDriver = await updateDriver(driver[0]?.id, data);
    if (updatedDriver.code === 200) {
      setErrors("");
      setAdd_list(false);
      setmodal_list(false);
      getAllData(pageNumber);
    } else {
      setErrors("");
      setErrors(updatedDriver?.message);
    }
  }

  // function for remove driver
  async function remove_data(id) {
    // Call the 'removeDriver' function with 'id' parameter
    await removeDriver(id);
    window.location.reload();
  }

  async function uassign_remove_data(dId) {
    // Call the 'removeDriver' function with 'id' parameter
    await removeDriverWithServiceProvider(dId, userId);
    window.location.reload();
  }

  // function for assign sp
  async function assignNewProvider(val) {
    let assignSP = await assignNewSP(selectedDriver, val.service_providers_id);
    if (assignSP.code === 200) {
      setErrors("");
      let data = await getAssignedProviders(selectedDriver);
      setSproviders(data.notexist);
      setAssignedSProviders(data.exist);
      setSelectedDriver(selectedDriver);
      validation.values.service_providers_id = "";
    } else {
      setErrors("");
      setErrors(assignSP.message);
    }
  }

  // function for remove assigned to service provider
  async function removeAsigned(id) {
    await removeAssignedDriver(id);
    let data = await getAssignedProviders(selectedDriver);
    setSproviders(data.notexist);
    setAssignedSProviders(data.exist);
  }
  /**Filter data */
  const filteredDrivers = drivers?.filter(value => 
    value?.name.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
    value?.email.toLowerCase().includes(searchInp.toLowerCase().trim()) ||
    value?.contact_no.toLowerCase().includes(searchInp.toLowerCase().trim())
  );
  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  document.title = `${props.t("Drivers")} | ${pageTitle} `;
  return (
    <React.Fragment>
       <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid>
          {/* Header of the Page */}
          <Breadcrumbs title="Tables" breadcrumbItem={props.t("Drivers")} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                <div className="row align-items-md-center">
                  {/* Header of the Particular Card */}
                  <h4 className="card-title mb-0 col-md-8  p-3">{props.t("Add, Edit & Remove")}  <br/>  <span className="d-block mt-2 fs-16 text-success">{props.t("Total")} {numberOfData}</span></h4>
                  <form className="col-md-4">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={props.t("Search") + "..."}
                          aria-label="Recipient's username"
                          onChange={(e)=>setSearchInp(e.target.value)}
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
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
                        {/* The below element is for the 'Add' button. Which will be used for adding th customer */}
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
                            {/* These are the columns and column heading in the driver page */}
                            <th className="index" data-sort="index">
                              #
                            </th>
                            <th className="sort" data-sort="driver_name">
                            {props.t("Name")}
                            </th>
                            <th className="sort" data-sort="driver_email">
                              {props.t("Email")}
                            </th>
                            <th className="sort" data-sort="driver_phone">
                              {props.t("Contact Number")}
                            </th>
                            <th className="sort" data-sort="registered_date">
                              {props.t("Registered Date")}
                            </th>
                            {roleId === role_id.admin ? (
                              <>
                                <th className="sort" data-sort="status">
                                {props.t("Assign To")}
                                </th>
                                <th className="sort" data-sort="status">
                                  {props.t("Status")}
                                </th>
                              </>
                            ) : null}
                            <th className="sort" data-sort="action">
                            {props.t("Action")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {/* The data we will be getting to showcase on driver page is from an object. We will map and show them one by one. The below function will be used for this */}
                          {/* 'Driver' is having all the enquiry data. */}
                          {/* Index is the number of the data. i.e., Serial number */}
                          {filteredDrivers?.map((item, index) => (
                            <tr key={item.id}>
                              {/* Below we are initializing the driver data */}
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="driver_name">{item.name}</td>
                              <td className="driver_email">{item.email}</td>
                              <td className="driver_phone">
                                {item.contact_no}
                              </td>
                              <td className="registered_date">
                                {item.created_at}
                              </td>
                              {roleId === role_id.admin ? (
                                <>
                                  <td className="status">
                                    <button
                                      className="btn btn-sm btn-success status-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        toggleAssign(item.id);
                                      }}
                                    >
                                      {props.t("Assign")}
                                    </button>
                                  </td>
                                  <td className="status">
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
                                </>
                              ) : null}
                              {/* The below column will have the 3 buttons
                                                            1. View button
                                                            2. Edit button
                                                            3. Remove button
                                                        */}
                              <td>
                                <div className="d-flex gap-2">
                                  {/* This is the place from where we are calling the view button and function. */}
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
                                  {/* This is the place from where we are calling the edit button and function. */}
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => tog_list("EDIT", item.id)}
                                    >
                                      {props.t("Edit")}
                                    </button>
                                  </div>
                                  {/* This is the place from where we are calling the remove button and function. */}
                                  <div className="remove">
                                    {roleId === role_id.admin ? (
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => remove_data(item.id)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                      >
                                        Remove
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() =>
                                          uassign_remove_data(item.id)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                      >
                                        {props.t("Remove")}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* the below is having the code of the pagination of the page.
                                        The previous and next button are also in side this function */}
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

      {/* Add Driver or Edit Driver Modal */}
      {/* The below line is for the pop up of edit and add driver */}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          tog_list(add_list ? "ADD" : "EDIT");
        }}
        centered
      >
        {/* The below line is for the heading of pop up of edit and add driver */}
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            setmodal_list(false);
            setAdd_list(false);
          }}
        >
          {add_list ? `${props.t("Add Driver")}` : `${props.t("Edit Driver")}`}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {errors !== "" ? (
              <Alert color="danger">
                <div>{errors}</div>
              </Alert>
            ) : null}
            {/* The Below element is adding the name of the driver */}
            <div className="mb-3">
              <label htmlFor="driver-field" className="form-label">
              {props.t("Name")}
              </label>
              <input
                type="text"
                id="driver-field"
                className="form-control"
                name="name"
                value={validation.values.name || ""}
                onChange={validation.handleChange}
                placeholder={props.t("Enter Name")}
                required
              />
            </div>

            {/* The Below element is adding the email of the driver */}

            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
              {props.t("Email")}
              </label>
              <input
                type="email"
                id="email-field"
                className="form-control"
                name="email"
                value={validation.values.email || ""}
                onChange={validation.handleChange}
                placeholder={props.t("Enter Email")}
                required
              />
            </div>

            {/* The Below element is adding the contact number of the driver */}

            <div className="mb-3">
              <label htmlFor="contactNumber-field" className="form-label">
              {props.t("Contact Number")}
              </label>
              <input
                type="text"
                id="contactNumber"
                className="form-control"
                name="contact_no"
                value={validation.values.contact_no || ""}
                onChange={validation.handleChange}
                placeholder={props.t("Enter Contact Number")}
                required
              />
            </div>

            {/* The Below element is adding the emenrgency contact number of the driver */}
            <div className="mb-3">
              <label htmlFor="emergencyContactNumber" className="form-label">
              {props.t("Emergency Contact Number")}
              </label>
              <input
                type="text"
                id="emergencyContactNumber"
                className="form-control"
                name="emergency_contact_no"
                value={validation.values.emergency_contact_no || ""}
                onChange={validation.handleChange}
                placeholder={props.t("Enter Emergency Contact Number")}
                required
              />
            </div>

            {/* The Below element is adding the date of birth of the driver */}
            <div className="mb-3">
              <label htmlFor="date_of_birth-field" className="form-label">
              {props.t("Date Of Birth")}
              </label>
              <Flatpickr
                className="form-control"
                name="date_of_birth"
                options={{
                  dateFormat: "d-m-Y",
                  // maxDate :new Date(),
                  maxDate: new Date(
                    new Date().getFullYear() - 18,
                    new Date().getMonth(),
                    new Date().getDate()
                  ), // Max date is 18 years ago
                }}
                value={validation.values.date_of_birth || ""}
                onChange={(dates) =>
                  validation.setFieldValue("date_of_birth", dates[0])
                }
                placeholder={props.t("Select Date")}
              />
            </div>

            {/* Profile Photo Or Image of the driver*/}
            <label htmlFor="profileImage" className="form-label">
            {props.t("Profile Image")}
            </label>
            {profileImagePreview && (
              <div>
                {/* <h5>Id Proof Preview:</h5> */}
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            )}
            <div className="mb-3">
              <input
                className="form-control"
                name="profile_image"
                type="file"
                placeholder={props.t("Profile Image")}
                onChange={handleProfileImageChange}
              />
            </div>

            {/* The Below element is adding the licence number of the driver */}
            <div className="mb-3">
              <label htmlFor="idNumber" className="form-label">
              {props.t("Licence Number")}
              </label>
              <input
                type="text"
                id="idNumber"
                className="form-control"
                name="licence_no"
                value={validation.values.licence_no || ""}
                onChange={validation.handleChange}
                placeholder={props.t("Enter License Number")}
                required
              />
            </div>

            {/* Licence Photo Or Image of the driver*/}

            <label htmlFor="licenceImage" className="form-label">
            {props.t("Licence Image")}
            </label>
            {licenceImagePreview && (
              <div>
                <img
                  src={licenceImagePreview}
                  alt="Licence Preview"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            )}
            <div className="mb-3">
              <input
                className="form-control"
                name="licence_image"
                type="file"
                placeholder={props.t("Profile Image")}
                onChange={handleLicenceImageChange}
              />
            </div>

            {/* The Below element is adding the description of the driver */}
            <div className="mb-3">
              <label htmlFor="idProofImage" className="form-label">
              {props.t("Description")}:
              </label>
              <input
                type="text"
                id="idProofImage"
                className="form-control"
                name="description"
                placeholder={props.t("Enter Description")}
                value={validation.values.description || ""}
                onChange={validation.handleChange}
                required
              />
            </div>
          </ModalBody>
          {/* Here all the element will be done*/}
          {/* All the buttons are add from the footer */}
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              {/* Closed Button */}
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setmodal_list(false);
                  setAdd_list(false);
                }}
              >
                {props.t("Close")}
              </button>
              {/* Add Driver or Update Driver button */}
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={() => {
                  window.location.href = "#exampleModalLabel"; // Change the URL here
                }}
              >
                {add_list ? props.t("Add Driver") : props.t("Update Driver")}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* This is the view button model. We will get all the details of a particular driver */}
      <Modal
        className="extra-width"
        isOpen={view_modal}
        toggle={() => {
          setView_modal(false);
        }}
      >
        {/* The below line is for the heading of pop up of view driver */}
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            setView_modal(false);
          }}
        >
          {props.t("View Driver")}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {/* The Below element is displaying the name of the driver */}
            <div className="mb-3">
              <label htmlFor="drivername-field" className="form-label">
              {props.t("Name")}
              </label>
              <input
                type="text"
                name="name"
                id="drivername-field"
                className="form-control"
                value={validation.values.name || ""}
                readOnly
              />
            </div>

            {/* The Below element is displaying the email of the driver */}
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

            {/* The below element is displaying the contact number of the driver */}
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

            {/* The Below element is displaying the emergency contact number of the driver */}
            <div className="mb-3">
              <label
                htmlFor="emergency_contact_no-field"
                className="form-label"
              >
                {props.t("Emergency Contact Number")}
              </label>
              <input
                type="text"
                name="emergency_contact_no"
                id="emergency_contact_no-field"
                value={validation.values.emergency_contact_no || ""}
                className="form-control"
                readOnly
              />
            </div>

            {/* The Below element is displaying the emergency date of birth of the driver */}
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

            {/* The Below element is displaying the licence number of the driver */}
            <div className="mb-3">
              <label htmlFor="licence_number-field" className="form-label">
              {props.t("Licence Number")}
              </label>
              <input
                type="text"
                id="licence_number-field"
                name="licence_number"
                className="form-control"
                value={validation.values.licence_no || ""}
                readOnly
              />
            </div>

            {/* The Below element is displaying the description of the driver */}
            <div className="mb-3">
              <label htmlFor="description-field" className="form-label">
              {props.t("Description")}
              </label>
              <input
                type="text"
                id="description-field"
                name="description"
                className="form-control"
                value={validation.values.description || ""}
                readOnly
              />
            </div>

            {/* Profile image of the image*/}
            <div className="mb-3">
              <label htmlFor="profile_image-field" className="form-label">
              {props.t("Profile Image")}
              </label>
              <div>
                <img
                  src={validation.values.profile_image || ""}
                  alt="id_proof Image"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            </div>

            {/* Licensce image of the driver */}
            <div className="mb-3">
              <label htmlFor="licence_image-field" className="form-label">
              {props.t("Licence Image")}
              </label>
              <div>
                <img
                  src={validation.values.licence_img || ""}
                  alt="id_proof Image"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            </div>
          </ModalBody>{" "}
          {/* Here all the element will be done*/}
          {/* All the buttons are add from the footer */}
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

      {/* This is the assign button model. We will assign the particular driver. */}
      <Modal
        className="extra-width"
        isOpen={modal_assign}
        toggle={() => {
          toggleAssign();
        }}
        centered
      >
        <ModalHeader
           className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            setModal_assign(false);
          }}
        >
          {props.t("Assign To Provider")}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {errors !== "" ? (
              <Alert color="danger">
                <div>{errors}</div>
              </Alert>
            ) : null}
            {/* The Below element is adding the name of the service rpovider */}
            <div className="mb-3">
              <label htmlFor="provider-field" className="form-label">
              {props.t("Service Provider Name")}
              </label>
              <select
                data-trigger
                name="service_providers_id"
                id="provider-field"
                className="form-control"
                value={validation.values.service_providers_id || ""}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              >
                <option value="">{props.t("Select Service Provider")}</option>
                {sproviders?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <table
                className="table align-middle table-nowrap"
                id="assignedProvider"
              >
                <thead className="table-light">
                  <tr>
                    <th className="index" data-sort="index">
                      #
                    </th>
                    <th className="sort" data-sort="provider_name">
                    {props.t("Provider Name")}
                    </th>
                    <th className="index" data-sort="action">
                      {props.t("Action")}
                    </th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {assignedSProviders?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button
                          onClick={() => {
                            removeAsigned(item.id);
                          }}
                          className="btn btn-sm btn-danger remove-item-btn"
                          data-bs-toggle="modal"
                          type="button"
                          data-bs-target="#deleteRecordModal"
                        >
                          {props.t("Remove")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setModal_assign(false);
                }}
              >
                {props.t("Close")}
              </button>
              {/* Assign Driver to provider */}
              <button type="submit" className="btn btn-success" id="add-btn">
                {props.t("Assign")}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(ListTables));
