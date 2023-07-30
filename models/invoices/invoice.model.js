/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs');
const objectConvertor = require('../../utils/objectConvertor');
const { SendEmail } = require('../../utils/mailer');

module.exports = class invoices
{
    constructor(){}

    static async getall(pageNumber, pageSize)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                const offset = (pageNumber - 1) * pageSize;

                let selQuery = `SELECT i.id, i.invoice_no, q.quotation_id, c.name, c.email
                                FROM invoices i
                                JOIN bookings b ON i.booking_id = b.id
                                JOIN quotations q ON b.quot_id = q.id
                                JOIN customers c ON q.customer_id = c.id
                                WHERE i.deleted_at IS NULL
                                LIMIT ${pageSize} OFFSET ${offset}`;

                // console.log('Selquery of invoice: ',selQuery);

                const count = await commonoperation.totalCount(constants.tableName.invoices);
                con.query(selQuery, async (err, result) =>
                {
                    if(err)
                    {
                        console.error(err);
                        resolve('err');
                    }
                    const data =  objectConvertor.getAllInvoice(result)
                    if(result.length === 0)
                    {
                        // console.log(`totalCount = ${count}, invoices = ${data}`);
                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data});
                    }
                    else
                    {
                        // console.log(`totalCount = ${count}, invoices = ${data}`);
                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data});
                    }
                });
            });            
        }
        catch (error)
        {
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "getall". Which is designed to fetch all the data of invoices.`, error);
        }
    };





    static async getone(Id) {
        try {
            return await new Promise((resolve, reject) => {
                let selQuery = `SELECT i.id,
                    i.invoice_no AS iId,
                    DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                    c.name AS customer_name,
                    sp.name AS companyName,
                    q.pickup_location AS customerAddress,
                    sp.contact_address AS companyAddress,
                    q.pickup_country AS cusCountry,
                    q.drop_country AS comCountry,
                    c.email AS customer_email,
                    sp.email AS com_email,
                    i.sub_total AS iSubTotal,
                    t.value AS iTaxRate,
                    i.tax_amount AS iTaxAmount,
                    d.rate AS iDiscountRate,
                    i.discount_amount AS iDiscountAmount,
                    i.final_amount AS iFinalAmount,
                    sp.name AS service_provider_name,
                    b.quot_id AS quotation_id,
                    q.pickup_location,
                    q.drop_location,
                    DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                    DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                    q.special_requirement,
                    e.no_of_horse,
                    pr.total_amount,
                    COALESCE(pr.received_amount, 0) AS received_amount,
                    DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                    COALESCE(pr.remaining_amount, 0) AS remaining_amount
             FROM bookings b
             JOIN invoices i ON i.booking_id = b.id
             JOIN customers c ON c.id = b.customer_id
             JOIN quotations q ON b.quot_id = q.id
             JOIN service_providers sp ON b.service_provider_id = sp.id
             JOIN taxations t ON t.id = b.taxation_id
             JOIN discount_types d ON d.id = b.discount_type_id
             JOIN enquiries e ON e.id = q.enquiry_id
             JOIN payment_records pr ON pr.invoice_id = i.id
             WHERE i.id = ${Id}`;
                // console.log(selQuery);
                con.query(selQuery, (err, result) => {
                    if (err) {
                        console.log(err);
                        resolve('err');
                    } else {
                        let invoiceResponse = {
                            "invoice": [],
                            "payment": []
                        };
    
                        if (result.length !== 0) 
                        {
                            
                            // If result has data, populate the invoiceResponse data and payment arrays
                            invoiceResponse.invoice.push({
                                "id": result[0].id,
                                "iId": result[0].iId,
                                "iDate": result[0].iDate,
                                "customer_name": result[0].customer_name,
                                "companyName": result[0].companyName,
                                "customerAddress": result[0].customerAddress,
                                "companyAddress": result[0].companyAddress,
                                "cusCountry": result[0].cusCountry,
                                "comCountry": result[0].comCountry,
                                "customer_email": result[0].customer_email,
                                "com_email": result[0].com_email,
                                "iSubTotal": result[0].iSubTotal,
                                "iTaxRate": result[0].iTaxRate,
                                "iTaxAmount": result[0].iTaxAmount,
                                "iDiscountRate": result[0].iDiscountRate,
                                "iDiscountAmount": result[0].iDiscountAmount,
                                "iFinalAmount": result[0].iFinalAmount,
                                "service_provider_name": result[0].service_provider_name,
                                "quotation_id": result[0].quotation_id,
                                "pickup_location": result[0].pickup_location,
                                "drop_location": result[0].drop_location,
                                "pickup_date": result[0].pickup_date,
                                "drop_date": result[0].drop_date,
                                "special_requirement": result[0].special_requirement,
                                "no_of_horse": result[0].no_of_horse
                            });
    
                            for (let row of result) {
                                invoiceResponse.payment.push({
                                    "id": row.id,
                                    "total_amount": row.iFinalAmount,
                                    "received_amount": row.received_amount,
                                    "received_date": row.received_date,
                                    "remaining_amount": row.remaining_amount
                                });
                            }
                        }    
                        resolve(invoiceResponse);
                    }
                });
            });
        } catch (error) {
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "getone". Which is designed to fetch all the data of invoices.`, error);
        }
    };
    

    static async addinvoice(Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT MAX(id) AS latest_id FROM ${constants.tableName.invoices}`
                con.query(selQuery, async (err, invoice_no) =>
                {
                    if (invoice_no.length != 0) 
                    {
                        /**If the database is empty take 1 */
                        let id = (invoice_no [0].latest_id !== null) ? invoice_no [0].latest_id : 1;
                        /***For selecting quotation prefix */
                        let selQuery = `SELECT a.invoice_prefix FROM ${constants.tableName.application_settings} a`
                        con.query(selQuery, async (err, result) => 
                        {
                            if (result.length != 0)
                            {
                                /**Adding prefix */
                                /** default 1 dont requires to add + 1  */
                                let invoice_no = (id == 1) ? id : id + 1;
                                let invoice_prefix = result[0]?.result
                                let sum_invoice = invoice_prefix.concat(invoice_no);
                                
                                let selQuery = ``;
                            }
                            else
                            {
                                resolve(false)
                            }
                        });
                    }
                    else
                    {
                        resolve(false)
                    }
                });
            });
        }
        catch(error)
        {
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "addinvoice". Which is designed to fetch all the data of invoices.`, error);
        }
    };

    // static async enteramountforparticularinvoice(Id, amount) {
    //     try {
    //       const data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id');
    //       if (data.length === 0) {
    //         return 'nodata';
    //       }
      
    //       // Fetch the latest payment record for the given invoice Id
    //       const letPaymentRecord = await commonfetching.dataOnCondition(constants.tableName.payment_records, Id, 'invoice_id');
    //       if (letPaymentRecord.length === 0 || letPaymentRecord[0].status === constants.status.paid) {
    //         // No payment record exists or invoice is already paid, update the existing or insert a new record
    //         const ra = data[0].final_amount - amount;
    //         const status = (ra === 0) ? constants.status.paid : constants.status.partPaid;
    //         const received_date = time.getFormattedUTCTime(constants.timeOffSet.UAE);
      
    //         let insQuery = '';
    //         if (letPaymentRecord.length === 0) {
    //           // Insert a new payment record
    //           insQuery = `INSERT INTO ${constants.tableName.payment_records} (invoice_id, total_amount, received_amount, received_date, remaining_amount, status) 
    //                       VALUES (${Id}, ${data[0].final_amount}, ${amount}, '${received_date}', ${ra}, '${status}')`;
    //         } else {
    //           // Update the existing payment record
    //           insQuery = `UPDATE payment_records 
    //                       SET received_amount = ${amount},
    //                           received_date = '${received_date}',
    //                           remaining_amount = ${ra},
    //                           status = '${status}'
    //                       WHERE invoice_id = ${Id}`;
    //         }
      
    //         con.query(insQuery, (err, result) => {
    //           if (err) {
    //             console.log(err);
    //             console.log('Error while updating/inserting payment record');
    //             resolve('err');
    //           } else {
    //             console.log('Enter amount data added/updated successfully');
    //             resolve(result);
    //           }
    //         });
    //       } else {
    //         // A payment record exists and invoice is not fully paid, handle additional scenarios here if needed
    //         console.log('Additional handling for non-paid invoice');
    //         resolve('additional_handling');
    //       }
    //     } catch (error) {
    //       console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "enteramountforparticularinvoice". Which is designed to fetch all the data of invoices.`, error);
    //     }
    //   };
      


    static async enteramountforparticularinvoice(Id, amount)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                if (amount < 0)
                {
                    resolve('lessThanZero');
                }
                else
                {
                    const data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id');
                    if(data.length === 0)
                    {
                        resolve('nodata');
                    }
                    else
                    {
                        let paymentRecordData = await commonfetching.dataOnCondition(constants.tableName.payment_records, Id, 'invoice_id')
                        // console.log('Payment Record Date: ', paymentRecordData);
                        
                        if(paymentRecordData[0].invoice_id == Id && paymentRecordData[0].updated_at === null)
                        {
                            let ra = paymentRecordData[0].total_amount - amount
                            let upQuery = `UPDATE ${constants.tableName.payment_records} pr SET pr.received_amount = ${amount}, pr.received_date = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', pr.remaining_amount = ${ra}, pr.status = '${constants.status.partPaid}', pr.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE pr.invoice_id = ${Id}`;
                            // console.log(upQuery);
                            con.query(upQuery, (err, result) =>
                            {                            
                                if(result.affectedRows > 0)
                                {
                                    console.log('Update query executed, That means the entry is done by first time');
                                    resolve('affectedRows')
                                }
                                else
                                {
                                    console.log(`Error while updating the query that me at the first time`);
                                    console.log(err);
                                    resolve('err');
                                }
                            });
                        }
                        else
                        {
                            // console.log('Amount:', amount);
                            let latestData = `SELECT * FROM payment_records WHERE invoice_id = '${Id}' ORDER BY remaining_amount ASC LIMIT 1`;
                            con.query(latestData, (err, result) =>
                            {
                                // console.log('Latest Data: ', result);
                                let ra = result[0].remaining_amount - amount
                                // console.log('ra: ', ra);
                                if(ra > 0)
                                {
                                    let insQuery = `INSERT INTO ${constants.tableName.payment_records}(invoice_id, total_amount, received_amount, received_date, remaining_amount, status, created_at, updated_at) VALUES(${Id}, ${result[0].total_amount}, ${amount}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', ${ra}, '${constants.status.partPaid}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    // console.log(insQuery);
                                    con.query(insQuery, (err, result) =>
                                    {
                                        if(result.affectedRows > 0)
                                        {
                                            console.log('Insert query executed, Payment is still partially paid');
                                            resolve('affectedRows')
                                        }
                                        else
                                        {
                                            console.log(`Error while inserting the query that me payment is tiall partially paid`);
                                            console.log(err);
                                            resolve('err');
                                        }
                                    });
                                }
                                if(ra == 0)
                                {
                                    let insQuery = `INSERT INTO ${constants.tableName.payment_records}(invoice_id, total_amount, received_amount, received_date, remaining_amount, status, created_at, updated_at) VALUES(${Id}, ${result[0].total_amount}, ${amount}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', ${ra}, '${constants.status.paid}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    // console.log(insQuery);
                                    con.query(insQuery, (err, result) =>
                                    {
                                        if(result.affectedRows > 0)
                                        {
                                            console.log('Insert query executed, Payment is fully made');
                                            resolve('fullypaid')
                                        }
                                        else
                                        {
                                            console.log(`Error while inserting the query that me payment is fully made`);
                                            console.log(err);
                                            resolve('err');
                                        }
                                    });
                                }
                                if(ra < 0)
                                {
                                    resolve('moreThanActualAmount');
                                }
                            });
                        }                    
                    } 
                }
            });
        }
        catch (error)
        {
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "enteramountforparticularinvoice". Which is designed to fetch all the data of invoices.`, error);
        }
    };


    static async getpaymenthistroyofparticularinvoice(Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                const data = await commonfetching.dataOnCondition(constants.tableName.payment_records, Id, 'invoice_id');
                if(data.length === 0)
                {
                    return 'nodata';
                }
                else
                {
                    resolve(data);
                }            
            });
        }
        catch (error)
        {
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "getpaymenthistroyofparticularinvoice". Which is designed to fetch all the data of invoices.`, error);
        }
    };

    static async getlatestpaymenthistroy(Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let latdate = `SELECT p.invoice_id, p.total_amount, p.remaining_amount FROM ${constants.tableName.payment_records} p WHERE p.invoice_id  = ${Id} ORDER BY remaining_amount ASC LIMIT 1`
                // console.log(latdate);
                con.query(latdate, (err, result) =>
                {
                    if(result.length != 0)
                    {
                        // console.log('Date Fetched: ');
                        resolve(result);
                    }
                    if(result.length == 0)
                    {
                        resolve(resolve);
                    }
                    else
                    {
                        resolve('err')
                    }
                });
            });
        }
        catch (error)
        {

        }
    };



    static async sendemailatinvoice(to, subject, body)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const emailSent = await SendEmail(to, body, subject);
                if(emailSent === false)
                {
                    console.log(`Error while sending the email from the model function`);
                    resolve(false)
                }
                if(emailSent === true)
                {
                    // console.log('True');
                    // console.log(`Email send successfully from the model`);
                    resolve(true);
                }
            });            
        }
        catch(error)
        {
            console.log(`Error from the try catch block of the sendemailatinvoice`, error);
        }
    };










    static async getsendemailbuttondata(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT i.id, i.invoice_no, t.subject, c.email
                FROM customers c, invoices i, quotations q, templates t, bookings b
                WHERE i.id = ${Id} AND t.name = 'Invoice email sent' AND c.id = q.customer_id AND b.quot_id = q.id AND i.booking_id = b.id;`;
                con.query(selQuery,(err, result) =>
                {
                    // console.log(`Email details: `, result);
                    if(result.length != 0)
                    {
                        console.log('Send email button data for the invoice page fetched successfully');
                        resolve(result);
                    }
                    else
                    {
                        console.log(err);
                        console.log('Error while fetching the email details');
                        resolve('err')
                    }
                });
            });            
        }
        catch(error)
        {
            
        }
    };




};






