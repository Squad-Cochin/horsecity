////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       All URLS  done over here.                                            //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////


const apiBaseUrl = "http://kailplus.com:3001";

/**AUTHENTICATION URL */
export const LOGIN_URL = apiBaseUrl + "/login";
export const RECOVER_PWD_URL = apiBaseUrl + "/recoveryPassword";
export const CHANGE_PASSWORD_URL = apiBaseUrl + "/changePassword";
export const FORGET_PASSWORD_URL = apiBaseUrl + "/forgotPassword";
export const VERIFY_RESET_PASSWORD_URL = apiBaseUrl + "/update-password";
export const VERIFY_TOKEN_URL = apiBaseUrl + "/verify/reset-password";
export const RECOVER_PASSWORD = "/fake-recover-password";
export const POST_FAKE_CHANGE_PWD = "/post-fake-change-password";

/**SERVICE PROVIDER URL*/
export const GET_SP_ALL_DATA_URL = apiBaseUrl + "/getAll/serviceproviders";
export const GET_SP_SINGLE_DATA_URL = apiBaseUrl + "/getOne/serviceprovider";
export const POST_SP_ADD_URL = apiBaseUrl + "/add/serviceprovider";
export const PUT_SP_UPDATE_STATUS = apiBaseUrl + "/update-status/serviceprovider";
export const POST_SP_EDIT_URL = apiBaseUrl + "/update/serviceprovider";
export const PUT_SP_REMOVE = apiBaseUrl + "/remove/serviceprovider";
export const GET_SP_USER_NAME = apiBaseUrl + "/getAll/serviceprovidersName";
export const GET_SP_ROLELIST = apiBaseUrl + "/role/list";

/**DISCOUNT URL */
export const GET_DISCOUNTS = apiBaseUrl + "/getAll/active/discounts";

/**REVIEWS URL */
export const GET_REVIEWS_DATA_URL = apiBaseUrl + "/getAll/reviews";
export const PUT_REVIEW_UPDATE_STATUS = apiBaseUrl + "/update/status/reviews";

/**CUSTOMER URL */
export const GET_CUSTOMER_ALL_DATA_URL = apiBaseUrl + "/getAll/customers";
export const GET_CUSTOMER_SINGLE_DATA_URL = apiBaseUrl + "/getOne/customer";
export const POST_CUSTOMER_ADD_URL = apiBaseUrl + "/add/customer";
export const PUT_CUSTOMER_UPDATE_STATUS = apiBaseUrl + "/update/customer";
export const POST_CUSTOMER_EDIT_URL = apiBaseUrl + "/edit/customer";
export const PUT_CUSTOMER_REMOVE = apiBaseUrl + "/remove/customer";

/**VEHICLES URL */
export const GET_VEHICLES_ALL_DATA_URL = apiBaseUrl + "/getAll/vehicles";
export const GET_VEHICLES_SINGLE_DATA_URL = apiBaseUrl + "/getOne/vehicle";
export const POST_VEHICLES_ADD_URL = apiBaseUrl + "/addNew/vehicle";
export const PUT_VEHICLES_UPDATE_STATUS = apiBaseUrl + "/updateStatus/vehicle";
export const POST_VEHICLES_EDIT_URL = apiBaseUrl + "/edit/vehicle";
export const PUT_VEHICLES_REMOVE = apiBaseUrl + "/removeVehicle";
export const GET_SP_VEHICLES_DATA_URL = apiBaseUrl + "/serviceprovider/vehicle";
export const GET_SP_DRIVER_DATA_URL = apiBaseUrl + "/serviceprovider/driver";

/**VEHICLES_IMAGES  URL*/
export const GET_VEHICLES_IMAGES_DATA_URL = apiBaseUrl + "/getAllImages/vehicle";
export const POST_VEHICLES_IMAGES_ADD_URL = apiBaseUrl + "/addImage/vehicle";
export const PUT_VEHICLES_IMAGE_UPDATE_STATUS = apiBaseUrl + "/updateStatus/vehicle/image";
export const PUT_VEHICLES_IMAGES_REMOVE = apiBaseUrl + "/removeImage/vehicle/image";

/**INVOICE URL */ 
export const POST_INVOICE_ALL_DATA_URL = apiBaseUrl + "/getAll/invoices";
export const GET_INVOICE_SINGLE_DATA_URL = apiBaseUrl + "/getOne/invoice";
export const GET_INVOICE_SINGLE_INVOICE_PAYMENT_HISTROY = apiBaseUrl + "/payment/histroy";
export const GET_LATEST_PAYMENT_HISTROY_OF_INVOICE = apiBaseUrl + "/single/payment/histroy";
export const GET_SEND_EMAIL_BUTTON_DATA_OF_INVOICE = apiBaseUrl + `/email/button/data`;
export const POST_SENT_INVOICE_ON_EMAIL = apiBaseUrl + `/send/email`;
export const POST_ADD_AMOUNT_URL = apiBaseUrl + `/add/amount`;
export const GET_START_TRIP = apiBaseUrl + `/booking/started`;
export const PUT_CANCEL_INVOICE = apiBaseUrl + "/booking/cancel";

/**DASHBOARD URL */
export const GET_DASHBOARD_DATA = apiBaseUrl + "/dashboard";
export const GET_MONTHLY_SALES_DATA = apiBaseUrl + "/dashboard/sales/report";
export const GET_QUOTATION_REPORT = apiBaseUrl + "/dashboard/quotation/data";
export const GET_LATEST_ENQUIRIRES_FOR_DASHBOARD = apiBaseUrl + "/dashboard/latest/enquiries";

/**DRIVERS URL */
export const GET_DRIVERS_ALL_DATA_URL = apiBaseUrl + "/getAll/drivers";
export const GET_DRIVERS_SINGLE_DATA_URL = apiBaseUrl + "/getOne/driver";
export const POST_DRIVERS_ADD_URL = apiBaseUrl + "/add/driver";
export const PUT_DRIVERS_UPDATE_STATUS = apiBaseUrl + "/update/driver";
export const POST_DRIVERS_EDIT_URL = apiBaseUrl + "/edit/driver";
export const PUT_DRIVERS_REMOVE = apiBaseUrl + "/remove/driver";
export const PUT_DRIVERS__SERVICE_PROVIDER_REMOVE = apiBaseUrl + "/un/assign/serviceProvider";

/**ASSIGN_DRIVERS*/ 
export const POST_ASSIGN_DRIVERS = apiBaseUrl + "/assign/driver";
export const GET_ASSIGNED_DRIVERS = apiBaseUrl + "/past/service/provider/driver";
export const PUT_ASSIGN_DRIVERS_REMOVE = apiBaseUrl + "/unassign/driver";

/**ENQUIRY URL*/
export const GET_ENQUIRY_ALL_DATA_URL = apiBaseUrl + "/getAll/enquiries";
export const GET_ENQUIRY_SINGLE_DATA_URL = apiBaseUrl + "/getOne/enquiry";
export const POST_ADD_QUOTATION_URL = apiBaseUrl + "/add/quotation";

/**QUOTATION URL*/
export const GET_QUOTATION_ALL_DATA_URL = apiBaseUrl + "/getAll/quotations";
export const GET_QUOTATION_SINGLE_DATA_URL = apiBaseUrl + "/getOne/quotation";
export const GET_QUOTATION_FULL_DATA_URL = apiBaseUrl + "/list/quotations";
export const PUT_QUOTATION_EDIT_URL = apiBaseUrl + "/update/quotation";
export const POST_SEND_QUT_EMAIL_URL = apiBaseUrl + "/send-email/quotations";
export const PUT_QUOTATION_CONFIRM_URL = apiBaseUrl + "/update-status/quotations";
export const GET_QUOTATION_TEMPLATE_URL = apiBaseUrl + "/template/quotaion";

/**ACCOUNTS URL*/
export const POST_ACCOUNTS_ALL_DATA_URL = apiBaseUrl + "/getAll/accounts";
export const GET_ACCOUNTS_SINGLE_DATA_URL = apiBaseUrl + "/getOne/accountsDetails";

/**REPORTS URL*/
export const POST_SERVICE_PROVIDER_REPORT_URL = apiBaseUrl + "/reports/serviceproviders";
export const POST_CUSTOMER_REPORT_URL = apiBaseUrl + "/reports/customers";
export const POST_VEHICLES_REPORT_URL = apiBaseUrl + "/reports/vehicles";
export const POST_DRIVERS_REPORT_URL = apiBaseUrl + "/reports/drivers";
export const POST_ENQUIRIES_REPORT_URL = apiBaseUrl + "/reports/enquiries";
export const POST_QUOTATIONS_REPORT_URL = apiBaseUrl + "/reports/quotations";
export const POST_TRIP_DETAILS_REPORT_URL = apiBaseUrl + "/reports/tripDetails";
export const POST_INVOICE_REPORT_URL = apiBaseUrl + "/reports/invoices";
export const POST_ACCOUNTS_REPORT_URL = apiBaseUrl + "/reports/accounts";

/**TAXATION URL*/
export const POST_TAXATION_ALL_DATA_URL = apiBaseUrl + "/getAll/tax";
export const GET_TAXATION_ALL_DATA_URL = apiBaseUrl + "/getAll/taxations";
export const GET_TAXATION_SINGLE_DATA_URL = apiBaseUrl + "/getOne/taxations";
export const POST_TAXATION_ADD_URL = apiBaseUrl + "/add/taxation";
export const PUT_TAXATION_UPDATE_STATUS = apiBaseUrl + "/update-status/taxation";
export const POST_TAXATION_EDIT_URL = apiBaseUrl + "/update/taxation";
export const PUT_TAXATION_REMOVE = apiBaseUrl + "/remove/taxation";

/**SETTINGS PAGE URL*/
export const POST_SETTINGS_ALL_DATA_URL = apiBaseUrl + "/getAll/settings";
export const PUT_SETTINGS_EDIT_URL = apiBaseUrl + "/update/settings";

/**CURRENCIES URL*/
export const GET_CURRENCIES_ALL_DATA_URL = apiBaseUrl + "/getAll/currencies";

/**LANGUAGES PAGE URL */
export const GET_LANGUAGES_ALL_DATA_URL = apiBaseUrl + "/getAll/languages";
export const GET_LANGUAGES_FILE = apiBaseUrl + "/getFile/lngFile";
export const POST_LANGUAGES_ALL_DATA_URL = apiBaseUrl + "/getAll/languages";
export const GET_LANGUAGES_SINGLE_DATA_URL = apiBaseUrl + "/getOne/languages";
export const POST_LANGUAGES_ADD_URL = apiBaseUrl + "/add/languages";
export const PUT_LANGUAGES_UPDATE_STATUS = apiBaseUrl + "/update-status/languages";
export const PUT_LANGUAGES_EDIT_URL = apiBaseUrl + "/update/languages";
export const PUT_LANGUAGES_REMOVE = apiBaseUrl + "/remove/languages";

/**DISCOUNTS PAGE URL*/
export const GET_DISCOUNTS_ALL_DATA_URL = apiBaseUrl + "/getAll/discounts";
export const PUT_DISCOUNTS_UPDATE_STATUS = apiBaseUrl + "/update-status/discounts";
export const POST_DISCOUNTS_ADD_URL = apiBaseUrl + "/add/discount";
export const PUT_DISCOUNTS_EDIT_URL = apiBaseUrl + "/update/discount";
export const PUT_DISCOUNTS_REMOVE = apiBaseUrl + "/remove/discount";
export const GET_DISCOUNTS_SINGLE_DATA_URL = apiBaseUrl + "/getOne/discounts";

/**TRIP DETAILS PAGE URL */
export const GET_TRIP_ALL_DATA_URL = apiBaseUrl + "/getAll/tripDetails";
export const GET_VEHICLE_BREAKDOWN_ALL_DATA_URL = apiBaseUrl + "/list/breakDownVehicles";
export const POST_VEHICLE_BREAKDOWN_DATA_URL = apiBaseUrl + "/add/breakDownVehicles";

export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_PASSWORD_RESET = "/fake-reset-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";
//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";
//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";
