const controller = require(`../../controllers/reports/reports`);   // importing the auth controller details and assigning it to the authcontroller variable



module.exports = function(app)
{

 
    // /**For geting all service provider basis of from date to date */
    app.post(`/${process.env.apiToken}/reports/serviceproviders/:id`,controller.getReportsServiceProviders); 

    // /**For geting all customers basis of from date to date */
    app.post(`/${process.env.apiToken}/reports/customers/:id`,controller.getReportsCustomers); 
    
    // /**For geting all vehicles basis of from date to date */
    app.post(`/${process.env.apiToken}/reports/vehicles/:id`,controller.getReportsVehicles); 

    // /**For geting all drivers basis of from date to date */
    app.post(`/${process.env.apiToken}/reports/drivers/:id`,controller.getReportsDrivers); 

   // /**For geting all enquiries basis of from date to date */
   app.post(`/${process.env.apiToken}/reports/enquiries/:id`,controller.getReportsEnquiries); 

   // /**For geting all quatations reports basis of from date to date */
   app.post(`/${process.env.apiToken}/reports/quotations/:id`,controller.getReportsQuotations); 

   /**For geting all trip details reports basis of from date to date */
   app.post(`/${process.env.apiToken}/reports/tripDetails/:id`,controller.getReportsTripDetails); 

   
   /**For geting all invoices reports basis of from date to date */
   app.post(`/${process.env.apiToken}/reports/invoices/:id`,controller.getReportsInvoices); 

   /**For geting all invoices reports basis of from date to date */
   app.post(`/${process.env.apiToken}/reports/accounts/:id`,controller.getAccountsReports); 

}