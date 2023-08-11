const controller = require(`../../controllers/listingPage/listing.controller`);   // importing the auth controller details and assigning it to the authcontroller variable



module.exports = function(app)
{

 
    // /**For geting all service provider basis of from date to date */
    app.post(`/${process.env.apiToken}/listing/search`,controller.listingPageData); 

  
    

}