
const quotation = require('../../models/quotation/quotation')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

exports.addNewQuotaion = async(req,res)=>
{
    console.log("1",req.body);
    let addNewQuotaion = await quotation.addNewQuotaion(req.body,req.files.licence_image);
    console.log("addNew",addNewProvider);
   if(addNewQuotaion){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: "Successfully added service providers",
    });
   }
}


