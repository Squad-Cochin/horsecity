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
            if(!err){
               console.log(data);
               
                const {customer_id,enquiry_id,driver_id,serviceprovider_id,discount_type_id,trip_type,pickup_location,pickup_country,pickup_date,drop_location,drop_country,drop_date,no_of_horse,special_requirement,additional_service,transportation_insurance_coverage,tax_amount,discount_amount,final_amount} = requestBody ;

                // let insQuery = `INSERT INTO ${constants.tableName.service_providers} (name, email, user_name, password, contact_person, contact_no, contact_address, emergency_contact_no, licence_image, licence_no, expiry_at, created_at)
                // VALUES ('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_person}', '${contact_no}', '${contact_address}', '${emergency_contact_no}', '${uploadAttachment}', '${licence_no}', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                
                con.query(insQuery,async(err,data)=>{
                    if(!err){
                        resolve(true)
                    }
                })

            }else{
                resolve(false)
            }
        })

        }catch(err){
            console.log('Error while adding service providers', err);
        }
    })    
}




