/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avaoided.                                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");  // importing the database details

exports.getAllDataOfDriverAndCustomer = (tablename, pageNumber, pageSize) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            // Calculate the offset based on the page number and page size
            const offset = (pageNumber - 1) * pageSize;
            let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${tablename} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
            // console.log(selQuery);
            con.query(selQuery, (err, result) =>
            {
                // console.log(`result`, result);
                if (err)
                {
                    console.log(`Error while executing the query:`, err);
                    reject(err);
                }
                if (result.length > 0)
                {
                    console.log(`Data present and fetched`);
                    resolve(result);
                }
                else
                {
                    console.log(`Query executed but data not present in the table.`);
                    resolve([]);
                }                
            });
        });        
    }
    catch(error)
    {
        console.log(`Error from the commonfetching.js file from the utils > helper folder. In the function "getAllDataOfDriverAndCustomer". Which is designed to fetch all the data of customer and driver through the same function`);        
    }
}


exports.dataOnCondition = async (tableName, Value, feildName) =>
{
    try 
    {
        return await new Promise(async (resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.${feildName} = '${Value}'`;
            console.log(`Universal Query At Normal Condition: `, selQuery);
            con.query(selQuery, (err, result) =>
            {
                if(err)
                {
                    resolve(`err`);
                }
                else
                {
                    if (result.length > 0)
                    {
                        resolve(result);
                    }
                    else
                    {
                        resolve([]);
                    }
                }                
            });          
        });        
    }
    catch (error)
    {
        
    }
};

exports.dataOnConditionUpdate = async(tableName, feildName, Value, id, messageFeild) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.id = '${id}' AND t.${feildName} = '${Value}'`;
            // console.log(`Universl Query At Update Condition: `, selQuery);
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log(`Error in the data on update`);
                    resolve(`internalError`)
                }
                
                if(result.length > 0)
                {
                    console.log(`I think ${messageFeild} is not updating this time`);
                    resolve(`valuenotchanged`);
                }
                else
                {
                    let checkwithOthers = await this.dataOnCondition(tableName, Value, feildName);
                    // console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log(`${messageFeild} Cannot be used. It is already registered`);
                        resolve(`valuenotavailable`);
                    }
                    else
                    {
                        console.log(`No one has this ${messageFeild}`);
                        resolve(`true`);
                    }
                }
            });
        });      
    }
    catch (error)
    {
        
    }
}; 


