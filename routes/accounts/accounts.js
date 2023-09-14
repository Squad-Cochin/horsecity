const accounts = require(`../../controllers/accounts/accounts`);   // importing the auth controller details and assigning it to the authcontroller variable


module.exports = function(app)
{
    /**Below route For listing accounts  basis of page & limit & service provider id  */
    app.post(`/${process.env.apiToken}/getAll/accounts/:id`,accounts.getAllAccounts);  
    
    /**Below route list particular accounts details  */
    app.get(`/${process.env.apiToken}/getOne/accountsDetails/:id`,accounts.getOneAccountDetails);  

}