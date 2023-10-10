const taxation = require(`../../../controllers/applicationSettings/taxation/taxation.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../../utils/url_helper`);

module.exports = function (app) 
{
    /**Below route For listing taxations basis of page limit  */
    app.post(`${url.application_settings.taxations.POST_GET_ALL_TAX_LIMIT}`,
    verifyBody.verifyToken,
    taxation.getAllTaxations);
    
    /**Below route For changing status taxations  */
    app.put(`${url.application_settings.taxations.PUT_UPDATE_TAX_STATUS}`,
    verifyBody.verifyToken,
    taxation.updateStatus);
    
    /**Below route For removing taxations  */
    app.put(`${url.application_settings.taxations.PUT_REMOVE_TAX}`,
    verifyBody.verifyToken, 
    taxation.removeTaxation);
    
    /**Below route For adding new taxation  */
    app.post(`${url.application_settings.taxations.POST_ADD_TAX}`,
    verifyBody.verifyToken,
    verifyBody.verifyTaxationBody,
    taxation.addNewTaxation);

    // /**Below route For updating taxation  */
    app.put(`${url.application_settings.taxations.PUT_EDIT_TAX}`,
    verifyBody.verifyToken,
    verifyBody.verifyTaxationBody,
    taxation.updateTaxation);

    // Below route is for getting data of any particular tax details
    app.get(`${url.application_settings.taxations.GET_ONE_TAX}`,
    verifyBody.verifyToken,
    taxation.getOneTaxation);
    
    /**Below route getting active taxation details  */
    app.get(`${url.application_settings.taxations.GET_ALL_ACTIVE_TAX}`,
    verifyBody.verifyToken, 
    taxation.getTaxationsNames);


}