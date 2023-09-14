//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the vehicle.route.file . Where all the routes of the vehicle.controller.js is written. If        //
//     anyone want to use any function of the vehicle.controller.js file from the frontend. Then they           //
//     have to use the routes which are listed in this file.                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const vehicleController = require('../../controllers/vehicles/vehicles.controller');  // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require(`../../middlewares/validateInput/checkRequestInputVehicles`); // Importing the body Middleware
const checkInputGetAll = require(`../../middlewares/validateInput/checkRequestBodyInput`); // Importing the body Middleware
const constants = require('../../utils/constants'); // Constant elements are stored in this file
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');  // Importing the params middleware
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the headers middleware

module.exports = (app) =>
{
    // The below route is for adding the new vehicle data.
    app.post(`/${process.env.apiToken}/addNew/vehicle/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInputGetAll.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
    checkInput.isValidVehicleNumberEntered,
    checkInput.isInsurancePolicyNumberEntered,
    checkInput.isVehicleRegistrationNumberEntered,
    checkInput.checkVehicleBodyEntered,
    checkInput.isAirConditionerValueEntered,
    checkInput.isTemperaturControlValueEntered,
    checkInput.isGCCTravelValueEntered,
    checkInput.isInsuranceCoverValueEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isSafetyCertificateAdded,            
    vehicleController.addNew);
    
    // The below route is for getting all the vehicles data.
    app.post(`/${process.env.apiToken}/getAll/vehicles/:id`, 
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInputGetAll.isPageNumberEntered,
    checkInputGetAll.isPageSizeEntered,
    vehicleController.getAll);
    
    // the below route is for updating the status of the vehicle data.
    app.put(`/${process.env.apiToken}/updateStatus/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.updateStatus);
    
    // The below route is for get individual vehicle data.
    app.get(`/${process.env.apiToken}/getOne/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles), 
    vehicleController.getOne);

    // The below route is for updating particular vehicle data.
    app.put(`/${process.env.apiToken}/edit/vehicle/:id`,
    isValidIdInTheParams(constants.tableName.vehicles), 
    checkInputGetAll.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
    checkInput.isValidVehicleNumberEntered,
    checkInput.isVehicleRegistrationNumberEntered,
    checkInput.isInsurancePolicyNumberEntered,
    checkInput.checkVehicleBodyEntered,
    checkInput.isAirConditionerValueEntered,
    checkInput.isTemperaturControlValueEntered,
    checkInput.isGCCTravelValueEntered,
    checkInput.isInsuranceCoverValueEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isSafetyCertificateAdded,
    vehicleController.updateData);

    // The below route is for getting all the images of a particular vehicle data.
    app.get(`/${process.env.apiToken}/getAllImages/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.getAllImages);

    // The below route is for removing or deleting the particular vehicle data.
    app.put(`/${process.env.apiToken}/removeVehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.removeVehicle);

    // The below route will be used in the next js for showing the details of sprticulart vehicle on the cyustomer front end
    app.get(`/customer/getOne/vehicle/:id`, 
    verifyBody.verifyToken,
    isValidIdInTheParams(constants.tableName.vehicles),
    vehicleController.getVehicleDetailForCustomerPage);
};