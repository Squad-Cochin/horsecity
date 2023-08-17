
const modal = require('../../models/listingPage/listing.model')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');


exports.listingPageData = async(req,res)=>
{

    console.log("body",req.body);
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