const authcontroller = require(`../../controllers/auth/auth.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
// const check?Input = require(`../middlewares/requestValidator`); // Importing the requestValidator file data 
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const constants = require("../../utils/constants");

module.exports = function(app)
{
  // The below route is for login of service provider user.
   app.post(`/${process.env.apiToken}/login`,
   // checkInput.usernameValidation(constants.tableName.service_providers),
   // checkInput.passwordValidation,
   authcontroller.serviceProviderLogin);
    
    // app.post(`/${process.env.apiToken}/login`, (req, res)=>{ console.log("Came here"); });
    
      // The below route is for changing the password of the service provider user.
    app.post(`/${process.env.apiToken}/changePassword`, 
    checkInput.usernameValidation(constants.tableName.service_providers),
    checkInput.passwordValidation, 
    checkInput.newpassword,
    checkInput.confirmnewpassword,
    checkInput.passwordsimilarity,
    authcontroller.serviceProviderChangePassword); 
    
    // The below route is for logout of the service provider user. 
    app.post(`/${process.env.apiToken}/logout`, 
    // checkInput.usernameValidation(constants.tableName.service_providers),
    // checkInput.passwordValidation,
    authcontroller.serviceProviderLogout); 

    // app.post(`/${process.env.apiToken}/recoveryPassword`,checkInput.emailvalidation, authcontroller.resetPasswordUsingEmail);  

    app.get(`/${process.env.apiToken}/check-header`, (req, res) => {
      // Check if the 'Authorization' header is set
      const authorizationHeader = req.get('role');
      console.log(authorizationHeader);
      if (authorizationHeader) {
        // The 'Authorization' header is set, do something with the value
        res.send('Authorization header is set: ' + authorizationHeader);
      } else {
        // The 'Authorization' header is not set
        res.send('Authorization header is not set.');
      }
    });

}