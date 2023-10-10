
const enquirie = require('../../models/enquiries/enquiries.model')
const constants = require('../../utils/constants');
const time = require(`../../utils/helper/date`);

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


/**
 * The below function is for creating new enquiry. This is for NEXT JS front end 
 */
exports.createNewEnquiry = async (req, res, next) =>
{
    const data = await enquirie.createnewenquiry(
        req.params.id,
        // req.body.customer_id,
        req.body.vehicle_id,
        req.body.service_provider_id,
        req.body.pickup_location,
        req.body.drop_location,
        req.body.vehicle_type,
        req.body.pickup_country,
        req.body.drop_country,
        req.body.no_of_horse,
        req.body.description,
        time.changeDateToSQLFormat(req.body.pickup_date)
        );
    if(data === 'err') 
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.enquiryBookFailed
        });
    }
    if(data === 'inserted')
    {
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : constants.responseMessage.enquiryBooked
        });
    }
};