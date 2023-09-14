const settings = require(`../../../controllers/applicationSettings/settings/settings`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{
    // Below route is for getting settings page data
    app.get(`/${process.env.apiToken}/getAll/settings`, settings.getSettingsData);

    // Below route is for updating settings page data
    app.put(`/${process.env.apiToken}/update/settings`,verifyBody.appTitleAvailable,verifyBody.contactAddressAvailable,verifyBody.emailValidation,verifyBody.validateUAEMobileNumber,verifyBody.validateUAELicenseNumber,settings.updateSettings);

    // Below route is for getting settings page language details
    app.get(`/${process.env.apiToken}/getFile/lngFile`, settings.getLngFile);
}