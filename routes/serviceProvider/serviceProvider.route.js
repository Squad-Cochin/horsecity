const spcontroller = require(`../../controllers/service-provider/serviceProvider`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    /**The below route for geting all service provider basis of page & limit   */
    app.post(`/${process.env.apiToken}/getAll/serviceproviders/:id`,spcontroller.getAllServiceProviders); 

    /**The below route for geting all service provider name  */
    app.get(`/${process.env.apiToken}/getAll/serviceprovidersName`,spcontroller.getNameServiceProviders); 

    /**The below route for adding new service provider  */
    app.post(`/${process.env.apiToken}/add/serviceprovider`,
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
    app.put(`/${process.env.apiToken}/update/serviceprovider/:id`,verifyBody.VerifyRoleId,verifyBody.nameAvailable,verifyBody.emailValidation,verifyBody.usernamevalidation,verifyBody.contactPersonAvailable,verifyBody.validateUAEMobileNumber,verifyBody.contactAddressAvailable,verifyBody.validateUAELicenseNumber,spcontroller.updateServiceProvider);

    /**The below route for changing status service provider  */ 
    app.put(`/${process.env.apiToken}/update-status/serviceprovider/:id`, spcontroller.updateStatus);

    /**The below route for removing service provider  */
    app.put(`/${process.env.apiToken}/remove/serviceprovider/:id`, spcontroller.removeServiceProvider);

    // Below route is for getting data of any particular service provider
    app.get(`/${process.env.apiToken}/getOne/serviceprovider/:id`, spcontroller.getOneServiceProvider);

    /**The below route for getting particlar service provider vehicle */
    app.get(`/${process.env.apiToken}/serviceprovider/vehicle/:id`, spcontroller.getSpVehicles);

    /**The below route for getting particlar service provider driver */
    app.get(`/${process.env.apiToken}/serviceprovider/driver/:id`, spcontroller.getSpDrivers);

    /**The below route for getting role list */
    app.get(`/${process.env.apiToken}/role/list`, spcontroller.getRoleList);


}