/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avaoided.                                               //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");  // importing the database details

// The below functions will used for fetching onl

exports.userDataOnUsername = (tablename, username) =>
{
    return new Promise((resolve, reject) => 
    {
        let selQuery = `SELECT * FROM ${tablename} WHERE user_name = '${username}' `;
        con.query(selQuery, (err, result) =>
        {
            if (err)
            {
                console.log('Error while executing the query:', err);
                reject(err);
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

// exports.tableDataOnId = (tablename, Id) =>
// {
//     return new Promise((resolve, reject) => 
//     {
//         console.log('Table Name: ', tablename);
//         let selQuery = `SELECT * FROM ${tablename}  WHERE ${tablename}.id = ${Id} `;
//         console.log(selQuery);
//         con.query(selQuery, (err, result) =>
//         { 
//             console.log('Result: ',result);
//             if (err)
//             {
//                 console.log('Error while executing the query:', err);
//                 resolve('err');
//             }
//             else
//             {
//                 if (result.length > 0)
//                 {
//                     console.log('Visted');
//                     // console.log(result);
//                     resolve(result);
//                 }
//                 else
//                 {
//                     console.log("Visted 2");
//                     resolve([]);
//                 }       
//             }
//         });
//     });
// }

// exports.tableDataOnId = (tablename, Id) =>
// {
//     return new Promise((resolve, reject) => 
//     {
//         let selQuery = `SELECT * FROM ${tablename}  WHERE ${tablename}.id = '${Id}' `;
//         con.query(selQuery, (err, result) =>
//         { 
//             // console.log('Result: ',result);
//             if (err)
//             {
//                 console.log('Error while executing the query:', err);
//                 resolve('err');
//             }
//             else
//             {
//                 if (result.length > 0)
//                 {
//                     console.log('Visted');
//                     // console.log(result);
//                     resolve(result);
//                 }
//                 else
//                 {
//                     console.log("Visted 2");
//                     resolve([]);
//                 }       
//             }
//         });
//     });
// }

exports.tableDataOnId = (tablename, Id) => {
    return new Promise((resolve, reject) => {
      console.log('Table Name: ', tablename);
      let selQuery = `SELECT * FROM ${tablename} WHERE ${tablename}.id = '${Id}' `;
      console.log(selQuery);
  
      con.query(selQuery, (err, result) => {
        if (err) {
          console.log('Error while executing the query:', err);
          reject(err);
        } else {
          console.log('Result: ', result);
          if (result.length > 0) {
            console.log('Data found');
            resolve(result);
          } else {
            console.log('No data found');
            resolve([]);
          }
        }
      });
    });
  };
  



exports.getAllDataOfDriverAndCustomer = (tablename, pageNumber, pageSize) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            // Calculate the offset based on the page number and page size
            const offset = (pageNumber - 1) * pageSize;

            // let selQuery = `SELECT cd.name, cd.email, cd.contact_no, cd.created_at, cd.status FROM  cd WHERE cd.deleted_at = 'NULL'`;
            // let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y'), cd. status FROM customers cd WHERE cd.deleted_at IS NULL LIMIT 10 OFFSET 0`;
            // let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${tablename} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;

            let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${tablename} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;

            console.log(selQuery);
            con.query(selQuery, (err, result) =>
            {
                // console.log('result', result);
                if (err)
                {
                    // console.log('Error while executing the query:', err);
                    reject(err);
                }
                if (result.length > 0)
                {
                    // console.log('Data present and fetched');
                    resolve(result);
                }
                else
                {
                    // console.log('Query executed but data not present in the table.');
                    resolve([]);
                }                
            });
        });        
    }
    catch(error)
    {
        console.log('Error from the commonfetching.js file from the utils > helper folder. In the function "getAllDataOfDriverAndCustomer". Which is designed to fetch all the data of customer and driver through the same function');        
    }
}


exports.dataOnEmail = (tablename, email) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tablename} t WHERE t.email = '${email}' `;
            con.query(selQuery, (err, result) =>
            {
                if(err)
                {
                    resolve('err');
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
    catch(error)
    {
        console.log(`Error while fetching the table data on email`, error);        
    }
};

exports.dataOnUsername = (tablename, username) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tablename} t WHERE t.user_name = '${username}' `;
            con.query(selQuery, (err, result) =>
            {
                // console.log(result);
                if(err)
                {
                    resolve('err');
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
    catch(error)
    {
        console.log(`Error while fetching the table data on email`, error);        
    }
};


exports.dataOnContactNumber = (tablename, contact_no) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tablename} t WHERE t.contact_no = '${contact_no}' `;
            console.log(selQuery);
            con.query(selQuery, (err, result) =>
            {
                console.log(result);
                if(err)
                {
                    resolve('err');
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
    catch(error)
    {
        console.log(`Error while fetching the table data on email`, error);        
    }
};

exports.vehiclesMiddleware = (tableName, feildName, Value) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.${feildName} = '${Value}' `;
            console.log(selQuery);
            con.query(selQuery, (err, result) =>
            {
                if(err)
                {
                    resolve('err');
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
        console.log(`Error while vehicle middleware function in common fetching helper file `, error);       
    }

};

exports.dataOnEmailUpdate = async(tableName, feildName, Value, id) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} c WHERE c.id = '${id}' AND c.email = '${Value}'`;
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log('Error in the dataOnUpdate');
                    resolve('internalError')
                }
                
                if(result.length > 0)
                {
                    console.log('I think email is not updating this time');
                    resolve('emailnotchanged');
                }
                else
                {
                    let checkwithOthers = await this.dataOnEmail(tableName, Value);
                    console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log('Email Cannot be used. It is already registered');
                        resolve('emailnotavailable');
                    }
                    else
                    {
                        console.log('No one has this email');
                        resolve('true');
                    }
                }
            });
        });      
    }
    catch (error)
    {
        
    }
}; 


exports.dataOnUsernameUpdate = async(tableName, Value, id) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.id = '${id}' AND t.user_name = '${Value}'`;
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log('Internal Server Error');
                    resolve('internalError')
                }
                
                if(result.length > 0)
                {
                    console.log('I think username is not updating this time');
                    resolve('usernamenotchanged');
                }
                else
                {
                    let checkwithOthers = await this.dataOnUsername(tableName, Value);
                    console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log('Username Cannot be used. It is already registered');
                        resolve('usernamenotavailable');
                    }
                    else
                    {
                        console.log('No one has this username');
                        resolve('true');
                    }
                }
            });
        });      
    }
    catch (error)
    {
        
    }
}; 

exports.dataOnContactNumberUpdate = async(tableName, Value, id) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} t WHERE t.id = '${id}' AND t.contact_no = '${Value}'`;
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log('Internal Server Error');
                    resolve('internalError')
                }
                
                if(result.length > 0)
                {
                    console.log('I think contact number is not updating this time');
                    resolve('contactnumbernotchanged');
                }
                else
                {
                    let checkwithOthers = await this.dataOnContactNumber(tableName, Value);
                    console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log('Contact number cannot be used. It is already registered');
                        resolve('contactnumbernotavailable');
                    }
                    else
                    {
                        console.log('No one has this contact number');
                        resolve('true');
                    }
                }
            });
        });      
    }
    catch (error)
    {
        
    }
};

exports.dataLicenceNumberOnUpdate = async(tableName, Value, id) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} c WHERE c.id = '${id}' AND c.licence_no = '${Value}'`;
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log('Error in the dataOnUpdate');
                    resolve('internalError')
                }
                
                if(result.length > 0)
                {
                    console.log('I think licence number is not updating this time');
                    resolve('licencenumbernotchanged');
                }
                else
                {
                    let checkwithOthers = await this.dataOnLicenceNo(tableName, Value);
                    console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log('licence number cannot be used. It is already registered');
                        resolve('licencenumbernotavailable');
                    }
                    else
                    {
                        console.log('No one has this licence number');
                        resolve('true');
                    }
                }
            });
        });      
    }
    catch (error)
    {
        
    }
}; 

exports.dataOnIdProofNumberUpdate = async(tableName, Value, id) =>
{
    try
    {
        return await  new Promise(async (resolve, reject) =>
        {
            let selQuery = `SELECT * FROM ${tableName} c WHERE c.id = '${id}' AND c.id_proof_no = '${Value}'`;
            con.query(selQuery, async (err, result) =>
            {
                if(err)
                {
                    console.log('Error in the dataOnUpdate');
                    resolve('internalError')
                }
                
                if(result.length > 0)
                {
                    console.log('I think id proof number is not updating this time');
                    resolve('idproofnumbernotchanged');
                }
                else
                {
                    let checkwithOthers = await this.dataOnIdProof(tableName, Value);
                    console.log(checkwithOthers);
                    if(checkwithOthers.length > 0)
                    {
                        console.log('Id proof number cannot be used. It is already registered');
                        resolve('idproofnumbernotavailable');
                    }
                    else
                    {
                        console.log('No one has this id proof number');
                        resolve('true');
                    }
                }
            });
        });      
    }
    catch (error)
    {
        
    }
}; 




exports.dataOnIdProof = (tablename, id_proof_no) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tablename} t WHERE t.id_proof_no = '${id_proof_no}' `;
            con.query(selQuery, (err, result) =>
            {
                if(err)
                {
                    resolve('err');
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
    catch(error)
    {
        console.log(`Error while fetching the table data on email`, error);        
    }
};


exports.dataOnLicenceNo = (tablename, licence_no) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            let selQuery = `SELECT * FROM ${tablename} t WHERE t.licence_no = '${licence_no}' `;
            con.query(selQuery, (err, result) =>
            {
                if(err)
                {
                    resolve('err');
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
    catch(error)
    {
        console.log(`Error while fetching the table data on email`, error);        
    }
};