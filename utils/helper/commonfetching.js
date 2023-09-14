/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avaoided.                                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");  // Importing the database details
const constants = require("../constants");
const commonoperation = require('./commonoperation');
const objectConvertor = require('../objectConvertor');

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
                if(err)
                {
                    resolve(`err`);
                }
                else
                {
                    if (result.length > 0)
                    {
                        resolve(result);
                    }
                    else
                    {
                        resolve([]);
                    }
                }                
            });          
        });        
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder. The function is the dataOnCondition`, error);        
    }
};

exports.dataOnConditionUpdate = async(tableName, feildName, Value, id, messageFeild) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.id = '${id}' AND t.${feildName} = '${Value}'`;
            // console.log(`Universl Query At Update Condition: `, selQuery);
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log(`Error in the data on update`);
                    resolve(`internalError`)
                }
                
                if(result.length > 0)
                {
                    // console.log(`I think ${messageFeild} is not updating this time`);
                    resolve(`valuenotchanged`);
                }
                else
                {
                    let checkwithOthers = await this.dataOnCondition(tableName, Value, feildName);
                    // console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log(`${messageFeild} Cannot be used. It is already registered`);
                        resolve(`valuenotavailable`);
                    }
                    else
                    {
                        // console.log(`No one has this ${messageFeild}`);
                        resolve(`true`);
                    }
                }
            });
        });      
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder. The function is the dataOnConditionUpdate`, error);                
    }
};

exports.getOneInvoice = async (Id) =>
{
    try
        {
            return await new Promise(async(resolve, reject) =>
            {
                const data1 = await this.dataOnCondition(constants.tableName.bookings, Id, 'inv_id');      
                // console.log('data 1: ', data1.length);
                if(data1.length == 0)
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
                                        c.email AS customer_email,
                                        sp.email AS com_email,
                                        i.sub_total AS iSubTotal,
                                        t.value AS iTaxRate,
                                        i.tax_amount AS iTaxAmount,
                                        d.rate AS iDiscountRate,
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
                                        JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                        JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                        JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                        JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                        JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                        JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                        WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;    
                    const result = await commonoperation.queryAsync(selQuery);
                    const selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id, d.name AS dName, i.pickup_point, i.drop_point FROM ${constants.tableName.drivers} d, ${constants.tableName.vehicles} v, ${constants.tableName.invoices} i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id;`;
                    const result2 = await commonoperation.queryAsync(selQuery2);
                    const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                    resolve(invoiceResponse);
                }
                if (data1[0].booking_status === 'CONFIRM')
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
                                        c.email AS customer_email,
                                        sp.email AS com_email,
                                        i.sub_total AS iSubTotal,
                                        t.value AS iTaxRate,
                                        i.tax_amount AS iTaxAmount,
                                        d.rate AS iDiscountRate,
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
                                        JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                        JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                        JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                        JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                        JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                        JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                        WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;      
                    const result = await commonoperation.queryAsync(selQuery);
                    const selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id ,d.name AS dName, i.pickup_point, i.drop_point FROM ${constants.tableName.drivers} d, ${constants.tableName.vehicles} v, ${constants.tableName.invoices} i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id`;
                    const result2 = await commonoperation.queryAsync(selQuery2);
                    const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                    resolve(invoiceResponse);;
                }
                if (data1[0].booking_status === 'BREAKOUT')
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
                                        i.sub_total AS iSubTotal,
                                        t.value AS iTaxRate,
                                        i.tax_amount AS iTaxAmount,
                                        d.rate AS iDiscountRate,
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
                                        JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                        JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                        JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                        JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                        JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                        JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                        WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;      
                    const result = await commonoperation.queryAsync(selQuery);
                    const selQuery2 = `SELECT vb.vehicle_id, v.vehicle_number AS vehicle_no, vb.driver_id, d.name AS dName, vb.pickup_location, vb.drop_location FROM vehicles_breakouts vb, ${constants.tableName.drivers} d, ${constants.tableName.vehicles} v WHERE vb.invoice_id = ${Id} AND vb.driver_id = d.id AND vb.vehicle_id = v.id`;
                    const result2 = await commonoperation.queryAsync(selQuery2);
                    const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                    resolve(invoiceResponse);;
                }
                if (data1[0].booking_status === 'CANCELLED')
                    {
                        // console.log('Inosed the cancalled one');
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
                                            c.email AS customer_email,
                                            sp.email AS com_email,
                                            i.sub_total AS iSubTotal,
                                            t.value AS iTaxRate,
                                            i.tax_amount AS iTaxAmount,
                                            d.rate AS iDiscountRate,
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
                                            JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                            JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                            JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                            JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                            JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                            JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                            WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;    
                        const result = await commonoperation.queryAsync(selQuery);
                        const selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id, d.name AS dName, i.pickup_point, i.drop_point FROM ${constants.tableName.drivers} d, ${constants.tableName.vehicles} v, ${constants.tableName.invoices} i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id;`;
                        const result2 = await commonoperation.queryAsync(selQuery2);
                        const invoiceResponse = objectConvertor.getOneInvoiceResponse(result, result2);
                        resolve(invoiceResponse);;                                                             
                    }    
                if (data1[0].booking_status === 'COMPLETED')
                {
                    const data3 = await this.dataOnCondition(constants.tableName.vehicles_breakouts, Id, 'invoice_id');
                    if (data3.length === 0)
                    {
                        const selQuery = `  SELECT
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
                                            sp.email AS com_email,
                                            i.sub_total AS iSubTotal,
                                            t.value AS iTaxRate,
                                            i.tax_amount AS iTaxAmount,
                                            d.rate AS iDiscountRate,
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
                                            JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                            JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                            JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                            JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                            JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                            JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                            WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;      
                        const result = await commonoperation.queryAsync(selQuery);
                        const selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id ,d.name AS dName, i.pickup_point, i.drop_point FROM ${constants.tableName.drivers} d, ${constants.tableName.vehicles} v, ${constants.tableName.invoices} i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id;`;
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
                                            i.sub_total AS iSubTotal,
                                            t.value AS iTaxRate,
                                            i.tax_amount AS iTaxAmount,
                                            d.rate AS iDiscountRate,
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
                                            JOIN ${constants.tableName.quotations} q ON i.quot_id = q.id
                                            JOIN ${constants.tableName.customers} c ON c.id = q.customer_id
                                            JOIN ${constants.tableName.service_providers} sp ON q.serviceprovider_id = sp.id
                                            JOIN ${constants.tableName.taxations} t ON t.id = q.taxation_id
                                            JOIN ${constants.tableName.discount_types} d ON d.id = q.discount_type_id
                                            JOIN ${constants.tableName.enquiries} e ON e.id = q.enquiry_id
                                            JOIN ${constants.tableName.payment_records} pr ON pr.invoice_id = i.id
                                            JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                                            JOIN ${constants.tableName.drivers} dr ON dr.id = i.driver_id
                                            WHERE i.id = ${Id} ORDER BY remaining_amount DESC`;      
                        const result = await commonoperation.queryAsync(selQuery);
                        const selQuery2 = `SELECT vb.vehicle_id, v.vehicle_number AS vehicle_no, vb.driver_id, d.name AS dName, vb.pickup_location, vb.drop_location FROM vehicles_breakouts vb, ${constants.tableName.drivers} d, ${constants.tableName.vehicles} v WHERE vb.invoice_id = ${Id} AND vb.driver_id = d.id AND vb.vehicle_id = v.id`;
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
            <th>Remaining Amount</th>
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

exports.tokenGeneration = async(email) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let email_length = email.length;

            if (email_length % 2 == 1)
        
            {
        
                email += 'y';
        
                email_length++;
        
            }
        
            const emailPart1 = email.substring(0, email_length / 2);
        
            const emailTokenSidePart1 = [];
        
            for (let i = 0; i < emailPart1.length; i++)
        
            {
        
                const charCode = emailPart1.charCodeAt(i);
        
                const lastDigit = parseInt(charCode.toString().slice(-1));    
        
                emailTokenSidePart1.push(emailPart1[i] + lastDigit);
        
            }
        
            const emailPart2 = email.substring(email_length / 2);
        
            const emailTokenSidePart2 = [];    
        
            for (let i = 0; i < emailPart2.length; i++)
        
            {
        
                const charCode = emailPart2.charCodeAt(i);
        
                const firstDigit = parseInt(charCode.toString()[0]);
        
                emailTokenSidePart2.push(emailPart2[i] + firstDigit);
        
            }
        
            const currentTimestamp = Math.floor(Date.now() / 1000); 
        
            const expirationTimestamp = currentTimestamp + 3600; 
            // constant.password.token_expiry;
        
            const customizepasswordToken = `${emailTokenSidePart1.join('')}A${emailTokenSidePart2.join('')}T${expirationTimestamp}`;
            resolve({token : customizepasswordToken})
    
        });      
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder,at the time of token generation. `, error);                
    }
};

exports.formattedToDate = async(toDate) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
        // Split the toDate string into date and time parts
        const [datePart, timePart] = toDate.split(' ');
                      
        // Concatenate the date part and the desired time (23:59:59)
        const formattedToDate = `${datePart} 23:59:59`;

        resolve(formattedToDate);
      
        });      
    }
    catch (error)
    {
        console.log(`Error from the commonfetching.js file from the helper folder,at the time of format toDate. `, error);                
    }
};