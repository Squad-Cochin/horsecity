/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is vehicle model file. Where all the logic of the vehicle part is written.       //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants'); // Constant elements are stored in this file
const commonfetching = require('../../utils/helper/commonfetching'); // helper file function. This file consist of functions Which is written universally for fetching the data from the database
const commonoperation = require('../../utils/helper/commonoperation'); // helper file function. This file consist of functions Which is written universally for some common operations.
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const con = require('../../configs/db.configs') // Calling the db file for making the database connection

module.exports = class vehicles
{
    constructor(){}

    /**
    * The below model function is for the Admin side page. 
    * The function is adding or creating new vehicle.
    */
    static async addnew(Id, serviceProviderId, vehicle_number, make, model, color, length, breadth, height, price, max_no_of_horse, air_conditioner, temp_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date)
    { 
        try
        { 
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `   SELECT sp.id , r.id AS role_id, r.name 
                                    FROM ${constants.tableName.service_providers} sp, 
                                    ${constants.tableName.service_providers} r 
                                    WHERE sp.id = ${Id} 
                                    AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, resultRole) =>
                {
                    if(err)
                    {
                        resolve('err') 
                    }
                    else
                    {
                        let uploadSafetyCertificate = await commonoperation.fileUploadTwo(safety_certicate, constants.attachmentLocation.vehicle.upload.scertificate);
                        if(uploadSafetyCertificate === 'INVALIDFORMAT')
                        {
                            resolve('INVALIDATTACHMENT')
                        }
                        else if(uploadSafetyCertificate === 'NOATTACH')
                        {
                            resolve('NOATTACH')
                        }
                        else
                        {
                            if(resultRole[0].role_id === constants.Roles.admin)
                            {
                                let insQuery =  `INSERT INTO ${constants.tableName.vehicles}(service_provider_id, vehicle_number, make, model, color, length, breadth, height, price,no_of_horse, air_conditioner, temperature_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date, created_at) VALUES ('${serviceProviderId}', '${vehicle_number}', '${make}', '${model}', '${color}', '${length}', '${breadth}', '${height}', '${price}', '${max_no_of_horse}', '${air_conditioner}', '${temp_manageable}', '${registration_no}', '${gcc_travel_allowed}', '${insurance_cover}', '${insurance_date}', '${insurance_policy_no}', '${insurance_provider}', '${insurance_expiration_date}', '${uploadSafetyCertificate}', '${vehicle_type}', '${vehicle_registration_date}', '${vehicle_exipration_date}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`; 
                                con.query(insQuery, (err, result) =>
                                {
                                    if(result.affectedRows > 0) 
                                    {
                                        resolve(result);
                                    }
                                    else
                                    {
                                        resolve('err');
                                    }
                                });
                            }
                            else if(resultRole[0].role_id === constants.Roles.service_provider)
                            {
                                let insQuery =  `INSERT INTO ${constants.tableName.vehicles}(service_provider_id, vehicle_number, make, model, color, length, breadth, height, price, no_of_horse, air_conditioner, temperature_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date, created_at) VALUES ('${Id}', '${vehicle_number}', '${make}', '${model}', '${color}', '${length}', '${breadth}', '${height}', '${price}', '${max_no_of_horse}', '${air_conditioner}', '${temp_manageable}', '${registration_no}', '${gcc_travel_allowed}', '${insurance_cover}', '${insurance_date}', '${insurance_policy_no}', '${insurance_provider}', '${insurance_expiration_date}', '${uploadSafetyCertificate}', '${vehicle_type}', '${vehicle_registration_date}', '${vehicle_exipration_date}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`; 
                                con.query(insQuery, (err, result) =>
                                {
                                    if(result.affectedRows > 0) 
                                    {
                                        resolve(result);
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
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "addnew". Which is designed to add new vehicle.`);                        
        }
    };

    /**
    * The below model function is for the Admin side page. 
    * The function is for fetching the list of all the vehicles.
    */
    static async getall(pageNumber, pageSize, Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                var checkRole = `   SELECT sp.id , r.id AS role_id, r.name FROM 
                                    ${constants.tableName.service_providers} sp, 
                                    ${constants.tableName.roles} r
                                    WHERE sp.id = ${Id} 
                                    AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                       resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT v.id, sp.name AS service_provider, v.vehicle_number, v.make, v.no_of_horse, v.status FROM  ${constants.tableName.service_providers} sp, ${constants.tableName.vehicles} v WHERE sp.id = v.service_provider_id AND v.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                        const count = await commonoperation.totalCount(constants.tableName.vehicles)
                        con.query(selQuery, (err, result2) =>
                        {
                            if(err)
                            {
                                resolve(err);
                            }
                            else
                            {
                                let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                FROM ${constants.tableName.permissions} AS pm
                                JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.vehicles}'
                               `;
                                con.query(Query, (err, moduleResult) =>
                                {
                                    if(err)
                                    {
                                        resolve('err') 
                                    }
                                    else
                                    {
                                        resolve ({totalCount : count[0]['count(t.id)'], vehicles : result2, module : moduleResult});
                                    }
                                });
                            }
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT v.id, v.vehicle_number, v.make, v.no_of_horse, v.status FROM  ${constants.tableName.service_providers} sp, ${constants.tableName.vehicles} v WHERE sp.id = v.service_provider_id AND v.service_provider_id = ${Id} AND v.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                        const count = await commonoperation.totalCountParticularServiceProvider(constants.tableName.vehicles, Id)
                        con.query(selQuery, (err, result2) =>
                        {
                            if(err)
                            {
                                resolve(err);
                            }
                            else
                            {
                                let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                FROM ${constants.tableName.permissions} AS pm
                                JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                WHERE pm.role_id = '${result[0].role_id}' AND md.name = 'VEHICLES'
                               `;
                                con.query(Query, (err, moduleResult) =>
                                {
                                    if(err)
                                    {
                                        resolve('err') 
                                    }
                                    else
                                    {
                                        resolve ({totalCount : count[0]['count(t.id)'], vehicles : result2, module : moduleResult});
                                    }
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
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getall". Which is designed to fetch all the data of vehicles.`);            
        }
    };

    /**
    * The below model function is for the Admin side page.
    * The function is updating the status of a particular vehicle on the basis of vehicle id in the params.
    */
    static async updatestatus(id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const vehicleData = await commonfetching.dataOnCondition(constants.tableName.vehicles, id, 'id');
                if(vehicleData.length === 0)
                {
                    resolve('nodata');
                }
                else if(vehicleData.length === 'err')
                {
                    resolve('err');
                }
                else
                {
                    if(vehicleData[0].status === constants.status.active)
                    {
                        let UpdateQuery = `UPDATE ${constants.tableName.vehicles} v SET v.status ='${constants.status.inactive}', v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE v.id = '${id}' `;
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                resolve(result);
                            }
                            else
                            {
                                resolve('err');
                            }
                        }); 
                    }
                    else
                    {
                        let UpdateQuery = `UPDATE ${constants.tableName.vehicles} v SET v.status ='${constants.status.active}', v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE v.id = '${id}' `;
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                resolve(result);
                            }
                            else
                            {
                                resolve('err');
                            }
                        });
                    }
                }
            
            });            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "updatestatus". Which is designed to change the status of the vehicles.`);                        
        }
    };

    /**
    * The below model function is for the Admin side page. 
    * The function for fetching particular vehicle details present in the database on the basis of vehicle id.
    */
    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.vehicles, Id, 'id');
            let getserviceProviderName = await commonfetching.dataOnCondition(constants.tableName.service_providers,  data[0].service_provider_id, 'id')
            let returnObj =
                {
                    "id": data[0].id,
                    "service_provider_id": data[0].service_provider_id,
                    "service_provider" : getserviceProviderName[0].name,
                    "vehicle_number": data[0].vehicle_number,
                    "make": data[0].make,
                    "model": data[0].model,
                    "color": data[0].color,
                    "length": data[0].length,
                    "breadth": data[0].breadth,
                    "height": data[0].height,
                    "price" : data[0].price,
                    "no_of_horse": data[0].no_of_horse,
                    "air_conditioner": data[0].air_conditioner,
                    "temperature_manageable": data[0].temperature_manageable,
                    "registration_no": data[0].registration_no,
                    "gcc_travel_allowed": data[0].gcc_travel_allowed,
                    "insurance_cover": data[0].insurance_cover,
                    "insurance_date": time.formatDateToDDMMYYYY(data[0].insurance_date),
                    "insurance_policy_no": data[0].insurance_policy_no,
                    "insurance_provider": data[0].insurance_provider,
                    "insurance_expiration_date": time.formatDateToDDMMYYYY(data[0].insurance_expiration_date),
                    "safety_certicate": `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.scertificate}${data[0].safety_certicate}`,
                    "vehicle_type": data[0].vehicle_type,
                    "vehicle_registration_date": time.formatDateToDDMMYYYY(data[0].vehicle_registration_date),
                    "vehicle_exipration_date": time.formatDateToDDMMYYYY(data[0].vehicle_exipration_date),
                    "status": data[0].status,
                    "created_at": time.formatDateToDDMMYYYY(data[0].created_at),
                    "updated_at": time.formatDateToDDMMYYYY(data[0].updated_at),
                    "deleted_at": time.formatDateToDDMMYYYY(data[0].deleted_at)
                }
            if(data.length === 0)
            {                
                return ('nodata');
            }
            else if(data === 'err')
            {
                return ('err');
            }
            else
            {
                return returnObj;
            }     
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getone". Which is designed to fetch all the data of a particular vehicles.`, error);                        
        }
    };

    /**
    * The below model function is for the Admin side page. 
    * The function is updating or edititng the details of the present vehicle on the basis of vehicle id in the params.
    */
    static async updatedata(id, serviceProviderId, vehicle_number, make, model, color, length, breadth, height, price, max_no_of_horse, air_conditioner, temp_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, vehicle_type, vehicle_registration_date, vehicle_exipration_date, safety_certicate)
    {
        try
        {
            if(safety_certicate === null || safety_certicate === undefined)
            {
                let upQuery = `UPDATE ${constants.tableName.vehicles} v SET v.service_provider_id = '${serviceProviderId}', v.vehicle_number = '${vehicle_number}', v.make = '${make}', v.model = '${model}', v.color = '${color}', v.length = '${length}', v.breadth = '${breadth}', v.height = '${height}', v.price = '${price}', v.no_of_horse = '${max_no_of_horse}', v.air_conditioner = '${air_conditioner}', v.temperature_manageable ='${temp_manageable}', v.registration_no ='${registration_no}', v.gcc_travel_allowed = '${gcc_travel_allowed}', v.insurance_cover = '${insurance_cover}', v.insurance_date = '${insurance_date}', v.insurance_policy_no = '${insurance_policy_no}', v.insurance_provider = '${insurance_provider}', v.insurance_expiration_date = '${insurance_expiration_date}', v.vehicle_type = '${vehicle_type}', v.vehicle_registration_date = '${vehicle_registration_date}', v.vehicle_exipration_date = '${vehicle_exipration_date}', v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE id = '${id}' `;
                con.query(upQuery, (err, result) =>
                {
                    if(result.affectedRows > 0)
                    {
                        return result;
                    }
                    else
                    {
                        return('err')
                    }
                });
            }
            else
            {
                let uploadSafetyCertificate = await commonoperation.fileUploadTwo(safety_certicate, constants.attachmentLocation.vehicle.upload.scertificate);
                if(uploadSafetyCertificate === 'INVALIDFORMAT')
                {
                    resolve('INVALIDATTACHMENT')
                }
                else if(uploadSafetyCertificate === 'NOATTACH')
                {
                    resolve('NOATTACH')
                }
                else
                {
                    let upQuery = `UPDATE ${constants.tableName.vehicles} v SET v.service_provider_id = '${serviceProviderId}', v.vehicle_number = '${vehicle_number}', v.make = '${make}', v.model = '${model}', v.color = '${color}', v.length = '${length}', v.breadth = '${breadth}', v.height = '${height}', v.price = '${price}', v.no_of_horse = '${max_no_of_horse}', v.air_conditioner = '${air_conditioner}', v.temperature_manageable ='${temp_manageable}', v.registration_no ='${registration_no}', v.gcc_travel_allowed = '${gcc_travel_allowed}', v.insurance_cover = '${insurance_cover}', v.insurance_date = '${insurance_date}', v.insurance_policy_no = '${insurance_policy_no}', v.insurance_provider = '${insurance_provider}', v.insurance_expiration_date = '${insurance_expiration_date}', v.vehicle_type = '${vehicle_type}', v.vehicle_registration_date = '${vehicle_registration_date}', v.vehicle_exipration_date = '${vehicle_exipration_date}', v.safety_certicate ='${uploadSafetyCertificate}', v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE id = '${id}' `;
                    con.query(upQuery, (err, result) =>
                    {
                        if(result.affectedRows > 0)
                        {
                            return result;
                        }
                        else
                        {
                            return('err')
                        }
                    });
                }
            }
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getAll". Which is designed for updating or editing the vehicle data.`);                        
        }
    };

    /**
    * The below model function is for the Admin side page. 
    * This function is for fetching the list of all the images of a particular vehicles on the basis of the vehicle id.
    */
    static async getallimages(id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT vi.id, vi.title, vi.vehicle_id, vi.image, vi.uploaded_at, vi.status 
                                FROM ${constants.tableName.vehicles_images} vi 
                                JOIN ${constants.tableName.vehicles} v ON vi.vehicle_id = v.id 
                                WHERE vi.vehicle_id = ${id} 
                                AND vi.deleted_at IS NULL`;
                con.query(selQuery, (err, result) =>
                {
                    if (result.length !== 0)
                    {
                        // Create an array to store the return objects
                        let returnArray = [];                      
                        for (let i = 0; i < result.length; i++)
                        {
                            let returnObj =
                            {
                                id: result[i].id,
                                title : result[i].title,
                                url: `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${result[i].image}`,
                                uploaded_at: time.formatDateToDDMMYYYY(result[i].uploaded_at),
                                status: result[i].status,
                            };                      
                            // Add the current object to the returnArray
                            returnArray.push(returnObj);
                        }
                        // Resolve with the array of objects
                        resolve(returnArray);
                    }
                    else
                    {
                        // Resolve with an empty array to indicate no data found
                        resolve([]);
                    }
                });
            });            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getallimages". Which is designed to fetch all the images of a particular vehicles.`);
        }
    };

    /**
    * The below model function is for the Admin side page.
    * The function is updating or adding the deleted_at of a particular vehicles on the basis of vehicles id in the params.
    * This will be considered as the vehicles is deleted
    */
    static async removevehicle(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.vehicles, Id);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }    
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "removevehicle". Which is designed to delete or remove the data of a particular vehicles.`);                        
        }
    };

    /**
    * The below model function is for the Admin side page.
    * The function is for showing the particular vehicle on the front end of the customer [NEXTJS]
    */
    static async getvehicledetailforcustomerpage(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT
                                v.id,
                                v.service_provider_id,
                                s.name AS service_provider_name,
                                v.vehicle_number,
                                v.price,
                                v.no_of_horse,
                                v.length,
                                v.height,
                                v.breadth,
                                v.make,
                                v.model,
                                v.air_conditioner,
                                v.temperature_manageable,
                                v.gcc_travel_allowed,
                                v.insurance_cover,
                                v.vehicle_type,
                                v.vehicle_registration_date, 
                                v.vehicle_exipration_date,
                                v.insurance_date,
                                cr.abbreviation,
                                v.insurance_expiration_date,
                                v.insurance_provider,
                                vi.id AS vehicle_image_id,
                                vi.image,
                                vi.title,
                                r.id AS review_id,
                                r.vehicle_rating,
                                r.vehicle_description,
                                r.created_at
                                FROM ${constants.tableName.vehicles} v
                                INNER JOIN ${constants.tableName.service_providers} s 
                                ON v.service_provider_id = s.id
                                LEFT JOIN ${constants.tableName.currencies} cr 
                                ON cr.id = ( 
                                    SELECT currency_id 
                                    FROM ${constants.tableName.application_settings} 
                                    WHERE application_settings.currency_id = cr.id 
                                    )
                                LEFT JOIN ${constants.tableName.vehicles_images} vi 
                                ON v.id = vi.vehicle_id 
                                AND vi.status = "${constants.status.active}"
                                LEFT JOIN ${constants.tableName.reviews} r 
                                ON v.id = r.vehicle_id
                                WHERE v.id = ${Id} 
                                AND v.status = "${constants.status.active}"  `;
                con.query(selQuery, (err, result) =>
                {
                    if(err)
                    {
                        resolve('err');
                    }
                    else
                    {
                        var vehicleResponse =
                        {
                            "vehicle": [],
                            "images" : [],
                            "reviews": []
                        };
                        if(result.length != 0)
                        {
                            const uniqueReviewIds = new Set();
                            const uniqueImagesIds = new Set();
                            for (let row of result)
                            {
                                if (vehicleResponse.vehicle.length === 0)
                                {
                                    // If result has data, populate the vehicleResponse data
                                    vehicleResponse.vehicle.push
                                    ({
                                        "service_provider_id" : result[0].service_provider_id,
                                        "service_provider_name" : result[0].service_provider_name,
                                        "vehicle_number" : result[0].vehicle_number,
                                        "price" : result[0].price,
                                        "no_of_horses" : result[0].no_of_horse,
                                        "length" : result[0].length,
                                        "breadth" : result[0].breadth,
                                        "height" : result[0].height,
                                        "make" : result[0].make,
                                        "model" : result[0].model,
                                        "air_condition" : result[0].air_conditioner,
                                        "temperature_manageable" : result[0].temperature_manageable,
                                        "gcc_travel_allowed" : result[0].gcc_travel_allowed,
                                        "insurance_cover" : result[0].insurance_cover,
                                        "insurance_provider" : result[0].insurance_provider,
                                        "vehicle_type" : result[0].vehicle_type,
                                        "abbreviation" : result[0].abbreviation,
                                        "vehicle_registration_date" : time.formatDateToDDMMYYYY(result[0].vehicle_registration_date),
                                        "vehicle_expiration_date" : time.formatDateToDDMMYYYY(result[0].vehicle_exipration_date),
                                        "insurance_date" : time.formatDateToDDMMYYYY(result[0].insurance_date),
                                        "insurance_expiration_date" : time.formatDateToDDMMYYYY(result[0].insurance_expiration_date)
                                    });
                                }
                                if(row.vehicle_image_id !== null && !uniqueImagesIds.has(row.vehicle_image_id))
                                {
                                    vehicleResponse.images.push
                                    ({
                                        "id": row.vehicle_image_id,
                                        "url" : `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${row.image}`
                                    });
                                    uniqueImagesIds.add(row.vehicle_image_id);
                                }
                                if (row.review_id !== null && !uniqueReviewIds.has(row.review_id)) 
                                {
                                    vehicleResponse.reviews.push
                                    ({
                                        "id": row.review_id,
                                        "rating" : row.vehicle_rating,
                                        "description" : row.vehicle_description,
                                        "created_at" : time.formatDateToDDMMYYYY(row.created_at)
                                    });
                                    uniqueReviewIds.add(row.review_id);
                                }
                            }
                            resolve(vehicleResponse);
                        }
                    }
                });
            });
        }
        catch (error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getvehicledetailforcustomerpage". Which is designed to fetch the details of a particular vehicle for the details page in the customer side`);                        
        }
    };

};

