import React from 'react';


import logo from '../../assets/images/logo.png';

import { Container, Row, Col, Card, CardBody, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { userRecoverPassword } from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";

const RecoverPassword = (props) => {
    document.title = "Recover Password | HORSCITY ";
    const dispatch = useDispatch();
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email")
        }),
        onSubmit: (values) => {
            console.log("email");
            dispatch(userRecoverPassword(values));
        }
    });
    
  const { error } = useSelector(state => ({
    error: state.login.error,
  }));

    return (
        <React.Fragment>
            <div className="bg-pattern" style={{ height: "100vh" }}>
                <div className="bg-overlay"></div>
                <div className="account-pages pt-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} md={8} xl={4}>
                                <Card className='mt-5'>
                                    <CardBody className="p-4">
                                        <div className="">
                                            <div className="text-center">
                                                <Link to="/" className="">
                                                    <img src={logo} alt="" height="50" className="auth-logo logo-dark mx-auto" />
                                                    <img src={logo} alt="" height="50" className="auth-logo logo-light mx-auto" />
                                                </Link>
                                            </div>
                                            <h4 className="font-size-18 text-muted mt-2 text-center">Reset Password</h4>
                                            <p className="mb-5 text-center">Reset your Password with HORSCITY.</p>
                                            <form
                                                className="form-horizontal"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }} action="/login">
                                                <Row>
                                                    <Col md={12}>
                                                        <div className="alert alert-warning alert-dismissible">
                                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                            Enter your <b>Email</b> and instructions will be sent to you!
                                                        </div>

                                                        <div className="mb-4">
                                                            <Label className="form-label">Email</Label>
                                                            <Input
                                                                name="email"
                                                                className="form-control"
                                                                placeholder="Enter email"
                                                                type="email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email || ""}
                                                                invalid={
                                                                    validation.touched.email && validation.errors.email ? true : false
                                                                }
                                                            />
                                                            {validation.touched.email && validation.errors.email ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="d-grid mt-4">
                                                            <button className="btn btn-primary waves-effect waves-light" type="submit">Send Email</button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p className="text-white-50">Back to <Link to="/login" className="fw-medium text-primary"> Login  </Link> </p>
                                    {/* <p className="text-white-50">© {new Date().getFullYear()} HORSCITY. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesdesign</p> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        </React.Fragment>
    );
}

export default RecoverPassword;