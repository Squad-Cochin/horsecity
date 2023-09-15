
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//    This file is related for connecting with the database(Mysql).                    //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const mysql = require('mysql2'); // Importing the mysql2 library functionalities

// This is written for establishing the connection with the database. All the details are in the env file
var con = mysql.createConnection
({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE      
});
    
con.connect(function async (err)   
{
    if (err)   
    {
        console.log("#### Error While connecting with the database ####", err.message);
    }
    else 
    {
        console.log("DB Connected !");
    }
});
 
// Exporting the con variable for using it anywhere in the programm
module.exports = con;
