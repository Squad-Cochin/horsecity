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
        paid : `PAID`,
        partPaid : `PARTIALLY PAID`
    },
    enquiry_status  :
    {
        confirmed : `CONFIRMED`,
        notconfirmed : `NOTCONFIRMED`,
    },
    quotation_status :
    {
        confirmed : `CONFIRMED`,
        notconfirmed : `NOTCONFIRMED`,
    },
    amount_status : 
    {
        paid : 'PAID',
        pending : 'PENDING',
        refund : 'REFUND'
    },
    booking_status : 
    {
        confirmed : 'CONFIRMED',
        pending : 'PENDING',
        cancelled : 'CANCELLED',
        complete : 'COMPLETE'
    },
    booking_confirmation_send : 
    {
        yes : 'YES',
        no : 'NO'
    },
    vehicles_breakouts_status :
    {
        break_out  : 'BREAKOUT',
        compleated : 'COMPLETED'
    },
    password :
    { 
        expiry_after : 90, // Days after which the token will expire
    },

    attachmentLocation :
    {
        customer : 
        {
            view : 
            {
                idProof : `/Customers/IdProofs/`,                 
            },
            upload :
            {
                idProof : `${__dirname}../../Attachements/Customers/IdProofs/`,
            }       
        },
        driver :
        {
            view :
            {
                licence : `/Drivers/Licence/`,
                profilephoto : `/Drivers/ProfilePhoto/`
            },
            upload :
            {
                licence : `${__dirname}../../Attachements/Drivers/Licence/`,
                profilephoto : `${__dirname}../../Attachements/Drivers/ProfilePhoto/`               
            }
        },
        serviceProvider :
        {
             licenceImage : {
                upload : `${__dirname}../../Attachements/serviceProvider/licenceImage/`,
                view : `/serviceProvider/licenceImage/`
            }
        },
        vehicle :
        {
            view :
            {
                image : `/Vehicles/images/`,
                scertificate : `/Vehicles/scertificate/`
            },
            upload :
            {
                scertificate : `${__dirname}../../Attachements/Vehicles/scertificate/`,
                images : `${__dirname}../../Attachements/Vehicles/images/`
            }
        },
        applicationSettings : 
        {
            settings : {
                upload : `${__dirname}../../Attachements/applicationSettings/settings/`,
                view : `/applicationSettings/settings/`
            }
        }
    },
    
    modules :
    {
        menu : 1,
        dashboard : 2,
        service_provider : 3,
        customers : 4,
        vehicles : 5,
        drivers : 6,
        enquiries : 7,
        quotations : 8,
        trip_details :9,
        invoices : 10, 
        accounts :11,
        reports : 12,
        applicationSettings : 13
    },

    responseMessage :
    {
        getAll : `Data Fetched Sucessfully`,
        getNoData : `No data to display`,
        getAllErr : `Error while fetching all the data`,
        getOne : `Particular data fetched Successfully`,
        getOneErr : `Particular data fetched failed`,
        insert : `data inserted succesfully`,
        errorInsert : `Error while inserting data`,
        statusinactive : `status changed to INACTIVE`,
        statusactive : `status changed to ACTIVE`,
        statuserror : `Error while updating the status`,
        statusChanged : `Status Changed`,
        removesuccess : `Data Removed`,
        removeerror : `Error While removing`,
        edit : `data updated successfully`,
        erroredit : `Error while updating the data`,
        vehiclesuccess : `Vehicles data added successfully`,
        vehicleerror : `Error while adding the vehicles data`,
        universalError: `Internal server error`,
        vehicleImgerror : "No images are there for this vehicle now",
        vehicleImgSuccess : "Images fetched succesfully",
        imageFormat : 'Only PNG and JPG formats are allowed',
        particularVehicleImageSuccess : 'Particular vehicle image succesfully uploaded',
        particularVehicleImageError : 'Error while uploading the particular vehicle image',       
        
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
        vehicles_breakouts : `vehicles_breakouts`,
        vehicles_images : `vehicles_images`,
        assign_drivers : `assign_drivers`,
        payment_records : `payment_records`
    },

    roles :
    {
        service_provider : 'SERVICE PROVIDER',
        admin : 'ADMIN',
        superAdmin : 'SUPER ADMIN'
    }
  





}