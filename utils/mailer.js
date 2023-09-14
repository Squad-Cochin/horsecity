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
            console.log('Third: ', flag);
        }
        
        if(tableName === constants.tableName.quotations)
        {
            const quoteData = await commonfetching.getOneQuotationFromCommonFetching(id);
            htmlContent = await commonfetching.getQuotationHtmlTemplate(quoteData)
            flag = true;
            console.log('Fourth: ', flag);
        }

        if(tableName === constants.tableName.service_providers)
        {
            htmlContent = await commonfetching.getForgotPasswordHTMLTemplate(id, to);
            flag = true;
            console.log('Fourth: ', flag);
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
                    user : 'sp832154@gmail.com', // replace with your email address
                    pass : process.env.EMAIL_PWD // replace with your email password
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
                    console.log('Second: ', flag);
                    resolve(true); // Resolve the promise with the email response
                }
            });            
        }

    });
};


// exports.SendEmailOfForgotpassword = async (id, to, subject,token) =>
// {
//     return new Promise(async (resolve, reject) =>
//     {
//         const transporter = nodemailer.createTransport 
//         ({
//             // service: 'Gmail', // replace with your email service provider
//             port : 465,    // -> True for 465, false for other ports
//             host : "smtp.gmail.com",
//             auth :
//             {
//                 user : 'sp832154@gmail.com', // replace with your email address
//                 pass : process.env.EMAIL_PWD // replace with your email password
//             },
//             secure : true,  
//         });
//         const mailOptions =  
//         {
//             from : process.env.EMAIL, // replace with your email address
//             to : to, // recipient's email address
//             subject : subject,
//             // text : `${process.env.PORT_SP}/reset-password/${id}/${token}`
//             html: `
//                 <p>Hello,</p> 
//                 <p>We received a request to reset your password. Please click the link below to reset your password:</p>
//                 <p><a href="${process.env.PORT_SP}/reset-password/${id}/${token}">Reset Password</a></p>
//             `
        
//         };
//         transporter.sendMail(mailOptions, (error, info) => 
//         {
//             if(error)
//             {        
//                 resolve(false);
//             }
//             else
//             {
           
//                 resolve(true); // Resolve the promise with the email response
//             }
//         });

//     })
    

// }

