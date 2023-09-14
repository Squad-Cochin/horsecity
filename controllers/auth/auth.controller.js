////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //                                                                             
//     This is the controller file. The logic of the code is manilly written in the models. The common logic  //
//     are written in the helper folder inside the utils folder. The code which was writen over there are     //
//     for make the code reusability. We will do the operations or fetching in the helper. But the how can    //
//     be use wisely will be done in models. The calling of the models are done from the controller files     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const auth = require('../../models/auth/auth.model'); // Impoting the auth models details
const constants = require('../../utils/constants');


/**
 * The below function is for the login of the service provider user
 *      We need to two things from the users
 *          1. username
 *          2. password
 */
exports.serviceProviderLogin = async(req, res)=>
{
    // We are calling the function. Which will look for login functionality. We are sending username and password because it is needed
    let loginauth = await auth.serviceproviderlogin(req.body.userName, req.body.password)
    // If no service provider user found with entered username, then this if block code will be executed
    // console.log('Login Auth from Controller', loginauth);
    if(loginauth === 'noserviceprovider')
    {
 
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Username not found",
        });
    }
    // If any unspecified or unencountered error came. Which is not as per our code thinking, then this else if block
    else if(loginauth === 'err')
    {
   
        return res.status(200).send
        ({
            status : "failure",
            code : 500,
            message : "Internal server error .",
        });
    }
    // If wrong password is entered then, this below response will be displayed
    else if(loginauth === 'passwordnotmatched')
    {
      
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Incorrect password .",
        });
    }
    // If service provider user is inactive then, this below response will be displayed
    else if(loginauth === 'serviceproviderinactive')
    {
     
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Inactive service provider",
        });
    } 
    // If password of the service provider user is expired then, this below response will be displayed
    else if(loginauth === 'passwordexpired')
    {
       
        return res.status(200).send
        ({
            status : "expired",
            code : 400,
            message : "Your password is expired. Please make a new password",
        });
    }
    // If every thing run smoothly then, this below response will be displayed
    // else(loginauth === 'true')
    else
    {
        return res.status(200).send
        ({
            status : "success",
            code : 200,
            message : "Login successful",
            data : loginauth
        });     
    }
};

/**
 * The below function is for changing the password, When it is expired
 * We need 4 things from the users
 *  1. username
 *  2. password
 *  3. newpassword
 *  4. confirmnew password
 */

exports.serviceProviderChangePassword = async(req, res, next)=>
{
    let loginauth = await auth.serviceproviderchangepassword(req.body.userName, req.body.password, req.body.newpassword, req.body.confirmnewpassword);   
    // The below if block will execute. when the entered username is not correct
    if(loginauth === 'noserviceprovider')
    {        
        return res.status(200).send
        ({
            success : false,
            code : 400,
            message : "This username must be incorrect or no user is registered with this username",
        });
    }
    // The below if block will execute. when any unhandled error came
    else if(loginauth === 'err')
    {
      
        return res.status(200).send
        ({
            success : false,
            code : 500,
            message : "Internal server error",
        });
    }
    else if(loginauth === 'incorrectpassword')
    {       
        return res.status(200).send
        ({
            success : false,
            code : 400,
            message : "Password is incorrect",
        });
    }
    else
    {        
        return res.status(200).send
        ({
            success : "true",
            code : 200,
            message : "Password updated successfully"
        }); 
    }
};




/**
 * The below function if for the logout. 
 */

exports.serviceProviderLogout = async(req, res)=>
{
    // We are calling the function. Which will look for logout functionality. We are sending username and password because it is needed
    let loginauth = await auth.serviceproviderlogout(req.params.id);    
    // If things are smoothly working, Then the below response will work 
    if(loginauth === 'logoutdone')
    {
        
        res.status(200).send
        ({
            status : "success",
            code : 200,
            message : "Logout Done"
        });
    }
    // If any unspecified or unencountered error came. Which is not as per you code thinking, then this else if block
    if(loginauth ==='incorrectpassword')
    {
        
        res.status(200).send
        ({
            status : "success",
            code : 400,
            message : "Incorrect Password"
        });
    }
    if(loginauth === 'noserviceprovider')
    {
        
        res.status(200).send
        ({
            status : "success",
            code : 400,
            message : "Incorrect service provider username"
        });
    }    
    
}

exports.sendEmailForgotPassword = async(req, res)=>
{
   
   let sendingEmail  = await auth.sendEmailForgotPassword(req.body.email)

    if(sendingEmail)
    {
        res.status(200).send
        ({
            status : true,
            code : 200,  
            message : `Mail successfully sent to ${req.body.mail}`
        })
    
    }
    else
    { 
        res.status(500).send
        ({
            status : false,
            code : 500,
            message : "Error while sending email"
        });        
    }

}

exports.verifyAndRedirectingToPage = async(req, res)=>
{
   let resetPassword = await auth.resetPasswordUsingEmail(req.params);
        if (resetPassword)
            {
                const {id , token} = resetPassword ;  
                res.redirect(`${process.env.ADMIN_UI_URL}/reset-password/${id}/${token}`)
            }
            else
            { 
                res.redirect(`${process.env.ADMIN_UI_URL}/pages-404`);  
            }
}


exports.verifyUrlForResetPassword = async(req, res)=>
{
   let resetPassword = await auth.resetPasswordUsingEmail(req.params);
   if(req.body?.flag){
            if (resetPassword)
            {
                const {id , token} = resetPassword ; 
                return res.status(200).send({
                    code: 200,
                    status: true,
                    message: "Successfully verified !",
                    data  : resetPassword 
                });   
            }
            else
            { 
                return res.status(200).send({
                    code: 400,
                    status: false,
                    message: "Verification faild !"
                });    
            }


   }

}



/**This controller for update forgot password  */
exports.resetPasswordForForgotPassword = async(req, res)=>
{
   
   let resetPassword = await auth.updateForgotPassword(req.params,req.body);
    if(resetPassword){
        res.status(200).send
        ({
            status : true,
            code : 200,  
            message : "Password updated successfully"
        })
    }
    else
    { 
        return res.status(200).send({
            code: 400,
            status: false,
            message: "Password updation faild !"
        });    
    }

}