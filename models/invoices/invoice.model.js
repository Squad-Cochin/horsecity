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
const { pastWorkHistroyResponse } = require('../../utils/objectConvertor');
const objectConvertor = require('../../utils/objectConvertor');

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
                        console.log(`totalCount = ${count}, invoices = ${data}`);
                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data});
                    }
                    else
                    {
                        console.log(`totalCount = ${count}, invoices = ${data}`);
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





    static async getone(Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT i.id, 
                i.invoice_no AS iId, 
                DATE_FORMAT(i.created_at, '%d-%m-%Y')AS iDate, 
                c.name AS customer_name, 
                sp.name AS companyName, 
                q.pickup_location AS customerAddress, 
                sp.contact_address AS companyAddress, 
                q.pickup_country AS cusCountry, 
                q.drop_country AS comCountry, 
                c.email AS customer_email, 
                sp.email AS com_email, 
                i.sub_total AS iSubTotal, 
                t.name AS iTaxRate, 
                i.tax_amount AS iTaxAmount, 
                d.rate AS iDiscountRate, 
                i.discount_amount AS iDiscountAmount, 
                i.final_amount AS iFinalAmount, 
                sp.name AS service_provider_name, 
                b.quot_id AS quotation_id 
                FROM bookings b
                JOIN invoices i ON i.booking_id = b.id
                JOIN customers c ON c.id = b.customer_id
                JOIN quotations q ON b.quot_id = q.id
                JOIN service_providers sp ON b.service_provider_id = sp.id
                JOIN taxations t ON t.id = b.taxation_id
                JOIN discount_types d ON d.id = b.discount_type_id
                WHERE i.id = ${Id} `;
                // console.log(selQuery);
                con.query(selQuery, async (err, result) =>
                {
                    if(err)
                    {
                        console.log(err);
                        resolve('err');
                    }
                    
                    if(result.length != 0)
                    {
                        console.log('Qyer executed data fetched');
                        resolve(result);
                    }
                    else
                    {
                        console.log('Query ewxecuted but no data');
                        resolve([]);
                    }
                });
                     
            });
        }
        catch (error)
        {
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


    static async enteramountforparticularinvoice(Id, amount)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                const data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id');
                if(data.length === 0)
                {
                    resolve('nodata');
                }
                else
                {
                    console.log(data);
                    let ra = data[0].final_amount - amount;
                    const status = (data[0].final_amount - amount) === 0 ? constants.status.paid : constants.status.partPaid;
                    const insQuery = `INSERT INTO payment_records(invoice_id, total_amount, received_amount, received_date, remaining_amount, status) VALUES (${data[0].id}, ${data[0].final_amount}, ${amount}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', ${ra}, '${status}')`;
                    console.log(insQuery);
                    con.query(insQuery, (err, result) =>
                    {
                        console.log('Enter Amount: ', result);
                        if (result.affectedRows > 0)
                        {
                            console.log('Enter amount data added successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            console.log('Error while Enter amount data');
                            resolve('err');
                        }                        
                    });                   
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
                    return data;
                }
                else
                {
                    console.log(data);
                }            
            });
        }
        catch (error)
        {
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "getpaymenthistroyofparticularinvoice". Which is designed to fetch all the data of invoices.`, error);
        }
    };


}