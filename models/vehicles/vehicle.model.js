/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is vehicle model file. Where all the logic of the vehicle part is written.       //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

var con = require('../../configs/db.configs') // Calling the db file for making the database connection
var time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
var constants = require('../../utils/constants'); // Constant elements are stored in this file
var commonfetching = require('../../utils/helper/commonfetching'); // helper file function. This file consist of functions Which is written universally for fetching the data from the database
var commonoperation = require('../../utils/helper/commonoperation'); // helper file function. This file consist of functions Which is written universally for some common operations.
var objectConvertor = require(`../../utils/objectConvertor`);

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
                let resultRole = await commonfetching.getRoleDetails(Id)
                if(resultRole === `err` || resultRole.length == 0)
                {
                    resolve('err');
                }
                else
                {
                    let uploadSafetyCertificate = await commonoperation.fileUploadTwo(safety_certicate, constants.attachmentLocation.vehicle.upload.scertificate);
                    if(uploadSafetyCertificate === 'INVALIDFORMAT')
                    {
                        resolve('INVALIDATTACHMENT')
                    }
                    else if(uploadSafetyCertificate === 'NOATTACHEMENT')
                    {
                        resolve('NOATTACHEMENT')
                    }
                    else
                    {
                        if(resultRole[0]?.role_id === constants?.Roles?.admin)
                        {
                            let insQuery =  `INSERT INTO ${constants.tableName.vehicles}(service_provider_id, vehicle_number, make, model, color, length, breadth, height, price,no_of_horse, air_conditioner, temperature_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date, created_at) VALUES ('${serviceProviderId}', '${vehicle_number}', '${make}', '${model}', '${color}', '${length}', '${breadth}', '${height}', '${price}', '${max_no_of_horse}', '${air_conditioner}', '${temp_manageable}', '${registration_no}', '${gcc_travel_allowed}', '${insurance_cover}', '${insurance_date}', '${insurance_policy_no}', '${insurance_provider}', '${insurance_expiration_date}', '${uploadSafetyCertificate}', '${vehicle_type}', '${vehicle_registration_date}', '${vehicle_exipration_date}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`; 
                            let result = await commonoperation.queryAsync(insQuery);
                            result?.affectedRows > 0 ? resolve(result) : resolve('err')  
                        }
                        else if(resultRole[0].role_id === constants.Roles.service_provider)
                        {
                            let insQuery =  `INSERT INTO ${constants.tableName.vehicles}(service_provider_id, vehicle_number, make, model, color, length, breadth, height, price, no_of_horse, air_conditioner, temperature_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date, created_at) VALUES ('${Id}', '${vehicle_number}', '${make}', '${model}', '${color}', '${length}', '${breadth}', '${height}', '${price}', '${max_no_of_horse}', '${air_conditioner}', '${temp_manageable}', '${registration_no}', '${gcc_travel_allowed}', '${insurance_cover}', '${insurance_date}', '${insurance_policy_no}', '${insurance_provider}', '${insurance_expiration_date}', '${uploadSafetyCertificate}', '${vehicle_type}', '${vehicle_registration_date}', '${vehicle_exipration_date}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`; 
                            let result = await commonoperation.queryAsync(insQuery);
                            result?.affectedRows > 0 ? resolve(result) : resolve('err');
                        }
                        else
                        {
                            resolve('err');
                        }
                    }              
                }
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
                    if(result[0].role_id === constants.Roles.admin)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `
                                            SELECT v.id,
                                            sp.name AS service_provider,
                                            v.vehicle_number,
                                            v.make,
                                            v.no_of_horse,
                                            v.status FROM  ${constants.tableName.service_providers} sp,
                                            ${constants.tableName.vehicles} v 
                                            WHERE 
                                                sp.id = v.service_provider_id 
                                                AND v.deleted_at IS NULL 
                                            LIMIT ${pageSize} 
                                            OFFSET ${offset}`;
                        const count = await commonoperation.totalCount(constants.tableName.vehicles)
                        con.query(selQuery, (err, result2) =>
                        {
                            if(err)
                            {
                                resolve(err);
                            }
                            else
                            {
                                let Query = `   
                                                SELECT 
                                                    md.name AS module_name,
                                                    md.id AS module_id,
                                                    pm.create,
                                                    pm.update,
                                                    pm.read,
                                                    pm.delete
                                                FROM ${constants.tableName.permissions} AS pm
                                                JOIN ${constants.tableName.modules} md 
                                                    ON pm.module_id  = md.id
                                                JOIN ${constants.tableName.roles} rl 
                                                    ON pm.role_id = rl.id
                                                WHERE pm.role_id = '${result[0].role_id}' 
                                                AND md.id = '${constants.modules.vehicles}'
                                            `;
                                con.query(Query, (err, moduleResult) =>
                                {
                                    err ? resolve('err') : resolve ({ totalCount : count[0]['count(t.id)'], vehicles : result2, module : moduleResult }); 
                                });
                            }
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `   
                                            SELECT v.id,
                                            v.vehicle_number,
                                            v.make,
                                            v.no_of_horse,
                                            v.status 
                                            FROM  ${constants.tableName.service_providers} sp,
                                            ${constants.tableName.vehicles} v 
                                            WHERE 
                                                sp.id = v.service_provider_id 
                                                AND v.service_provider_id = ${Id} 
                                                AND v.deleted_at IS NULL 
                                            LIMIT ${pageSize} 
                                            OFFSET ${offset}`;
                        const count = await commonoperation.totalCountParticularServiceProvider(constants.tableName.vehicles, Id)
                        con.query(selQuery, (err, result2) =>
                        {
                            if(err)
                            {
                                resolve(err);
                            }
                            else
                            {
                                let Query = `   
                                            SELECT 
                                                md.name AS module_name,
                                                md.id AS module_id,
                                                pm.create,
                                                pm.update,
                                                pm.read,
                                                pm.delete
                                            FROM ${constants.tableName.permissions} AS pm
                                            JOIN ${constants.tableName.modules} md 
                                            ON pm.module_id  = md.id
                                            JOIN ${constants.tableName.roles} rl 
                                            ON pm.role_id = rl.id
                                            WHERE 
                                                pm.role_id = '${result[0].role_id}' 
                                                AND md.name = 'VEHICLES'
                               `;
                                con.query(Query, (err, moduleResult) =>
                                {
                                    err ? resolve('err') : resolve ({ totalCount : count[0]['count(t.id)'], vehicles : result2, module : moduleResult }); 
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
    * The function is updating the status of a  vehicle on the basis of vehicle id in the params.
    */
    static async updatestatus(id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.vehicles, id);
            return data.length === 0 ? [] : data;                         
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "updatestatus". Which is designed to change the status of the vehicles.`);                        
        }
    };

    /**
    * The below model function is for the Admin side page. 
    * The function for fetching  vehicle details present in the database on the basis of vehicle id.
    */
    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.vehicles, Id, 'id');
            let getserviceProviderName = await commonfetching.dataOnCondition(constants.tableName.service_providers,  data[0].service_provider_id, 'id')
            let returnObj = objectConvertor.vehicleGetOneResponseObject(data, getserviceProviderName[0].name)
            return data === 'err' ? 'err' : returnObj;           
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getone". Which is designed to fetch all the data of a  vehicles.`, error);                        
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
                let upQuery = ` UPDATE ${constants.tableName.vehicles} v 
                                SET v.service_provider_id = '${serviceProviderId}', 
                                v.vehicle_number = '${vehicle_number}', 
                                v.make = '${make}', 
                                v.model = '${model}', 
                                v.color = '${color}', 
                                v.length = '${length}', 
                                v.breadth = '${breadth}', 
                                v.height = '${height}', 
                                v.price = '${price}', 
                                v.no_of_horse = '${max_no_of_horse}', 
                                v.air_conditioner = '${air_conditioner}', 
                                v.temperature_manageable ='${temp_manageable}', 
                                v.registration_no ='${registration_no}', 
                                v.gcc_travel_allowed = '${gcc_travel_allowed}', 
                                v.insurance_cover = '${insurance_cover}', 
                                v.insurance_date = '${insurance_date}', 
                                v.insurance_policy_no = '${insurance_policy_no}', 
                                v.insurance_provider = '${insurance_provider}',
                                v.insurance_expiration_date = '${insurance_expiration_date}', 
                                v.vehicle_type = '${vehicle_type}', 
                                v.vehicle_registration_date = '${vehicle_registration_date}', 
                                v.vehicle_exipration_date = '${vehicle_exipration_date}', 
                                v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                WHERE id = '${id}' `;
                con.query(upQuery, (err, result) =>
                {
                    return result.affectedRows > 0 ? result : 'err';
                });
            }
            else
            {
                let uploadSafetyCertificate = await commonoperation.fileUploadTwo(safety_certicate, constants.attachmentLocation.vehicle.upload.scertificate);
                if(uploadSafetyCertificate === 'INVALIDFORMAT')
                {
                    resolve('INVALIDATTACHMENT')
                }
                else if(uploadSafetyCertificate === 'NOATTACHEMENT')
                {
                    resolve('NOATTACHEMENT')
                }
                else
                {
                    let upQuery = ` 
                                    UPDATE ${constants.tableName.vehicles} v 
                                    SET v.service_provider_id = '${serviceProviderId}', 
                                    v.vehicle_number = '${vehicle_number}', 
                                    v.make = '${make}', 
                                    v.model = '${model}', 
                                    v.color = '${color}', 
                                    v.length = '${length}', 
                                    v.breadth = '${breadth}', 
                                    v.height = '${height}', 
                                    v.price = '${price}', 
                                    v.no_of_horse = '${max_no_of_horse}', 
                                    v.air_conditioner = '${air_conditioner}', 
                                    v.temperature_manageable ='${temp_manageable}', 
                                    v.registration_no ='${registration_no}', 
                                    v.gcc_travel_allowed = '${gcc_travel_allowed}', 
                                    v.insurance_cover = '${insurance_cover}', 
                                    v.insurance_date = '${insurance_date}', 
                                    v.insurance_policy_no = '${insurance_policy_no}', 
                                    v.insurance_provider = '${insurance_provider}', 
                                    v.insurance_expiration_date = '${insurance_expiration_date}', 
                                    v.vehicle_type = '${vehicle_type}', 
                                    v.vehicle_registration_date = '${vehicle_registration_date}', 
                                    v.vehicle_exipration_date = '${vehicle_exipration_date}', 
                                    v.safety_certicate ='${uploadSafetyCertificate}', 
                                    v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                    WHERE id = '${id}' `;
                    con.query(upQuery, (err, result) =>
                    {
                        return result.affectedRows > 0 ? result : 'err';
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
    * This function is for fetching the list of all the images of a  vehicles on the basis of the vehicle id.
    */
    static async getallimages(id, pageNumber, pageSize)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const offset = (pageNumber - 1) * pageSize;
                let selQuery = `SELECT 
                                vi.id,
                                vi.title, 
                                vi.vehicle_id,
                                vi.image,
                                vi.uploaded_at,
                                vi.status 
                                FROM ${constants.tableName.vehicles_images} vi 
                                JOIN ${constants.tableName.vehicles} v 
                                ON vi.vehicle_id = v.id 
                                WHERE vi.vehicle_id = ${id} 
                                AND vi.deleted_at IS NULL
                                LIMIT ${pageSize} 
                                OFFSET ${offset}`;
                con.query(selQuery, async(err, result) =>
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
                        let secondQuery = ` SELECT count(t.id) 
                                            FROM ${constants.tableName.vehicles_images} t 
                                            WHERE t.deleted_at IS NULL
                                            AND t.vehicle_id = ${id}`
                        let countresult = await commonoperation.queryAsync(secondQuery);
                        resolve({totalCount: countresult[0]['count(t.id)'], images: returnArray});
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
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getallimages". Which is designed to fetch all the images of a  vehicles.`);
        }
    };

    /**
    * The below model function is for the Admin side page.
    * The function is updating or adding the deleted_at of a  vehicles on the basis of vehicles id in the params.
    * This will be considered as the vehicles is deleted
    */
    static async removevehicle(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.vehicles, Id);
            return data.length === 0 ? data : data;            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "removevehicle". Which is designed to delete or remove the data of a  vehicles.`);                        
        }
    };

    /**
    * The below model function is for the Customer side page.
    * The function is for showing the vehicle detail on the front end of the customer [NEXTJS]
    */
    static async getvehicledetailforcustomerpage(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = 
                `
                    SELECT
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
                        vi.title
                    FROM
                        ${constants.tableName.vehicles} v
                    INNER JOIN
                        ${constants.tableName.service_providers} s 
                        ON v.service_provider_id = s.id
                    LEFT JOIN
                        ${constants.tableName.currencies} cr ON cr.id = (
                            SELECT currency_id
                            FROM ${constants.tableName.application_settings}
                            WHERE application_settings.currency_id = cr.id
                        )
                    LEFT JOIN
                        ${constants.tableName.vehicles_images} vi 
                        ON v.id = vi.vehicle_id 
                        AND vi.status = '${constants.status.active}'
                    LEFT JOIN
                        ${constants.tableName.bookings} b 
                        ON v.id = b.vehicle_id
                    LEFT JOIN
                        ${constants.tableName.customers} c 
                        ON c.id = b.customer_id
                    WHERE
                        v.id = ${Id}
                `
                let result = await commonoperation.queryAsync(selQuery)
                {
                    if(result === 'err')
                    {
                        resolve('err');
                    }
                    else
                    {
                        let data = await commonoperation.reviewscounts(Id);
                        let selQuery3 = `   SELECT 
                                            r.id AS review_id ,
                                            c.name AS customer_name,
                                            r.created_at,
                                            r.review
                                            FROM ${constants.tableName.customers} c
                                            LEFT JOIN ${constants.tableName.bookings} b ON b.customer_id = c.id
                                            LEFT JOIN ${constants.tableName.vehicles} v ON v.id = b.vehicle_id
                                            LEFT JOIN ${constants.tableName.reviews} r ON r.booking_id = b.id
                                            WHERE v.id = ${Id}
                                            AND r.status = '${constants.status.active}'
                                            AND r.review IS NOT NULL
                                            ORDER BY r.created_at DESC
                                            LIMIT 3`
                        let reviews_List = await commonoperation.queryAsync(selQuery3);
                        if(reviews_List?.length !== 0)
                        {
                            let vehicleResponse = objectConvertor.customizeResponseObjectForVehicleDetailInCustomerSide(result, data, reviews_List)
                            resolve(vehicleResponse);
                        }   
                        else
                        {
                            let vehicleResponse = objectConvertor.customizeResponseObjectForVehicleDetailInCustomerSide(result, data, 0)
                            resolve(vehicleResponse);
                        }                        
                    }
                }
            });
        }
        catch (error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getvehicledetailforcustomerpage". Which is designed to fetch the details of a  vehicle for the details page in the customer side`);                        
        }
    };
};



