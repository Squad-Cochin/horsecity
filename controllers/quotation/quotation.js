
const quotation = require('../../models/quotation/quotation')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

exports.addNewQuotation = async(req,res)=>
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

/**List quotation basis of page & limit */
exports.ListQuotation = async(req,res)=>
{

    let ListQuotation = await quotation.ListQuotation(req.body);

   if(ListQuotation){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : ListQuotation
    });
   }
}

/**For feching particlar quotation basis of quotation id */
exports.getOneQuotation = async(req,res)=>
{

    let getOneQuotation = await quotation.getOneQuotation(req.params.id);

   if(getOneQuotation){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : getOneQuotation
    });
   }
}


