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
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                       resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${constants.tableName.drivers} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;                        
                        const count = await commonoperation.totalCount(constants.tableName.drivers);
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
                                con.query(Query, (err, moduleResult) =>
                                {
                                    err ? resolve('err') :  result.length === 0 ? resolve ({totalCount : count[0]['count(t.id)'], drivers : result2, module : moduleResult}) : resolve ({totalCount : count[0]['count(t.id)'], drivers : result2, module : moduleResult}); 
                                });
                            }                           
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM drivers cd, assign_drivers ad WHERE ad.service_provider_id = ${Id} AND ad.deleted_at IS NULL AND ad.driver_id = cd.id AND cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                        con.query(selQuery, async (err, resultSel) =>
                        {
                            if(err)
                            {
                                resolve('err');
                            }
                            else
                            {
                                const count = `SELECT count(t.id) FROM assign_drivers t WHERE t.deleted_at IS NULL AND t.service_provider_id = ${Id}`;
                                con.query(count, (err, resultcount) =>
                                {
                                    if(err)
                                    {
                                        resolve('err');
                                    }
                                    let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                    FROM ${constants.tableName.permissions} AS pm
                                    JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                    JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                    WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.drivers}' `;
                                    con.query(Query, (err, moduleResult) =>
                                    {
                                        err ? resolve('err') : resultSel.length === 0 ? resolve ({totalCount : resultcount[0]['count(t.id)'], drivers : resultSel, module : moduleResult}) : resolve ({totalCount : resultcount[0]['count(t.id)'], drivers : resultSel, module : moduleResult});
                                    });
                                });
                            }                            
                        });
                    }
                    else
                    {
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
    * The function for fetching  driver details present in the database on the basis of driver id.
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
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getone". Which is designed to fetch  data of the drivers.');            
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
                con.query(checkRole, async (err, resultRole) =>
                {
                    if(err)
                    {
                        resolve('err') 
                    }
                    else
                    {
                        var uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                        var uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
                        if(uploadprofile_image === 'INVALIDFORMAT')
                        {
                            resolve('INVALIDATTACHMENTP')
                        }
                        else if(uploadprofile_image === 'NOATTACHEMENT')
                        {
                            resolve('NOATTACHP')
                        }
                        else if(uploadlicence_img === 'INVALIDFORMAT')
                        {
                            resolve('INVALIDATTACHMENTL')
                        }
                        else if(uploadlicence_img === 'NOATTACHEMENT')
                        {
                            resolve('NOATTACHL')
                        }
                        else
                        {                        
                            if(resultRole[0].role_id === constants.Roles.admin)
                            {
                                let insQuery = `INSERT INTO ${constants.tableName.drivers}(name, email, contact_no, emergency_contact_no, date_of_birth, profile_image, licence_no , licence_img , description, created_at) VALUES('${name}', '${email}', '${contact_no}', '${emergency_contact_no}', '${date_of_birth}', '${uploadprofile_image}', '${licence_no}', '${uploadlicence_img}', '${description}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                con.query(insQuery, (err, result) =>
                                {
                                    result.affectedRows > 0 ? resolve(result) : resolve('err')
                                });
                            }
                            else if(resultRole[0].role_id === constants.Roles.service_provider)
                            {
                                let insQuery = `INSERT INTO ${constants.tableName.drivers}(name, email, contact_no, emergency_contact_no, date_of_birth, profile_image, licence_no , licence_img , description, created_at) VALUES('${name}', '${email}', '${contact_no}', '${emergency_contact_no}', '${date_of_birth}', '${uploadprofile_image}', '${licence_no}', '${uploadlicence_img}', '${description}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                con.query(insQuery, async (err, result) =>
                                {
                                    if(result.affectedRows > 0)
                                    {
                                        let recentAddedDriverData = await commonfetching.dataOnCondition(constants.tableName.drivers, email, 'email');
                                        if(recentAddedDriverData.length > 0)
                                        {
                                            let assignDriverWhileAdd = await this.assignserviceprovider(recentAddedDriverData[0].id, Id)
                                            assignDriverWhileAdd === 'datainserted' ? resolve(result) : resolve('err') 
                                        }
                                        else
                                        {
                                            resolve('err');
                                        }
                                    }
                                    else
                                    {
                                        resolve('err');
                                    }
                                });                            
                            }
                            else
                            {
                                resolve('err');
                            }
                        }
                    }
                });                
            });            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "addcustomer". Which is designed to add  data of the drivewr.');            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is updating the status of a  driver on the basis of driver id in the params.
    */
    static async updatestatus(Id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.drivers, Id);
            return data.length === 0 ? [] : data             
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "updatestatus". Which is designed for changing the status of the driver.');            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is updating or adding the deleted_at of a  driver on the basis of driver id in the params.
    * This will be considered as the driver is deleted
    */
    static async removedriver(Id)
    {
        return await new Promise(async(resolve, reject)=>
        {
            try
            {
                const data = await commonoperation.removeUser(constants.tableName.drivers, Id);
                if(data.affectedRows === 0)
                {
                    resolve(data)
                }
                else
                {
                    let selQueryAssign = `  SELECT * 
                                            FROM ${constants.tableName.assign_drivers} ad 
                                            WHERE 
                                            ad.driver_id = ${Id} 
                                            AND ad.deleted_at IS NULL
                                        `
                    con.query(selQueryAssign, async (err, result2) =>
                    {
                        if(result2.length != 0) 
                        {
                            let upQuery = ` UPDATE ${constants.tableName.assign_drivers} ad
                                            SET ad.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                            WHERE ad.driver_id = ${Id}
                                            AND ad.deleted_at IS NULL`;
                            con.query(upQuery, async (err, result) =>
                            {
                                result.affectedRows > 0 ? resolve(data) : resolve(data)
                            });
                        }
                        else
                        {                            
                            resolve(data);
                        }
                    });
                }            
            }
            catch (error)
            {
                console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "removedriver". Which is designed to remove  driver.', error);            
            }
        });
    };    

    /**
    * The below model function is for the Admin side page. The function is updating or edititng the details of the present driver on the basis of driver id in the params.
    */
    static async editdriver(id, name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img)
    {
        try 
        {
            let uploadprofile_image, uploadlicence_img;
            if (profile_image !== null && profile_image !== undefined)
            {
                uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                if(uploadprofile_image === 'INVALIDFORMAT')
                {
                    resolve('INVALIDATTACHMENTP')
                }
                if(uploadprofile_image === 'NOATTACHEMENT')
                {
                    resolve('NOATTACHP')
                }
            }
        
            if (licence_img !== null && licence_img !== undefined)
            {
                uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
                if(uploadlicence_img === 'INVALIDFORMAT')
                {
                    resolve('INVALIDATTACHMENTL')
                }
                if(uploadlicence_img === 'NOATTACHEMENT')
                {
                    resolve('NOATTACHL')
                }  
            }

            let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}',`;
        
            if (uploadprofile_image)
            {
                upQuery += ` d.profile_image = '${uploadprofile_image}',`;
            }
        
            if (uploadlicence_img)
            {
                upQuery += ` d.licence_img = '${uploadlicence_img}',`;
            }
        
            upQuery += ` d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
        
            return await new Promise((resolve, reject) =>
            {
                con.query(upQuery, (err, result) =>
                {
                    result.affectedRows > 0 ? resolve(result) : resolve('err') 
                });
            });
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "editdriver". Which is designed to edit  data of the driver.');
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
                let serproviderId = await commonfetching.dataOnCondition(constants.tableName.service_providers, sId, 'id');
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
                        let selQuery = `SELECT * 
                                        FROM ${constants.tableName.assign_drivers} t 
                                        WHERE 
                                        t.service_provider_id = ${sId} 
                                        AND t.driver_id = ${dId} 
                                        AND t.deleted_at IS NULL`;
                        con.query(selQuery, (error, result) =>
                        {
                            if(error)
                            {
                                resolve('lastworkplaceerror')
                            }
                            else
                            {
                                if(result.length === 0)
                                {
                                    let insQuery = `INSERT INTO ${constants.tableName.assign_drivers}(service_provider_id, driver_id, created_at) VALUES(${sId}, ${dId}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    con.query(insQuery, (err, result2) =>
                                    {
                                        result2.affectedRows > 0 ? resolve('datainserted') : resolve('err') 
                                    });
                                }
                                else
                                {
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
                let selQuery = `    SELECT ad.id, sp.name, ad.created_at 
                                    FROM ${constants.tableName.assign_drivers} ad,
                                    ${constants.tableName.service_providers} sp
                                    WHERE ad.driver_id = ${id}
                                    AND ad.deleted_at IS NULL
                                    AND sp.id = ad.service_provider_id`;
                con.query(selQuery, (err, result) =>
                {
                    let existSelQuery = `   SELECT sp.*, sp.name
                                            FROM ${constants.tableName.service_providers} sp
                                            LEFT JOIN ${constants.tableName.assign_drivers} ad
                                            ON sp.id = ad.service_provider_id
                                            AND ad.driver_id = ${id}
                                            AND ad.deleted_at IS NULL
                                            WHERE ad.id IS NULL
                                            AND sp.deleted_at IS NULL
                                            AND sp.status <> '${constants.status.inactive}'
                                        `;
                    con.query(existSelQuery, (error, result1)=>
                    {
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
                            resolve(`err`);
                        }
                        else
                        {
                            responseObj.exist = objectConvertor.pastWorkHistroyResponse(result),
                            responseObj.notexist = objectConvertor.notWorkedPlace(result1);
                            resolve(responseObj);
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
     *  Is the unassign the driver to a  service provider
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
                    result.affectedRows > 0 ? resolve('unassigned') : result.affectedRows === 0 ? resolve('alreadyunassigned') : resolve('err')  
                });
            });      
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "unassignserviceprovider". Which is designed to unassigned  driver to their service provider.', error);            
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
                let upQuery = ` UPDATE ${constants.tableName.assign_drivers} t 
                                SET t.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                WHERE t.service_provider_id = ${sId} 
                                AND t.driver_id = '${dId}' 
                                AND t.deleted_at IS NULL `;
                con.query(upQuery, (err, result) =>
                {
                    result.affectedRows > 0 ? resolve('unassigned') : result.affectedRows === 0 ? resolve('alreadyunassigned') : resolve('err');
                });
            });      
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "unassignserviceproviderandboth". Which is designed to unassigned  driver to their service provider.', error);            
        }        
    };
};