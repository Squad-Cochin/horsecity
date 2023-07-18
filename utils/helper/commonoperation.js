/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is helper file. It consist of the most common function of the code.          //
//   The functions which is used most commonly in the overall program are written      //
//   in this file and import from here directly. It will make the reuseability model   //
//   work and same code can be avoided. In this file we are having common operation    //
//   function. The operation function can insert, update.                              //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");  // importing the database details 
const timeCalculate = require('./date'); // This variable will have the date file data. It is used to add days to current date for expiration of token
const constant = require('../constants'); // Importing the constant details

exports.changePasswordToSQLHashing = (password) => 
{
    return new Promise((resolve, reject) => 
    {
        let hashedPasswordQuery = `SELECT SHA2('${password}', 256) AS hashedPassword`;
        con.query(hashedPasswordQuery, (err, result) => 
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                if (result.length > 0) 
                {
                    const hashedPassword = result[0].hashedPassword;
                    resolve(hashedPassword);
                }
                else
                {
                    reject(new Error('No hashed password found'));
                }
            }
        });
    });
};


exports.changePasswordOfUser = (tablename, username, password) => 
{
    return new Promise((resolve, reject) => 
    {
        let updatePasswordQuery = `UPDATE ${tablename} SET password = '${password}', expiry_at = '${timeCalculate.addingSpecifiedDaysToCurrentDate(constant.password.expiry_after)}' WHERE user_name = '${username}' `;
        con.query(updatePasswordQuery, (err, result) => 
        { 
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(result);               
            }
        });
    });
};
  