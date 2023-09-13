////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                      Forgot password page functionality done over here.                    //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////


import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
/**IMPORTED */
import { verifyResetPasswordUrl } from '../../helpers/ApiRoutes/getApiRoutes';
import { useFormik } from "formik";
import { userResetPassword } from "../../store/actions";
import logo from "../../assets/images/logo.png";
import withRouter from "../../components/Common/withRouter";
import { useNavigate } from "react-router-dom"
const ResetPasswordPage = props => {
  const [ pageVerify , setPageVerify ] = useState(true)
  const dispatch = useDispatch();
  const { id,token } = useParams();
  const navigate = useNavigate();
  /**THIS HOOK WILL RENDER INITIAL TIME */
  useEffect(() => {

     initialLoad();
    // if(id == 12 && token == 'abc'){
    //   document.body.style.backgroundImage = "none";
    //   document.body.className = "";
    // }else{
    //   navigate(`/pages-404`)
    // }

  }, [])

  async function initialLoad(){
    if(id && token){
      let reqObj = {
        flag : true
      }
      const verifyUrl = await  verifyResetPasswordUrl(id,token,reqObj);  
      if(verifyUrl.code === 200){
        document.body.style.backgroundImage = "none";
        document.body.className = "";
        navigate(`/reset-password/${verifyUrl.data?.id}/${verifyUrl.data?.token}`)
      }else{
        navigate(`/pages-404`)
      }

    }
  }

  /**VALIDATION */
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      newpassword: '',
      confirmnewpassword : '',
      user_id : '',
      token : ''

    },
    validationSchema: Yup.object({
      newpassword: Yup.string().required("Please Enter Your New Password"),
      confirmnewpassword: Yup.string().required("Please Enter Your Confirm Password"),
    }),
    onSubmit: (values) => {
      // console.log("values",values);
      values.user_id = id
      values.token = token
      dispatch(userResetPassword(values, props.router.navigate));
    }
  });

  /**FETCHING IN THE REDUX */
  const { resetError, resetSuccessMsg } = useSelector(state => ({
    resetError: state.forgetPassword.resetError,
    resetSuccessMsg: state.forgetPassword.resetSuccessMsg
  }));
  useEffect(() => {
    resetError = '';
    resetSuccessMsg = '';
 }, [])

return (
    <React.Fragment>

      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                  </Row>
                </div>
                <CardBody className="pt-3">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {resetError && resetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {resetError}
                      </Alert>
                    ) : null}
                    {resetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                            {resetSuccessMsg} 
                            {/* <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                Go Back To Login  ?
                              </Link> */}
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
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="newpassword"
                          className="form-control"
                          placeholder="Enter password"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.newpassword || ""}
                          invalid={
                            validation.touched.newpassword && validation.errors.newpassword ? true : false
                          }
                        />
                        {validation.touched.newpassword && validation.errors.newpassword ? (
                          <FormFeedback type="invalid"><div>{validation.errors.newpassword}</div></FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="confirmnewpassword"
                          className="form-control"
                          placeholder="Enter confirm password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirmnewpassword || ""}
                          invalid={
                            validation.touched.confirmnewpassword && validation.errors.confirmnewpassword ? true : false
                          }
                        />
                        {validation.touched.confirmnewpassword && validation.errors.confirmnewpassword ? (
                          <FormFeedback type="invalid"><div>{validation.errors.confirmnewpassword}</div></FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Reset
                          </button>
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
) };
 

ResetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ResetPasswordPage);
