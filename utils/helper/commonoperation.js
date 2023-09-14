/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avoided. In this file we are having common operation    //
//   function. The operation function can insert, update.                              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");  // importing the database details 
const timeCalculate = require('./date'); // This variable will have the date file data. It is used to add days to current date for expiration of token
const constant = require('../constants'); // Importing the constant details
const commonfetching = require('./commonfetching');


exports.changePasswordToSQLHashing = (password) => 
{
    return new Promise((resolve, reject) => 
    {
        let hashedPasswordQuery = `SELECT SHA2('${password}', 256) AS hashedPassword`;
        con.query(hashedPasswordQuery, (err, result) => 
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                if (result.length > 0) 
                {
                    const hashedPassword = result[0].hashedPassword;
                    resolve(hashedPassword);
                }
                else
                {
                    reject(new Error('No hashed password found'));
                }
            }
        });
    });
};

exports.fileUpload = (attachments, path) =>
{ 
    return new Promise((resolve, reject) =>
    {
        if (!attachments)// || !attachments.file || !Array.isArray(attachments.file)) 
        {
            resolve({message : 'INVALIDATTACHMENT'}); 
        }
        else
        {
            let fileExtension = attachments.name.split('.').pop().toLowerCase(); // get the file extension
            if (['png', 'jpg'].includes(fileExtension)) 
            {
                // let currentDate = new Date().toISOString().replace(/:/g, '-').replace(//./g, '-'); // generate current date and time
                let randomNumber = Math.floor(Math.random() * 1000000); // generate random number
                let filename = `${randomNumber}_${attachments.name}`; // use current date, random number and original file name to create a unique file name
                attachments.mv(path +filename, (err) => 
                // attachments.id_proof_image.mv('../../Attachements/Customers/IdProof/' +filename, (err) => 
                {
                    if(err)
                    {
                        
                    }
                    else
                    {
                       
                        resolve(filename);
                    }
                });                
            }
            else
            {
                resolve({message : 'INVALIDFORMAT'});
            }
        }
    });
}

exports.fileNameUpload = (attachments) =>
{ 
    return new Promise((resolve, reject) =>
    {
        if (!attachments)// || !attachments.file || !Array.isArray(attachments.file)) 
        {
            resolve({message : 'INVALIDATTACHMENT'}); 
        }
        else
        {
            let fileExtension = attachments.name.split('.').pop().toLowerCase(); // get the file extension
            if (['json'].includes(fileExtension)) 
            {
                // let currentDate = new Date().toISOString().replace(/:/g, '-').replace(//./g, '-'); // generate current date and time
                let filename = `${attachments.name}`; // use current date, random number and original file name to create a unique file name
        
                    if(filename)
                    {
                        resolve(filename);
                    }
                 
        
            }
            else
            {
                resolve({message : 'INVALIDFORMAT'});
            }
        }
    });
}

exports.updateUserStatus = (tablename, Id) =>
{
    return new Promise((resolve, reject) => 
    {
        let selQuery = `SELECT * FROM ${tablename} WHERE ${tablename}.id = '${Id}' `;
        con.query(selQuery, (err, result) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                if (result.length > 0)
                {
                    if(result[0].status === constant.status.active)
                    {
                        let UpdateQuery = `UPDATE ${tablename} t SET t.status ='${constant.status.inactive}', t.updated_at = '${timeCalculate.getFormattedUTCTime(constant.timeOffSet.UAE)}'  WHERE t.id = '${Id}' AND t.deleted_at IS NULL`;
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                resolve(result);
                            }
                            else
                            {
                                resolve('removed');
                            }
                        }); 
                    }
                    else
                    {
                        let UpdateQuery = `UPDATE ${tablename} t SET t.status ='${constant.status.active}'WHERE t.id = '${Id}' AND t.deleted_at IS NULL `;
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                resolve(result);
                            }
                            else
                            {
                                resolve('removed');
                            }
                        });
                    }
                }
                else
                {
                    resolve([]);
                }       
            }
        });
    });
}

exports.removeUser = (tablename, Id) =>
{
    return new Promise((resolve, reject) => 
    {
        let selQuery = `SELECT * FROM ${tablename} WHERE ${tablename}.id = '${Id}' `;
        con.query(selQuery, (err, result) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                if (result.length > 0)
                {
                    if(result[0].status === constant.status.active)
                    {
                        let UpdateQuery = `UPDATE ${tablename} t SET t.status ='${constant.status.inactive}', t.deleted_at = '${timeCalculate.getFormattedUTCTime(constant.timeOffSet.UAE)}' WHERE t.id = '${Id}' `;
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                resolve(result);
                            }
                        }); 
                    }
                    
                    if(result[0].status === constant.status.inactive)
                    {
                        let UpdateQuery = `UPDATE ${tablename} t SET t.deleted_at = '${timeCalculate.getFormattedUTCTime(constant.timeOffSet.UAE)}' WHERE t.id = '${Id}' `;
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                resolve(result);
                            }
                        });
                    }
                }
                else
                {
                    resolve([]);
                }       
            }
        });
    });
}

exports.totalCount = async (tablename) =>
{
    try 
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT count(t.id) FROM ${tablename} t WHERE t.deleted_at IS NULL`;
            con.query(selQuery, (err, result) =>
            {
                if (err)
                {
                    reject(err);
                }
                if (result.length > 0)
                {
                    resolve(result);
                }
                else
                {
                    resolve([]);
                } 
        
            });
        });      
    }
    catch (error)
    {        
    }
}

exports.totalCountParticularServiceProvider = async (tablename, Id) =>
{
    try 
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT count(t.id) FROM ${tablename} t WHERE t.deleted_at IS NULL AND t.service_provider_id = ${Id}`;
            con.query(selQuery, (err, result) =>
            {
                if (err)
                {
                    reject(err);
                }
                if (result.length > 0)
                {
                    resolve(result);
                }
                else
                {
                    resolve([]);
                } 
        
            });
        });      
    }
    catch (error)
    {        
    }
}

exports.fileUploadTwo = async (attachments, path) => 
{ 
    return new Promise((resolve, reject) =>
    {
        if (!attachments) // || !attachments.file || !Array.isArray(attachments.file)) 
        {
            resolve('NOATTACH')
        }
        else
        {
            let fileExtension = attachments.name.split('.').pop().toLowerCase(); // get the file extension
            if (['png', 'jpg'].includes(fileExtension)) 
            {
                let randomNumber = Math.floor(Math.random() * 1000000); // generate random number
                let filename = `${randomNumber}_${attachments.name}`; // use current date, random number and original file name to create a unique file name
                attachments.mv(path +filename, (err) => 
                {
                    if(err)
                    {
                        resolve('ERR')
                    }
                    else
                    {
                        resolve(filename);
                    }
                });                
            }
            else
            {
                resolve('INVALIDFORMAT')
            }
        }
    });
}

exports.queryAsync = (query) =>
{
    return new Promise((resolve, reject) =>
    {
        con.query(query, (err, result) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

exports.createCustomizeEmailToken = async (email) => 
{
    var email_length = email.length;
    if (email_length % 2 == 1) 
    {
        email += 'y';
        email_length++;
    }
    const emailPart1 = email.substring(0, email_length / 2);
    const emailTokenSidePart1 = [];
    for (let i = 0; i < emailPart1.length; i++) 
    {
        const charCode = emailPart1.charCodeAt(i);
        const lastDigit = parseInt(charCode.toString().slice(-1));    
        emailTokenSidePart1.push(emailPart1[i] + lastDigit);
    }
    const emailPart2 = email.substring(email_length / 2);
    const emailTokenSidePart2 = [];    
    for (let i = 0; i < emailPart2.length; i++) 
    {
        const charCode = emailPart2.charCodeAt(i);
        const firstDigit = parseInt(charCode.toString()[0]);
        emailTokenSidePart2.push(emailPart2[i] + firstDigit); 
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + constant.password.token_expiry;
    const customizepasswordToken = `${emailTokenSidePart1.join('')}A${emailTokenSidePart2.join('')}T${expirationTimestamp}`;
    return customizepasswordToken; // Returning the customize password from where it is called
};


exports.tokenAndIdVerification = async(userId,token) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
                      
      
             
                    let inputString = await token;

                    var substring1, substring2, substring3;
            
             
            
                    // Find the positions of 'A' and 'T' in the string
            
                    const indexA = inputString.indexOf('A');
            
                    const indexT = inputString.indexOf('T');
            
             
            
                    if (indexA !== -1 && indexT !== -1 && indexA < indexT) {
            
                        // Extract substrings based on positions
            
                        substring1 = inputString.substring(0, indexA);
            
                        substring2 = inputString.substring(indexA + 1, indexT);
            
                        substring3 = inputString.substring(indexT + 1);
            
             

            
                    } else {
            
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

                    for (let i = 0; i < emailPart1.length; i += 2) {
            
                        const char = emailPart1[i];
            
                        emailChars.push(char);
            
                    }
            
                    // Extract the email from substring2
            
                       // Remove the last character ('y') if present from emailPart2

                        const emailPart2 = substring2.endsWith('y') ? substring2.slice(0, -1) : substring2;
                        // Extract the email from emailPart2
                        const emailChars2 = [];

                        for (let i = 0; i < emailPart2.length; i += 2) {

                            const char = emailPart2[i];

                            emailChars2.push(char);

                        }
            
                    // Combine the email characters from both parts
            
                    const email = (emailChars.join('') + emailChars2.join('')).replace(/y+$/, '');
                  
                    let verifyId =  await commonfetching.dataOnCondition(constant.tableName.service_providers,userId,'id')
                    if(verifyId.length != 0){
                        if(verifyId[0].email === email){
                            resolve({id :verifyId[0].id,token :token})
                        }else{
                             resolve(false);
                        }    

                    }else{
                     resolve(false);
                    }
                   
        
        });      
    }
    catch (error)
    {
    }
};
