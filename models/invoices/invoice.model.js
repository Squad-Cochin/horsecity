/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const objectConvertor = require('../../utils/objectConvertor');
const mail = require('../../utils/mailer');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs');

module.exports = class invoices
{
    constructor(){}

    static async getall(pageNumber, pageSize, Id)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log('Check Role Data: ', checkRole);
                con.query(checkRole, async (err, result) =>
                {
                    // console.log(`Role: `, result);
                    if(err)
                    {
                       console.log('Error while checking the role at the time of invoice');
                       resolve('err') 
                    }
                    if(result[0].name === constants.roles.admin || result[0].name === constants.roles.superAdmin)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT i.id, i.invoice_no, i.quotation_prefix_id, c.name, c.email, i.status
                                        FROM invoices i
                                        JOIN quotations q ON i.quot_id = q.id
                                        JOIN customers c ON q.customer_id = c.id
                                        WHERE i.deleted_at IS NULL
                                        LIMIT ${pageSize} OFFSET ${offset}`;
                        // console.log('Selquery of invoice when user is admin or suport admin: ',selQuery);
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
                    }
                    else if(result[0].name === constants.roles.service_provider)
                    {
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT i.id, i.invoice_no, i.quotation_prefix_id, c.name, c.email, i.status
                                        FROM invoices i
                                        JOIN quotations q ON i.quot_id = q.id
                                        JOIN customers c ON q.customer_id = c.id
                                        WHERE i.deleted_at IS NULL AND i.service_provider_id = ${Id}
                                        LIMIT ${pageSize} OFFSET ${offset}`;
                        // console.log('Selquery of invoice when user is service provider: ',selQuery);
                        const count = await commonoperation.totalCountParticularServiceProvider(constants.tableName.invoices, Id);
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
                    }
                    else
                    {
                        console.log('I think the role name which we got is not present in the database at the time of invoice');
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

    static async getone(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject) =>
            {
                // The below one is for the invoice id available in the booking table
                let data1 = await commonfetching.dataOnCondition(constants.tableName.bookings, Id, 'inv_id');
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
                        let data3 = await commonfetching.dataOnCondition(constants.tableName.vehicles_breakouts, Id, 'invoice_id')
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
    };

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
                            console.log(upQuery);
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
                                    console.log(insQuery);
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



    static async sendemailatinvoice(id, to, subject, body)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const emailSent = await mail.SendEmail(id, to, body, subject);
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
                let selQuery = `SELECT i.id, i.invoice_no, t.subject, c.email, t.template
                FROM customers c, invoices i, quotations q, templates t
                WHERE i.id = ${Id} AND c.id = q.customer_id AND q.id = i.quot_id`;
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


    static async bookingstart(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let data = await commonfetching.dataOnCondition(constants.tableName.invoices, Id, 'id')
                // console.log(`Data at the booking got start button from the invoice table: `, data);

                let data3 = await commonfetching.dataOnCondition(constants.tableName.bookings, data[0].invoice_no, 'invoice_prefix_id')
                // console.log('Data 3: ', data3);
                if(data3.length != 0)
                {
                    console.log(`Duplicate invoice number. Cannot enter`);
                    resolve('duplicate');
                }
                else
                {
                    let data2 = await commonfetching.dataOnCondition(constants.tableName.quotations, data[0].quot_id, 'id');
                    // console.log(`Data at the booking got start button from the quotation table: `, data2);

                    const insQuery = `INSERT INTO bookings(customer_id, inv_id, invoice_prefix_id, service_provider_id, vehicle_id, driver_id, taxation_id, discount_type_id, status, booking_status, pickup_location, pickup_country, pickup_date, pickup_time, drop_location, drop_country, drop_date, drop_time ,confirmation_sent, sub_total, tax_amount, discount_amount, final_amount, created_at) VALUES(${data2[0].customer_id}, ${data[0].id}, '${data[0].invoice_no}', ${data[0].service_provider_id}, ${data[0].vehicle_id}, ${data[0].driver_id}, ${data2[0].taxation_id}, ${data2[0].discount_type_id}, 'PENDING', 'CONFIRM', '${data[0].pickup_point}', '${data2[0].pickup_country}', '${time.changeDateToSQLFormat(data2[0].pickup_date)}', '${data2[0].pickup_time}','${data[0].drop_point}', '${data2[0].drop_country}', '${time.changeDateToSQLFormat(data2[0].drop_date)}', '${data2[0].drop_time}', 'YES',  ${data[0].sub_total},  ${data[0].tax_amount},  ${data[0].discount_amount},  ${data[0].final_amount}, '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                    console.log('Insert Booking Query: ',insQuery);
                    con.query(insQuery, (err, result) =>
                    {
                        console.log(`Insert result of the booking : `, result);
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
                            let upQuery = `UPDATE invoices i SET i.status = 'STARTED' WHERE i.id = ${Id}`;
                            console.log('Update Query: ', upQuery);
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

    static async getdatafrombookingtable(id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let data = await commonfetching.dataOnCondition(constants.tableName.bookings, id, 'inv_id')
                // console.log(`Invoice checking in the booking table`, data);
                
                if(data.length !== 0)
                {
                    console.log('Invoice number found in the booking table');
                    resolve(data);
                }
                else
                {
                    console.log(`Invoice number is not present in the booking table`);
                    resolve('noData');
                }
            });
        }
        catch(error)
        {

        }
    };







};






