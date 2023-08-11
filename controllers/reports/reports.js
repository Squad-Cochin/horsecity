
const reportsModal = require('../../models/reports/report.modal')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');






/**For geting all service provider basis of from date & to date */
exports.getReportsServiceProviders = async(req,res)=>
{
    let getSProviders = await reportsModal.getReportsServiceProviders(req.body,time.changeDateToSQLFormat(req.body.from_date),time.changeDateToSQLFormat(req.body.to_date),req.params.id);

   if(getSProviders){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: "Successfully fetched service providers",
        data : getSProviders
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
        message: "Successfully fetched customers",
        data : getcustomers
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
        message: "Successfully fetched vehicles",
        data : getVehicles
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
        message: "Successfully fetched drivers",
        data : getDrivers
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
        message: "Successfully fetched enquiries",
        data : getEnquiries
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
        message: "Successfully fetched quatations",
        data : getQuotations
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
        message: "Successfully fetched trip details",
        data : getTripDetails
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
        message: "Successfully fetched invoices",
        data : getInvoicesDetails
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
        message: "Successfully fetched accounts",
        data : getAccountsDetails
    });
   }
}
