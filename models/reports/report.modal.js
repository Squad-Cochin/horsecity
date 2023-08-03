const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()



/**For geting all service provider basis of from date & to date */
exports.getReportsServiceProviders = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {        
         
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT sp.id, sp.name AS service_provider_name, sp.contact_person, sp.contact_address,sp.contact_no AS contact_number,sp.created_at, sp.status
            FROM ${constants.tableName.service_providers} AS sp
            WHERE sp.deleted_at IS NULL AND sp.created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{

                if(!err){
                    
                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM service_providers sp
                                             WHERE sp.deleted_at IS NULL AND sp.created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, serviceProviders : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching service providers', err);
        }


    })    
   
}


/**For geting all customers basis of from date & to date */
exports.getReportsCustomers = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
         
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT cu.id, cu.name AS customer_name, cu.email,cu.contact_no AS contact_number,cu.created_at, cu.status
            FROM ${constants.tableName.customers} AS cu
            WHERE cu.deleted_at IS NULL AND cu.created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{

                if(!err){

                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.customers} cu
                                             WHERE cu.deleted_at IS NULL AND cu.created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, customers : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching customers', err);
        }


    })    
   
}




/**For geting all vehicles basis of from date & to date */
exports.getReportsVehicles = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
         
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT vh.id, sp.name AS service_provider_name,vh.make,vh.model,vh.no_of_horse AS max_no_horse, vh.vehicle_number ,vh.vehicle_registration_date,vh.created_at,vh.status
            FROM ${constants.tableName.vehicles} AS vh
            JOIN ${constants.tableName.service_providers} sp ON vh.service_provider_id  = sp.id
            WHERE vh.deleted_at IS NULL AND vh.created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{
                    console.log(err);
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                        data[i].vehicle_registration_date = `${time.formatDateToDDMMYYYY(data[i].vehicle_registration_date)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.vehicles} vh
                                             WHERE vh.deleted_at IS NULL AND vh.created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, vehicles : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching vehicles', err);
        }


    })    
   
}



/**For geting all drivers basis of from date & to date */
exports.getReportsDrivers = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
         
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT id,name AS driver_name,email,contact_no AS contact_number,created_at,status
            FROM ${constants.tableName.drivers} 
            WHERE deleted_at IS NULL AND created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{
 
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.drivers} 
                                             WHERE deleted_at IS NULL AND created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, drivers : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching drivers', err);
        }


    })    
   
}


/**For geting all enquiries basis of from date & to date */
exports.getReportsEnquiries = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
   
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT enq.id AS enquiry_id, cu.name AS customer_name,sp.name AS service_provider_name,enq.created_at,enq.status
            FROM ${constants.tableName.enquiries} AS enq
            JOIN ${constants.tableName.service_providers} sp ON enq.serviceprovider_id  = sp.id
            JOIN ${constants.tableName.customers} cu ON enq.customer_id  = cu.id
            WHERE  enq.created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.enquiries} 
                                             WHERE created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, enquiries : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching enquiries', err);
        }


    })    
   
}


/**For geting all quotations basis of from date & to date */
exports.getReportsQuotations = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
   
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT quo.id,quo.quotation_id AS quotation_id , cu.name AS customer_name,sp.name AS service_provider_name,quo.created_at,quo.status
            FROM ${constants.tableName.quotations} AS quo
            JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id  = sp.id
            JOIN ${constants.tableName.customers} cu ON quo.customer_id  = cu.id
            WHERE quo.deleted_at IS NULL  AND  quo.created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.quotations} 
                                             WHERE deleted_at IS NULL AND created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, quotations : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching quotations', err);
        }


    })    
   
}


/**For geting all Trip details basis of from date & to date */
exports.getReportsTripDetails = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
   
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT td.id,inv.quotation_prefix_id AS quotation_id , cu.name AS customer_name,sp.name AS service_provider_name,td.pickup_date AS start_date ,td.drop_date AS end_date,td.created_at,td.booking_status AS status
            FROM ${constants.tableName.bookings} AS td
            JOIN ${constants.tableName.service_providers} sp ON td.service_provider_id   = sp.id
            JOIN ${constants.tableName.customers} cu ON td.customer_id  = cu.id
            JOIN ${constants.tableName.invoices} inv ON td.inv_id   = inv.id
            WHERE td.deleted_at IS NULL  AND  td.created_at BETWEEN '${fromDate}' AND '${toDate}'
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                        data[i].start_date = `${time.formatDateToDDMMYYYY(data[i].start_date)}`;
                        data[i].end_date = `${time.formatDateToDDMMYYYY(data[i].end_date)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.bookings} 
                                             WHERE deleted_at IS NULL AND created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, tripDetails : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching quotations', err);
        }


    })    
   
}


/**For geting all invoices basis of from date & to date */
exports.getReportsInvoices = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
   
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

             const selQuery = `SELECT inv.id, inv.invoice_no  AS invoice_id, cu.name AS customer_name, sp.name AS service_provider_name,inv.created_at
                               FROM ${constants.tableName.invoices} AS inv
                               JOIN ${constants.tableName.service_providers} sp ON inv.service_provider_id = sp.id
                               JOIN ${constants.tableName.quotations} quo ON inv.quot_id = quo.id
                               JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
                               WHERE inv.deleted_at IS NULL AND inv.created_at BETWEEN '${fromDate}' AND '${toDate}'
                               LIMIT ${+limit} OFFSET ${+offset}`;
                                                            
                                                  
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.bookings} 
                                             WHERE deleted_at IS NULL AND created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, invoices : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching invoica', err);
        }


    })    
   
}




/**For geting all invoices basis of from date & to date */
exports.getAccountsReports = (requestBody,fromDate,toDate) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
   
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT pr.id, inv.quotation_prefix_id AS quotation_id, cu.name AS customer_name, sp.name AS service_provider_name,
                        pr.total_amount AS final_amount, pr.remaining_amount,
                        pr.created_at
                        FROM payment_records AS pr
                        JOIN invoices inv ON pr.invoice_id = inv.id
                        JOIN service_providers sp ON inv.service_provider_id = sp.id
                        JOIN quotations quo ON inv.quot_id = quo.id
                        JOIN customers cu ON quo.customer_id = cu.id
                        JOIN (
                            SELECT MAX(id) AS max_id
                            FROM payment_records
                            GROUP BY invoice_id
                        ) max_pr ON pr.id = max_pr.max_id
                        WHERE pr.created_at BETWEEN '${fromDate}' AND '${toDate}'
                        ORDER BY pr.invoice_id DESC
                        LIMIT ${+limit} OFFSET ${+offset};`
                                                  
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){


                    for(let i = 0;i<data.length;i++){
                        data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                    }
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.payment_records} 
                                             WHERE  created_at BETWEEN '${fromDate}' AND '${toDate}'`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            resolve({totalCount : count, accounts : data})
                        }
                })
            }})
        }catch(err){
            console.log('Error while feching reports', err);
        }


    })    
   
}