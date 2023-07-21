
const discounts = require('../../../models/applicationSettings/discounts/discounts')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting all data  */
exports.getAllDiscounts = async(req,res)=>
{
   
    let getAllDiscounts = await discounts.getAllDiscounts(req.body);

   if(getAllDiscounts){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllDiscounts
    });
   }
}

/**For add new taxation  */
exports.addNewDiscount = async(req,res)=>
{
    // console.log("1",req.body);
    let addNewDiscount = await discounts.addNewDiscount(req.body);
    // console.log("addNew",addNewTaxation);
   if(addNewDiscount){
    return res.status(200).send
    ({
        code: 201,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}

/**For update Discount */
exports.updateDiscount = async(req,res)=>
{
    let updateDiscount = await discounts.updateDiscount(req.body,req.params.id);

        if(updateDiscount.status == 'FAILD'){
            return res.status(200).send
            ({
                code: 400,
                success: false,
                message: constants.responseMessage.erroredit,
            
            });
        }else{
            return res.status(200).send
            ({
                code: 200,
                success: true,
                message: constants.responseMessage.edit,
            });
        }
}


// /**For add new service provider  */
exports.updateStatus = async(req,res)=>
{

    const discounts = await commonoperation.updateUserStatus(constants.tableName.discount_types,req.params.id);
    // console.log("addNew",data);
    console.log("status",discounts);
    if(discounts.length === 0)
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
}


// /**For remove taxation  */
exports.removeDiscounts = async(req,res)=>
{

    const discounts = await commonoperation.removeUser(constants.tableName.discount_types,req.params.id);

    if(discounts.length === 0)
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


exports.getOneDiscount = async(req,res)=>
{
    let getOneDiscount = await discounts.getOneDiscount(req.params.id);

   if(getOneDiscount?.discount == 'NOTFOUND'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getOneErr,

    });
   }else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : getOneDiscount
    });
   }
}