const con = require("../../../configs/db.configs"); 
const timeCalculate = require('../../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../../utils/helper/commonoperation');
const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
require('dotenv').config()


exports.getCurrencies = () =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {       

            const selQuery = `SELECT id, name
            FROM ${constants.tableName.currencies} 
            WHERE deleted_at IS NULL AND status = '${constants.status.active}'`;
            con.query(selQuery,(err,data)=>{

                if(!err){
                            resolve({currencies : data})     
            }})
          
        }catch(err){
            console.log('Error while feching currencies', err); 
        }


    })    
   
}
