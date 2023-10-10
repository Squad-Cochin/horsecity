////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the driver route file. Where all the routes of the driver.controller.js is written. If         //
//     anyone want to use any function of the driver.controller.js file from the frontend. Then they          //
//     have to use the routes which are listed in this file.                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const url = require(`../../utils/url_helper`);
const driverController = require(`../../controllers/drivers/driver.controller`); // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);  // This is the middleware for validating the inputs
const constants = require(`../../utils/constants`); // Constant elements are stored in this file
const { verifyToken } = require("../../middlewares/requestValidator");
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams");


module.exports = function(app)
{
    // Below route is for getting data of all the drivers
    app.post(`${url.driver.POST_ALL_DRIVER}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.getAllDataBody,
    driverController.getAll);

    // Below route is for getting data of any  driver
    app.get(`${url.driver.GET_ONE_DRIVER}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.drivers), 
    driverController.getOne);

    // Below route is for adding the driver data
    app.post(`${url.driver.POST_ADD_DRIVER}:id`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.driverRequestAddBody,
    checkInput.isDriverLicenceImageSubmitted,
    checkInput.isDriverProfileImageSubmitted,
    checkInput.CheckRole,
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

    // Below route is for updating the driver status
    app.put(`${url.driver.PUT_UPDATE_DRIVER_STATUS}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.drivers), 
    driverController.updateStatus);

    // Below route is for removing the driver
    app.put(`${url.driver.PUT_REMOVE_DRIVER}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.drivers), 
    driverController.removeDriver);

    // Below route is for editing the driver data    
    app.put(`${url.driver.PUT_EDIT_DRIVER}:id`,
    verifyToken, 
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

    // The below route is for assigning a driver to a  service provider.
    app.post(`${url.driver.POST_ASSIGN_DRIVER}`,
    verifyToken,
    checkInput.isIdEntered('driver_id', constants.tableName.drivers, 'Driver'),
    checkInput.isIdEntered('serviceProvider_id', constants.tableName.service_providers, 'Service provider'),
    driverController.AssignServiceProvider);
    
    // The below route is for fetching a details past service provider. Where the driver last worked
    app.get(`${url.driver.GET_DRIVER_WORK_HISTROY}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.drivers),
    driverController.getWorkPastServiceProvider);

    // The below route is for removing or unassigning a driver from the service provider
    app.put(`${url.driver.PUT_UNASSIGN_DRIVER}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.assign_drivers), 
    driverController.UnAssignServiceProvider);

    // The below route is for assigning a driver to the service provider
    app.put(`${url.driver.PUT_REMOVE_SERVICE_PROVIDER_PAGE}`,
    verifyToken,
    checkInput.isIdEntered('driver_id', constants.tableName.drivers, 'Driver'),
    checkInput.isIdEntered('serviceProvider_id', constants.tableName.service_providers, 'Service provider'),
    driverController.UnAssignServiceProviderAndDriverBoth);    
}