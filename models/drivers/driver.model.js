/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants'); // Constant elements are stored in this file
const commonfetching = require('../../utils/helper/commonfetching'); // helper file function. This file consist of functions Which is written universally for fetching the data from the database
const commonoperation = require('../../utils/helper/commonoperation'); // helper file function. This file consist of functions Which is written universally for some common operations.
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection
const objectConvertor = require('../../utils/objectConvertor'); 

module.exports = class drivers
{
    constructor(){}
    
    /**
    * The below function is for the Admin side page
    * 
    * The function for fetching all the drivers details present in the database.
    */
    static async getall(pageNumber, pageSize, Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log('Check Role Data At The Get All Driver : ', checkRole);
                con.query(checkRole, async (err, result) =>
                {
                    // console.log(`Roles at the time of the get all of the drivers: `, result);
                    if(err)
                    {
                       console.log('Error while checking the role at the time of driver');
                       resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                    {
                        console.log(`Role name is admin at the time of the drivers`);
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${constants.tableName.drivers} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;                        
                        // console.log('Selquery of driver when user is admin or suport admin: ',selQuery);
                        const count = await commonoperation.totalCount(constants.tableName.drivers);
                        // console.log('Total Data', count[0]['count(t.id)']);
                        con.query(selQuery, async (err, result2) =>
                        {
                            if(err)
                            {
                                console.error(err);
                                resolve('err');
                            }
                            else
                            {
                                let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                FROM ${constants.tableName.permissions} AS pm
                                JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.drivers}'
                               `;
                                // console.log(Query);
                                con.query(Query, (err, moduleResult) =>
                                {
                                    if(err)
                                    {
                                        console.log('Error while fetching the module name at the time of getall driver');
                                        resolve('err') 
                                    }
                                    else
                                    {                                     
                                        if(result.length === 0)
                                        {
                                            resolve ({totalCount : count[0]['count(t.id)'], drivers : result2, module : moduleResult});
                                        }
                                        else
                                        {
                                            resolve ({totalCount : count[0]['count(t.id)'], drivers : result2, module : moduleResult});
                                        }
                                    }
                                });
                            }                           
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        console.log(`Role name is service provider at the time of drivers`);
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM drivers cd, assign_drivers ad WHERE ad.service_provider_id = ${Id} AND ad.deleted_at IS NULL AND ad.driver_id = cd.id AND cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                        // console.log('Selquery of driver when user is service provider: ',selQuery);
                        con.query(selQuery, async (err, resultSel) =>
                        {
                            if(err)
                            {
                                console.log(err);
                                resolve('err');
                            }
                            else
                            {
                                const count = `SELECT count(t.id) FROM assign_drivers t WHERE t.deleted_at IS NULL AND t.service_provider_id = ${Id}`;
                                con.query(count, (err, resultcount) =>
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                        resolve('err');
                                    }
                                    let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                    FROM ${constants.tableName.permissions} AS pm
                                    JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                    JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                    WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.drivers}' `;
                                    // console.log(Query);
                                    con.query(Query, (err, moduleResult) =>
                                    {
                                        if(err)
                                        {
                                            console.log('Error while fetching the module name at the time of getall driver');
                                            resolve('err') 
                                        }
                                        else
                                        { 
                                            if(resultSel.length === 0)
                                            {
                                                resolve ({totalCount : resultcount[0]['count(t.id)'], drivers : resultSel, module : moduleResult});
                                            }
                                            else
                                            {
                                                resolve ({totalCount : resultcount[0]['count(t.id)'], drivers : resultSel, module : moduleResult});
                                            }
                                        }
                                    });
                                });
                            }                            
                        });
                    }
                    else
                    {
                        console.log('I think the role name which we got is not present in the database at the time of driver');
                        resolve('err') 
                    }                    
                });
            });                              
        }
        catch(error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getAll". Which is designed to fetch all the data of drivers.');                    
        }
    };

    /**
    * The below model function is for the Admin side page. 
    * The function for fetching particular driver details present in the database on the basis of driver id.
    */
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
    };

    /**
     * The below model function is for the Admin side page.
     * For adding or registering a new driver
     */
    static async adddriver(Id, name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log(checkRole);
                con.query(checkRole, async (err, resultRole) =>
                {
                    // console.log(resultRole);
                    if(err)
                    {
                        console.log('Error while fetching the role name at the time of add driver');
                        resolve('err') 
                    }
                    else
                    {
                        var uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                        // console.log(uploadprofile_image);
                        var uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
                        // console.log(uploadprofile_image);
                        if(resultRole[0].role_id === constants.Roles.admin)
                        {
                            console.log('Admin block when adding of the driving');
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

                        }
                        else if(resultRole[0].role_id === constants.Roles.service_provider)
                        {
                            console.log('Service provider block when adding of the driving');
                            let insQuery = `INSERT INTO ${constants.tableName.drivers}(name, email, contact_no, emergency_contact_no, date_of_birth, profile_image, licence_no , licence_img , description, created_at) VALUES('${name}', '${email}', '${contact_no}', '${emergency_contact_no}', '${date_of_birth}', '${uploadprofile_image}', '${licence_no}', '${uploadlicence_img}', '${description}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                            // console.log(insQuery);
                            con.query(insQuery, async (err, result) =>
                            {
                                // console.log(result);
                                if(result.affectedRows > 0)
                                {
                                    console.log('Driver data added successfully');
                                    let recentAddedDriverData = await commonfetching.dataOnCondition(constants.tableName.drivers, email, 'email');
                                    // console.log('Data of the recently added driver: ', recentAddedDriverData);
                                    if(recentAddedDriverData.length > 0)
                                    {
                                        let assignDriverWhileAdd = await this.assignserviceprovider(recentAddedDriverData[0].id, Id)
                                        if(assignDriverWhileAdd === 'datainserted')
                                        {
                                            console.log(`Driver is assigned as well.`);
                                            resolve(result);
                                        }   
                                        else
                                        {
                                            console.log(` Error while assigning the driver to a service provider at the time of adding a new driver`);  
                                            resolve('err')
                                        }
                                    }
                                    else
                                    {
                                        console.log(`Error while fetching the recently added driver data in the service provider side.`);
                                        resolve('err');
                                    }
                                }
                                if(err)
                                {
                                    console.log('Error while adding the driver in the service provider');
                                    resolve('err');
                                }
                            });                            
                        }
                        else
                        {
                            console.log('I think the role name which we got is not present in the database at the time of driver');
                            resolve('err');
                        }
                    }
                });                
            });            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "addcustomer". Which is designed to add particular data of the drivewr.');            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is updating the status of a particular driver on the basis of driver id in the params.
    */
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

    /**
    * The below model function is for the Admin side page. The function is updating or adding the deleted_at of a particular driver on the basis of driver id in the params.
    * This will be considered as the driver is deleted
    */
    static async removedriver(Id)
    {
        return await new Promise(async(resolve, reject)=>
        {
            try
            {
                // console.log(Id);
                const data = await commonoperation.removeUser(constants.tableName.drivers, Id);
                // console.log('Data: ', data);
                if(data.affectedRows === 0)
                {
                    resolve(data)
                }
                else
                {
                    // console.log('Came inside');
                    let selQueryAssign = `SELECT * FROM assign_drivers ad WHERE ad.driver_id = ${Id} AND ad.deleted_at IS NULL`
                    // console.log(selQueryAssign);
                    con.query(selQueryAssign, async (err, result2) =>
                    {
                        // console.log(`Result 2: `, result2);
                        if(result2.length != 0) 
                        {
                            let upQuery = `UPDATE assign_drivers ad
                            SET ad.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                            WHERE ad.driver_id = ${Id}
                            AND ad.deleted_at IS NULL`;
                            // console.log(upQuery);
                            con.query(upQuery, async (err, result) =>
                            {
                                if(result.affectedRows > 0)
                                {                               
                                    resolve(data)
                                }
                                else
                                {                        
                                    resolve(data)
                                }
                            });
                        }
                        if(result2.length == 0)
                        {                            
                            resolve(data)
                        }
                    });
                }            
            }
            catch (error)
            {
                console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "removedriver". Which is designed to remove particular driver.', error);            
            }
        });
    };    

    /**
    * The below model function is for the Admin side page. The function is updating or edititng the details of the present driver on the basis of driver id in the params.
    */
    static async editdriver(id, name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img) {
    try 
    {
            // console.log('Licence Image', licence_img);
            // console.log('Profile Image', profile_image);
    
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
    };

    /**
     * The below model function is for the admin side page.
     * This function is a service provider to a driver
     */
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
                                console.log('Error while fetching the information of driver. Whether the driver left the last work place', error);
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
                                            console.log('Error while inserting the data into the assign driver table');
                                            // console.log(err);
                                            resolve('err')
                                        }
                                    });
                                }
                                else
                                {
                                    console.log('The driver is already working under a service provider. We cannot allow them to work here.');
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
    };

    /**
     * The below model function is for the admin side page.
     * This function is the past histroy of the driver
     */
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
                    // console.log('Second Query: ', existSelQuery);
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
    };

    /**
     *  The below model function is for the admin side page.
     *  Is the unassign the driver to a particular service provider
     */
    static async unassignserviceprovider(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let upQuery = `UPDATE ${constants.tableName.assign_drivers} t 
                SET t.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                WHERE t.id = '${Id}' 
                AND t.deleted_at IS NULL `;
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
    };

    /**
     *  The below model function is for the admin side page.
     *  It is for unassinging the driver to the service provider.
     *  This function will be used on the admin page. 
     */
    static async unassignserviceproviderandboth(dId,sId)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let upQuery = `UPDATE ${constants.tableName.assign_drivers} t 
                SET t.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                WHERE t.service_provider_id = ${sId} 
                AND t.driver_id = '${dId}' 
                AND t.deleted_at IS NULL `;
                // console.log(upQuery);
                con.query(upQuery, (err, result) =>
                {
                    // console.log(result);
                    if(result.affectedRows > 0)
                    {
                        // console.log(`Unassigned of the driver ${Id} id done `);
                        resolve('unassigned');
                    }
                    else
                    {
                        if(result.affectedRows === 0)
                        {
                            console.log(`The id's which is submitted is already unassigned`);
                            resolve('alreadyunassigned');
                        }

                        // if(dId.length === 0)
                        // {
                        //     resolve('noDriver')
                        // }

                        // if(sId.length === 0)
                        // {
                        //     resolve('noServiceProvider')
                        // }
                        
                        if(err)
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
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "unassignserviceproviderandboth". Which is designed to unassigned particular driver to their service provider.', error);            
        }        
    };
};