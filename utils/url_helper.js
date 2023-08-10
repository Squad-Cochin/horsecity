////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the url helper file. We will be using the this url in the adding and updating the data of the  //
//     customer, vehicle, service provider, driver, settings page.                                            //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const token = `/${process.env.apiToken}`
const UPDATE_SERVICE_PROVIDER_URL = token + `/update/serviceprovider/`
const UPDATE_SETTINGS_PAGE_URL = token + `/update/settings`
const ADD_CUSTOMER_PAGE_URL = token + `/add/customer`
const ADD_DRIVER_PAGE_URL = token + `/add/driver`
const ADD_VEHICLE_PAGE_URL = token + `/addNew/vehicle`
const EDIT_VEHICLE_PAGE_URL = token + `/edit/vehicle/`
const EDIT_DRIVER_PAGE_URL = token + `/edit/driver/`
const EDIT_CUSTOMER_PAGE_URL = token + `/edit/customer/`
const UPDATE_CUSTOMER_PAGE_URL = token + `/edit/customer/` 
const UPDATE_DRIVER_PAGE_URL = token + `/edit/driver/` 
const UPDATE_VEHICLE_PAGE_URL = token + `/edit/vehicle/` 
const ADD_SERVICEPROVIDER__URL = token + `/add/serviceprovider`
const UPDATE_SERVICE_PROVIDER_PASSWORD = token + `/changePassword`

module.exports = 
{ 
    UPDATE_SERVICE_PROVIDER_URL, // update service provider
    UPDATE_SETTINGS_PAGE_URL,  // update setting link
    UPDATE_CUSTOMER_PAGE_URL, // update customer link
    UPDATE_DRIVER_PAGE_URL,  // update driver link
    UPDATE_VEHICLE_PAGE_URL, // update vehicle link
    ADD_SERVICEPROVIDER__URL, // Add service provider link
    EDIT_DRIVER_PAGE_URL, // update driver link
    EDIT_CUSTOMER_PAGE_URL,
    ADD_DRIVER_PAGE_URL, // Add driver link
    ADD_CUSTOMER_PAGE_URL, // Add customer link
    ADD_VEHICLE_PAGE_URL, // Add vehicle link
    EDIT_VEHICLE_PAGE_URL, // Edit vehicle link
    UPDATE_SERVICE_PROVIDER_PASSWORD
}
