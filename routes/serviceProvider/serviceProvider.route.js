const spcontroller = require(`../../controllers/service-provider/serviceProvider.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../utils/url_helper`)

module.exports = function(app)
{

    /**The below route for geting all service provider basis of page & limit   */
    app.post(`${url.service_provider.POST_ALL_SERVICE_PROIVDERS_WITH_LIMIT}`,
    verifyBody.verifyToken,
    spcontroller.getAllServiceProviders); 

    /**The below route for geting all service provider name  */
    app.get(`${url.service_provider.GET_SERVICE_PROVIDER_NAMES}`,
    verifyBody.verifyToken,
    spcontroller.getNameServiceProviders); 

    /**The below route for adding new service provider  */
    app.post(`${url.service_provider.POST_ADD_SERVICE_PROVIDER}`,
    verifyBody.verifyToken,
    verifyBody.VerifyRoleId, 
    verifyBody.nameAvailable,
    verifyBody.emailValidation,
    verifyBody.usernamevalidation,
    verifyBody.passwordValidation,
    verifyBody.contactPersonAvailable,
    verifyBody.validateUAEMobileNumber,
    verifyBody.contactAddressAvailable,
    verifyBody.validateUAELicenseNumber,
    verifyBody.licenceImageAvailable,
    spcontroller.addNewServiceProvider);

    /**The below route for updating  service provider  */ 
    app.put(`${url.service_provider.PUT_EDIT_SERVICE_PROVIDER}:id`,
    verifyBody.verifyToken,
    verifyBody.VerifyRoleId,
    verifyBody.nameAvailable,
    verifyBody.emailValidation,
    verifyBody.usernamevalidation,
    verifyBody.contactPersonAvailable,
    verifyBody.validateUAEMobileNumber,
    verifyBody.contactAddressAvailable,
    verifyBody.validateUAELicenseNumber,
    spcontroller.updateServiceProvider);

    /**The below route for changing status service provider  */ 
    app.put(`${url.service_provider.PUT_UPDATE_SERVICE_PROVIDER_STATUS}`,
    verifyBody.verifyToken, 
    spcontroller.updateStatus);

    /**The below route for removing service provider  */
    app.put(`${url.service_provider.PUT_REMOVE_SERVICE_PROVIDER}`,
    verifyBody.verifyToken, 
    spcontroller.removeServiceProvider);

    // Below route is for getting data of any particular service provider
    app.get(`${url.service_provider.GET_PARTICULAR_SERVICE_PROVIDER_DETAILS}`,
    verifyBody.verifyToken, 
    spcontroller.getOneServiceProvider);

    /**The below route for getting particlar service provider vehicle */
    app.get(`${url.service_provider.GET_PARTICULAR_SERVICE_PROVIDER_VEHICLES}`,
    verifyBody.verifyToken, 
    spcontroller.getSpVehicles);

    /**The below route for getting particlar service provider driver */
    app.get(`${url.service_provider.GET_PARTICULAR_SERVICE_PROVIDER_DRIVERS}`,
    verifyBody.verifyToken, 
    spcontroller.getSpDrivers);

    /**The below route for getting role list */
    app.get(`${url.service_provider.GET_ROLES_LIST}`,
    verifyBody.verifyToken, 
    spcontroller.getRoleList);
}