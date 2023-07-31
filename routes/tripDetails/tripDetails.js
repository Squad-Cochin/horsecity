const tripDetails = require(`../../controllers/tripDetails/tripDetails`);   // importing the auth controller details and assigning it to the authcontroller variable



module.exports = function(app)
{
    /**For getting all trip details */
    app.post(`/${process.env.apiToken}/getAll/tripDetails`,tripDetails.getAllTripDetails); 
    
    /**For getting one trip details */
    app.post(`/${process.env.apiToken}/add/breakDownVehicles`, tripDetails.addBreakDowns);

    app.post(`/${process.env.apiToken}/list/breakDownVehicles`, tripDetails.listBreakDowns);
}