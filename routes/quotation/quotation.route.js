const quotation = require(`../../controllers/quotation/quotation.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const validator = require('../../middlewares/validateInput/checkRequestBodyInput');
const reqValidator = require('../../middlewares/requestValidator');
const url = require(`../../utils/url_helper`);


module.exports = function(app)
{
    /**Below route is for  adding new quotation */
    app.post(`${url.quotation.POST_ADD_QUOTATION}`,
    reqValidator.verifyToken,
    reqValidator.verifyQuotationFields,
    reqValidator.verifyPickupDate,
    reqValidator.verifyDropDate,
    validator.checkValuesEnteredInTheQuotationBody,
    quotation.addNewQuotation); 
    
    /**Below route is for  list quotation basis of page & limit */
    app.post(`${url.quotation.POST_GETALL_QUOTATION}`,
    reqValidator.verifyToken,
    quotation.ListQuotation);  

    /**Below route is for feching particlar quotation basis of quotation id */
    app.get(`${url.quotation.GET_PARTICULAR_QUOATATION}`,
    reqValidator.verifyToken,
    quotation.getOneQuotation);  
     
    // /**Below route is for   updating quataion That means add new one  */
    app.put(`${url.quotation.PUT_UPDATE_AND_CREATE_NEW_QUOTATION}`,
    reqValidator.verifyToken,
    reqValidator.verifyQuotationFields,
    reqValidator.verifyPickupDate,
    reqValidator.verifyDropDate,
    quotation.updateQuotation);   

    //**Below route is for  listing removed quotaions  */ 
    app.get(`${url.quotation.GET_LISTING_REMOVED_QUOTATION}`,
    reqValidator.verifyToken,
    quotation.removedQuotations);    

    //**Below route is for chainging qutation status    */ 
    app.post(`${url.quotation.POST_CHANGING_QUOTATION_STATUS}`,
    reqValidator.verifyToken,
    reqValidator.verifyQuotationFields,
    reqValidator.verifyPickupDate,
    reqValidator.verifyDropDate,
    quotation.updateStatusQuotation);   

    //**Below route is for sending email qutation     */ 
    app.post(`${url.quotation.POST_SEND_QUOTATION_EMAIL}`,
    reqValidator.verifyToken,
    quotation.sendMail);   
  

     //**For taking quotation templates subjuct     */ 
     app.get(`${url.quotation.GET_QUOTATION_TEMPLATE}`,
     reqValidator.verifyToken,
     quotation.getsendemailbuttondata);   
  
}