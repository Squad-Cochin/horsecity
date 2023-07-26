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

module.exports = 
{ 
    UPDATE_SERVICE_PROVIDER_URL, 
    UPDATE_SETTINGS_PAGE_URL, 
    UPDATE_CUSTOMER_PAGE_URL,
    UPDATE_DRIVER_PAGE_URL, 
    UPDATE_VEHICLE_PAGE_URL,
    ADD_SERVICEPROVIDER__URL,
    EDIT_DRIVER_PAGE_URL,
    EDIT_CUSTOMER_PAGE_URL,
    ADD_DRIVER_PAGE_URL,
    ADD_CUSTOMER_PAGE_URL,
    ADD_VEHICLE_PAGE_URL,
    EDIT_VEHICLE_PAGE_URL
}
