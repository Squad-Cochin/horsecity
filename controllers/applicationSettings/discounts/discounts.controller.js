
const discounts = require('../../../models/applicationSettings/discounts/discounts.model')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting all data  */
exports.getAllDiscounts = async(req,res)=>
{
   
    let getAllDiscounts = await discounts.getAllDiscounts(req.body);

   if(getAllDiscounts?.message === 'ERR'){

            return res.status(200).send
            ({
                code: 400,
                success: false,
                message: constants.responseMessage.getAllErr,
            });

   }else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllDiscounts
    });
   }
}

/**For add new discount  */
exports.addNewDiscount = async(req,res)=>
{

    let addNewDiscount = await discounts.addNewDiscount(req.body);

   if(addNewDiscount){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.errorInsert,
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


// /**Update discount status  */
exports.updateStatus = async(req,res)=>
{

    const discounts = await commonoperation.updateUserStatus(constants.tableName.discount_types,req.params.id);

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


// /**Remove discount  */
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

/**Get one discount */
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
        message: constants.responseMessage.getAll,
        data : getOneDiscount
    });
   }
}
/**Get all  active discount */
exports.getAllActiveDiscount = async (req, res, next) =>
{
    let discount = await discounts.getallactivediscount(); 
    if(discount.length !== 0)
    {

        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : discount 
        });
    }
    if(discount.length == 0)
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : []
        });
    }
    if(discount === 'err')
    {

        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constants.responseMessage.erroredit,
        });
    }
};