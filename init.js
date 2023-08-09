/////////////////////////////////////////////////////////////////////////////////////////
//    This file is used to enter the first admin data from the backend.                //
//    In the program we are entering one of the admin data from the backend.           //
//    Because every route need a barrier token to run. To make them run we are adding  //
//    one of the user from the backend with the token and expiry date.                 //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require('./configs/db.configs'); // Importing the con variable
const timeCalculate = require('./utils/helper/date'); // This variable will have the date file data. It is used to add days to current date for expiration of token
require('dotenv').config(); // Importing the dotenv library
const constants = require('./utils/constants'); // Importing the constants variables data

module.exports = async function() 
{
    // making the connection with the database
    con.connect(function(err)
    {
        let selQuery = `SELECT * FROM ${constants.tableName.service_providers} sp WHERE sp.user_name = '${process.env.SPUSERNAME}' OR sp.email = '${process.env.EMAIL}' OR sp.contact_no = '${process.env.CONTACT_NO}' `;
        // console.log(selQuery);
        con.query(selQuery, function (err, result)  // Executing the above query
        {
            // console.log(err);
            // console.log(result);
            if(result.length != 0)
            {
                 
            }
            else
            {    
                new Promise(async (resolve, reject)=> 
                {  
                    let insQuery = `INSERT INTO ${constants.tableName.service_providers}(name, email, user_name, password, contact_person, contact_no, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at, created_at) VALUES ('${process.env.NAME}', '${process.env.EMAIL}', '${process.env.SPUSERNAME}', SHA2('${process.env.PASSWORD}', 256), '${process.env.CONTACT_PERSON}', '${process.env.CONTACT_NO}', '${process.env.CONTACT_ADDRESS}', '${process.env.EMERGENCY_CONTACT_NO}', '${process.env.CERTIFICATION_OR_LICENSE_IMG}', '${process.env.CERTIFICATION_OR_LICENSE_NO}', 'TRUE', 'TRUE', '${timeCalculate.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'                     )`; 
                    // console.log(insQuery);
                    con.query(insQuery, (err, result1)=> // Executing the above query
                    {
                        if(result1) // if inserion happend correctly then if block
                        {
                            // The belwo query is for add the data into the password policies table
                            let insQueryPP = `INSERT INTO ${constants.tableName.password_policies}(name, value) VALUES ('${process.env.pname}', '${process.env.regex}')`;
                            // console.log(insQueryPP); 
                            con.query(insQueryPP, (err, result2)=> // Executing the above query
                            {
                                if(result2)
                                {
                                    let insQueryApp = `INSERT INTO ${constants.tableName.application_settings} (id,application_title,contact_address,email,phone,country_code,logo,loginpage_logo,loginpage_bg_image,favicon,language_id,currency_id,tax_id,licence_number,invoice_prefix,quotation_prefix,created_at)
                                    VALUES (
                                        1,
                                        'My Application',
                                        '123 Main Street, City, Country',
                                        'contact@example.com',
                                        '+1234567890',
                                        'US',
                                        'logo.png',
                                        'login_logo.png',
                                        'login_bg_image.jpg',
                                        'favicon.ico',
                                        1,
                                        1,
                                        1,
                                        'ABC12345',
                                        'INV',
                                        'QUO',
                                        NOW()
                                    );
                                    `;
                                    // console.log(insQueryPP); 
                                    con.query(insQueryApp, (err, result22)=> // Executing the above query
                                    {
                                        if(result22) 
                                        {
                                            console.log("All the data is been entered in the database from the backend");
                                            // resolve('true');
                                        }
                                        else
                                        {  
                                            console.log("#### Error while entereing the password policies data from the backend #### ", err)
                                        }
                                    });
                                }
                                else
                                { 
                                    console.log("#### Error while entereing the password policies data from the backend #### ", err)
                                }
                            });
                        }
                        else // if error happend then else block
                        {
                            console.log("#### Error while entereing the username data from the backend #### ")
                            // reject(err);
                        } 
                    });
                });
            }
        });
    });
}
 