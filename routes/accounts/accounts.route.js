const accounts = require(`../../controllers/accounts/accounts.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const { verifyToken } = require("../../middlewares/requestValidator");
const url = require(`../../utils/url_helper`);



module.exports = function(app)
{
    /**Below route For listing accounts  basis of page & limit & service provider id  */
    app.post(`${url.account.POST_GETALL_ACCOUNTS}`,
    verifyToken,
    accounts.getAllAccounts);  
    
    /**Below route list particular accounts details  */
    app.get(`${url.account.GET_ONE_ACCOUT}`,
    verifyToken,
    accounts.getOneAccountDetails);  

}