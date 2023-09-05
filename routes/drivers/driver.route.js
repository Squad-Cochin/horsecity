const driverController = require(`../../controllers/drivers/driver.controller`); // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);  // This is the middleware for validating the inputs
const { 
        isValidIdInTheParams, // This function is for checking the params id
        CheckRole, // Middleware
        driverRequestAddBody // For checking the body of the drivers adding
    } = require(`../../middlewares/validateInput/checkRequestparams`);

const constants = require(`../../utils/constants`); // Constant elements are stored in this file

module.exports = function(app)
{
    // Below route is for getting data of all the drivers
    app.post(
        `/${process.env.apiToken}/getAll/drivers/:id`,
        checkInput.isPageNumberEntered,
        checkInput.isPageSizeEntered,
        isValidIdInTheParams(constants.tableName.service_providers),
        driverController.getAll);

    // Below route is for getting data of any particular driver
    app.get(`/${process.env.apiToken}/getOne/driver/:id`, 
    isValidIdInTheParams(constants.tableName.drivers), 
    driverController.getOne);

    // Below route is for adding the driver data
    app.post(`/${process.env.apiToken}/add/driver/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    driverRequestAddBody,
    checkInput.isDriverLicenceImageSubmitted,
    checkInput.isDriverProfileImageSubmitted,
    CheckRole,
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.drivers),
    checkInput.contactNumberValidation(constants.tableName.drivers),
    // checkInput.dateOfBirthValidation,
    checkInput.isValidDescription,
    checkInput.isValidLicenceNumber,
    checkInput.isValidEmergencyContactNumber, 
    checkInput.isDriverLicenceImageSubmitted,
    checkInput.isDriverProfileImageSubmitted,
    driverController.addDriver
    );

    // Below route is for updating the customer status
    app.put(`/${process.env.apiToken}/update/driver/:id`,
    isValidIdInTheParams(constants.tableName.drivers), 
    driverController.updateStatus);

    // Below route is for removing the customer
    app.put(`/${process.env.apiToken}/remove/driver/:id`, 
    isValidIdInTheParams(constants.tableName.drivers), 
    driverController.removeDriver);

    // Below route is for editing the driver data    
    app.put(`/${process.env.apiToken}/edit/driver/:id`, 
    isValidIdInTheParams(constants.tableName.drivers), 
    checkInput.nameValidation,
    checkInput.emailValidation(constants.tableName.drivers),
    checkInput.contactNumberValidation(constants.tableName.drivers),
    checkInput.isValidEmergencyContactNumber,
    // checkInput.dateOfBirthValidation,
    checkInput.isValidLicenceNumber,
    checkInput.isValidDescription,
    checkInput.isDriverLicenceImageSubmitted,
    checkInput.isDriverProfileImageSubmitted,
    driverController.editDriver
    );

    // The below route is for assigning a driver to a particular service provider.
    app.post(`/${process.env.apiToken}/assign/driver`,
    checkInput.isIdEntered('driver_id', constants.tableName.drivers, 'Driver'),
    checkInput.isIdEntered('serviceProvider_id', constants.tableName.service_providers, 'Service provider'),
    driverController.AssignServiceProvider);
    
    // The below route is for fetching a details past service provider. Where the driver last worked
    app.get(`/${process.env.apiToken}/past/service/provider/driver/:id`,
    isValidIdInTheParams(constants.tableName.drivers),
    driverController.getWorkPastServiceProvider);

    // The below route is for removing or unassigning a driver from the service provider
    app.put(`/${process.env.apiToken}/unassign/driver/:id`,
    isValidIdInTheParams(constants.tableName.assign_drivers), 
    driverController.UnAssignServiceProvider);

    // The below route is for assigning a driver to the service provider
    app.put(`/${process.env.apiToken}/un/assign/serviceProvider`,
    checkInput.isIdEntered('driver_id', constants.tableName.drivers, 'Driver'),
    checkInput.isIdEntered('serviceProvider_id', constants.tableName.service_providers, 'Service provider'),
    driverController.UnAssignServiceProviderAndDriverBoth);    
}