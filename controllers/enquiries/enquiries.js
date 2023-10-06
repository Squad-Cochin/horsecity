
const enquirie = require('../../models/enquiries/enquiries')
const constants = require('../../utils/constants');

// This below controller function will be used for fetching the data of enquiries
exports.getAllEnquiries = async(req,res)=>
{
    let getAllEnquiries = await enquirie.getAllEnquiries(req.body, req.params.id);

    if(getAllEnquiries){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllEnquiries 
    });
   }else{
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}
// This below controller function will be used for fetching the data of particular enquirie basis of enquiry id
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
        message: constants.responseMessage.getAll,
        data : getOneEnquiry
    });              
   }               
}             