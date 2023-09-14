/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const objectConvertor = require('../../utils/objectConvertor');
const mail = require('../../utils/mailer'); // Importing the fucntion. Which will be used for sending invoice on email 
const commonfetching = require('../../utils/helper/commonfetching'); // helper file function. This file consist of functions Which is written universally for fetching the data from the database
const commonoperation = require('../../utils/helper/commonoperation'); // helper file function. This file consist of functions Which is written universally for some common operations.
const constants = require('../../utils/constants'); // Constant elements are stored in this file
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection

module.exports = class invoices
{
    constructor(){}

    /**
     * The below model is getting all the invoices. This function will executed when we will call this model from the controller.
     * We need three thing from the controller to execute this funtion. They are
     * 1. page number
     * 2. page size
     * 3. Id
     */
    static async getall(pageNumber, pageSize, Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id, r.id AS role_id, r.name FROM ${constants.tableName.service_providers} sp, ${constants.tableName.roles} r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                       resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.superAdmin)
                    {

                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT i.id, i.invoice_no, i.quotation_prefix_id, c.name, c.email, i.status
                                        FROM ${constants.tableName.invoices} i
                                        JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                        JOIN ${constants.tableName.customers} c ON q.customer_id = c.id
                                        WHERE i.deleted_at IS NULL
                                        LIMIT ${pageSize} OFFSET ${offset}`;
                        const count = await commonoperation.totalCount(constants.tableName.invoices);
                        con.query(selQuery, async (err, result2) =>
                        {
                            if(err)
                            {
                                console.error(err);
                                resolve('err');
                            }
                            let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                            FROM ${constants.tableName.permissions} AS pm
                            JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                            JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                            WHERE pm.role_id = '${result[0].role_id}' AND md.name = 'INVOICES' `;
                            con.query(Query, (err, moduleResult) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    const data =  objectConvertor.getAllInvoice(result2)
                                    if(result2.length === 0)
                                    {
                                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data, module : moduleResult});
                                    }
                                    else
                                    {
                                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data, module : moduleResult});
                                    }
                                }
                            });
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT i.id, i.invoice_no, i.quotation_prefix_id, c.name, c.email, i.status
                                        FROM ${constants.tableName.invoices} i
                                        JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                        JOIN ${constants.tableName.customers} c ON q.customer_id = c.id
                                        WHERE i.deleted_at IS NULL 
                                        AND i.service_provider_id = ${Id}
                                        LIMIT ${pageSize} OFFSET ${offset}`;
                        const count = await commonoperation.totalCountServiceProvider(constants.tableName.invoices, Id);
                        con.query(selQuery, async (err, result2) =>
                        {
                            if(err)
                            {
                                resolve('err');
                            }
                            let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                            FROM ${constants.tableName.permissions} AS pm
                            JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                            JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                            WHERE pm.role_id = '${result[0].role_id}' AND md.name = 'INVOICES' `;
                            con.query(Query, (err, moduleResult) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    const data =  objectConvertor.getAllInvoice(result2)
                                    if(result2.length === 0)
                                    {
                                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data, module : moduleResult});
                                    }
                                    else
                                    {
                                        resolve ({totalCount : count[0]['count(t.id)'], invoices : data, module : moduleResult});
                                    }
                                }
                            });
                        });
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
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "getall". Which is designed to fetch all the data of invoices.`, error);
        }
    };

    /**
     * The below model is for getting all the details of a  invoice. This model will be executed when the controller will call this.
     * We need the invoice id from the controller to execute this function
     */
    static async getone(Id) 
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let invoiceResponse = await commonfetching.getOneInvoice(Id)
                resolve(invoiceResponse);
            });
        }
        catch (error)
        {
            return 'err';
        }    
    };

    /**
     * the below static function is for adding the payment in the database for a  invoice. 
     * We require two things to execute this below function
     * 1.   Id
     * 2.   payment
     */
    static async enteramountforparticularinvoice(Id, payment)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                if (payment < 0)
                {
                    resolve('lessThanZero');
                }
                else
                {
                    const data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id');
                    if(data.length == 0)
                    {
                        resolve('nodata');
                    }
                    else
                    {
                        let paymentRecordData = await commonfetching.dataOnCondition(constants.tableName.payment_records, Id, 'invoice_id')
                        if(paymentRecordData[0].invoice_id == Id && paymentRecordData[0].updated_at === null)
                        {
                            let ra = paymentRecordData[0].total_amount - payment
                            let upQuery = `UPDATE ${constants.tableName.payment_records} pr SET pr.invoice_prefix_id = '${paymentRecordData[0].invoice_prefix_id}', pr.received_amount = ${payment}, pr.received_date = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', pr.remaining_amount = ${ra}, pr.status = '${constants.status.partPaid}', pr.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE pr.invoice_id = ${Id}`;
                            con.query(upQuery, (err, result) =>
                            {                            
                                if(result.affectedRows > 0)
                                {
                                    resolve('affectedRows')
                                }
                                else
                                {
                                    resolve('err');
                                }
                            });
                        }
                        else
                        {
                            let latestData = `SELECT * FROM ${constants.tableName.payment_records} WHERE invoice_id = '${Id}' ORDER BY remaining_amount ASC LIMIT 1`;
                            con.query(latestData, (err, result) =>
                            {
                                let ra = result[0].remaining_amount - payment
                                if(ra > 0)
                                {
                                    let insQuery = `INSERT INTO ${constants.tableName.payment_records}(invoice_id, invoice_prefix_id, total_amount, received_amount, received_date, remaining_amount, status, created_at, updated_at) VALUES(${Id}, '${result[0].invoice_prefix_id}', ${result[0].total_amount}, ${payment}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', ${ra}, '${constants.status.partPaid}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    con.query(insQuery, (err, result) =>
                                    {
                                        if(result.affectedRows > 0)
                                        {
                                            resolve('affectedRows')
                                        }
                                        else
                                        {
                                            resolve('err');
                                        }
                                    });
                                }
                                if(ra == 0)
                                {
                                    let insQuery = `INSERT INTO ${constants.tableName.payment_records}(invoice_id, invoice_prefix_id, total_amount, received_amount, received_date, remaining_amount, status, created_at, updated_at) VALUES(${Id}, '${result[0].invoice_prefix_id}', ${result[0].total_amount}, ${payment}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', ${ra}, '${constants.status.paid}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                    con.query(insQuery, (err, insResult) =>
                                    {
                                        if(insResult.affectedRows > 0)
                                        {
                                            let updateBookingTable = `  UPDATE ${constants.tableName.bookings} b 
                                                                        SET b.status = '${constants.status.paid}',
                                                                        b.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                                                        WHERE b.inv_id = ${Id}
                                                                        AND b.invoice_prefix_id = '${result[0].invoice_prefix_id}' 
                                                                        AND (b.booking_status <> '${constants.vehicles_breakouts_status.break_out}'
                                                                        OR b.booking_status <> '${constants.booking_status.completed}') 
                                                                        AND b.status = '${constants.status.pending}' `
                                            con.query(updateBookingTable, (err, upBoResult) =>
                                            {
                                                if(upBoResult.affectedRows > 0)
                                                {
                                                    resolve('fullypaid');
                                                }
                                                else
                                                {
                                                    resolve('err');
                                                }
                                            });
                                        }
                                        else
                                        {
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
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "enteramountforinvoice". Which is designed to fetch all the data of invoices.`, error);
        }
    };

    /**
     * The below static function is for getting payment histroy for a  invoice.
     * We need the invoice id from the controller to execute this function
     */
    static async getpaymenthistroyofinvoice(Id)
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
            console.log(`Error from invoice.model.js. It is in the folder models > invoices > invoice.model.js. In the static function "getpaymenthistroyofinvoice". Which is designed to fetch all the data of invoices.`, error);
        }
    };

    /**
     * The below static function is for getting latest payment payed for a  invoice.
     * We need the invoice id from the controller to execute this function
     */
    static async getlatestpaymenthistroy(Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let latdate = ` SELECT p.invoice_id, p.total_amount, p.remaining_amount FROM ${constants.tableName.payment_records} p 
                                WHERE p.invoice_id  = ${Id} 
                                ORDER BY remaining_amount ASC LIMIT 1`
                con.query(latdate, (err, result) =>
                {
                    if(result.length != 0)
                    {
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

    /**
     * The below static function is for sending invoice on email.
     * We need three thing from the controller to execute this funtion. They are
     * 1. Id
     * 2. to
     * 3. subject
     */
    static async sendemailatinvoice(id, to, subject)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const emailSent = await mail.SendEmail(id, to, subject, constants.tableName.invoices);
                if(emailSent === false)
                {
                    resolve(false)
                }
                if(emailSent === true)
                {
                    resolve(true);
                }
            });            
        }
        catch(error)
        {
            console.log(`Error from the try catch block of the sendemailatinvoice`, error);
        }
    };

    /**
     * The below static function is for getting the data for the send email button
     * We need the invoice id from the controller to execute this function
     */
    static async getsendemailbuttondata(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `SELECT i.id, i.invoice_no, t.subject, c.email, t.template
                FROM ${constants.tableName.customers} c, ${constants.tableName.invoices} i, ${constants.tableName.quotations} q, templates t
                WHERE i.id = ${Id} 
                AND c.id = q.customer_id 
                AND q.id = i.quot_id 
                AND t.subject = '${process.env.TemplateInvoiceConditionName}'`;
                con.query(selQuery,(err, result) =>
                {
                    if(result.length != 0)
                    {
                        resolve(result);
                    }
                    else
                    {
                        resolve('err')
                    }
                });
            });            
        }
        catch(error)
        {
            
        }
    };

    /**
     * The below static function is for starting the trip. 
     * This function can be executed only once for a  invoice id.  
     * We need the invoice id from the controller to execute this function
     */
    static async bookingstart(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id')

                let data3 = await commonfetching.dataOnCondition(constants.tableName.bookings, data[0].invoice_no, 'invoice_prefix_id')
                if(data3.length != 0)
                {
                    resolve('duplicate');
                }
                else
                {
                    let data2 = await commonfetching.dataOnCondition(constants.tableName.quotations, data[0].quot_id, 'id');

                    const insQuery = `INSERT INTO ${constants.tableName.bookings}(customer_id, inv_id, invoice_prefix_id, service_provider_id, vehicle_id, driver_id, taxation_id, discount_type_id, status, booking_status, pickup_location, pickup_country, pickup_date, pickup_time, drop_location, drop_country, drop_date, drop_time ,confirmation_sent, sub_total, tax_amount, discount_amount, final_amount, created_at) VALUES(${data2[0].customer_id}, ${data[0].id}, '${data[0].invoice_no}', ${data[0].service_provider_id}, ${data[0].vehicle_id}, ${data[0].driver_id}, ${data2[0].taxation_id}, ${data2[0].discount_type_id}, 'PENDING', 'CONFIRM', '${data[0].pickup_point}', '${data2[0].pickup_country}', '${time.changeDateToSQLFormat(data2[0].pickup_date)}', '${data2[0].pickup_time}','${data[0].drop_point}', '${data2[0].drop_country}', '${time.changeDateToSQLFormat(data2[0].drop_date)}', '${data2[0].drop_time}', 'YES',  ${data[0].sub_total},  ${data[0].tax_amount},  ${data[0].discount_amount},  ${data[0].final_amount}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                    con.query(insQuery, (err, result) =>
                    {
                        if(result === 'undefined')
                        {
                            resolve('NotEntered')
                        }

                        if(err)
                        {
                            resolve('err')
                        }
                        if(result.affectedRows > 0)
                        {
                            let upQuery = `UPDATE ${constants.tableName.invoices} i SET i.status = 'STARTED', i.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE i.id = ${Id}`;
                            con.query(upQuery, (err, result2) =>
                            {
                                if(err)
                                {
                                    resolve('err')
                                }
                                if(result2.affectedRows > 0)
                                {
                                    resolve('Entered')
                                }
                                if(result2 === 'undefined')
                                {
                                    resolve('NotEntered')
                                }
                            });                            
                        }
                    });
                };
            });
        }
        catch(error)
        {
            console.log(`Error form the model function bookingStared`);
        }
    }

    /**
     * The below static function is for canceling the trip.
     * This function can be executed only once for a invoice id.   
     * We need the invoice id from the controller to execute this function
     */
    static async bookingcancel(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject) =>
            {
                let data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id');
                let data3 = await commonfetching.dataOnCondition(constants.tableName.bookings, data[0].invoice_no, 'invoice_prefix_id')
                if(data3.length != 0)
                {
                    resolve('duplicate');
                }
                else
                {
                    let data2 = await commonfetching.dataOnCondition(constants.tableName.quotations, data[0].quot_id, 'id');
                    const insQuery = `INSERT INTO ${constants.tableName.bookings}(customer_id, inv_id, invoice_prefix_id, service_provider_id, vehicle_id, driver_id, taxation_id, discount_type_id, status, booking_status, pickup_location, pickup_country, pickup_date, pickup_time, drop_location, drop_country, drop_date, drop_time ,confirmation_sent, sub_total, tax_amount, discount_amount, final_amount, created_at, deleted_at) VALUES(${data2[0].customer_id}, ${data[0].id}, '${data[0].invoice_no}', ${data[0].service_provider_id}, ${data[0].vehicle_id}, ${data[0].driver_id}, ${data2[0].taxation_id}, ${data2[0].discount_type_id}, '${constants.booking_status.cancelled}', '${constants.booking_status.cancelled}', '${data[0].pickup_point}', '${data2[0].pickup_country}', '${time.changeDateToSQLFormat(data2[0].pickup_date)}', '${data2[0].pickup_time}','${data[0].drop_point}', '${data2[0].drop_country}', '${time.changeDateToSQLFormat(data2[0].drop_date)}', '${data2[0].drop_time}', 'YES',  ${data[0].sub_total},  ${data[0].tax_amount},  ${data[0].discount_amount},  ${data[0].final_amount}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                    con.query(insQuery, (err, result) =>
                    {
                        if(result === 'undefined')
                        {
                            resolve('NotEntered');
                        }
                        if(err)
                        {
                            resolve('err');
                        }
                        if(result.affectedRows > 0)
                        {
                            let upQuery = `UPDATE ${constants.tableName.invoices} i SET i.status = '${constants.status.inactive}', i.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE i.id = ${Id}`;
                            con.query(upQuery, (err, result2) =>
                            {
                                if(err)
                                {
                                    resolve('err')
                                }
                                if(result2.affectedRows > 0)
                                {
                                    let upQuery2 = `UPDATE ${constants.tableName.payment_records} p SET p.status = '${constants.booking_status.cancelled}', p.deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', p.received_amount = '0.00', p.remaining_amount = '0.00' WHERE p.invoice_id = ${Id} AND p.updated_at IS NULL AND p.deleted_at IS NULL`;
                                    con.query(upQuery2, (err, result3) =>
                                    {
                                        if(err)
                                        {
                                            resolve('err')
                                        }
                                        if(result3 === 'undefined')
                                        {
                                            resolve('NotEntered');
                                        }
                                        if(result3.affectedRows > 0)
                                        {
                                            resolve('Entered');
                                        }                                        
                                    });
                                }
                                if(result2 === 'undefined')
                                {
                                    resolve('NotEntered')
                                }
                            });                            
                        }
                    });
                }                
            });            
        }
        catch (error)
        {
            console.log(`Error from the booking cancel.`, error);            
        }
    };
};





