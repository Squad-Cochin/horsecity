const driverController = require('../../controllers/drivers/driver.controller');
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
const constants = require('../../utils/constants');

module.exports = function(app)
{
    // Below route is for getting data of all the drivers
    app.post(`/${process.env.apiToken}/getAll/drivers`, 
    checkInput.isPageNumberEntered,
    checkInput.isPageSizeEntered,
    driverController.getAll);

    // Below route is for getting data of any particular driver
    app.get(`/${process.env.apiToken}/getOne/driver/:id`, isValidIdInTheParams(constants.tableName.drivers),  driverController.getOne);

    // Below route is for adding the driver data
    app.post(`/${process.env.apiToken}/add/driver`,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.drivers),
    checkInput.contactNumberValidation(constants.tableName.drivers),
    // checkInput.dateOfBirthValidation,
    checkInput.isValidDescription,
    checkInput.isValidLicenceNumber,
    checkInput.isValidEmergencyContactNumber,    
    driverController.addDriver
    );

    // Below route is for updating the customer status
    app.put(`/${process.env.apiToken}/update/driver/:id`, isValidIdInTheParams(constants.tableName.drivers),  driverController.updateStatus);

    // Below route is for removing the customer
    app.put(`/${process.env.apiToken}/remove/driver/:id`, isValidIdInTheParams(constants.tableName.drivers),  driverController.removeDriver);

    // Below route is for editing the driver data
    app.put(`/${process.env.apiToken}/edit/driver/:id`, isValidIdInTheParams(constants.tableName.drivers), 
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.drivers),
    checkInput.contactNumberValidation(constants.tableName.drivers),
    checkInput.dateOfBirthValidation,
    checkInput.isValidDescription,
    checkInput.isValidLicenceNumber,
    checkInput.isValidEmergencyContactNumber, 
    driverController.editDriver);
    
}