const spcontroller = require(`../../controllers/service-provider/serviceProvider`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    // app.post(`/${process.env.apiToken}/recoveryPassword`,verifyBody.emailvalidation, authcontroller.resetPasswordUsingEmail);  
    /**For geting all service provider  */
    app.post(`/${process.env.apiToken}/getAll/serviceproviders`,spcontroller.getAllServiceProviders); 
    /**For adding new service provider  */
    app.post(`/${process.env.apiToken}/add/serviceprovider`,verifyBody.emailValidation,verifyBody.usernamevalidation,verifyBody.nameAvailable,verifyBody.contactPersonAvailable,verifyBody.contactAddressAvailable,verifyBody.passwordValidation,verifyBody.licenceImageAvailable,verifyBody.validateUAEMobileNumber,verifyBody.validateUAELicenseNumber,spcontroller.addNewServiceProvider);
       /**For changing status service provider  */ 
    app.put(`/${process.env.apiToken}/update/serviceprovider/:id`, spcontroller.updateStatus);
       /**For removing service provider  */
    app.put(`/${process.env.apiToken}/remove/serviceprovider/:id`, spcontroller.removeServiceProvider);
    // Below route is for getting data of any particular service provider
    app.get(`/${process.env.apiToken}/getOne/serviceprovider/:id`, spcontroller.getOneServiceProvider);
}