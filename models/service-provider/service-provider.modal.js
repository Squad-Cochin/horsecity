const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
exports.getAllServiceProviders = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const {page, limit} = requestBody;
       
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT sp.id, sp.name, sp.email, sp.contact_person, sp.contact_no, sp.status
            FROM service_providers AS sp
            WHERE sp.deleted_at IS NULL
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{

                if(!err){

                    const totalCountQuery = `SELECT count(*) FROM service_providers`
                    // resolve(result);
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


exports.addNewServiceProviders = (requestBody,file) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
       
        let uploadAttachment = await commonoperation.fileUpload(file, constants.attachmentLocation.serviceProvider.licenceImage);
        const {name,email,user_name,password,contact_person,contact_no,emergency_contact_no,contact_address,licence_no} = requestBody ;

        let insQuery = `INSERT INTO ${constants.tableName.service_providers} (name, email, user_name, password, contact_person, contact_no, contact_address, emergency_contact_no, licence_image, licence_no, expiry_at, created_at)
        VALUES ('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_person}', '${contact_no}', '${contact_address}', '${emergency_contact_no}', '${uploadAttachment}', '${licence_no}', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
         
        con.query(insQuery,async(err,data)=>{
            if(!err){
                console.log("succeess");
                resolve(true)
            }
        })
        }catch(err){
            console.log('Error while adding service providers', err);
        }

  
    })    
   
}