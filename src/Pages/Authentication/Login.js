////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Login page functionality done over here.                             //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

/**IMPORTED FILES */
import { getSettingsPageData } from "../../helpers/ApiRoutes/getApiRoutes";
import withRouter from "../../components/Common/withRouter";
import logo from "../../assets/images/black-logo.png";
import { loginUser } from "../../store/actions";
import { clearResponseMessages } from "../../store/actions";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginpage_logo, setLoginPageLogo] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    "../../assets/images/bg.jpg"
  );
  const [app_name, setAppName] = useState("");

  /**THIS HOOK WILL RENDER INITIAL TIME */
  useEffect(() => {
    dispatch(clearResponseMessages());
    getAllData();
  }, []);

  /**
   * SET SETTINGS BACKGROUND IMAGE & LOGIN PAGE IMAGE & APPLICATION NAME
   */
  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setBackgroundImage(settingsData?.settingsPageData[0]?.loginpage_bg_image);
    setLoginPageLogo(settingsData?.settingsPageData[0]?.loginpage_logo);
    setAppName(settingsData?.settingsPageData[0]?.application_title);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // At the bigining unmounting
  useEffect(() => {
    document.body.className = "bg-pattern";
    document.body.style = `background-image: url('${backgroundImage}');`;
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  const dispatch = useDispatch();
  // Validation for login function
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      userName: "" || "",
      password: "" || "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required(props.t("Please Enter Your Username")),
      password: Yup.string().required(props.t("Please Enter Your Password")),
    }),
    onSubmit: (values) => {
      localStorage.setItem("userName", values.userName);
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  // Set error function
  const { error } = useSelector((state) => ({
    error: state.login.error,
  }));

  document.title = `${props.t("Login")} | ${app_name} `;
  return (
    <React.Fragment>
      <div className="bg-overlay"></div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xl={4}>
              <Card>
                <CardBody className="p-4">
                  <div>
                    <div className="text-center">
                      <Link to="/">
                        <img
                          src={loginpage_logo || logo}
                          alt=""
                          height="50"
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src={loginpage_logo || logo}
                          alt=""
                          height="50"
                          className="auth-logo logo-light mx-auto"
                        />
                      </Link>
                    </div>
                    <h4 className="font-size-18 text-muted mt-2 text-center">
                    {props.t("Welcome to")} {app_name} !
                    </h4>
                    <p className="mb-5 text-center">
                    {props.t("Sign in to continue with")} {app_name}.
                    </p>
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? (
                        <Alert color="danger">
                          <div>{error}</div>
                        </Alert>
                      ) : null}
                      <Row>
                        <Col md={12}>
                          <div className="mb-4">
                            <Label className="form-label">{props.t("Username")}</Label>
                            <Input
                              name="userName"
                              value={validation.values.userName || ""}
                              type="text"
                              placeholder={props.t("Enter User Name")}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.userName &&
                                validation.errors.userName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.userName &&
                            validation.errors.userName ? (
                              <FormFeedback type="invalid">
                                <div> {validation.errors.userName} </div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-4">
                            <Label className="form-label">{props.t("Password")}</Label>
                            <div
                              className={
                                !validation.errors.password ? "d-flex" : ""
                              }
                            >
                              <Input
                                name="password"
                                value={validation.values.password || ""}
                                // type="password"
                                type={showPassword ? "text" : "password"}
                                placeholder={props.t("Enter Password")}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type="invalid">
                                  <div> {validation.errors.password} </div>
                                </FormFeedback>
                              ) : null}
                              {!validation.errors.password ? (
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? (
                                    <i
                                      className="ri-eye-off-fill"
                                      style={{ fontSize: "15px" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="ri-eye-fill"
                                      style={{ fontSize: "15px" }}
                                    ></i>
                                  )}
                                </button>
                              ) : null}
                            </div>
                          </div>

                          <div className="d-grid mt-4">
                            <span className="text-muted">
                              <Link
                                to="/forgot-password"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  cursor: "pointer",
                                }}
                              >
                                <i className="mdi mdi-lock"></i>{props.t("Forgot your password")} ?
                              </Link>
                            </span>
                          </div>
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                            >
                              {props.t("Log In")}
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

// Exporting the login funtion to the router
export default withRouter(withTranslation()(Login));

// Default property
Login.propTypes = {
  history: PropTypes.object,
};
