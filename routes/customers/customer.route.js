////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the customer route file. Where all the routes of the customer.controller.js is written. If     //
//     anyone want to use any function of the customer.controller.js file from the frontend. Then they        //
//     have to use the routes which are listed in this file.                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var url = require(`../../utils/url_helper`);
var constants = require('../../utils/constants');  // Constant elements are stored in this file
var checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`); // Importing the body Middleware
var validateHeaders = require(`../../middlewares/requestValidator`); // Importing the headers middleware
var customerController = require('../../controllers/customers/customer.controller');  // importing the auth controller details and assigning it to the authcontroller variable
var { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams'); // Importing the params middleware

module.exports = (app) =>
{
    // Below route is for getting data of all the customers
    app.post(`${url.customer.POST_ALL_CUSTOMER}`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.getAllDataBody,
    customerController.getAll);
    
    // Below route is for adding the customer data
    app.post(`${url.customer.POST_ADD_CUSTOMER}:id`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.CustomerAddRequestBody,
    checkInput.CheckDataPresentWithDeletedAt,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.passwordValidation(`password`, `passwordnotpresent`, `passwordhavespaces`, `passwordinvalid`),
    checkInput.contactNumberValidation(constants.tableName.customers),
    // checkInput.dateOfBirthValidation,
    checkInput.idProofNumberValidation,
    checkInput.isAttachmentUploaded(`id_proof_image`, constants.responseMessage.idproofimagenotuploaded),
    customerController.addCustomer);

    // Below route is for removing the customer
    app.put(`${url.customer.PUT_REMOVE_CUSTOMER}`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.removeCustomer);

    // Below route is for updating the customer status
    app.put(`${url.customer.PUT_UPDATE_STATUS_CUSTOMER}`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.updateStatus);

    // Below route is for editing the customer data
    app.put(`${url.customer.PUT_EDIT_CUSTOMER}:id`,
            validateHeaders.verifyToken, 
            isValidIdInTheParams(constants.tableName.customers), 
            checkInput.nameValidation,
            checkInput.emailValidation(constants.tableName.customers),
            checkInput.usernameValidation(constants.tableName.customers),
            checkInput.contactNumberValidation(constants.tableName.customers),
            // checkInput.dateOfBirthValidation,
            checkInput.idProofNumberValidation,
            checkInput.isAttachmentUploaded(`id_proof_image`, constants.responseMessage.idproofimagenotuploaded),
            customerController.editCustomer);
    
    // Below route is for the login of the customer. This is for NEXTJS front end.
    app.post(`${url.customer.POST_CUSTOMER_LOGIN_URL}`,
    validateHeaders.verifyToken,
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.passwordValidation(`password`, `passwordnotpresent`, `passwordhavespaces`, `passwordinvalid`),
    customerController.customerLogin);

    // Below route is for the Logout of the customer. This is for NEXTJS front end.
    app.get(`${url.customer.GET_CUSTOMER_LOGOUT_URL}`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.customerLogout);

    // Below route is for the update of the customer. This is for NEXTJS front end.
    app.post(`${url.customer.CUSTOMER_PASSWORD_UPDATE}`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.customers),
    checkInput.passwordValidation(`password`, `passwordnotpresent`, `passwordhavespaces`, `passwordinvalid`),
    checkInput.passwordValidation(`newpassword`, `newpasswordnotpresent`, `newpasswordhavespaces`, `newpasswordinvalid`),
    checkInput.passwordValidation(`confirmnewpassword`, `confirmpasswordnotpresent`, `confirmpasswordhavespaces`, `confirmpasswordinvalid`),
    checkInput.passwordsimilarity,
    customerController.customerChangePassword);

    // Below route is for the signup or registration of the customer. This is for NEXTJS front end.
    app.post(`${url.customer.POST_CUSTOMER_REGISTRATION_NEXTJS}`,
    validateHeaders.verifyToken,
    checkInput.CustomerAddRequestBody,
    checkInput.CheckDataPresentWithDeletedAtDuringCustomerRegistration,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.contactNumberValidation(constants.tableName.customers),
    checkInput.passwordValidation(`password`, `passwordnotpresent`, `passwordhavespaces`, `passwordinvalid`),
    customerController.signup);

    // Below route is for fetching the logs (LOGIN, LOGOUT, Duration time) of the customer. This is for NEXTJS front end.
    app.get(`${url.customer.GET_CUSTOMER_LOGS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerLogs);

    // The below route is for fetching data for the customer dashboard. This is for NEXTJS front end.
    app.get(`${url.customer.GET_CUSTOMER_DASHBOARD_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerDashboard);

    // The below route is for fetching booking data for the customer dashboard. The data is comming from the bookings table. This is for NEXTJS front end.
    app.get(`${url.customer.GET_COMPLETED_BOOKINGS_OF_CUSTOMER_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsCompleted);

    // The below route is for fetching booking data for the customer dashboard [ The booking status must be 'CONFIRM' ]. The data is comming from the bookings table. This is for NEXTJS front end.
    app.get(`${url.customer.GET_CONFIRM_BOOKINGS_OF_CUSTOMER_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsConfirm);

    // The below route is for fetching booking data for the customer dashboard [ The booking status must be 'CANCELLED' ]. The data is comming from the bookings table. This is for NEXTJS front end.
    app.get(`${url.customer.GET_CANCEL_BOOKINGS_OF_CUSTOMER_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsCancelled);

    // The below route is for fetching the recent five enquiried made by the  customer. This route is used in the NEXTJS
    app.get(`${url.customer.GET_RECENT_FIVE_ENQUIRIES_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsRecent);

    // The below route is for fetching the all the booking data from the bookings table. This route is used in the NEXTJS
    app.get(`${url.customer.GET_ALL_BOOKING_CUSTOMER_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllBookings);

    // The below route is for fetching all the enquiries made by the  customer in the decending order from the created_at.
    app.get(`${url.customer.GET_ALL_ENQUIRIES_CUSTOMER_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllEnquiry);

    // The below route is fetching all the booking details of a customer. The data will be taken from the quotations, invoices, payment_records
    app.get(`${url.customer.GET_CUSTOMER_ALL_BOOKING_FROM_INVOICE_TABEL_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllBookingsDataFromInvoice);

    // The below route is fetching all the ACTIVE bookings details of a customer. The data will come from the quotations, invoices, payment_records tables.
    app.get(`${url.customer.GET_CUSTOMER_ACTIVE_BOOKING_FROM_INVOICE_TABEL_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerActiveBookingsDataFromInvoice);

    // The below route is for fetching all booking details. Whose status is invoice status is INACTIVE that means cancelled. The data will come from the quotations, invoices, payment_records tables.
    app.get(`${url.customer.GET_CUSTOMER_CANCEL_BOOKING_FROM_INVOICE_TABEL_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerInactiveBookingsDataFromInvoice);

    // The below route is for fetching all booking details. Whose status is invoice status is STARTED that means trip is STARTED and booking status in the booking table in CONFIRM. The data will come from the quotations, invoices, payment_records tables.    
    app.get(`${url.customer.GET_CUSTOMER_ONGOING_BOOKING_FROM_INVOICE_TABEL_NEXTJS}`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerOngoingBookingsDataFromInvoice);

    // The below route is for edit the present details of the customer. This route will be used in the NEXTJS
    app.put(`${url.customer.PUT_EDIT_CUSTOMER_NEXTJS}:id`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),  
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.contactNumberValidation(constants.tableName.customers),
    // checkInput.dateOfBirthValidation,
    checkInput.idProofNumberValidation,
    checkInput.isAttachmentUploaded(`id_proof_image`, constants.responseMessage.idproofimagenotuploaded),
    customerController.editCustomer);

    // The below route is for display the present details of the customer. This route will be used in the NEXTJS
    app.get(`${url.customer.GET_PARTICULAR_CUSTOMER_DETAIL_NEXTJS}`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.getOneDetailsOnCustomerPage)

    // Below route is for getting data of any  customer
    app.get(`${url.customer.GET_SINGLE_CUSTOMER_DETAIL}`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.getOne);

}
