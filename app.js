/////////////////////////////////////////////////////////////////////////////////////////
//    This file is having all the library and other file import variable               //
//    that is required to run our program.                                             //
//                                                                                     //
//    We are importing all of them and putting all the details into one variable (app) //
//    exporting that variable. Which is being used in th server.js                     //
//                                                                                     //
//    We can run all this here only but since we have selected to keep server.js as    //
//    our starting point of the program. So keep it clean we have done all the imports //
//    over here
/////////////////////////////////////////////////////////////////////////////////////////

// Importing the express library
const express = require('express'); 
const app = express(); // Assigning the app variable with the export functionalities
const path = require('path');
const upload = require('express-fileupload');
const cors = require('cors') 
app.use(cors()); 

require('dotenv').config(); // Comment: Loads environment variables from a .env file if present.

const db = require("./configs/db.configs"); // Comment: Imports the configuration for the database.
const init = require('./init');


init(); // Calling the init file. In this file we are having the first user details


// Comment: Adds middleware to parse incoming request bodies with JSON payloads.
app.use(express.json());
app.use(upload()); // We are using the upload file which have all the functionalities of
app.use(express.urlencoded({ extended: true })); // Comment: Adds middleware to parse URL-encoded form data.
app.use('/', express.static(__dirname + '/public'))
// app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/Attachements'))

require('../horsecity/routes/auth.route')(app); // Comment: Imports the route handlers for barrier tokens and associates them with the Express application.
require('./routes/customers/customer.route')(app);
require('./routes/drivers/driver.route')(app);
require('./routes/serviceProvider/serviceProvider.route')(app); 

module.exports = app; // making the app variable for export