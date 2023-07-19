/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//    This file is created to store the consgtant data which will be used in the       //
//    overall program. So instead of writing again and again we can use it from here   //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////


module.exports = 
{  
    status  :
    {
        active : `ACTIVE`,
        inactive : `INACTIVE`,
    },

    password :
    { 
        expiry_after : 90, // Days after which the token will expire
    },

    attachmentLocation :
    {
        customer : 
        {
            idProof : `${__dirname}../../Attachements/Customers/IdProofs/`
        },
        driver :
        {
            licence : `${__dirname}../../Attachements/Drivers/Licence/`,
            profilephoto : `${__dirname}../../Attachements/Drivers/ProfilePhoto/`
        },
        serviceProvider :
        {
            licenceImage : `${__dirname}../../Attachements/serviceProvider/licenceImage/`
        },
        vehicle :
        {
            scertificate : `${__dirname}../../Attachements/Vehicles/scertificate/`
        }
    },

    responseMessage :
    {
        getAll : `Data Fetched Sucessfully`,
        getAllErr : `Error while fetching all the data`,
        getOne : `Particular data fetched Successfully`,
        getOneErr : `Particular data fetched failed`,
        insert : `Data inserted succesfully`,
        errorInsert : `Error while inserting data`,
        statusinactive : `status changed to INACTIVE`,
        statusactive : `status changed to ACTIVE`,
        statuserror : `Error while updating the status`,
        statusChanged : `Status Changed`,
        removesuccess : `Data Removed`,
        removeerror : `Error While removing`,
        edit : `Data updated successfully`,
        erroredit : `Error while updating the data`,
        vehiclesuccess : `Vehicles data added successfully`,
        vehicleerror : `Error while adding the vehicles data`,
        universalError: `Internal server error`,
        vehicleImgerror : "No images are there for this vehicle now",
        vehicleImgSuccess : "Images fetched succesfully"
    },

    timeOffSet :
    {
        BAHRAIN : `+03:00`,
        KUWAIT : `+03:00`,
        OMAN : `+04:00`,
        QATAR : `+03:00`,
        SAUDIARABIA : `+03:00`,
        UAE : `+04:00`,
        INDIA : `+05:30`
    },
    
    tableName :
    {
        application_settings : `application_settings`,
        application_tokens : `application_tokens`,
        bookings : `bookings`,
        bookings_logs : `bookings_logs`,
        calculate_amount_types : `calculate_amount_types`,
        currencies : `currencies`,
        customers : `customers`,
        customer_logs : `customer_logs`,
        discount_types : `discount_types`,
        enquiries : `enquiries`,
        drivers : `drivers`,
        horse_details : `horse_details`,
        invoices : `invoices`,
        languages : `languages`,
        modules : `modules`,
        logs : `logs`,
        otp_stores : `otp_stores`,
        password_policies : `password_policies`,
        payments : `payments`,
        payment_types : `payment_types`,
        permissions : `permissions`,
        quotations : `quotations`,
        reviews : `reviews`,
        roles : `roles`,
        service_providers : `service_providers`,
        service_provider_logs : `service_provider_logs`,
        taxations : `taxations`,
        templates : `templates`,
        vehciles_transportation : `vehciles_transportation`,
        vehicles : `vehicles`,
        vehicles_breakouts : `vehicles_breakout`,
        vehicles_images : `vehicles_images`
    }
  
}