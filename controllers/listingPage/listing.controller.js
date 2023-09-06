////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the listing controller file. Logics are written in model file and data we need are              //
//     showing in the response. It will be fetched from the model file. But how the data will be displayed    //
//     in the response it will done from here. The calling of the models are done from the controller files.  //                                        //                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const modal = require('../../models/listingPage/listing.model')
const constants = require('../../utils/constants');

// the below function is listing all the vehicle on the basis of the search term
// This is for the nextjs front end
exports.listingPageData = async(req,res)=>
{

    // console.log("body",req.body);
    let listing = await modal.listingPageData(req.body)

   if(listing){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : listing
    });
   } 
}
 
// The below function is for getting all the usernames of the service provider
// This is for the nextjs front end
exports.getUsernameServiceProvider = async(req,res)=>
{    
    let getUsernameServiceProvider = await modal.getUsernameServiceProvider();

   if(getUsernameServiceProvider){

    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getUsernameServiceProvider
    });
   }
}