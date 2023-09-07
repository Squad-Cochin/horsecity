const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()


exports.getAllAcounts = (requestBody,spId) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {     
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit;
            const selRoleName = `
                                SELECT rl.name AS role_name, rl.id
                                FROM ${constants.tableName.service_providers} AS sp 
                                JOIN ${constants.tableName.roles} AS rl 
                                ON sp.role_Id = rl.id
                                WHERE sp.id = '${spId}' `;
        
            con.query(selRoleName,(err,data)=>{ 
              
                if(data.length != 0){ 
                

                    let role_id = data[0].id
   
                    const selQuery = `SELECT pr.id, inv.quotation_prefix_id AS quotation_id, cu.name AS customer_name, sp.name AS service_provider_name,
                    pr.total_amount AS total_amount, pr.remaining_amount AS pending_amount, pr.status
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
                    WHERE
                    (
                        ('${role_id}' = '${constants.Roles.admin}')
                        OR
                        ('${role_id}' = '${constants.Roles.super_admin}')
                        OR
                        ('${role_id}' = '${constants.Roles.service_provider}' AND inv.service_provider_id = '${spId}')
                    )
                    AND pr.updated_at IS NOT NULL
                    ORDER BY pr.invoice_id DESC
                    LIMIT ${+limit} OFFSET ${+offset};`;

                                                  
            con.query(selQuery,(err,data)=>{
                console.log("data",data);
                if(!err){
                    if(data.length != 0 ){


                        for(let i = 0;i<data.length;i++){
                            data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                        }
                        const totalCountQuery = `SELECT COUNT(*) FROM (
                            SELECT MAX(pr.id) AS max_id
                            FROM ${constants.tableName.payment_records} AS pr
                            JOIN ${constants.tableName.invoices} AS inv ON pr.invoice_id = inv.id
                            JOIN ${constants.tableName.service_providers} AS sp ON inv.service_provider_id = sp.id
                            WHERE
                            (
                                ('${role_id}' = '${constants.Roles.admin}')
                                OR
                                ('${role_id}' = '${constants.Roles.super_admin}')
                                OR
                                ('${role_id}' = '${constants.Roles.service_provider}' AND inv.service_provider_id = '${spId}')
                            )
                            AND pr.updated_at IS NOT NULL
                            GROUP BY inv.id
                        ) AS latest_payment_records
                         `
                        con.query(totalCountQuery,(err,result)=>{
                            console.log(err);
                            if(!err){
                                const count = result[0]['COUNT(*)'];


                                              /**CHECKING basis of role id module name */
                         let Query = `SELECT md.name AS module_name ,md.id AS module_id ,pm.create,pm.update,pm.read,pm.delete
                                      FROM ${constants.tableName.permissions} AS pm
                                      JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                      JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                      WHERE pm.role_id = '${role_id}'  AND md.id = '${constants.modules.accounts}'
                                      `;


                                      con.query(Query,(err,modules)=>{
                                        console.log("result",modules);
                                        if(!err){
                                  
                                  
                                            resolve({ totalCount: count, accounts: data ,module : modules})
                                        }
                                })
             
                            }
                    })

            }else{
                    resolve({totalCount : 0, accounts : [],module : []})
            }
            }
        })

        
    }else {
        resolve({totalCount : 0, accounts : [],module : []})
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

