const currencies = require(`../../../controllers/applicationSettings/currencies/currencies.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../../utils/url_helper`);


module.exports = function(app)
{

    /**Below route is for getting data of all  active  currencies  */ 
    app.get(`${url.application_settings.currencies.GET_ALLCURRENCIES}`,
    verifyBody.verifyToken,
    currencies.getCurrenciesNames);   

}