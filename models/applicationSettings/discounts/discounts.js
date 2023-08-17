const con = require("../../../configs/db.configs"); 
const timeCalculate = require('../../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../../utils/helper/commonoperation');
const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
require('dotenv').config()


module.exports = class discounts
{
    static async getAllDiscounts (requestBody) 
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const {page, limit} = requestBody;
       
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT ds.id, ds.name, ds.type ,ds.rate,ds.status,ds.created_at
            FROM ${constants.tableName.discount_types} AS ds
            WHERE ds.deleted_at IS NULL
            LIMIT ${+limit} OFFSET ${+offset}`;
            con.query(selQuery,(err,data)=>{
            
                if(!err){
                    console.log("hello",data);
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.discount_types} tx
                                             WHERE tx.deleted_at IS NULL`
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];
                            console.log("data",data[0].created_at);
                            for(let i = 0;i<data.length;i++){
                                data[i].created_at = `${time.formatDateToDDMMYYYY(data[i].created_at)}`;
                            }
               
                            resolve({totalCount : count, discounts : data})
                        }
                })
            }})
          
        }catch(err){
            console.log('Error while feching discounts', err);
        }


    })    
   
}

static async  addNewDiscount  (requestBody) 
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
       

        const {type,name,rate} = requestBody ;

        let insQuery = `INSERT INTO ${constants.tableName.discount_types} (type, name, rate, created_at)
        VALUES ('${type}', '${name}', '${rate}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
         
        con.query(insQuery,async(err,data)=>{
            if(!err){
                console.log(data);
                resolve(true)
            }
        })
        }catch(err){
            console.log('Error while adding discount', err);
        }

  
    })    
   
}

static async  updateDiscount (requestBody,id) 
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {  
            /**iF the deleted id */
        const {type,name,rate} = requestBody ;         
        let validateQuery  = `SELECT * FROM ${constants.tableName.discount_types} 
                              WHERE  id = '${id}' AND deleted_at IS NULL`
        con.query(validateQuery,async(err,data)=>{
           console.log("data",data);
        if(data?.length != 0 ){

                    let updateQuery = `UPDATE ${constants.tableName.discount_types} SET 
                type = '${type}',
                name = '${name}',
                rate = '${rate}',
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



static async  getOneDiscount(id) 
{
    return new Promise((resolve, reject) =>
    {
        try
        {    
            const selQuery = `SELECT ds.id, ds.type, ds.name, ds.rate
            FROM ${constants.tableName.discount_types} AS ds
            WHERE ds.id = '${id}' AND ds.deleted_at IS NULL`

            con.query(selQuery,async(err,data)=>{
                if(data?.length != 0){
                   
                    
                    resolve({discount : data})
                }else{
                    resolve({discount : "NOTFOUND"})
                }
            })
        }catch(err){
            resolve({discount : "NOTFOUND"})
            console.log('Error while getting one  discount', err);
        }


    })    
   
}

static async getallactivediscount  () 
{
    return await new Promise((resolve, reject) =>
    {
        try
        {
            let selQuery = `SELECT ds.id, ds.name,ds.type,ds.rate FROM discount_types ds WHERE ds.deleted_at IS NULL AND ds.status = '${constants.status.active}' `;
            // console.log(selQuery);
            con.query(selQuery, (err, result) =>
            {
                // console.log(result);
                if(result.length !== 0)
                {
                    console.log('Data Fetched');
                    resolve(result);
                }    
                else if(result.length == 0)
                {
                    console.log('No data present to show');
                    resolve(result);
                }  
                else
                {
                    console.log(err);
                    resolve('err');
                }                          
            });
        }
        catch(error)
        {
            console.log(`Error from 'dicount.js' file. In the controllers>dicounts>dicounts.js. Function from which the eror we are getting is 'getallactivediscount' `);
        }
    });
}

}