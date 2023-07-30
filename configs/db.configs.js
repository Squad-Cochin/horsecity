
/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//    This file is related for connecting with the database(Mysql).                    //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const mysql = require('mysql2'); // Importing the mysql2 library functionalities


// This is written for establishing the connection with the database. All the details are in the env file
var con = mysql.createConnection
({
    // host : "192.168.200.211",
    // host: "192.168.200.6",
    // // // // // port: 3306,
    // user: "vsourz",
    // password: "vsourz",
    // database: "horscity"

    host: "localhost",
    // port: 3306,
    user: "root",
    password: "",
    database: "horcity"
    
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
