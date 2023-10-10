const enquiry = require(`../../controllers/enquiries/enquiries.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);   // Importing the body Middleware
const validateParamsId = require(`../../middlewares/validateInput/checkRequestparams`); // Importing the params middleware
const constants = require("../../utils/constants"); // Constant elements are stored in this file
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the headers middleware
const url = require(`../../utils/url_helper`);

const { verifyToken } = require("../../middlewares/requestValidator");
const { isValidVehicleTypeEntered } = require("../../middlewares/validateInput/checkRequestInputVehicles"); // This function is for checking the vehicle type


module.exports = function(app)
{
    /**For getting all enquiries basis user id & page & limit  */
    app.post(`${url.enquiries.POST_GET_ALL_ENQUIRIES}`,
    verifyToken,
    enquiry.getAllEnquiries); 
    
    /**For getting one enquiries */
    app.get(`${url.enquiries.GET_ONE_ENQUIRY}`,
    verifyToken,
    enquiry.getOneEnquiry);

     // The below route is for creating a new enquiry of a  customer on the basis of customer id in the params. This will be used in the NEXTJS FRONT END
     app.post(`${url.enquiries.POST_ADD_ENQUIRY}`,
     verifyBody.verifyToken,
     validateParamsId.isValidIdInTheParams(constants.tableName.customers),
     checkInput.checkCustomerEnquiryBody,
     checkInput.isIdEntered('vehicle_id', constants.tableName.vehicles, 'Vehicle'),
     checkInput.isIdEntered('service_provider_id', constants.tableName.service_providers, 'Service provider'),
     isValidVehicleTypeEntered,
     checkInput.checkingDuplicateEnquiry,
     enquiry.createNewEnquiry);
}  