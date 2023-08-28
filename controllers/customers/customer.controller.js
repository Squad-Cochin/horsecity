////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the customer controller file. The logic of the code is mainlly written in the models. The      //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constant = require('../../utils/constants'); // Constant elements are stored in this file
const customer = require('../../models/customers/customer.model'); // The model from where the logic is intantiate are written in customer model
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.

/**
 * The below function is for getting all the customer details. Those customer who deleted at feild are having
 * 'NULL' only those details will be shown or fetched.
 */
exports.getAll = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for get all customer logic.
    const customers = await customer.getall(req.body.page, req.body.limit, req.params.id);
    // console.log("Customer :", customers);
    if(customers.length === 0)
    {
        // If there are no customer in the database. Then these lines of code will be executed
        console.log('No Customer data present');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : customers
        });
    }
    else
    {
        // If there are customers in the database. Then these lines of code will be executed
        console.log('Customer data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below function is for getting all the details of a particular customers. Only single customer
 * details we get through the below function.
 * 
 * For get the details of a particular customer. We need to give the customer Id in the params.
 * On the basis of that, All the details of a particular customer will be fetched.
 * 
 */
exports.getOne= async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for getting all details of particular customer.
    const customers = await customer.getone(req.params.id);
    // console.log('Customer One Data: ',customers);    
    // If any wrong id or some thing wrong entered, If that Id has no data then this if block of code will be executed
    if(customers === 'nodata')
    {
        console.log('No customer data present');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constant.responseMessage.getOneErr,
            data : []
        });
    }
    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    else if(customers === 'err')
    {
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
        // Every things went well and customer data is available then this else block of code will executed.
        console.log('Particular customer data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : customers 
        });
    }    
}

/**
 * The below function is for the adding or registring of new customer. We need number of input
 * from the end user to add or register the customer. 
 */
exports.addCustomer = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for adding or regitring the new customer.
    const customers = await customer.addcustomer
    (
        req.params.id,
        req.body.name, // Name of the customer
        req.body.email, // Email of the customer
        req.body.userName, // userName of the customer
        req.body.password, // Password of the customer
        req.body.contact_no, // Contact number of the customer
        // Date of birth of the customer. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.date_of_birth), 
        req.body.id_proof_no, // Identity proof number of the customer
        req.files.id_proof_image // Image of the identity proof
    );

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if (customers === 'err')
    {
        console.log('Error while inserting the customer data');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constant.responseMessage.errorInsert,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if (customers === 'INVALIDFORMAT')
    {
        console.log('Invalid Format of file submit for upload');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : "Invalid Format of file submit for upload",
        });
    }
    // If the id proof image is not uploaded then this else if block of code will be executed.
    else if(customers === 'NOATTACHEMENT')
    {
        console.log('No image uploaded for customer');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : "No image uploaded for customer",
        });
    }
    else if(customers.length === 0)
    {
        console.log('Service provider is not allowed to add customer');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : "Service provider is not allowed to add customer",
        });
    }
    // If input feild are in correct format and not already presnet in the database, then this else block of code will be executed.
    else
    {
        console.log('Customer data inserted successfully');
        return res.status(200).send
        ({
            code: 200,
            status: true,
            message: `Customer ${constant.responseMessage.insert}`,
        });
    }
};

/**
 * The below function is for the editing or changing of the existing customer. 
 * The most important thing is the customer id in the params.
 * We need number of input from the end user to editing or changing of the existing customer. 
 */

exports.editCustomer = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for editing or updating the existing customer.
    const customers = await customer.editcustomer
    (
        req.params.id, // Customer id in the params. The customer which is set to be updated.
        req.body.name, // Name of the customer,
        req.body.email, // Email of the customer
        req.body.userName, // username of the customer
        req.body.contact_no, // contact number of the customer
        // Date of birth of the customer. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.date_of_birth), 
        req.body.id_proof_no, // Identity proof number of the customer
        req.files && req.files.id_proof_image !== undefined ? req.files.id_proof_image : null // Perform the null check here // Image of the identity proof
    );
    
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while editing the customer data');
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constant.responseMessage.erroredit,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if(customers === 'INVALIDFORMAT')
    {
        console.log('Invalid Format of file submit for upload');
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : "Invalid Format of file submit for upload",
        });
    }
    // If input feild are in correct format and not already present in the database, then this else block of code will be executed.
    else
    {
        console.log('Customer data edited successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : ` Customer ${constant.responseMessage.edit} `,
        });
    }
};

/**
 * The below function is for updating the status of the customer.
 */

exports.updateStatus= async (req, res) =>
{
    // The below line is for going to the model function to implement the code for updating the status of the existing customer.
    const customers = await customer.updatestatus(req.params.id);
    // console.log(customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present and status is not updated');
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constant.responseMessage.statuserror
        });
    }
    else
    {
        console.log('Customer Status updated successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : `Customer ${constant.responseMessage.statusChanged}`
        });
    }
};

/**
 * The below function is for removing the customer from the view page. The data will be in the datbase but it will never shown on the front end
 */
exports.removeCustomer = async (req, res) =>
{
    const customers = await customer.removecustomer(req.params.id);
    // console.log(customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present and remove is not done');
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constant.responseMessage.removeerror
        });
    }
    else
    {
        console.log('Customer is removed');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : `Customer ${constant.responseMessage.removesuccess}`
        });
    }
}

exports.customerLogin = async (req, res) =>
{
    // const { user_name, email, contact_no, password } = req.body;
    // let fieldName = null;
    // let uniqueData = null;
    // if(user_name)
    // {
    //     fieldName = 'user_name';
    //     uniqueData = user_name;
    // }
    // else if(email)
    // {
    //     fieldName = 'email';
    //     uniqueData = email;
    // }
    // else if(contact_no)
    // {
    //     fieldName = 'contact_no';
    //     uniqueData = contact_no ;
    // }
    // else
    // {
    //     return res.status(200).send
    //     ({
    //         code : 400,
    //         success : false,
    //         message: "Invalid login credentials" 
    //     });
    // }
    const customers = await customer.customerlogin(req.body.userName, req.body.password)
    // console.log(`Customers: `, customers);
    if(customers === 'nocustomer')
    {
        console.log('Unavailable username or incorrect username. While customer login');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Username not found",
        });
    }
    // If any unspecified or unencountered error came. Which is not as per our code thinking, then this else if block
    else if(customers === 'err')
    {
        console.log('Unexpected error. While customer login');
        return res.status(200).send
        ({
            status : "failure",
            code : 500,
            message : "Internal server error while sign in",
        });
    }
    // If wrong password is entered then, this below response will be displayed
    else if(customers === 'passwordnotmatched')
    {
        console.log('Incorrect password. While customer login');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Password is incorrect",
        });
    }
    else
    {
        console.log(`Customer successfully login`);
        return res.status(200).send
        ({
            status : "success",
            code : 200,
            message : "Login successful",
            data : customers
        });
    }
};

exports.customerLogout = async (req, res) =>
{
    const customers = await customer.customerlogout(req.params.id);
    if(customers === 'logoutdone')
    {
        console.log('Customer logout successfully done');
        res.status(200).send
        ({
            status : "success",
            code : 200,
            message : "Customer logout done"
        });
    }
    // If any unspecified or unencountered error came. Which is not as per you code thinking, then this else if block
    if(customers ==='incorrectpassword')
    {
        console.log('Customer incorrect password');
        res.status(200).send
        ({
            status : "false",
            code : 400,
            message : "Customer incorrect password"
        });
    }
    if(customers === 'nocustomer')
    {
        console.log('Incorrect customer username');
        res.status(200).send
        ({
            status : "false",
            code : 400,
            message : "Incorrect customer username"
        });
    }
    if(customers === 'notLogin')
    {
        // console.log('Customer is not login. We cannot logout directly');
        res.status(200).send
        ({
            status : "false",
            code : 400,
            message : "Customer is not login. We cannot logout directly"
        });
    }
};

exports.customerChangePassword = async (req, res, next) =>
{
    const customers = await customer.customerchangepassword(req.body.userName, req.body.password, req.body.newpassword, req.body.confirmnewpassword);
    // The below if block will execute. when the entered username is not correct
    if(customers === 'nocustomer')
    {
        console.log('Unavailable username or incorrect username. While customer password update');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "This username must be incorect or no customer is registered with this username",
        });
    }
    // The below if block will execute. when any unhandled error came
    else if(customers === 'err')
    {
        console.log('Unexpected error. While customer password update');
        return res.status(200).send
        ({
            status : "failure",
            code : 500,
            message : "Internal server error while updating the password of the customer",
        });
    }
    else if(customers === 'incorrectpassword')
    {
        console.log('Incorrect password. While customer password update');
        return res.status(200).send
        ({
            status : "failure",
            code : 400,
            message : "Customer password is incorrect.",
        });
    }
    else
    {
        console.log('Password updated successfully. While customer password update');
        return res.status(200).send
        ({
            status : "success",
            code : 200,
            message : "Customer password updated successfully",
        });
    }
};

exports.signup = async (req, res, next) =>
{
    const customers = await customer.customersignup
    (
        req.body.name, // Name of the customer
        req.body.email, // Email of the customer
        req.body.userName, // userName of the customer
        req.body.password, // Password of the customer
        req.body.contact_no, // Contact number of the customer
        // Date of birth of the customer. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeDateToSQLFormat(req.body.date_of_birth), 
        // req.body.id_proof_no, // Identity proof number of the customer
        // req.files.id_proof_image // Image of the identity proof
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if (customers === 'err')
    {
        console.log('Error while inserting the customer data');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constant.responseMessage.errorInsert,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if (customers === 'INVALIDFORMAT')
    {
        console.log('Invalid Format of file submit for upload');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : "Invalid Format of file submit for upload",
        });
    }
    // If the id proof image is not uploaded then this else if block of code will be executed.
    else if(customers === 'NOATTACHEMENT')
    {
        console.log('No image uploaded for customer');
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : "No image uploaded for customer",
        });
    }
    else (customers === 'registered')
    {
        console.log('Customer registered successfully');
        return res.status(200).send
        ({
            code: 200,
            status: true,
            message: `Customer registered successfully`,
        });
    }    
};

exports.getParticularCustomerLogs = async(req, res, next) =>
{
    const customers = await customer.getparticularcustomerlogs(req.params.id);
    // console.log(`Get Particular Customer Logs: `, customers);
    
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Errro while fetching the data from the logs table');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching the data from the logs table of customers`,
        });
    }
    else if(customers.length == 0)
    {
        console.log(`No logs present for this particular customer`);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : `No logs present for this customer`,
            data : customers
        });
    }
    else 
    {
        console.log(`Logs present for this particular customer`);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : `Logs present for this particular customer`,
            data : customers
        });
    }
};

exports.getParticularCustomerDashboard = async (req, res, next) =>
{
    const customers = await customer.getparticularcustomerdashboard(req.params.id);
    // console.log(`Customer dashboard response: `, customers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while fetching the dashboard data for the customer');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching the dashboard data for the customer`,
        });
    }
    else
    {
        console.log(`Data fetched successfully for the customer dashboard`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Data fetched successfully for the customer dashboard`,
            data : customers
        });
    }
};

exports.getParticularBookinDetailsCompleted = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailscompleted(req.params.id);
    // console.log(`Customer dashboard response: `, customers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while fetching the completed booking dashboard data for the customer');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching the completed booking dashboard data for the customer`,
        });
    }
    else
    {
        console.log(`Data fetched successfully for the customer dashboard`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Data fetched successfully for the customer dashboard`,
            data : customers
        });
    }
};

exports.getParticularBookinDetailsConfirm = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailsconfirm(req.params.id);
    // console.log(`Customer dashboard response: `, customers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while fetching the confirm booking dashboard data for the customer');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching the confirm booking dashboard data for the customer`,
        });
    }
    else
    {
        console.log(`Data fetched successfully for the customer dashboard`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Data fetched successfully for the customer dashboard`,
            data : customers
        });
    }
};

exports.getParticularBookinDetailsCancelled = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailscancelled(req.params.id);
    // console.log(`Customer dashboard response: `, customers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while fetching the cancelled booking dashboard data for the customer');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching the cancelled booking dashboard data for the customer`,
        });
    }
    else
    {
        console.log(`Booking cancel data fetched successfully for the customer dashboard`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Booking cancel data fetched successfully for the customer dashboard`,
            data : customers
        });
    }
};

exports.getParticularBookinDetailsRecent = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailsrecent(req.params.id);
    // console.log(`Customer dashboard response: `, customers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while fetching the recent enquiry data for the customer dashboard');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching the recent enquiry data for the customer dashboard`,
        });
    }
    else
    {
        console.log(`Enquiry data fetched successfully for the particular customer dashboard`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Enquiry data fetched successfully for the particular customer dashboard`,
            data : customers
        });
    }
};

exports.getParticularCustomerAllBookings = async (req, res, next) =>
{
    let customers = await customer.getparticularcustomerallbookings(
        req.params.id,
        req.body.page = req.body.page !== undefined ? req.body.page : 1,
        req.body.limit = req.body.limit !== undefined ? req.body.limit : 10000000000
        
        );
    // console.log(`Customer dashboard response: `, customers);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        console.log('Error while fetching all the booking data for the customer dashboard');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error. While fetching all the booking data for the customer dashboard`,
        });
    }
    else
    {
        // console.log(`All the booking of a particular customer is fetched successfully`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `All the booking of a particular customer is fetched successfully for the dashboard`,
            data : customers
        });
    }
}

exports.getParticularCustomerAllEnquiry = async (req, res, next)=>
{
    let customers = await customer.getparticularcustomerallenquiry(req.params.id);
    if(customers === 'err')
    {
        console.log('Error while fetching particular customer enquiries data');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: `Internal server error while fetching particular customer enquiries data. `,
        });
    }
    else
    {
        // console.log(`All the booking of a particular customer is fetched successfully`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `All the enquiries of a particular customer is fetched successfully for the dashboard`,
            data : customers
        });
    }
};