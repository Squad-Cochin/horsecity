
const currencies = require('../../../models/applicationSettings/currencies/currencies.model')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting active currencie names  */
exports.getCurrenciesNames = async(req,res)=>
{
    let getAllCurrencies = await currencies.getCurrenciesNames();

   if(getAllCurrencies === 'NODATA'){
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
        data : getAllCurrencies
    });
   }
}

