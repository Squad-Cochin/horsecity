const spcontroller = require(`../../controllers/service-provider/serviceProvider`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    /**For geting all service provider  */
    app.post(`/${process.env.apiToken}/getAll/serviceproviders`,spcontroller.getAllServiceProviders); 

    /**For geting all service provider username  */
    app.get(`/${process.env.apiToken}/getAll/serviceprovidersName`,spcontroller.getNameServiceProviders); 

    /**For adding new service provider  */
    app.post(`/${process.env.apiToken}/add/serviceprovider`,verifyBody.nameAvailable,verifyBody.emailValidation,verifyBody.usernamevalidation,verifyBody.contactPersonAvailable,verifyBody.validateUAEMobileNumber,verifyBody.contactAddressAvailable,verifyBody.validateUAELicenseNumber,verifyBody.licenceImageAvailable,spcontroller.addNewServiceProvider);

    app.put(`/${process.env.apiToken}/update/serviceprovider/:id`,verifyBody.nameAvailable,verifyBody.emailValidation,verifyBody.usernamevalidation,verifyBody.contactPersonAvailable,verifyBody.validateUAEMobileNumber,verifyBody.contactAddressAvailable,verifyBody.validateUAELicenseNumber,spcontroller.updateServiceProvider);

    /**For changing status service provider  */ 
    app.put(`/${process.env.apiToken}/update-status/serviceprovider/:id`, spcontroller.updateStatus);

    /**For removing service provider  */
    app.put(`/${process.env.apiToken}/remove/serviceprovider/:id`, spcontroller.removeServiceProvider);

    // Below route is for getting data of any particular service provider
    app.get(`/${process.env.apiToken}/getOne/serviceprovider/:id`, spcontroller.getOneServiceProvider);

    /**For getting particlar service provider vehicle */
    app.get(`/${process.env.apiToken}/serviceprovider/vehicle/:id`, spcontroller.getSpVehicles);

    /**For getting particlar service provider driver */
    app.get(`/${process.env.apiToken}/serviceprovider/driver/:id`, spcontroller.getSpDrivers);


}