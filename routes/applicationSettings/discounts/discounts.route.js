const discounts = require(`../../../controllers/applicationSettings/discounts/discounts.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../../utils/url_helper`);

module.exports = function(app)
{
     /**For listing discounts basis of page limit  */ 
    app.post(`${url.application_settings.discounts.POST_GET_ALL_DISCOUNT_LIMIT}`,
    verifyBody.verifyToken,
    discounts.getAllDiscounts); 

     /**For changing status discoun  */ 
    app.put(`${url.application_settings.discounts.PUT_UPDATE_DISCOUNT_STATUS}`,
    verifyBody.verifyToken, 
    discounts.updateStatus);

    /**Below route is for  removing taxations  */
    app.put(`${url.application_settings.discounts.PUT_REMOVE_DISCOUNT}`,
    verifyBody.verifyToken,
    discounts.removeDiscounts );

    // /**For adding new discounts  */
    app.post(`${url.application_settings.discounts.POST_ADD_DISCOUNT}`,
    verifyBody.verifyToken,
    verifyBody.verifyDiscountBody,
    discounts.addNewDiscount);

    // /**For updating discount  */
    app.put(`${url.application_settings.discounts.PUT_EDIT_DISCOUNT}`,
    verifyBody.verifyToken,
    verifyBody.verifyDiscountBody,
    discounts.updateDiscount);-
    
    // Below route is for getting data of any particular discount
    app.get(`${url.application_settings.discounts.GET_ONE_DISCOUNT}`,
    verifyBody.verifyToken,
    discounts.getOneDiscount);
    
    /**Below route is for getting list of all the discounts */
    app.get(`${url.application_settings.discounts.GET_ALL_ACTIVE_DISCOUNT}`,
    verifyBody.verifyToken, 
    discounts.getAllActiveDiscount);

}