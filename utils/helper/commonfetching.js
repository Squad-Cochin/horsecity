/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avaoided.                                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");  // importing the database details
const constants = require("../constants");

exports.getAllDataOfDriverAndCustomer = (tablename, pageNumber, pageSize) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            // Calculate the offset based on the page number and page size
            const offset = (pageNumber - 1) * pageSize;
            let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${tablename} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
            // console.log(selQuery);
            con.query(selQuery, (err, result) =>
            {
                // console.log(`result`, result);
                if (err)
                {
                    console.log(`Error while executing the query:`, err);
                    reject(err);
                }
                if (result.length > 0)
                {
                    console.log(`Data present and fetched`);
                    resolve(result);
                }
                else
                {
                    console.log(`Query executed but data not present in the table.`);
                    resolve([]);
                }                
            });
        });        
    }
    catch(error)
    {
        console.log(`Error from the commonfetching.js file from the utils > helper folder. In the function "getAllDataOfDriverAndCustomer". Which is designed to fetch all the data of customer and driver through the same function`);        
    }
}

exports.dataOnCondition = async (tableName, Value, feildName) =>
{
    try 
    {
        return await new Promise(async (resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.${feildName} = '${Value}'`;
            console.log(`Universal Query At Normal Condition: `, selQuery);
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
                    console.log(`I think ${messageFeild} is not updating this time`);
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
                        console.log(`No one has this ${messageFeild}`);
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
                // The below one is for the invoice id available in the booking table
                let data1 = await this.dataOnCondition(constants.tableName.bookings, Id, 'inv_id');
                // console.log(`The below one is for the invoice id available in the booking table: `, data1);
                if(data1.length === 0)
                {
                    // The below if loop is for getting the invoice when the data is not in the booking table
                    console.log('This invoice data is not available in the booking table. We need to fetch it from the invoice table.');                                                
                    let selQuery = `SELECT i.id,
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
                                    q.special_requirement,
                                    e.no_of_horse,
                                    pr.total_amount,
                                    COALESCE(pr.received_amount, 0) AS received_amount,
                                    DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                                    COALESCE(pr.remaining_amount, 0) AS remaining_amount 
                                    FROM invoices i
                                    JOIN quotations q ON i.quot_id = q.id
                                    JOIN customers c ON c.id = q.customer_id
                                    JOIN service_providers sp ON q.serviceprovider_id = sp.id
                                    JOIN taxations t ON t.id = q.taxation_id
                                    JOIN discount_types d ON d.id = q.discount_type_id
                                    JOIN enquiries e ON e.id = q.enquiry_id
                                    JOIN payment_records pr ON pr.invoice_id = i.id
                                    JOIN vehicles v ON v.id = i.vehicle_id
                                    JOIN drivers dr ON dr.id = i.driver_id
                                    WHERE i.id = ${Id}`;
                    // console.log('Data is not in the booking table query: ',selQuery);
                    con.query(selQuery, (err, result) =>
                    {
                        // console.log(`Result of booking id not present: `, result);
                        if (err)
                        {
                            console.log(err);
                            resolve('err');
                        } 
                        else
                        {
                            var invoiceResponse =
                            {
                                "invoice": [],
                                "vehicles" : [],
                                "payment": []
                            };
                            if (result.length !== 0) 
                            {
                                // If result has data, populate the invoiceResponse data and payment arrays
                                invoiceResponse.invoice.push
                                ({
                                    "id": result[0].id,
                                    "iId": result[0].iId,
                                    "iDate": result[0].iDate,
                                    "pickup_time" : result[0].Ptime,
                                    "drop_time" : result[0].Dtime,
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
                                    "pickup_date": result[0].pickup_date,
                                    "drop_date": result[0].drop_date,
                                    "special_requirement": result[0].special_requirement,
                                    "no_of_horse": result[0].no_of_horse
                                });
                                for (let row of result) 
                                {
                                    invoiceResponse.payment.push
                                    ({
                                        "id": row.id,
                                        "total_amount": row.iFinalAmount,
                                        "received_amount": row.received_amount,
                                        "received_date": row.received_date,
                                        "remaining_amount": row.remaining_amount
                                    });
                                }
                                let selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id ,d.name AS dName, i.pickup_point, i.drop_point FROM drivers d, vehicles v, invoices i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id;`;
                                con.query(selQuery2, (err, result2) =>
                                {
                                    // console.log(`Second Select Query: `, selQuery2);
                                    if (err)
                                    {
                                        console.log(err);
                                        resolve('err');
                                    }
                                    else
                                    {
                                        for (let row of result2)
                                        {
                                            invoiceResponse.vehicles.push
                                            ({
                                                "id": row.id,
                                                "vehicle_number" : row.vehicle_no,
                                                "driver_name" : row.dName,
                                                "pickup_location": row.pickup_point,
                                                "drop_location": row.drop_point,
                                            });
                                        }
                                        resolve(invoiceResponse);
                                    }
                                });
                            }                            
                        }
                    });
                }
                // The above else loop is for getting the invoice when the data is not in the booking table
                else
                {
                    // The below if loop is for getting the invoice when the data is  in the booking table and the status of the booking data is CONFIRM      
                    if(data1[0].booking_status === 'CONFIRM')
                    {
                        console.log('Booking status is confirm in the booking table and the vehicle details are fetched from the invoice table');                                                
                        let selQuery = `SELECT i.id,
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
                                        q.special_requirement,
                                        e.no_of_horse,
                                        pr.total_amount,
                                        COALESCE(pr.received_amount, 0) AS received_amount,
                                        DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                                        COALESCE(pr.remaining_amount, 0) AS remaining_amount 
                                        FROM invoices i
                                        JOIN quotations q ON i.quot_id = q.id
                                        JOIN customers c ON c.id = q.customer_id
                                        JOIN service_providers sp ON q.serviceprovider_id = sp.id
                                        JOIN taxations t ON t.id = q.taxation_id
                                        JOIN discount_types d ON d.id = q.discount_type_id
                                        JOIN enquiries e ON e.id = q.enquiry_id
                                        JOIN payment_records pr ON pr.invoice_id = i.id
                                        JOIN vehicles v ON v.id = i.vehicle_id
                                        JOIN drivers dr ON dr.id = i.driver_id
                                        WHERE i.id = ${Id}`;
                        // console.log('Data is not in the booking table query: ',selQuery);
                        con.query(selQuery, (err, result) =>
                        {
                            // console.log(`Result of booking id not present: `, result);
                            if (err)
                            {
                                console.log(err);
                                resolve('err');
                            } 
                            else
                            {
                                var invoiceResponse =
                                {
                                    "invoice": [],
                                    "vehicles" : [],
                                    "payment": []
                                };
                                if (result.length !== 0) 
                                {
                                    // If result has data, populate the invoiceResponse data and payment arrays
                                    invoiceResponse.invoice.push
                                    ({
                                        "id": result[0].id,
                                        "iId": result[0].iId,
                                        "iDate": result[0].iDate,
                                        "pickup_time" : result[0].Ptime,
                                        "drop_time" : result[0].Dtime,
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
                                        "pickup_date": result[0].pickup_date,
                                        "drop_date": result[0].drop_date,
                                        "special_requirement": result[0].special_requirement,
                                        "no_of_horse": result[0].no_of_horse
                                    });
                                    for (let row of result) 
                                    {
                                        invoiceResponse.payment.push
                                        ({
                                            "id": row.id,
                                            "total_amount": row.iFinalAmount,
                                            "received_amount": row.received_amount,
                                            "received_date": row.received_date,
                                            "remaining_amount": row.remaining_amount
                                        });
                                    }

                                    let selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id ,d.name AS dName, i.pickup_point, i.drop_point FROM drivers d, vehicles v, invoices i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id;`;
                                    con.query(selQuery2, (err, result2) =>
                                    {
                                        // console.log(`Second Select Query: `, selQuery2);
                                        if (err)
                                        {
                                            console.log(err);
                                            resolve('err');
                                        }
                                        else
                                        {
                                            for (let row of result2)
                                            {
                                                invoiceResponse.vehicles.push
                                                ({
                                                    "id": row.id,
                                                    "vehicle_number" : row.vehicle_no,
                                                    "driver_name" : row.dName,
                                                    "pickup_location": row.pickup_point,
                                                    "drop_location": row.drop_point,
                                                });
                                            }
                                            resolve(invoiceResponse);
                                        }
                                    });
                                }                            
                            }
                        });                      
                    }
                    // The above condition loop is for getting the invoice when the data is  in the booking table and the status of the booking data is CONFIRM

                    /* This Part is Wokrking */
                    else if(data1[0].booking_status ==='BREAKOUT')
                    {
                        console.log('Booking status is breakout in the booking table and the vehicle details are fetched from the vehicle breakout');
                        let selQuery = `SELECT i.id,
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
                        q.drop_location,
                        DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                        DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                        q.special_requirement,
                        e.no_of_horse,
                        pr.total_amount,
                        COALESCE(pr.received_amount, 0) AS received_amount,
                        DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                        COALESCE(pr.remaining_amount, 0) AS remaining_amount
                        FROM invoices i
                        JOIN quotations q ON i.quot_id = q.id
                        JOIN customers c ON c.id = q.customer_id
                        JOIN service_providers sp ON q.serviceprovider_id = sp.id
                        JOIN taxations t ON t.id = q.taxation_id
                        JOIN discount_types d ON d.id = q.discount_type_id
                        JOIN enquiries e ON e.id = q.enquiry_id
                        JOIN payment_records pr ON pr.invoice_id = i.id
                        JOIN vehicles v ON v.id = i.vehicle_id
                        JOIN drivers dr ON dr.id = i.driver_id
                        WHERE i.id = ${Id}`;
                        // console.log(selQuery);
                        con.query(selQuery, (err, result) =>
                        {
                            var invoiceResponse =
                            {
                                "invoice": [],
                                "vehicles" : [],
                                "payment": []
                            };
                            if (err)
                            {
                                console.log(err);
                                resolve('err');
                            } 
                            else
                            {
                                if (result.length !== 0) 
                                {
                                    // If result has data, populate the invoiceResponse data and payment arrays
                                    invoiceResponse.invoice.push
                                    ({
                                        "id": result[0].id,
                                        "iId": result[0].iId,
                                        "iDate": result[0].iDate,
                                        "customer_name": result[0].customer_name,
                                        "companyName": result[0].companyName,
                                        "customerAddress": result[0].customerAddress,
                                        "companyAddress": result[0].companyAddress,
                                        "cusCountry": result[0].cusCountry,
                                        "comCountry": result[0].comCountry,
                                        "pickup_time" : result[0].Ptime,
                                        "drop_time" : result[0].Dtime,
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
                                        "pickup_date": result[0].pickup_date,
                                        "drop_date": result[0].drop_date,
                                        "special_requirement": result[0].special_requirement,
                                        "no_of_horse": result[0].no_of_horse
                                    });
                                    for (let row of result) 
                                    {
                                        invoiceResponse.payment.push
                                        ({
                                            "id": row.id,
                                            "total_amount": row.iFinalAmount,
                                            "received_amount": row.received_amount,
                                            "received_date": row.received_date,
                                            "remaining_amount": row.remaining_amount
                                        });
                                    }
                                }
                                let selQuery2 = `SELECT vb.vehicle_id, v.vehicle_number AS vehicle_no, vb.driver_id, d.name AS dName, vb.pickup_location, vb.drop_location FROM vehicles_breakouts vb, drivers d, vehicles v WHERE vb.invoice_id = ${Id} AND vb.driver_id = d.id AND vb.vehicle_id = v.id`;
                                con.query(selQuery2, (err, result2) =>
                                {
                                    // console.log(`Second Select Query: `, selQuery2);
                                    // console.log(`Second Select Result: `, result2);
                                    if (err)
                                    {
                                        console.log(err);
                                        resolve('err');
                                    }
                                    else
                                    {
                                        for (let row of result2)
                                        {
                                            invoiceResponse.vehicles.push
                                            ({
                                                "id": row.id,
                                                "vehicle_number" : row.vehicle_no,
                                                "driver_name" : row.dName,
                                                "pickup_location": row.pickup_location,
                                                "drop_location": row.drop_location,
                                            });
                                        }
                                        resolve(invoiceResponse);
                                    }
                                });
                            }
                        });                        
                    }
                    /* This Above Part is Wokrking */
                    else if(data1[0].booking_status === 'COMPLETED')
                    {                        
                        let data3 = await this.dataOnCondition(constants.tableName.vehicles_breakouts, Id, 'invoice_id')
                        // console.log(`Data Present in the vehicles breakdown: `, data3);
                        if(data3[0].length === 0)
                        {
                            console.log('Booking status is completed in the booking table and the vehicle details are fetched from the invoice table');
                            let selQuery = `SELECT i.id,
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
                            q.special_requirement,
                            e.no_of_horse,
                            pr.total_amount,
                            COALESCE(pr.received_amount, 0) AS received_amount,
                            DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                            COALESCE(pr.remaining_amount, 0) AS remaining_amount 
                            FROM invoices i
                            JOIN quotations q ON i.quot_id = q.id
                            JOIN customers c ON c.id = q.customer_id
                            JOIN service_providers sp ON q.serviceprovider_id = sp.id
                            JOIN taxations t ON t.id = q.taxation_id
                            JOIN discount_types d ON d.id = q.discount_type_id
                            JOIN enquiries e ON e.id = q.enquiry_id
                            JOIN payment_records pr ON pr.invoice_id = i.id
                            JOIN vehicles v ON v.id = i.vehicle_id
                            JOIN drivers dr ON dr.id = i.driver_id
                            WHERE i.id = ${Id}`;
                            // console.log('Data is not in the booking table query: ',selQuery);
                            con.query(selQuery, (err, result) =>
                            {
                                // console.log(`Result of booking id not present: `, result);
                                if (err)
                                {
                                    console.log(err);
                                    resolve('err');
                                } 
                                else
                                {
                                    var invoiceResponse =
                                    {
                                        "invoice": [],
                                        "vehicles" : [],
                                        "payment": []
                                    };
                                    if (result.length !== 0) 
                                    {
                                        // If result has data, populate the invoiceResponse data and payment arrays
                                        invoiceResponse.invoice.push
                                        ({
                                            "id": result[0].id,
                                            "iId": result[0].iId,
                                            "iDate": result[0].iDate,
                                            "pickup_time" : result[0].Ptime,
                                            "drop_time" : result[0].Dtime,
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
                                            "pickup_date": result[0].pickup_date,
                                            "drop_date": result[0].drop_date,
                                            "special_requirement": result[0].special_requirement,
                                            "no_of_horse": result[0].no_of_horse
                                        });
                                        for (let row of result) 
                                        {
                                            invoiceResponse.payment.push
                                            ({
                                                "id": row.id,
                                                "total_amount": row.iFinalAmount,
                                                "received_amount": row.received_amount,
                                                "received_date": row.received_date,
                                                "remaining_amount": row.remaining_amount
                                            });
                                        }
                                        let selQuery2 = `SELECT i.id, v.vehicle_number AS vehicle_no, i.driver_id ,d.name AS dName, i.pickup_point, i.drop_point FROM drivers d, vehicles v, invoices i WHERE i.id = ${Id} AND i.driver_id = d.id AND i.vehicle_id = v.id;`;
                                        con.query(selQuery2, (err, result2) =>
                                        {
                                            // console.log(`Second Select Query: `, selQuery2);
                                            if (err)
                                            {
                                                console.log(err);
                                                resolve('err');
                                            }
                                            else
                                            {
                                                for (let row of result2)
                                                {
                                                    invoiceResponse.vehicles.push
                                                    ({
                                                        "id": row.id,
                                                        "vehicle_number" : row.vehicle_no,
                                                        "driver_name" : row.dName,
                                                        "pickup_location": row.pickup_point,
                                                        "drop_location": row.drop_point,
                                                    });
                                                }
                                                resolve(invoiceResponse);
                                            }
                                        });
                                    }                            
                                }
                            });                              
                        }
                        else
                        {
                            console.log('Booking status is completed in the booking table and the vehicle details are fetched from the vehicle breakout');
                            let selQuery = `SELECT i.id,
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
                            q.drop_location,
                            DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                            DATE_FORMAT(q.drop_date, '%d-%m-%Y') AS drop_date,
                            q.special_requirement,
                            e.no_of_horse,
                            pr.total_amount,
                            COALESCE(pr.received_amount, 0) AS received_amount,
                            DATE_FORMAT(pr.received_date, '%d-%m-%Y') AS received_date,
                            COALESCE(pr.remaining_amount, 0) AS remaining_amount
                            FROM invoices i
                            JOIN quotations q ON i.quot_id = q.id
                            JOIN customers c ON c.id = q.customer_id
                            JOIN service_providers sp ON q.serviceprovider_id = sp.id
                            JOIN taxations t ON t.id = q.taxation_id
                            JOIN discount_types d ON d.id = q.discount_type_id
                            JOIN enquiries e ON e.id = q.enquiry_id
                            JOIN payment_records pr ON pr.invoice_id = i.id
                            JOIN vehicles v ON v.id = i.vehicle_id
                            JOIN drivers dr ON dr.id = i.driver_id
                            WHERE i.id = ${Id}`;
                            // console.log(selQuery);
                            con.query(selQuery, (err, result) =>
                            {
                                var invoiceResponse =
                                {
                                    "invoice": [],
                                    "vehicles" : [],
                                    "payment": []
                                };
                                if (err)
                                {
                                    console.log(err);
                                    resolve('err');
                                } 
                                else
                                {
                                    if (result.length !== 0) 
                                    {
                                        // If result has data, populate the invoiceResponse data and payment arrays
                                        invoiceResponse.invoice.push
                                        ({
                                            "id": result[0].id,
                                            "iId": result[0].iId,
                                            "iDate": result[0].iDate,
                                            "customer_name": result[0].customer_name,
                                            "companyName": result[0].companyName,
                                            "customerAddress": result[0].customerAddress,
                                            "companyAddress": result[0].companyAddress,
                                            "cusCountry": result[0].cusCountry,
                                            "comCountry": result[0].comCountry,
                                            "pickup_time" : result[0].Ptime,
                                            "drop_time" : result[0].Dtime,
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
                                            "pickup_date": result[0].pickup_date,
                                            "drop_date": result[0].drop_date,
                                            "special_requirement": result[0].special_requirement,
                                            "no_of_horse": result[0].no_of_horse
                                        });
                                        for (let row of result) 
                                        {
                                            invoiceResponse.payment.push
                                            ({
                                                "id": row.id,
                                                "total_amount": row.iFinalAmount,
                                                "received_amount": row.received_amount,
                                                "received_date": row.received_date,
                                                "remaining_amount": row.remaining_amount
                                            });
                                        }
                                    }
                                    let selQuery2 = `SELECT vb.vehicle_id, v.vehicle_number AS vehicle_no, vb.driver_id, d.name AS dName, vb.pickup_location, vb.drop_location FROM vehicles_breakouts vb, drivers d, vehicles v WHERE vb.invoice_id = ${Id} AND vb.driver_id = d.id AND vb.vehicle_id = v.id`;
                                    con.query(selQuery2, (err, result2) =>
                                    {
                                        // console.log(`Second Select Query: `, selQuery2);
                                        // console.log(`Second Select Result: `, result2);
                                        if (err)
                                        {
                                            console.log(err);
                                            resolve('err');
                                        }
                                        else
                                        {
                                            for (let row of result2)
                                            {
                                                invoiceResponse.vehicles.push
                                                ({
                                                    "id": row.id,
                                                    "vehicle_number" : row.vehicle_no,
                                                    "driver_name" : row.dName,
                                                    "pickup_location": row.pickup_location,
                                                    "drop_location": row.drop_location,
                                                });
                                            }
                                            resolve(invoiceResponse);
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });            
        }
        catch (error)
        {
            
        }
}