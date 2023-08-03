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
            

    app.post(
        `/${process.env.apiToken}/add/amount/:id`, 
        isValidIdInTheParams(constants.tableName.invoices),
        checkInput.checkAmountEntered,
        invoiceController.enterAmountForParticularInvoice
        );

    app.get(
        `/${process.env.apiToken}/payment/histroy/:id`, 
        isValidIdInTheParams(constants.tableName.invoices),
        invoiceController.getPaymentHistroyOfParticularInvoice
    );

    app.get(`/${process.env.apiToken}/single/payment/histroy/:id`, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getLatestPaymentHistroy);

    app.get(`/${process.env.apiToken}/email/button/data/:id`, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getSendEmailButtonData);

    app.post(`/${process.env.apiToken}/send/email/:id`,
    isValidIdInTheParams(constants.tableName.invoices),
    // checkInput.checkEmailBody,
    invoiceController.sendEmailAtInvoice);


    app.get(`/${process.env.apiToken}/booking/started/:id`, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.bookingStarted);

    app.get(`/${process.env.apiToken}/getInvoice/Data/From/Booking/:id`,
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getDataFromBookingTable);


};