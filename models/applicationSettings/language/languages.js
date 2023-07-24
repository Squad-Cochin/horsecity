const con = require("../../../configs/db.configs"); 
const timeCalculate = require('../../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../../utils/helper/commonoperation');
const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
require('dotenv').config()


exports.getLanguages = () =>
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

