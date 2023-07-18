const spcontroller = require(`../../controllers/service-provider/serviceProvider`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    // app.post(`/${process.env.apiToken}/recoveryPassword`,verifyBody.emailvalidation, authcontroller.resetPasswordUsingEmail);  

    app.post(`/${process.env.apiToken}/get-all/serviceproviders`,spcontroller.getAllServiceProviders); 
    app.post(`/${process.env.apiToken}/add-new/serviceprovider`,verifyBody.emailValidation,verifyBody.usernamevalidation,verifyBody.nameAvailable,verifyBody.contactPersonAvailable,verifyBody.contactAddressAvailable,verifyBody.passwordValidation,verifyBody.licenceImageAvailable,verifyBody.validateUAEMobileNumber,verifyBody.validateUAELicenseNumber,spcontroller.addNewServiceProvider); 
}