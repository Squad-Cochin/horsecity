const modalAccounts = require('../../models/accounts/accounts')
const constants = require('../../utils/constants');


/**Below controller For getting listing accounts  basis of page & limit & service provider id  */
exports.getAllAccounts = async(req,res)=>
{

    let getAccounts = await modalAccounts.getAllAccounts(req.body,req.params.id);

   if(!getAccounts){
    return res.status(200).send
    ({
        code: 500,
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

/**Below controller For getting particular account details  */
exports.getOneAccountDetails = async(req,res)=>
{

    let acoountDetails = await modalAccounts.getOneAccountDetails(req.params.id);

   if(acoountDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
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
