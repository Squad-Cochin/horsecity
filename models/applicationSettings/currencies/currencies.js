////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//   This is currencies model file. Where all the logic of the currencies program is written. //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../../configs/db.configs"); 
const constants = require('../../../utils/constants');
require('dotenv').config()

module.exports = class currencie
{
    /****This function for fetching currencie names */
    static async getCurrenciesNames  ()
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
            }else{
                resolve('NODATA')
            }
        })
          
        }catch(err){
            console.log('Error while feching currencies', err); 
        }


    })    
   
}

}