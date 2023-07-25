const token = `/${process.env.apiToken}`
const UPDATE_SERVICE_PROVIDER_URL = token + `/update/serviceprovider/`
const UPDATE_SETTINGS_PAGE_URL = token + `/update/settings` 

const UPDATE_CUSTOMER_PAGE_URL = token + `/edit/customer/` 
const UPDATE_DRIVER_PAGE_URL = token + `/edit/driver/` 
const UPDATE_VEHICLE_PAGE_URL = token + `/edit/vehicle/` 

const ADD_SERVICEPROVIDER__URL = token + `/add/serviceprovider` 

module.exports= { 
    UPDATE_SERVICE_PROVIDER_URL, 
    UPDATE_SETTINGS_PAGE_URL, 
    UPDATE_CUSTOMER_PAGE_URL,
    UPDATE_DRIVER_PAGE_URL, 
    UPDATE_VEHICLE_PAGE_URL,
    ADD_SERVICEPROVIDER__URL
}
