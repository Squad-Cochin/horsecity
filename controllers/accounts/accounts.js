
const modalAccounts = require('../../models/accounts/accounts')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');


exports.getAllAcounts = async(req,res)=>
{

    let getAccounts = await modalAccounts.getAllAcounts(req.body);

   if(!getAccounts){
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
        data : getAccounts
    });
   }
}

/**List quotation basis of page & limit */
exports.getOneAccountDetails = async(req,res)=>
{

    let acoountDetails = await modalAccounts.getOneAccountDetails(req.params.id);

   if(acoountDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : acoountDetails
    });
   }else{
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getOneErr,

    });
   }
}
