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
    const invoices = await invoice.getall(req.body.page, req.body.limit);
    
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
        console.log('Invoice data fetched successfully');
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

exports.enterAmountForParticularInvoice = async(req, res) =>
{
    
    const invoices = await invoice.enteramountforparticularinvoice(req.params.id, req.body.amount)

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
    if(invoices.length !== 0)
    {
        console.log('Amount data inserted successfully');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: "Amount data inserted successfully",
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
            message: constant.responseMessage.errorInsert,
        });
    }


};




