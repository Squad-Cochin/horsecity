/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs');
const { pastWorkHistroyResponse } = require('../../utils/objectConvertor');
const objectConvertor = require('../../utils/objectConvertor');

module.exports = class drivers
{
    constructor(){}

    static async getall(pageNumber, pageSize)
    {
        try
        {
            const data = await commonfetching.getAllDataOfDriverAndCustomer(constants.tableName.drivers, pageNumber, pageSize);
            // console.log('Data', data);
            const count = await commonoperation.totalCount(constants.tableName.drivers)
            // console.log('Total Data', count[0]['count(t.id)']);
            if(data.length === 0)
            {
                return ({totalCount : count[0]['count(t.id)'], drivers : data});
            }
            else
            {
                return ({totalCount : count[0]['count(t.id)'], drivers : data});
            }                     
        }
        catch(error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getAll". Which is designed to fetch all the data of drivers.');                    
        }
    };

    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.drivers, Id, 'id');
            if(data.length === 0)
            {
                return data
            }
            else
            {
                data[0].date_of_birth = `${time.formatDateToDDMMYYYY(data[0].date_of_birth)}`; 
                data[0].updated_at = `${time.formatDateToDDMMYYYY(data[0].updated_at)}`;
                data[0].created_at = `${time.formatDateToDDMMYYYY(data[0].created_at)}`;
                data[0].profile_image = `${process.env.PORT_SP}${constants.attachmentLocation.driver.view.profilephoto}${data[0].profile_image}`;
                data[0].licence_img = `${process.env.PORT_SP}${constants.attachmentLocation.driver.view.licence}${data[0].licence_img}`;
                // console.log('Dob: ', dob);
                // console.log('Driver licence image link: ', data[0].licence_img);
                // console.log("Driver profile image link: ", data[0].profile_image);
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getone". Which is designed to fetch particular data of the drivers.');            
        }
    }

    static async adddriver(name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                // console.log(uploadprofile_image);
                let uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
                // console.log(uploadprofile_image);
                let insQuery = `INSERT INTO ${constants.tableName.drivers}(name, email, contact_no, emergency_contact_no, date_of_birth, profile_image, licence_no , licence_img , description, created_at) VALUES('${name}', '${email}', '${contact_no}', '${emergency_contact_no}', '${date_of_birth}', '${uploadprofile_image}', '${licence_no}', '${uploadlicence_img}', '${description}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                // console.log(insQuery);
                con.query(insQuery, (err, result) =>
                {
                    // console.log(result);
                    if(result.affectedRows > 0)
                    {
                        console.log('Driver data added successfully');
                        resolve(result);
                    }
                    else
                    {
                        resolve('err')
                    }
                });                
            });            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "addcustomer". Which is designed to add particular data of the drivewr.');            
        }
    }


    static async updatestatus(Id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.drivers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "updatestatus". Which is designed for changing the status of the driver.');            
        }
    };

    static async removedriver(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.drivers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "removedriver". Which is designed to remove particular driver.');            
        }
    };

    // static async editdriver(id, name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img)
    // {
    //     try
    //     {
    //         return await new Promise(async(resolve, reject)=>
    //         {
    //             console.log('Licence Image', licence_img);
    //             console.log('Profile Image', profile_image);
    //             if(profile_image === null || profile_image === undefined && licence_img === null || licence_img === undefined )
    //             {
    //                 console.log('Idhar');
    //                 let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}', d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
    //                 // console.log(upQuery);
    //                 con.query(upQuery, (err, result) =>
    //                 {
    //                     // console.log(result);
    //                     if(result.affectedRows > 0)
    //                     {
    //                         console.log('Driver data updated successfully');
    //                         resolve(result);
    //                     }
    //                     else
    //                     {
    //                         resolve('err')
    //                     }
    //                 });
    //             }
    //             if(licence_img === null || licence_img === undefined)
    //             {
    //                 console.log('I');
    //                 let uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
    //                 let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}', d.profile_image = '${uploadprofile_image}', d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
    //                 // console.log(upQuery);
    //                 con.query(upQuery, (err, result) =>
    //                 {
    //                     // console.log(result);
    //                     if(result.affectedRows > 0)
    //                     {
    //                         console.log('Driver data updated successfully');
    //                         resolve(result);
    //                     }
    //                     else
    //                     {
    //                         resolve('err')
    //                     }
    //                 });
    //             }
    //             if(profile_image === null || profile_image === undefined)
    //             {
    //                 console.log('Idhar Udhar');
    //                 let uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
    //                 let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}', d.licence_img  = '${uploadlicence_img}', d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
    //                 // console.log(upQuery);
    //                 con.query(upQuery, (err, result) =>
    //                 {
    //                     // console.log(result);
    //                     if(result.affectedRows > 0)
    //                     {
    //                         console.log('Driver data updated successfully');
    //                         resolve(result);
    //                     }
    //                     else
    //                     {
    //                         resolve('err')
    //                     }
    //                 });
    //             }
    //             else 
    //             {
    //                 console.log('Idhar Udhar ADhar');
    //                 let uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
    //                 // console.log(uploadprofile_image);
    //                 let uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
    //                 // console.log(uploadprofile_image);
    //                 let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}', d.licence_img  = '${uploadlicence_img}', d.profile_image = '${uploadprofile_image}', d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
    //                 // console.log(upQuery);
    //                 con.query(upQuery, (err, result) =>
    //                 {
    //                     // console.log(result);
    //                     if(result.affectedRows > 0)
    //                     {
    //                         console.log('Driver data updated successfully');
    //                         resolve(result);
    //                     }
    //                     else
    //                     {
    //                         resolve('err')
    //                     }
    //                 });
    //             }               
    //         });            
    //     }
    //     catch (error)
    //     {
    //         console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "editdriver". Which is designed to edit particular data of the driver.');            
    //     }
    // }

    static async editdriver(id, name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img) {
        try {
            console.log('Licence Image', licence_img);
            console.log('Profile Image', profile_image);
    
            let uploadprofile_image, uploadlicence_img;
    
            if (profile_image !== null && profile_image !== undefined) {
                uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
            }
    
            if (licence_img !== null && licence_img !== undefined) {
                uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
            }
    
            let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}',`;
    
            if (uploadprofile_image) {
                upQuery += ` d.profile_image = '${uploadprofile_image}',`;
            }
    
            if (uploadlicence_img) {
                upQuery += ` d.licence_img = '${uploadlicence_img}',`;
            }
    
            upQuery += ` d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
    
            return await new Promise((resolve, reject) => {
                con.query(upQuery, (err, result) => {
                    if (err) {
                        console.error(err);
                        resolve('err');
                    } else if (result.affectedRows > 0) {
                        console.log('Driver data updated successfully');
                        resolve(result);
                    } else {
                        resolve('err');
                    }
                });
            });
        } catch (error) {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "editdriver". Which is designed to edit particular data of the driver.');
        }
    }
    

    static async assignserviceprovider(dId, sId)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let driverId = await commonfetching.dataOnCondition(constants.tableName.drivers, dId, 'id');
                // console.log(`Driver Data: `, driverId);
                let serproviderId = await commonfetching.dataOnCondition(constants.tableName.service_providers, sId, 'id');
                // console.log(`Provider Data: `, serproviderId);
                if(driverId.length === 0)
                {
                    resolve('noDriver')
                }
                else
                {
                    if(serproviderId.length === 0)
                    {
                        resolve('noServiceProvider')
                    }
                    else
                    {
                        let selQuery = `SELECT * FROM assign_drivers t WHERE t.service_provider_id = ${sId} AND t.driver_id = ${dId} AND t.deleted_at IS NULL`;
                        // console.log('Select query in the driver assignment', selQuery);
                        con.query(selQuery, (error, result) =>
                        {
                            // console.log('Select query result', result);
                            // console.log('Select query error',  error)
                            if(error)
                            {
                                // console.log('Error while fetching the information of driver. Whether the driver left the last work place', error);
                                resolve('lastworkplaceerror')
                            }
                            else
                            {
                                if(result.length === 0)
                                {
                                    let insQuery = `INSERT INTO assign_drivers(service_provider_id, driver_id, created_at) VALUES(${sId}, ${dId}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    // console.log(`Insert Query While Assigning Driver To A Service Provider: `, insQuery);
                                    con.query(insQuery, (err, result2) =>
                                    {
                                        // console.log('Insert Query Error', err);
                                        // console.log(`Insert Query Result`, result2);
                                        if(result2.affectedRows > 0)
                                        {
                                            // console.log('Data inserted into the assign driver table');
                                            resolve('datainserted');
                                        }
                                        else
                                        {
                                            // console.log('Error while inserting the data into the assign driver table');
                                            // console.log(err);
                                            resolve('err')
                                        }
                                    });
                                }
                                else
                                {
                                    // console.log('The driver is already working under a service provider. We cannot allow them to work here.');
                                    resolve('notallowed')
                                }
                            }
                        });
                    }
                }
            });            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "assignserviceprovider". Which is designed to assigne the driver to service provider.');            
        }
    }

    // 

    static async getworkpastserviceprovider(id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT ad.id, sp.user_name, ad.created_at FROM ${constants.tableName.assign_drivers} ad, ${constants.tableName.service_providers} sp WHERE ad.driver_id = ${id} AND ad.deleted_at IS NULL AND sp.id = ad.service_provider_id`;
                // console.log('First Query: ',selQuery);
                con.query(selQuery, (err, result) =>
                {
                    // console.log('First Result: ', result);
                    let existSelQuery = `SELECT sp.* FROM service_providers sp LEFT JOIN assign_drivers ad ON sp.id = ad.service_provider_id AND ad.driver_id = ${id} AND ad.deleted_at IS NULL WHERE ad.id IS NULL`;
                    console.log('Second Query: ', existSelQuery);
                    con.query(existSelQuery, (error, result1)=>
                    {
                        // console.log('Second Result: ', result1);
                        let responseObj =
                        {
                            exist: [],      // Set 'result' into 'exist' property
                            notexist: []   // Set 'result1' into 'notexist' property
                        };
                        if(result.length == 0)
                        {
                            responseObj.notexist = objectConvertor.notWorkedPlace(result1);
                            resolve(responseObj);
                        }
                        else if(err)
                        {
                            resolve(`err`)
                        }
                        else
                        {
                            responseObj.exist = objectConvertor.pastWorkHistroyResponse(result),
                            responseObj.notexist = objectConvertor.notWorkedPlace(result1);
                            resolve(responseObj)
                        }
                    });
                });                
            });            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "assignserviceprovider". Which is designed to assigne the driver to service provider.');            
        }
    }

    static async unassignserviceprovider(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let upQuery = `UPDATE ${constants.tableName.assign_drivers} t SET t.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE t.id = '${Id}' AND t.deleted_at IS NULL `;
                con.query(upQuery, (err, result) =>
                {
                    if(result.affectedRows > 0)
                    {
                        console.log(`Unassigned of the driver ${Id} id done `);
                        resolve('unassigned');
                    }
                    else
                    {
                        if(result.affectedRows === 0)
                        {
                            console.log(`The id which is submitted is already unassigned`);
                            resolve('alreadyunassigned');
                        }
                        else
                        {
                            console.log(err);
                            resolve('err');
                        }
                    }
                });
            });      
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "unassignserviceprovider". Which is designed to unassigned particular driver to their service provider.', error);            
        }        
    }

    









};