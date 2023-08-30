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
const UPDATE_CUSTOMER_PAGE_URL = token + `/edit/customer/` 
const UPDATE_CUSTOMER_SIDE_URL = `/customer/edit/details/`


const ADD_DRIVER_PAGE_URL = token + `/add/driver`
const UPDATE_DRIVER_PAGE_URL = token + `/edit/driver/`


const ADD_VEHICLE_PAGE_URL = token + `/addNew/vehicle`
const UPDATE_VEHICLE_PAGE_URL = token + `/edit/vehicle/`


const ADD_SERVICEPROVIDER__URL = token + `/add/serviceprovider`
const UPDATE_SERVICE_PROVIDER_PASSWORD = token + `/changePassword`




module.exports = 
{
    ADD_SERVICEPROVIDER__URL, // Add service provider link
    UPDATE_SERVICE_PROVIDER_PASSWORD, // update service provider

    UPDATE_SETTINGS_PAGE_URL,  // update setting link
    UPDATE_SERVICE_PROVIDER_URL,
    
    ADD_CUSTOMER_PAGE_URL, // Add customer link
    UPDATE_CUSTOMER_PAGE_URL, // update customer link
    UPDATE_CUSTOMER_SIDE_URL,


    ADD_DRIVER_PAGE_URL, // Add driver link
    UPDATE_DRIVER_PAGE_URL,  // update driver link
    
    
    UPDATE_VEHICLE_PAGE_URL, // update vehicle link    
    ADD_VEHICLE_PAGE_URL, // Add vehicle link
}
