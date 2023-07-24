
const currencies = require('../../../models/applicationSettings/currencies/currencies')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting all data  */
exports.getCurrencies = async(req,res)=>
{
    let getAllCurrencies = await currencies.getCurrencies();

   if(getAllCurrencies){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllCurrencies
    });
   }
}

