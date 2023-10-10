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
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the headers middleware
const url = require(`../../utils/url_helper`);
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');  // Importing the params middleware



module.exports = (app) =>
{
    // The below route is for adding the new vehicle data.
    app.post(`${url.vehicles.POST_ADD_NEW_VEHICLE}:id`,
    verifyBody.verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInputGetAll.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
    checkInput.isValidVehicleNumberEntered,
    checkInput.isInsurancePolicyNumberEntered,
    checkInput.isVehicleRegistrationNumberEntered,
    checkInput.checkVehicleBodyEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isSafetyCertificateAdded,        
    vehicleController.addNew);
    
    // The below route is for getting all the vehicles data.
    app.post(`${url.vehicles.POST_GET_ALL_VEHICLES}`,
    verifyBody.verifyToken, 
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInputGetAll.getAllDataBody,
    vehicleController.getAll);
    
    // the below route is for updating the status of the vehicle data.
    app.put(`${url.vehicles.PUT_UPDATE_VEHICLE_STATUS}`,
    verifyBody.verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.updateStatus);
    
    // The below route is for get individual vehicle data.
    app.get(`${url.vehicles.GET_PARTICULAR_VEHICLE}`,
    verifyBody.verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles), 
    vehicleController.getOne);

    // The below route is for updating  vehicle data.
    app.put(`${url.vehicles.PUT_EDIT_VEHICLE}:id`,
    verifyBody.verifyToken,
    isValidIdInTheParams(constants.tableName.vehicles), 
    checkInputGetAll.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
    checkInput.isValidVehicleNumberEntered,
    checkInput.isVehicleRegistrationNumberEntered,
    checkInput.isInsurancePolicyNumberEntered,
    checkInput.checkVehicleBodyEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isSafetyCertificateAdded,
    vehicleController.updateData);

    // The below route is for getting all the images of a  vehicle data.
    app.get(`${url.vehicles.GET_IMAGES_PARTICULAR_VEHICLE}`,
    verifyBody.verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.getAllImages);

    // The below route is for removing or deleting the  vehicle data.
    app.put(`${url.vehicles.PUT_REMOVE_VEHICLE}`,
    verifyBody.verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.removeVehicle);

    // The below route will be used in the next js for showing the details of sprticulart vehicle on the cyustomer front end
    app.get(`${url.vehicles.GET_OVERALL_VEHICLE_REPORT_NEXTJS}`,
    verifyBody.verifyToken,
    isValidIdInTheParams(constants.tableName.vehicles),
    vehicleController.getVehicleDetailForCustomerPage);
};