/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is vehicle model file. Where all the logic of the vehicle part is written.       //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs')

module.exports = class vehicles
{
    constructor(){}

    static async addnew(serviceProviderId, vehicle_number, make, model, color, length, breadth, height, max_no_of_horse, air_conditioner, temp_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date)
    { 
        try
        { 
            return await new Promise(async(resolve, reject)=>
            {
                let uploadSafetyCertificate = await commonoperation.fileUploadTwo(safety_certicate, constants.attachmentLocation.vehicle.upload.scertificate);
                // console.log(uploadSafetyCertificate);
                let insQuery =  `INSERT INTO ${constants.tableName.vehicles}(service_provider_id, vehicle_number, make, model, color, length, breadth, height, no_of_horse, air_conditioner, temperature_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date, created_at) VALUES ('${serviceProviderId}', '${vehicle_number}', '${make}', '${model}', '${color}', '${length}', '${breadth}', '${height}', '${max_no_of_horse}', '${air_conditioner}', '${temp_manageable}', '${registration_no}', '${gcc_travel_allowed}', '${insurance_cover}', '${insurance_date}', '${insurance_policy_no}', '${insurance_provider}', '${insurance_expiration_date}', '${uploadSafetyCertificate}', '${vehicle_type}', '${vehicle_registration_date}', '${vehicle_exipration_date}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`; 
                // console.log(insQuery);
                con.query(insQuery, (err, result) =>
                {
                    // console.log(result);
                    if(result.affectedRows > 0) 
                    {
                        console.log('Vehicles data added successfully');
                        resolve(result);
                    }
                    else
                    {
                        console.log(err);
                        resolve('err');
                    }
                });
            });        
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "addnew". Which is designed to add new vehicle.`);                        
        }
    };

    static async getall(pageNumber, pageSize)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const offset = (pageNumber - 1) * pageSize;

                let selQuery = `SELECT v.id, sp.name AS service_provider, v.vehicle_number, v.make, v.no_of_horse, v.status FROM  ${constants.tableName.service_providers} sp, ${constants.tableName.vehicles} v WHERE sp.id = v.service_provider_id AND v.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                // console.log(selQuery);
                const count = await commonoperation.totalCount(constants.tableName.vehicles)
                // console.log('Total Data', count[0]['count(t.id)']);
                con.query(selQuery, (err, result) =>
                {
                    // console.log(result);
                    if(err)
                    {
                        
                        resolve(err);
                    }
                    else
                    {
                        resolve ({totalCount : count[0]['count(t.id)'], vehicles : result});
                        // resolve(result)
                    }
                });
            });
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getall". Which is designed to fetch all the data of vehicles.`);            
        }
    };


    static async updatestatus(id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const vehicleData = await commonfetching.dataOnCondition(constants.tableName.vehicles, id, 'id');
                // console.log(vehicleData);
                if(vehicleData.length === 0)
                {
                    console.log('No data present on this Id');
                    resolve('nodata');
                }
                else if(vehicleData.length === 'err')
                {
                    console.log(`Error while fethcing the vehicle data on the basis if Id. Model folder`);
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
                                console.log('Status Changed to INACTIVE');
                                resolve(result);
                            }
                            else
                            {
                                console.log(err);
                                resolve('err');
                            }
                        }); 
                    }
                    else
                    {
                        let UpdateQuery = `UPDATE ${constants.tableName.vehicles} v SET v.status ='${constants.status.active}', v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE v.id = '${id}' `;
                        // console.log(UpdateQuery);
                        con.query(UpdateQuery, (err, result) => // executing the above query 
                        {
                            if(result.length != 0) // if ticket updated then if block
                            {
                                console.log('Status Changed to ACTIVE');
                                resolve(result);
                            }
                            else
                            {
                                console.log(err);
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

    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.vehicles, Id, 'id');
            // console.log('Data', data);

            let getserviceProviderName = await commonfetching.dataOnCondition(constants.tableName.service_providers,  data[0].service_provider_id, 'id')

            // console.log('Provider Name', getserviceProviderName[0].name);
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
                    "no_of_horse": data[0].no_of_horse,
                    "air_conditioner": data[0].air_conditioner,
                    "temperature_manageable": data[0].temp_manageable,
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
                console.log('No data present on this Id');
                return ('nodata');
            }
            else if(data === 'err')
            {
                console.log(`Error while fethcing the vehicle data on the basis if Id. Model folder`);
                return ('err');
            }
            else
            {
                // return ({serproviderName : getserviceProviderName[0].name, vehicles : data});
                return returnObj;
            }     
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getone". Which is designed to fetch all the data of a particular vehicles.`, error);                        
        }
    };

    static async updatedata(id, serviceProviderId, vehicle_number, make, model, color, length, breadth, height, max_no_of_horse, air_conditioner, temp_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, vehicle_type, vehicle_registration_date, vehicle_exipration_date, safety_certicate)
    {
        try
        {
            let uploadSafetyCertificate = await commonoperation.fileUploadTwo(safety_certicate, constants.attachmentLocation.vehicle.upload.scertificate);
            // console.log(uploadSafetyCertificate);
            let upQuery = `UPDATE ${constants.tableName.vehicles} v SET v.service_provider_id = '${serviceProviderId}', v.vehicle_number = '${vehicle_number}', v.make = '${make}', v.model = '${model}', v.color = '${color}', v.length = '${length}', v.breadth = '${breadth}', v.height = '${height}', v.no_of_horse = '${max_no_of_horse}', v.air_conditioner = '${air_conditioner}', v.temperature_manageable ='${temp_manageable}', v.registration_no ='${registration_no}', v.gcc_travel_allowed = '${gcc_travel_allowed}', v.insurance_cover = '${insurance_cover}', v.insurance_date = '${insurance_date}', v.insurance_policy_no = '${insurance_policy_no}', v.insurance_provider = '${insurance_provider}', v.insurance_expiration_date = '${insurance_expiration_date}', v.vehicle_type = '${vehicle_type}', v.vehicle_registration_date = '${vehicle_registration_date}', v.vehicle_exipration_date = '${vehicle_exipration_date}', v.safety_certicate ='${uploadSafetyCertificate}', v.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE id = '${id}' `;
            // console.log(upQuery);
            con.query(upQuery, (err, result) =>
            {
                // console.log(result);
                if(result.affectedRows > 0)
                {
                    console.log('Vehicle data updated successfully');
                    return result;
                }
                else
                {
                    return('err')
                }
            });
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getAll". Which is designed for updating or editing the vehicle data.`);                        
        }
    };

    static async getallimages(id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT vi.id, vi.image, vi.title, vi.uploaded_at, vi.status FROM ${constants.tableName.vehicles_images} vi, ${constants.tableName.vehicles} v WHERE vi.vehicle_id = ${id} AND vi.deleted_at IS NULL`;
                // console.log(selQuery);
                con.query(selQuery, (err, result) =>
                {
                    if(result)
                    {
                        resolve(result);                       
                    }
                    else
                    {
                        console.log(err);
                        resolve('err');
                    }
                });
            });            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getallimages". Which is designed to fetch all the images of a particular vehicles.`);
        }
    };

    static async removevehicle(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.vehicles, Id);
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
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "removevehicle". Which is designed to delete or remove the data of a particular vehicles.`);                        
        }
    };
};