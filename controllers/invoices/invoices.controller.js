////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the invoice controller file. The logic of the code is mainlly written in the models. The        //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constants = require('../../utils/constants'); // Constant elements are stored in this file
const invoice = require('../../models/invoices/invoice.model');  // The model from where the logic is intantiate are written in invoice model
/**
 * The below function is for getting all the invoices details. Those invoices who deleted at feild are having
 * 'NULL' only those details will be shown or fetched.
 */
exports.getAll = async (req, res) =>
{
    // The below line is for going to the model function to implement the code for get all invoices logic.
    const invoices = await invoice.getall(req.body.page, req.body.limit, req.params.id);

    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    if(invoices === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
        });
    }
    // If there are no invoices in the database. Then these lines of code will be executed
    else if(invoices.length == 0)
    {
        // If there are no invoice in the database. Then these lines of code will be executed
        return res.status(200).send
        ({
            code : 200,
            status : false,
            message : constants.responseMessage.getNoData,
            data : invoices
        });
    }
    else
    {
        // If there are invoice in the database. Then these lines of code will be executed
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : invoices
        });
    } 
};

/**
 * The below function is for getting all the details of a particular invoices. Only single invoice
 * details we get through the below function.
 * 
 * For get the details of a particular invoice. We need to give the invoice Id in the params.
 * On the basis of that, All the details of a particular invoices will be fetched.
 */
exports.getOne = async (req, res) =>
{
    // The below line is for calling the model. Which is having the code for fetching the particular invoices.
    const invoices = await invoice.getone(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(invoices === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    // If we are not having the invoice data on the basis of the id then this else if block code will be executed. This block will not be executed because we are already checking the params id in the middleware still we have added this for safety. 
    else if(invoices.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.getNoData,
            data : [] // No invoice data
        });
    }
    else
    {
        // Everythings went well and invoices data is available then this else block of code will executed.
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : invoices
        });
    }
};

/**
 * Since the customer can pay the money in multiples times. When the customer pay money we will put that
 * amount here. Which will go on store in the database for future reference. 
 */
exports.enterAmountForParticularInvoice = async (req, res, next) =>
{
    // The below line is for calling the model. Which is having the code for enter amount button the particular invoices.
    const invoices = await invoice.enteramountforparticularinvoice(req.params.id, req.body.totalRecievedAmount)
    
    // If we are not having the invoice data, then this if block of code will be executed. This function will not be executed because we have written the middleware which will check whether the available invoice id is entered.
    if(invoices === 'nodata')
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.errorInsert,
        });
    }
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(invoices === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    // If the enter amount is less than zero then this if block of code will be executed
    if(invoices === 'lessThanZero')
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.negativepayment,
        });
    }    
    // If all the things are done accordingly and data is stored in the database.
    if(invoices == 'affectedRows')
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.insert,
        });
    }
    // If we are entering the amount more than the remaining amount, then this if block of code will be executed
    if(invoices === 'moreThanActualAmount')
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.paymentValueInvalid,
        });
    }
};

/**
 * The below function is getting the payment histroy of a particular invoice id. 
 */
exports.getPaymentHistroyOfParticularInvoice = async (req, res) =>
{
    // The below line is for calling the model. Which is having the code for fetching the payment histroy of a particular invoices.
    const invoices = await invoice.getpaymenthistroyofparticularinvoice(req.params.id);
    // When the invoice doesn't have any payment records, then this if block will be executed
    if(invoices === 'nodata')
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.getAllErr,
        });
    }
    // If the invoice have the data of payments. At that time the if block of code will be executed 
    if(invoices.length != 0)
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : invoices
        });
    }
};

// The below function will give us the latest data of payment made.
exports.getLatestPaymentHistroy = async (req, res) =>
{
    // The below line will take us to the model. It is having the code or logic through which we can have the latest payment histroy data.
    const invoices = await invoice.getlatestpaymenthistroy(req.params.id);

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(invoices === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    // If function executed and data present, then this if block of code will be executed.
    if(invoices.length != 0)
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : { invoice: invoices }
        });
    }
};

// The below function is for sending email on invoice
exports.sendEmailAtInvoice = async(req, res) =>
{
    // The below line is for taking us to model. Which is designed to send invoice on email. 
    const invoices = await invoice.sendemailatinvoice(req.params.id,req.body.recepientEmail, req.body.invoiceSubject);

    // If invoice is not send on email. Then this if block of code will be executed.
    if(invoices === false)
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.emailInvoice,
        });
    }
    // If invoice is send on email. Then this if block of code will be executed.
    if(invoices === true)
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.emailInvoiceNotSend,
        });
    }
};

// The below function is function is used for showing the data when we are clicking on send email.
exports.getSendEmailButtonData = async(req, res) =>
{
    // The below line will take us to model. Which is designed to fetch the data. That need to be displayed on the send email pop-up
    const invoices = await invoice.getsendemailbuttondata(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(invoices === 'err')
    {
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }   
    // If the function execute and data is present, Then this else block of code will be executed
    else if(invoices.length != 0)
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getAll,
            data : invoices
        });
    }
    // If the function execute and data is not present, Then this else block of code will be executed
    else
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.getNoData,
            data : invoices
        });
    }
};

// There is a 'Trip' button on the front-end. That trip button is using this below function. When we are executing his function we will going to insert data into the booking table.
exports.bookingStarted = async (req, res) =>
{
    // The below line will take us to the model. Which is add the data on the booking table.
    let invoices = await invoice.bookingstart(req.params.id);

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(invoices === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    // If the function is executed and data is entered into the booking table and status of invoice data is also updated, Then this else if block of code is executed.
    if(invoices === 'Entered')
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.trip,
        });
    }
    // If any error happend while updating in the invoice table and inserting into the booking table, Then this if block of code will be executed    
    if(invoices === 'NotEntered')
    {
        // `Booking button controller successfully working. But data not entered`,
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message : constants.responseMessage.universalError,
        });
    }
    // Since the trip will be starts on once. So the entry of invoice data will be done once. This will be check in the below if block code.   
    if(invoices === 'duplicate')
    {
        // `Booking button controller successfully working. Invoice id is duplicate`,
        return res.status(200).json
        ({
            code: 404,
            status: false,
            message : constants.responseMessage.universalError,
            data : []
        });
    }
}

// The below function will take us to the model. Which is desinged for the cancel button in the invoice page.
exports.BookingCancel = async (req, res) =>
{
    let invoices = await invoice.bookingcancel(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(invoices === 'err')
    {
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    // If the function is executed and data is entered into the booking table and status of invoice data is also updated, Then this else if block of code is executed.
    if(invoices === 'Entered')
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constants.responseMessage.cancel
        });
    }
    // If any error happend while updating in the invoice table and inserting into the booking table, Then this if block of code will be executed    
    if(invoices === 'NotEntered')
    {
        // `Cancel button from the invoice page is successfully working. But data not entered`,
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.universalError,
        });
    }
    // Since the trip will be starts on once. So the entry of invoice data will be done once. This will be check in the below if block code.   
    if(invoices === 'duplicate')
    {
        // `Cancel button successfully working. Invoice id is duplicate is already available in the bookings table`,
        return res.status(200).json
        ({
            code: 404,
            status: false,
            message: constants.responseMessage.universalError,
            data : []
        });
    }
};