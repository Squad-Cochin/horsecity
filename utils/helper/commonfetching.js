/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avaoided.                                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

require('dotenv').config(); // Importing the env library
const con = require("../../configs/db.configs");  // Importing the database details
const time = require('./date'); // Importing the details of the time file.
const constants = require("../constants"); // Importing the details of the constants file.
const commonoperation = require('./commonoperation'); // Importing the commonoperation file
const objectConvertor = require('../objectConvertor'); // Importing the objectConvertor file.

let logo = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDYwQ0NFNDUxRjIyMTFFRUEwQ0VCODlENUJDMjk0RkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDYwQ0NFNDYxRjIyMTFFRUEwQ0VCODlENUJDMjk0RkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjBDQ0U0MzFGMjIxMUVFQTBDRUI4OUQ1QkMyOTRGRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjBDQ0U0NDFGMjIxMUVFQTBDRUI4OUQ1QkMyOTRGRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjDo+TEAABFLSURBVHja7F0JlBTV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`;

// The below function is for fetching the particular table details.
exports.dataOnCondition = async (tableName, Value, feildName) =>
{
    try 
    {
        return await new Promise(async (resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.${feildName} = '${Value}'`;
            // console.log(`Universal Query At Normal Condition: `, selQuery);
            con.query(selQuery, (err, result) =>
            {
                err ? resolve(`err`) : result.length > 0 ? resolve(result) : resolve([])              
            });          
        });        
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder. The function is the dataOnCondition`, error);        
    }
};

// The below function will give the particular user role details.
exports.getRoleDetails = async (Id) =>
{
    try
    {
        return await new Promise(async (resolve, reject) => 
        {
            let query = `   SELECT sp.id , 
                            r.id AS role_id, 
                            r.name 
                            FROM ${constants.tableName.service_providers} sp, 
                            ${constants.tableName.roles} r 
                            WHERE sp.id = ${Id} 
                            AND sp.role_Id = r.id`
            let result = await commonoperation.queryAsync(query);
            result === `err` ? resolve('err') : resolve(result);
        });
    }
    catch (error)
    {
        console.log(`Error from the getRoleDetails function.`, error);        
    }
};

// The belwo function is for checking the input file while cheking the unique data.
exports.dataOnConditionUpdate = async(tableName, feildName, Value, id, messageFeild) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * 
                            FROM ${tableName} t 
                            WHERE t.id = '${id}' 
                            AND t.${feildName} = '${Value}'`;
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    resolve(`internalError`)
                }
                
                if(result.length > 0)
                {
                    resolve(`valuenotchanged`);
                }
                else
                {
                    let checkwithOthers = await this.dataOnCondition(tableName, Value, feildName);
                    checkwithOthers.length > 0 ? resolve(`valuenotavailable`) : resolve(`true`); 
                }
            });
        });      
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder. The function is the dataOnConditionUpdate`, error);                
    }
};

// The below function will be used to fetched the details of a particular invoice.
exports.getOneInvoice = async (Id) =>
{
    try
    {
        return await new Promise(async(resolve, reject) =>
        {
            const data1 = await this.dataOnCondition(constants.tableName.bookings, Id, 'inv_id');      
            if(data1?.length === 0)
            {
                const selQuery = `
                SELECT
                i.id,
                v.id AS VehicleId,
                i.invoice_no AS iId,
                DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                v.vehicle_number AS vehicle_no,
                dr.name AS dName,
                c.name AS customer_name,
                q.pickup_time AS Ptime,
                q.drop_time AS Dtime,
                sp.name AS companyName,
                q.pickup_location AS customerAddress,
                sp.contact_address AS companyAddress,
                q.pickup_country AS cusCountry,
                q.drop_country AS comCountry,
                c.email AS customer_email,
                sp.email AS com_email,
                i.sub_total AS iSubTotal,
                COALESCE(t.value, 0) AS iTaxRate,
                COALESCE(d.rate, 0) AS iDiscountRate,
                i.tax_amount AS iTaxAmount,
                i.discount_amount AS iDiscountAmount,
                i.final_amount AS iFinalAmount,
                sp.name AS service_provider_name,
                i.quot_id AS quotation_id,
                q.pickup_location,
                q.drop_location,
                DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                pr.id AS paymentId,
                q.special_requirement,
                e.no_of_horse,
                pr.total_amount,
                COALESCE(pr.received_amount, 0) AS received_amount,
                DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                COALESCE(pr.remaining_amount, 0) AS remaining_amount 
                FROM ${constants.tableName.invoices} i
                JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                JOIN ${constants.tableName.customers} c ON c.id = q.customer_id
                JOIN ${constants.tableName.service_providers} sp ON q.serviceprovider_id = sp.id
                JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                LEFT JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                LEFT JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;                    
                const result = await commonoperation.queryAsync(selQuery);
                const selQuery2 = ` SELECT 
                                    i.id,
                                    v.vehicle_number AS vehicle_no,
                                    i.driver_id,
                                    d.name AS dName,
                                    i.pickup_point AS pickup_point,
                                    i.drop_point AS drop_point
                                    FROM ${constants.tableName.drivers} d,
                                    ${constants.tableName.vehicles} v,
                                    ${constants.tableName.invoices} i
                                    WHERE i.id = ${Id} 
                                    AND i.driver_id = d.id
                                    AND i.vehicle_id = v.id`;
                const result2 = await commonoperation.queryAsync(selQuery2);
                const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                resolve(invoiceResponse);
            }
            else if (data1[0].booking_status === 'CONFIRM')
            {
                const selQuery = `  SELECT
                                    i.id,
                                    v.id AS VehicleId,
                                    i.invoice_no AS iId,
                                    DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                                    v.vehicle_number AS vehicle_no,
                                    dr.name AS dName,
                                    c.name AS customer_name,
                                    q.pickup_time AS Ptime,
                                    q.drop_time AS Dtime,
                                    sp.name AS companyName,
                                    q.pickup_location AS customerAddress,
                                    sp.contact_address AS companyAddress,
                                    q.pickup_country AS cusCountry,
                                    q.drop_country AS comCountry,
                                    COALESCE(t.value, 0) AS iTaxRate,
                                    COALESCE(d.rate, 0) AS iDiscountRate,
                                    c.email AS customer_email,
                                    sp.email AS com_email,
                                    i.sub_total AS iSubTotal,
                                    i.tax_amount AS iTaxAmount,
                                    i.discount_amount AS iDiscountAmount,
                                    i.final_amount AS iFinalAmount,
                                    sp.name AS service_provider_name,
                                    i.quot_id AS quotation_id,
                                    q.pickup_location,
                                    q.drop_location,
                                    DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                                    DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                                    pr.id AS paymentId,
                                    q.special_requirement,
                                    e.no_of_horse,
                                    pr.total_amount,
                                    COALESCE(pr.received_amount, 0) AS received_amount,
                                    DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                                    COALESCE(pr.remaining_amount, 0) AS remaining_amount 
                                    FROM ${constants.tableName.invoices} i
                                    JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                    JOIN ${constants.tableName.customers} c ON c.id = q.customer_id
                                    JOIN ${constants.tableName.service_providers} sp ON q.serviceprovider_id = sp.id
                                    JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                    JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                    JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                    JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                    LEFT JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                    LEFT JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                    WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;      
                const result = await commonoperation.queryAsync(selQuery);
                const selQuery2 =   `   SELECT i.id,
                                        v.vehicle_number AS vehicle_no,
                                        i.driver_id,
                                        d.name AS dName,
                                        i.pickup_point AS pickup_point,
                                        i.drop_point AS drop_point
                                        FROM ${constants.tableName.drivers} d,
                                        ${constants.tableName.vehicles} v,
                                        ${constants.tableName.invoices} i
                                        WHERE i.id = ${Id}
                                        AND i.driver_id = d.id
                                        AND i.vehicle_id = v.id
                                    `;
                const result2 = await commonoperation.queryAsync(selQuery2);
                const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                resolve(invoiceResponse);
            }
            else if (data1[0].booking_status === 'BREAKOUT')
            {
                const selQuery = `  SELECT
                                    i.id,
                                    i.invoice_no AS iId,
                                        DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                                        v.vehicle_number AS vehicle_no,
                                        dr.name AS dName,
                                        c.name AS customer_name,
                                        COALESCE(t.value, 0) AS iTaxRate,
                                        COALESCE(d.rate, 0) AS iDiscountRate,
                                        q.pickup_location AS customerAddress,
                                        sp.contact_address AS companyAddress,
                                        q.pickup_country AS cusCountry,
                                        q.drop_country AS comCountry,
                                        c.email AS customer_email,
                                        sp.email AS com_email,
                                        i.sub_total AS iSubTotal,
                                        i.tax_amount AS iTaxAmount,
                                        i.discount_amount AS iDiscountAmount,
                                        i.final_amount AS iFinalAmount,
                                        sp.name AS service_provider_name,
                                        i.quot_id AS quotation_id,
                                        q.pickup_location,
                                        pr.id AS paymentId,
                                        q.drop_location,
                                        DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                                        DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                                        q.special_requirement,
                                        e.no_of_horse,
                                        pr.total_amount,
                                        COALESCE(pr.received_amount, 0) AS received_amount,
                                        DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                                        COALESCE(pr.remaining_amount, 0) AS remaining_amount
                                        FROM ${constants.tableName.invoices} i
                                        JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                        JOIN ${constants.tableName.customers} c ON c.id = q.customer_id
                                        JOIN ${constants.tableName.service_providers} sp ON q.serviceprovider_id = sp.id
                                        JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                        JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                        JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                        JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                        LEFT JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                        LEFT JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                        WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;      
                    const result = await commonoperation.queryAsync(selQuery);
                    const selQuery2 =   `
                                            SELECT vb.vehicle_id,
                                            v.vehicle_number AS vehicle_no,
                                            vb.driver_id,
                                            d.name AS dName,
                                            vb.pickup_location AS pickup_point,
                                            vb.drop_location AS drop_point
                                            FROM ${constants.tableName.vehicles_breakouts} vb,
                                            ${constants.tableName.drivers} d,
                                            ${constants.tableName.vehicles} v
                                            WHERE vb.invoice_id = ${Id}
                                            AND vb.driver_id = d.id 
                                            AND vb.vehicle_id = v.id`;
                    const result2 = await commonoperation.queryAsync(selQuery2);
                    const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                    resolve(invoiceResponse);;
                }
                else if (data1[0].booking_status === 'CANCELLED')
                    {
                        const selQuery = `  SELECT
                                            i.id,
                                            v.id AS VehicleId,
                                            i.invoice_no AS iId,
                                            DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                                            v.vehicle_number AS vehicle_no,
                                            dr.name AS dName,
                                            c.name AS customer_name,
                                            q.pickup_time AS Ptime,
                                            q.drop_time AS Dtime,
                                            sp.name AS companyName,
                                            COALESCE(t.value, 0) AS iTaxRate,
                                            COALESCE(d.rate, 0) AS iDiscountRate,
                                            q.pickup_location AS customerAddress,
                                            sp.contact_address AS companyAddress,
                                            q.pickup_country AS cusCountry,
                                            q.drop_country AS comCountry,
                                            c.email AS customer_email,
                                            sp.email AS com_email,
                                            i.sub_total AS iSubTotal,
                                            i.tax_amount AS iTaxAmount,
                                            i.discount_amount AS iDiscountAmount,
                                            i.final_amount AS iFinalAmount,
                                            sp.name AS service_provider_name,
                                            i.quot_id AS quotation_id,
                                            q.pickup_location,
                                            q.drop_location,
                                            DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                                            DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                                            pr.id AS paymentId,
                                            q.special_requirement,
                                            e.no_of_horse,
                                            pr.total_amount,
                                            COALESCE(pr.received_amount, 0) AS received_amount,
                                            DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                                            COALESCE(pr.remaining_amount, 0) AS remaining_amount 
                                            FROM ${constants.tableName.invoices} i
                                            JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                            JOIN ${constants.tableName.customers} c ON c.id = q.customer_id
                                            JOIN ${constants.tableName.service_providers} sp ON q.serviceprovider_id = sp.id
                                            JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                            JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                            JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                            JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                            LEFT JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                            LEFT JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                            WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;    
                        const result = await commonoperation.queryAsync(selQuery);
                        const selQuery2 = `
                                            SELECT i.id,
                                            v.vehicle_number AS vehicle_no,
                                            i.driver_id,
                                            d.name AS dName,
                                            i.pickup_point AS pickup_point,
                                            i.drop_point AS drop_point
                                            FROM ${constants.tableName.drivers} d,
                                            ${constants.tableName.vehicles} v
                                            ${constants.tableName.invoices} i
                                            WHERE i.id = ${Id}
                                            AND i.driver_id = d.id
                                            AND i.vehicle_id = v.id;`;
                        const result2 = await commonoperation.queryAsync(selQuery2);
                        const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                        resolve(invoiceResponse);;                                                             
                    }       
                else if (data1[0].booking_status === 'COMPLETED')
                {
                    const data3 = await this.dataOnCondition(constants.tableName.vehicles_breakouts, Id, 'invoice_id');
                    if (data3.length === 0)
                    {
                        const selQuery =    `
                                            SELECT
                                            i.id,
                                            v.id AS VehicleId,
                                            i.invoice_no AS iId,
                                            DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                                            v.vehicle_number AS vehicle_no,
                                            dr.name AS dName,
                                            pr.id AS paymentId,
                                            c.name AS customer_name,
                                            q.pickup_time AS Ptime,
                                            q.drop_time AS Dtime,
                                            sp.name AS companyName,
                                            q.pickup_location AS customerAddress,
                                            sp.contact_address AS companyAddress,
                                            q.pickup_country AS cusCountry,
                                            q.drop_country AS comCountry,
                                            c.email AS customer_email,
                                            COALESCE(t.value, 0) AS iTaxRate,
                                            COALESCE(d.rate, 0) AS iDiscountRate,
                                            sp.email AS com_email,
                                            i.sub_total AS iSubTotal,
                                            i.tax_amount AS iTaxAmount,
                                            i.discount_amount AS iDiscountAmount,
                                            i.final_amount AS iFinalAmount,
                                            sp.name AS service_provider_name,
                                            i.quot_id AS quotation_id,
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
                                            FROM ${constants.tableName.invoices} i
                                            JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                            JOIN ${constants.tableName.customers} c ON c.id = q.customer_id
                                            JOIN ${constants.tableName.service_providers} sp ON q.serviceprovider_id = sp.id
                                            JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                            JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                            JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                            JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                            LEFT JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                            LEFT JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                            WHERE i.id = ${Id} ORDER BY remaining_amount DESC
                                            `;      
                        const result = await commonoperation.queryAsync(selQuery);
                        const selQuery2 = `     SELECT 
                                                i.id,
                                                v.vehicle_number AS vehicle_no,
                                                i.driver_id,
                                                d.name AS dName,
                                                i.pickup_point AS pickup_point,
                                                i.drop_point AS drop_point
                                                FROM ${constants.tableName.drivers} d,
                                                ${constants.tableName.vehicles} v,
                                                ${constants.tableName.invoices} i
                                                WHERE i.id = ${Id} 
                                                AND i.driver_id = d.id
                                                AND i.vehicle_id = v.id
                                            `;
                        const result2 = await commonoperation.queryAsync(selQuery2);
                        const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                        resolve(invoiceResponse);;
                    }
                    else
                    {
                        const selQuery = `  SELECT
                                            i.id,
                                            i.invoice_no AS iId,
                                            DATE_FORMAT(i.created_at, '%d-%m-%Y') AS iDate,
                                            v.vehicle_number AS vehicle_no,
                                            dr.name AS dName,
                                            c.name AS customer_name,
                                            q.pickup_location AS customerAddress,
                                            sp.contact_address AS companyAddress,
                                            q.pickup_country AS cusCountry,
                                            q.drop_country AS comCountry,
                                            c.email AS customer_email,
                                            sp.email AS com_email,
                                            COALESCE(t.value, 0) AS iTaxRate,
                                            COALESCE(d.rate, 0) AS iDiscountRate,
                                            i.sub_total AS iSubTotal,
                                            i.tax_amount AS iTaxAmount,
                                            pr.id AS paymentId,
                                            i.discount_amount AS iDiscountAmount,
                                            i.final_amount AS iFinalAmount,
                                            sp.name AS service_provider_name,
                                            i.quot_id AS quotation_id,
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
                                            FROM ${constants.tableName.invoices} i
                                            JOIN ${constants.tableName.quotations} q 
                                                ON i.quot_id = q.id
                                            JOIN ${constants.tableName.customers} c 
                                                ON c.id = q.customer_id
                                            JOIN ${constants.tableName.service_providers} sp 
                                                ON q.serviceprovider_id = sp.id
                                            JOIN ${constants.tableName.enquiries} e 
                                                ON e.id = q.enquiry_id
                                            JOIN ${constants.tableName.payment_records} pr 
                                                ON pr.invoice_id = i.id
                                            JOIN ${constants.tableName.vehicles} v 
                                                ON v.id = i.vehicle_id
                                            JOIN ${constants.tableName.drivers} dr 
                                                ON dr.id = i.driver_id
                                            LEFT JOIN ${constants.tableName.discount_types} d 
                                                ON d.id = q.discount_type_id
                                            LEFT JOIN ${constants.tableName.taxations} t 
                                                ON t.id = q.taxation_id
                                            WHERE i.id = ${Id} 
                                            ORDER BY remaining_amount DESC`;      
                        const result = await commonoperation.queryAsync(selQuery);
                        const selQuery2 = `
                                            SELECT 
                                                vb.vehicle_id,
                                                v.vehicle_number AS vehicle_no,
                                                vb.driver_id,
                                                d.name AS dName,
                                                vb.pickup_location AS pickup_point,
                                                vb.drop_location AS drop_point
                                                FROM ${constants.tableName.vehicles_breakouts} vb, 
                                                ${constants.tableName.drivers} d, 
                                                ${constants.tableName.vehicles} v 
                                                WHERE vb.invoice_id = ${Id} 
                                                AND vb.driver_id = d.id 
                                                AND vb.vehicle_id = v.id`;
                        const result2 = await commonoperation.queryAsync(selQuery2);
                        const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                        resolve(invoiceResponse);;              
                    }
                }
            });
        }
        catch (error)
        {
            
        }
}

// The below function will be used to fetched the details of a particular quotation.
exports.getOneQuotationFromCommonFetching = async (quotId) =>
{
    try
    {
        return await new Promise(async(resolve, reject) =>
        {
            /**For taking tax id in the settings application */
            let selQuery = `    SELECT tx.id, tx.type, tx.name, tx.value
                                FROM ${constants.tableName.application_settings} apps
                                JOIN ${constants.tableName.taxations} tx 
                                ON apps.tax_id = tx.id
                            `; 
            con.query(selQuery, async (err, tax) =>
            {
                if (tax.length != 0)
                {
                    /***For selecting quotation view details */
                    let selQuery = `    SELECT
                                        quo.id,
                                        quo.quotation_id,
                                        quo.trip_type,
                                        quo.pickup_country,
                                        quo.pickup_location,
                                        quo.pickup_date,
                                        quo.pickup_time,
                                        quo.drop_country,
                                        quo.drop_location,
                                        quo.drop_date,
                                        quo.drop_time,
                                        quo.no_of_horse,
                                        quo.special_requirement,
                                        quo.additional_service,
                                        quo.transportation_insurance_coverage,
                                        quo.sub_total,
                                        quo.tax_amount,
                                        quo.discount_amount,
                                        quo.final_amount,
                                        cu.id AS customer_id,
                                        cu.name AS customer_name,
                                        cu.email AS customer_email,
                                        cu.user_name AS customer_user_name,
                                        cu.contact_no AS customer_contact_no,
                                        cu.id_proof_no AS customer_id_proof_no,
                                        sp.name AS service_provider_name,
                                        sp.id AS service_provider_id,
                                        enq.created_at AS enquiry_date,
                                        enq.id AS enquiry_id,
                                        vh.vehicle_number AS vehicle_number,
                                        vh.make,
                                        vh.id AS vehicle_id,
                                        dvr.id AS driver_id,
                                        dvr.name AS driver_name, 
                                        quo.discount_type_id AS discount_type_id,
                                        quo.driver_amount,
                                        quo.vehicle_amount,
                                        quo.status
                                        FROM ${constants.tableName.quotations} AS quo
                                        JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id = sp.id
                                        JOIN ${constants.tableName.vehicles} vh ON quo.vehicle_id = vh.id
                                        JOIN ${constants.tableName.drivers} dvr ON quo.driver_id  = dvr.id
                                        JOIN ${constants.tableName.enquiries} enq ON quo.enquiry_id = enq.id
                                        JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
                                        WHERE quo.quotation_id = '${quotId}' AND quo.deleted_at IS NULL`;
                    con.query(selQuery, async (err, data) =>
                    {
                        if (data.length != 0)
                        {
                            data[0].pickup_date = `${time.formatDateToDDMMYYYY(data[0].pickup_date)}`;
                            data[0].drop_date = `${time.formatDateToDDMMYYYY(data[0].drop_date)}`;
                            data[0].enquiry_date = `${time.formatDateToDDMMYYYY(data[0].enquiry_date)}`;
                            resolve({ quotation: data, tax: tax });
                        }
                        else
                        {
                            resolve({ quotation: [], tax: [] });
                        }
                    });
                }
                else
                {
                    resolve(false);
                }
            });
        });
    }
    catch (error)
    {
        resolve(false);
        console.log('Error while fetching  quotations', err);
    }
};

// The below function is having the html template of the invoice.
exports.getInvoiceHtmlTemplate = async(invoiceData) =>
{
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
            <th>Remaining Payment</th>
            </tr>`;    
            payments.forEach((payment, index) =>
            {
                paymentRows +=`
                <tr style="text-align: center; height: 40px;" key=${index}>
                <td>${index + 1}</td>
                <td>${payment.received_amount} AED</td>
                <td>${payment.received_date}</td>
                <td>${payment.remaining_amount} AED</td>
                </tr>`;
            });
        }
        return paymentRows;
    }
    const vehicleRows = generateVehicleRows(invoiceData.vehicles);
    const paymentDetails = generatePaymentDetails(invoiceData.payment);      
    // Generate the complete HTML content using the provided invoiceData and the generated vehicleRows and paymentDetails
    const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width">
            <title>Invoice</title>
        </head>
                <body style="color: #666; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.6em; overflow-x: hidden; background-color: #ffffff;">
                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0pt auto; padding: 0px; font-family: Arial,Helvetica,sans-serif; font-size: 13px;border: 1px solid;padding: 5px 5px;">
                    <tbody>
                <tr>
                <td valign="top" bgcolor="#ffffff">
                   <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td>
                                <div style="padding: 8px; text-align:left;"><a target="_blank" title="Horse City" href=""><img  border="0" height="50"  alt="Horse City" src=${logo} /></a></div>
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
};

// The below function is having the html template of the quotation.
exports.getQuotationHtmlTemplate = async (quoteData) =>
{
    // Generate the complete HTML content using the provided invoiceData and the generated vehicleRows and paymentDetails
    let htmlContent = 
    `   <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width">
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
                                                <div style="padding: 8px; text-align:left;"><a target="_blank" title="Horse City" href=""><img  border="0" height="50" width="50" alt="Horse City" src="${logo}" /></a></div>
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
                                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;">Quotation No : <b>${quoteData.quotation[0].quotation_id}</b></div>
                                            </td>
                                            <td>
                                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;">Date : <b>${quoteData.quotation[0].enquiry_date} </b></div>
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
                                                <div style="padding: 8px; text-align:left;color: #000;font-size:15px;"><b>Customer Details: </b></div>
                                            </td>
                                            <td>
                                                <div style="padding: 8px; text-align:right;color: #000;font-size:15px;"><b>Service Provider Details: </b></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Name: ${quoteData.quotation[0].customer_name}</div>
                                            </td>
                                            <td>
                                                <div style="padding:0 10px; text-align:right;color: #000;font-size:13px;">Name: ${quoteData.quotation[0].service_provider_name}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Email: ${quoteData.quotation[0].customer_email}</div>
                                            </td>
                                            <td>
                                                <div style="padding: 0 10px; text-align:right;color: #000;font-size:13px;">Vehicle Number: ${quoteData.quotation[0].vehicle_number}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Username: ${quoteData.quotation[0].customer_user_name}</div>
                                            </td>
                                            <td>
                                                <div style="padding: 0 10px; text-align:right;color: #000;font-size:13px;">Make: ${quoteData.quotation[0].make}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="padding: 0 10px; text-align:left;color: #000;font-size:13px;">Phone: ${quoteData.quotation[0].customer_contact_no}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="padding: 0 10px 25px; text-align:left;color: #000;font-size:13px;">Id Proof No: ${quoteData.quotation[0].customer_id_proof_no}</div>
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
                                                                <div style="padding: 8px; text-align:left;color: #000;font-size:16px;"><b>Requirement: </b></div>
                                                            </th>    
                                                        </tr>
                                                        <tr style=" text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Special Requirment : </div>
                                                            </th>    
                                                        </tr>
                                                        <tr style=" text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding:0 8px; text-align:left;color: #2c2b2b;font-size:13px;">${quoteData.quotation[0].special_requirement} </div>
                                                            </th>    
                                                        </tr>
                                                        <tr style=" text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Additional Service : </div>
                                                            </th>
                                                        </tr>
                                                        <tr style=" text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding:0 8px; text-align:left;color: #2c2b2b;font-size:13px;">${quoteData.quotation[0].additional_service}</div>
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
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Trip Type: ${quoteData.quotation[0].trip_type}</div>
                                                            </th>
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Pickup Location: ${quoteData.quotation[0].pickup_location}</div>
                                                            </th>    
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Pickup Date: ${quoteData.quotation[0].pickup_date}</div>
                                                            </th>    
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Pickup Time: ${quoteData.quotation[0].pickup_time}</div>
                                                            </th>    
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Drop Location: ${quoteData.quotation[0].drop_location}</div>
                                                            </th>    
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Drop Date: ${quoteData.quotation[0].drop_date}</div>
                                                            </th>    
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Drop Time: ${quoteData.quotation[0].drop_time}</div>
                                                            </th>    
                                                        </tr>
                                                        <tr style="background-color: #d7d4d4; text-align: left; padding: 5px;">
                                                            <th>
                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">Number of Horses: ${quoteData.quotation[0].no_of_horse}</div>
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
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">${quoteData.quotation[0].transportation_insurance_coverage}</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="background-color: #d7d4d4;">
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Tax</div>
                                                                            </td>
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">${quoteData.quotation[0].tax_amount}</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="background-color: #d7d4d4;">
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Discount</div>
                                                                            </td>
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #2c2b2b;font-size:14px;">${quoteData.quotation[0].discount_amount}</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr style="background-color: #d7d4d4;">
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">Final Payment</div>
                                                                            </td>
                                                                            <td>
                                                                                <div style="padding: 8px; text-align:left;color: #000000;font-size:14px;">${quoteData.quotation[0].final_amount}</div>
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
};

// The below function is having the html template of the forgot password.
exports.getForgotPasswordHTMLTemplate = async (id, email) =>
{
    let token = await commonoperation.createCustomizeEmailToken(email);
    let htmlContent =   `
                            <p> Hello </p> 
                            <p>We have received a request to reset your password. Please click the link below to reset your password:</p>
                            <p>
                                <a href="${process.env.PORT_SP}/reset-password/${id}/${token}">Reset Password</a>
                            </p>
                        `
    return htmlContent;
};

