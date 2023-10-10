//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the invoices.route.file . Where all the routes of the invoices.controller.js is written. If      //
//     anyone want to use any function of the invoices.controller.js file from the frontend. Then they          //
//     have to use the routes which are listed in this file.                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const invoiceController = require('../../controllers/invoices/invoices.controller'); // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require('../../middlewares/validateInput/checkRequestBodyInput'); // Importing the body Middleware
const constants = require('../../utils/constants'); // Constant elements are stored in this file
const url = require(`../../utils/url_helper`);

const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');  // Importing the params middleware
const { verifyToken } = require('../../middlewares/requestValidator');

module.exports = function (app)
{
    // The below route is for fetching all the invoices on the basis of the id of a service provider. This will be used in the reactjs front
    app.post(`${url.invoices.POST_ALL_INVOICE}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.getAllDataBody,
    invoiceController.getAll); 

    // The below route is for fetching a  invoices on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.get(`${url.invoices.GET_ONE_INVOICE}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getOne);
            
    // The below route is for entering the payment a  invoices on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.post(`${url.invoices.POST_ADD_AMOUNT}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.invoices),
    checkInput.checkAmountEntered,
    invoiceController.enterAmountForParticularInvoice);

    // The below route is for fetching a invoices overall payment histroy on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.get(`${url.invoices.GET_PAYMENT_HISTROY}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getPaymentHistroyOfParticularInvoice);

    // The below route is for fetching the latest payment detail of a invoice on the basis of the id of a invoice in the params. This will be used in the reactjs front
    app.get(`${url.invoices.GET_LATEST_PAYMENT_OF_PARTICULAR_INVOICE}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getLatestPaymentHistroy);

    // The below route is for fetching the email and subject on the basis of the invoice id in the params. This will be used in the reactjs front.
    app.get(`${url.invoices.GET_EMAIL_BUTTON_DATA}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.getSendEmailButtonData);

    // The below route is for sending the invoice on the email on the basis of the invoice id in the params. This will be used in the reactjs front.
    app.post(`${url.invoices.POST_SEND_EMAIL}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.invoices),
    // checkInput.checkEmailBody,
    invoiceController.sendEmailAtInvoice);

    // The below route is for starting the booking on the basis of the invoice id in the params. This will be used in the reactjs front. (TRIP button)
    app.get(`${url.invoices.GET_TRIP_BUTTON}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.bookingStarted);

    // The below route is for cancelling the booking on the basis of the invoice id in the params. This will be used in the reactjs front. (CANCEL button)
    app.put(`${url.invoices.PUT_CANCEL_BUTTON}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.invoices),
    invoiceController.BookingCancel);


};