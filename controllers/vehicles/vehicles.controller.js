////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the vehicle controller file. The logic of the code is mainlly written in the models. The       //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const vehicle = require('../../models/vehicles/vehicle.model'); // The model from where the logic is intantiate are written in vehicle model
const time = require('../../utils/helper/date'); // All the time related formating are written in this file.
const defaults = require(`../../utils/default`); // Default elements are stored in this file


/**
 * The below function is for add the new vehicle in the database. We need number of input from the end user to add or register the vehicle. 
 */
exports.addNew = async (req, res, next) =>
{  
    // The below line is for going to the model function to implement the code for adding or registering the new vehcile.
    const vehicles = await vehicle.addnew
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
        req.body.price, // Min price of the vehicle
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
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    else if(vehicles === 'INVALIDATTACHMENT')
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.vehiclescertificateimageInvalid, 0, res);
    }
    else if(vehicles === 'NOATTACHEMENT')
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.vehiclescertificateimagenotpresent, 0, res);
    }
    // If input feild are in correct format and not present in the database, then this else block of code will be executed.
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.insert, 0, res);
    }
}

/**
 * The below function is for getting all the vehicles details. Those vehicles who deleted at feild are having
 * 'NULL' only those details will be shown or fetched.
 */
exports.getAll = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for get all vehicles logic.
    const vehicles = await vehicle.getall(req.body.page, req.body.limit, req.params.id)
    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    if(vehicles === 'err')
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    // If there are no vehicles in the database. Then these lines of code will be executed
    else if(vehicles.length == 0)
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.getAllErr, 0, res);
    }
    // Every things went well and vehicle data is available then this else block of code will executed.
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, {totalCount : vehicles.length, vehicles : vehicles}, res);
    }
}

/**
 * The below function is for updating the status of the vehicle.
 */
exports.updateStatus = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for updating the status of the existing vehicle.
    const vehicles = await vehicle.updatestatus(req.params.id);
    if(vehicles)
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.statusChanged, 0, res);
    }
}

/**
 * The below function is for getting all the details of a particular vehicle. Only single vehicle
 * details we get through the below function.
 * 
 * For get the details of a particular vehicle. We need to give the vehicle Id in the params.
 * On the basis of that, All the details of a particular vehicle will be fetched.
 * 
 */
exports.getOne = async (req, res, next) =>
{
    const vehicles = await vehicle.getone(req.params.id)
    if(vehicles === 'nodata')
    {
        /**
         * The below line is for going to the model function to implement the code for getting all details of particular vehicle.
         * If any wrong id or some thing wrong entered, If that Id has no data then this if block of code will be executed.
         * Because we need vehicle id in the params for working of this route.
         */
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.getOneErr, 0, res);
    }
    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    else if(vehicles === 'err')
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    else
    {
        // Every things went well and vehicle data is available then this else block of code will executed.
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, vehicles, res);
    }    
};

/**
 * The below function is for the editing or changing of the existing vehicle. 
 * The most important thing is the vehicle id in the params.
 * We need number of input from the end user to editing or changing of the existing vehicle. 
 */
exports.updateData = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for editing or updating the existing vehicle.
    const vehicles = await vehicle.updatedata
    (
        req.params.id, // vehicle is in the params, Whose data we need to update
        req.body.service_provider_id, // Already registered service provider id
        req.body.vehicle_number, // Vehicle number of the new vehicle
        req.body.make, // Manufacturer of the vehicle
        req.body.model, // Model of the vehicle
        req.body.color, // Color of the vehicle
        req.body.length, // length of the vehicle
        req.body.breadth, // breadth of the vehicle
        req.body.height, // height of the vehicle
        req.body.price, // Min price of the vehicle
        req.body.no_of_horse, // Maximum number of the horses a vehicle carry
        req.body.air_conditioner, // Value of the vehicle whether it consist of air conditioner or not
        req.body.temperature_manageable, // Value of the vehicle whether it consist of temperature manageable device or not
        req.body.vehicle_registration_number, // Vehicle registration number
        req.body.gcc_travel_allowed, // Value of the vehicle whether it can travel in the GCC country or not
        req.body.insurance_cover, // Value of the vehicle whether it has the insurance cover or not
        // Insurance date of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.insurance_date),
        req.body.insurance_policy_no, // Insurance policy number of the vehicle
        req.body.insurance_policy_provider, // Provider of the vehicle
        // Insurance expiryation date of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.insurance_expiry_date),
        req.body.vehicle_type, // Type of the vehicle
        // Vehicle registration date of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.vehicle_registration_date), 
        // Vehicle expiration date of the vehicle. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.vehicle_exipration_date),
        req.files && req.files.safety_certicate !== undefined ? req.files.safety_certicate : null  // Perform the null check here // Image of dafety certificate
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(vehicles === 'err')
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.erroredit, 0, res);
    }
    else if(vehicles === 'INVALIDATTACHMENT')
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.vehiclescertificateimageInvalid, 0, res);
    }
    else if(vehicles === 'NOATTACHEMENT')
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.vehiclescertificateimagenotpresent, 0, res);
    }
    // If input feild are in correct format and not already present in the database, then this else block of code will be executed
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.edit, 0, res);
    }
};

/**
 * The below function is for getting all the vehicle images details of a particular vehicle. Those vehicle images whose deleted at feild are having
 * 'NULL' only those details will be shown or fetched.
 */
exports.getAllImages = async (req, res, next) =>
{
    // We need to add the vehicle id in the params
    // The below line is for going to the model function to implement the code for get all vehcile image logic.
    const vehicles = await vehicle.getallimages(req.params.id, req.body.page, req.body.limit);
    
    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    if(vehicles === 'err')
    {
        
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    // No images are there for the vehicle whose id submitted in the params, then this else if block will be executed
    else if(vehicles.length === 0)
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.getNoData, 0, res);
    }
    // Every things went well and vehcile image data of a particular vehcle is available then this else block of code will executed.
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, vehicles, res);
    }
}

/**
 * The below function is for removing the vehicle from the view page. The data will be in the database but it will never shown on the front-end
 */
exports.removeVehicle = async (req, res, next) =>
{
    // We need to add the vehicle id in the params
    // The below line is for going to the model function to implement the code for removing vehicle logic.
    const vehicles = await vehicle.removevehicle(req.params.id);
    // The id present in the params, But incorrect id then this if block of code will be executed
    if(vehicles.length === 0)
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.removeerror, 0, res);
    }
    // If vehicle remove is done successfully
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.removesuccess, 0, res);
    }
};

/**
 * The below function is for getting the particular vehicle details on the customer side 
 */
exports.getVehicleDetailForCustomerPage = async (req, res, next) =>
{
    // We need to add the vehicle id in the params
    // The below line is for going to the model function to implement the code for removing vehicle logic.
    const vehicles = await vehicle.getvehicledetailforcustomerpage(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(vehicles === 'err')
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    // If the vehicle data is not present, then this else if block of code will be executed. It will never come into play. But for safety purpose it is written because we are already checking the param id in the middleware 
    else if(vehicles.length === 0)
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.getNoData, 0, res);
    }
    else
    {
        // Everythings went well and driver data is available then this else block of code will executed.
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, vehicles, res);
    }
};

