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

exports.tableDataOnId = (tablename, Id) =>
{
    return new Promise((resolve, reject) => 
    {
        let selQuery = `SELECT * FROM ${tablename} WHERE ${tablename}.id = '${Id}' `;
        con.query(selQuery, (err, result) =>
        {
            if (err)
            {
                console.log('Error while executing the query:', err);
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


exports.getAllDataOfDriverAndCustomer = (tablename, pageNumber, pageSize) =>
{
    try
    {
        return new Promise((resolve, reject) => 
        {
            // Calculate the offset based on the page number and page size
            const offset = (pageNumber - 1) * pageSize;

            // let selQuery = `SELECT cd.name, cd.email, cd.contact_no, cd.created_at, cd.status FROM ${tablename} cd WHERE cd.deleted_at = 'NULL'`;
            let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, cd.created_at, cd.status FROM ${tablename} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
            // console.log(selQuery);
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