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
    const customers = await customer.getall(req.body.page, req.body.limit);
    // console.log("Customer :", customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present');
        return res.send
        ({
            code : 404,
            status : true,
            message : constant.responseMessage.getAll,
            data : customers
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
            data : customers
        });
    }
}

exports.getOne= async (req, res, next) =>
{
    const customers = await customer.getone(req.params.id);
    console.log('Customre One Data: ',customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present');
        return res.send
        ({
            code : 404,
            status : true,
            message : constant.responseMessage.getAllErr,
            data : customers
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
            data : customers
        });
    }
}

exports.addCustomer = async (req, res, next) =>
{
    const customers = await customer.addcustomer
    ( 
        req.body.name,
        req.body.email,
        req.body.userName,
        req.body.password,
        req.body.contact_no,
        req.body.date_of_birth, 
        req.body.id_proof_no,
        req.files.id_proof_image
    );
    if (customers === 'err')
    {
        console.log('Error while inserting the customer data');
        return res.status(200).json
        ({
            code: 401,
            status: true,
            message: constant.responseMessage.errorInsert,
        });
    }
    else if (customers === 'INVALIDFORMAT')
    {
        console.log('Invalid Format of file submit for upload');
        res.status(200).send
        ({
            code : 401,
            status : true,
            message : "Invalid Format of file submit for upload",
        });
    }
    else if(customers === 'ERR')
    {
        console.log('Internal server error while uploading the file for customer');
        res.status(200).send
        ({
            code : 401,
            status : true,
            message : "Internal server error while uploading the file for customer",
        });
    }
    else if(customers === 'NOATTACHEMENT')
    {
        console.log('No image uploaded for customer');
        res.status(200).send
        ({
            code : 401,
            status : true,
            message : "No image uploaded for customer",
        });
    }
    else
    {
        console.log('Customer data inserted successfully');
        return res.json
        ({
            code: 200,
            status: true,
            message: constant.responseMessage.insert,
        });
    }
};


exports.editCustomer = async (req, res, next) =>
{
    const customers = await customer.editcustomer(req.params.id, req.body.name, req.body.email, req.body.userName, req.body.contact_no, req.body.date_of_birth, req.body.id_proof_no, req.files.id_proof_image);
    // const customers = await customer.editcustomer(req.params.id, req.body, req.files);
    
    if(customers === 'err')
    {
        console.log('Error while editing the customer data');
        res.status(200).send
        ({
            code : 401,
            status : true,
            message : constant.responseMessage.erroredit,
        });
    }
    // if(customers === 'INVALIDFORMAT')
    // {
    //     console.log('Invalid Format of file submit for upload');
    //     res.status(200).send
    //     ({
    //         code : 401,
    //         status : true,
    //         message : "Invalid Format of file submit for upload",
    //     });
    // }
    // else if(customers === 'ERR')
    // {
    //     console.log('Internal server error while uploading the file for customer');
    //     res.status(200).send
    //     ({
    //         code : 401,
    //         status : true,
    //         message : "Internal server error while uploading the file for customer",
    //     });
    // }
    // else if(customers === 'NOATTACHEMENT')
    // {
    //     console.log('No image uploaded for customer');
    //     res.status(200).send
    //     ({
    //         code : 401,
    //         status : true,
    //         message : "No image uploaded for customer",
    //     });
    // }
    else
    {
        console.log('Customer data edited successfully');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.edit,
        });
    }
};


exports.updateStatus= async (req, res) =>
{
    const customers = await customer.updatestatus(req.params.id);
    // console.log(customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present and status is not updated');
        return res.send
        ({
            code : 400,
            status : true,
            message : constant.responseMessage.statuserror
        });
    }
    else
    {
        console.log('Customer Status updated successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.statusChanged
        });
    }
}


exports.removeCustomer = async (req, res) =>
{
    const customers = await customer.removecustomer(req.params.id);
    // console.log(customers);
    if(customers.length === 0)
    {
        console.log('No Customer data present and remove is not done');
        return res.send
        ({
            code : 400,
            status : true,
            message : constant.responseMessage.removeerror
        });
    }
    else
    {
        console.log('Customer is removed');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removesuccess
        });
    }
}