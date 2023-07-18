////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the customer controller file. The logic of the code is mainlly written in the models. The      //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constant = require('../../utils/constants');
const customer = require('../../models/customers/customer.model');

exports.getAll= async (req, res) =>
{
    const customers = await customer.getall();
    // console.log(customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
                {
                    totalCount : customers.length,
                    customers : customers
                }
        });
    }
    else
    {
        console.log('Customer data fetched successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
                {
                    totalCount : customers.length,
                    customers : customers
                }
        });
    }
}

exports.getOne= async (req, res) =>
{
    const customers = await customer.getone(req.params.id);
    // console.log(customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
                {
                    totalCount : customers.length,
                    customers : customers
                }
        });
    }
    else
    {
        console.log('Customer data fetched successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
                {
                    totalCount : customers.length,
                    customers : customers
                }
        });
    }
}


exports.addCustomer = async (req, res) =>
{
    const customers = await customer.getone();
};