/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is model file. Where all the logic of the program is written.                //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const constant = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation'); 


module.exports = class authentication
{
    constructor(){} 
    /**
     * The below function is for user login
     */
    static async serviceproviderlogin(username, password) 
    {
        try
        {
            const userData = await commonfetching.dataOnCondition(tableName, req.body.userName, 'user_name')(constant.tableName.service_providers, username);
            // console.log("User data:", userData);
            if (userData.length === 0) 
            {
                return 'noserviceprovider';
            } 
            else
            {
                const passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
                // console.log(passwordHashed);
                // console.log(userData[0].password);
                if (userData[0].password === passwordHashed)
                { 
                    if(userData[0].status === constant.status.inactive)
                    {
                        return 'serviceproviderinactive';
                    }
                    else
                    {
                        const givenDate = new Date().getTime();
                        const expiryDate = new Date(userData[0].expiry_at).getTime();
                        if(givenDate > expiryDate)
                        {    
                            return 'passwordexpired';
                        }
                        else
                        {
                            return userData;
                        }
                    }
                }
                else
                {
                    return 'passwordnotmatched';
                }
            }
        }
        catch (error)
        {
          console.log('Error while user login from the backend', error);
          throw error; // re-throw the error to be handled by the calling code
        }
    }


    static async serviceproviderchangepassword(username, password, newpassword) 
    {
        try
        {
            const userData = await commonfetching.dataOnCondition(tableName, req.body.userName, 'user_name')(constant.tableName.service_providers, username);
            if (userData.length === 0) 
            {
                return 'noserviceprovider';
            }
            else
            {
                var passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
                if (userData[0].password !== passwordHashed)
                {
                    return 'incorrectpassword';
                }
                else
                {
                    const givenDate = new Date().getTime();
                    const expiryDate = new Date(userData[0].expiry_at).getTime();  
                    const newpasswordHashed = await commonoperation.changePasswordToSQLHashing(newpassword);
                    const updatePassword = await commonoperation.changePasswordOfUser('service_providers', username, newpasswordHashed);
                    if(updatePassword.affectedRows > 0)
                    {
                        console.log('Password Updated');    
                        // return 'true';
                        return userData;
                    }
                    else
                    {
                        console.log(`Error while updating the password`);
                        return 'err';   
                    }                 
                }   
            }           
        }
        catch (error)
        {
          console.log('Error while service provider change password from the backend', error);
          throw error; // re-throw the error to be handled by the calling code
        }
    }
    

    static async serviceproviderlogout(username, password) 
    {
        const userData = await commonfetching.dataOnCondition(tableName, req.body.userName, 'user_name')(constant.tableName.service_providers, username);
        if (userData.length === 0) 
            {
                return 'noserviceprovider';
            }
            else
            {
                var passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
                if (userData[0].password !== passwordHashed)
                {
                    return 'incorrectpassword';
                }
                else
                {
                    console.log('Logout Done');
                    return 'logoutdone'             
                }   
            }           
        }
    }