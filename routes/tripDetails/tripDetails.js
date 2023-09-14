const tripDetails = require(`../../controllers/tripDetails/tripDetails`);   // importing the auth controller details and assigning it to the authcontroller variable



module.exports = function(app)
{
    /**The below route giving for getting all trip details basis of service provider id  */
    app.post(`/${process.env.apiToken}/getAll/tripDetails/:id`,tripDetails.getAllTripDetails); 
    
    /**The below route giving for adding breakdown vehicle */
    app.post(`/${process.env.apiToken}/add/breakDownVehicles`, tripDetails.addBreakDowns);
    /**The below route giving for getting one trip details */
    app.get(`/${process.env.apiToken}/list/breakDownVehicles/:id`, tripDetails.listBreakDowns);
}