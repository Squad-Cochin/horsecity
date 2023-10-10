////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the customer controller file. The logic of the code is mainlly written in the models. The      //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constants = require('../../utils/constants'); // Constant elements are stored in this file
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
    if(customers === 'err')
    {
        // If there are no customer in the database. Then these lines of code will be executed
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
        });
    }
    else
    {
        // If there are customers in the database. Then these lines of code will be executed
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below function is for getting all the details of a  customers. Only single customer
 * details we get through the below function.
 * 
 * For get the details of a  customer. We need to give the customer Id in the params.
 * On the basis of that, All the details of a  customer will be fetched.
 * 
 */
exports.getOne= async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for getting all details of  customer.
    const customers = await customer.getone(req.params.id);
    // If any wrong id or some thing wrong entered, If that Id has no data then this if block of code will be executed
    if(customers === 'nodata')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.getOneErr,
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
            message : constants.responseMessage.universalError,
            data : []
        });
    }
    else
    {
        // Every things went well and customer data is available then this else block of code will executed.
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
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
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.errorInsert,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if (customers === 'INVALIDFORMAT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.invalididproofimageformat
        });
    }
    // If the id proof image is not uploaded then this else if block of code will be executed.
    else if(customers === 'NOATTACHEMENT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.idproofimagenotuploaded,
        });
    }
    else if(customers.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.restacc,
        });
    }
    // If input feild are in correct format and not already presnet in the database, then this else block of code will be executed.
    else
    {
        return res.status(200).send
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.insert,
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
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constants.responseMessage.universalError,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if(customers === 'INVALIDFORMAT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constants.responseMessage.invalididproofimageformat
        });
    }
    else if(customers === 'NOATTACHEMENT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.idproofimagenotuploaded
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
 * The below function is for updating the status of the customer.
 */

exports.updateStatus= async (req, res) =>
{
    // The below line is for going to the model function to implement the code for updating the status of the existing customer.
    const customers = await customer.updatestatus(req.params.id);
    if(customers.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.statuserror
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
};

/**
 * The below function is for removing the customer from the view page. The data will be in the datbase but it will never shown on the front end
 */
exports.removeCustomer = async (req, res) =>
{
    const customers = await customer.removecustomer(req.params.id);
    if(customers.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : true,
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
 * The below controller is for the login of the customer.
 * This function is for the nextjs
 */
exports.customerLogin = async (req, res) =>
{
    const customers = await customer.customerlogin(req.body.userName, req.body.password)
    if(customers === 'nocustomer')
    {
        return res.status(200).send
        ({
            status : false,
            code : 400,
            message : constants.responseMessage.usernameincorrect,
        });
    }
    // If any unspecified or unencountered error came. Which is not as per our code thinking, then this else if block
    else if(customers === 'err')
    {
        return res.status(200).send
        ({
            status : false,
            code : 500,
            message : constants.responseMessage.universalError,
        });
    }
    // If customer password is expired then this will be printed
    else if(customers.message === 'passwordexpired')
    {
     
        return res.status(200).send
        ({
            status : false,
            code : 404,
            message : constants.responseMessage.passwordexpired,
            data : customers.data
        });
    } 
    // If wrong password is entered then, this below response will be displayed
    else if(customers === 'passwordnotmatched')
    {
        return res.status(200).send
        ({
            status : false,
            code : 400,
            message : constants.responseMessage.passwordincorrect,
        });
    }
    else
    {
        return res.status(200).send
        ({
            status : true,
            code : 200,
            message : constants.responseMessage.logsuccess,
            data : customers
        });
    }
};

/**
 * The below controller is for the logout of the customer.
 * This function is for the nextjs
 */
exports.customerLogout = async (req, res) =>
{
    const customers = await customer.customerlogout(req.params.id);
    if(customers === 'logoutdone')
    {
        res.status(200).send
        ({
            status : true,
            code : 200,
            message : constants.responseMessage.logoutsuccess
        });
    }
    if(customers === 'notLogin')
    {
        res.status(200).send
        ({
            status : false,
            code : 400,
            message : constants.responseMessage.restacc
        });
    }
};

/**
 * The below controller is for the change password of the customer.
 * This function is for the nextjs
 */
exports.customerChangePassword = async (req, res, next) =>
{
    const customers = await customer.customerchangepassword(req.params.id, req.body.password, req.body.newpassword);
    // The below if block will execute. when the entered username is not correct
    if(customers === 'nocustomer')
    {
        return res.status(200).send
        ({
            status : false,
            code : 400,
            message : constants.responseMessage.validatorError46
        });
    }
    // The below if block will execute. when any unhandled error came
    else if(customers === 'err')
    {
        return res.status(200).send
        ({
            status : false,
            code : 500,
            message : constants.responseMessage.universalError,
        });
    }
    else if(customers === 'incorrectpassword')
    {
        return res.status(200).send
        ({
            status : false,
            code : 400,
            message : constants.responseMessage.passwordincorrect,
        });
    }
    else
    {
        return res.status(200).send
        ({
            status : true,
            code : 200,
            message : constants.responseMessage.passwordupdate,
        });
    }
};

/**
 * The below controller is for the signup or registration of the customer.
 * This function is for the nextjs
 */
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
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.errorInsert,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if (customers === 'INVALIDFORMAT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.invalididproofimageformat
        });
    }
    // If the id proof image is not uploaded then this else if block of code will be executed.
    else if(customers === 'NOATTACHEMENT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.idproofimagenotuploaded
        });
    }
    else (customers === 'registered')
    {
        return res.status(200).send
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.insert,
        });
    }    
};

/**
 * The below controller is for fetching the log (Login, Logout, and Duration) details of the customer.
 * This function is for the nextjs
 */
exports.getParticularCustomerLogs = async(req, res, next) =>
{
    const customers = await customer.getparticularcustomerlogs(req.params.id);    
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    else if(customers.length == 0)
    {
        // `No logs found for this customer.`,
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getNoData,
            data : customers
        });
    }
    else 
    {
        // `Logs found for this customer.`,
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching the details of the  customer for their individual dashboard.
 * This function is for the nextjs
 */
exports.getParticularCustomerDashboard = async (req, res, next) =>
{
    const customers = await customer.getparticularcustomerdashboard(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching the details of the  customer for their completed bookings.
 * This function is for the nextjs
 */
exports.getParticularBookinDetailsCompleted = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailscompleted(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching the details of the  customer for their active and confirm booking.
 * This function is for the nextjs
 */
exports.getParticularBookinDetailsConfirm = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailsconfirm(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message:  constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching the details of the  customer for their inactive or cancelled booking.
 */
exports.getParticularBookinDetailsCancelled = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailscancelled(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching the details of the  customer for their recent five bookings.
 * This function is for the nextjs. 
 * 
 * The data woill come from the enquiries table. * 
 */
exports.getParticularBookinDetailsRecent = async (req, res, next) =>
{
    const customers = await customer.getparticularbookindetailsrecent(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message : constants.responseMessage.universalError,
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};


 /**
 * The below controller is for fetching the details of all the bookings of a customer.
 * This function is for the nextjs
 */
exports.getParticularCustomerAllBookings = async (req, res, next) =>
{
    let customers = await customer.getparticularcustomerallbookings(req.params.id);    
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
}

/**
 * The below controller is for fetching all the enquiries of a  customer.
 * This will be in the descending order on the basis of the created at.
 */
exports.getParticularCustomerAllEnquiry = async (req, res, next)=>
{
    let customers = await customer.getparticularcustomerallenquiry(req.params.id);
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching all the booking details.
 * The data will come from the quotations, invoices, payment_records tables.
 * No data is taken from the bookings table.
 * 
 * The is for the frontend of the customer. Nextjs
 */
exports.getParticularCustomerAllBookingsDataFromInvoice = async (req, res, next) =>
{
    let customers = await customer.getparticularcustomerallbookingsdatafrominvoice(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }

};

/**
 * The below controller is for fetching all the ACTIVE bookings details of a  customer.
 * The data will come from the quotations, invoices, payment_records tables.
 * No data is taken from the bookings table.
 * 
 * The is for the frontend of the customer. [ Nextjs ]
 */
exports.getParticularCustomerActiveBookingsDataFromInvoice = async (req, res, next) =>
{
    let customers = await customer.getparticularcustomeractivebookingsdatafrominvoice(req.params.id)
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching all booking details. 
 * Whose status is invoice status is INACTIVE that means cancelled.
 * 
 * The data will come from the quotations, invoices, payment_records tables.
 * No data is taken from the bookings table.
 * 
 * The is for the frontend of the customer. [ Nextjs ]
 */
exports.getParticularCustomerInactiveBookingsDataFromInvoice = async (req, res, next) =>
{
    let customers = await customer.getparticularcustomerinactivebookingsdatafrominvoice(req.params.id)
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for fetching all booking details. 
 * Whose status from the invoice table is STARTED that means trip is started
 * and booking status in the booking table in CONFIRM 
 * 
 * The data will come from the quotations, invoices, payment_records tables.
 * No data is taken from the bookings table.
 * 
 * The is for the frontend of the customer. [ Nextjs ]
 */
exports.getParticularCustomerOngoingBookingsDataFromInvoice = async (req, res, next) =>
{
    let customers = await customer.getparticularcustomerongoingbookingsdatafrominvoice(req.params.id);   
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : customers
        });
    }
};

/**
 * The below controller is for editing the present customer details.
 * The function will be used when the data is inserted from the front end of customer
 * The is for the frontend of the customer. [ Nextjs ]
 */
exports.editCustomerDetailsFromCustomerSide = async (req, res, next) =>
{
    let customers = await customer.editcustomerdetailsfromcustomerside(
        req.params.id, // Customer id in the params. The customer which is set to be updated.
        req.body.name, // Name of the customer,
        req.body.userName, // username of the customer 
        req.body.email, // Email of the customer
        req.body.contact_no, // contact number of the customer
        // Date of birth of the customer. Since the format from the front end is coming 
        // in this way "Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)". So a function
        // is written to convert them into SQL DATETIME format. FORMAT is YYYY-MM-DD HH-MM-SS
        time.changeCustomerPageDateToSQLFormat(req.body.birthday), 
        req.body.id_proof_no, // Identity proof number of the customer
        req.files && req.files.id_proof_image !== undefined ? req.files.id_proof_image : null // Perform the null check here // Image of the identity proof
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(customers === 'err')
    {
        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constants.responseMessage.erroredit,
        });
    }
    // If the id proof image is in invalid format then this else if block of code will be executed.
    else if (customers === 'INVALIDFORMAT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.invalididproofimageformat
        });
    }
    // If the id proof image is not uploaded then this else if block of code will be executed.
    else if(customers === 'NOATTACHEMENT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.idproofimagenotuploaded,
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
 * The below controller is for view details of the customer.
 * The is for the frontend of the customer. [ Nextjs ]
 */
exports.getOneDetailsOnCustomerPage = async(req, res, next) =>
{
    let customers = await customer.getonedetailsoncustomerpage(req.params?.id);
    if(customers === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
            data : []
        });
    }
    else
    {
        // Every things went well and customer data is available then this else block of code will executed.
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : customers 
        });
    }
};