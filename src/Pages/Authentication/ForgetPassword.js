////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                      Forgot password page functionality done over here.                    //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";

/**IMPORTED */
import { useFormik } from "formik";
import { userForgetPassword } from "../../store/actions";
import { clearForgotResponseMessages } from "../../store/actions";
import logo from "../../assets/images/logo.png";
import withRouter from "../../components/Common/withRouter";
import { getSettingsPageData } from "../../helpers/ApiRoutes/getApiRoutes";


const ForgetPasswordPage = (props) => {

  const [isActive, setActive] = useState(false);
  const [loginpage_logo, setLoginPageLogo] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    "../../assets/images/bg.jpg"
  );
  const [app_name, setAppName] = useState("");
  const dispatch = useDispatch();
  /**THIS HOOK WILL RENDER INITIAL TIME */
  useEffect(() => {
    dispatch(clearForgotResponseMessages());
    getAllData();
  }, []);

  useEffect(() => {
    document.body.className = "bg-pattern";
    document.body.style = `background-image: url('${backgroundImage}');`;
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setBackgroundImage(settingsData?.settingsPageData[0]?.loginpage_bg_image);
    setLoginPageLogo(settingsData?.settingsPageData[0]?.loginpage_logo);
    setAppName(settingsData?.settingsPageData[0]?.application_title);
  }

  /**VALIDATION */
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(props.t("Please Enter Your Email")),
    }),
    onSubmit: (values) => {
      setActive(true);
      dispatch(userForgetPassword(values, props.router.navigate));
    },
  });

  /**FETCHING IN THE REDUX */
  const { forgetError, forgetSuccessMsg } = useSelector((state) => ({
    forgetSuccessMsg: state.forgetPassword.forgetSuccessMsg,
    forgetError: state.forgetPassword.forgetError,
  }));

  /**THIS HOOK WILL RENDER IF THERE ANY CHANGES ON THE  forgetSuccessMsg OR  forgetError
   * THAT IT WILL RENDER
   */
  useEffect(() => {
    if (forgetSuccessMsg || forgetError) {
      setActive(false);
    }
  }, [forgetError, forgetSuccessMsg]);

  document.title = `${props.t("Forgot Password")} | ${app_name} `;
  return (
    <React.Fragment>
      <div className="bg-overlay"></div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row></Row>
                </div>
                <CardBody className="pt-3">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={loginpage_logo || logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">{props.t("Email")}</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder={props.t("Enter Email")}
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                            disabled={isActive}
                          >
                            {props.t("Send")}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                {props.t("Go back to")} 
                  <Link to="/login" className="font-weight-medium text-primary ms-2">
                   {props.t("Log In")}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(withTranslation()(ForgetPasswordPage));
