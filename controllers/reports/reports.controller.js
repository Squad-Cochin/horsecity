////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the report controller file. Logics are written in model file and data we need are              //
//     showing in the response. It will be fetched from the model file. But how the data will be displayed    //
//     in the response it will done from here. The calling of the models are done from the controller files.  //                                        //                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const reportsModal = require('../../models/reports/report.modal')
const time = require('../../utils/helper/date');
const constants = require('../../utils/constants');
/**For geting all service provider basis of from date & to date */
exports.getReportsServiceProviders = async(req,res)=>
{
 
    let getSProviders = await reportsModal.getReportsServiceProviders(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getSProviders){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getSProviders
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}

/**For geting all customers basis of from date & to date */
exports.getReportsCustomers = async(req,res)=>
{
    let getcustomers = await reportsModal.getReportsCustomers(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getcustomers){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getcustomers
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}



/**For geting all vehicles basis of from date & to date */
exports.getReportsVehicles = async(req,res)=>
{
    let getVehicles = await reportsModal.getReportsVehicles(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getVehicles){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getVehicles
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}



/**For geting all drivers basis of from date & to date */
exports.getReportsDrivers = async(req,res)=>
{
    let getDrivers = await reportsModal.getReportsDrivers(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getDrivers){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getDrivers
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}



/**For geting all enquiries basis of from date & to date */
exports.getReportsEnquiries = async(req,res)=>
{
    let getEnquiries = await reportsModal.getReportsEnquiries(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getEnquiries){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getEnquiries
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}




/**For geting all quatations basis of from date & to date */
exports.getReportsQuotations = async(req,res)=>
{
    let getQuotations = await reportsModal.getReportsQuotations(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getQuotations){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getQuotations
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: true,
        message: constants.responseMessage.getAllErr,
    });
   }
}



/**For geting all Trip details basis of from date & to date */
exports.getReportsTripDetails = async(req,res)=>
{
    let getTripDetails = await reportsModal.getReportsTripDetails(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getTripDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getTripDetails
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr
    });
   }
}



/**For geting all invoces basis of from date & to date */
exports.getReportsInvoices = async(req,res)=>
{
    let getInvoicesDetails = await reportsModal.getReportsInvoices(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getInvoicesDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getInvoicesDetails
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}


/**For geting all invoces basis of from date & to date */
exports.getAccountsReports = async(req,res)=>
{
    let getAccountsDetails = await reportsModal.getAccountsReports(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getAccountsDetails){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAccountsDetails
    });
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getAllErr,
    });
   }
}
