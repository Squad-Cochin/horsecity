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
    console.log("My application running successfully on the port number :-", +process.env.PORT);
    // Comment: Starts the server and logs a success message with the port number to the console.
});
 



/*
Check purpose query

INSERT INTO service_providers(name, email, user_name, password, contact_person, id_proof, contact_no, contact_address, emergency_contact_no, certification_or_license_img, certification_or_license_no, phone_verified, email_verified, expiry_at) VALUES ('Saurabh Pande', 'sp832155@gmail.com', 'Saurabh1998', SHA2('Asdf$1234', 256), 'owner', '126432WDCWSE4', '8421168036', '78 SAKET NAGAR NEAR NARENDRA NAGAR', '9823036123', 'dqw5ec9+5c3sc1sw6fe7cw31ce.jpg', 'adsf45421a8dsc', 'TRUE', 'TRUE', '2023-10-03 15:32:34');


INSERT INTO service_providers(name, email, user_name, password, contact_person, contact_no, contact_address, emergency_contact_no, licence_no, licence_image, phone_verified, email_verified, expiry_at) VALUES ('Saurabh Pande', 'sp832156@gmail.com', 'Saurabh1999', SHA2('Asdf$1234', 256), 'owner', '8421168037', '78 SAKET NAGAR NEAR NARENDRA NAGAR', '9823036123', 'dqw5ec9+5c3sc1sw6fe7cw31ce.jpg', 'adsf45421a8dsc', 'TRUE', 'TRUE', '2023-12-03 15:32:34');


*/




/**
[6:02 PM] Hariprasad T B

Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time) 
 */


/**
 INSERT INTO service_providers (
  name,
  email,
  user_name,
  password,
  contact_person,
  contact_no,
  role_id,
  contact_address,
  emergency_contact_no,
  licence_image,
  licence_no,
  phone_verified,
  email_verified,
  expiry_at
) VALUES (
  'Saurabh Pande',
  'sp832155@gmail.com',
  'Saurabh1998',
  SHA2('Asdf$1234', 256),
  'owner',
  '126432WDCWSE4',
  NULL, -- Assigning NULL to role_id
  '78 SAKET NAGAR NEAR NARENDRA NAGAR',
  '8421168036',
  'dqw5ec9+5c3sc1sws6fe7cw31ce.jpg',
  'adsf45421a8dssc',
  1,  -- Use 1 for TRUE for phone_verified
  1,  -- Use 1 for TRUE for email_verified
  '2023-10-03 15:32:34'
);

 */