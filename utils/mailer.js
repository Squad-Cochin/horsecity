const nodemailer = require('nodemailer');
const commonfetching = require('../utils/helper/commonfetching');
const quote = require('../../horsecity/models/quotation/quotation');
require('dotenv').config()

exports.SendEmail = async (id, to, text, subject) =>
{
    return new Promise(async (resolve, reject) =>
    {
        let invoiceData = await commonfetching.getOneInvoice(id);
        //console.log('Invoice Data: ', invoiceData);
        
        // Function to generate the table rows for vehicle details
        function generateVehicleRows(vehicles) 
        {
            let vehicleRows = '';
            vehicles.forEach((vehicle, index) =>
            {
                vehicleRows += `
                <tr style="text-align: center; height: 40px;">
                    <td class="text-center">${index + 1}</td>
                    <td class="text-center">${vehicle.pickup_location}</td>
                    <td class="text-center">${vehicle.vehicle_number}</td>
                    <td class="text-center">${vehicle.driver_name}</td>
                    <td class="text-center">${vehicle.drop_location}</td>
                </tr>`;
            });
            return vehicleRows;
        }

        function generatePaymentDetails(payments)
        {
            let paymentRows = '';
            if (payments.length > 0) 
            {
                paymentRows += `
                <tr style="background-color: #cecccc;height: 50px; text-align: center; ">
                    <th>#</th>
                    <th>Recieved Money</th>
                    <th>Received Date</th>
                    <th>Remaining Amount</th>
                </tr>`;    
                payments.forEach((payment, index) =>
                {
                    paymentRows +=`
                    <tr style="text-align: center; height: 40px;" key=${index}>
                        <td>${index + 1}</td>
                        <td>${payment.received_amount} AED</td>
                        <td>${payment.received_date}</td>\]=[-p0]
                        <td>${payment.remaining_amount} AED</td>
                    </tr>`;
                });
            }
            return paymentRows;
        }

        function generateInvoiceHTML(invoiceData)
        {
            // Call the functions to generate vehicle and payment details
            const vehicleRows = generateVehicleRows(invoiceData.vehicles);
            const paymentDetails = generatePaymentDetails(invoiceData.payment);      
            // Generate the complete HTML content using the provided invoiceData and the generated vehicleRows and paymentDetails
            const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Invoice</title>
        </head>
        <body style="color: #666; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.6em; overflow-x: hidden; background-color: #ffffff;">
        <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="min-width:100%; margin: 0pt auto; padding: 0px; font-family: Arial,Helvetica,sans-serif; font-size: 13px;border: 1px solid;padding: 5px 5px;">
        <tbody>
        <tr>
            <td valign="top" bgcolor="#ffffff">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td>
                                <div style="padding: 8px; text-align:left;"><a target="_blank" title="Horse City" href=""><img  border="0" height="50"  alt="Horse City" src="D:\Saurabh Own Assignments\Horsecity\download.png" /></a></div>
                            </td>
                            <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:30px;">INVOICE</div>
                            </td>                  
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td valign="top" bgcolor="#ffffff">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td>
                                <div style="width: 285px;background-color: #bdbababd;border-radius: 15px; margin: 0 15px;">&nbsp;</div>
                            </td>
                            <td>
                                <div style="padding: 3px; text-align:right;color: #000;font-size:15px;">Invoice No : <b>${invoiceData.invoice[0].iId}</b></div>
                            </td>
                            <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;">Date : <b>${invoiceData.invoice[0].iDate}</b></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td valign="top" bgcolor="#ffffff">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td>
                                <div style="padding: 8px; text-align:left;color: #000;font-size:15px;"><b>Invoice To :</b></div>
                            </td>
                            <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;"><b>Pay To :</b></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">${invoiceData.invoice[0].customer_name}</div>
                            </td>
                            <td>
                                <div style="padding:0 10px; text-align:right;color: #000;font-size:13px;">${invoiceData.invoice[0].service_provider_name}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">${invoiceData.invoice[0].customerAddress}</div>
                            </td>
                            <td>
                                <div style="padding: 0 10px; text-align:right;color: #000;font-size:13px;">${invoiceData.invoice[0].companyAddress}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">${invoiceData.invoice[0].cusCountry}</div>
                            </td>
                            <td>
                                <div style="padding: 0 10px; text-align:right;color: #000;font-size:13px;">${invoiceData.invoice[0].comCountry}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="padding: 0 10px 25px; text-align:left;color: #000;font-size:13px;">${invoiceData.invoice[0].customer_email}</div>
                            </td>
                            <td>
                                <div style="padding: 0 10px 25px; text-align:right;color: #000;font-size:13px;">${invoiceData.invoice[0].com_email}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td valign="top" style="background-color: #ffffff; color: #000;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #b7a2a2; border-radius: 4px;">
                    <tr style="background-color: #cecccc;height: 50px; text-align: center; ">
                        <th>#</th>
                        <th>Pick Up Location</th>
                        <th>Vehicle Number</th>
                        <th>Driver Name</th>
                        <th>Drop Location</th>
                    </tr>
                    ${vehicleRows}         
                </table>
            </td>
        </tr>
        <tr style="padding-top: 10px;">&nbsp;</tr>
            <tr>      
                <td valign="top" style="background-color: #ffffff; color: #000;">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" >
                        <tr style="text-align: center; height: 60px;">
                            <td>
                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>&nbsp;</tr>
                                    <tr style="text-align: left; ">
                                        <th><b>Other Information</b> </th>
                                    </tr>       
                                    <tr style="text-align: left;">
                                        <td> <div style="padding: 0 10px;">Horse - ${invoiceData.invoice[0].no_of_horse}</div></td>
                                    </tr>        
                                    <tr style="text-align: left;">
                                        <td><div style="padding: 0 10px;"> Special Requirement : ${invoiceData.invoice[0].special_requirement} </div> </td>
                                    </tr>
                              </table>
                            </td>
                            <td>
                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>&nbsp;</tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tr>&nbsp;</tr>
                                            <tr>
                                                <th><div style="padding: 0 10px;"><b>Subtotal</b></div></th>
                                                <th><div style="padding: 0 10px;"><b>${invoiceData.invoice[0].iSubTotal} AED</b></div></th>
                                            </tr>
                                            <tr style="text-align: center;">
                                                <td><div style="padding: 0 10px;">Discount <span style="color: #9d9d9d;;">(${invoiceData.invoice[0].iDiscountRate} %)</span></div></td>
                                                <td><div style="padding: 0 10px;">- ${invoiceData.invoice[0].iDiscountAmount} AED </div></td>
                                            </tr>
                                            <tr style="text-align: center;">
                                                <td>Tax <span style="color: #9d9d9d;;">(${invoiceData.invoice[0].iTaxRate} %)</span></td>
                                                <td>+ ${invoiceData.invoice[0].iTaxAmount} AED </td>
                                            </tr>
                                            <tr style="text-align: center;">
                                                <td><div style="font-size: 15px; margin-bottom: 20px;"><b>Grand Total </b></div></td>
                                                <td><div style="font-size: 15px; margin-bottom: 20px;"><b>${invoiceData.invoice[0].iFinalAmount} AED</b></div> </td>
                                            </tr>
                                        </table>
                                    </td>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>     
            </tr>
            <tr style="padding-top: 10px;">&nbsp;</tr>
            <tr>
                <td valign="top" style="background-color: #ffffff; color: #000;">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #b7a2a2; border-radius: 4px;">
                    ${paymentDetails}
                    </table>
                </td>
            </tr>
        </tbody>
        </table>
        </body>
        </html>`;
        return htmlContent;
        }
      
      // Example usage: Assuming you have the invoiceData object containing invoice, vehicles, and payment details.
      
      const htmlContent = generateInvoiceHTML(invoiceData);
    //   console.log(htmlContent)
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
            // text : 'Hello' 
        };
        transporter.sendMail(mailOptions, (error, info) => 
        {
            if(error)
            {
                console.log(error);             
                resolve(false);
            }
            else
            {
                console.log('Email sent:', info.response);
                resolve(true); // Resolve the promise with the email response
            }
        });
    });
};  



exports.SendEmailOfQuotation = async (id, to, text, subject) =>
{
    return new Promise(async (resolve, reject) =>
    {
        
        const quoteData = await quote.getOneQuotation(id);
        console.log(`One Quotation Data: `, quoteData);

      // Function to generate the table rows for vehicle details

      function generateInvoiceHTML(quoteData) 
      {
        // Generate the complete HTML content using the provided invoiceData and the generated vehicleRows and paymentDetails
        let htmlContent = `<!DOCTYPE html>
        <html>
           <head>
              <meta charset="UTF-8">
              <title>Quotation</title>
           </head>
           <body style="color: #666; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.6em; overflow-x: hidden; background-color: #ffffff;">
            
        <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style=" margin: 0pt auto; padding: 0px; font-family: Arial,Helvetica,sans-serif; font-size: 13px;border: 1px solid;padding: 40px 5px;">
            <tbody>
              
               <tr>
                <td valign="top" bgcolor="#ffffff">
                   <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tbody>
                         <tr>
                            <td>
                                <div style="padding: 8px; text-align:left;"><a target="_blank" title="Horse City" href=""><img  border="0" height="110"  alt="Horse City" src="D:Saurabh Own AssignmentsHorsecitydownload.png" /></a></div>
                            </td>
                            <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:30px;">QUOTATION</div>
                             </td>
                          
                         </tr>
                      </tbody>
                   </table>
                </td>
             </tr>
             <tr>
                <td valign="top" bgcolor="#ffffff">
                   <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tbody>
                         <tr>
                            <td>
                                <div style="width: 250px;background-color: #bdbababd;border-radius: 15px; margin: 0 15px;">&nbsp;</div>
                            </td>
                            <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;">Quotation No : <b>INV6</b></div>
                             </td>
                             <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;">Date : <b>03-08-2023 </b></div>
                             </td>
                          
                         </tr>
                      </tbody>
                   </table>
                </td>
             </tr>
        
        
             <tr>
                <td valign="top" bgcolor="#ffffff">
                   <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tbody>
                        <tr>
                           <td>
                                <div style="padding: 8px; text-align:left;color: #000;font-size:15px;"><b>Customer Details:</b></div>
                            </td>
                            <td>
                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;"><b>Service Provider Details :</b></div>
                            </td>
                         </tr>
                         <tr>
                          <td>
                               <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Name</div>
                           </td>
                           <td>
                               <div style="padding:0 10px; text-align:right;color: #000;font-size:13px;">Name:Admin</div>
                           </td>
                        </tr>
                         <tr>
                            <td>
                                 <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Shubman Gill</div>
                             </td>
                             <td>
                              <div style="padding: 0 10px; text-align:right;color: #000;font-size:13px;">Vehicle Number :MH01-1234</div>
                          </td>
                            
                          </tr>
                          <tr>
                            <td>
                                 <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Dubai </div>
                             </td>
                             <td>
                                 <div style="padding: 0 10px; text-align:right;color: #000;font-size:13px;">Make :BMW</div>
                             </td>
                          </tr>
                          <tr>
                            <td>
                                 <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">UAE</div>
                             </td>
                           
                          </tr>
                          <tr>
                            <td>
                                 <div style="padding: 0 10px 25px; text-align:left;color: #000;font-size:13px;">sg@gmail.com</div>
                             </td>
                          
                          </tr>
                      </tbody>
                   </table>
                </td>
             </tr>
             <tr>
                <td valign="top" bgcolor="#ffffff">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr>
                        <td valign="top" style="width: 50%;">
                          <table cellspacing="0" cellpadding="0" border="0" >
                            <tbody>
                                  <tr style=" text-align: left; padding: 5px;">
                                    <th>
                                      <div style="padding: 8px; text-align:left;color: #000;font-size:16px;"><b>Requirement : </b></div>
                                    </th>    
                                   </tr>
        
                                   <tr style=" text-align: left; padding: 5px;">
                                    <th>
                                    <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Special Requirment </div>
                                    </th>    
                                  </tr>
        
                                  <tr style=" text-align: left; padding: 5px;">
                                    <th>
                                    <div style="padding:0 8px; text-align:left;color: #2c2b2b;font-size:13px;">test 01 </div>
                                    </th>    
                                  </tr>
        
                                  <tr style=" text-align: left; padding: 5px;">
                                    <th>
                                    <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Additional Service </div>
                                    </th>    
                                  </tr>
        
                                  <tr style=" text-align: left; padding: 5px;">
                                    <th>
                                    <div style="padding:0 8px; text-align:left;color: #2c2b2b;font-size:13px;">test 02 </div>
                                    </th>    
                                  </tr>
                            </tbody>
                         </table>
                        </td>
                      
                        <td valign="top" style="width: 50%; background-color: #ffffff; color: #000;">
                          <table cellspacing="0" cellpadding="0" border="0" style="width: 100%; border-radius: 4px;">
                              <tbody>
                                <tr style="background-color: #d7d4d4;height: 50px; text-align: left; padding: 5px;">
                                   <th>
                                    <div style="padding: 8px; text-align:left;color: #000;font-size:15px;"><b>Quotation Summary</b></div>
                                   </th>    
                               </tr>
                                <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Trip Type: GCC </div>
                                  </th>    
                                </tr>
        
                                <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Pickup Location : UAE</div>
                                  </th>    
                                 </tr>
        
                                 <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Pickup Date : 12/04/2023</div>
                                  </th>    
                                </tr>
        
                                <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Pickup Time : 10 AM</div>
                                  </th>    
                                 </tr>
        
                                 <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Drop Location : UAE</div>
                                  </th>    
                                 </tr>
        
                                 <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Drop Date : 13/04/2023</div>
                                  </th>    
                                </tr>
        
                                <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Drop Time : 4 PM</div>
                                  </th>    
                                 </tr>
        
                                 <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                  <th>
                                  <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Number of Horses : 2</div>
                                  </th>    
                                 </tr>
        
                                 <tr>
                                  <td valign="top" bgcolor="#ffffff">
                                    <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                                      <tbody>
                                        <tr style="background-color: #d7d4d4;">
                                          <td>
                                            <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Transportation Insurance</div>
                                          </td>
                                          <td> <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Yes</div></td>
                                        </tr>
        
                                        <tr style="background-color: #d7d4d4;">
                                          <td>
                                            <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Tax</div>
                                          </td>
                                          <td> <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">58.80</div></td>
                                        </tr>
        
                                        <tr style="background-color: #d7d4d4;"> 
                                          <td>
                                            <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Discount</div>
                                          </td>
                                          <td> <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">24.00</div></td>
                                        </tr>
        
                                        <tr style="background-color: #d7d4d4;">
                                          <td>
                                            <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Final Amount</div>
                                          </td>
                                          <td> <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">1234.80</div></td>
                                        </tr>
                                      
        
                                      </tbody>
                                    </table> 
                                   </td> 
        
                                 </tr>
        
        
        
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  
                    </tbody>
                  </table>    
                </td>
             </tr>
        
            
             
            
               <tr style="padding-top: 10px;">&nbsp;</tr>
            </tbody>
         </table>
           </body>
        </html>`;
      
        return htmlContent;
      }
      
      // Example usage: Assuming you have the invoiceData object containing invoice, vehicles, and payment details.
      
      const htmlContent = generateInvoiceHTML(quoteData);
      console.log(htmlContent)
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
                console.log(error);             
                resolve(false);
            }
            else
            {
                console.log("haiii");
                console.log('Email sent:', info.response);
                resolve(true); // Resolve the promise with the email response
            }
        });
    });
};   