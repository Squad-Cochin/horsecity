import PropTypes from "prop-types";
import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
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
import { updateNewPwd } from "../../store/actions";

import { logoutUser } from "../../store/actions";

//Import config
// import { facebook, google } from "../../config";

const ChangePassword = props => {
  document.title = "Change-Password | HORSCITY";


  // const { isUserLogout } = useSelector((state) => ({
  //   isUserLogout: state.login.isUserLogout,
  // }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);


  
  const { user } = useSelector(state => ({
    user: state.login.user,
  }));

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      oldPassword: "" || '',
      password: "" || '',
      confirmPassword : "" || '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please Enter Your Old password"),
      password: Yup.string().required("Please Enter Your Password"),
      confirmPassword: Yup.string().required("Please Enter Your Confirm Password"),
    }),
    onSubmit: (values) => {
    let username = user[0].user_name
    let updatePwdValues =   {
        userName : username,// 
        password : values.oldPassword,
        newpassword : values.password,
        confirmnewpassword : values.confirmPassword
      }

      dispatch(updateNewPwd(updatePwdValues));
    }
  });

  const { error } = useSelector(state => ({
    error: state.login.error,
  }));

  console.log("Errr",error);
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
                    Change Password
                  </h4>
                  <p className="mb-5 text-center">
                    Update password to continue with Horscity.
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
                          <Label className="form-label">Old password</Label>
                          <Input
                            name="oldPassword"
                            value={validation.values.oldPassword || ""}
                            type="text"
                            placeholder="Enter Old Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.oldPassword && validation.errors.oldPassword ? true : false
                            }
                          />
                          {validation.touched.oldPassword && validation.errors.oldPassword ? (
                            <FormFeedback type="invalid"><div> {validation.errors.oldPassword} </div></FormFeedback>
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

                        <div className="mb-4">
                          <Label className="form-label">Confirm Password</Label>
                          <Input
                            name="confirmPassword"
                            value={validation.values.confirmPassword || ""}
                            type="password"
                            placeholder="Enter Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.confirmPassword && validation.errors.confirmPassword ? true : false
                            }
                          />
                          {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                            <FormFeedback type="invalid"><div> {validation.errors.confirmPassword} </div></FormFeedback>
                          ) : null}
                        </div>


                        {/* <Row>
                          <Col>
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
                          </Col>
                          <Col className="col-7">
                            <div className="text-md-end mt-3 mt-md-0">
                              <Link
                                to="/auth-recoverpw"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock"></i> Forgot your
                                password?
                              </Link>
                            </div>
                          </Col>
                        </Row> */}
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Update Password
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
            <div className="mt-5 text-center">
                <p className="text-white-50">Go back to <Link to="/login" className="fw-medium text-primary"> Login  </Link> </p>
                {/* <p className="text-white-50">© {new Date().getFullYear()} HORSCITY. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign</p> */}
            </div>
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

export default withRouter(ChangePassword);

ChangePassword.propTypes = {
  history: PropTypes.object,
};
