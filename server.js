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



/*

return res.status(200).send
({
    status : "success",
    code : 200,
    message : "Enquiries fetched successfully",
    data : 
    enquiries : 
    [{
       id : 1,
       cId : 1,
       cName : Saurabh Pande,
       cEmail : sp832154@gmail.com,
       cUser_name : Saura1997,
       cPhone : 1234567891,
       cDate_of_birth : 1997/11/06,
       cId_proof : 865121584650 / Or we can have the image of id proof. Whose image name we will store here,
       cStatus : ACTIVE,
       cCreated_at : 2023-07-06 10:16:26,
       vId : 1,
       vService_provider : Hariprasad,
       vVvehicle_number : MH01 GH 1457,
       vMake : BMW,
       pickup_location : Buj Khalifa,
       drop_location : Museam of Future,
       no_of_horse : 3,
       description : I need to send my horse from one to another,
       status : ACTIVE,
       created_at : 2023-07-06 10:16:26,
       updated_at : 2023-07-06 10:16:26
    }]
});


return res.status(200).send
({
    status : "success",
    code : 200,
    message : "Quotations fetched successfully",
    Data : 
    quotions : 
    [{
        id : 1,
        cId : 1,
        cName : Saurabh Pande,
        cEmail : sp832154@gmail.com,
        cUser_name : Saura1997,
        cPhone : 1234567891,
        cDate_of_birth : 1997/11/06,
        cId_proof : 865121584650 / Or we can have the image of id proof. Whose image name we will store here,
        cStatus : ACTIVE,
        cCreated_at : 2023-07-06 10:16:26,
        eId : 1,
        eCreated_at : 2023-07-06 10:16:26,
        eUpdated_at : 2023-07-06 10:16:26,
        sId : 1,
        sService_provider : Hariprasad,
        sVehicle_number : MH01 GH 1457,
        sMake : BMW,
        tId : 1,
        trate : 5,
        dId : 1,
        drate : 5,
        trip_type : "PRIVATE",
        pickup_location : Buj Khalifa,
        pickup_country : Dubai,
        pickup_date : 2023-07-25 10:16:26,
        drop_location : Museaum of future,
        drop_country : Dubai,
        drop_date : 2023-07-30 10:16:26,
        no_of_horse : 3,
        special_requirement : [Washing, Bathing], 
        additional_service : Medicine,
        transportation_insurance_coverage : YES,
        tax_amount : 120,
        discount_amount	: 140,
        final_amount : 1468,
        status : ACTIVE,
        created_at : 2023-07-06 10:16:26,
        updated_at : 2023-07-06 10:16:26
    }]
});


*/


/**
[6:02 PM] Hariprasad T B

Fri Jul 14 2023 00:00:00 GMT+0530 (India Standard Time)

[6:02 PM] Hariprasad T B

Input format

[6:02 PM] Hariprasad T B

15-07-2023

[6:02 PM] Hariprasad T B

vie 
 */