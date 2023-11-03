////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       about page functionality done over here.                             //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { Alert, Card, CardBody, Col, Row, Container } from "reactstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
//IMPORTED FILES
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAboutUsPageData } from "../../helpers/ApiRoutes/getApiRoutes";
import { updateAboutUsPage } from "../../helpers/ApiRoutes/editApiRoutes";
import withRouter from "../../components/Common/withRouter";

const AboutUS = (props) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadImage, setUploadImage] = useState("");
  const [aboutPage_data, setAboutPage_data] = useState([]);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [pageTitle, setPageTitle] = useState("KailPlus");

  const location = useLocation();
  const pathName = location.pathname.split("/");
  const desiredPart = pathName[pathName.length - 1];

  /**THIS HOOK WILL RENDER INITIAL TIME */
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settingsData"));
    setPageTitle(settings?.application_title);
    getAllData();
  }, []);
  useEffect(() => {
    setImagePreview(aboutPage_data[0]?.image);
  }, [aboutPage_data]);
  const navigate = useNavigate();

  // function for get data all
  async function getAllData() {
    const aboutUsData = await getAboutUsPageData(desiredPart);
    if (aboutUsData?.code === 200) {
      setAboutPage_data(aboutUsData?.data);
    } else {
      navigate(`/pages-500`);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**INITIAL VALUES */
  const initialValues = {
    id : aboutPage_data[0]?.id,
    title : aboutPage_data[0]?.title || "",
    caption : aboutPage_data[0]?.caption || "",
    description : aboutPage_data[0]?.description || "",
    image : aboutPage_data[0]?.image || "",
  };

  /**VALIDATION */
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      
      values.image = uploadImage;
      let updateAboutUs = await updateAboutUsPage(values,values.id);
      if (updateAboutUs.code === 200) {
        setErrors("");
        setSuccess(updateAboutUs?.message);
        scrollToTop();
      } else {
        setErrors("");
        setErrors(updateAboutUs?.message);
        scrollToTop();
      }
    },
  });

  /**BACKGROUND IMAGE */
  const handleLoginPageBackgroundChange = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const { dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));

  document.title = `${props.t("About Us")} | ${pageTitle} `;
  return (
    <React.Fragment>
      <div className={`page-content ${dir === 'rtl' ? 'page-content-rtl' : ''}`}>
        <Container fluid={true}>
          <Breadcrumbs title={props.t("Forms")} breadcrumbItem={props.t("About Us")} />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  {errors !== "" ? (
                    <Alert color="danger">
                      <div>{errors}</div>
                    </Alert>
                  ) : null}
                  {success !== "" ? (
                    <Alert color="success">
                      <div>{success}</div>
                    </Alert>
                  ) : null}
                  <form onSubmit={validation.handleSubmit}>
                    {/* Title */}
                    <Row className="mb-3">
                      <label
                        htmlFor="title"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Title")} <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={props.t("Enter Title")}
                          name="title"
                          value={validation.values.title || ""}
                          onChange={validation.handleChange}
                          required
                        />
                      </div>
                    </Row>

                    {/* Caption */}
                    <Row className="mb-3">
                      <label
                        htmlFor="caption"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Caption")} <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Caption"
                          name="caption"
                          value={validation.values.caption || ""}
                          onChange={validation.handleChange}
                          required
                        />
                      </div>
                    </Row>

                    {/* Description */}
                    <Row className="mb-3">
                      <label
                        htmlFor="description"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Description")} <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <div className="col-md-10">
                        <textarea
                          className="form-control"
                          placeholder="Enter Description"
                          name="description"
                          value={validation.values.description || ""}
                          style={{ height: "150px" }}
                          onChange={validation.handleChange}
                          required
                        />
                      </div>
                    </Row>

                    {/* Image */}
                    <Row className="mb-3">
                      <label
                        htmlFor="image"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Image")} <span style={{ color: "red" }}>*</span>{" "}
                      </label>
                      <div className="col-md-10">
                        {imagePreview && (
                          <div>
                            <img
                              src={imagePreview}
                              alt="Image Preview"
                              style={{ maxWidth: "100px" }}
                            />
                          </div>
                        )}
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          onChange={handleLoginPageBackgroundChange}
                        />
                      </div>
                    </Row>

                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="add-btn"
                      >
                        {props.t("Submit")}
                      </button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(AboutUS));
