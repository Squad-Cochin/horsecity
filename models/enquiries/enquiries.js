const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()


exports.getAllEnquiries = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const {page, limit} = requestBody;
       
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT enq.id, cu.name AS customer_name,sp.name AS service_provider,enq.status,enq.created_at
            FROM ${constants.tableName.enquiries} AS enq
            JOIN ${constants.tableName.customers} cu ON enq.customer_id = cu.id
            JOIN ${constants.tableName.service_providers} sp ON enq.serviceprovider_id = sp.id
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{

                if(!err){

                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.enquiries}`
                    // resolve(result);
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            for (let i = 0; i < data.length; i++) {
                                data[i].created_at = `${time.formatDateToDDMMYYYY(
                                  data[i].created_at
                                )}`;
                              }
                              console.log("data",data);
                            resolve({totalCount : count, enquiries : data})
                        }
                })
            }})
          
        }catch(err){
            console.log('Error while feching equiries', err);
        }


    })    
   
}





exports.getOneEnquiry = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {     
            const selQuery = `SELECT enq.id, cu.name AS customer_name,cu.id AS customer_id ,cu.contact_no AS customer_contact_no ,sp.name AS service_provider_name,sp.id AS service_provider_id,enq.trip_type,enq.drop_country,enq.pickup_country,  vh.id AS vehicle_id, vh.vehicle_number,enq.no_of_horse,enq.created_at, enq.pickup_location, enq.drop_location, enq.description
            FROM ${constants.tableName.enquiries} AS enq
            JOIN ${constants.tableName.customers} cu ON enq.customer_id = cu.id
            JOIN ${constants.tableName.vehicles} vh ON enq.vehicle_id = vh.id
            JOIN ${constants.tableName.service_providers} sp ON enq.serviceprovider_id = sp.id
            WHERE enq.id = '${id}'`

            con.query(selQuery,async(err,data)=>{
                if(data?.length != 0){

                    data[0].created_at = `${time.formatDateToDDMMYYYY(
                        data[0].created_at
                      )}`;

                      /***For selecting tax */
                    let selQuery = `SELECT 	tx.id , tx.type,tx.name,tx.value 
                                    FROM ${constants.tableName.application_settings} apps
                                    JOIN ${constants.tableName.taxations} tx ON apps.tax_id = tx.id
                                    `
                    con.query(selQuery,async(err,tax)=>{
                        if(tax.length != 0){
                    //    console.log({tax : tax});
                            resolve({enquiry : data,tax : tax})
                        }else{
                            resolve({enquiry : data,tax : []})
                        }
                    })
                }else{
                    resolve({enquiry : []})
                }
            })
        }catch(err){
          
            resolve({enquiry : "NOTFOUND"})
            console.log('Error while getting one enquiry', err);
        }


    })    
   
}

