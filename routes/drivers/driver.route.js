const driverController = require('../../controllers/drivers/driver.controller');
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{
    // Below route is for getting data of all the drivers
    app.get(`/${process.env.apiToken}/getAll/drivers`, driverController.getAll);

    // Below route is for getting data of any particular driver
    app.get(`/${process.env.apiToken}/getOne/driver/:id`, driverController.getOne);

    // Below route is for adding the driver data
    app.post(`/${process.env.apiToken}/add/driver`,
    verifyBody.name, 
    verifyBody.emailValidation,
    verifyBody.usernamevalidation,
    verifyBody.validateUAEMobileNumber,
    verifyBody.birthdateValidation,
    verifyBody.idProofNumber, 
    driverController.addDriver);

    // Below route is for updating the customer status
    app.put(`/${process.env.apiToken}/update/driver/:id`, driverController.updateStatus);

    // Below route is for removing the customer
    app.put(`/${process.env.apiToken}/remove/driver/:id`, driverController.removeDriver);

    // Below route is for editing the driver data
    app.put(`/${process.env.apiToken}/edit/driver/:id`,
    verifyBody.name, 
    verifyBody.emailValidation,
    verifyBody.usernamevalidation,
    verifyBody.validateUAEMobileNumber,
    verifyBody.birthdateValidation,
    verifyBody.idProofNumber,
    driverController.editDriver);
    
}