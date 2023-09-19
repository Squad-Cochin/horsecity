////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the customer route file. Where all the routes of the customer.controller.js is written. If     //
//     anyone want to use any function of the customer.controller.js file from the frontend. Then they        //
//     have to use the routes which are listed in this file.                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const customerController = require('../../controllers/customers/customer.controller');  // importing the auth controller details and assigning it to the authcontroller variable
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`); // Importing the body Middleware
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams'); // Importing the params middleware
const constants = require('../../utils/constants');  // Constant elements are stored in this file
const validateHeaders = require(`../../middlewares/requestValidator`); // Importing the headers middleware

module.exports = (app) =>
{
    // Below route is for getting data of all the customers
    app.post(`/${process.env.apiToken}/getAll/customers/:id`, 
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.isPageNumberEntered,
    checkInput.isPageSizeEntered,
    customerController.getAll);

    // Below route is for getting data of any  customer
    app.get(`/${process.env.apiToken}/getOne/customer/:id`, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.getOne);
    
    // Below route is for adding the customer data
    app.post(`/${process.env.apiToken}/add/customer/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.CustomerAddRequestBody,
    checkInput.CheckDataPresentWithDeletedAt,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.passwordValidation,
    checkInput.contactNumberValidation(constants.tableName.customers),
    // checkInput.dateOfBirthValidation,
    checkInput.idProofNumberValidation,
    checkInput.isCustomerIdProofImageSubmitted,
    customerController.addCustomer);

    // Below route is for removing the customer
    app.put(`/${process.env.apiToken}/remove/customer/:id`, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.removeCustomer);

    // Below route is for updating the customer status
    app.put(`/${process.env.apiToken}/update/customer/:id`, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.updateStatus);

    // Below route is for editing the customer data
    app.put(`/${process.env.apiToken}/edit/customer/:id`, 
            isValidIdInTheParams(constants.tableName.customers), 
            checkInput.nameValidation,
            checkInput.emailValidation(constants.tableName.customers),
            checkInput.usernameValidation(constants.tableName.customers),
            checkInput.contactNumberValidation(constants.tableName.customers),
            // checkInput.dateOfBirthValidation,
            checkInput.idProofNumberValidation,
            checkInput.isCustomerIdProofImageSubmitted,
            customerController.editCustomer);
    
    // Below route is for the login of the customer. This is for NEXTJS front end.
    app.post(`/customer/login`,
    validateHeaders.verifyToken,
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.passwordValidation,
    customerController.customerLogin);

    // Below route is for the Logout of the customer. This is for NEXTJS front end.
    app.get(`/customer/logout/:id`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.customerLogout);

    // Below route is for the update of the customer. This is for NEXTJS front end.
    app.post(`/customer/password/update/:id`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.customers),
    checkInput.passwordValidation,
    checkInput.newpassword,
    checkInput.confirmnewpassword,
    checkInput.passwordsimilarity,
    customerController.customerChangePassword);

    // Below route is for the signup or registration of the customer. This is for NEXTJS front end.
    app.post(`/customer/registration`,
    validateHeaders.verifyToken,
    checkInput.CustomerAddRequestBody,
    checkInput.CheckDataPresentWithDeletedAtDuringCustomerRegistration,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.contactNumberValidation(constants.tableName.customers),
    checkInput.passwordValidation,
    // checkInput.dateOfBirthValidation,
    // checkInput.idProofNumberValidation,
    // checkInput.isCustomerIdProofImageSubmitted,
    customerController.signup);

    // Below route is for fetching the logs (LOGIN, LOGOUT, Duration time) of the customer. This is for NEXTJS front end.
    app.get(`/customer/logs/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerLogs);

    // The below route is for fetching data for the customer dashboard. This is for NEXTJS front end.
    app.get(`/customer/dasboard/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerDashboard);

    // The below route is for fetching booking data for the customer dashboard. The data is comming from the bookings table. This is for NEXTJS front end.
    app.get(`/customer/booking/completed/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsCompleted);

    // The below route is for fetching booking data for the customer dashboard [ The booking status must be 'CONFIRM' ]. The data is comming from the bookings table. This is for NEXTJS front end.
    app.get(`/customer/booking/confirm/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsConfirm);

    // The below route is for fetching booking data for the customer dashboard [ The booking status must be 'CANCELLED' ]. The data is comming from the bookings table. This is for NEXTJS front end.
    app.get(`/customer/booking/cancelled/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsCancelled);

    // The below route is for fetching the recent five enquiried made by the  customer. This route is used in the NEXTJS
    app.get(`/customer/booking/recent/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsRecent);

    // The below route is for fetching the all the booking data from the bookings table. This route is used in the NEXTJS
    app.get(`/customer/booking/data/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllBookings);

    // The below route is for fetching all the enquiries made by the  customer in the decending order from the created_at.
    app.get(`/customer/all/enquiries/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllEnquiry);

    // The below route is fetching all the booking details of a  customer. The data will be taken from the quotations, invoices, payment_records
    app.get(`/customer/all/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllBookingsDataFromInvoice);

    // The below route is fetching all the ACTIVE bookings details of a  customer. The data will come from the quotations, invoices, payment_records tables.
    app.get(`/customer/active/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerActiveBookingsDataFromInvoice);

    // The below route is for fetching all booking details. Whose status is invoice status is INACTIVE that means cancelled. The data will come from the quotations, invoices, payment_records tables.
    app.get(`/customer/inactive/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerInactiveBookingsDataFromInvoice);

    // The below route is for fetching all booking details. Whose status is invoice status is STARTED that means trip is STARTED and booking status in the booking table in CONFIRM. The data will come from the quotations, invoices, payment_records tables.    
    app.get(`/customer/ongoing/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerOngoingBookingsDataFromInvoice);

    // The below route is for edit the present details of the customer. This route will be used in the NEXTJS
    app.put(`/customer/edit/details/:id`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),  
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.contactNumberValidation(constants.tableName.customers),
    // checkInput.dateOfBirthValidation,
    checkInput.idProofNumberValidation,
    checkInput.isCustomerIdProofImageSubmitted,
    customerController.editCustomerDetailsFromCustomerSide);

    // The below route is for display the present details of the customer. This route will be used in the NEXTJS
    app.get(`/customer/view/detail/:id`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.getOneDetailsOnCustomerPage)

}
