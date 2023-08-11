const customerController = require('../../controllers/customers/customer.controller');
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const { isValidIdInTheParams, CheckRole } = require('../../middlewares/validateInput/checkRequestparams');
const constants = require('../../utils/constants');

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
}
