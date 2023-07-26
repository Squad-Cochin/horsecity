
const quotation = require('../../models/quotation/quotation')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

exports.addNewQuotaion = async(req,res)=>
{

    let addNewQuotaion = await quotation.addNewQuotaion(req.body);

   if(addNewQuotaion){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}


