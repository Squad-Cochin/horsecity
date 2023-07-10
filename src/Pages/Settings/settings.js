import React from 'react';

import { Card, CardBody, Col, Row, CardTitle, Container, Label, Input, } from "reactstrap";
// import { Link } from 'react-router-dom';
// import List from 'list.js';
// import { useFormik } from "formik";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const settingPage = () => 
{


    const countryCodes = [
        { code: '+973', country: 'Bahrain', region: 'GCC' },
        { code: '+965', country: 'Kuwait', region: 'GCC' },
        { code: '+968', country: 'Oman', region: 'GCC' },
        { code: '+974', country: 'Qatar', region: 'GCC' },
        { code: '+966', country: 'Saudi Arabia', region: 'GCC' },
        { code: '+971', country: 'United Arab Emirates', region: 'GCC' },
      ];

    const languageCodes = [
        { code: '1', language: 'English'},
        { code: '2', language: 'Arabic'},
      ];

    const currencies = [
        { code: '1', currency: 'Dhiram'},
        { code: '2', currency: 'Dollar'},
      ];

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Setting" />
  
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    {/* <CardTitle className="h4">Textual inputs</CardTitle>
                    <p className="card-title-desc">
                      Here are examples of <code>.form-control</code> applied to
                      each textual HTML5 <code>&lt;input&gt;</code>{" "}
                      <code>type</code>.
                    </p> */}

                    {/* Company Titile */}
  
                    <Row className="mb-3">
                      <label htmlFor="example-text-input" className="col-md-2 col-form-label" > Company Title * </label>
                      <div className="col-md-10">
                        <input className="form-control" type="text" defaultValue="" placeholder="Enter Company Title"/>
                      </div>
                    </Row>


                    {/* Menu title */}
                    <Row className="mb-3">
                      <label htmlFor="example-search-input" className="col-md-2 col-form-label" >Contact Address </label>
                      <div className="col-md-10">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Enter the Company Address"
                        //   defaultValue="How do I shoot web"
                        />
                      </div>
                    </Row>


                     
                    <Row className="mb-3">
                      <label htmlFor="example-email-input" className="col-md-2 col-form-label" > Email </label>
                      <div className="col-md-10">
                        <input className="form-control" type="email" placeholder="Enter the Company Email" //   defaultValue="bootstrap@example.com"
                        />
                      </div>
                    </Row>


                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Phone Number </label>
                      <div className="col-md-10">
                        <input className="form-control" type="tel" placeholder="Enter the Company Phone Number" />
                      </div>
                    </Row>

                    <div className="row mb-3">
                    <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                        Country Code *
                    </label>
                    <div className="col-md-10">
                        <select id="country-code-select" className="form-select">
                        {countryCodes.map((item) => (
                            <option key={item.code} value={item.code}>
                            {`${item.country} (${item.code})`}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>


                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Logo </label>
                      <div className="col-md-10">
                        <input className="form-control" type="file" placeholder="Upload Logo Image" />
                      </div>
                    </Row>

                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Favicon </label>
                      <div className="col-md-10">
                        <input className="form-control" type="file" placeholder="Upload Favicon Image" />
                      </div>
                    </Row>

                    <div className="row mb-3">
                    <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                        Language
                    </label>
                    <div className="col-md-10">
                        <select id="country-code-select" className="form-select">
                        {languageCodes.map((item) => (
                            <option key={item.code} value={item.code}>
                            {`${item.language}`}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                        Currency
                    </label>
                    <div className="col-md-10">
                        <select id="country-code-select" className="form-select">
                        {currencies.map((item) => (
                            <option key={item.code} value={item.code}>
                            {`${item.currency}`}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Licensce Number </label>
                      <div className="col-md-10">
                        <input className="form-control" type="text" placeholder="Enter Licence Number" />
                      </div>
                    </Row>



                    





                    
                    
                    
                    
                    
                  </CardBody>
                </Card>
              </Col>
            </Row>
  
            
            
  
            
  
            
              
  
             
              
          </Container>
        </div>
      </React.Fragment>
    );
  };
  
export default settingPage;
  