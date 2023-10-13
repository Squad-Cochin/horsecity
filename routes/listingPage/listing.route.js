const controller = require(`../../controllers/listingPage/listing.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); 
const url = require(`../../utils/url_helper`);

module.exports = function(app)
{
    // /**For geting all service provider basis of from date to date */
    app.post(`${url.listing.POST_LISTING_SEARCH}`,
    verifyBody.verifyToken,
    controller.listingPageData); 

    // /**For geting all service provider Names */
    app.get(`${url.listing.POST_GET_ALL_SERVICE_PROIVDERS_NAMES}`,
    verifyBody.verifyToken,
    controller.getUsernameServiceProvider); 
} 