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
    if(loginauth === 'noserviceprovider')
    {
 
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : `This username appears to be incorrect, or no service provider is registered with this username.`,
        });
    }
    // If any unspecified or unencountered error came. Which is not as per our code thinking, then this else if block
    else if(loginauth === 'err')
    {
   
        return res.status(200).send
        ({
            status : "failure",
            code : 500,
            message : constants.responseMessage.universalError
        });
    }
    // If wrong password is entered then, this below response will be displayed
    else if(loginauth === 'passwordnotmatched')
    {
      
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : constants.responseMessage.passwordincorrect
        });
    }
    // If service provider user is inactive then, this below response will be displayed
    else if(loginauth === 'serviceproviderinactive')
    {
     
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : constants.responseMessage.servieproviderinactive,
        });
    } 
    // If password of the service provider user is expired then, this below response will be displayed
    else if(loginauth === 'passwordexpired')
    {
       
        return res.status(200).send
        ({
            status : "expired",
            code : 400,
            message : constants.responseMessage.passwordexpired
        });
    }
    // If every thing run smoothly then, this below response will be displayed
    else
    {
        return res.status(200).send
        ({
            status : "success",
            code : 200,
            message : constants.responseMessage.logsuccess,
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
            message : constants.responseMessage.validatorError46
        });
    }
    // The below if block will execute. when any unhandled error came
    else if(loginauth === 'err')
    {
      
        return res.status(200).send
        ({
            success : false,
            code : 500,
            message : constants.responseMessage.universalError,
        });
    }
    else if(loginauth === 'incorrectpassword')
    {       
        return res.status(200).send
        ({
            success : false,
            code : 400,
            message : constants.responseMessage.passwordincorrect,
        });
    }
    else
    {        
        return res.status(200).send
        ({
            success : true,
            code : 200,
            message : constants.responseMessage.passwordupdate
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
            status : true,
            code : 200,
            message : constants.responseMessage.logoutsuccess
        });
    }
    // If any unspecified or unencountered error came. Which is not as per you code thinking, then this else if block
    if(loginauth ==='incorrectpassword')
    {
        
        res.status(200).send
        ({
            status : true,
            code : 400,
            message : constants.responseMessage.passwordincorrect
        });
    }
    if(loginauth === 'noserviceprovider')
    {
        
        res.status(200).send
        ({
            status : true,
            code : 400,
            message : constants.responseMessage.usernameincorrect
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
            message : `Mail successfully sent to ${req.body.email}`
        })
    
    }
    else
    { 
        res.status(200).send
        ({
            status : false,
            code : 500,
            message : "Unable to email the password reset link."
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
                    message: constants.responseMessage.verifiedSuccess,
                    data  : resetPassword 
                });   
            }
            else
            { 
                return res.status(200).send({
                    code: 400,
                    status: false,
                    message: constants.responseMessage.verifiedFailed
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
            message : constants.responseMessage.passwordupdate
        })
    }
    else
    { 
        return res.status(200).send({
            code: 400,
            status: false,
            message: constants.responseMessage.passwordupdatef
        });    
    }

}

exports.Verifiy = async (req, res) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let inputString = await req.body.token;
            var substring1, substring2, substring3;
            // Find the positions of 'A' and 'T' in the string
            const indexA = inputString.indexOf('A');
            const indexT = inputString.indexOf('T');
            if (indexA !== -1 && indexT !== -1 && indexA < indexT) 
            {
                // Extract substrings based on positions
                substring1 = inputString.substring(0, indexA);
                substring2 = inputString.substring(indexA + 1, indexT);
                substring3 = inputString.substring(indexT + 1);
            }
            else
            {
                // console.error("Invalid input string. Expected 'A' before 'T'.");
                resolve(false);
                return;
            }
            
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (currentTimestamp > substring3)
            {
                resolve(false);
            }        
            
            // Remove the last character ('y') if present
            const emailPart1 = substring1.endsWith('y') ? substring1.slice(0, -1) : substring1;
            // Extract the email from substring1
            const emailChars = [];
            for (let i = 0; i < emailPart1.length; i += 2) 
            {
                const char = emailPart1[i];
                emailChars.push(char);
            }
            
            // Extract the email from substring2
            // Remove the last character ('y') if present from emailPart2

            const emailPart2 = substring2.endsWith('y') ? substring2.slice(0, -1) : substring2;
            // Extract the email from emailPart2
            const emailChars2 = [];

            for (let i = 0; i < emailPart2.length; i += 2)
            {
                const char = emailPart2[i];
                emailChars2.push(char);
            }
            
            // Combine the email characters from both parts
            const email = (emailChars.join('') + emailChars2.join('')).replace(/y+$/, '');
            
        });      
    }
    catch (error)
    {

    }
};