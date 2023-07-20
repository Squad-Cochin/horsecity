const taxation = require(`../../../controllers/applicationSettings/taxation/taxation`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{
        /**For listing service provider basis of page limit  */ 
    app.post(`/${process.env.apiToken}/getAll/tax`,taxation.getAllTaxations); 
           /**For changing status taxations  */ 
    app.put(`/${process.env.apiToken}/update-status/taxation/:id`, taxation.updateStatus);
           /**For removing taxations  */
    app.put(`/${process.env.apiToken}/remove/taxation/:id`,taxation.removeTaxation );
    // /**For adding new taxation  */
    app.post(`/${process.env.apiToken}/add/taxation`,taxation.addNewTaxation);-
    // /**For updating taxation  */
    app.put(`/${process.env.apiToken}/update/taxation/:id`,taxation.updateTaxation);-
        // Below route is for getting data of any particular service provider
    app.get(`/${process.env.apiToken}/getOne/taxations/:id`, taxation.getOneTaxation);
    // app.put(`/${process.env.apiToken}/update/serviceprovider/:id`,verifyBody.nameAvailable,verifyBody.emailValidation,verifyBody.usernamevalidation,verifyBody.contactPersonAvailable,verifyBody.validateUAEMobileNumber,verifyBody.contactAddressAvailable,verifyBody.validateUAELicenseNumber,spcontroller.updateServiceProvider);
    //    /**For changing status service provider  */ 
    // app.put(`/${process.env.apiToken}/update-status/serviceprovider/:id`, spcontroller.updateStatus);


}