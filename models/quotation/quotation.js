const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()


exports.addNewQuotaion = (requestBody) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
        let selQuery = `SELECT 	tax_id  FROM ${constants.tableName.application_settings}`
        con.query(selQuery,async(err,data)=>{
            if(data.length != 0){
                let tax_id = data[0].tax_id
               
                const {customer_id,enquiry_id,driver_id,vehicle_id,service_provider_id,discount_type_id,trip_type,pickup_location,pickup_country,pickup_date,drop_location,drop_country,drop_date,no_of_horse,special_requirement,additional_service,transportation_insurance_coverage,tax_amount,discount_amount,final_amount} = requestBody ;

                let insQuery = `INSERT INTO quotations (customer_id, enquiry_id, driver_id, vehicle_id, serviceprovider_id, taxation_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage, tax_amount, discount_amount, final_amount,created_at)
                VALUES ('${customer_id}', '${enquiry_id}', '${driver_id}', '${vehicle_id}', '${service_provider_id}', '${tax_id}', '${discount_type_id}', '${trip_type}', '${pickup_location}', '${pickup_country}','${pickup_date}', '${drop_location}','${drop_country}', '${drop_date}','${no_of_horse}','${special_requirement}', '${additional_service}','${transportation_insurance_coverage}', '${tax_amount}','${discount_amount}','${final_amount}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                
                con.query(insQuery,async(err,data)=>{
                    if(!err){
                        let updateQuery = `UPDATE ${constants.tableName.enquiries} SET  
                        status = '${constants.enquiry_status.confirmed}'
                        WHERE id = '${enquiry_id}'`;
    
                        con.query(updateQuery,async(err,data)=>{
                            console.log("data",data);
                            if(data?.length != 0 ){
                                resolve(true)
                               
                            }else{
                                resolve(false)
                            }
                        })
                    }else{
                        resolve(false)
                    }
                })

            }else{
                resolve(false)
            }
        })

        }catch(err){
            resolve(false)
            console.log('Error while adding quotation', err);
        }
    })    
}




