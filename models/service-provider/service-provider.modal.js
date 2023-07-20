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

                    const totalCountQuery = `SELECT count(*) FROM service_providers sp
                                             WHERE sp.deleted_at IS NULL`
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
                resolve(true)
            }
        })
        }catch(err){
            console.log('Error while adding service providers', err);
        }

  
    })    
   
}

exports.updateServiceProvider = (requestBody,file,id) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
       
        let uploadAttachment = await commonoperation.fileUpload(file, constants.attachmentLocation.serviceProvider.licenceImage);
        const {name,email,user_name,password,contact_person,contact_no,emergency_contact_no,contact_address,licence_no} = requestBody ;

        let updateQuery = `UPDATE ${constants.tableName.service_providers} SET 
        name = '${name}',
        email = '${email}',
        user_name = '${user_name}',
        password = '${await commonoperation.changePasswordToSQLHashing(password)}',
        contact_person = '${contact_person}',
        contact_no = '${contact_no}',
        contact_address = '${contact_address}',
        emergency_contact_no = '${emergency_contact_no}',
        licence_image = '${uploadAttachment}',
        licence_no = '${licence_no}',
        expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
        updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
        WHERE id = '${id}'`;
    
         
        con.query(updateQuery,async(err,data)=>{
            if(data?.length != 0 ){
                resolve({serviceProvider : "SUCCESS"})
            }else{
                resolve({serviceProvider : "FAILD"})
            }
        })
        }catch(err){
            console.log('Error while updating service providers', err);
        }

  
    })    
   
}



exports.getOneServiceProvider = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const selQuery = `SELECT sp.id, sp.name, sp.email, sp.user_name, sp.contact_person, sp.contact_no, sp.contact_address, sp.emergency_contact_no, sp.licence_no, sp.licence_image
            FROM ${constants.tableName.service_providers} AS sp
            WHERE sp.id = '${id}'`

            con.query(selQuery,async(err,data)=>{
                if(data?.length != 0){
                    resolve({serviceProvider : data})
                }else{
                    resolve({serviceProvider : "NotFound"})
                }
            })
        }catch(err){
            console.log('Error while getting one  service providers', err);
        }


    })    
   
}
