const customerController = require('../../controllers/customers/customer.controller');
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const { isValidIdInTheParams, CheckRole } = require('../../middlewares/validateInput/checkRequestparams');
const constants = require('../../utils/constants');
const validateHeaders = require(`../../middlewares/requestValidator`);

module.exports = (app) =>
{
    // Below route is for getting data of all the customers
    app.post(`/${process.env.apiToken}/getAll/customers/:id`, 
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.isPageNumberEntered,
    checkInput.isPageSizeEntered,
    customerController.getAll);

    // Below route is for getting data of any particular customer
    app.get(`/${process.env.apiToken}/getOne/customer/:id`, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.getOne);
    
    // Below route is for adding the customer data
    app.post(`/${process.env.apiToken}/add/customer/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.passwordValidation,
    checkInput.contactNumberValidation(constants.tableName.customers),
    // checkInput.dateOfBirthValidation,
    checkInput.idProofNumberValidation,
    checkInput.isCustomerIdProofImageSubmitted,
    customerController.addCustomer
    );

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
            customerController.editCustomer
           );
    
    app.post(`/customer/login`,
    validateHeaders.verifyToken,
    checkInput.passwordValidation,
    customerController.customerLogin);

    app.get(`/customer/logout/:id`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.customerLogout);

    app.post(`/customer/password/update/:id`,
    validateHeaders.verifyToken,
    isValidIdInTheParams(constants.tableName.customers),
    checkInput.passwordValidation,
    checkInput.newpassword,
    checkInput.confirmnewpassword,
    checkInput.passwordsimilarity,
    customerController.customerChangePassword);

    app.post(`/customer/registration`,
    validateHeaders.verifyToken,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.contactNumberValidation(constants.tableName.customers),
    checkInput.passwordValidation,
    // checkInput.dateOfBirthValidation,
    // checkInput.idProofNumberValidation,
    // checkInput.isCustomerIdProofImageSubmitted,
    customerController.signup);

    app.get(`/customer/logs/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerLogs
    );

    app.get(`/customer/dasboard/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerDashboard
    );

    app.get(`/customer/booking/completed/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsCompleted);

    app.get(`/customer/booking/confirm/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsConfirm);

    app.get(`/customer/booking/cancelled/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsCancelled);

    app.get(`/customer/booking/recent/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularBookinDetailsRecent);

    app.get(`/customer/booking/data/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllBookings);

    app.get(`/customer/all/enquiries/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllEnquiry);

    app.get(`/customer/all/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerAllBookingsDataFromInvoice);

    app.get(`/customer/active/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerActiveBookingsDataFromInvoice);

    app.get(`/customer/inactive/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerInactiveBookingsDataFromInvoice);

    app.get(`/customer/ongoing/booking/data/invoice/table/:id`,
    validateHeaders.verifyToken,   
    isValidIdInTheParams(constants.tableName.customers), 
    customerController.getParticularCustomerOngoingBookingsDataFromInvoice);

    app.put(`/customer/edit/details/:id`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),  
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.contactNumberValidation(constants.tableName.customers),
    checkInput.dateOfBirthValidation,
    checkInput.idProofNumberValidation,
    checkInput.isCustomerIdProofImageSubmitted,
    customerController.editCustomerDetailsFromCustomerSide);

    app.get(`/customer/view/detail/:id`,
    validateHeaders.verifyToken, 
    isValidIdInTheParams(constants.tableName.customers),
    customerController.getOneDetailsOnCustomerPage)

}
