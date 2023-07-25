////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the driver controller file. The logic of the code is mainlly written in the models. The        //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
const constant = require('../../utils/constants'); // Constant elements are stored in this file
const driver = require('../../models/drivers/driver.model');  // The model from where the logic is intantiate are written in driver model
const time = require('../../utils/helper/date'); // All the time related formating are written in this file.

/**
 * The below function is for getting all the drivers details. Those drivers who deleted at feild are having
 * 'NULL' only those data will be shown or fetched.
 */
exports.getAll = async (req, res) =>
{
    // The below line is for going to the model function to implement the code for get all drivers logic.
    const drivers = await driver.getall(req.body.page, req.body.limit);
    // console.log(drivers);
    if(drivers.length == 0)
    {
        // If there are no drivers in the database. Then these lines of code will be executed
        console.log('No driver data present');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getAll,
            data : drivers
        });
    }
    else
    {
        // If there are drivers in the database. Then these lines of code will be executed
        console.log('Driver data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : drivers
        });
    }    
}


/**
 * The below function is for getting all the details of a particular driver. Only single driver
 * details we get through the below function.
 * 
 * For get the details of a particular driver. We need to give the driver Id in the params.
 * On the basis of that, All the details of a particular driver will be fetched.
 * 
 */

exports.getOne= async (req, res) =>
{
    // The below line is for going to the model function to implement the code for getting all details of particular driver.
    const drivers = await driver.getone(req.params.id);
    // console.log(drivers);
    
    // If any wrong id or some thing wrong entered, If that Id has no data then this if block of code will be executed
    if(drivers.length === 0)
    {
        console.log('No driver data present');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getOne,
            data : []
        });
    }
    else
    {
        // Everythings went well and driver data is available then this else block of code will executed.
        console.log('Drivers data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getOne,
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

    // console.log(drivers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if (drivers === 'err')
    {
        console.log('Error while inserting the driver data ');
        return res.status(200).json
        ({
            code: 400,
            status: true,
            message: constant.responseMessage.errorInsert,
        });
    }
    // If input feild are in correct format and not already presnet in the database, then this else block of code will be executed.
    else
    {
        console.log('Driver data inserted successfully');
        return res.status(200).send
        ({
            code: 200,
            status: true,
            message: ` Driver ${constant.responseMessage.insert}`,
        });
    }
};

/**
 * The below function is for updating the status of the driver.
 */

exports.updateStatus= async (req, res) =>
{
    const drivers = await driver.updatestatus(req.params.id);
    // console.log(drivers);
    if(drivers.length === 0)
    {
        console.log('No Driver data present and status is not updated');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getAll
        });
    }
    else
    {
        console.log('Driver Status updated successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.statusChanged
        });
    }
}

/**
 * The below function is for removing the driver from the view page. The data will be in the database but it will never shown on the front-end
 */
exports.removeDriver = async (req, res) =>
{
    const drivers = await driver.removedriver(req.params.id);
    // console.log(drivers);
    if(drivers.length === 0)
    {
        console.log('No driver data present and remove is not done');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.removeerror
        });
    }
    else
    {
        console.log('Drivers is removed');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removesuccess
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
        req.files.profile_image, // profile image of the driver
        req.files.licence_img // Licence image of the driver
    );

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(drivers === 'err')
    {
        console.log('Error while editing the driver data ');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.erroredit,
        });
    }

    // If input feild are in correct format and not already present in the database, then this else block of code will be executed.
    else
    {
        console.log('Drivers data edited successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : `Driver ${constant.responseMessage.edit}`,
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
        req.body.driver_id,
        req.body.serviceProvider_id
    );

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(drivers === 'err')
    {
        console.log('Error while assigning service provider to a driver');
        res.status(200).send
        ({
            code : 500,
            success : false,
            message : 'Internal server error while driver is assigned to a service provider'
        });
    }
    // If the entered driver id in the request body is not available in the database then this else if block of code will be executed.
    else if(drivers === 'noDriver')
    {
        console.log('Error while assigning service provider to a driver. Because the driver id. Which is submitted is not available');
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : 'Error while assigning service provider to a driver. Because the driver id. Which is submitted is not available'
        });
    }
    // If the entered service provider id in the request body is not available in the database then this else if block of code will be executed.
    else if(drivers === 'noServiceProvider')
    {
        console.log('Error while assigning service provider to a driver. Because the service provider id. Which is submitted is not available');
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : 'Error while assigning service provider to a driver. Because the service provider id. Which is submitted is not available'
        });
    }
    // When we want the details of driver where they worked last and any error came at that time then this else if block of code will be executed.
    else if(drivers === 'lastworkplaceerror')
    {
        console.log('Internal server error. While fetching the information of driver. Whether the driver left the last work place');
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : 'Error fetching the information of driver. Whether the driver left the last work place'
        });
    }
    // If the submitted driver id is already associated with some service provider id and not left the job, then this else if block of code will be executed.
    else if(drivers === 'notallowed')
    {
        console.log('Internal server error. The driver is already working under a service provider. We cannot allow them to work here.');
        res.status(200).send
        ({
            code : 400,
            success : false,
            message : 'Error the driver is already working under a service provider. We cannot allow them to work here as per now.'
        });
    }
    // If every thing went well and no issue came then,  this else if block of code will be executed.
    else if(drivers === 'datainserted')
    {
        console.log(`Driver is assigned to a service provider`);
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : 'Driver is assigned to a service provider'
        });
    }
};

exports.getWorkPastServiceProvider = async (req, res, next) =>
{
    const drivers = await driver.getworkpastserviceprovider(req.params.id);
    // console.log('Checking whether the data comming to controller: ', drivers);
    if(drivers.exist.length == 0)
    {
        console.log('This driver has no past histroy working with server provider that are registered with us');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : `This driver has no past histroy working with server provider that are registered with us`,
            data : drivers
        });
    }
    else if(drivers === 'err')
    {
        console.log('Internal server error. While fetching the driver past service provider details');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : `Internal server error. While fetching the driver past service provider details`
        });
    }
    else
    {
        console.log('Drivers past service provider details fetched');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : 'Drivers past service provider details fetched',
            data : drivers
        });
    }
};


exports.UnAssignServiceProvider = async (req, res, next) =>
{
    const drivers = await driver.unassignserviceprovider(req.params.id);
    // console.log(drivers);
    if(drivers === 'err')
    {
        console.log('Error while driver is unassigned to their particular service provider');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : "Error while driver is unassigned to their particular service provider"
        });
    }
    if(drivers === 'unassigned')
    {
        console.log('Driver is unassigned to their particular service provider');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : "Driver is unassigned to their particular service provider"
        });
    }
    if(drivers === 'alreadyunassigned')
    {
        console.log('Driver is already unassigned to their particular service provider');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : "Driver is already unassigned to their particular service provider"
        });
    }
};