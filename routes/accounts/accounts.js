const accounts = require(`../../controllers/accounts/accounts`);   // importing the auth controller details and assigning it to the authcontroller variable




module.exports = function(app)
{
    /**For listing accounts  basis of page & limit  */
    app.post(`/${process.env.apiToken}/getAll/accounts/:id`,accounts.getAllAcounts);  
    
    /**List particular accounts details  */
    app.get(`/${process.env.apiToken}/getOne/accountsDetails/:id`,accounts.getOneAccountDetails);  

}