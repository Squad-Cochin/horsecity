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
const invoice = require('../../models/invoices/invoice.model');  // The model from where the logic is intantiate are written in driver model
const time = require('../../utils/helper/date'); // All the time related formating are written in this fi

exports.getAll = async (req, res) =>
{
    const invoices = await invoice.getall(req.body.page, req.body.limit, req.params.id);
    
    if(invoices === 'err')
    {
        console.log('Error while getting all the invoice data');
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : 'Internal server error while fetching all the data from the invoice table',
        });
    }
    
    if(invoices.length == 0)
    {
        // If there are no invoice in the database. Then these lines of code will be executed
        console.log('No invoice data present');
        return res.status(200).send
        ({
            code : 200,
            status : false,
            message : constant.responseMessage.getAll,
            data : invoices
        });
    }
    else
    {
        // If there are invoice in the database. Then these lines of code will be executed
        // console.log('Invoice data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : invoices
        });
    } 
};


exports.getOne = async (req, res) =>
{
    const invoices = await invoice.getone(req.params.id);
    if(invoices.length === 0)
    {
        console.log('No invoice data present');
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
        console.log('Invoices data fetched successfully');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getOne,
            data : invoices
        });
    }
};

exports.enterAmountForParticularInvoice = async (req, res, next) =>
{
    console.log('Came to the controller');
    const invoices = await invoice.enteramountforparticularinvoice(req.params.id, req.body.totalRecievedAmount)
    if(invoices === 'nodata')
    {
        console.log('Error while inserting the data into enter amount ');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constant.responseMessage.errorInsert,
        });
    }
    

    if(invoices === 'err')
    {
        console.log('Internal server error from the enter amount for particular invoice');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: 'Internal server error from the enter amount for particular invoice',
        });
    }

    if(invoices === 'lessThanZero')
    {
        console.log('Internal server error from the enter amount for particular invoice. The amount is less than zero.');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: 'Amount is less than zero. It is not allowed',
        });
    }
    
    if(invoices == 'affectedRows')
    {
        console.log('Amount data inserted successfully');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: "Amount data inserted successfully",
        });
    }

    if(invoices === 'fullypaid')
    {
        console.log('Amount is already paid fully');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: "Amount is already paid fully",
        });
    }
    
    if(invoices === 'moreThanActualAmount')
    {
        console.log('Amount which is being inserted is more than the remaing amount');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: "Amount which is being inserted is more than the remaing amount. Please enter again",
        });
    }
};

exports.getPaymentHistroyOfParticularInvoice = async (req, res) =>
{
    const invoices = await invoice.getpaymenthistroyofparticularinvoice(req.params.id);
    if(invoices === 'nodata')
    {
        console.log('Error while inserting the data into enter amount ');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constant.responseMessage.getAllErr,
        });
    }
    if(invoices.length != 0)
    {
        console.log(`Invoice histroy of a particular invoice id is fetched successfully`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: constant.responseMessage.getAll,
            data : invoices
        });
    }
};

exports.getLatestPaymentHistroy = async (req, res) =>
{
    const invoices = await invoice.getlatestpaymenthistroy(req.params.id);
    if(invoices === 'err')
    {
        console.log('Internal Server Error');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constant.responseMessage.universalError,
        });
    }
    if(invoices.length != 0)
    {
        console.log('Data Fetched Succesfully');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: 'Data Fetched Succesfully',
            data : 
            {
                invoice: invoices
            }
        });
    }
    if(invoices.length == 0)
    {
        console.log('Data Fetched Succesfully. But there is no data present for this id');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: 'Data Fetched Succesfully. But there is no data present for this id',
            data : 
            {
                invoice: invoices
            }
        });
    }
};

exports.sendEmailAtInvoice = async(req, res) =>
{
    const invoices = await invoice.sendemailatinvoice(req.params.id,req.body.recepientEmail, req.body.invoiceSubject);
    // console.log('Invoices: ', invoices);
    if(invoices === false)
    {
        console.log(`Error while sending the email from the invoice controller function`);
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: 'Error while sending the invoice on email',
        });
    }
    if(invoices === true)
    {
        console.log(`Email sent from the invoice controller function`);
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: 'Invoice sent successfully on email',
        });
    }
};




exports.getSendEmailButtonData = async(req, res) =>
{
    const invoices = await invoice.getsendemailbuttondata(req.params.id);
    if(invoices === 'err')
    {
        console.log('Internal Server Error from the send email button data');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constant.responseMessage.universalError,
        });
    }
    
    if(invoices.length != 0)
    {
        console.log('Data Fetched Succesfully');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: 'Data Fetched Succesfully',
            data : invoices
        });
    }
    else
    {
        console.log('Data Fetched Succesfully. No data is there for this params id ');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: 'Data Fetched Succesfully. No data is there for this params id',
            data : invoices
        });
    }
};


exports.bookingStarted = async (req, res) =>
{
    let invoices = await invoice.bookingstart(req.params.id);

    console.log('Invoice: ', invoices);
    if(invoices === 'err')
    {
        console.log('Internal Server Error from the start button data');
        return res.status(200).json
        ({
            code: 500,
            status: false,
            message: constant.responseMessage.universalError,
        });
    }

    if(invoices === 'Entered')
    {
        console.log('Booking started and data entered into the booking table');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Booking started and data entered into the booking table`,
        });
    }
    
    if(invoices === 'NotEntered')
    {
        console.log('Booking button controller successfully working. But data not entered');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `Booking button controller successfully working. But data not entered`,
        });
    }

    if(invoices === 'duplicate')
    {
        console.log('Booking button controller successfully working. Invoice id is duplicate');
        return res.status(200).json
        ({
            code: 404,
            status: false,
            message: `Booking button controller successfully working. Invoice id is duplicate`,
            data : []
        });
    }






}


exports.getDataFromBookingTable = async (req, res, next) =>
{
    let invoices = await invoice.getdatafrombookingtable(req.params.id);
    console.log('Invoices', invoices);
    if(invoices === 'noData')
    {
        console.log(`Invoice data not present in the booking table from the controller table`);
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : 'Data not found',
            data : invoices
        })
    }

    if(invoices.length !== 0)
    {
        console.log(`Invoice data present in the booking table from the controller table`);
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : 'Data found',
            data : invoices
        })
    }
}




