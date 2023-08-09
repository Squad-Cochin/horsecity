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

// module.exports = async function() 
// {
//     // making the connection with the database
//     con.connect(function(err)
//     {
//         let selQuery = `SELECT * FROM ${constants.tableName.service_providers} sp WHERE sp.user_name = '${process.env.SPUSERNAME}' OR sp.email = '${process.env.EMAIL}' OR sp.contact_no = '${process.env.CONTACT_NO}' `;
//         // console.log(selQuery);
//         con.query(selQuery, function (err, result)  // Executing the above query
//         {
//             // console.log(err);
//             // console.log(result);
//             if(result.length != 0)
//             {
                 
//             }
//             else
//             {    
//                 new Promise(async (resolve, reject)=> 
//                 {  
                    // let insQuery = `INSERT INTO ${constants.tableName.service_providers}(name, email, user_name, password, contact_person, contact_no, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at, created_at) VALUES ('${process.env.NAME}', '${process.env.EMAIL}', '${process.env.SPUSERNAME}', SHA2('${process.env.PASSWORD}', 256), '${process.env.CONTACT_PERSON}', '${process.env.CONTACT_NO}', '${process.env.CONTACT_ADDRESS}', '${process.env.EMERGENCY_CONTACT_NO}', '${process.env.CERTIFICATION_OR_LICENSE_IMG}', '${process.env.CERTIFICATION_OR_LICENSE_NO}', 'TRUE', 'TRUE', '${timeCalculate.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'                     )`; 
                    // // console.log(insQuery);
                    // con.query(insQuery, (err, result1)=> // Executing the above query
                    // {
                    //     if(result1) // if inserion happend correctly then if block
                    //     {
                    //         // The belwo query is for add the data into the password policies table
                    //         let insQueryPP = `INSERT INTO ${constants.tableName.password_policies}(name, value) VALUES ('${process.env.pname}', '${process.env.regex}')`;
                    //         // console.log(insQueryPP); 
                    //         con.query(insQueryPP, (err, result2)=> // Executing the above query
                    //         {
                    //             if(result2)
                    //             {
//                                     let insQueryApp = `INSERT INTO ${constants.tableName.application_settings} (id,application_title,contact_address,email,phone,country_code,logo,loginpage_logo,loginpage_bg_image,favicon,language_id,currency_id,tax_id,licence_number,invoice_prefix,quotation_prefix,created_at)
//                                     VALUES (
//                                         1,
//                                         'My Application',
//                                         '123 Main Street, City, Country',
//                                         'contact@example.com',
//                                         '+1234567890',
//                                         'US',
//                                         'logo.png',
//                                         'login_logo.png',
//                                         'login_bg_image.jpg',
//                                         'favicon.ico',
//                                         1,
//                                         1,
//                                         1,
//                                         'ABC12345',
//                                         'INV',
//                                         'QUO',
//                                         NOW()
//                                     );
//                                     `;
//                                     // console.log(insQueryPP); 
//                                     con.query(insQueryApp, (err, result22)=> // Executing the above query
//                                     {
//                                         if(result22) 
//                                         {
//                                             console.log("All the data is been entered in the database from the backend");
//                                             // resolve('true');
//                                         }
//                                         else
//                                         {  
//                                             console.log("#### Error while entereing the password policies data from the backend #### ", err)
//                                         }
//                                     });
//                                 }
//                                 else
//                                 { 
//                                     console.log("#### Error while entereing the password policies data from the backend #### ", err)
//                                 }
//                             });
//                         }
//                         else // if error happend then else block
//                         {
//                             console.log("#### Error while entereing the username data from the backend #### ")
//                             // reject(err);
//                         } 
//                     });
//                 });
//             }
//         });
//     });
// }
 


module.exports = async function() 
{
    // making the connection with the database
    con.connect(function(err)
    {
        if(err)
        {
            console.log('Error while connecting to the databse at the time of inserting data from the backend(init.js).');
        }
        else
        {
            let checkCurrency = `SELECT * FROM ${constants.tableName.currencies} cr WHERE cr.name = '${process.env.currenciesName}' AND cr.abbreviation = '${process.env.currenciesAbbreviation}' `;
            // console.log('Check Currecny Query: ', checkCurrency);
            con.query(checkCurrency, (err, resultCurrency) =>
            {
                if(resultCurrency.length != 0)
                {
                    console.log(`Currency data may be available in the database`);
                }
                else
                {
                    let insCurrency = `INSERT INTO ${constants.tableName.currencies}(name, abbreviation, created_at) VALUES ('${process.env.currenciesName}', '${process.env.currenciesAbbreviation}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                    console.log('Insert Currecny Query: ', insCurrency);
                    con.query(insCurrency, (err , resultInsCurrency)=>
                    {
                        if(resultInsCurrency)
                        {
                            console.log('Currency entered from the backend');
                            let insLanguage = `INSERT INTO languages (name, file, abbreviation, created_at) VALUES ('${process.env.languageName}', '${process.env.fileName}', '${process.env.langaugeAbbreviation}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                            console.log('Insert Language Query: ', insLanguage);
                            con.query(insLanguage, (err , resultInsLanguage)=>
                            {
                                if(resultInsLanguage)
                                {
                                    console.log('Language entered from the backend');
                                    let insTaxation = `INSERT INTO taxations (type, name, value, created_at) VALUES 
                                    ('${process.env.taxatationTypeOne}', '${process.env.taxatationNameOne}', '${process.env.taxatationValueOne}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                    ('${process.env.taxatationTypeTwo}', '${process.env.taxatationNameTwo}', '${process.env.taxatationValueTwo}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    con.query(insTaxation, (err , insTaxation)=>
                                    {
                                        if(insTaxation)
                                        {
                                            console.log('Taxation data entered from the backend');
                                            let getCurrencyData = `SELECT * FROM ${constants.tableName.currencies} c WHERE c.name = '${process.env.currenciesName}' `;
                                            console.log('Get currecny data query: ', getCurrencyData);
                                            con.query(getCurrencyData, (err, resultGetCurrecnyData) =>
                                            {
                                                if(resultGetCurrecnyData)
                                                {
                                                    console.log('Currecny Data: ', resultGetCurrecnyData);
                                                    console.log('Currecny data successfully fetched');
                                                    let getTaxData = `SELECT * FROM ${constants.tableName.taxations} t WHERE t.name = '${process.env.taxatationNameOne}'`;
                                                    console.log('Get taxation data query: ', getTaxData);
                                                    con.query(getTaxData, (err, resultGetTaxationData) =>
                                                    {
                                                        if(resultGetTaxationData)
                                                        {
                                                            console.log('Taxation Data: ', resultGetTaxationData);
                                                            console.log('Taxation data successfully fetched');
                                                            let getLanguageData = `SELECT * FROM ${constants.tableName.languages} l WHERE l.name = '${process.env.languageName}'`;
                                                            console.log('Get language data query: ', getLanguageData);
                                                            con.query(getLanguageData, async (err, resultGetLanguageData) =>
                                                            {
                                                                if(resultGetLanguageData)
                                                                {
                                                                    console.log('Languages Data: ', resultGetLanguageData);
                                                                    console.log('Language data successfully fetched');
                                                                    let insApplicationData = `INSERT INTO application_settings (id, application_title, contact_address, email, phone, country_code, logo, loginpage_logo, loginpage_bg_image, favicon, language_id, currency_id, tax_id, licence_number, invoice_prefix, quotation_prefix, created_at)
                                                                                              VALUES (
                                                                                                 1,
                                                                                                '${process.env.applicationTitle}',
                                                                                                '${process.env.applicationContactAddress}',
                                                                                                '${process.env.applicationEmail}',
                                                                                                '${process.env.applicationPhoneNumber}',
                                                                                                '${process.env.applicationCountryCode}',
                                                                                                '${process.env.applicationLogoFileName}',
                                                                                                '${process.env.applicationLoginPageLogoFileName}',
                                                                                                '${process.env.applicationLoginPageBGImage}',
                                                                                                '${process.env.applicationFaviconImage}',
                                                                                                '${await resultGetLanguageData[0].id}',
                                                                                                '${await resultGetCurrecnyData[0].id}',
                                                                                                '${await resultGetTaxationData[0].id}',
                                                                                                '${process.env.applicationLicenceNumber}',
                                                                                                '${process.env.applicationInvoicePrefix}',
                                                                                                '${process.env.applicationQuotationPrefix}',
                                                                                                '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                                                                              )`;
                                                                    console.log('Insert Application Settings Query: ', insApplicationData);
                                                                    con.query(insApplicationData, (err , resultInsApplicationSetting)=>
                                                                    {
                                                                        if(resultInsApplicationSetting)
                                                                        {
                                                                            console.log(`Application Setting are inserted from the backend`);
                                                                            let insRole = `INSERT INTO roles (name, created_at) VALUES
                                                                            ('${process.env.roleOne}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                            ('${process.env.roleTwo}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                            ('${process.env.roleThree}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                                                            console.log('Insert data into the role table query: ', insRole);
                                                                            con.query(insRole, (err , resultInsRole)=>
                                                                            {
                                                                                if(resultInsRole)
                                                                                {
                                                                                    console.log(`Roles are inserted from the backend`);
                                                                                    let insModules = `INSERT INTO modules (name, created_at) VALUES
                                                                                    ('${process.env.moduleOne}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleTwo}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleThree}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleFour}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleFive}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleSix}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleSeven}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleEight}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleNine}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleTen}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleEleven}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleTwelve}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
                                                                                    ('${process.env.moduleThirteen}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}') `;
                                                                                    console.log('Insert data into the module table query: ', insModules);
                                                                                    con.query(insModules, (err , resultinsModules)=>
                                                                                    {
                                                                                        if(resultinsModules)
                                                                                        {
                                                                                            console.log(`Modules are inserted from the backend`);
                                                                                            let moduleData = `SELECT m.id AS mID, m.name AS ModuleName FROM ${constants.tableName.modules} m`;
                                                                                            console.log(`Fetching module data query: `, moduleData);
                                                                                            con.query(moduleData, (err, resultModuleData) =>
                                                                                            {
                                                                                                if(resultModuleData.length == 0) // If the module table is not filled with module name. then this if block code will be executed.
                                                                                                {
                                                                                                    console.log(" #### The Module Table is empty #### ", err);
                                                                                                }
                                                                                                else // If the module names are already present in the module name then this else code will be executed
                                                                                                {
                                                                                                    let roleData = `SELECT r.id AS rID, r.name AS RoleName FROM ${constants.tableName.roles} r`;
                                                                                                    con.query(roleData, (err, resultRoleData) => // Executing the above query
                                                                                                    {
                                                                                                        if(resultRoleData.length == 0) // the admin role is not available in the table then if block
                                                                                                        { 
                                                                                                            // Usually this code will never used because all the thing are corelated to each other. But it return for safety.
                                                                                                            console.log(' #### Admin Role is not available in the table #### ', err);
                                                                                                        }
                                                                                                        else
                                                                                                        {
                                                                                                            
                                                                                                                let InsQuery = `INSERT INTO permissions (role_id, module_id, \`create\`, \`update\`, \`read\`, \`delete\`) VALUES 
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[0].mID}, 'false', 'false', 'true', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[1].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[2].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[3].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[4].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[5].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[6].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[7].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[8].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[9].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[10].mID}, 'false', 'false', 'true', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[11].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[0].rID}, ${resultModuleData[12].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[0].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[1].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[2].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[4].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[5].mID}, 'true', 'false', 'true', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[6].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[7].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[8].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[9].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[10].mID}, 'false', 'false', 'true', 'false'),
                                                                                                                (${resultRoleData[1].rID}, ${resultModuleData[11].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[0].mID}, 'false', 'false', 'true', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[1].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[2].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[3].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[4].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[5].mID}, 'true', 'true', 'true', 'true'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[6].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[7].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[8].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[9].mID}, 'false', 'true', 'true', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[10].mID}, 'false', 'false', 'true', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[11].mID}, 'false', 'false', 'false', 'false'),
                                                                                                                (${resultRoleData[2].rID}, ${resultModuleData[12].mID}, 'false', 'false', 'false', 'false')
                                                                                                                `;
                                                                                                            console.log('Insert Permission Table Query: ', InsQuery);
                                                                                                            con.query(InsQuery, (err, insPermissionResult) =>
                                                                                                            {
                                                                                                                if(insPermissionResult)
                                                                                                                {
                                                                                                                    console.log(`Data Inserted into the permission table: `);
                                                                                                                    let insQuery = `INSERT INTO ${constants.tableName.service_providers}(name, email, user_name, password, contact_person, role_Id, contact_no, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at, created_at) VALUES ('${process.env.NAME}', '${process.env.EMAIL}', '${process.env.SPUSERNAME}', SHA2('${process.env.PASSWORD}', 256), '${process.env.CONTACT_PERSON}', ${resultRoleData[0].rID}, '${process.env.CONTACT_NO}', '${process.env.CONTACT_ADDRESS}', '${process.env.EMERGENCY_CONTACT_NO}', '${process.env.CERTIFICATION_OR_LICENSE_IMG}', '${process.env.CERTIFICATION_OR_LICENSE_NO}', 'TRUE', 'TRUE', '${timeCalculate.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'                     )`; 
                                                                                                                    console.log('Inserting data into the service provider table query', insQuery);
                                                                                                                    con.query(insQuery, (err, result1)=> // Executing the above query
                                                                                                                    {
                                                                                                                        if(result1) // if inserion happend correctly then if block
                                                                                                                        {
                                                                                                                            // The belwo query is for add the data into the password policies table
                                                                                                                            console.log(`Service provider data inserted successfully`);
                                                                                                                            let insQueryPP = `INSERT INTO ${constants.tableName.password_policies}(name, value) VALUES ('${process.env.pname}', '${process.env.regex}')`;
                                                                                                                            console.log(`Inserting the data into the password policies table query`, insQueryPP); 
                                                                                                                            con.query(insQueryPP, (err, result2)=> // Executing the above query
                                                                                                                            {
                                                                                                                                if(result2)
                                                                                                                                {
                                                                                                                                    console.log(`Data inserted into the password policies table`);
                                                                                                                                    let insDiscountType = `INSERT INTO discount_types (name, type, rate, created_at) VALUES('${process.env.discountName}', '${process.env.discountType}', '${process.env.dicountRate}', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                                                                                                                    console.log(`Insert Discount Table Query: `, insDiscountType);
                                                                                                                                    con.query(insDiscountType, (err, resultInsDiscountType)=> // Executing the above query
                                                                                                                                    {
                                                                                                                                        if(resultInsDiscountType)
                                                                                                                                        {
                                                                                                                                            console.log(`Discount insert data is successfully inserted from the backend`);
                                                                                                                                            console.log(`All the data are successfully inserted`);
                                                                                                                                        }
                                                                                                                                        else
                                                                                                                                        {
                                                                                                                                            return console.log(`Error while inserting the data into the discount types table from the backend.`, err);
                                                                                                                                        }
                                                                                                                                    });
                                                                                                                                }
                                                                                                                                else
                                                                                                                                {
                                                                                                                                    return console.log(`Error while inserting the data into the password policies from the backend.`, err);
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }
                                                                                                                        else
                                                                                                                        {
                                                                                                                            return console.log(`Error while inserting the data into the service providers from the backend.`, err);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                                else
                                                                                                                {
                                                                                                                    return console.log(`Error while inserting into the permission table from the backend.`, err);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    });
                                                                                                }    
                                                                                            });
                                                                                        }
                                                                                        else
                                                                                        {
                                                                                            return console.log(`Error while inserting the modules from the backend.`, err);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else
                                                                                {
                                                                                    return console.log(`Error while inserting the roles from the backend.`, err);
                                                                                }
                                                                            });
                                                                        }
                                                                        else
                                                                        {
                                                                            return console.log(`Error while inserting the applciation settings from the backend.`, err);
                                                                        }
                                                                    });
                                                                }
                                                                else
                                                                {
                                                                    return console.log(`Error while fetching the details of the languages for entering the language id into the application settings table from the backend`, err);
                                                                }
                                                            });
                                                        }
                                                        else
                                                        {
                                                            return console.log(`Error while fetching the details of the taxa for entering the tax id into the application settings table from the backend`, err);
                                                        }
                                                    });                                        
                                                }
                                                else
                                                {
                                                    return console.log(`Error while fetching the details of the currency for entering the currecny id into the application settings table from the backend`, err);                                                    
                                                }
                                            })
                                        }
                                        else
                                        {
                                            return console.log(`Error while inserting the taxation data from the backend.`, err);
                                        }
                                    });
                                }
                                else
                                {
                                    return console.log(`Error while inserting the language from the backend.`, err);
                                }
                            });
                        }
                        else
                        {
                            return console.log(`Error while inserting the currency from the backend.`, err);
                        }
                    });
                }
            });
        }
    });
}