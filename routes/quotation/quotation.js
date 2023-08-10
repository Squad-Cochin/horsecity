const quotation = require(`../../controllers/quotation/quotation`);   // importing the auth controller details and assigning it to the authcontroller variable

const validator = require('../../middlewares/validateInput/checkRequestBodyInput')


module.exports = function(app)
{
    /**For adding new quotation */
    app.post(`/${process.env.apiToken}/add/quotation`,validator.checkValuesEnteredInTheQuotationBody,quotation.addNewQuotation); 
    
    /**List quotation basis of page & limit */
    app.post(`/${process.env.apiToken}/getAll/quotations/:id`,quotation.ListQuotation);  

    /**For feching particlar quotation basis of quotation id */
    app.get(`/${process.env.apiToken}/getOne/quotation/:id`,quotation.getOneQuotation);  
    
    // /**For updating quataion That means add new one  */
    app.put(`/${process.env.apiToken}/update/quotation/:id`,quotation.updateQuotation);   

    //**For listing removed quotaions  */ 
    app.get(`/${process.env.apiToken}/list/quotations/:id`,quotation.removedQuotations);    

    //**For chainging qutation status    */ 
    app.get(`/${process.env.apiToken}/update-status/quotations/:id`,quotation.updateStatusQuotation);   

    //**For sending email qutation     */ 
    app.post(`/${process.env.apiToken}/send-email/quotations/:id`,quotation.sendMail);   
  

     //**For taking quotation templates subjuct     */ 
     app.get(`/${process.env.apiToken}/template/quotaion`,quotation.getsendemailbuttondata);   
  
}