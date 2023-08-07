
const tripDetails = require('../../models/tripDetails/tripDetails')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

/**For gitting all trip details  */
exports.getAllTripDetails = async(req,res)=>
{
    let getAllTripDetails = await tripDetails.getAllTripDetails(req.body,req.params.id);

   if(getAllTripDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllTripDetails
    });
   }
}


/**For adding new break down details  */
exports.addBreakDowns = async(req,res)=>
{
    let getAllTripDetails = await tripDetails.addBreakDowns(req.body);

   if(getAllTripDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
  
    });
   }else{
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.errorInsert,
  
    });
   }
}


/**For adding new break down details  */
exports.listBreakDowns = async(req,res)=>
{
    let getAllBreakDowns= await tripDetails.listBreakDowns(req.params.id);

   if(getAllBreakDowns){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data  : getAllBreakDowns
  
    });
   }else{
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: 'No data found',
        data  : getAllBreakDowns
  
    });
   }
}