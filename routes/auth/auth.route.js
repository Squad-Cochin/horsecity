const authcontroller = require(`../../controllers/auth/auth.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
// const check?Input = require(`../middlewares/requestValidator`); // Importing the requestValidator file data 
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const constants = require("../../utils/constants");
const http = require('http');

const checkHeaders = require('../../middlewares/validateInput/checkRequestHeader');

module.exports = function(app)
{
    // The below route is for login of service provider user.
    app.post(`/${process.env.apiToken}/login`,
    // checkHeaders.checkRequestHeader,
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

    const http = require('http');

    http.get('http://localhost:8000/horsecity661809/login', (response) => {
      // Check if the 'role' header is present
      const roleHeaderValue = response.headers['role'];
      if (roleHeaderValue !== undefined) {
        console.log('Role Header Value:', roleHeaderValue);
      } else {
        console.log('Role Header not set.');
      }
    
      // Process the response data
      let responseData = '';
      response.on('data', (chunk) => {
        responseData += chunk;
      });
    
      response.on('end', () => {
        console.log('Response Data:', responseData);
      });
    }).on('error', (error) => {
      console.error('Error:', error.message);
    });
    
      
       

}