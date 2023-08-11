const discounts = require(`../../../controllers/applicationSettings/discounts/discounts`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{
     /**For listing discounts basis of page limit  */ 
    app.post(`/${process.env.apiToken}/getAll/discounts`,discounts.getAllDiscounts); 

     /**For changing status taxations  */ 
    app.put(`/${process.env.apiToken}/update-status/discounts/:id`, discounts.updateStatus);

           /**For removing taxations  */
    app.put(`/${process.env.apiToken}/remove/discount/:id`,discounts.removeDiscounts );

    // /**For adding new discounts  */
    app.post(`/${process.env.apiToken}/add/discount`,verifyBody.verifyDiscountBody,discounts.addNewDiscount);-
    // /**For updating discount  */
    app.put(`/${process.env.apiToken}/update/discount/:id`,verifyBody.verifyDiscountBody,discounts.updateDiscount);-
        // Below route is for getting data of any particular discount
    app.get(`/${process.env.apiToken}/getOne/discounts/:id`,discounts.getOneDiscount);

    app.get(`/${process.env.apiToken}/getAll/active/discounts`, discounts.getAllActiveDiscount);




}