/////////////////////////////////////////////////////////////////////////////////////////////
//      The design of the vehicles images overall functionalities are coded in this file   //
//      The file contain the view all images of a particular vehicle data model            //
//      The object and functionalities are written in this file.                           //
/////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
} from "reactstrap";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";

//IMPORTED FILES
import { getVehicleImageData } from "../../helpers/ApiRoutes/getApiRoutes";
import { removeVehicleImage } from "../../helpers/ApiRoutes/removeApiRoutes";
import { addNewImage } from "../../helpers/ApiRoutes/addApiRoutes";
import { updateVechileImageStatus } from "../../helpers/ApiRoutes/editApiRoutes";
import withRouter from "../../components/Common/withRouter";
import config from "../../config";
const ListVehicleImages = (props) => {
  const [vhImages, setVhImages] = useState([]); // State variable to store vehicle images
  const [image_view, setImageView] = useState(""); // State variable to store the image view
  const [modal_list, setmodal_list] = useState(false); // State variable to control list modal visibility
  const [updateImage, setUpdateImage] = useState(""); // State variable to store the updated image
  const [errors, setErrors] = useState("");
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL using the 'useParams' hook
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const pageLimit = config?.pageLimit;
  /**This hook will render initial time */
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    if (id) {
      getAllData(1);
    }
  }, []);

  // The intial values of the variables
  const initialValues = {
    title: "",
    image: "",
  };

  // function for get data all Vechile data
  async function getAllData(page) {
    let getvehicleImages = await getVehicleImageData(page || 1, id);
    setVhImages(getvehicleImages?.images);
    setPageNumber(page);
    setNumberOfData(getvehicleImages?.totalCount);
  }

  // The below function is showing the data.
  function tog_list() {
    setErrors("");
    setUpdateImage("");
    validation.values.title = "";
    setmodal_list(!modal_list);
    setImageView("");
  }

  // The below function is for going to the previous page
  const previousPage = () => {
    window.history.back(); // Go back to the previous page
  };

  // The below function is for change the vehicle image
  const handleVehicleImageChange = (event) => {
    const file = event.target.files[0];
    setUpdateImage(file);
    setImageView(URL.createObjectURL(file));
  };

  const validation = useFormik({
    enableReinitialize: true, // Flag to enable reinitialization of initial values
    initialValues, // Initial values for the form
    onSubmit: (values) => {
      values.image = updateImage; // Assign the updated image file to the 'file' field in form values
      addVechileImage(values);
    },
  });

  async function addVechileImage(val) {
    let addImg = await addNewImage(val, id);
    if (addImg.code === 200) {
      setErrors("");
      setmodal_list(false);
      validation.values.title = ""; // Reset the 'image_title' field in initial values
      getAllData(pageNumber);
    } else {
      setErrors("");
      setErrors(addImg.message);
    }
  }

  // The below function is the Status button
  function toggleStatus(button, vehiclesId) {
    var currentStatus = button.innerText.trim();
    const vehicle = vhImages.find((v) => v.id === vehiclesId);
    updateVechileImageStatus(vehicle.id);
    if (currentStatus === "ACTIVE") {
      button.innerText = "INACTIVE";
      button.classList.remove("btn-success");
      button.classList.add("btn-danger");
      if (vehicle) {
        vehicle.status = "INACTIVE";
      }
    } else if (currentStatus === "INACTIVE") {
      button.innerText = "ACTIVE";
      button.classList.remove("btn-danger");
      button.classList.add("btn-success");
      if (vehicle) {
        vehicle.status = "ACTIVE";
      }
    }
  }

  /**This function is used to remove a service provider*/
  async function remove_data(id) {
    await removeVehicleImage(id);
    getAllData(pageNumber);
  }

    /**Filter data */
  // const filteredVehicleImage = vhImages?.filter(value =>
  //     value?.title?.toLowerCase().includes(searchInp.toLowerCase().trim()) 

  // );

  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  document.title = `${props.t("Vehicle images")} | ${pageTitle} `;

  return (
    <React.Fragment>
      {id > 0 ? (
        <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
          <Container fluid>
            <div id="customerList">
         
              <Row className="g-4 mb-3">
                <Col className="col-sm-auto">
                  <div className="d-flex gap-1">
                    <Button
                      color="primary"
                      className="add-btn"
                      onClick={previousPage}
                      id="previous-btn"
                    >
                      <i className="ri-arrow-left-line align-bottom me-1"></i>{" "}
                      {props.t("Vehicle List")}
                    </Button>
                    {/* The below button is for add the vehicle */}
                    <Button
                      color="success"
                      className="add-btn"
                      onClick={() => tog_list()}
                      id="create-btn"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> {props.t("Add")}
                    </Button>
                   

                    {/* <div className="row align-items-md-center">
                    <h4 className="card-title mb-0 col-md-8  p-3">
          
                    </h4>
                    <form className="col-md-4">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search ..."
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
                  </div> */}

                  </div>
                  <br/>  <span className="d-block mt-2 fs-16 text-success">{props.t("Total")} {numberOfData}</span>
                </Col>
              </Row>

              <div className="table-responsive table-card mt-3 mb-1">
                <table
                  className="table align-middle table-nowrap"
                  id="customerTable"
                >
                  <thead className="table-light">
                    <tr>
                      {/* These are the columns and column headings in the vehicle page */}
                      <th className="index" data-sort="index">
                        #
                      </th>
                      <th className="sort" data-sort="vehicleimage">
                      {props.t("Image")}
                      </th>
                      <th className="sort" data-sort="vehicletitle">
                      {props.t("Title")}
                      </th>
                      <th className="sort" data-sort="created_at">
                      {props.t("Created At")}
                      </th>
                      <th className="sort" data-sort="status">
                      {props.t("Status")}
                      </th>
                      <th className="sort" data-sort="action">
                      {props.t("Action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list form-check-all">
                    {vhImages?.map((imageItem, index) => (
                      <tr key={index}>
                        <th scope="row">
                          {index + 1 + (pageNumber - 1) * pageLimit}
                        </th>
                        <td className="vehicleimage">
                          <img
                            src={imageItem?.url}
                            alt={`Static Image ${index + 1}`}
                            className="image-size"
                          />
                        </td>
                        <td className="vehicletitle">{imageItem?.title}</td>
                        <td className="created_at">{imageItem?.uploaded_at}</td>
                        <td>
                          {imageItem.status === "ACTIVE" ? (
                            <button
                              className="btn btn-sm btn-success status-item-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#showModal"
                              onClick={(event) =>
                                toggleStatus(event.target, imageItem.id)
                              }
                            >
                              {imageItem.status}
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-danger status-item-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#showModal"
                              onClick={(event) =>
                                toggleStatus(event.target, imageItem.id)
                              }
                            >
                              {imageItem.status}
                            </button>
                          )}
                        </td>
                        {/* This is the place from where we are calling the Remove button and function */}
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-danger remove-item-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteRecordModal"
                              onClick={() => remove_data(imageItem?.id)}
                            >
                              {props.t("Remove")}
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
          </Container>
        </div>
      ) : null}

      {/* Add vehicle image Modal */}
      {/* The below line is for the heading of pop up of edit or add vehicle image */}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        {/* The below line is for the heading of pop up of edit and add driver */}
        <ModalHeader
          className={`bg-light p-3 ${dir === 'rtl' ? 'exampleModalLabel-rtl' : ''}`}
          id="exampleModalLabel"
          toggle={() => {
            tog_list();
          }}
        >
          {props.t("Add Image")}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {errors !== "" ? (
              <Alert color="danger">
                <div>{errors}</div>
              </Alert>
            ) : null}
            {/* The Below element is adding the title of the image of the vehicle. It will be taken when it is uploaded */}
            {/* Done by Shaheer */}
            <div className="mb-3">
              <label htmlFor="customerName-field" className="form-label">
                {" "}
                {props.t("Image Title")}
              </label>
              <input
                type="text"
                name="title"
                id="customerName-field"
                className="form-control"
                value={validation.values.title}
                placeholder={props.t("Enter image title")}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                required
              />
            </div>
            {/* The Below element is uploading the image of the vehicle. */}
            <div className="mb-3">
              <label htmlFor="vehicleimage-field" className="form-label">
              {props.t("Add Image")}
              </label>
              <div className="col-md-10">
                <div>
                  {image_view && (
                    <img
                      src={image_view}
                      alt="Vehicle Image Preview"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </div>
                <input
                  className="form-control"
                  name="vehicle_image"
                  type="file"
                  placeholder="Vehicle Image"
                  onChange={handleVehicleImageChange}
                />
              </div>
            </div>
          </ModalBody>{" "}
          {/* Here all the element will be done*/}
          <ModalFooter>
            {" "}
            {/* All the buttons are add from the footer */}
            {/* Close Button */}
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setmodal_list(false);
                }}
              >
                {props.t("Close")}
              </button>

              {/* Add image Button */}
              <button type="submit" className="btn btn-success" id="add-btn">
              {props.t("Add Image")}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(ListVehicleImages));