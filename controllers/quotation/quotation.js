
const quotation = require('../../models/quotation/quotation')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
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

    let ListQuotation = await quotation.ListQuotation(req.body);

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
    console.log("RRR",removedQuotations);
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
        message: 'Quot id allredy in the bookings'

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
console.log("hereeeeeeeeeeeee");
    let sendMail = await quotation.sendMail(req.body,req.params.id);

   if(sendMail){
        return res.status(200).send({
            code: 200,
            success: true,
            message: `Mail success fully sended to `

        });
   }else{
    return res.status(200).send({
        code: 400,
        success: false,
        message: `Mail sending faild `

    });
   }
}


