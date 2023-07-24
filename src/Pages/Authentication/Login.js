////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Login page functionality done over here.                             //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import PropTypes from "prop-types";
import React, { useEffect ,useState} from "react";
import logo from "../../assets/images/black-logo.png";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../store/actions";

// Login function
const Login = props => {


  const [loginpage_logo,setLoginPageLogo] = useState('')
  useEffect(()=>{
    getAllData()
  },[])
  const { file } = useSelector(state => ({
    file: state.settings.file,
  }));
 
  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setLoginPageLogo(settingsData?.settingsPageData[0]?.loginpage_logo);
   }

   // At the bigining unmounting 
   useEffect(() => {
    document.body.className = "bg-pattern";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  document.title = "Login | HORSCITY";
  const dispatch = useDispatch();

  // Validation for login function
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userName: "" || '',
      password: "" || '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      localStorage.setItem('userName', values.userName);
      dispatch(loginUser(values, props.router.navigate));

    }
  });

  // Set error function
  const { error } = useSelector(state => ({
    error: state.login.error,
  }));

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
                        src={ loginpage_logo || logo}
                        alt=""
                        height="50"
                        className="auth-logo logo-dark mx-auto"
                      />
                      <img
                        src={ loginpage_logo || logo}
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
                        <div className="d-grid mt-4">
                          <Link
                            to="/forgot-password"
                            className="text-muted"
                          >
                            <i className="mdi mdi-lock"></i> Forgot your
                            password?
                          </Link>
                        </div>
                        <div className="d-grid mt-4">
                          <button
                            className="btn btn-primary waves-effect waves-light"
                            type="submit"
                          >
                            Log In
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
export default withRouter(Login);

// Default property
Login.propTypes = {
  history: PropTypes.object,
};
