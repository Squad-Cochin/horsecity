const con = require("../../../configs/db.configs"); 
const timeCalculate = require('../../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../../utils/helper/commonoperation');
const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
require('dotenv').config()


exports.getLanguageNames = () =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       console.log("hello");

            const selQuery = `SELECT lng.id, lng.name
            FROM ${constants.tableName.languages} AS lng
            WHERE lng.deleted_at IS NULL AND lng.status = '${constants.status.active}'`;
            con.query(selQuery,(err,data)=>{

                if(!err){
                            resolve({languages : data})     
            }})
          
        }catch(err){
            console.log('Error while feching languages', err); 
        }


    })    
   
}



exports.getAllLanguages = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const {page, limit} = requestBody;
       
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT id, name, abbreviation,status,created_at
            FROM ${constants.tableName.languages} 
            WHERE deleted_at IS NULL
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{

                if(!err){

                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.languages}  
                                             WHERE deleted_at IS NULL`
                    // resolve(result);
                    con.query(totalCountQuery,async(err,result)=>{
                        if(!err){
                            for(let i = 0;i<data.length;i++){
                                data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                            }
                            const count = result[0]['count(*)'];  
                            resolve({totalCount : count, taxations : data})
                        } 
                })
            }})
          
        }catch(err){
            console.log('Error while feching taxations', err); 
        }


    })    
   
}



exports.getTaxationsNames = () =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       

            const selQuery = `SELECT tx.id, tx.name
            FROM ${constants.tableName.taxations} AS tx
            WHERE tx.deleted_at IS NULL AND tx.status = '${constants.status.active}'`;
            con.query(selQuery,(err,data)=>{

                if(!err){
                            resolve({taxations : data})     
            }})
          
        }catch(err){
            console.log('Error while feching taxations', err); 
        }


    })    
   
}

exports.addNewLanguage = (requestBody,file) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
       

        const {name,abbreviation} = requestBody ;
        let uploadLicence = await commonoperation.fileNameUpload(file?.language_file);
        let insQuery = `INSERT INTO ${constants.tableName.taxations} (type, name, value, created_at)
        VALUES ('${type}', '${name}', '${value}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
         
        con.query(insQuery,async(err,data)=>{
            if(!err){
                console.log(data);
                resolve(true)
            }
        })
        }catch(err){
            console.log('Error while adding service providers', err);
        }

  
    })    
   
}

exports.updateLanguage = (requestBody,id) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
        const {type,name,value} = requestBody ;         
        let validateQuery  = `SELECT * FROM ${constants.tableName.taxations} tx
                              WHERE id = '${id}' AND tx.deleted_at IS NULL`
        con.query(validateQuery,async(err,data)=>{
           console.log("data",data);
        if(data?.length != 0 ){

                    let updateQuery = `UPDATE ${constants.tableName.taxations} SET 
                type = '${type}',
                name = '${name}',
                value = '${value}',
                updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                WHERE id = '${id}'
                `;
            
                
                con.query(updateQuery,async(err,data)=>{
                    console.log("data",data);
                    if(data?.length != 0 ){
                        console.log("haii");
                        resolve({status : "SUCCESS"})
                    }else{
                        resolve({status : "FAILD"})
                    }
                })
        
          }else{
              resolve({status : "FAILD"})
          }
             })

        
        }catch(err){
            resolve({status : "FAILD"}) 
            console.log('Error while updating service providers', err);
        }

  
    })    
   
}



exports.getOneLanguage = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {    
            const selQuery = `SELECT tx.id, tx.type, tx.name, tx.value
            FROM ${constants.tableName.taxations} AS tx
            WHERE tx.id = '${id}'`

            con.query(selQuery,async(err,data)=>{
                if(data?.length != 0){
                   
                    
                    resolve({taxation : data})
                }else{
                    resolve({taxation : "NOTFOUND"})
                }
            })
        }catch(err){
            resolve({taxation : "NOTFOUND"})
            console.log('Error while getting one  taxation', err);
        }


    })    
   
}
