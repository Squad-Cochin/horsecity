
const currencies = require('../../../models/applicationSettings/currencies/currencies')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting all data  */
exports.getCurrenciesNames = async(req,res)=>
{
    let getAllCurrencies = await currencies.getCurrenciesNames();

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

