const tripDetails = require(`../../controllers/tripDetails/tripDetails.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const { verifyToken } = require("../../middlewares/requestValidator");
const url = require(`../../utils/url_helper`)



module.exports = function(app)
{
    /**The below route giving for getting all trip details basis of service provider id  */
    app.post(`${url.tripDetails.POST_GET_ALL_TRIP_INFO_PARTICULAR_SERVICE_PROVIDER}`,verifyToken,tripDetails.getAllTripDetails); 
    
    /**The below route giving for adding breakdown vehicle */
    app.post(`${url.tripDetails.POST_ADD_BREAKDOWN_VEHICLES}`,verifyToken, tripDetails.addBreakDowns);
    /**The below route giving for getting one trip details */
    app.get(`${url.tripDetails.GET_BREAKDOWN_VEHICLE_LIST}`,verifyToken, tripDetails.listBreakDowns);
}