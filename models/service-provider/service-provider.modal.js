const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()


exports.getAllServiceProviders = (requestBody,spId) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            
            const {page, limit} = requestBody;
            const offset = (page - 1) * limit; 
            const selRoleName = `SELECT rl.name AS role_name,rl.id
            FROM service_providers AS sp          
            JOIN ${constants.tableName.roles} AS rl ON sp.role_Id   = rl.id
            WHERE sp.id = '${spId}'`;
  
            con.query(selRoleName,(err,data)=>{ 
    
           if(!err){ 
         
                let role = data[0].role_name ;
                let role_id = data[0].id
        
                    const selQuery = `
                    SELECT sp.id, sp.name, sp.email, sp.contact_person, sp.contact_no, sp.status
                    FROM service_providers AS sp
                    JOIN ${constants.tableName.roles} rl ON sp.role_Id = rl.id
                    WHERE sp.deleted_at IS NULL
                    AND (
                        ('${role}' = '${constants.roles.admin}')
                        OR
                        ('${role}' = '${constants.roles.admin}')
                        OR
                        (
                            '${role}' = '${constants.roles.service_provider}'
                            AND sp.id = '${spId}'
                        )
                    )
                    LIMIT ${+limit} OFFSET ${+offset};
                `;
                
                
                con.query(selQuery,(err,data)=>{
           

                    if(!err){
                        const totalCountQuery = `SELECT count(*) FROM service_providers sp
                                                WHERE sp.deleted_at IS NULL
                                                AND (
                                                    ('${role}' = '${constants.roles.admin}')
                                                    OR
                                                    (
                                                        '${role}' = '${constants.roles.service_provider}'
                                                        AND sp.id = '${spId}'
                                                    )
                                                )`
                        con.query(totalCountQuery,(err,result)=>{
                            if(!err){
                            
                                const count = result[0]['count(*)'];

                                 /**CHECKING basis of role id module name */
                                let Query = `SELECT md.name AS module_name ,md.id AS module_id ,pm.create,pm.update,pm.read,pm.delete
                                FROM ${constants.tableName.permissions} AS pm
                                JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                WHERE pm.role_id = '${role_id}'  AND md.id = '${constants.modules.service_provider}'`;
                              console.log(Query);
                               console.log(role_id);
                                    con.query(Query,(err,result)=>{
                                        // console.log("result",result);
                                        if(!err){
                                  
                                            resolve({totalCount : count, serviceProviders : data ,module : result})
                                        }
                                })
                 
                            }
                    })
                }})

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
       
        let uploadAttachment = await commonoperation.fileUpload(file, constants.attachmentLocation.serviceProvider.licenceImage.upload);
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
        let uploadLicence = await commonoperation.fileUpload(file?.licence_image, constants.attachmentLocation.serviceProvider.licenceImage.upload);
        const invalidFormat = "INVALIDFORMAT";
        const invalidAttachment = 'INVALIDATTACHMENT'
        if(uploadLicence.message == invalidFormat ){
            resolve({ status: invalidFormat });
        }else if(uploadLicence.message == invalidAttachment ||
                uploadLicence ){

        const {name,email,user_name,contact_person,contact_no,emergency_contact_no,contact_address,licence_no} = requestBody ;
        let updateQuery = `UPDATE ${constants.tableName.service_providers} SET 
        name = '${name}',
        email = '${email}',
        user_name = '${user_name}',
        contact_person = '${contact_person}',
        contact_no = '${contact_no}',
        contact_address = '${contact_address}',
        emergency_contact_no = '${emergency_contact_no}',
        ${uploadLicence.message === invalidAttachment ? '' : `licence_image = '${uploadLicence}',`} 
        licence_no = '${licence_no}',
        expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
        updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
        WHERE id = '${id}'`;
    
        con.query(updateQuery,async(err,data)=>{
            if(data?.length != 0 ){
                resolve({status : "SUCCESS"})
            }else{
                resolve({status : "FAILD"})
            }
        })
        }
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
                    console.log(data);
                    let licenceImage = data[0].licence_image;
                    data[0].licence_image = `${process.env.PORT_SP}${constants.attachmentLocation.serviceProvider.licenceImage.view}${licenceImage}`;
                    
                    resolve({serviceProvider : data})
                }else{
                    resolve({serviceProvider : "NOTFOUND"})
                }
            })
        }catch(err){
            console.log('Error while getting one  service providers', err);
        }
    })    
}

exports.getNameServiceProviders = () =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const selQuery = `SELECT sp.id,sp.user_name
            FROM service_providers AS sp
            WHERE sp.deleted_at IS NULL AND sp.status = '${constants.status.active}'
            `;
            con.query(selQuery,(err,data)=>{
                if(!err){
                     resolve({serviceProviders : data})
              }})
        }catch(err){
            console.log('Error while feching service providers', err);
        }
    })    
}



/**For getting particlar service provider vehicle */
exports.getSpVehicles = (spID) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            console.log(spID);
            const selQuery = `SELECT vh.id, vh.vehicle_number
            FROM ${constants.tableName.vehicles} AS vh
            WHERE vh.service_provider_id = '${spID}'
            AND vh.deleted_at IS NULL AND vh.status = '${constants.status.active}'`;

            con.query(selQuery,async(err,data)=>{
                if(data?.length != 0){                  
                    resolve({vehicles : data})
                }else{
                    resolve({vehicles : []})
                }
            })
        }catch(err){
            resolve({vehicles : "NOTFOUND"})
            console.log('Error while feching vehicles', err);
        }
    })    
}


/**For getting particlar service provider driver */
exports.getSpDrivers = (spID) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
       
            const selQuery = `SELECT dvr.id, dvr.name
            FROM ${constants.tableName.assign_drivers} AS asd
            JOIN ${constants.tableName.drivers} dvr ON asd.driver_id = dvr.id
            WHERE asd.service_provider_id = '${spID}'
            AND dvr.deleted_at IS NULL AND dvr.status = '${constants.status.active}' AND asd.deleted_at IS NULL`;

            con.query(selQuery,async(err,data)=>{
                if(data?.length != 0){                  
                    resolve({drivers : data})
                }else{
                    resolve({drivers :[] })
                }
            })
        }catch(err){
            resolve({drivers : "NOTFOUND"})
            console.log('Error while feching particular service provider drivers', err);
        }
    })    
}

                         
             
