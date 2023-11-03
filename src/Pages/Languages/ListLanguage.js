////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Language page functionality done over here.                          //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
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
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";

/**IMPORTED FILES */
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { addNewLanguage } from "../../helpers/ApiRoutes/addApiRoutes";
import { updateLanguage } from "../../helpers/ApiRoutes/editApiRoutes";
import { removeLanguage } from "../../helpers/ApiRoutes/removeApiRoutes";
import { updateLanguageStatus } from "../../helpers/ApiRoutes/editApiRoutes";
import withRouter from "../../components/Common/withRouter";
import {
  getLanguagesPageData,
  getSingleLanguageData,
} from "../../helpers/ApiRoutes/getApiRoutes";
import config from "../../config";

const LanguageDeatails = (props) => {
  const [modal_list, setmodal_list] = useState(false);
  const [languages, setLanguges] = useState([]);
  const [add_list, setAdd_list] = useState(false);
  const [language, setLanguge] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfData, setNumberOfData] = useState(0);
  const [errors, setErrors] = useState("");
  const [pageTitle, setPageTitle] = useState("KailPlus");
  const [lng_file, setLngFile] = useState(null);

  /**PAGE LIMIT */
  const pageLimit = config.pageLimit;

  // THIS HOOK RENDERING INITIAL TIME TAKING FOR ALL LANGUGE DATA
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings.application_title);
    getAllData(1);
  }, []);

  async function tog_list(param, productId) {
    if (param === "ADD") {
      setErrors("");
      setAdd_list(!add_list);
    } else {
      setErrors("");
      let languageData = await getSingleLanguageData(productId);
      setLanguge(languageData.language);
    }
    setmodal_list(!modal_list);
  }
  // INITIALVALUES
  const initialValues = {
    name: !add_list ? language[0]?.name : "",
    abbreviation: !add_list ? language[0]?.abbreviation : "",
    language_file: !add_list ? language[0]?.file : "",
  };

  /**VALIDATION */
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      values.language_file = lng_file;
      if (add_list) {
        //add new
        addLanguage(values);
      } else {
        //update previes one
        editLanguage(values);
      }
    },
  });
  /**FOR CHANGING LANGUAGE STATUS */
  function toggleStatus(button, lngId) {
    var currentStatus = button.innerText.trim();
    const language = languages.find((d) => d.id === lngId);
    updateLanguageStatus(language.id);
    if (currentStatus === "ACTIVE") {
      button.innerText = "INACTIVE";
      button.classList.remove("btn-success");
      button.classList.add("btn-danger");
      if (language) {
        language.status = "INACTIVE";
      }
    } else if (currentStatus === "INACTIVE") {
      button.innerText = "ACTIVE";
      button.classList.remove("btn-danger");
      button.classList.add("btn-success");
      if (language) {
        language.status = "ACTIVE";
      }
    }
  }

  // ADD LANGUAGE
  async function addLanguage(val) {
    let addLng = await addNewLanguage(val);
    if (addLng.code === 200) {
      setErrors("");
      setAdd_list(false);
      setmodal_list(false);
      getAllData(pageNumber);
    } else {
      setErrors("");
      setErrors(addLng.message);
    }
  }

  // UPDATE LANGUAGE
  async function editLanguage(data) {
    let updateLng = await updateLanguage(language[0]?.id, data);
    if (updateLng.code === 200) {
      setErrors("");
      setAdd_list(false);
      setmodal_list(false);
      getAllData(pageNumber);
    } else {
      setErrors("");
      setErrors(updateLng.message);
    }
  }

  // GET LANGUAGE DATA
  async function getAllData(page) {
    let getLanguages = await getLanguagesPageData(page || 1);
    setLanguges(getLanguages?.languages);
    setPageNumber(page);
    setNumberOfData(getLanguages?.totalCount);
  }

  const handleLanguageFile = (event) => {
    const file = event.target.files[0];
    setLngFile(file);
  };

  /**REMOVING LANGUAGE*/
  async function remove_data(id) {
    let lng = await removeLanguage(id);
    if (lng.code === 200) {
      getAllData(pageNumber);
    }
  }
  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  document.title = `${props.t("Language")} | ${pageTitle} `;
  return (
    <React.Fragment>
     <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid>
          <Breadcrumbs title={props.t("Tables")} breadcrumbItem={props.t("Languages")} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div id="List">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1">
                          {/* <Button color="success" className="add-btn" onClick={() => tog_list('ADD')} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button> */}
                        </div>
                      </Col>
                    </Row>
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
                            <th className="sort" data-sort="name">
                            {props.t("Name")}
                            </th>
                            <th className="sort" data-sort="abbreviation">
                              {props.t("Abbreviation")}
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
                          {languages?.map((item, index) => (
                            <tr key={item.id}>
                              <th scope="row">
                                {index + 1 + (pageNumber - 1) * pageLimit}
                              </th>
                              <td className="name">{item.name}</td>
                              <td className="abbreviation">
                                {item.abbreviation}
                              </td>
                              <td className="created_at">{item.created_at}</td>
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
                              <td>
                                <div className="remove">
                                  <button
                                    className="btn btn-sm btn-danger remove-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteRecordModal"
                                    onClick={() => remove_data(item?.id)}
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
                        <ul className="pagination listjs-pagination mb-0"></ul>
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

      {/*********** Add Modal ******************/}
      <Modal
        className="extra-width"
        isOpen={modal_list}
        toggle={() => {
          setmodal_list(false);
          setAdd_list(false);
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={() => {
            setmodal_list(false);
            setAdd_list(false);
          }}
        >
          {add_list ? "Add language" : "Edit language"}
        </ModalHeader>
        <form className="tablelist-form" onSubmit={validation.handleSubmit}>
          <ModalBody>
            {errors !== "" ? (
              <Alert color="danger">
                <div>{errors}</div>
              </Alert>
            ) : null}
            <div>
              <div className="mb-3">
                <label htmlFor="languagename-field" className="form-label">
                {props.t("Name")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={validation.values.name || ""}
                  onChange={validation.handleChange}
                  placeholder={props.t("Enter  Name")}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="abb-field" className="form-label">
                {props.t("Abbreviation")}
                </label>
                <input
                  type="text"
                  name="abbreviation"
                  className="form-control"
                  placeholder={props.t("Enter Abbreviation")}
                  value={validation.values.abbreviation || ""}
                  onChange={validation.handleChange}
                  required
                />
              </div>
              {add_list ? (
                <div className="mb-3">
                  <label htmlFor="languagefile-field" className="form-label">
                  {props.t("Language File")}
                  </label>
                  <input
                    type="file"
                    id="languagefile-field"
                    name="language_file"
                    className="form-control"
                    onChange={handleLanguageFile}
                    required
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <label htmlFor="languagefile-field" className="form-label">
                  {props.t("Language File")}
                  </label>
                  <input
                    type="file"
                    id="languagefile-field"
                    name="language_file"
                    className="form-control"
                    onChange={handleLanguageFile}
                  />
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
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
              <button type="submit" className="btn btn-success" id="add-btn">
                {add_list ? "Add language" : "Update language"}
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(LanguageDeatails));
