////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the driver controller file. The logic of the code is mainlly written in the models. The        //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
const constants = require('../../utils/constants'); // Constant elements are stored in this file
const driver = require('../../models/drivers/driver.model');  // The model from where the logic is intantiate are written in driver model
const time = require('../../utils/helper/date'); // All the time related formating are written in this file.

/**
 * The below function is for getting all the drivers details. Those drivers who deleted at feild are having
 * 'NULL' only those data will be shown or fetched.
 */
exports.getAll = async (req, res) =>
{
    // The below line is for going to the model function to implement the code for get all drivers logic.
    const drivers = await driver.getall(req.body.page, req.body.limit, req.params.id);
    if(drivers === 'err')
    {
        // If there are no drivers in the database. Then these lines of code will be executed
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    else
    {
        // If there are drivers in the database. Then these lines of code will be executed
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : drivers
        });
    }    
}

/**
 * The below function is for getting all the details of a  driver. Only single driver
 * details we get through the below function.
 * 
 * For get the details of a  driver. We need to give the driver Id in the params.
 * On the basis of that, All the details of a  driver will be fetched.
 * 
 */

exports.getOne= async (req, res) =>
{
    // The below line is for going to the model function to implement the code for getting all details of  driver.
    const drivers = await driver.getone(req.params.id);
    
    // If any wrong id or some thing wrong entered, If that Id has no data then this if block of code will be executed
    if(drivers.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.getAll,
            data : []
        });
    }
    else
    {
        // Everythings went well and driver data is available then this else block of code will executed.
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : drivers
        });
    }
}

/**
 * The below function is for the adding or registering of new driver. We need number of input
 * from the end user to add or register the driver. 
 */

exports.addDriver = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for adding or registering the new driver.
    const drivers = await driver.adddriver
    (
        req.params.id,
        req.body.name, // Name of the driver, 
        req.body.email, // Email fo the driver, 
        req.body.contact_no, // Contact number of the driver, 
        req.body.emergency_contact_no, // Emergency number of the driver, 
        time.changeDateToSQLFormat(req.body.date_of_birth), // Date of birth of the driver
        req.body.licence_no, // Licence number of the driver 
        req.body.description, // Description of the driver 
        req.files.profile_image, // profile image of the driver 
        req.files.licence_img // Licence image of the driver 
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if (drivers === 'err')
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.errorInsert,
        });
    }
    else if(drivers === 'INVALIDATTACHMENTP')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverprofileimageinvalid
        });
    }
    else if(drivers === 'NOATTACHP')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverprofileimagenotpresent,
        });
    }
    else if(drivers === 'INVALIDATTACHMENTL')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverlicenceimageinvalid
        });
    }
    else if(drivers === 'NOATTACHL')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverlicenseimagenotpresent,
        });
    }
    // If input feild are in correct format and not already presnet in the database, then this else block of code will be executed.
    else
    {
        return res.status(200).send
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.insert
        });
    }
};

/**
 * The below function is for updating the status of the driver.
 */

exports.updateStatus= async (req, res) =>
{
    const drivers = await driver.updatestatus(req.params.id);
    if(drivers.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.getAll
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.statusChanged
        });
    }
}

/**
 * The below function is for removing the driver from the view page. The data will be in the database but it will never shown on the front-end
 */
exports.removeDriver = async (req, res) =>
{
    const drivers = await driver.removedriver(req.params.id);
    if(drivers.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.removeerror
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.removesuccess
        });
    }
}

/**
 * The below function is for the editing or changing of the existing DRIVER. 
 * The most important thing is the driver id in the params.
 * We need number of input from the end user to editing or changing of the existing driver. 
 */
exports.editDriver = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for editing or updating the existing driver.
    const drivers = await driver.editdriver
    (
        req.params.id, // Driver id in the params. The driver which is set to be updated.
        req.body.name, // Name of the driver,
        req.body.email, // Email fo the driver,
        req.body.contact_no, // Contact number of the driver,
        req.body.emergency_contact_no, // Emergency number of the driver,
        time.changeDateToSQLFormat(req.body.date_of_birth), // Date of birth of the driver
        req.body.licence_no, // Licence number of the driver
        req.body.description, // Description of the driver
        req.files && req.files.profile_image !== undefined ? req.files.profile_image : null, // profile image of the driver
        req.files && req.files.licence_img !== undefined ? req.files.licence_img : null // Licence image of the driver
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(drivers === 'err')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.erroredit,
        });
    }
    else if(drivers === 'INVALIDATTACHMENTP')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverprofileimageinvalid
        });
    }
    else if(drivers === 'NOATTACHP')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverprofileimagenotpresent,
        });
    }
    else if(drivers === 'INVALIDATTACHMENTL')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverlicenceimageinvalid
        });
    }
    else if(drivers === 'NOATTACHL')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.driverlicenseimagenotpresent,
        });
    }
    // If input feild are in correct format and not already present in the database, then this else block of code will be executed.
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.edit,
        });
    }
};

/**
 * The below function is for assigning the driver to a service provider. We have a seperate junction table called assign_drivers.
 * where we will store the service provider is and driver id. 
 */
exports.AssignServiceProvider = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for assigning a driver to a service provider.
    const drivers = await driver.assignserviceprovider
    (
        req.body.driver_id, // Driver id in the request body
        req.body.serviceProvider_id // Service Provider id in the request body
    );

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(drivers === 'err')
    {
        res.status(200).send
        ({
            code : 500,
            success : false,
            message : constants.responseMessage.universalError
        });
    }
    // If the entered driver id in the request body is not available in the database then this else if block of code will be executed.
    else if(drivers === 'noDriver')
    {
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : constants.responseMessage.backend3
        });
    }
    // If the entered service provider id in the request body is not available in the database then this else if block of code will be executed.
    else if(drivers === 'noServiceProvider')
    {
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : constants.responseMessage.backend1
        });
    }
    // When we want the details of driver where they worked last and any error came at that time then this else if block of code will be executed.
    else if(drivers === 'lastworkplaceerror')
    {
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : constants.responseMessage.backend5
        });
    }
    // If the submitted driver id is already associated with some service provider id and not left the job, then this else if block of code will be executed.
    else if(drivers === 'notallowed')
    {
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : constants.responseMessage.backend2
        });
    }
    // If every thing went well and no issue came then,  this else if block of code will be executed.
    else if(drivers === 'datainserted')
    {
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : constants.responseMessage.driverassigned
        });
    }
};

/**
 * The below function is for the checking whether the driver is working under any service provider
 */
exports.getWorkPastServiceProvider = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for get the service provider details. If a driver is registered under any driver.
    // We need to give driver id in the params to look this otherwise it will not work
    const drivers = await driver.getworkpastserviceprovider(req.params.id);
    if(drivers.exist.length == 0)
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.backend6,
            data : drivers
        });
    }
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    else if(drivers === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    // If every thing went well and no issue came then,  this else if block of code will be executed.
    else
    {
        //`Driver's history.`
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : drivers
        });
    }
};

/**
 * The below function is for unassigning or remove a driver from the service provider they are registered
 */
exports.UnAssignServiceProvider = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for unassigning the driver from a service provider.
    // We need to give assign_drivers table id in the params to remove this otherwise it will not work
    const drivers = await driver.unassignserviceprovider(req.params.id);

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(drivers === 'err')
    {
        // "Unable to proceed because the driver is not currently assigned to a service provider."
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    // If driver is successfully unassigned to the respective service provider then this if block of code will be executed.
    // We need to give assign_drivers table id in the params to remove this otherwise it will not work
    if(drivers === 'unassigned')
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.driverunassigned
        });
    }
    // If driver is already unassigned to the respective service provider then this if block of code will be executed.
    // We need to give assign_drivers table id in the params to remove this otherwise it will not work
    if(drivers === 'alreadyunassigned')
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.backend7
        });
    }
};

exports.UnAssignServiceProviderAndDriverBoth = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for unassigning the driver from a service provider.
    // We need to give assign_drivers table id in the params to remove this otherwise it will not work
    const drivers = await driver.unassignserviceproviderandboth
    (
        req.body.driver_id, // Driver id in the request body
        req.body.serviceProvider_id // Service Provider id in the request body
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(drivers === 'err')
    {
        // "Unable to unassign driver from service provider."
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    // If driver is successfully unassigned to the respective service provider then this if block of code will be executed.
    // We need to give assign_drivers table id in the params to remove this otherwise it will not work
    if(drivers === 'unassigned')
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.driverunassigned
        });
    }
    // If driver is already unassigned to the respective service provider then this if block of code will be executed.
    // We need to give assign_drivers table id in the params to remove this otherwise it will not work
    if(drivers === 'alreadyunassigned')
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.backend8
        });
    }

    if(drivers === 'noDriver')
    {
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : constants.responseMessage.backend3
        });
    }
    // If the entered service provider id in the request body is not available in the database then this else if block of code will be executed.
    if(drivers === 'noServiceProvider')
    {
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : constants.responseMessage.backend1
        });
    }
};