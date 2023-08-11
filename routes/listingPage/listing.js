const controller = require(`../../controllers/listingPage/listing.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); 


module.exports = function(app)
{

 
    // /**For geting all service provider basis of from date to date */
    app.post(`/listing/search`,controller.listingPageData); 

    // /**For geting all service provider basis of from date to date */
    app.get(`/getAll/serviceproviders`,verifyBody.verifyToken,controller.getUsernameServiceProvider); 

  
    

}