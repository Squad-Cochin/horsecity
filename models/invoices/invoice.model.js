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

                let selQuery = `SELECT i.invoice_no, q.quotation_id, c.name, c.email
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
                const data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id');
                if(data.length === 0)
                {
                    return data;
                }
                else
                {
                    console.log(data);
                    // let responseObj = objectConvertor.invoiceResponse(data)
                    // return responseObj;
                }            
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

    
        


}