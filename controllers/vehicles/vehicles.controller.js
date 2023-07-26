////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the vehicle controller file. The logic of the code is mainlly written in the models. The       //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constant = require('../../utils/constants');
const vehicle = require('../../models/vehicles/vehicle.model');
const time = require('../../utils/helper/date');

// The below function is for Adding the vehicle

exports.addNew = async (req, res, next) =>
{  
    const vehicles = await vehicle.addnew
    (
        req.body.service_provider_id,
        req.body.vehicle_number,
        req.body.make,
        req.body.model,
        req.body.color,
        req.body.length,
        req.body.breadth,
        req.body.height,
        req.body.no_of_horse,
        req.body.air_conditioner,
        req.body.temperature_manageable,
        req.body.vehicle_registration_number,
        req.body.gcc_travel_allowed,
        req.body.insurance_cover,
        time.changeDateToSQLFormat(req.body.insurance_date),
        req.body.insurance_policy_no,
        req.body.insurance_policy_provider,
        time.changeDateToSQLFormat(req.body.insurance_expiry_date),
        // req.files.safety_certicate,
        req.files.safety_certicate,
        req.body.vehicle_type,
        time.changeDateToSQLFormat(req.body.vehicle_registration_date),
        time.changeDateToSQLFormat(req.body.vehicle_exipration_date)
    );
    
    if(vehicles === 'err')
    {
        console.log('Error while inserting the vehicles data ');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.vehicleerror,
        });
    }
    else
    {
        console.log('Vehicles data inserted successfully');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.vehiclesuccess,
        });
    }
}

exports.getAll = async (req, res, next) =>
{
    const vehicles = await vehicle.getall(req.body.page, req.body.limit)
    // console.log(vehicles);
    if(vehicles === 'err')
    {
        // console.log(`Error while fetching all the vehicles ${vehicles}`);
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.universalError,
            data : vehicles
        });
    }
    else if(vehicles.length == 0)
    {
        console.log('No vehicles data present');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAllErr,
            data : vehicles
        });

    }
    else
    {
        console.log('All vehicle data fetched successfully ');
        return res.send
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
    const vehicles = await vehicle.updatestatus(req.params.id);
    if(vehicles === 'nodata')
    {
        console.log('No vehicles data on this Id from controller');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getOneErr,
            data : []
        });
    }
    else if(vehicles === 'err')
    {
        console.log('Error');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.universalError,
            data : []
        });
    }
    else
    {
        console.log('Vehicle Status updated successfully');
        return res.send
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
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getOneErr,
            data : []
        });
    }
    else if(vehicles === 'err')
    {
        console.log('Error');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.universalError,
            data : []
        });
    }
    else
    {
        console.log('Particular Vehicles data fetched successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : vehicles 
                // {
                //     totalCount : vehicles.length,
                //     vehicles : vehicles
                // }
        });
    }    
}
exports.updateData = async (req, res, next) =>
{
    const vehicles = await vehicle.updatedata
    (
        req.params.id,
        req.body.service_provider_id,
        req.body.vehicle_number,
        req.body.make,
        req.body.model,
        req.body.color,
        req.body.length,
        req.body.breadth,
        req.body.height,
        req.body.no_of_horse,
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
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.erroredit,
        });
    }
    else
    {
        console.log('Vehicle data edited successfully');
        res.send
        ({
            code : 200,
            status : true,
            message : ` Vehicle ${constant.responseMessage.edit}`,
        });
    }
}
exports.getAllImages = async (req, res, next) =>
{
    const vehicles = await vehicle.getallimages(req.params.id);
    if(vehicles === 'err')
    {
        console.log('Error');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.universalError,
            data : []
        });
    }
    else if(vehicles.length === 0)
    {
        console.log('No images are there for this vehicle now');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.vehicleImgerror,
            data : []
        });
    }
    else
    {
        console.log(`Images fetched successfuly for this particular image`);
        return res.send
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
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removeerror
        });
    }
    else
    {
        console.log('Vehicle is removed');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removesuccess
        });
    }
}
