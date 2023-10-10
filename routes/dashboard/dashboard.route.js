var dashboardController = require(`../../controllers/dashboard/dashboard.controller`); // For fetching the controller export function reference 
const { verifyToken } = require("../../middlewares/requestValidator");
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams"); // This function is for checking the params id
const constants = require(`../../utils/constants`); // This is for the constants terms
const url = require(`../../utils/url_helper`);



module.exports = (app) =>
{
    // The below route is for fetching all the count that we are showing on the front end of thew ADMIN or SERVICE PROVIDER page. 
    app.get(`${url.dashboard.GET_ADMIN_DASHBOARD_COUNT}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getDashboardDataForParticularProvider);

    // The below route is for fetching monthly sales reporrt that we are showing on the front end of the ADMIN or SERVICE PROVIDER page. 
    app.get(`${url.dashboard.GET_ADMIN_SALES_REPORT}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getMontlySalesReport);

    // The below route is for fetching all the quoation breakdown (ALL, CONFIMED, NOTCONFIRMED) we are showing on the front end of thew ADMIN or SERVICE PROVIDER page. 
    app.get(`${url.dashboard.GET_ADMIN_QUOTAION_REPORT}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getDashboardQuotationStatus);

    // The below route is for fetching latest five enquires that we are showing on the front end of thew ADMIN or SERVICE PROVIDER page. 
    app.get(`${url.dashboard.GET_LATEST_5_ENQUIRIES}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getLatestEnquiries)

}