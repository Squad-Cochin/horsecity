const enquiry = require(`../../controllers/enquiries/enquiries`);   // importing the auth controller details and assigning it to the authcontroller variable



module.exports = function(app)
{
    /**For getting all enquiries basis user id & page & limit  */
    app.post(`/${process.env.apiToken}/getAll/enquiries/:id`,enquiry.getAllEnquiries); 
    
    /**For getting one enquiries */
    app.get(`/${process.env.apiToken}/getOne/enquiry/:id`, enquiry.getOneEnquiry);


}  