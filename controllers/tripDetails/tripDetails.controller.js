////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the trip details controller file. Logics are written in model file and data we need are        //
//     showing in the response. It will be fetched from the model file. But how the data will be displayed    //
//     in the response it will done from here. The calling of the models are done from the controller files.  //                                        //                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const tripDetails = require('../../models/tripDetails/tripDetails.model')
const constants = require('../../utils/constants');

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
   }else{
        return res.status(200).send
        ({
            code: 500,
            success: false,
            message: constants.responseMessage.universalError
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
        message: constants.responseMessage.getNoData,
        data  : getAllBreakDowns
  
    });
   }
}