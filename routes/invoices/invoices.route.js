const invoiceController = require('../../controllers/invoices/invoices.controller');
const checkInput = require('../../middlewares/validateInput/checkRequestBodyInput');
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
const constants = require('../../utils/constants');

module.exports = function (app)
{
    app.post(
        `/${process.env.apiToken}/getAll/invoices`, 
        checkInput.isPageNumberEntered,
        checkInput.isPageSizeEntered,
        invoiceController.getAll
        );

    app.get(
            `/${process.env.apiToken}/getOne/invoice/:id`, 
            isValidIdInTheParams(constants.tableName.invoices),
            invoiceController.getOne
            );
};