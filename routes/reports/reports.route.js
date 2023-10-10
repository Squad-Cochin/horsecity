const controller = require(`../../controllers/reports/reports.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const url = require(`../../utils/url_helper`);


module.exports = function(app)
{ 
    // /**For geting all service provider basis of from date to date */
    app.post(`${url.reports.POST_GET_ALL_SERVICE_PROVIDER}`,
    controller.getReportsServiceProviders); 

    // /**For geting all customers basis of from date to date */
    app.post(`${url.reports.POST_GET_ALL_CUSTOMERS}`,
    controller.getReportsCustomers); 
    
    // /**For geting all vehicles basis of from date to date */
    app.post(`${url.reports.POST_GET_ALL_VEHICLES}`,
    controller.getReportsVehicles); 

    // /**For geting all drivers basis of from date to date */
    app.post(`${url.reports.POST_GET_ALL_DRIVERS}`,
    controller.getReportsDrivers); 

   // /**For geting all enquiries basis of from date to date */
   app.post(`${url.reports.POST_GET_ALL_ENQUIRIES}`,
   controller.getReportsEnquiries); 

   // /**For geting all quatations reports basis of from date to date */
   app.post(`${url.reports.POST_GET_ALL_QUOTATIONS}`,
   controller.getReportsQuotations); 

   /**For geting all trip details reports basis of from date to date */
   app.post(`${url.reports.POST_GET_ALL_TRIP_DETAILS}`,
   controller.getReportsTripDetails);
   
   /**For geting all invoices reports basis of from date to date */
   app.post(`${url.reports.POST_GET_ALL_INVOICES}`,
   controller.getReportsInvoices); 

   /**For geting all invoices reports basis of from date to date */
   app.post(`${url.reports.POST_GET_ALL_ACCOUNTS}`,
   controller.getAccountsReports); 

}