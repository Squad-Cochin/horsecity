////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //                                                                             
//     This is the controller file. The logic of the code is manilly written in the models. The common logic  //
//     are written in the helper folder inside the utils folder. The code which was writen over there are     //
//     for make the code reusability. We will do the operations or fetching in the helper. But the how can    //
//     be use wisely will be done in models. The calling of the models are done from the controller files     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { checkValueEntered } = require('../../middlewares/validateInput/checkRequestBodyInput');
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
        console.log('Unavailable username or incorrect username. While service provider login');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Username not found",
        });
    }
    // If any unspecified or unencountered error came. Which is not as per you code thinking, then this else if block
    else if(loginauth === 'err')
    {
        console.log('Unexpected error. While service provider login');
        return res.status(200).send
        ({
            status : "failure",
            code : 500,
            message : "Internal server error while sign in",
        });
    }
    // If wrong password is entered then, this below response will be displayed
    else if(loginauth === 'passwordnotmatched')
    {
        console.log('Incorrect password. While service provider login');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Password is incorrect",
        });
    }
    // If service provider user is inactive then, this below response will be displayed
    else if(loginauth === 'serviceproviderinactive')
    {
        console.log('Inactive user. While service provider login');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Service provider is inactive",
        });
    } 
    // If password of the service provider user is expired then, this below response will be displayed
    else if(loginauth === 'passwordexpired')
    {
        console.log('Password is expired. While service provider login');
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
            message : "Login Successful",
            data : loginauth
        });
        
        // if(loginauth[0].role_name === constants.roles.admin)
        // {
        //     console.log('Admin login Successful');
        //     const   check = await res.set('role', constants.roles.admin);
        //     console.log(check);
        //     return res.status(200).send
        //     ({
        //         status : "success",
        //         code : 200,
        //         message : "Admin login Successful",
        //         data : loginauth
        //     });
        // }
        // if(loginauth[0].role_name === constants.roles.service_provider)
        // {
        //     console.log('Service provider login successful');
        //     res.set('role', constants.roles.service_provider);
        //     return res.status(200).send
        //     ({
        //         status : "success",
        //         code : 200,
        //         message : "Service provider login successful",
        //         data : loginauth
        //     });
        // }        
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
    let loginauth = await auth.serviceproviderchangepassword(req.body.userName, req.body.password, req.body.newpassword);
    // console.log('Login Auth', loginauth );
    
    // The below if block will execute. when the entered username is not correct
    if(loginauth === 'noserviceprovider')
    {
        console.log('Unavailable username or incorrect username. While service provider password update');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "This username must be incorect or no user is registered with this username",
        });
    }
    // The below if block will execute. when any unhandled error came
    else if(loginauth === 'err')
    {
        console.log('Unexpected error. While service provider password update');
        return res.status(200).send
        ({
            status : "failure",
            code : 500,
            message : "Internal server error while updating the password",
        });
    }
    else if(loginauth === 'incorrectpassword')
    {
        console.log('Incorrect password. While service provider password update');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Password is incorrect",
        });
    }
    else
    {
        console.log('Password updated successfully. While service provider password update');
        return res.status(200).send
        ({
            status : "success",
            code : 200,
            message : "Password updated successfully",
        });
    }
};




/**
 * The below function if for the logout. 
 */

exports.serviceProviderLogout = async(req, res)=>
{
    // We are calling the function. Which will look for logout functionality. We are sending username and password because it is needed
    let loginauth = await auth.serviceproviderlogout(req.body.userName, req.body.password);    
    // If things are smoothly working, Then the below response will work 
    if(loginauth === 'logoutdone')
    {
        console.log('Logout successfully done');
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
        console.log('Incorrect Password');
        res.status(200).send
        ({
            status : "success",
            code : 400,
            message : "Incorrect Password"
        });
    }
    if(loginauth === 'noserviceprovider')
    {
        console.log('Incorrect Service Provider Username');
        res.status(200).send
        ({
            status : "success",
            code : 400,
            message : "Incorrect service provider username"
        });
    }    
    
}

exports.resetPasswordUsingEmail = async(req, res, next)=>
{
    let sendingEmail = await mailer.SendEmail(req.body.email,"Hai","Reset password")
    if(sendingEmail)
    {
        res.status(200).send
        ({
            status : true,
            code : 200,
            message : "Email sent successfully"
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