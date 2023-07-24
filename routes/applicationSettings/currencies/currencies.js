const currencies = require(`../../../controllers/applicationSettings/currencies/currencies`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    /**For listing taxations basis of page limit  */ 
    app.get(`/${process.env.apiToken}/getAll/currencies`,currencies.getCurrenciesNames);   


}