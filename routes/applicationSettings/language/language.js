const languages = require(`../../../controllers/applicationSettings/language/languages`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    /**For listing taxations basis of page limit  */ 
    app.get(`/${process.env.apiToken}/getAll/languages`,languages.getLanguages);   


}