const vehicleController = require('../../controllers/vehicles/vehicles.controller');
const checkInput = require(`../../middlewares/validateInput/checkRequestInputVehicles`);
const checkInputGetAll = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const constants = require('../../utils/constants');
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
const verifyBody = require(`../../middlewares/requestValidator`); 

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
    checkInput.isLengthEntered,
    checkInput.isBreadthEntered,
    checkInput.isheightEntered,
    checkInput.isMaximumHorseCarryingCapicityEntered,
    checkInput.isAirConditionerValueEntered,
    checkInput.isTemperaturControlValueEntered,
    checkInput.isGCCTravelValueEntered,
    checkInput.isInsuranceCoverValueEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isPriceEntered,
    // checkInput.isValidInsuranceCoverDateEntered,
    // checkInput.isValidInsuranceExpirationDateEntered,
    // checkInput.isValidVehicleRegistrationDateEntered,
    // checkInput.isValidVehicleExpirationDateEntered,
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
    checkInput.isLengthEntered,
    checkInput.isBreadthEntered,
    checkInput.isheightEntered,
    checkInput.isMaximumHorseCarryingCapicityEntered,
    checkInput.isAirConditionerValueEntered,
    checkInput.isTemperaturControlValueEntered,
    checkInput.isGCCTravelValueEntered,
    checkInput.isInsuranceCoverValueEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isPriceEntered,
    // checkInput.isValidInsuranceCoverDateEntered,
    // checkInput.isValidInsuranceExpirationDateEntered,
    // checkInput.isValidVehicleRegistrationDateEntered,
    // checkInput.isValidVehicleExpirationDateEntered,
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

    app.get(`/customer/getOne/vehicle/:id`, 
    verifyBody.verifyToken,
    isValidIdInTheParams(constants.tableName.vehicles),
    vehicleController.getVehicleDetailForCustomerPage);
};