const languages = require(`../../../controllers/applicationSettings/language/languages`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    /**For getting list of active language */
    app.get(`/${process.env.apiToken}/getAll/languages`,languages.getLanguageNames);   

     /**For listing languages basis of page limit  */ 
     app.post(`/${process.env.apiToken}/getAll/languages`,languages.getAllLanguages); 

     /**For changing status languages  */ 
    app.put(`/${process.env.apiToken}/update-status/languages/:id`, languages.updateStatus);

    /**For removing languages  */
    app.put(`/${process.env.apiToken}/remove/languages/:id`,languages.removeLanguage );

    // /**For adding new languages  */
    app.post(`/${process.env.apiToken}/add/languages`,verifyBody.verifyLanguageBody,languages.addNewLanguage);-
    // /**For updating language  */
    app.put(`/${process.env.apiToken}/update/languages/:id`,verifyBody.verifyLanguageBody,languages.updateLanguages);-
    // Below route is for getting data of any particular language
    app.get(`/${process.env.apiToken}/getOne/languages/:id`,languages.getOneLanguage);
}