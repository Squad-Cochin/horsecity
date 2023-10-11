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
const constants = require('../constants'); // Importing the constants details
const commonfetching = require('./commonfetching'); // Importing the commonfetching file

// The below function is for changing the password string into hashed format.
exports.changePasswordToSQLHashing = (password) => 
{
    return new Promise((resolve, reject) => 
    {
        let hashedPasswordQuery = `SELECT SHA2('${password}', 256) AS hashedPassword`;
        con.query(hashedPasswordQuery, (err, result) => 
        {
            err ? reject(err) : result?.length > 0 ? resolve(result[0].hashedPassword) : reject(new Error('No hashed password found'))
        });
    });
};

// The below function is for file upload
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

// The below function is for file upload
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

// THE BELOW FUNCTION IS FOR CHNAGING THE STATUS FROM INACTIVE TO ACTIVER OR ACTIVE TO INACTIVE
exports.updateUserStatus = async (tablename, Id) =>
{
    return await new Promise(async (resolve, reject) => 
    {
        let result = await commonfetching.dataOnCondition(tablename, Id, 'id');
        if (result?.length > 0 && result[0].status === constants.status.active && !result[0].deleted_at)
        {
            let UpdateQuery = ` UPDATE ${tablename} t 
                                SET t.status ='${constants.status.inactive}',
                                t.updated_at = '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'  
                                WHERE t.id = '${Id}' 
                                AND t.deleted_at IS NULL`;
            let result1 = await this.queryAsync(UpdateQuery);
            result1 === 'err' ? resolve([]) : resolve(result1)
        }
        else if (result?.length > 0 && result[0].status === constants.status.inactive && !result[0].deleted_at)
        {
            let UpdateQuery = ` UPDATE ${tablename} t 
                                SET t.status ='${constants.status.active}'
                                WHERE t.id = '${Id}' 
                                AND t.deleted_at IS NULL `;
            let result2 = await this.queryAsync(UpdateQuery);
            result2 === 'err' ? resolve([]) : resolve(result2)
        }
        else
        {
            resolve([]);
        }
    });
}

// The belew function is for the remove button.
exports.removeUser = async (tablename, Id) =>
{
    return await new Promise(async (resolve, reject) => 
    {
        let result = await commonfetching.dataOnCondition(tablename, Id, 'id')
        if (result?.length > 0 && result[0].status === constants.status.active && !result[0].deleted_at)
        {
            let UpdateQuery = `UPDATE ${tablename} t SET t.status ='${constants.status.inactive}', t.deleted_at = '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE t.id = '${Id}' `;
            let result = await this.queryAsync(UpdateQuery);
            result?.affectedRows == 0 ? resolve([]) : resolve(result);
        }
        else if(result?.length > 0 && result[0].status === constants.status.inactive && !result[0].deleted_at)
        {
            let UpdateQuery = `UPDATE ${tablename} t SET t.deleted_at = '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE t.id = '${Id}' `;
            let result = await this.queryAsync(UpdateQuery);
            result?.affectedRows == 0 ? resolve([]) : resolve(result);  
        }                
        else
        {
            resolve([]);
        }  
    });
}

// The below function is for counting the total number of data. According to the table name given
exports.totalCount = async (tablename) =>
{
    try 
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `    
                                SELECT count(t.id) 
                                FROM ${tablename} t 
                                WHERE t.deleted_at IS NULL
                            `;
            con.query(selQuery, (err, result) =>
            {
                err ? resolve(`err`) : result?.length > 0 ? resolve(result) : resolve([])
            });
        });      
    }
    catch (error)
    {   
        return console.log(`Error from the 'totalCount' function in the commonoperation.js`);     
    }
}

// The below function is for counting the total number of data. According to the table name given for a particular service provider on the basis of its id
exports.totalCountParticularServiceProvider = async (tablename, Id) =>
{
    try 
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `
                            SELECT count(t.id) 
                            FROM ${tablename} t 
                            WHERE t.deleted_at IS NULL 
                            AND t.service_provider_id = ${Id}
                        `;
            con.query(selQuery, (err, result) =>
            {
                err ? resolve(`err`) : result?.length > 0 ? resolve(result) : resolve([]);        
            });
        });      
    }
    catch (error)
    {
        return console.log(`Error from the 'totalCountParticularServiceProvider' function in the commonoperation.js`);     
    }
}

// the below function is for uploading the file
exports.fileUploadTwo = async (attachments, path) => 
{ 
    return new Promise((resolve, reject) =>
    {
        if (!attachments) // || !attachments.file || !Array.isArray(attachments.file)) 
        {
            resolve('NOATTACHEMENT')
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
                    err ? resolve('ERR') : resolve(filename);
                });                
            }
            else
            {
                resolve('INVALIDFORMAT')
            }
        }
    });
}

//The below funtion is universal arrow function. Which will be used for executing the query.
exports.queryAsync = (query) =>
{
    return new Promise((resolve, reject) =>
    {
        con.query(query, (err, result) =>
        {
            err ? resolve('err') : resolve(result) 
        });
    });
}

// the below function is for creating the token for the url.
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
    const expirationTimestamp = currentTimestamp + constants.password.token_expiry;
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
            
            let verifyId =  await commonfetching.dataOnCondition(constants.tableName.service_providers,userId,'id')
            if(verifyId.length != 0)
            {
                if(verifyId[0].email === email)
                {
                    resolve({id :verifyId[0].id,token :token})
                }
                else
                {
                    resolve(false);
                }
            }
            else
            {
                resolve(false);
            }
        });      
    }
    catch (error)
    {

    }
};

exports.tokenGeneration = async(email) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let email_length = email.length;
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
            const expirationTimestamp = currentTimestamp + constants.password.token_expiry; 
            // constants.password.token_expiry;
            const customizepasswordToken = `${emailTokenSidePart1.join('')}A${emailTokenSidePart2.join('')}T${expirationTimestamp}`;
            resolve({token : customizepasswordToken});
        });      
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder,at the time of token generation. `, error);                
    }
};

// The belwo function is for the count of all review related calculation
exports.reviewscounts = async (Id) =>
{
    var booking_Ids = [];
    var booking_Ids2 = [];
    
    var particular_vehicle_review_count = 0;
    var particular_service_provider_count = 0;
    var particular_text_review_count = 0;
   
    var particular_service_provider_rating = 0;
    var total_service_provider_rating_sum = 0; // Initialize the sum
    var total_vehicle_rating_sum = 0;
    var total_vehicle_rating = 0;
   
    var total_service_provider_rating_one = 0;
    var total_vehicle_rating_one = 0



    var particular_vehicle_rating = 0;
    var total_service_provider_rating = 0;    
    
    var one_star_count = 0;
    var two_star_count = 0;
    var three_star_count = 0;
    var four_star_count = 0;
    var five_star_count = 0;

    var vehicle_data = await commonfetching.dataOnCondition(constants?.tableName?.vehicles, Id, 'id');
    var booking_data = await commonfetching.dataOnCondition(constants?.tableName?.bookings, Id, 'vehicle_id');
    var service_provider_occurance = await commonfetching.dataOnCondition(constants.tableName.bookings, vehicle_data[0]?.service_provider_id, 'service_provider_id');
    
    // Use map to extract 'id' values from 'booking_data' array
    booking_Ids = booking_data.map(item => item?.id);
    booking_Ids2 = service_provider_occurance.map(item => item?.id)
    customer_Id = booking_data.map(item => item?.customer_id);

    for (let i = 0; i < booking_Ids?.length; i++)
    {
        let datapresenet = await commonfetching.dataOnCondition(constants.tableName.reviews, booking_Ids[i], 'booking_id');
        if(datapresenet != 0)
        {
            particular_vehicle_review_count = particular_vehicle_review_count + datapresenet?.length;
        }
    }

    for (let i = 0; i < booking_Ids2?.length; i++)
    {
        let datapresenet = await commonfetching.dataOnCondition(constants.tableName.reviews, booking_Ids2[i], 'booking_id');
        if(datapresenet != 0)
        {
            particular_service_provider_count = particular_service_provider_count + datapresenet?.length; 
        }
    }

    for (let i = 0; i < booking_Ids?.length; i++)
    {
        let datapresenet2 = await commonfetching.dataOnCondition(constants.tableName.reviews, booking_Ids[i], 'booking_id');
        if(datapresenet2 != 0)
        {
            for (let j = 0; j < datapresenet2?.length; j++ )
            {
                if(datapresenet2[j].review != null)
                {
                    particular_text_review_count ++;
                }
                else
                {
                    continue
                }
            }      
        }
    }

    for(let i = 0; i < booking_Ids?.length; i++)
    {
        let datapresent3 = await commonfetching.dataOnCondition(constants.tableName.reviews, booking_Ids[i], 'booking_id');
        if(datapresent3?.length !== 0)
        {
            let particular_vehicle_rating_sum = 0;
            for (let j = 0; j < datapresent3?.length; j++ )
            {
                particular_vehicle_rating_sum += datapresent3[j]?.rating
            }
            particular_vehicle_rating = (((particular_vehicle_rating_sum / (5 * datapresent3?.length)) * 5 )).toFixed(1);
            total_vehicle_rating_sum += parseFloat(particular_vehicle_rating);
        }
    }


    for (let i = 0; i < booking_Ids2?.length; i++)
    {
        let datapresenet = await commonfetching.dataOnCondition(constants.tableName.reviews, booking_Ids2[i], 'booking_id');
        if (datapresenet?.length !== 0)
        {
            let particular_service_provider_rating_sum = 0; // Initialize for each booking
            for (let j = 0; j < datapresenet?.length; j++)
            {
                particular_service_provider_rating_sum += datapresenet[j]?.rating;
            }
                
            particular_service_provider_rating = (((particular_service_provider_rating_sum / (5 * datapresenet?.length)) * 5 )).toFixed(1);
            total_service_provider_rating_sum += parseFloat(particular_service_provider_rating); // Add the rating to the sum
        }
    }
    
    total_service_provider_rating_one = (booking_Ids2?.length !== 0 ? parseFloat((total_service_provider_rating_sum / booking_Ids2?.length).toFixed(1)) : '--');
    total_vehicle_rating_one = (booking_Ids?.length !== 0 ? parseFloat((total_vehicle_rating_sum / booking_Ids?.length).toFixed(1)) : '--');



    total_service_provider_rating = total_service_provider_rating_one !== 0 ? total_service_provider_rating_one : '--'
    total_vehicle_rating = total_vehicle_rating_one !== 0 ? total_vehicle_rating_one : '--'


    for (let i = 0; i < booking_Ids?.length; i++)
    {
        let datapresenet = await commonfetching.dataOnCondition(constants.tableName.reviews, booking_Ids[i], 'booking_id');
        if(datapresenet != 0)
        {
            for (let j = 0; j < datapresenet?.length; j++ )
            {
                if(datapresenet[j].rating === 5)
                {
                    five_star_count ++;
                }   
                else if(datapresenet[j].rating === 4)
                {
                    four_star_count ++
                }
                else if(datapresenet[j].rating === 3)
                {
                    three_star_count++
                }
                else if(datapresenet[j].rating === 2)
                {
                    two_star_count ++
                }
                else if(datapresenet[j].rating === 1)
                {
                    one_star_count++
                }
            }
        }
    }

    let total_count = five_star_count + four_star_count + three_star_count + two_star_count + one_star_count;
    let five_star_percentage = total_count !== 0 ? ((five_star_count / total_count) * 100).toFixed(2) : 0;
    let four_star_percentage = total_count !== 0 ? ((four_star_count / total_count) * 100).toFixed(2) : 0;
    let three_star_percentage = total_count !== 0 ? ((three_star_count / total_count) * 100).toFixed(2) : 0;
    let two_star_percentage = total_count !== 0 ? ((two_star_count / total_count) * 100).toFixed(2) : 0;
    let one_star_percentage = total_count !== 0 ? ((one_star_count / total_count) * 100).toFixed(2) : 0;

    let count = 
    {
        particular_vehicle_review_count,
        particular_service_provider_count,
        total_service_provider_rating,
        total_vehicle_rating,
        particular_text_review_count,
        five_star_percentage,
        four_star_percentage,
        three_star_percentage,
        two_star_percentage,
        one_star_percentage
    }
    return count;
}