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


exports.changePasswordOfUser = (tablename, username, password) => 
{
    return new Promise((resolve, reject) => 
    {
        let updatePasswordQuery = `UPDATE ${tablename} SET password = '${password}', expiry_at = '${timeCalculate.addingSpecifiedDaysToCurrentDate(constant.password.expiry_after)}' WHERE user_name = '${username}' `;
        con.query(updatePasswordQuery, (err, result) => 
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
};

exports.fileUpload = (attachments, path) =>
{ 
    // console.log(attachments);
    return new Promise((resolve, reject) =>
    {
        if (!attachments)// || !attachments.file || !Array.isArray(attachments.file)) 
        {
            console.log('#### Invalid attachments parameter ####');
            resolve({message : 'INVALIDATTACHMENT'}); 
        }
        else
        {
            // let file = attachments;
            // console.log(file);
            let fileExtension = attachments.name.split('.').pop().toLowerCase(); // get the file extension
            // console.log(fileExtension);
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
                        console.log("Error occurred while storing the uploaded file in the uploads folder", err);
                    }
                    else
                    {
                        console.log('File Uploaded');
                        // resolve({message : 'INVALIDFORMAT'});
                        resolve(filename);
                    }
                });                
            }
            else
            {
                resolve({message : 'INVALIDFORMAT'});
                console.log("Invalid Format");
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
                console.log('Error while executing the query:', err);
                reject(err);
            }
            else
            {
                if (result.length > 0)
                {
                    if(result[0].status === constant.status.active)
                    {
                        let UpdateQuery = `UPDATE ${tablename} t SET t.status ='${constant.status.inactive}', t.updated_at = '${timeCalculate.getFormattedUTCTime(constant.timeOffSet.UAE)}' WHERE t.id = '${Id}' AND t.deleted_at IS NULL`;
                        console.log(UpdateQuery);
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                console.log('Status Changed to INACTIVE');
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
                        console.log(UpdateQuery);
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                console.log('Status Changed to ACTIVE');
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
                console.log('Error while executing the query:', err);
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
                                console.log('Status Changed to INACTIVE and User is Removed');
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
                                console.log('Status is already INACTIVE and User is Removed');
                                resolve(result);
                            }
                        });
                    }
                    // else
                    // {
                    //     let UpdateQuery = `UPDATE ${tablename} t SET t.status ='${constant.status.active}'WHERE t.id = '${Id}' `;
                    //     con.query(UpdateQuery, (err, result) => // executing the above query 
                    //     {
                    //         if(result.length != 0) // if ticket updated then if block
                    //         {
                    //             console.log('Status Changed to ACTIVE');
                    //             resolve(result);
                    //         }
                    //     });
                    // }
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
            // console.log('Query :', selQuery);
            con.query(selQuery, (err, result) =>
            {
                if (err)
                {
                    // console.log('Error while executing the query:', err);
                    reject(err);
                }
                if (result.length > 0)
                {
                    // console.log('Data present and fetched');
                    resolve(result);
                }
                else
                {
                    // console.log('Query executed but data not present in the table.');
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
    // console.log(attachments);
    return new Promise((resolve, reject) =>
    {
        if (!attachments)// || !attachments.file || !Array.isArray(attachments.file)) 
        {
            console.log('#### Invalid attachments parameter ####');
            resolve('NOATTACHEMENT')
        }
        else
        {
            // let file = attachments;
            // console.log(file);
            let fileExtension = attachments.name.split('.').pop().toLowerCase(); // get the file extension
            // console.log(fileExtension);
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
                        console.log("Error occurred while storing the uploaded file in their respective location", err);
                        resolve('ERR')
                    }
                    else
                    {
                        console.log('File Uploaded');
                        // resolve({message : 'INVALIDFORMAT'});
                        resolve(filename);
                    }
                });                
            }
            else
            {
                console.log("Invalid Format");
                resolve('INVALIDFORMAT');
            }
        }
    });
}
