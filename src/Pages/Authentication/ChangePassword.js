////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                      Change password page functionality done over here.                    //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import withRouter from "../../components/Common/withRouter";
import logo from "../../assets/images/logo.png";
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
import { updateNewPwd } from "../../store/actions";
import { logoutUser } from "../../store/actions";

const ChangePassword = props => {
  document.title = "Change-Password | HORSCITY";

  const [backgroundImage, setBackgroundImage] = useState('../../assets/images/bg.jpg');
  const [ appName, setAppName ] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(()=>{
    getAllData()
  },[])

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
    let username = localStorage.getItem('userName');
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

  /**SET BACKGROUND IMAGE */
  async function getAllData() {
    let settingsData = await getSettingsPageData();

    setBackgroundImage(settingsData?.settingsPageData[0]?.loginpage_bg_image);
    setAppName(settingsData?.settingsPageData[0]?.application_title)
   }

  useEffect(() => {
    document.body.className = "bg-pattern";
    document.body.style = `background-image: url('${backgroundImage}');`;
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
                    Update password to continue with {appName}.
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
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Update Password
                          </button>
                        </div>
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
