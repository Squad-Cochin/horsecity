////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the url helper file. We will be using the this url in the adding and updating the data of the  //
//     customer, vehicle, service provider, driver, settings page.                                            //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const account =
{
    POST_GETALL_ACCOUNTS : `/getAll/accounts/:id`,
    GET_ONE_ACCOUT : `/getOne/accountsDetails/:id`,
}

const application_settings =
{
    currencies :
    {
        GET_ALLCURRENCIES : `/getAll/currencies`        
    },

    discounts :
    {
        POST_GET_ALL_DISCOUNT_LIMIT : `/getAll/discounts`,
        PUT_UPDATE_DISCOUNT_STATUS : `/update-status/discounts/:id`,
        PUT_REMOVE_DISCOUNT : `/remove/discount/:id`,
        POST_ADD_DISCOUNT : `/add/discount`,
        PUT_EDIT_DISCOUNT : `/update/discount/:id`,
        GET_ONE_DISCOUNT: `/getOne/discounts/:id`,
        GET_ALL_ACTIVE_DISCOUNT: `/getAll/active/discounts`        
    },

    languages :
    {
        POST_GET_ALL_LANGUAGE_LIMIT : `/getAll/languages`,
        PUT_UPDATE_LANGUAGE_STATUS : `/update-status/languages/:id`,
        PUT_REMOVE_LANGUAGE : `/remove/languages/:id`,
        POST_ADD_LANGUAGE : `/add/languages`,
        PUT_EDIT_LANGUAGE : `/update/languages/:id`,
        GET_ONE_LANGUAGE: `/getOne/languages/:id`,
        GET_ALL_ACTIVE_LANGUAGE: `/getAll/languages`      
    },

    settings :
    {
        GET_SETTINGS_PAGE_DATA : `/getAll/settings`,
        PUT_UPDATE_SETTINGS_DATA : `/update/settings`,
        GET_LANGUAGE_DATA_SETTING_PAGE : `/getFile/lngFile`,
    },

    taxations :
    {
        POST_GET_ALL_TAX_LIMIT : `/getAll/tax`,
        PUT_UPDATE_TAX_STATUS : `/update-status/taxation/:id`,
        PUT_REMOVE_TAX : `/remove/taxation/:id`,
        POST_ADD_TAX : `/add/taxation`,
        PUT_EDIT_TAX : `/update/taxation/:id`,
        GET_ONE_TAX: `/getOne/taxations/:id`,
        GET_ALL_ACTIVE_TAX: `/getAll/taxations` 
    }
}

const auth =
{
    POST_SERVICE_PROVIDER_LOGIN : `/login`,
    POST_SERVICE_PROVIDER_CHANGE_PASSWORD : `/changePassword`,
    POST_SERVICE_PROVIDER_LOGOUT : `/logout/:id`,
    POST_FORGOT_PASSWORD_SEND_EMAIL : `/forgotPassword`,
    GET_SERVICE_PROVIDER_VERIFY_TOKEN : `/reset-password/:id/:token`,
    POST_SERVICE_PROVIDER_PASSWORD_CHANGE_REDIRECT_PAGE_LINK : `/verify/reset-password/:id/:token`,
    POST_REDIRECT_PAGE_UPDATE_PASSWORD : `/update-password/:id/:token`,
    POST_VERIFY_TOKEN : `/verify`
}

const customer = 
{
    POST_ALL_CUSTOMER: `/getAll/customers/:id`,
    POST_ADD_CUSTOMER: `/add/customer/`,
    PUT_REMOVE_CUSTOMER: `/remove/customer/:id`,
    PUT_UPDATE_STATUS_CUSTOMER: `/update/customer/:id`,
    PUT_EDIT_CUSTOMER: `/edit/customer/`,
    POST_CUSTOMER_LOGIN_URL : `/customer/login`,
    GET_CUSTOMER_LOGOUT_URL : `/customer/logout/:id`,
    CUSTOMER_PASSWORD_UPDATE : `/customer/password/update/:id`,
    POST_CUSTOMER_REGISTRATION_NEXTJS : `/customer/registration`,
    GET_CUSTOMER_LOGS : `/customer/logs/:id`,
    GET_CUSTOMER_DASHBOARD_NEXTJS : `/customer/dasboard/:id`, 
    GET_COMPLETED_BOOKINGS_OF_CUSTOMER_NEXTJS : `/customer/booking/completed/:id`,
    GET_CONFIRM_BOOKINGS_OF_CUSTOMER_NEXTJS : `/customer/booking/confirm/:id`,
    GET_CANCEL_BOOKINGS_OF_CUSTOMER_NEXTJS: `/customer/booking/cancelled/:id`,
    GET_RECENT_FIVE_ENQUIRIES_NEXTJS : `/customer/booking/recent/:id`,
    GET_ALL_BOOKING_CUSTOMER_NEXTJS : `/customer/booking/data/:id`,
    GET_ALL_ENQUIRIES_CUSTOMER_NEXTJS : `/customer/all/enquiries/:id`,
    GET_CUSTOMER_ALL_BOOKING_FROM_INVOICE_TABEL_NEXTJS : `/customer/all/booking/data/invoice/table/:id`,
    GET_CUSTOMER_ACTIVE_BOOKING_FROM_INVOICE_TABEL_NEXTJS : `/customer/active/booking/data/invoice/table/:id`,
    GET_CUSTOMER_CANCEL_BOOKING_FROM_INVOICE_TABEL_NEXTJS : `/customer/inactive/booking/data/invoice/table/:id`,
    GET_CUSTOMER_ONGOING_BOOKING_FROM_INVOICE_TABEL_NEXTJS : `/customer/ongoing/booking/data/invoice/table/:id`,
    PUT_EDIT_CUSTOMER_NEXTJS : `/customer/edit/details/`,
    GET_PARTICULAR_CUSTOMER_DETAIL_NEXTJS : `/customer/view/detail/:id`,
    GET_SINGLE_CUSTOMER_DETAIL : `/getOne/customer/:id`
};

const dashboard = 
{
    GET_ADMIN_DASHBOARD_COUNT : `/dashboard/:id`,
    GET_ADMIN_SALES_REPORT : `/dashboard/sales/report/:id`,
    GET_ADMIN_QUOTAION_REPORT : `/dashboard/quotation/data/:id`,
    GET_LATEST_FIVE_ENQUIRIES : `/dashboard/latest/enquiries/:id`
}

const driver =
{
    POST_ALL_DRIVER : `/getAll/drivers/:id`,
    GET_ONE_DRIVER : `/getOne/driver/:id`,
    POST_ADD_DRIVER : `/add/driver/`,
    PUT_UPDATE_DRIVER_STATUS : `/update/driver/:id`,
    PUT_REMOVE_DRIVER : `/remove/driver/:id`,
    PUT_EDIT_DRIVER : `/edit/driver/`,
    POST_ASSIGN_DRIVER : `/assign/driver`,
    GET_DRIVER_WORK_HISTROY : `/past/service/provider/driver/:id`,
    PUT_UNASSIGN_DRIVER : `/unassign/driver/:id`,
    PUT_REMOVE_SERVICE_PROVIDER_PAGE : `/un/assign/serviceProvider`
}

const enquiries =
{
    POST_GET_ALL_ENQUIRIES : `/getAll/enquiries/:id`,
    GET_ONE_ENQUIRY : `/getOne/enquiry/:id`,
    POST_ADD_ENQUIRY : `/add/enquiry/:id`,
}

const invoices =
{
    POST_ALL_INVOICE : `/getAll/invoices/:id`,
    GET_ONE_INVOICE : `/getOne/invoice/:id`,
    POST_ADD_AMOUNT : `/add/amount/:id`,
    GET_PAYMENT_HISTROY : `/payment/histroy/:id`,
    GET_LATEST_PAYMENT_OF_PARTICULAR_INVOICE : `/single/payment/histroy/:id`,
    GET_EMAIL_BUTTON_DATA : `/email/button/data/:id`,
    POST_SEND_EMAIL : `/send/email/:id`,
    GET_TRIP_BUTTON : `/booking/started/:id`,
    PUT_CANCEL_BUTTON : `/booking/cancel/:id`,
}

const listing =
{
    POST_GET_ALL_SERVICE_PROIVDERS : `/listing/search`,
    POST_GET_ALL_SERVICE_PROIVDERS_NAMES : `/getAll/serviceproviders`
}

const quotation =
{
    POST_ADD_QUOTATION : `/add/quotation`,
    POST_GETALL_QUOTATION : `/getAll/quotations/:id`,
    GET_PARTICULAR_QUOATATION : `/getOne/quotation/:id`,
    PUT_UPDATE_AND_CREATE_NEW_QUOTATION : `/update/quotation/:id`,
    GET_LISTING_REMOVED_QUOTATION : `/list/quotations/:id`,
    POST_CHANGING_QUOTATION_STATUS : `/update-status/quotations`,
    POST_SEND_QUOTATION_EMAIL : `/send-email/quotations/:id`,
    GET_QUOTATION_TEMPLATE : `/template/quotaion`
}

const reports =
{
    POST_GET_ALL_SERVICE_PROVIDER : `/reports/serviceproviders/:id`,
    POST_GET_ALL_CUSTOMERS : `/reports/customers/:id`,
    POST_GET_ALL_VEHICLES : `/reports/vehicles/:id`,
    POST_GET_ALL_DRIVERS : `/reports/drivers/:id`,
    POST_GET_ALL_ENQUIRIES : `/reports/enquiries/:id`,
    POST_GET_ALL_QUOTATIONS : `/reports/quotations/:id`,
    POST_GET_ALL_TRIP_DETAILS : `/reports/tripDetails/:id`,
    POST_GET_ALL_INVOICES : `/reports/invoices/:id`,
    POST_GET_ALL_ACCOUNTS : `/reports/accounts/:id`
}

const reviews =
{
    POST_GETALL_REVIEWS : `/getAll/reviews/:id`,
    POST_ADD_REVIEWS : `/add/review`,
    PUT_UPDATE_REVIEW_STATUS : `/update/status/reviews/:id`,
    GET_PARTICUALR_VEHICLE_DATA_NEXTJS : `/customer/getOne/vehicle/more/details/:id`
}

const service_provider =
{
    POST_ALL_SERVICE_PROIVDERS_WITH_LIMIT : `/getAll/serviceproviders/:id`,
    GET_SERVICE_PROVIDER_NAMES : `/getAll/serviceprovidersName`,
    POST_ADD_SERVICE_PROVIDER : `/add/serviceprovider`,
    PUT_EDIT_SERVICE_PROVIDER : `/update/serviceprovider/`,
    PUT_UPDATE_SERVICE_PROVIDER_STATUS : `/update-status/serviceprovider/:id`,
    PUT_REMOVE_SERVICE_PROVIDER : `/remove/serviceprovider/:id`,
    GET_PARTICULAR_SERVICE_PROVIDER_DETAILS : `/getOne/serviceprovider/:id`,
    GET_PARTICULAR_SERVICE_PROVIDER_VEHICLES : `/serviceprovider/vehicle/:id`,
    GET_PARTICULAR_SERVICE_PROVIDER_DRIVERS : `/serviceprovider/driver/:id`,
    GET_ROLES_LIST : `/role/list`
}

const tripDetails = 
{
    POST_GET_ALL_TRIP_INFO_PARTICULAR_SERVICE_PROVIDER : `/getAll/tripDetails/:id`,
    POST_ADD_BREAKDOWN_VEHICLES : `/add/breakDownVehicles`,
    GET_BREAKDOWN_VEHICLE_LIST : `/list/breakDownVehicles/:id`
}

const vehicles =
{
    POST_ADD_NEW_VEHICLE : `/addNew/vehicle/`,
    POST_GET_ALL_VEHICLES : `/getAll/vehicles/:id`,
    PUT_UPDATE_VEHICLE_STATUS : `/updateStatus/vehicle/:id`,
    GET_PARTICULAR_VEHICLE : `/getOne/vehicle/:id`,
    PUT_EDIT_VEHICLE : `/edit/vehicle/`,
    POST_IMAGES_PARTICULAR_VEHICLE : `/getAllImages/vehicle/:id`,
    PUT_REMOVE_VEHICLE : `/removeVehicle/:id`,
    GET_OVERALL_VEHICLE_REPORT_NEXTJS: `/customer/getOne/vehicle/:id`
}

const vehicle_images =
{
    POST_ADD_IMAGE_PARTICULAR_VEHICLE : `/addImage/vehicle/`,
    PUT_UPDATE_PARTICULAR_IMAGE_STATUS  : `/updateStatus/vehicle/image/:id`,
    PUT_REMOVE_PARTICULAR_IMAGE  : `/removeImage/vehicle/image/:id`
}

const wishlist = 
{
    POST_ADD_REMOVE_WISHLIST : `/wishlist/add-remove`,
    POST_GET_ALL_WISHLIST_LIMIT : `/wishlist/list_items`
}


module.exports = 
{
    account,
    application_settings,
    auth,
    customer,
    dashboard,
    driver,
    enquiries,
    invoices,
    listing,
    quotation,
    reports,
    reviews,
    service_provider,
    tripDetails,
    vehicles,
    wishlist,
    vehicle_images
}
