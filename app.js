/////////////////////////////////////////////////////////////////////////////////////////
//    This file is having all the library and other file import variable               //
//    that is required to run our program.                                             //
//                                                                                     //
//    We are importing all of them and putting all the details into one variable (app) //
//    exporting that variable. Which is being used in th server.js                     //
//                                                                                     //
//    We can run all this here only but since we have selected to keep server.js as    //
//    our starting point of the program. So keep it clean we have done all the imports //
//    over here                                                                        //
/////////////////////////////////////////////////////////////////////////////////////////

const express = require("express"); // Importing the express library
const app = express(); // Assigning the app variable with the export functionalities
const upload = require("express-fileupload"); // Importing the express-fileupload library
const cors = require("cors"); // Importing the cors library
app.use(cors()); // Comment: Adds middleware to cors incoming request bodies with JSON payloads.
require("dotenv").config(); // Comment: Loads environment variables from a .env file if present.
const db = require("./configs/db.configs"); // Comment: Imports the configuration for the database.
//Importing the details of the init file. This file is having code for adding the data into the database at the server starting time. If the data is not present in the database
const init = require("./init");
// init(); // Calling the init file. In this file we are having the first user details
// Comment: Adds middleware to parse incoming request bodies with JSON payloads.

app.use(express.json());
app.use(upload()); // We are using the upload file which have all the functionalities of
app.use(express.urlencoded({ extended: true })); // Comment: Adds middleware to parse URL-encoded form data.
app.use("/", express.static(__dirname + "/public")); // This will be used for showing the image or viewing the image
app.use("/", express.static(__dirname + "/Attachements")); // This will be used for showing the image or viewing the image

require("./routes/auth/auth.route")(app); // Comment: Imports the route handlers for barrier tokens and associates them with the Express application.
require("./routes/customers/customer.route")(app); // Comment: Imports the route handlers for customers and associates them with the Express application.
require("./routes/drivers/driver.route")(app); // Comment: Imports the route handlers for drivers and associates them with the Express application.
require("./routes/serviceProvider/serviceProvider.route")(app); // Comment: Imports the route handlers for service providers and associates them with the Express application.
require("./routes/vehicles/vehicle.route")(app); // Comment: Imports the route handlers for vehicles and associates them with the Express application.
require("./routes/vehicles/vehicleImages.route")(app); // Comment: Imports the route handlers for vehicleImages and associates them with the Express application.
require("./routes/applicationSettings/settings/settings.route")(app); // Comment: Imports the route handlers for settings and associates them with the Express application.
require("./routes/invoices/invoices.route")(app); // Comment: Imports the route handlers for invoices and associates them with the Express application.
require("./routes/dashboard/dashboard.route")(app); // Dashboard.
require("./routes/applicationSettings/taxation/taxation.route")(app); //Taxations
require("./routes/applicationSettings/discounts/discounts.route")(app); //Discounts
require("./routes/applicationSettings/currencies/currencies.route")(app); //Currencies
require("./routes/reviews/review.route")(app); // reviews
require(`./routes/applicationSettings/language/language.route`)(app); //Languages
require("./routes/enquiries/enquiries.route")(app); //Enquiry
require("./routes/quotation/quotation.route")(app); //Quotations
require("./routes/tripDetails/tripDetails.route")(app); //Quotations
require("./routes/accounts/accounts.route")(app); //Accounts
require("./routes/reports/reports.route")(app); // /**REPORTS */
require("./routes/listingPage/listing.route")(app); /**Client */
require("./routes/wishlist/wishlist")(app);

module.exports = app; // making the app variable for export
