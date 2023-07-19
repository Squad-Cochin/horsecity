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
                let insQuery =  `INSERT INTO ${constants.tableName.vehicles}(service_provider_id, vehicle_number, make, model, color, length, breadth, height, max_no_of_horse, air_conditioner, temp_manageable, registration_no, gcc_travel_allowed, insurance_cover, insurance_date, insurance_policy_no, insurance_provider, insurance_expiration_date, safety_certicate, vehicle_type, vehicle_registration_date, vehicle_exipration_date, created_at) VALUES ('${serviceProviderId}', '${vehicle_number}', '${make}', '${model}', '${color}', '${length}', '${breadth}', '${height}', '${max_no_of_horse}', '${air_conditioner}', '${temp_manageable}', '${registration_no}', '${gcc_travel_allowed}', '${insurance_cover}', '${insurance_date}', '${insurance_policy_no}', '${insurance_provider}', '${insurance_expiration_date}', '${safety_certicate}', '${vehicle_type}', '${vehicle_registration_date}', '${vehicle_exipration_date}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`; 
                console.log(insQuery);
                con.query(insQuery, (err, result) =>
                {
                    console.log(result);
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

    static async getall()
    {
        try
        {
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getall". Which is designed to fetch all the data of vehicles.`);            
        }
    };


    static async updatestatus()
    {
        try
        {
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "updatestatus". Which is designed to change the status of the vehicles.`);                        
        }
    };

    static async getone()
    {
        try
        {
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getone". Which is designed to fetch all the data of a particular vehicles.`);                        
        }
    };

    static async updatedata()
    {
        try
        {
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getAll". Which is designed for updating or editing the vehicle data.`);                        
        }
    };

    static async getallimages()
    {
        try
        {
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "getallimages". Which is designed to fetch all the images of a particular vehicles.`);
        }
    };

    static async removevehicle()
    {
        try
        {
            
        }
        catch(error)
        {
            return console.log(`Error from the vehicle.model.js file from the models > vehicles folder. In the static function "removevehicle". Which is designed to delete or remove the data of a particular vehicles.`);                        
        }
    };


};