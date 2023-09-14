const quotation = require(`../../controllers/quotation/quotation`);   // importing the auth controller details and assigning it to the authcontroller variable

const validator = require('../../middlewares/validateInput/checkRequestBodyInput')


module.exports = function(app)
{
    /**Below route is for  adding new quotation */
    app.post(`/${process.env.apiToken}/add/quotation`,validator.checkValuesEnteredInTheQuotationBody,quotation.addNewQuotation); 
    
    /**Below route is for  list quotation basis of page & limit */
    app.post(`/${process.env.apiToken}/getAll/quotations/:id`,quotation.ListQuotation);  

    /**Below route is for feching particlar quotation basis of quotation id */
    app.get(`/${process.env.apiToken}/getOne/quotation/:id`,quotation.getOneQuotation);  
    
    // /**Below route is for   updating quataion That means add new one  */
    app.put(`/${process.env.apiToken}/update/quotation/:id`,quotation.updateQuotation);   

    //**Below route is for  listing removed quotaions  */ 
    app.get(`/${process.env.apiToken}/list/quotations/:id`,quotation.removedQuotations);    

    //**Below route is for chainging qutation status    */ 
    app.get(`/${process.env.apiToken}/update-status/quotations/:id`,quotation.updateStatusQuotation);   

    //**Below route is for sending email qutation     */ 
    app.post(`/${process.env.apiToken}/send-email/quotations/:id`,quotation.sendMail);   
  

     //**For taking quotation templates subjuct     */ 
     app.get(`/${process.env.apiToken}/template/quotaion`,quotation.getsendemailbuttondata);   
  
}