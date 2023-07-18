const authcontroller = require(`../controllers/auth.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{
    // The below route is for login of service provider user.
    app.post(`/${process.env.apiToken}/login`, verifyBody.usernamevalidation, verifyBody.passwordValidation2, authcontroller.serviceProviderLogin);
    
    // app.post(`/${process.env.apiToken}/login`, (req, res)=>{ console.log("Came here"); });
    
      // The below route is for changing the password of the service provider user.
    app.post(`/${process.env.apiToken}/changePassword`, verifyBody.usernamevalidation, verifyBody.passwordValidation, verifyBody.newpassword, verifyBody.confirmnewpassword, verifyBody.passwordsimilarity, authcontroller.serviceProviderChangePassword); 
    
    // The below route is for logout of the service provider user. 
    app.post(`/${process.env.apiToken}/logout`, verifyBody.usernamevalidation, verifyBody.passwordValidation, authcontroller.serviceProviderLogout); 

    // app.post(`/${process.env.apiToken}/recoveryPassword`,verifyBody.emailvalidation, authcontroller.resetPasswordUsingEmail);  

}