const nodemailer = require('nodemailer');
const commonfetching = require('../utils/helper/commonfetching');
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

      const quoteData =
      {
        "quotation": [{
                    "id": 22,
                    "quotation_id": "QUO21",
                    "trip_type": "PRIVATE",
                    "pickup_country": "UAE",
                    "pickup_location": "Dubai ",
                    "pickup_date": "02-08-2023",
                    "pickup_time": "13:09:00",
                    "drop_country": "UAE",
                    "drop_location": "Burj Khalifa",
                    "drop_date": "02-08-2023",
                    "drop_time": "23:15:00",
                    "no_of_horse": 2,
                    "special_requirement": "Blenders Pride",
                    "additional_service": "Desi",
                    "transportation_insurance_coverage": "TRUE",
                    "sub_total": "0.00",
                    "tax_amount": "53.90",
                    "discount_amount": "22.00",
                    "final_amount": "1131.90",
                    "customer_id": 23,
                    "customer_email": "sg@gmail.com",
                    "customer_user_name": "young",
                    "customer_contact_no": "+971501234788",
                    "customer_id_proof_no": "1432791225125",
                    "service_provider_name": "Admin",
                    "service_provider_id": 1,
                    "enquiry_date": "26-07-2023",
                    "vehicle_number": "MH01 GH 1410",
                    "customer_name": "Shubman Gill",
                    "make": "BMW",
                    "vehicle_id": 4,
                    "driver_id": 2,
                    "driver_name": "john",
                    "discount_type_id": 1,
                    "driver_amount": "100.00",
                    "vehicle_amount": "1000.00"
                }
            ],
            "tax": [
                {
                    "id": 5,
                    "type": "PERCENTAGE",
                    "name": "Test",
                    "value": "5.00"
                }
            ]
        }

      // Function to generate the table rows for vehicle details

      function generateInvoiceHTML(quoteData) 
      {
        // Call the functions to generate vehicle and payment details

        // Generate the complete HTML content using the provided invoiceData and the generated vehicleRows and paymentDetails
        let htmlContent = `<!DOCTYPE html>
        <html>
        <head>
        <style>
              @media (min-width: 768px) {
                  .extra-width {
                      min-width: 750px;
                  }
                  
                  .tm_container {
                      max-width: 880px;
                      margin-left: auto;
                      margin-right: auto;
                      position: relative;
                  }
                  
                  .tm_invoice_wrap {
                      position: relative;
                  }
                  
                  .tm_invoice_in {
                      position: relative;
                      z-index: 100;
                  }
                  
                  .tm_invoice_seperator {
                      height: 18px;
                      border-radius: 1.6em;
                      -webkit-box-flex: 1;
                      -ms-flex: 1;
                      flex: 1;
                      margin-right: 20px;
                  }
                  
                  p {
                      display: block;
                      margin-block-start: 1em;
                      margin-block-end: 1em;
                      margin-inline-start: 0px;
                      margin-inline-end: 0px;
                  }
                  
                  p, div {
                      margin-top: 0;
                      margin-bottom: 0;
                      line-height: 1.5em;
                  }
                  
                  div {
                      display: block;
                  }
                  
                  .tm_gray_bg {
                      background: #c9c9cae5;
                  }
                  
                  body, html {
                      color: #666;
                      font-family: 'Inter', sans-serif;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 1.6em;
                      overflow-x: hidden;
                      background-color: #f5f6fa;
                  }
                  
                  .tm_align_center {
                      -webkit-box-align: center;
                      -ms-flex-align: center;
                      align-items: center;
                  }
                  
                  .tm_invoice.tm_style1 .tm_invoice_info_list {
                      display: -webkit-box;
                      display: -ms-flexbox;
                      display: flex;
                  }
                  
                  .tm_width_3 {
                      width: 25%;
                  }
                  
                  .tm_width_2 {
                      width: 16.66666667%;
                  }
                  
                  .tm_text_right {
                      text-align: right;
                  }
                  
                  .tm_width_1 {
                      width: 8.33333333%;
                  }
                  
                  .tm_invoice_footer {
                      display: -webkit-box;
                  }
                  
                  .tm_invoice_footer {
                      -webkit-box-orient: vertical;
                      -webkit-box-direction: reverse;
                      flex-direction: column-reverse;
                  }
                  
                  .tm_padd_15_20 {
                      padding: 15px 20px;
                  }
                  
                  .tm_invoice_footer .tm_left_footer {
                      width: 58%;
                      padding: 10px 15px;
                      -webkit-box-flex: 0;
                      flex: none;
                  }
                  
                  td {
                      border-top: 1px solid #dbdfea;
                  }
                  
                  .tm_invoice.tm_style1 .tm_invoice_info {
                      display: -webkit-box;
                      display: -ms-flexbox;
                      display: flex;
                      -webkit-box-align: center;
                      -ms-flex-align: center;
                      align-items: center;
                      -webkit-box-pack: justify;
                      -ms-flex-pack: justify;
                      justify-content: space-between;
                  }
                  
                  .tm_invoice.tm_style1 .tm_invoice_head {
                      display: flex;
                      -webkit-box-pack: justify;
                      justify-content: space-between;
                  }
                  
                  .tm_mb10 {
                      margin-bottom: 10px;
                  }
                  
                  td {
                      padding: 10px 15px;
                      line-height: 1.55em;
                  }
                  
                  td {
                      border-top: 1px solid #dbdfea;
                  }
                  
                  .tm_align_center {
                      -webkit-box-align: center;
                      -ms-flex-align: center;
                      align-items: center;
                  }
                  
                  .tm_mb20 {
                      margin-bottom: 20px;
                  }
                  
                  .tm_mb2 {
                      margin-bottom: 2px;
                  }
                  
                  *,
                  ::after,
                  ::before {
                      box-sizing: border-box;
                  }
                  
                  div {
                      display: block;
                  }
                  
                  .tm_mb2 {
                      margin-bottom: 2px;
                  }
                  
                  .tm_m0 {
                      margin: 0px;
                  }
                  
                  .tm_m0 {
                      margin: 0px;
                  }
                  
                  .tm_invoice .tm_right_footer {
                      width: 100%;
                  }
                  
                  .tm_invoice_footer .tm_right_footer {
                      width: 42%;
                  }
                  
                  p {
                      display: block;
                      margin-block-start: 1em;
                      margin-block-end: 1em;
                      margin-inline-start: 0px;
                      margin-inline-end: 0px;
                  }
                  
                  .tm_primary_color {
                      color: #111;
                  }
                  
                  .tm_border_none {
                      border: none !important;
                  }
                  
                  .tm_bold {
                      font-weight: 700;
                  }
                  
                  .tm_ternary_color {
                      color: #b5b5b5;
                  }
                  
                  .tm_border_top {
                      border-top: 1px solid #dbdfea;
                  }
                  
                  .tm_border_bottom {
                      border-bottom: 1px solid #dbdfea;
                  }
                  
                  tr {
                      display: table-row;
                      vertical-align: inherit;
                      border-color: inherit;
                  }
                  
                  .tm_border_top_0 {
                      border-top: 0;
                  }
                  
                  .tm_f16 {
                      font-size: 16px;
                  }
                  
                  .tm_pt0 {
                      padding-top: 0;
                  }
                  
                  b,
                  strong {
                      font-weight: bold;
                  }
                  
                  .tm_invoice_head {
                      display: flex;
                      justify-content: space-between;
                  }
                  
                  .tm_invoice_section {
                      flex-basis: 50%;
                  }
                  
                  ul {
                      padding-left: 15px;
                  }
                  
                  ul {
                      padding-left: 20px;
                      list-style: disc;
                  }
                  
                  .tm_invoice_to {
                      text-align: left;
                  }
                  
                  .tm_pay_to {
                      text-align: right;
                      padding-left: 20px;
                      /* Add left padding for spacing */
                  }
                  
                  .tm_invoice_head {
                      width: 100%;
                      flex-basis: 100%;
                  }
                  
                  .tm_table_responsive {
                      overflow-x: auto;
                  }
                  
                  .tm_round_border {
                      border: 1px solid #dbdfea;
                      overflow: hidden;
                      border-radius: 6px;
                  }
                  
                  .tm_mb5 {
                      margin-bottom: 5px;
                  }
                  
                  .tm_mb3 {
                      margin-bottom: 30px;
                  }
                  
                  .tm_invoice_padd {
                      padding: 10px 31px;
                      line-height: 1.55em;
                  }
                  
                  .tm_invoice_padd3 {
                      padding: 10px 31px;
                      line-height: 1.55em;
                      white-space: nowrap;
                  }
                  
                  .no-padding {
                      padding: 0;
                  }
                  
                  th {
                      padding: 10px 0px;
                      line-height: 1.55em;
                  }
                  
                  th {
                      text-align: left;
                  }
                  
                  .tm_primary_color {
                      color: #111;
                  }
                  
                  .tm_width_4 {
                      width: 20.33333333%;
                  }
      
                  .tm_width_5 {
                    width: 16.33333333%;
                  }
                  
                  table {
                      width: 100%;
                      caption-side: bottom;
                      border-collapse: collapse;
                  }
                  
                  .tm_table_wrapper {
                      clear: both;
                      margin-top: 20px;
                  }
                  
                  .tm_clearfix {
                      clear: both;
                  }
                  
                  .tm_card_footer {
                      margin-top: 20px;
                  }
                  
                  .tm_card_footer_item {
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 10px;
                  }
                  
                  .tm_card_footer_label {
                      font-weight: bold;
                  }
                  
                  .tm_card_content {
                      .tm_card_item {
                          display: flex;
                          margin-bottom: 10px;
                      }
                      
                      .tm_card_label {
                          font-weight: bold;
                          margin-right: 10px;
                      }
                  }
                  
                  .tm_card {
                      background-color: #f7f7f7;
                      border-radius: 4px;
                      padding: 20px;
                      margin-bottom: 20px;
                  }
                  
                  .tm_card_header {
                      font-weight: bold;
                      font-size: 18px;
                      margin-bottom: 10px;
                  }
                  
                  .vehicle-details {
                      margin-bottom: 20px;
                  }
                  
                  h3 {
                      margin: 0;
                  }
                  
                  .image-size {
                      width: 50px;
                      height: 50px;
                      object-fit: cover;
                  }
                  
                  .uploaded-images {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 20px;
                  }
                  
                  img {
                      width: 100%;
                      height: auto;
                  }
              }
          </style>
        </head>
        <body>
            <div class="modal extra-width" style="display: block;">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <form class="tablelist-form">
                            <div class="modal-body">
                                <div class="tm_container">
                                    <div class="tm_quotations_wrap">
                                        <div class="tm_quotations tm_style1" id="tm_download_section">
                                            <div class="tm_quotations_in">
                                                <div class="tm_quotations_head tm_align_center tm_mb20">
                                                    <div class="tm_quotations_left">
                                                        <div class="tm_logo">
                                                            <img src="D:\Horsecity2\horsecity\horsecity\src\assets\images\black-logo.png" alt="Logo" style="height: 50px; width: 50px;" />
                                                        </div>
                                                    </div>
                                                    <div class="tm_quotations_right tm_text_right">
                                                        <div class="tm_primary_color tm_f50 tm_text_uppercase" style="font-size: 50px;">
                                                            <font size="6">QUOTATION</font>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tm_quotations_info tm_mb20">
                                                    <div class="tm_quotations_seperator tm_gray_bg" style="height: 18px; border-radius: 1.6em; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; margin-right: 20px;"></div>
                                                    <div class="tm_quotations_info_list">
                                                        <p class="tm_quotations_number tm_m0 ms-2">
                                                            Quotation No: <b id="QuotationId" class="tm_primary_color ms-2" style="font-size: 14px; font-weight: 700;">${quoteData.quotation[0].quotation_id}</b>
                                                        </p>&nbsp;&nbsp;&nbsp;
                                                        <p class="tm_quotations_date tm_m0 ms-2">
                                                            Enquiry Date: <b id="eDate" class="tm_primary_color ms-2" style="font-size: 14px; font-weight: 700;">${quoteData.quotation[0].enquiry_date}</b>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="tm_quotations_head tm_mb10">
                                                    <div class="tm_quotations_section tm_quotations_to">
                                                        <p class="tm_mb2">
                                                            <b class="tm_primary_color">Customer Details:</b>
                                                        </p>
                                                        <div>
                                                            <p>
                                                                Name:<pre id="customerName" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].customer_name}</pre><br />
                                                                Email: <pre id="customerEmail" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].customer_email}</pre><br />
                                                                Username: <pre id="customerUsername" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].customer_user_name}</pre><br />
                                                                Phone: <pre id="customerNumber" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].customer_contact_no}</pre><br />
                                                                Id Proof No: <pre id="customerID" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].customer_id_proof_no}</pre>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="tm_quotations_section tm_pay_to">
                                                        <p class="tm_mb2">
                                                            <b class="tm_primary_color">Service Provider Details:</b>
                                                        </p>
                                                        <p>
                                                            <b>Name: </b> <pre id="sProviderName" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].service_provider_name}</pre><br />
                                                            <b>Vehicle Number: </b> <pre id="sVehicleNumber" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].vehicle_number}</pre><br />
                                                            <b>Make: </b> <pre id="vManufacturer" style="margin-top: 0; margin-bottom: 0; line-height: 1.5em; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].make}</pre><br />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="tm_quotations_footer">
                                                    <div class="tm_left_footer">
                                                        <p class="tm_mb2">
                                                            <b class="tm_primary_color">Requirements:</b>
                                                        </p>
                                                        <p class="tm_m0">
                                                            <h5 style="margin: 0;">Special Requirements :</h5> <pre id="spclReq" style="margin: 0; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].special_requirement}</pre><br />
                                                            <h5 style="margin: 0;">Additional Service :</h5> <pre id="additionalReq" style="margin: 0; font-size: 14px; font-weight: 400;">${quoteData.quotation[0].additional_service}</pre>
                                                        </p>
                                                    </div>
                                                    <div class="tm_right_footer">
                                                        <div class="tm_card" style="background-color: #f7f7f7; border-radius: 4px; padding: 20px; margin-bottom: 20px;">
                                                            <div class="tm_card_header" style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">
                                                                Quotation Summary
                                                            </div>
                                                            <div class="tm_card_content">
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Trip Type:
                                                                    </span>
                                                                    <span class="tm_card_value" id="trip_type" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].trip_type}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Pickup Location:
                                                                    </span>
                                                                    <span class="tm_card_value" id="pickup_location" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].pickup_location}</span>
                                                                    <span class="tm_card_value" id="pickupcountry" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].pickup_country}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Pickup Date:
                                                                    </span>
                                                                    <span class="tm_card_value" id="pickup_date" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].pickup_date}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Pickup Time:
                                                                    </span>
                                                                    <span class="tm_card_value" id="pickup_time" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].pickup_time}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Drop Location:
                                                                    </span>
                                                                    <span class="tm_card_value" id="pickup_time" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].pickup_time}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Drop Time:
                                                                    </span>
                                                                    <span class="tm_card_value" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].drop_time}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Drop Date:
                                                                    </span>
                                                                    <span class="tm_card_value" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].drop_date}</span>
                                                                </div>
                                                                <div class="tm_card_item">
                                                                    <span class="tm_card_label">
                                                                        Number of Horses:
                                                                    </span>
                                                                    <span class="tm_card_value" style="font-size: 14px; font-weight: 400;">${quoteData.quotation[0].no_of_horse}</span>
                                                                </div>
                                                            </div>
                                                            <div class="tm_card_footer">
                                                                <div class="tm_card_footer_item">
                                                                    <span class="tm_card_footer_label">
                                                                        Transportation Insurance:
                                                                    </span>
                                                                    <span class="tm_card_footer_value" style="font-weight: bold;">${quoteData.quotation[0].transportation_insurance_coverage}</span>
                                                                </div>
                                                                <div class="tm_card_footer_item">
                                                                    <span class="tm_card_footer_label">
                                                                        Tax:
                                                                    </span>
                                                                    <span class="tm_card_footer_value" style="font-weight: bold;">${quoteData.quotation[0].tax_amount}</span>
                                                                </div>
                                                                <div class="tm_card_footer_item">
                                                                    <span class="tm_card_footer_label">
                                                                        Discount:
                                                                    </span>
                                                                    <span class="tm_card_footer_value" style="font-weight: bold;">${quoteData.quotation[0].discount_amount}</span>
                                                                </div>
                                                                <div class="tm_card_footer_item">
                                                                    <span class="tm_card_footer_label tm_bold">
                                                                        Final Amount:
                                                                    </span>
                                                                    <span class="tm_card_footer_value tm_bold">${quoteData.quotation[0].final_amount}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
      
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