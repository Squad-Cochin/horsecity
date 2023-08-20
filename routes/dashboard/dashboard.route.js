var dashboardController = require(`../../controllers/dashboard/dashboard.controller`);
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams");
const constants = require(`../../utils/constants`);


module.exports = (app) =>
{
    app.get(`/${process.env.apiToken}/dashboard/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getDashboardDataForParticularCustomer);

    app.get(`/${process.env.apiToken}/dashboard/sales/report/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    dashboardController.getMontlySalesReport);

}