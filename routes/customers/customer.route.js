const customerController = require('../../controllers/customers/customer.controller');
const checkInput = require(`../../middlewares/checkRequestInput`);
const constants = require('../../utils/constants');

module.exports = (app) =>
{
    // Below route is for getting data of all the customers
    app.get(`/${process.env.apiToken}/getAll/customers`, customerController.getAll);    
    // Below route is for getting data of any particular customer
    app.get(`/${process.env.apiToken}/getOne/customer/:id`, customerController.getOne);
    
    // Below route is for adding the customer data
    app.post(`/${process.env.apiToken}/add/customer`, 
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.customers),
    checkInput.usernameValidation(constants.tableName.customers),
    checkInput.passwordValidation,
    checkInput.contactNumberValidation(constants.tableName.customers),
    checkInput.dateOfBirthValidation,
    checkInput.idProofValidation,
    customerController.addCustomer);


    // Below route is for removing the customer
    app.put(`/${process.env.apiToken}/remove/customer/:id`, customerController.removeCustomer);

    // Below route is for updating the customer status
    app.put(`/${process.env.apiToken}/update/customer/:id`, customerController.updateStatus);

    // Below route is for editing the customer data
    app.put(`/${process.env.apiToken}/edit/customer/:id`,
            checkInput.nameValidation,
            checkInput.emailValidation(constants.tableName.customers),
            checkInput.usernameValidation(constants.tableName.customers),
            checkInput.passwordValidation,
            checkInput.contactNumberValidation(constants.tableName.customers),
            checkInput.dateOfBirthValidation,
            checkInput.idProofValidation,
            customerController.editCustomer
           );



    
}
