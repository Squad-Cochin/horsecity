


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the auth route file. Where all the routes of the auth.controller.js is written. If anyone      //
//     want to use any function of the auth.controller.js file from the frontend. Then they have to use       //
//     the routes which are listed in this file.                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const authcontroller = require(`../../controllers/auth/auth.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`); // Importing the body Middleware
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams"); // Importing the params middleware
const constants = require("../../utils/constants"); // Constant elements are stored in this file
const validator = require(`../../middlewares/requestValidator`);  // Importing the requestValidator file data 


module.exports = function(app)
{
    // The below route is for login of service provider user.
    app.post(`/${process.env.apiToken}/login`,

    authcontroller.serviceProviderLogin);
    
    // The below route is for changing the password of the service provider user.
    app.post(`/${process.env.apiToken}/changePassword`, 
    checkInput.usernameValidation(constants.tableName.service_providers),
    checkInput.passwordValidation,
    checkInput.newpassword,
    checkInput.confirmnewpassword,
    checkInput.passwordsimilarity, 
    authcontroller.serviceProviderChangePassword); 
    
    // The below route is for logout of the service provider user. 
    // But Nobody is using this as per now. May be in the future it will be used full //
    app.post(`/${process.env.apiToken}/logout/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    authcontroller.serviceProviderLogout); 


    /**The below url for  sending email for forgot password  */
    app.post(`/${process.env.apiToken}/forgotPassword`,validator.emailValidation,authcontroller.sendEmailForgotPassword);  
    
    /**The below url for verification  id & token   */
    app.get(`/reset-password/:id/:token`,authcontroller.verifyAndRedirectingToPage);   
    
    app.post(`/${process.env.apiToken}/verify/reset-password/:id/:token`,authcontroller.verifyUrlForResetPassword);   
    
    /**The below url for updating password   */
    app.post(`/${process.env.apiToken}/update-password/:id/:token`, 
    checkInput.newpassword,
    checkInput.confirmnewpassword,
    checkInput.passwordandconfirmpasswordsimilarity,
    authcontroller.resetPasswordForForgotPassword);    

    app.post(`/verify`,authcontroller.Verifiy);   
}