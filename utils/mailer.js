const nodemailer = require('nodemailer');
const commonfetching = require('../utils/helper/commonfetching');
const constants = require('./constants');
require('dotenv').config();


exports.SendEmail = async (id, to, subject, tableName) =>
{
    return new Promise(async (resolve, reject) =>
    {
        var flag = false;
        var htmlContent = '';

        if(tableName === constants.tableName.invoices)
        {
            let invoiceData = await commonfetching.getOneInvoice(id);
            htmlContent = await commonfetching.getInvoiceHtmlTemplate(invoiceData)
            flag = true;
        }
        
        if(tableName === constants.tableName.quotations)
        {
            const quoteData = await commonfetching.getOneQuotationFromCommonFetching(id);
            htmlContent = await commonfetching.getQuotationHtmlTemplate(quoteData)
            flag = true;
        }

        if(tableName === constants.tableName.service_providers)
        {
            htmlContent = await commonfetching.getForgotPasswordHTMLTemplate(id, to);
            flag = true;
        }

        if(flag = true)
        {
            const transporter = nodemailer.createTransport 
            ({
                // service: 'Gmail', // replace with your email service provider
                port : 465,    // -> True for 465, false for other ports
                host : "smtp.gmail.com",
                auth :
                {
                    user : process.env.SMTP_EMAIL, // replace with your email address
                    pass : process.env.SMTP_PWD // replace with your email password
                },
                secure : true,  
            }); 
            const mailOptions = 
            {
                from : process.env.EMAIL, // replace with your email address
                to : to, // recipient's email address
                subject : subject,
                html : htmlContent
            };
            transporter.sendMail(mailOptions, (error, info) => 
            {
                if(error)
                {
                    resolve(false);
                }
                else
                {
                    flag = false;
                    htmlContent = '';
                    resolve(true); // Resolve the promise with the email response
                }
            });            
        }

    });
};

