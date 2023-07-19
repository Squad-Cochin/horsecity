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

// The below function is for Adding the vehicle

exports.addNew = async (req, res, next) =>
{  
    console.log('Came Here');
    const vehicles = await vehicle.addnew(req.body.serviceProviderId, req.body.vehicle_number, req.body.make, req.body.model, req.body.color, req.body.length, req.body.breadth, req.body.height, req.body.max_no_of_horse, req.body.air_conditioner, req.body.temp_manageable, req.body.registration_no, req.body.gcc_travel_allowed, req.body.insurance_cover, req.body.insurance_date, req.body.insurance_policy_no, req.body.insurance_provider, req.body.insurance_expiration_date, req.files.safety_certicate, req.body.vehicle_type, req.body.vehicle_registration_date, req.body.vehicle_exipration_date);
    console.log(vehicles);
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
    const vehicles = await vehicle.getall()
}

exports.updateStatus = async (req, res, next) =>
{
    const vehicles = await vehicle.updatestatus()
}

exports.getOne = async (req, res, next) =>
{
    const vehicles = await vehicle.getone()
}
exports.updateData = async (req, res, next) =>
{
    const vehicles = await vehicle.updatedata()
}
exports.getAllImages = async (req, res, next) =>
{
    const vehicles = await vehicle.getallimages()
}
exports.removeVehicle = async (req, res, next) =>
{
    const vehicles = await vehicle.removevehicle()
}
