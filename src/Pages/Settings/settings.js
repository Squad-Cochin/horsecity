import React, { useEffect, useState } from 'react';
import { Alert,Card, CardBody, Col, Row, Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Header from '../../Layout/VerticalLayout/Header';
// import { getSettingsPageData } from '../../helpers/ApiRoutes/authApiRoutes'
import { updateSettings} from '../../helpers/ApiRoutes/editApiRoutes';
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
const SettingPage = () => 
{
    const [faviconPreview, setFaviconPreview] = useState(null);
    const [loginPageLogoPreview, setLoginPageLogoPreview] = useState(null);
    const [loginPageBackgroundPreview, setloginPageBackgroundPreview] = useState(null);
    const [menuLogoPreview, setMenuLogoPreview] = useState(null);

    const [favicon, setUploadFavicon] = useState('');
    const [loginPageLogo, setUploadLoginPageLogo] = useState('');
    const [loginPageBackgroundImg, setUploadLoginPageBackgroundImg] = useState('');
    const [logo, setMenuLogo] = useState('');

    const [ errors, setErrors ] = useState("")
    // const [logoChanged, setLogoChanged] = useState(false);
    const [settings_data, setSetting_data] =useState([]);
    const dispatch = useDispatch();
      /**This hook is used to fetch settings data */
      useEffect(() => {
     getAllData()
    }, [])


    useEffect(()=>{
 
      // setSetting_data(getSettingsPageData());
      setloginPageBackgroundPreview(settings_data[0]?.loginpage_bg_image);
      setLoginPageLogoPreview(settings_data[0]?.loginpage_logo);
      setMenuLogoPreview(settings_data[0]?.logo);
      setFaviconPreview(settings_data[0]?.favicon);

    },[settings_data])

          //  console.log("TT",settings_data);
    const initialValues = {

      application_title: settings_data[0]?.application_title || '',
      contact_address: settings_data[0]?.contact_address || '',
      email: settings_data[0]?.email || '',
      phone: settings_data[0]?.phone || '',
      country_code: settings_data[0]?.country_code || '',
      logo: settings_data[0]?.logo || '',
      loginpage_logo: settings_data[0]?.loginpage_logo || '',
      favicon: settings_data[0]?.favicon || '',
      loginpage_bg_image: settings_data[0]?.loginpage_bg_image || '',
      language_id: settings_data[0]?.language_id || '1',
      currency_id: settings_data[0]?.currency_id || '1',
      tax_id: settings_data[0]?. tax_id || '1',
      invoice_prefix: settings_data[0]?.invoice_prefix || '',
      quotation_prefix: settings_data[0]?.quotation_prefix || '',
      licence_number: settings_data[0]?.licence_number || '',
    };
    console.log("image",settings_data[0]?.loginpage_logo);
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
      initialValues,
      onSubmit:async (values) => {
        values.favicon = favicon
        values.logo = logo
        values.loginpage_bg_image = loginPageBackgroundImg
        values.loginpage_logo = loginPageLogo

                   console.log("values",values.id,values);    

                  //  dispatch(loginUser(menuLogoPreview));

                  let updateSettings = await updateSettings(1,values);
                  if(updateSettings.code === 200){
                      setErrors("")
                  }else{
                      setErrors("")
                      console.log("ERRRRR",updateSettings);
                      setErrors(updateSettings.message)
                  }
      }
    });
    
    const handleLoginPageBackgroundChange = (event) => {
      const file = event.target.files[0];
      setUploadLoginPageBackgroundImg(file)
      setloginPageBackgroundPreview(URL.createObjectURL(file));
    };
    const handleloginPageLogoPreview = (event) => {
      const file = event.target.files[0];
      setUploadLoginPageLogo(file)
      setLoginPageLogoPreview(URL.createObjectURL(file));
    };  
    const handleMenuLogoChange = (event) => 
    {
      const file = event.target.files[0];
      setMenuLogo(file)
      setMenuLogoPreview(URL.createObjectURL(file));
    };
    const handleFaviconChange = (event) => {
      const file = event.target.files[0];
      setUploadFavicon(file);
      console.log(file);
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
    const taxations = [
      { code: '1', tax: 'VAT'},
    
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
          // setLogoChanged(true);
        }
  
        console.log('Form submitted');
      } else {
        form.reportValidity();
      }
    };
  
    const updateHeaderLogo = (logoUrl) => 
    {
      
    };
  

    // function for get data all service provider data
    async function getAllData() {
      console.log("first")
      let settingsData = await getSettingsPageData();
      console.log("LLL",settingsData.settingsPageData);
      setSetting_data(settingsData.settingsPageData);

  }


console.log("datadd",settings_data);


    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Settings" />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                  {errors !== "" ? <Alert color="danger"><div>{errors}</div></Alert> : null}
                    {/* <form onSubmit={handleSubmit}>                       */}
                    <form   onSubmit={validation.handleSubmit}>
                      {/* Company Title */}
                      <Row className="mb-3">
                        <label htmlFor="example-text-input" className="col-md-2 col-form-label"> Company Title <span style={{ color: 'red' }}>*</span> </label>
                          <div className="col-md-10">
                            <input className="form-control" type="text"  placeholder="Enter Company Title" name="application_title"          value={validation.values.application_title || ""}
                            onChange={validation.handleChange} required />
                          </div>
                      </Row>
                    {/* Menu title */}
                    <Row className="mb-3">
                      <label htmlFor="example-search-input" className="col-md-2 col-form-label" >Contact Address <span style={{ color: 'red' }}>*</span> </label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            name='contact_address'
                            value={validation.values.contact_address || ""}
                            onChange={validation.handleChange}
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
                        <input className="form-control" type="email" placeholder="Enter the Company Email" name='email'
                            value={validation.values.email || ""}
                            onChange={validation.handleChange} 
                        required />
                      </div>
                    </Row>
                    {/* Phone Number */}
                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Phone Number <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10">
                        <input className="form-control" type="tel" placeholder="Enter the Company Phone Number" name='phone'
                            value={validation.values.phone     || ""}
                            onChange={validation.handleChange}  required />
                      </div>
                    </Row>
                    {/* Country Code */}
                    <div className="row mb-3">
                      <label htmlFor="country-code-select" className="col-md-2 col-form-label"> Country Code <span style={{ color: 'red' }}>*</span> </label>
                        <div className="col-md-10"> <select id="country-code-select" className="form-select" name='country_code'   value={validation.values.country_code || ""}
                            onChange={validation.handleChange} >
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
                          
                              <input
                                className="form-control"
                                name='logo'
                                type="file"
                                // value={validation.values.logo || ""}
                                // onChange={validation.handleChange} 
                                placeholder="Upload Menu Logo Image"
                                onChange={handleMenuLogoChange}
                            
                              />
                          
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
                              name='loginpage_logo'
                              // value={validation.values.loginpage_logo || ""}
                              // onChange={validation.handleChange} 
                              placeholder="Upload Menu Logo Image"
                              onChange={handleloginPageLogoPreview}
                 
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
                              name='favicon'
                              // value={validation.values.favicon || ""}
                              // onChange={validation.handleChange} 
                              placeholder="Upload Favicon Image"
                              onChange={handleFaviconChange}
                   
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
                              name='loginpage_bg_image'
                              placeholder="Upload Favicon Image"
                              // value={validation.values.loginpage_bg_image || ""}
                              // onChange={validation.handleChange} 
                              onChange={handleLoginPageBackgroundChange}
                          
                            />
                          </div>
                        </Row>
                        <div className="row mb-3">
                          <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                              Language <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-md-10">
                              <select id="country-code-select" className="form-select" name='language_id'   value={validation.values.language_id || ""}
                              onChange={validation.handleChange} >
                                {languageCodes.map((item) => ( <option key={item.code} value={item.code}> {`${item.language}`} </option> ))}
                              </select>
                          </div>
                        </div>
                    <div className="row mb-3">
                    <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                        Currency <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-md-10">
                        <select id="country-code-select" className="form-select" name='currency_id'  value={validation.values.currency_id || ""}
                              onChange={validation.handleChange} >
                        {currencies.map((item) => (
                            <option key={item.code}  value={item.code}>
                            {`${item.currency}`}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label htmlFor="country-code-select" className="col-md-2 col-form-label">
                        Tax <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div className="col-md-10">
                        <select id="country-code-select" className="form-select" name='tax_id'  value={validation.values.tax_id || ""}
                              onChange={validation.handleChange} >
                        {taxations.map((item) => (
                            <option key={item.code} value={item.code}>
                            {`${item.tax}`}
                            </option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Invoice Prefix <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10">
                        <input className="form-control" type="text" name='invoice_prefix' placeholder="Enter Invoice Prefix" value={validation.values.invoice_prefix || ""}
                              onChange={validation.handleChange}  required />
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Quotation Prefix <span style={{ color: 'red' }}>*</span> </label>
                        <div className="col-md-10"> <input className="form-control" type="text" name='quotation_prefix' placeholder="Enter Quotation Prefix" value={validation.values.quotation_prefix || ""}
                              onChange={validation.handleChange} required /> </div>
                    </Row>
                    <Row className="mb-3">
                      <label htmlFor="example-tel-input" className="col-md-2 col-form-label" > Licensce Number <span style={{ color: 'red' }}>*</span> </label>
                      <div className="col-md-10"> 
                        <input className="form-control" type="text" name='licence_number' value={validation.values.licence_number || ""}
                              onChange={validation.handleChange} placeholder="Enter Licence Number" required / >
                      </div>
                    </Row>
                      <div className="d-flex justify-content-end gap-2">
                        {/* <button type="Edit" className="btn btn-success" id="add-btn"> Edit  </button> */}
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
  