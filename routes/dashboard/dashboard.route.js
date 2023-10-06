var dashboardController = require(`../../controllers/dashboard/dashboard.controller`); // For fetching the controller export function reference 
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams"); // This function is for checking the params id
const constants = require(`../../utils/constants`); // This is for the constants terms


module.exports = (app) =>
{
    // The below route is for fetching all the count that we are showing on the front end of thew ADMIN or SERVICE PROVIDER page. 
    app.get(`/${process.env.apiToken}/dashboard/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getDashboardDataForParticularProvider);

    // The below route is for fetching monthly sales reporrt that we are showing on the front end of the ADMIN or SERVICE PROVIDER page. 
    app.get(`/${process.env.apiToken}/dashboard/sales/report/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getMontlySalesReport);

    // The below route is for fetching all the quoation breakdown (ALL, CONFIMED, NOTCONFIRMED) we are showing on the front end of thew ADMIN or SERVICE PROVIDER page. 
    app.get(`/${process.env.apiToken}/dashboard/quotation/data/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getDashboardQuotationStatus);

    // The below route is for fetching latest five enquires that we are showing on the front end of thew ADMIN or SERVICE PROVIDER page. 
    app.get(`/${process.env.apiToken}/dashboard/latest/enquiries/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getLatestEnquiries)

}