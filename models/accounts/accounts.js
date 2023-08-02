const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()


exports.getAllAcounts = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {     
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT pr.id, inv.quotation_prefix_id AS quotation_id, cu.name AS customer_name, sp.name AS service_provider_name,
                        pr.total_amount AS total_amount, pr.remaining_amount AS pending_amount,pr.status
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
                        ORDER BY pr.invoice_id DESC
                        LIMIT ${+limit} OFFSET ${+offset};`
                                                  
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){
                    if(data.length != 0 ){


                        for(let i = 0;i<data.length;i++){
                            data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                        }
                        const totalCountQuery = `SELECT COUNT(*)
                        FROM ${constants.tableName.payment_records} pr
                        WHERE pr.id IN (
                            SELECT MAX(id)
                            FROM ${constants.tableName.payment_records}
                            GROUP BY invoice_id
                        )`
                        con.query(totalCountQuery,(err,result)=>{
                            console.log(result);
                            if(!err){
                                const count = result[0]['COUNT(*)'];
                                console.log(count);
                                resolve({totalCount : count, accounts : data})
                            }
                    })

            }else{
                    resolve({totalCount : 0, accounts : []})
            }
            }
        })
        }catch(err){
            console.log('Error while feching equiries', err);
        }


    })    
   
}





exports.getOneAccountDetails = (quotId) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {         


            const selQuery = `SELECT pr.id,pr.received_amount , pr.remaining_amount AS pending_amount,pr.received_date
                        FROM payment_records AS pr
                        JOIN invoices inv ON pr.invoice_id = inv.id
                        WHERE inv.quotation_prefix_id = '${quotId}'`
                                                  
            con.query(selQuery,(err,data)=>{
                console.log(err);
                if(!err){
                    if(data.length != 0 ){
                       for(let i = 0;i<data.length;i++){
                            data[i].received_date = `${time.formatDateToDDMMYYYY(data[i].received_date)}`;
                        }
                                resolve({accounts : data})

            }else{
                    resolve({accounts : []})
            }
            }
        })
        }catch(err){
          
            resolve({enquiry : "NOTFOUND"})
            console.log('Error while getting one enquiry', err);
        }


    })    
   
}

