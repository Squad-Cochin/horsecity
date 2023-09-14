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
const mail = require('../../utils/mailer')

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
                con.query(selQuery, async(err, userData) =>
                {
                    if (userData.length === 0) 
                    {
                        resolve('noserviceprovider')
                    } 
                    else
                    {
                        const passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
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
                                    let selQuery = `SELECT md.name AS module_name ,md.id AS module_id 
                                    FROM ${constants.tableName.permissions} AS pm
                                    JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                    JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                    WHERE pm.role_id = '${userData[0].role_Id}' `;
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
                                               expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                               updated_at = '${time.getFormattedUTCTime(constant.timeOffSet.UAE)}'
                                               WHERE user_name = '${username}' `;
                    con.query(updatePasswordQuery, (err, result) =>
                    {
                        if(result.affectedRows > 0)
                        {
                            return userData;
                        }
                        else
                        {
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
    

    static async serviceproviderlogout(Id) 
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                const userData = await commonfetching.dataOnCondition(constants.tableName.service_providers, Id, 'id');
                if (userData.length === 0) 
                {
                    resolve('noserviceprovider');
                }
                else
                {
                    resolve('logoutdone');            
                       
                } 
            }
            catch (error)
            {
                console.log('Error while service provider logout from the model', error);
                resolve(`err`);                
            }
        });             
    };


    /**This below function for sending email for forgot password  */
    static async sendEmailForgotPassword(email) 
    {
        return new Promise(async (resolve, reject) => {
            try {
           
            let generateToken = await commonfetching.tokenGeneration(email);
            let selQuery = `SELECT  id
                            FROM ${constants.tableName.service_providers}
                            WHERE email = '${email}'`;
            con.query(selQuery,async(err,result)=>{
                if(result[0].length != 0 && generateToken.token){
                    // let sendEmail = await mail.SendEmailOfForgotpassword(result[0].id,email,"Reset Password",generateToken.token);
                    //     if(sendEmail){
                    //         resolve(true);
                    //     }else{
                    //         resolve(false);
                    //     } 
                }else{
                    resolve(false)
                }
            })                

            } catch (err) {
                resolve(false)
                console.log('Error while sending email', err);
            }
        })
    };


    /**This below function for resetting email for forgot password  */
    static async resetPasswordUsingEmail(params) 
    {
        return new Promise(async (resolve, reject) => {
          try {
                const {id , token} = params;
                /** Verify the token and id*/
                let tokenAndIdVerification  = await commonoperation.tokenAndIdVerification(id,token);
                if(tokenAndIdVerification.id && tokenAndIdVerification.token){
                   
                    resolve({id :id ,token :token});
                 }else{
                    resolve(false);
                 }
                    
              } catch (err) {
                   console.log('Error reset password', err);
                   resolve(false)
              }
        })
    };


    
    static async updateForgotPassword(params,body) 
    {
        return new Promise(async (resolve, reject) => {
          try {
                const {id , token} = params;
                const { newpassword, confirmnewpassword } = body ;
          
                let tokenAndIdVerification  = await commonoperation.tokenAndIdVerification(id,token);
                  if(tokenAndIdVerification.id && tokenAndIdVerification.token){
                    let passwordHashed = await commonoperation.changePasswordToSQLHashing(newpassword);
                    let updateQuery = `UPDATE ${constant.tableName.service_providers} 
                                       SET password = '${passwordHashed}' 
                                       WHERE id = '${id}'`;
                        con.query(updateQuery,async(err,data)=>{
    
                            if(data?.length != 0 ){

                                resolve(true);

                            }else{

                                resolve(false);

                            }
                        })
                   
        
                 }else{
                    resolve(false);
                 }
                    
              } catch (err) {
                   console.log('Error while updating  password', err);
                   resolve(false)
              }
        })
    };


}