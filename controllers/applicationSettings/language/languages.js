
const lngModal = require('../../../models/applicationSettings/language/languages')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');



/**For gitting all data  */
exports.getLanguages = async(req,res)=>
{
    let getAllLanguages = await lngModal.getLanguages();

   if(getAllLanguages){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllLanguages
    });
   }
}
