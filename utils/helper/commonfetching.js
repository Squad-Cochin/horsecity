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