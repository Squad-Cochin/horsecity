const vehicleController = require('../../controllers/vehicles/vehicles.controller');
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
const checkInput = require(`../../middlewares/validateInput/checkRequestInputVehicles`);
const constants = require('../../utils/constants');

module.exports = (app) =>
{
    // The below route is for adding the new vehicle data.
    app.post(`/${process.env.apiToken}/addNew/vehicle`,
    checkInput.isServiceProviderIdEntered(constants.tableName.service_providers),
    checkInput.isValidVehicleNumberEntered(constants.tableName.vehicles),
    checkInput.isManufacturerEntered,
    checkInput.isColorEntered,
    checkInput.isModelEntered,
    checkInput.isLengthEntered,
    checkInput.isBreadthEntered,
    checkInput.isheightEntered,
    checkInput.isMaximumHorseCarryingCapicityEntered,
    checkInput.isAirConditionerValueEntered,
    checkInput.isTemperaturControlValueEntered,
    checkInput.isRegistrationNumberEntered,
    checkInput.isGCCTravelValueEntered,
    checkInput.isInsuranceCoverValueEntered,
    // checkInput.isValidInsuranceCoverDateEntered,
    checkInput.isInsuranceNumberEntered,
    checkInput.insurancePolicyProviderEntered,
    // checkInput.isValidInsuranceExpirationDateEntered,
    checkInput.isValidVehicleTypeEntered,
    // checkInput.isValidVehicleRegistrationDateEntered,
    // checkInput.isValidVehicleExpirationDateEntered,              
    vehicleController.addNew);
    
    // The below route is for getting all the vehicles data.
    app.post(`/${process.env.apiToken}/getAll/vehicles`, vehicleController.getAll);
    
    // the below route is for updating the status of the vehicle data.
    app.put(`/${process.env.apiToken}/updateStatus/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.updateStatus);
    
    // The below route is for get individual vehicle data.
    app.get(`/${process.env.apiToken}/getOne/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles), 
    vehicleController.getOne);

    // The below route is for updating particular vehicle data.
    app.put(`/${process.env.apiToken}/updateData/vehicle/:id`,
    checkInput.isServiceProviderIdEntered(constants.tableName.service_providers),
    checkInput. isValidVehicleNumberEnteredWhileUpdate(constants.tableName.vehicles),
    checkInput.isManufacturerEntered,
    checkInput.isColorEntered,
    checkInput.isModelEntered,
    checkInput.isLengthEntered,
    checkInput.isBreadthEntered,
    checkInput.isheightEntered,
    checkInput.isMaximumHorseCarryingCapicityEntered,
    checkInput.isAirConditionerValueEntered,
    checkInput.isTemperaturControlValueEntered,
    // checkInput.isRegistrationNumberEntered,
    checkInput.isGCCTravelValueEntered,
    checkInput.isInsuranceCoverValueEntered,
    checkInput.isValidInsuranceCoverDateEntered,
    // checkInput.isInsuranceNumberEntered,
    checkInput.insurancePolicyProviderEntered,
    checkInput.isValidInsuranceExpirationDateEntered,
    checkInput.isValidVehicleTypeEntered,
    checkInput.isValidVehicleRegistrationDateEntered,
    checkInput.isValidVehicleExpirationDateEntered,
    isValidIdInTheParams(constants.tableName.vehicles), 
    vehicleController.updateData);

    // The below route is for getting all the images of a particular vehicle data.
    app.get(`/${process.env.apiToken}/getAllImages/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.getAllImages);

    // The below route is for removing or deleting the particular vehicle data.
    app.put(`/${process.env.apiToken}/removeVehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),  
    vehicleController.removeVehicle);
};