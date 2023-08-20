/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//                 This is the starting file of the program.                           //
//                 All the library and other required thing we                         //
//                 are importing in the app.js and that app module we                  //
//                 are importing in this server.js file and run it to keep             //
//                 the start point clean and simple.                                   //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
 

// process.env.PORT --> This data is in the env file.

const app = require('./app'); // Importing app.js varibale  


app.listen(process.env.PORT, () => 
{
    // Comment: Starts the server and logs a success message with the port number to the console.
    console.log("My application running successfully on the port number :-", +process.env.PORT);    
});



/***
 * INSERT INTO currencies(name, abbreviation, created_at) VALUES ('Dirham', 'AED', '2023-08-20 22:56:22')
INSERT INTO languages (name, file, abbreviation, created_at) VALUES ('English', 'en_us.json', 'EN', '2023-08-20 22:56:22')
INSERT INTO taxations (type, name, value, created_at) VALUES
                                    ('FLAT', 'Fixed Tax', '10', '2023-08-20 22:56:22'),
                                    ('PERCENTAGE', 'Sales Tax', '7.5', '2023-08-20 22:56:22')


INSERT INTO application_settings (id, application_title, contact_address, email, phone, country_code, logo, loginpage_logo, loginpage_bg_image, favicon, language_id, currency_id, tax_id, licence_number, invoice_prefix, quotation_prefix, created_at)
                                                                                              VALUES (
                                                                                                 1,
                                                                                                'Your Application Title',
                                                                                                '123 Main Street, City, Country',  
                                                                                                'contact@example.com',
                                                                                                '1234567890',
                                                                                                '+1',
                                                                                                '804839_white-logo.png',
                                                                                                '510011_black-logo.png',
                                                                                                '869811_bg.jpg',
                                                                                                '199845_logo.png',
                                                                                                '1',
                                                                                                '1',
                                                                                                '1',
                                                                                                '12345-ABC',
                                                                                                'INV',
                                                                                                'QUO',
                                                                                                '2023-08-20 22:56:22'
                                                                                              )

INSERT INTO roles (name, created_at) VALUES
                                                                            ('ADMIN', '2023-08-20 22:56:22'),
                                                                            ('SERVICE PROVIDER', '2023-08-20 22:56:22'),
                                                                            ('SUPER ADMIN', '2023-08-20 22:56:22')


 INSERT INTO modules (name, created_at) VALUES
                                                                                    ('MENU', '2023-08-20 22:56:22'),
                                                                                    ('DASHBOARD', '2023-08-20 22:56:22'),
                                                                                    ('SERVICE PROVIDER', '2023-08-20 22:56:22'),   
                                                                                    ('CUSTOMERS', '2023-08-20 22:56:22'),
                                                                                    ('VEHICLES', '2023-08-20 22:56:22'),
                                                                                    ('DRIVERS', '2023-08-20 22:56:22'),
                                                                                    ('ENQUIRIES', '2023-08-20 22:56:22'),
                                                                                    ('QUOTATIONS', '2023-08-20 22:56:22'),
                                                                                    ('TRIP DETAILS', '2023-08-20 22:56:22'),       
                                                                                    ('INVOICES', '2023-08-20 22:56:22'),
                                                                                    ('ACCOUNTS', '2023-08-20 22:56:22'),
                                                                                    ('REPORTS', '2023-08-20 22:56:22'),
                                                                                    ('APPLICATION SETTINGS', '2023-08-20 22:56:22')

 INSERT INTO permissions (role_id, module_id, `create`, `update`, `read`, `delete`) VALUES 
                                                                                                                (1, 1, 'false', 'false', 'true', 'false'),
                                                                                                                (1, 2, 'false', 'false', 'false', 'false'),
                                                                                                                (1, 3, 'true', 'true', 'true', 'true'),
                                                                                                                (1, 4, 'true', 'true', 'true', 'true'),
                                                                                                                (1, 5, 'true', 'true', 'true', 'true'),
                                                                                                                (1, 6, 'true', 'true', 'true', 'true'),
                                                                                                                (1, 7, 'false', 'true', 'true', 'false'),
                                                                                                                (1, 8, 'false', 'true', 'true', 'false'),
                                                                                                                (1, 9, 'false', 'true', 'true', 'false'),
                                                                                                                (1, 10, 'false', 'true', 'true', 'false'),
                                                                                                                (1, 11, 'false', 'false', 'true', 'false'),
                                                                                                                (1, 12, 'false', 'false', 'false', 'false'),
                                                                                                                (1, 13, 'false', 'false', 'false', 'false'),
                                                                                                                (2, 1, 'false', 'false', 'false', 'false'),
                                                                                                                (2, 2, 'false', 'false', 'false', 'false'),
                                                                                                                (2, 3, 'false', 'true', 'true', 'false'),
                                                                                                                (2, 5, 'true', 'true', 'true', 'true'),
                                                                                                                (2, 6, 'true', 'false', 'true', 'false'),
                                                                                                                (2, 7, 'false', 'true', 'true', 'false'),
                                                                                                                (2, 8, 'false', 'true', 'true', 'false'),
                                                                                                                (2, 9, 'false', 'true', 'true', 'false'),
                                                                                                                (2, 10, 'false', 'true', 'true', 'false'),
                                                                                                                (2, 11, 'false', 'false', 'true', 'false'),
                                                                                                                (2, 12, 'false', 'false', 'false', 'false'),
                                                                                                                (3, 1, 'false', 'false', 'true', 'false'),
                                                                                                                (3, 2, 'false', 'false', 'false', 'false'),
                                                                                                                (3, 3, 'true', 'true', 'true', 'true'),
                                                                                                                (3, 4, 'true', 'true', 'true', 'true'),
                                                                                                                (3, 5, 'true', 'true', 'true', 'true'),
                                                                                                                (3, 6, 'true', 'true', 'true', 'true'),
                                                                                                                (3, 7, 'false', 'true', 'true', 'false'),
                                                                                                                (3, 8, 'false', 'true', 'true', 'false'),
                                                                                                                (3, 9, 'false', 'true', 'true', 'false'),
                                                                                                                (3, 10, 'false', 'true', 'true', 'false'),
                                                                                                                (3, 11, 'false', 'false', 'true', 'false'),
                                                                                                                (3, 12, 'false', 'false', 'false', 'false'),
                                                                                                                (3, 13, 'false', 'false', 'false', 'false')

INSERT INTO service_providers(name, email, user_name, password, contact_person, role_Id, contact_no, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at, created_at) VALUES ('Admin1`', 'admin123@gmail.com', 'Admin', SHA2('Admin$123', 256), 'owner', 1, '8421168035', '78 SAKET NAGAR NEAR NARENDRA NAGAR', '9823036123', 'dqw5ec9+5c3sc1sw6fe7cw31ce.jpg', 'adsf45421a8dsc', 'TRUE', 'TRUE', '2023-11-19 00:26:22', '2023-08-20 22:56:22' )

INSERT INTO password_policies(name, value, created_at) VALUES ('regex1', 
'/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/', '2023-08-20 22:56:22')

INSERT INTO discount_types (name, type, rate, created_at) VALUES('EID OFFER', 'PERCENTAGE', '15', '2023-08-20 22:56:22')

INSERT INTO templates (name, subject, purpose, type, created_at) VALUES

         ('Invoice', 'Payment Invoice', 'This will be used for sending the invoice on email', 'Email', '2023-08-20 22:56:22'),     

         ('Quotation', 'Booking Quotation', 'This will be used for sending the quotation on email', 'Email', '2023-08-20 22:56:22')
 */