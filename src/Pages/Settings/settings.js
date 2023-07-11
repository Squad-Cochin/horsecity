import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Header from '../../Layout/VerticalLayout/Header';
const SettingPage = () => 
{
    const [faviconPreview, setFaviconPreview] = useState(null);
    const [loginPageLogoPreview, setLoginPageLogoPreview] = useState(null);
    const [loginPageBackgroundPreview, setloginPageBackgroundPreview] = useState(null);
    const [menuLogoPreview, setMenuLogoPreview] = useState(null);
    const [logoChanged, setLogoChanged] = useState(false);


    const handleLoginPageBackgroundChange = (event) => {
      const file = event.target.files[0];
      setloginPageBackgroundPreview(URL.createObjectURL(file));
    };
    const handleloginPageLogoPreview = (event) => {
      const file = event.target.files[0];
      setLoginPageLogoPreview(URL.createObjectURL(file));
    };  
    const handleMenuLogoChange = (event) => 
    {
      const file = event.target.files[0];
      setMenuLogoPreview(URL.createObjectURL(file));
    };
    const handleFaviconChange = (event) => {
      const file = event.target.files[0];
      setFaviconPreview(URL.createObjectURL(file));
    };
    const countryCodes = 
    [
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
    // const handleSubmit = (event) => 
    // {
    //   event.preventDefault();
    //   const form = event.target;
    //   if (form.checkValidity())
    //   {
    //     // Form is valid, perform submit actions here
    //     console.log('Form submitted');
    //   }
    //   else
    //   {
    //     form.reportValidity();
    //   }
    // };

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      if (form.checkValidity()) {
        // Perform form submission logic here
        
        // Update the logo image in the header if menuLogoPreview is set
        if (menuLogoPreview) {
          // Assuming you have a function to update the logo image in the header component
          // Replace "updateHeaderLogo" with the actual function name and pass the menuLogoPreview as a parameter
          updateHeaderLogo(menuLogoPreview);
          setLogoChanged(true);
        }
  
        console.log('Form submitted');
      } else {
        form.reportValidity();
      }
    };
  
    const updateHeaderLogo = (logoUrl) => 
    {
      
    };
  






    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Settings" />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <form onSubmit={handleSubmit}>                      
                      {/* Company Title */}
                      <Row className="mb-3">
                        <label htmlFor="example-text-input" className="col-md-2 col-form-label"> Company Title <span style={{ color: 'red' }}>*</span> </label>
                          <div className="col-md-10">
                            <input className="form-control" type="text" placeholder="Enter Company Title" name="companyTitle" required />
                          </div>
                      </Row>
                    {/* Menu title */}
                    <Row className="mb-3">
                      <label htmlFor="example-search-input" className="col-md-2 col-form-label" >Contact Address <span style={{ color: 'red' }}>*</span> </label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="search"
                            placeholder="Enter the Company Address" //defaultValue="How do I shoot web"
                            required
                          />
                        </div>
                    </Row>
                    {/* email */}
                    <Row className="mb-3">
                      <label htmlFor="example-email-input" className="col-md-2 col-form-label" > Email <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10">
                        <input className="form-control" type="email" placeholder="Enter the Company Email" //   defaultValue="bootstrap@example.com" 
                        required />
                      </div>
                    </Row>
                    {/* Phone Number */}
                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Phone Number <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10">
                        <input className="form-control" type="tel" placeholder="Enter the Company Phone Number" required />
                      </div>
                    </Row>
                    {/* Country Code */}
                    <div className="row mb-3">
                      <label htmlFor="country-code-select" className="col-md-2 col-form-label"> Country Code <span style={{ color: 'red' }}>*</span> </label>
                        <div className="col-md-10"> <select id="country-code-select" className="form-select">
                            {countryCodes.map((item) => ( <option key={item.code} value={item.code}> {`${item.country} (${item.code})`} </option> ))} </select>
                        </div>
                    </div>
                    {/* Menu Logo */}
                        <Row className="mb-3">
                          <label htmlFor="example-tel-input" className="col-md-2 col-form-label">
                            Menu Logo <span style={{ color: 'red' }}>*</span> </label>
                          <div className="col-md-10">
                            {menuLogoPreview && (
                              <div>
                                <h5>Menu Logo Preview:</h5>
                                <img src={menuLogoPreview} alt="Menu Logo Preview" style={{ maxWidth: '100px' }} />
                              </div>
                            )}
                            {!logoChanged && (
                              <input
                                className="form-control"
                                type="file"
                                placeholder="Upload Menu Logo Image"
                                onChange={handleMenuLogoChange}
                                required
                              />
                            )}
                          </div>
                        </Row>
                        <Row className="mb-3">
                          <label htmlFor="example-tel-input" className="col-md-2 col-form-label"> Login Page Logo <span style={{ color: 'red' }}>*</span> </label>
                          <div className="col-md-10">
                            {loginPageLogoPreview && (
                              <div>
                                <h5>Login Page Logo Preview:</h5>
                                <img src={loginPageLogoPreview} alt="Login Page Logo Preview" style={{ maxWidth: '100px' }} />
                              </div>
                            )}
                            <input
                              className="form-control"
                              type="file"
                              placeholder="Upload Menu Logo Image"
                              onChange={handleloginPageLogoPreview}
                              required
                            />
                          </div>
                        </Row>
                    <Row className="mb-3">
                          <label htmlFor="example-tel-input" className="col-md-2 col-form-label">
                            Favicon <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-md-10">
                            {faviconPreview && (
                              <div>
                                <h5>Favicon Preview:</h5>
                                <img src={faviconPreview} alt="Favicon Preview" style={{ maxWidth: '100px' }} />
                              </div>
                            )}
                            <input
                              className="form-control"
                              type="file"
                              placeholder="Upload Favicon Image"
                              onChange={handleFaviconChange}
                              required
                            />
                          </div>
                        </Row>
                        <Row className="mb-3">
                          <label htmlFor="example-tel-input" className="col-md-2 col-form-label"> 
                            Login Page Background Image<span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-md-10">
                            {loginPageBackgroundPreview && (
                              <div>
                                <h5>Login Page Background Image Preview:</h5>
                                <img src={loginPageBackgroundPreview} alt="Login Background Preview" style={{ maxWidth: '100px' }} />
                              </div>
                            )}
                            <input
                              className="form-control"
                              type="file"
                              placeholder="Upload Favicon Image"
                              onChange={handleLoginPageBackgroundChange}
                              required
                            />
                          </div>
                        </Row>
                        <div className="row mb-3">
                          <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                              Language <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-md-10">
                              <select id="country-code-select" className="form-select">
                                {languageCodes.map((item) => ( <option key={item.code} value={item.code}> {`${item.language}`} </option> ))}
                              </select>
                          </div>
                        </div>
                    <div className="row mb-3">
                    <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                        Currency <span style={{ color: 'red' }}>*</span>
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
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Invoice Prefix <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10">
                        <input className="form-control" type="text" placeholder="Enter Invoice Prefix" required />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Quotation Prefix <span style={{ color: 'red' }}>*</span> </label>
                        <div className="col-md-10"> <input className="form-control" type="text" placeholder="Enter Quotation Prefix" required /> </div>
                    </Row>
                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Licensce Number <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10"> 
                        <input className="form-control" type="text" placeholder="Enter Licence Number" required / >
                      </div>
                    </Row>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="Edit" className="btn btn-success" id="add-btn"> Edit  </button>
                        <button type="submit" className="btn btn-success" id="add-btn"> Submit </button>
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
  
export default SettingPage;
  