//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the invoices.route.file . Where all the routes of the invoices.controller.js is written. If      //
//     anyone want to use any function of the invoices.controller.js file from the frontend. Then they          //
//     have to use the routes which are listed in this file.                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const invoiceController = require('../../controllers/invoices/invoices.controller'); // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require('../../middlewares/validateInput/checkRequestBodyInput'); // Importing the body Middleware
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');  // Importing the params middleware
const constants = require('../../utils/constants'); // Constant elements are stored in this file

module.exports = function (app)
{
    // The below route is for fetching all the invoices on the basis of the id of a service provider. This will be used in the reactjs front
    app.post(
        `/${process.env.apiToken}/getAll/invoices/:id`,
        isValidIdInTheParams(constants.tableName.service_providers),
        checkInput.getAllDataBody,
        invoiceController.getAll
        ); 

    // The below route is for fetching a  invoices on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.get(
            `/${process.env.apiToken}/getOne/invoice/:id`, 
            isValidIdInTheParams(constants.tableName.invoices),
            invoiceController.getOne
            );
            
    // The below route is for entering the payment a  invoices on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.post(
        `/${process.env.apiToken}/add/amount/:id`, 
        isValidIdInTheParams(constants.tableName.invoices),
        checkInput.checkAmountEntered,
        invoiceController.enterAmountForParticularInvoice
        );

    // The below route is for fetching a invoices overall payment histroy on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.get(
        `/${process.env.apiToken}/payment/histroy/:id`, 
        isValidIdInTheParams(constants.tableName.invoices),
        invoiceController.getPaymentHistroyOfParticularInvoice
    );

    // The below route is for fetching the latest payment detail of a invoice on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.get(`/${process.env.apiToken}/single/payment/histroy/:id`, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getLatestPaymentHistroy);

    // The below route is for fetching the email and subject on the basis of the invoice id in the params. This will be used in the reactjs front.
    app.get(`/${process.env.apiToken}/email/button/data/:id`, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getSendEmailButtonData);

    // The below route is for sending the invoice on the email on the basis of the invoice id in the params. This will be used in the reactjs front.
    app.post(`/${process.env.apiToken}/send/email/:id`,
    isValidIdInTheParams(constants.tableName.invoices),
    // checkInput.checkEmailBody,
    invoiceController.sendEmailAtInvoice);

    // The below route is for starting the booking on the basis of the invoice id in the params. This will be used in the reactjs front. (TRIP button)
    app.get(`/${process.env.apiToken}/booking/started/:id`, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.bookingStarted);

    // The below route is for cancelling the booking on the basis of the invoice id in the params. This will be used in the reactjs front. (CANCEL button)
    app.put(`/${process.env.apiToken}/booking/cancel/:id`,
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.BookingCancel);


};