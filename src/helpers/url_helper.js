//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

/**
 * The below one is Hari's Computer Details
 */
// export const API_BASE_URL = "http://192.168.200.88:8080";
// const apiBaseUrl = "http://192.168.200.88:8080";

/**
 * The below one is Shaheer's Computer Details
 */
export const API_BASE_URL = "http://192.168.200.211:8000";
const apiBaseUrl = "http://192.168.200.211:8000";

/**
 * The below one is Saurabh's Computer Details
 */
// export const API_BASE_URL = "http://192.168.200.130:8000";
// const apiBaseUrl = "http://192.168.200.130:8000";
/**
 * The below one is own Computer Details
 */

// const apiBaseUrl = "http://localhost:8000";
// export const API_BASE_URL = "http://localhost:8000";

const token = "/horsecity661809"

// image path

export const IMAGE_PATH = "http://192.168.200.211:8000/serviceProvider/licenceImage/"

export const LOGIN_URL = apiBaseUrl + token + "/login"
export const RECOVER_PWD_URL = apiBaseUrl + token + "/recoveryPassword"
export const CHANGE_PASSWORD_URL = apiBaseUrl + token + "/changePassword"

/**NEW */
export const RECOVER_PASSWORD = "/fake-recover-password";
export const POST_FAKE_CHANGE_PWD = "/post-fake-change-password";

/**SERVICE PROVIDER */
export const GET_SP_ALL_DATA_URL = apiBaseUrl + token + "/getAll/serviceproviders"
export const GET_SP_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/serviceprovider"
export const POST_SP_ADD_URL = apiBaseUrl + token + "/add/serviceprovider"
export const PUT_SP_UPDATE_STATUS = apiBaseUrl + token + "/update-status/serviceprovider"
export const POST_SP_EDIT_URL = apiBaseUrl + token + "/update/serviceprovider"
export const PUT_SP_REMOVE = apiBaseUrl + token + "/remove/serviceprovider"
export const GET_SP_USER_NAME = apiBaseUrl + token + "/getAll/serviceprovidersName"

// Discount
export const GET_DISCOUNTS = apiBaseUrl + token + "/getAll/active/discounts"


/**CUSTOMER */
export const GET_CUSTOMER_ALL_DATA_URL = apiBaseUrl + token + "/getAll/customers"
export const GET_CUSTOMER_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/customer"
export const POST_CUSTOMER_ADD_URL = apiBaseUrl + token + "/add/customer"
export const PUT_CUSTOMER_UPDATE_STATUS = apiBaseUrl + token + "/update/customer"
export const POST_CUSTOMER_EDIT_URL = apiBaseUrl + token + "/edit/customer"
export const PUT_CUSTOMER_REMOVE = apiBaseUrl + token + "/remove/customer"

/**VEHICLES */
export const GET_VEHICLES_ALL_DATA_URL = apiBaseUrl + token + "/getAll/vehicles"
export const GET_VEHICLES_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/vehicle"
export const POST_VEHICLES_ADD_URL = apiBaseUrl + token + "/addNew/vehicle"
export const PUT_VEHICLES_UPDATE_STATUS = apiBaseUrl + token + "/updateStatus/vehicle"
export const POST_VEHICLES_EDIT_URL = apiBaseUrl + token + "/edit/vehicle"
export const PUT_VEHICLES_REMOVE = apiBaseUrl + token + "/removeVehicle"
export const GET_SP_VEHICLES_DATA_URL = apiBaseUrl + token + "/serviceprovider/vehicle"
export const GET_SP_DRIVER_DATA_URL = apiBaseUrl + token + "/serviceprovider/driver"

/**VEHICLES_IMAGES */
export const GET_VEHICLES_IMAGES_DATA_URL = apiBaseUrl + token + "/getAllImages/vehicle"
export const POST_VEHICLES_IMAGES_ADD_URL = apiBaseUrl + token + "/addImage/vehicle"
export const PUT_VEHICLES_IMAGE_UPDATE_STATUS = apiBaseUrl + token + "/updateStatus/vehicle/image"
export const PUT_VEHICLES_IMAGES_REMOVE = apiBaseUrl + token + "/removeImage/vehicle/image"

// INVOICE PAGE
export const POST_INVOICE_ALL_DATA_URL = apiBaseUrl + token + "/getAll/invoices"
export const GET_INVOICE_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/invoice"
/**DRIVERS */
export const GET_DRIVERS_ALL_DATA_URL = apiBaseUrl + token + "/getAll/drivers"
export const GET_DRIVERS_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/driver"
export const POST_DRIVERS_ADD_URL = apiBaseUrl + token + "/add/driver"
export const PUT_DRIVERS_UPDATE_STATUS = apiBaseUrl + token + "/update/driver"
export const POST_DRIVERS_EDIT_URL = apiBaseUrl + token + "/edit/driver"
export const PUT_DRIVERS_REMOVE = apiBaseUrl + token + "/remove/driver"

// ASSIGN_DRIVERS
export const POST_ASSIGN_DRIVERS = apiBaseUrl + token + "/assign/driver"
export const GET_ASSIGNED_DRIVERS = apiBaseUrl + token + "/past/service/provider/driver"
export const PUT_ASSIGN_DRIVERS_REMOVE = apiBaseUrl + token + "/unassign/driver"

/**ENQUIRY */
export const GET_ENQUIRY_ALL_DATA_URL = apiBaseUrl + token + "/getAll/enquiries"
export const GET_ENQUIRY_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/enquiry"
export const POST_ADD_QUOTATION_URL = apiBaseUrl + token + "/add/quotation"
// export const PUT_DRIVERS_UPDATE_STATUS = apiBaseUrl + token + "/update/driver"
// export const POST_DRIVERS_EDIT_URL = apiBaseUrl + token + "/edit/driver"
// export const PUT_DRIVERS_REMOVE = apiBaseUrl + token + "/remove/driver"

/**TAXATION */
/**This URL basis of page & limit  */
export const POST_TAXATION_ALL_DATA_URL = apiBaseUrl + token + "/getAll/tax"
export const GET_TAXATION_ALL_DATA_URL = apiBaseUrl + token + "/getAll/taxations"
export const GET_TAXATION_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/taxations"
export const POST_TAXATION_ADD_URL = apiBaseUrl + token + "/add/taxation"
export const PUT_TAXATION_UPDATE_STATUS = apiBaseUrl + token + "/update-status/taxation"
export const POST_TAXATION_EDIT_URL = apiBaseUrl + token + "/update/taxation"
export const PUT_TAXATION_REMOVE = apiBaseUrl + token + "/remove/taxation"


/**SETTINGS*/
export const POST_SETTINGS_ALL_DATA_URL = apiBaseUrl + token + "/getAll/settings"
export const PUT_SETTINGS_EDIT_URL = apiBaseUrl + token + "/update/settings"

/**CURRENCIES */
export const GET_CURRENCIES_ALL_DATA_URL = apiBaseUrl + token + "/getAll/currencies"

/**LANGUAGES */
export const GET_LANGUAGES_ALL_DATA_URL = apiBaseUrl + token + "/getAll/languages"
export const GET_LANGUAGES_FILE = apiBaseUrl + token + "/getFile/lngFile"
/**This URL basis of page & limit  */
export const POST_LANGUAGES_ALL_DATA_URL = apiBaseUrl + token + "/getAll/languages"
export const GET_LANGUAGES_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/languages"
export const POST_LANGUAGES_ADD_URL = apiBaseUrl + token + "/add/languages"
export const PUT_LANGUAGES_UPDATE_STATUS = apiBaseUrl + token + "/update-status/languages"
export const PUT_LANGUAGES_EDIT_URL = apiBaseUrl + token + "/update/languages"
export const PUT_LANGUAGES_REMOVE = apiBaseUrl + token + "/remove/languages"

/**DISCOUNTS */
export const GET_DISCOUNTS_ALL_DATA_URL = apiBaseUrl + token + "/getAll/discounts"
export const PUT_DISCOUNTS_UPDATE_STATUS = apiBaseUrl + token + "/update-status/discounts"
export const POST_DISCOUNTS_ADD_URL = apiBaseUrl + token + "/add/discount"
export const PUT_DISCOUNTS_EDIT_URL = apiBaseUrl + token + "/update/discount"
export const PUT_DISCOUNTS_REMOVE = apiBaseUrl + token + "/remove/discount"
export const GET_DISCOUNTS_SINGLE_DATA_URL = apiBaseUrl + token + "/getOne/discounts"

export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";


