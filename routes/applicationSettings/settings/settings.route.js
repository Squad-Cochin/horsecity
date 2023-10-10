const settings = require(`../../../controllers/applicationSettings/settings/settings.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../../utils/url_helper`);

module.exports = function(app)
{
    // Below route is for getting settings page data
    app.get(`${url.application_settings.settings.GET_SETTINGS_PAGE_DATA}`,
    verifyBody.verifyToken, 
    settings.getSettingsData);

    // Below route is for updating settings page data
    app.put(`${url.application_settings.settings.PUT_UPDATE_SETTINGS_DATA}`,
    verifyBody.verifyToken,
    verifyBody.appTitleAvailable,
    verifyBody.contactAddressAvailable,
    verifyBody.emailValidation,
    verifyBody.validateUAEMobileNumber,
    verifyBody.validateUAELicenseNumber,
    settings.updateSettings);

    // Below route is for getting settings page language details
    app.get(`${url.application_settings.settings.GET_LANGUAGE_DATA_SETTING_PAGE}`,
    verifyBody.verifyToken, 
    settings.getLngFile);
}