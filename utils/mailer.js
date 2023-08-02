const nodemailer = require('nodemailer');
require('dotenv').config()

exports.SendEmail = (to,text,subject) =>
{
    return new Promise((resolve, reject) =>
    {

        // let = `<!DOCTYPE html>
        // <html>
        // <head>
        //     <meta charset="UTF-8">
        //     <title>Invoice</title>
        //     <style>
        //         @media (min-width: 768px) {
        //             .extra-width {
        //                 min-width: 750px;
        //             }
                    
        //             .tm_container {
        //                 max-width: 880px;
        //                 margin-left: auto;
        //                 margin-right: auto;
        //                 position: relative;
        //             }
                    
        //             .tm_invoice_wrap {
        //                 position: relative;
        //             }
                    
        //             .tm_invoice_in {
        //                 position: relative;
        //                 z-index: 100;
        //             }
                    
        //             .tm_invoice_seperator {
        //                 height: 18px;
        //                 border-radius: 1.6em;
        //                 -webkit-box-flex: 1;
        //                 -ms-flex: 1;
        //                 flex: 1;
        //                 margin-right: 20px;
        //             }
                    
        //             p {
        //                 display: block;
        //                 margin-block-start: 1em;
        //                 margin-block-end: 1em;
        //                 margin-inline-start: 0px;
        //                 margin-inline-end: 0px;
        //             }
                    
        //             p, div {
        //                 margin-top: 0;
        //                 margin-bottom: 0;
        //                 line-height: 1.5em;
        //             }
                    
        //             div {
        //                 display: block;
        //             }
                    
        //             .tm_gray_bg {
        //                 background: #c9c9cae5;
        //             }
                    
        //             body, html {
        //                 color: #666;
        //                 font-family: 'Inter', sans-serif;
        //                 font-size: 14px;
        //                 font-weight: 400;
        //                 line-height: 1.6em;
        //                 overflow-x: hidden;
        //                 background-color: #f5f6fa;
        //             }
                    
        //             .tm_align_center {
        //                 -webkit-box-align: center;
        //                 -ms-flex-align: center;
        //                 align-items: center;
        //             }
                    
        //             .tm_invoice.tm_style1 .tm_invoice_info_list {
        //                 display: -webkit-box;
        //                 display: -ms-flexbox;
        //                 display: flex;
        //             }
                    
        //             .tm_width_3 {
        //                 width: 25%;
        //             }
                    
        //             .tm_width_2 {
        //                 width: 16.66666667%;
        //             }
                    
        //             .tm_text_right {
        //                 text-align: right;
        //             }
                    
        //             .tm_width_1 {
        //                 width: 8.33333333%;
        //             }
                    
        //             .tm_invoice_footer {
        //                 display: -webkit-box;
        //             }
                    
        //             .tm_invoice_footer {
        //                 -webkit-box-orient: vertical;
        //                 -webkit-box-direction: reverse;
        //                 flex-direction: column-reverse;
        //             }
                    
        //             .tm_padd_15_20 {
        //                 padding: 15px 20px;
        //             }
                    
        //             .tm_invoice_footer .tm_left_footer {
        //                 width: 58%;
        //                 padding: 10px 15px;
        //                 -webkit-box-flex: 0;
        //                 flex: none;
        //             }
                    
        //             td {
        //                 border-top: 1px solid #dbdfea;
        //             }
                    
        //             .tm_invoice.tm_style1 .tm_invoice_info {
        //                 display: -webkit-box;
        //                 display: -ms-flexbox;
        //                 display: flex;
        //                 -webkit-box-align: center;
        //                 -ms-flex-align: center;
        //                 align-items: center;
        //                 -webkit-box-pack: justify;
        //                 -ms-flex-pack: justify;
        //                 justify-content: space-between;
        //             }
                    
        //             .tm_invoice.tm_style1 .tm_invoice_head {
        //                 display: flex;
        //                 -webkit-box-pack: justify;
        //                 justify-content: space-between;
        //             }
                    
        //             .tm_mb10 {
        //                 margin-bottom: 10px;
        //             }
                    
        //             td {
        //                 padding: 10px 15px;
        //                 line-height: 1.55em;
        //             }
                    
        //             td {
        //                 border-top: 1px solid #dbdfea;
        //             }
                    
        //             .tm_align_center {
        //                 -webkit-box-align: center;
        //                 -ms-flex-align: center;
        //                 align-items: center;
        //             }
                    
        //             .tm_mb20 {
        //                 margin-bottom: 20px;
        //             }
                    
        //             .tm_mb2 {
        //                 margin-bottom: 2px;
        //             }
                    
        //             *,
        //             ::after,
        //             ::before {
        //                 box-sizing: border-box;
        //             }
                    
        //             div {
        //                 display: block;
        //             }
                    
        //             .tm_mb2 {
        //                 margin-bottom: 2px;
        //             }
                    
        //             .tm_m0 {
        //                 margin: 0px;
        //             }
                    
        //             .tm_m0 {
        //                 margin: 0px;
        //             }
                    
        //             .tm_invoice .tm_right_footer {
        //                 width: 100%;
        //             }
                    
        //             .tm_invoice_footer .tm_right_footer {
        //                 width: 42%;
        //             }
                    
        //             p {
        //                 display: block;
        //                 margin-block-start: 1em;
        //                 margin-block-end: 1em;
        //                 margin-inline-start: 0px;
        //                 margin-inline-end: 0px;
        //             }
                    
        //             .tm_primary_color {
        //                 color: #111;
        //             }
                    
        //             .tm_border_none {
        //                 border: none !important;
        //             }
                    
        //             .tm_bold {
        //                 font-weight: 700;
        //             }
                    
        //             .tm_ternary_color {
        //                 color: #b5b5b5;
        //             }
                    
        //             .tm_border_top {
        //                 border-top: 1px solid #dbdfea;
        //             }
                    
        //             .tm_border_bottom {
        //                 border-bottom: 1px solid #dbdfea;
        //             }
                    
        //             tr {
        //                 display: table-row;
        //                 vertical-align: inherit;
        //                 border-color: inherit;
        //             }
                    
        //             .tm_border_top_0 {
        //                 border-top: 0;
        //             }
                    
        //             .tm_f16 {
        //                 font-size: 16px;
        //             }
                    
        //             .tm_pt0 {
        //                 padding-top: 0;
        //             }
                    
        //             b,
        //             strong {
        //                 font-weight: bold;
        //             }
                    
        //             .tm_invoice_head {
        //                 display: flex;
        //                 justify-content: space-between;
        //             }
                    
        //             .tm_invoice_section {
        //                 flex-basis: 50%;
        //             }
                    
        //             ul {
        //                 padding-left: 15px;
        //             }
                    
        //             ul {
        //                 padding-left: 20px;
        //                 list-style: disc;
        //             }
                    
        //             .tm_invoice_to {
        //                 text-align: left;
        //             }
                    
        //             .tm_pay_to {
        //                 text-align: right;
        //                 padding-left: 20px;
        //                 /* Add left padding for spacing */
        //             }
                    
        //             .tm_invoice_head {
        //                 width: 100%;
        //                 flex-basis: 100%;
        //             }
                    
        //             .tm_table_responsive {
        //                 overflow-x: auto;
        //             }
                    
        //             .tm_round_border {
        //                 border: 1px solid #dbdfea;
        //                 overflow: hidden;
        //                 border-radius: 6px;
        //             }
                    
        //             .tm_mb5 {
        //                 margin-bottom: 5px;
        //             }
                    
        //             .tm_mb3 {
        //                 margin-bottom: 30px;
        //             }
                    
        //             .tm_invoice_padd {
        //                 padding: 10px 31px;
        //                 line-height: 1.55em;
        //             }
                    
        //             .tm_invoice_padd3 {
        //                 padding: 10px 31px;
        //                 line-height: 1.55em;
        //                 white-space: nowrap;
        //             }
                    
        //             .no-padding {
        //                 padding: 0;
        //             }
                    
        //             th {
        //                 padding: 10px 0px;
        //                 line-height: 1.55em;
        //             }
                    
        //             th {
        //                 text-align: left;
        //             }
                    
        //             .tm_primary_color {
        //                 color: #111;
        //             }
                    
        //             .tm_width_4 {
        //                 width: 20.33333333%;
        //             }
        
        //             .tm_width_5 {
        //               width: 16.33333333%;
        //             }
                    
        //             table {
        //                 width: 100%;
        //                 caption-side: bottom;
        //                 border-collapse: collapse;
        //             }
                    
        //             .tm_table_wrapper {
        //                 clear: both;
        //                 margin-top: 20px;
        //             }
                    
        //             .tm_clearfix {
        //                 clear: both;
        //             }
                    
        //             .tm_card_footer {
        //                 margin-top: 20px;
        //             }
                    
        //             .tm_card_footer_item {
        //                 display: flex;
        //                 justify-content: space-between;
        //                 margin-bottom: 10px;
        //             }
                    
        //             .tm_card_footer_label {
        //                 font-weight: bold;
        //             }
                    
        //             .tm_card_content {
        //                 .tm_card_item {
        //                     display: flex;
        //                     margin-bottom: 10px;
        //                 }
                        
        //                 .tm_card_label {
        //                     font-weight: bold;
        //                     margin-right: 10px;
        //                 }
        //             }
                    
        //             .tm_card {
        //                 background-color: #f7f7f7;
        //                 border-radius: 4px;
        //                 padding: 20px;
        //                 margin-bottom: 20px;
        //             }
                    
        //             .tm_card_header {
        //                 font-weight: bold;
        //                 font-size: 18px;
        //                 margin-bottom: 10px;
        //             }
                    
        //             .vehicle-details {
        //                 margin-bottom: 20px;
        //             }
                    
        //             h3 {
        //                 margin: 0;
        //             }
                    
        //             .image-size {
        //                 width: 50px;
        //                 height: 50px;
        //                 object-fit: cover;
        //             }
                    
        //             .uploaded-images {
        //                 display: grid;
        //                 grid-template-columns: repeat(3, 1fr);
        //                 gap: 20px;
        //             }
                    
        //             img {
        //                 width: 100%;
        //                 height: auto;
        //             }
        //         }
        //     </style>
        // </head>
        // <body>
        //     <div class="tm_container">
        //         <div class="tm_invoice_wrap">
        //           <div class="tm_invoice tm_style1" id="tm_download_section">
        //             <div class="tm_invoice_in">
        //               <div class="tm_invoice_head tm_align_center tm_mb20">
        //                 <div class="tm_invoice_left">
        //                   <div class="tm_logo">
        //                     <img src="D:\Horsecity2\horsecity\horsecity\src\assets\images\black-logo.png" alt="Logo" style="height: 50px; width: 50px;" />
        //                   </div>
        //                 </div>
        //                 <div class="tm_invoice_right tm_text_right">
        //                   <div class="tm_primary_color tm_f50 tm_text_uppercase" style="font-size: 50px;">
        //                     <font size="6">INVOICE</font>
        //                   </div>
        //                 </div>
        //               </div>
        //           <div class="tm_invoice_info tm_mb20">
        //             <div class="tm_invoice_seperator tm_gray_bg"></div>
        //               <div class="tm_invoice_info_list">
        //                 <!-- Add this in your HTML where you want to display the Invoice Number -->
        //                 <p class="tm_invoice_number tm_m0">Invoice No: <b class="tm_primary_color" id="invoiceNumber">{invoice.iId}</b></p>&nbsp;&nbsp;&nbsp;
        //                 <p class="tm_invoice_date tm_m0"> Date: <b class="tm_primary_color" id="invoiceDate">{invoice.iDate}</b></p>
        //               </div>
        //             </div>
        //             <div class="tm_invoice_head tm_mb10">
        //               <div class="tm_invoice_section tm_invoice_to">
        //                 <p class="tm_mb2"><b class="tm_primary_color">Invoice To:</b></p>
        //                 <div>
        //                     <p id="customerName" style="margin: 0;">{invoice.customer_name}
        //                     <p id="customerAddress" style="margin: 0;">{invoice.customerAddress}</p>
        //                     <p id="cusCountry" style="margin: 0;">{invoice.cusCountry}</p>
        //                     <p id="customerEmail" style="margin: 0;">{invoice.customer_email}</p>
        //                 </div>                  
        //               </div>
        //               <div class="tm_invoice_section tm_pay_to">
        //                 <p class="tm_mb2"><b class="tm_primary_color">Pay To:</b></p>
        //                 <div>
        //                     <p id="companyName" style="margin: 0;">{invoice.companyName}
        //                     <p id="companyAddress" style="margin: 0;">{invoice.companyAddress}</p>
        //                     <p id="comCountry" style="margin: 0;">{invoice.comCountry}</p>
        //                     <p id="comEmail" style="margin: 0;">{invoice.com_email}</p>
        //                 </div> 
        //               </div>
        //             </div>
        //           </div>
        //           <div class="tm_table tm_style1 tm_mb3">
        //             <div class="tm_round_border">
        //               <div class="tm_table_responsive">
        //                 <table>
        //                   <thead>
        //                     <tr>
        //                       <th class="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd ">#</th>
        //                       <th class="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Pick Up Location</th>
        //                       <th class="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Vehicle Number</th>
        //                       <th class="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Driver Name</th>
        //                       <th class="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg text-center">Drop Location</th>
        //                     </tr>
        //                   </thead>
        //                   <tbody id="vehicleDetailsTableBody">
        //                     <tr key={index}>
        //                       <td class="tm_width_3">{index + 1}</td>
        //                       <td class="tm_width_4 text-center">{invoice.pickup_location}</td>
        //                       <td class="tm_width_2 text-center">{invoice.vehicle_number}</td>
        //                       <td class="tm_width_2 text-center">{invoice.driver_name}</td>
        //                       <td class="tm_width_1 text-center">{invoice.drop_location}</td>
        //                     </tr>
        //                   </tbody>
        //                 </table>
        //               </div>
        //             </div>
        //           </div>
        //           <div class="tm_invoice_footer">
        //             <div style="display: flex; justify-content: space-between;">
        //               <div style="width: 58%; padding: 10px 15px;">
        //                 <p style="margin-bottom: 2px;"><b style="color: #111;"> Other Information :</b></p>
        //                 <div>
        //                     <b style="color: #111;">Horse - </b> <span id="noOfHorse">{invoice.no_of_horse}</span><br>
        //                     <b style="color: #111;">Special Requirement - </b> <span id="specialRequirement">{invoice.special_requirement}</span>
        //                   </div>
                          
        //               </div>
        //               <div style="width: 42%;">
        //                 <table style="width: 100%; caption-side: bottom; border-collapse: collapse;">
        //                   <tbody>
        //                     <table style="width: 100%; caption-side: bottom; border-collapse: collapse;">
        //                     <tbody>
        //                        <table style="width: 100%; caption-side: bottom; border-collapse: collapse;">
        //                         <tbody>
        //                           <tr>
        //                             <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtotal</td>
        //                             <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold" colspan="3" id="subTotal">{invoice.iSubTotal}</td>
        //                           </tr>
        //                           <tr>
        //                             <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">Discount - <span class="tm_ternary_color" id="discountRate">{invoice.iDiscountRate}</span></td>
        //                             <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold" colspan="3" id="discountAmount">- {invoice.iDiscountAmount}</td>
        //                           </tr>
        //                           <tr>
        //                             <td class="tm_width_3 tm_primary_color tm_border_none tm_bold">Tax - <span class="tm_ternary_color" id="taxRate">{invoice.iTaxRate}%</span></td>
        //                             <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold" colspan="3" id="taxAmount">+ {invoice.iTaxAmount} AED</td>
        //                           </tr>
        //                           <tr class="tm_border_top tm_border_bottom">
        //                             <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">Grand Total</td>
        //                             <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right" colspan="3" id="finalAmount">{invoice.iFinalAmount} AED</td>
        //                           </tr>
        //                         </tbody>                      
        //                       </table>
        //                   </tbody>
        //                 </table>
        //               </div>
        //             </div>
        //           </div>
        //           <div class="tm_padd_15_20 no-padding tm_round_border .tm_table_responsive">
        //             <p class="tm_mb5"><b class="tm_primary_color"></b></p>
        //               <table>
        //                 <thead>
        //                   <tr>
        //                     <th class="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg tm_invoice_padd ">#</th>
        //                     <th class="tm_width_5 tm_semi_bold tm_primary_color tm_gray_bg text-center">Total Amount</th>
        //                     <th class="tm_width_5 tm_semi_bold tm_primary_color tm_gray_bg text-center">Recieved Money</th>
        //                     <th class="tm_width_5 tm_semi_bold tm_primary_color tm_gray_bg text-center">Received Date</th>
        //                     <th class="tm_width_5 tm_semi_bold tm_primary_color tm_gray_bg text-center">Remaining Amount</th>
        //                   </tr>
        //                 </thead>
        //                 <tbody id = "paymentDetailsTableBody">
        //                     <tr key = {index}>
        //                       <td class="tm_width_3 text-center">{index + 1}</td>
        //                       <td class="tm_width_2 text-center">'${invoice.total_amount}' AED</td>
        //                       <td class="tm_width_2 text-center">'${invoice.received_amount === 0 ? "0 AED" : '${invoice.received_amount} AED'}'</td>
        //                       <td class="tm_width_1 text-center">{invoice.received_amount === 0 ? "" : invoice.received_date}</td>
        //                       <td class="tm_width_2 text-center">{invoice.remaining_amount === 0 ? "0 AED" : '${invoice.remaining_amount} AED'}</td>
        //                     </tr>
        //                 </tbody>
        //               </table>
        //       </div>  
        //     </div>
        // </div>
        // <script>
            
        
        //   const vehicles = data.vehicles;
        //   const payments = data.payment;
        
        // // Function to set values dynamically based on key and element ID
        // function setElementValue(elementId, value) {
        //     const element = document.getElementById(elementId);
        //     if (element) {
        //       element.innerText = value;
        //     }
        //   }
        
        //   // Assuming 'data.invoice' contains an array of 500 objects
        //   const invoice = data.invoice[0]; // Assuming you have only one invoice in the array
        //   document.getElementById('discountAmount').innerText = `- ${invoice.iDiscountAmount} AED`;
        //   document.getElementById('discountRate').innerText = `(${invoice.iDiscountRate}%)`;
        //   document.getElementById('taxRate').innerText = `(${invoice.iTaxRate} %)`;
        //   document.getElementById('taxAmount').innerText = `+ ${invoice.iTaxAmount} AED`;
        //   document.getElementById('subTotal').innerText = `${invoice.iSubTotal} AED `;
        //   document.getElementById('finalAmount').innerText = `${invoice.iFinalAmount} AED`;
        //   document.getElementById('invoiceNumber').innerText = `${invoice.iId} `;
        
        
        //   // Set values for each element
        //   // setElementValue('invoiceNumber', invoice.iId);
        //   setElementValue('invoiceDate', invoice.iDate);
        //   setElementValue('pickupTime', invoice.pickup_time);
        //   setElementValue('dropTime', invoice.drop_time);
        //   setElementValue('customerName', invoice.customer_name);
        //   setElementValue('companyName', invoice.companyName);
        //   setElementValue('customerAddress', invoice.customerAddress);
        //   setElementValue('companyAddress', invoice.companyAddress);
        //   setElementValue('cusCountry', invoice.cusCountry);
        //   setElementValue('comCountry', invoice.comCountry);
        //   setElementValue('customerEmail', invoice.customer_email);
        //   setElementValue('comEmail', invoice.com_email);
        //   setElementValue('serviceProvider', invoice.service_provider_name);
        //   setElementValue('quotationId', invoice.quotation_id);
        //   setElementValue('pickupDate', invoice.pickup_date);
        //   setElementValue('dropDate', invoice.drop_date);
        //   setElementValue('specialRequirement', invoice.special_requirement);
        //   setElementValue('noOfHorse', invoice.no_of_horse);
          
        //   const vehicleDetailsTableBody = document.getElementById('vehicleDetailsTableBody');
        //   let vehicleDetailsHtml = '';
        
        //   vehicles.forEach((vehicle, index) => {
        //     vehicleDetailsHtml += `
        //       <tr>
        //         <td class="tm_width_3">${index + 1}</td>
        //         <td class="tm_width_4 text-center">${vehicle.pickup_location}</td> <!-- Fix the variable name here -->
        //         <td class="tm_width_2 text-center">${vehicle.vehicle_number}</td> <!-- Fix the variable name here -->
        //         <td class="tm_width_2 text-center">${vehicle.driver_name}</td> <!-- Fix the variable name here -->
        //         <td class="tm_width_1 text-center">${vehicle.drop_location}</td> <!-- Fix the variable name here -->
        //       </tr>
        //     `;
        //   });
        //   vehicleDetailsTableBody.innerHTML = vehicleDetailsHtml;
        
        //   // Populate payment details
        //   const paymentDetailsTableBody = document.getElementById('paymentDetailsTableBody');
        //   let paymentDetailsHtml = '';
        //   payments.forEach((payment, index) => {
        //     paymentDetailsHtml += `
        //       <tr>
        //         <td class="tm_width_3">${index + 1}</td>
        //         <td class="tm_width_3 text-center">${payment.total_amount} AED</td>
        //         <td class="tm_width_2 text-center">${payment.received_amount} AED</td>
        //         <td class="tm_width_1 text-center">${payment.received_date} AED</td>
        //         <td class="tm_width_2 text-center">${payment.remaining_amount} AED</td>      
        //       </tr>
        //     `;
        //   });
        //   paymentDetailsTableBody.innerHTML = paymentDetailsHtml
        
        // </script>
        // </body>
        // </html>`

        const transporter = nodemailer.createTransport 
        ({
            // service: 'Gmail', // replace with your email service provider
            port : 465,    // -> True for 465, false for other ports
            host : "smtp.gmail.com",
            auth :
            {
                user : process.env.EMAIL, // replace with your email address
                pass : process.env.EMAIL_PWD // replace with your email password
            },
            secure : true,  
        }); 
        const mailOptions = 
        {
            from : process.env.EMAIL, // replace with your email address
            to : to, // recipient's email address
            subject : subject,
            text : text 
        };
        
        transporter.sendMail(mailOptions, (error, info) => 
        {
            if(error)
            {
             
                resolve(false);
            }
            else
            {
                console.log("haiii");
                // console.log('Email sent:', info.response);
                resolve(true); // Resolve the promise with the email response
            }
        });
    });
};             