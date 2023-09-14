////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the quotation controller file. Logics are written in model file and data we need are           //
//     showing in the response. It will be fetched from the model file. But how the data will be displayed    //
//     in the response it will done from here. The calling of the models are done from the controller files.  //                                        //                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const quotation = require('../../models/quotation/quotation')
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');

// The below function is for creating new Quotation 
exports.addNewQuotation = async(req,res)=>
{

    let addNewQuotaion = await quotation.addNewQuotaion(req.body,time.changeDateToSQLFormat(req.body.pickup_date),time.changeDateToSQLFormat(req.body.drop_date));

   if(addNewQuotaion){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}

/**List quotation basis of page & limit */
exports.ListQuotation = async(req,res)=>
{

    let ListQuotation = await quotation.ListQuotation(req.body,req.params.id);

   if(ListQuotation){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : ListQuotation
    });
   }
}

/**For feching particlar quotation basis of quotation id */
exports.getOneQuotation = async(req,res)=>
{

    let getOneQuotation = await quotation.getOneQuotation(req.params.id);

   if(getOneQuotation){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : getOneQuotation
    });
   }
}


/**For feching particlar quotation basis of quotation id */
exports.updateQuotation = async(req,res)=>
{ 

    let updateQuotation = await quotation.updateQuotation(req.body,time.changeDateToSQLFormat(req.body.pickup_date),time.changeDateToSQLFormat(req.body.drop_date),req.params.id);

   if(updateQuotation){ 
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : constants.responseMessage.edit
    });
   }
}


/**For feching removed quotation basis of quotation id */
exports.removedQuotations = async(req,res)=>
{

    let removedQuotations = await quotation.removedQuotations(req.params.id);

   if(removedQuotations){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getOne,
        data : removedQuotations
    });
   }
}



/** //**For chainging qutation status     basis of quotation id */
exports.updateStatusQuotation = async(req,res)=>
{

    let removedQuotations = await quotation.updateStatusQuotation(req.params.id);

   if(!removedQuotations){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.statuserror   

    });
   }else if(removedQuotations === 'QUOTIDALLREDYAVAILABLE'){
    return res.status(200).send ({
        code: 400,
        success: false,
        message: 'The quote number is already in the bookings'

    });

   }else{
    return res.status(200).send  ({
        code: 200,
        success: true,
        message: constants.responseMessage.statusChanged

    });

   }
}


/** For Sending email */
exports.sendMail = async(req,res)=>
{

    let sendMail = await quotation.sendMail(req.body,req.params.id);
    if(sendMail){
        return res.status(200).send({
            code: 200,
            success: true,
            message: ` Mail successfully sent to ${req.body.customer_email} .`

        });
   }else{
    return res.status(200).send({
        code: 400,
        success: false,
        message: `Mail sending faild .`

    });
   }
}




/***** For feching email template data ******* */
exports.getsendemailbuttondata = async(req,res)=>
{

    let templates = await quotation.getsendemailbuttondata();

   if(templates){
        return res.status(200).send({
            code: 200,
            success: true,
            message: constants.responseMessage.getOne,
            data : templates

        });
   }
}


