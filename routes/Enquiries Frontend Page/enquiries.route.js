
const frontEnquiriesController = require(`../../controllers/Enquiries Frontend Page/enquiries.controller`);
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const { isMaximumHorseCarryingCapicityEntered, isValidVehicleTypeEntered } = require("../../middlewares/validateInput/checkRequestInputVehicles");
const validateParamsId = require(`../../middlewares/validateInput/checkRequestparams`);
const constants = require("../../utils/constants");
const verifyBody = require(`../../middlewares/requestValidator`); 



module.exports = function (app)
{
    app.post(`/add/enquiry/:id`,
    verifyBody.verifyToken,
    validateParamsId.isValidIdInTheParams(constants.tableName.customers),
    checkInput.checkCustomerEnquiryBody,
    // checkInput.isIdEntered('customer_id', constants.tableName.customers, 'Customer'),
    checkInput.isIdEntered('vehicle_id', constants.tableName.vehicles, 'Vehicle'),
    checkInput.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
    isMaximumHorseCarryingCapicityEntered,
    isValidVehicleTypeEntered,
    checkInput.checkingDuplicateEnquiry,
    frontEnquiriesController.createNewEnquiry);

    app.get(`/${process.env.apiToken}/get/all/enquiry/customer/:id`,
    validateParamsId.isValidIdInTheParams(constants.tableName.customers),
    checkInput.isPageNumberEntered,
    checkInput.isPageSizeEntered,
    frontEnquiriesController.getParticularCustomerAllEnquiries
    );
};

