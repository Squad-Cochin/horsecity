const con = require("../../../configs/db.configs"); 
const timeCalculate = require('../../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../../utils/helper/commonoperation');
const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
require('dotenv').config()


exports.getAllTaxations = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const {page, limit} = requestBody;
       
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT tx.id, tx.name, tx.type ,tx.value,tx.status,tx.created_at
            FROM taxations AS tx
            WHERE tx.deleted_at IS NULL
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{

                if(!err){

                    const totalCountQuery = `SELECT count(*) FROM taxations sp
                                             WHERE sp.deleted_at IS NULL`
                    // resolve(result);
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
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


exports.addNewTaxation = (requestBody) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
       

        const {type,name,value} = requestBody ;

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

exports.updateTaxation = (requestBody,id) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
        const {type,name,value} = requestBody ;         

        let updateQuery = `UPDATE ${constants.tableName.taxations} SET 
        type = '${type}',
        name = '${name}',
        value = '${value}',
        updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
        WHERE id = '${id}'`;
    
         
        con.query(updateQuery,async(err,data)=>{
            console.log("data",data);
            if(data?.length != 0 ){
                resolve({status : "SUCCESS"})
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



exports.getOneTaxation = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {    
            const selQuery = `SELECT tx.id, tx.type, tx.name, value
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
            console.log('Error while getting one  service providers', err);
        }


    })    
   
}
