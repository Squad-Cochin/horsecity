////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the vehicle controller file. The logic of the code is mainlly written in the models. The       //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constant = require('../../utils/constants'); // Constant elements are stored in this file
const vehicle = require('../../models/vehicles/vehicle.model'); // The model from where the logic is intantiate are written in vehicle model
const time = require('../../utils/helper/date'); // All the time related formating are written in this file.

/**
 * The below function is for add the new vehicle in the database. We need number of input from the end user to add or register the vehicle. 
 */
exports.addNew = async (req, res, next) =>
{  
    // The below line is for going to the model function to implement the code for adding or registering the new vehcile.
    const vehicles = await vehicle.addnew
    (
        req.body.service_provider_id, // Already registered service provider id
        req.body.vehicle_number, // Vehicle number of the new vehicle
        req.body.make, // Manufacturer of the vehicle
        req.body.model, // Model of the vehicle
        req.body.color, // Color of the vehicle
        req.body.length, // length of the vehicle
        req.body.breadth, // breadth of the vehicle
        req.body.height, // height of the vehicle
        req.body.no_of_horse, // Maximum number of the horses a vehicle carry
        req.body.air_conditioner, // breadth of the vehicle
        req.body.temperature_manageable, // breadth of the vehicle
        req.body.vehicle_registration_number, // breadth of the vehicle
        req.body.gcc_travel_allowed, // breadth of the vehicle
        req.body.insurance_cover, // breadth of the vehicle
        // Insurance policy taken date of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.insurance_date), 
        req.body.insurance_policy_no, // A unique insurance policy number
        req.body.insurance_policy_provider, // name of the provider from where the insurance cover is taken.
        // Insurance policy expiry date of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.insurance_expiry_date),
        // req.files.safety_certicate,
        req.files.safety_certicate, // Image of the safety certificate
        req.body.vehicle_type, // Type of the vehicle GCC, PRIVATE, SHARING
        // Date of regisration of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.vehicle_registration_date),
        // Date of expiration of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.vehicle_exipration_date)
    );

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(vehicles === 'err')
    {
        console.log('Error while inserting the vehicles data ');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constant.responseMessage.vehicleerror,
        });
    }
    // If input feild are in correct format and not present in the database, then this else block of code will be executed.
    else
    {
        console.log('Vehicles data inserted successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.vehiclesuccess,
        });
    }
}

/**
 * The below function is for getting all the vehicles details. Those vehicles who deleted at feild are having
 * 'NULL' only those details will be shown or fetched.
 */

exports.getAll = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for get all vehicles logic.
    const vehicles = await vehicle.getall(req.body.page, req.body.limit)
    // console.log(vehicles);

    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    if(vehicles === 'err')
    {
        // console.log(`Error while fetching all the vehicles ${vehicles}`);
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constant.responseMessage.universalError,
            data : vehicles
        });
    }
    // If there are no vehicles in the database. Then these lines of code will be executed
    else if(vehicles.length == 0)
    {
        console.log('No vehicles data present');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getAllErr,
            data : vehicles
        });

    }
    // Every things went well and vehicle data is available then this else block of code will executed.
    else
    {
        console.log('All vehicle data fetched successfully ');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
                {
                    totalCount : vehicles.length,
                    vehicles : vehicles
                }
        });

    }
}

/**
 * The below function is for updating the status of the vehicle.
 */
exports.updateStatus = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for updating the status of the existing vehicle.
    const vehicles = await vehicle.updatestatus(req.params.id);
    if(vehicles === 'nodata')
    {
        console.log('No vehicles data on this Id from controller');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getOneErr,
            data : []
        });
    }
    else if(vehicles === 'err')
    {
        console.log('Error');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constant.responseMessage.universalError,
            data : []
        });
    }
    else
    {
        console.log('Vehicle Status updated successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.statusChanged
        });
    }
}

exports.getOne = async (req, res, next) =>
{
    const vehicles = await vehicle.getone(req.params.id)
    // console.log('vehicles : ',vehicles);
    if(vehicles === 'nodata')
    {
        console.log('No vehicle data present');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getOneErr,
            data : []
        });
    }
    else if(vehicles === 'err')
    {
        console.log('Error');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constant.responseMessage.universalError,
            data : []
        });
    }
    else
    {
        console.log('Particular Vehicles data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : vehicles
        });
    }    
}
exports.updateData = async (req, res, next) =>
{
    const vehicles = await vehicle.updatedata
    (
        req.params.id,
        req.body.service_provider_id, // Already registered service provider id
        req.body.vehicle_number, // Vehicle number of the new vehicle
        req.body.make, // Manufacturer of the vehicle
        req.body.model, // Model of the vehicle
        req.body.color, // Color of the vehicle
        req.body.length, // length of the vehicle
        req.body.breadth, // breadth of the vehicle
        req.body.height, // height of the vehicle
        req.body.no_of_horse, // Maximum number of the horses a vehicle carry
        req.body.air_conditioner,
        req.body.temperature_manageable,
        req.body.vehicle_registration_number,
        req.body.gcc_travel_allowed,
        req.body.insurance_cover,
        time.changeDateToSQLFormat(req.body.insurance_date),
        req.body.insurance_policy_no,
        req.body.insurance_policy_provider,
        time.changeDateToSQLFormat(req.body.insurance_expiry_date),
        req.body.vehicle_type,
        time.changeDateToSQLFormat(req.body.vehicle_registration_date),
        time.changeDateToSQLFormat(req.body.vehicle_exipration_date),
        req.files && req.files.safety_certicate !== undefined ? req.files.safety_certicate : null
        // req.files.safety_certicate
    );

    if(vehicles === 'err')
    {
        console.log('Error while editing the vehicle data ');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constant.responseMessage.erroredit,
        });
    }
    else
    {
        console.log('Vehicle data edited successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : `Vehicle ${constant.responseMessage.edit}`,
        });
    }
}
exports.getAllImages = async (req, res, next) =>
{
    const vehicles = await vehicle.getallimages(req.params.id);
    if(vehicles === 'err')
    {
        console.log('Error');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constant.responseMessage.universalError,
            data : []
        });
    }
    else if(vehicles.length === 0)
    {
        console.log('No images are there for this vehicle now');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.vehicleImgerror,
            data : []
        });
    }
    else
    {
        console.log(`Images fetched successfuly for this particular image`);
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.vehicleImgSuccess,
            data : vehicles
        });
    }
}

/**
 * The below function is for removing the vehicle from the view page. The data will be in the database but it will never shown on the front-end
 */
exports.removeVehicle = async (req, res, next) =>
{
    const vehicles = await vehicle.removevehicle(req.params.id);
    // console.log(vehicles);
    if(vehicles.length === 0)
    {
        console.log('No vehicles data present and remove is not done');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.removeerror
        });
    }
    else
    {
        console.log('Vehicle is removed');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removesuccess
        });
    }
}
