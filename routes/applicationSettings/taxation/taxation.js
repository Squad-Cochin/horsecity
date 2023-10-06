const taxation = require(`../../../controllers/applicationSettings/taxation/taxation`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function (app) {
    /**Below route For listing taxations basis of page limit  */
    app.post(`/${process.env.apiToken}/getAll/tax`, taxation.getAllTaxations);
    /**Below route For changing status taxations  */
    app.put(`/${process.env.apiToken}/update-status/taxation/:id`, taxation.updateStatus);
    /**Below route For removing taxations  */
    app.put(`/${process.env.apiToken}/remove/taxation/:id`, taxation.removeTaxation);
    /**Below route For adding new taxation  */
    app.post(`/${process.env.apiToken}/add/taxation`, verifyBody.verifyTaxationBody, taxation.addNewTaxation); -
    // /**Below route For updating taxation  */
    app.put(`/${process.env.apiToken}/update/taxation/:id`, verifyBody.verifyTaxationBody, taxation.updateTaxation); -
    // Below route is for getting data of any particular tax details
    app.get(`/${process.env.apiToken}/getOne/taxations/:id`, taxation.getOneTaxation);
    /**Below route getting active taxation details  */
    app.get(`/${process.env.apiToken}/getAll/taxations`, taxation.getTaxationsNames);


}