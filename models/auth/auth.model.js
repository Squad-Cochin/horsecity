/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is model file. Where all the logic of the program is written.                //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require('../../configs/db.configs');
const constants = require('../../utils/constants');
const constant = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');


module.exports = class authentication
{
    constructor(){} 
    /**
     * The below function is for user login
     */
    static async serviceproviderlogin(username, password) 
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                let selQuery = `SELECT s.id, s.name, s.email, s.role_Id, s.password, r.name AS role_name, s.user_name, s.contact_person, s.contact_no, s.contact_address, s.licence_no, s.licence_image, s.expiry_at, s.status  FROM service_providers s, roles r WHERE s.user_name = '${username}' AND s.role_Id = r.id`
                // console.log(selQuery);
                con.query(selQuery, async(err, userData) =>
                {
                    if (userData.length === 0) 
                    {
                        resolve('noserviceprovider')
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
                                resolve('serviceproviderinactive')
                            }
                            else
                            { 
                                const givenDate = new Date().getTime();
                                const expiryDate = new Date(userData[0].expiry_at).getTime();
                                if(givenDate > expiryDate)
                                {    
                                    resolve('passwordexpired')
                                }
                                else
                                { 
                                    // console.log("User Id: ", userData[0].role_Id);
                                    let selQuery = `SELECT md.name AS module_name ,md.id AS module_id 
                                    FROM ${constants.tableName.permissions} AS pm
                                    JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                    JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                    WHERE pm.role_id = '${userData[0].role_Id}' `;
                                    // console.log(selQuery);
                                    con.query(selQuery, async (err, data) =>
                                    {
                                        const resObj = [{
                                            id : userData[0].id,
                                            name : userData[0].name,
                                            email :  userData[0].email,
                                            role_Id : userData[0].role_Id,
                                            role_name : userData[0].role_name,
                                            user_name : userData[0].user_name
                                        }]
                                        if (data.length != 0)
                                        {
                                            resolve ([{user : resObj},{modules : data}])
                                        }
                                        else
                                        {  
                                            resolve(false)
                                        }
                                    });
                                }
                            }
                        }
                        else
                        {
                            resolve('passwordnotmatched')
                        }
                    }
                });
            }
            catch (error)
            {
                console.log('Error while user login from the backend', error);
                throw error; // re-throw the error to be handled by the calling code
            }
        });   
    };


    static async serviceproviderchangepassword(username, password, newpassword) 
    {
        try
        {
            const userData = await commonfetching.dataOnCondition(constants.tableName.service_providers, username, 'user_name');
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
                    let updatePasswordQuery = `UPDATE ${constants.tableName.service_providers} SET
                                               password = '${newpasswordHashed}',
                                               updated_at = '${time.getFormattedUTCTime(constant.timeOffSet.UAE)}'
                                               WHERE user_name = '${username}' `;
                    // console.log(`Update Password Query: `, updatePasswordQuery);
                    con.query(updatePasswordQuery, (err, result) =>
                    {
                        if(result.affectedRows > 0)
                        {
                            // console.log('Service provider password updated');
                            return userData;
                        }
                        else
                        {
                            // console.log(`Error while updating the service provider password`);
                            return 'err';   
                        }
                    });                 
                }   
            }           
        }
        catch (error)
        {
          console.log('Error while service provider change password from the backend', error);
          throw error; // re-throw the error to be handled by the calling code
        }
    };
    

    static async serviceproviderlogout(username, password) 
    {
        const userData = await commonfetching.dataOnCondition(constants.tableName.service_providers, username, 'user_name');
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
    };





}