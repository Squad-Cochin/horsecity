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
        active : "ACTIVE",
        inactive : "INACTIVE",
    },
    password :
    { 
        expiry_after : 90, // Days after which the token will expire
    },

    attachmentLocation :
    {
        customer : 
        {
            idProof : "D:/Horsecity2/horsecity-Backend/horsecity/Attachements/Customers/IdProof/"
        },
        driver :
        {
            licence : "D:/Horsecity2/horsecity-Backend/horsecity/Attachements/Drivers/Licence/"
        }
    },



    responseMessage :
    {
        getAll : "Data Fetched Sucessfully",
        getOne : "Particular Data Fetched Successfully",
        insert : "Data inserted succesfully",
        errorInsert : "Error while inserting data"
    },

    timeOffSet :
    {
        BAHRAIN : "+03:00",
        KUWAIT : "+03:00",
        OMAN : "+04:00",
        QATAR : "+03:00",
        SAUDIARABIA : "+03:00",
        UAE : "+04:00",
        INDIA : "+05:30"
    },
    tableName :
    {
        application_settings : "application_settings",
        application_tokens : "application_tokens",
        bookings : "bookings",
        bookings_logs : "bookings_logs",
        calculate_amount_types : "calculate_amount_types",
        currencies : "currencies",
        customers : "customers",
        customer_logs : "customer_logs",
        discount_types : "discount_types",
        enquiries : "enquiries",
        drivers : "drivers",
        horse_details : "horse_details",
        invoices : "invoices",
        languages : "languages",
        modules : "modules",
        logs : "logs",
        otp_stores : "otp_stores",
        password_policies : "password_policies",
        payments : "payments",
        payment_types : "payment_types",
        permissions : "permissions",
        quotations : "quotations",
        reviews : "reviews",
        roles : "roles",
        service_providers : "service_providers",
        service_provider_logs : "service_provider_logs",
        taxations : "taxations",
        templates : "templates",
        vehciles_transportation : "vehciles_transportation",
        vehicles : "vehicles",
        vehicles_breakouts : "vehicles_breakout"
    }
  
}