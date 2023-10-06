//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the enquiries.route.file . Where all the routes of the enquiries.controller.js is written. If    //
//     anyone want to use any function of the enquiries.controller.js file from the frontend. Then they         //
//     have to use the routes which are listed in this file. This routes are mostly used in the NEXTJS frontend //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const frontEnquiriesController = require(`../../controllers/Enquiries Frontend Page/enquiries.controller`); // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);   // Importing the body Middleware
const { isValidVehicleTypeEntered } = require("../../middlewares/validateInput/checkRequestInputVehicles"); // This function is for checking the vehicle type
const validateParamsId = require(`../../middlewares/validateInput/checkRequestparams`); // Importing the params middleware
const constants = require("../../utils/constants"); // Constant elements are stored in this file
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the headers middleware

module.exports = function (app)
{
    // The below route is for creating a new enquiry of a  customer on the basis of customer id in the params. This will be used in the NEXTJS FRONT END
    app.post(`/add/enquiry/:id`,
    verifyBody.verifyToken,
    validateParamsId.isValidIdInTheParams(constants.tableName.customers),
    checkInput.checkCustomerEnquiryBody,
    checkInput.isIdEntered('vehicle_id', constants.tableName.vehicles, 'Vehicle'),
    checkInput.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
    isValidVehicleTypeEntered,
    checkInput.checkingDuplicateEnquiry,
    frontEnquiriesController.createNewEnquiry);
};

