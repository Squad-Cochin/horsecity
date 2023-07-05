import PropTypes from "prop-types";
import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
// import { loginAPI }  from '../../helpers/AuthType/apiRoutes';
// import logodark from "../../assets/images/logo-dark.png";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
// import { GoogleLogin } from "react-google-login";
// // import TwitterLogin from "react-twitter-auth"
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
// import { loginUser, socialLogin } from "../../store/actions";
import { loginUser } from "../../store/actions";


//Import config
// import { facebook, google } from "../../config";

const Login = props => {
  document.title = "Login | HORSCITY";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userName: "Saurabh1997" || '',
      password: "Asdf$1234" || '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
      // loginAPI(values)
    }
  });

  const { error } = useSelector(state => ({
    error: state.login.error,
  }));

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(loginUser(values, props.router.navigate));
  // };

  // const signIn = (res, type) => {
  //   if (type === "google" && res) {
  //     const postData = {
  //       name: res.profileObj.name,
  //       email: res.profileObj.email,
  //       token: res.tokenObj.access_token,
  //       idToken: res.tokenId,
  //     };
  //     dispatch(socialLogin(postData, props.router.navigate, type));
  //   } else if (type === "facebook" && res) {
  //     const postData = {
  //       name: res.name,
  //       email: res.email,
  //       token: res.accessToken,
  //       idToken: res.tokenId,
  //     };
  //     dispatch(socialLogin(postData, props.router.navigate, type));
  //   }
  // };

  //handleGoogleLoginResponse
  // const googleResponse = response => {
  //   signIn(response, "google");
  // };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  // const facebookResponse = response => {
  //   signIn(response, "facebook");
  // };

  useEffect(() => {
    document.body.className = "bg-pattern";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

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
                        src={logo}
                        alt=""
                        height="50"
                        className="auth-logo logo-dark mx-auto"
                      />
                      <img
                        src={logo}
                        alt=""
                        height="50"
                        className="auth-logo logo-light mx-auto"
                      />
                    </Link>
                  </div>
                  <h4 className="font-size-18 text-muted mt-2 text-center">
                    Welcome to Horscity !
                  </h4>
                  <p className="mb-5 text-center">
                    Sign in to continue with Horscity.
                  </p>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    {error ? <Alert color="danger"><div>{error}</div></Alert> : null}
                    <Row>
                      <Col md={12}>
                      <div className="mb-4">
                          <Label className="form-label">Username</Label>
                          <Input
                            name="userName"
                            value={validation.values.userName || ""}
                            type="text"
                            placeholder="Enter User name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.userName && validation.errors.userName ? true : false
                            }
                          />
                          {validation.touched.userName && validation.errors.userName ? (
                            <FormFeedback type="invalid"><div> {validation.errors.userName} </div></FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid"><div> {validation.errors.password} </div></FormFeedback>
                          ) : null}
                        </div>

                        {/* <Row> */}
                          {/* <Col>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-label form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>
                          </Col> */}
                          {/* <Col className="col-7"> */}
                            <div className="d-grid mt-4">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock"></i> Forgot your
                                password?
                              </Link>
                            </div>
                          {/* </Col> */}
                        {/* </Row> */}
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                        {/* <div className="mt-4 text-center">
                      <h5 className="font-size-14 mb-3">Sign in with</h5>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <FacebookLogin
                            appId={facebook.APP_ID}
                            autoLoad={false}
                            callback={facebookResponse}
                            render={renderProps => (
                              <Link
                                to="#"
                                className="social-list-item bg-primary text-white border-primary"
                                onClick={renderProps.onClick}
                              >
                                <i className="mdi mdi-facebook" />
                              </Link>
                            )}
                          />
                        </li>

                        <li className="list-inline-item">
                          <GoogleLogin
                            clientId={google.CLIENT_ID}
                            render={renderProps => (
                              <Link
                                to="#"
                                className="social-list-item bg-danger text-white border-danger"
                                onClick={renderProps.onClick}
                              >
                                <i className="mdi mdi-google" />
                              </Link>
                            )}
                            onSuccess={googleResponse}
                            onFailure={() => { }}
                          />
                        </li>
                      </ul>
                    </div> */}

                      </Col>
                    </Row>
                  </Form>
                </div>
              </CardBody>
            </Card>
            {/* <div className="mt-5 text-center">
              <p className="text-white-50">
                Don't have an account ?{" "}
                <Link to="/register" className="fw-medium text-primary">
                  {" "}
                  Register{" "}
                </Link>{" "}
              </p>
              <p className="text-white-50">
                © {new Date().getFullYear()} Upzet. Crafted with{" "}
                <i className="mdi mdi-heart text-danger"></i> by Themesdesign
              </p>
            </div> */}
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
