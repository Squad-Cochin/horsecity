
const enquirie = require('../../models/enquiries/enquiries')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

/**For gitting all data  */
exports.getAllEnquiries = async(req,res)=>
{
    let getAllEnquiries = await enquirie.getAllEnquiries(req.body,req.params.id);

   if(getAllEnquiries){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllEnquiries
    });
   }
}




exports.getOneEnquiry = async(req,res)=>
{
    let getOneEnquiry = await enquirie.getOneEnquiry(req.params.id);

   if(getOneEnquiry?.enquiry == 'NOTFOUND'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getOneErr,

    });
   }else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : getOneEnquiry
    });
   }
}

exports.getNameServiceProviders = async(req,res)=>
{    
    let getAllSProvidersUsername = await serviceProvider.getNameServiceProviders();

   if(getAllSProvidersUsername){

    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllSProvidersUsername
    });
   }
}