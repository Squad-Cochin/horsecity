const languages = require(`../../../controllers/applicationSettings/language/languages.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../../utils/url_helper`);

module.exports = function(app)
{

    /**For getting list of active language */
    app.get(`${url.application_settings.languages.GET_ALL_ACTIVE_LANGUAGE}`,
    verifyBody.verifyToken,
    languages.getLanguageNames);   

    /**For listing languages basis of page limit  */ 
    app.post(`${url.application_settings.languages.POST_GET_ALL_LANGUAGE_LIMIT}`,
    verifyBody.verifyToken,
    languages.getAllLanguages); 

    /**For changing status languages  */ 
    app.put(`${url.application_settings.languages.PUT_UPDATE_LANGUAGE_STATUS}`,
    verifyBody.verifyToken,
    languages.updateStatus);

    /**For removing languages  */
    app.put(`${url.application_settings.languages.PUT_REMOVE_LANGUAGE}`,
    verifyBody.verifyToken,
    languages.removeLanguage);

    // /**For adding new languages  */
    app.post(`${url.application_settings.languages.POST_ADD_LANGUAGE}`,
    verifyBody.verifyToken,
    verifyBody.verifyLanguageBody,
    languages.addNewLanguage);
    
    // /**For updating language  */
    app.put(`${url.application_settings.languages.PUT_EDIT_LANGUAGE}`,
    verifyBody.verifyToken,
    verifyBody.verifyLanguageBody,
    languages.updateLanguages);-
    
    // Below route is for getting data of any particular language
    app.get(`${url.application_settings.languages.GET_ONE_LANGUAGE}`,
    verifyBody.verifyToken,
    languages.getOneLanguage);
}