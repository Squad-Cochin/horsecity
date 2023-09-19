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
        partPaid : `PARTIALLY PAID`,
        pending : `PENDING`,
        yes : `YES`,
        no : `NO`
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
        paid : `PAID`,
        pending : `PENDING`,
        refund : `REFUND`
    },
    booking_status : 
    {
        confirmed : `CONFIRMED`,
        pending : `PENDING`,
        cancelled : `CANCELLED`,
        completed : `COMPLETED`
    },
    booking_confirmation_send : 
    {
        yes : `YES`,
        no : `NO`
    },
    vehicles_breakouts_status :
    {
        break_out  : `BREAKOUT`,
        compleated : `COMPLETED`
    },
    password :
    { 
        expiry_after : 90, // Days after which the token will expire,
        token_expiry : 1800
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
                idProof : `${__dirname}../../attachements/Customers/IdProofs/`
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
                licence : `${__dirname}../../attachements/Drivers/Licence/`,
                profilephoto : `${__dirname}../../attachements/Drivers/ProfilePhoto/`               
            }
        },
        serviceProvider :
        {
             licenceImage : {
                upload : `${__dirname}../../attachements/serviceProvider/licenceImage/`,
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
                scertificate : `${__dirname}../../attachements/Vehicles/scertificate/`,
                images : `${__dirname}../../attachements/Vehicles/images/`
            }
        },
        applicationSettings : 
        {
            settings : {
                upload : `${__dirname}../../attachements/applicationSettings/settings/`,
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
        getAll : `Data fetched successfully.`,
        getNoData : `No data to display.`,
        getAllErr : `Failed to fetch all data.`,
        getOneErr : `Failed to fetch specific data.`,
        insert : `Data inserted successfully.`,
        errorInsert : `Data insertion failed.`,
        statuserror : `Status update failed.`,
        statusChanged : `Status changed successfully.`,
        removesuccess : `Data removed successfully.`,
        removeerror : `Data removal failed.`,
        edit : `Data updated successfully.`,
        erroredit : `Failed to update data.`,
        universalError: `Internal server error.`,
        imageFormat : `Only PNG and JPG formats are allowed.`,
        trip: `Trip started.`,
        cancel: `Trip canceled.`,
        params: `Params ID not submitted or incorrect params ID submitted.`,      
        // The response messages below are related to TEmpperetautr control feild of the vehicle
        tempcontrolnotpresent: `Vehicle is equipped with temperature control. Please provide details.`,       
        tempcontrolInvalidInput: `Vehicle temperature control equipped input is invalid. Please select "YES" or "NO".`,
        // The response messages below are related to GCC feild of the vehicle
        vehicleGCCvalueNotPresent: `Vehicle GCC travel capability requires details.`,
        vehicleGCCvalueInvalid: `Vehicle GCC travel capability input is invalid. Please select "YES" or "NO".`,        
        // The response messages below are related to insurance cover feild of the vehicle
        vehicleinsurancenoNotPresent: `Vehicle insurance cover number required.`,
        vehicleinsurancecoverenotpresnet: `Vehicle insurance cover value required. Select "YES" if the vehicle has insurance cover, or "NO" if it does not.`,
        vehicleinsurancecovereinvalidinput: `Vehicle insurance cover input is invalid. Please select "YES" or "NO".`,     
        // The response messages below are related to the vehicle type feild of the vehicle page.
        vehicleTypeNotPresent: `Vehicle type is required. Please select one of the following: (PRIVATE, SHARING).`,
        vehicleTypeInvalid: `Vehicle type input is invalid. Please select one of the following: (PRIVATE, SHARING).`,   
        vehicleRegistrationNoNotPresnet: `Vehicle registration number required.`,        
        vehicleNoNotPresnet: `Vehicle number required.`,
        vehiclescertificateimagenotpresent: `The vehicle safety certificate has not been uploaded.`,     
        // The response messages below are related to the vehicle saftey certificate.
        vehicleimagetitlenotentered: `The vehicle image title has not been added.`,
        vehiclescertificateimageInvalid: `We're sorry, but the image format of safety ceretificate of the vehicle you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g.JPG, PNG).`,
        // The response messages below are related to the vehicle image.
        vehicleimagenotpresent: `The vehicle image has not been uploaded.`,
        vehiclesImageInvalid: `We're sorry, but the vehicle image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).`,
        restacc : `Restricted Access.`,        
        servieproviderinactive: `The service provider is currently inactive.`,
        abbreviationAlreadyPresent: `The abbreviation is already taken.`,        
        logsuccess: `Login Successful!`,
        logoutsuccess: `Logout Successful!`,        
        verifiedSuccess: `Successfully verified!`,
        verifiedFailed: `Verification failed.`, 
        // The response messages below are related to email
        emailNotPresent: `Please provide your email address.`,
        emailHaveSpace: `The email should not include spaces. Please re-enter your email.`,
        emailIncorrectFormat: `The email format is invalid. Please review and enter a valid email address.`,
        emailAlreadyExist: `The email already exists.`,
        emailnotexist: `Email not exists.`,
        emailInvoice: `Unable to email the invoice. `,
        emailInvoiceNotSend: `Invoice sent successfully on email.`,        
        // The response messages below are related to username
        usernameNotPresent: `Please provide a username.`,
        usernameHaveSpace: `The username should not include spaces. Please re-enter your username.`,
        unsernameinvalid: `The username must be at least 4 characters long.`,
        usernameAlreadyExist: `The username already exists.`,
        usernameincorrect: `This username appears to be incorrect, or no customer is registered with this username.`,
        // The response messages below are related to contact number
        contactnumbernotpresent: `Please provide a contact number.`,
        contactnumberhavespaces: `The contact numbers should not include spaces. Please re-enter your contact number.`,
        contactnumberinvalid: `The contact number format is incorrect. Please review and enter a valid contact number.`,
        contactnumberAlreadyExist: `The contact number already exists.`,        
        // The response messages below are related to emergency contact number
        emgcontactnumbernotpresent: `Please provide an emergency contact number.`,
        emgcontactnumberhavespaces: `The emergency contact numbers should not include spaces. Please re-enter the emergency contact number.`,
        emgandcontactnumbersimilar: `The emergency contact number should be different from the primary contact number.`,
        emgcontactnumberinvalid: `The emergency contact number is not in the correct format. Please review and enter a valid emergency contact number.`,       
        // The response messages below are related to date of birth
        dobnotpresent: `Please provide your date of birth.`,
        dobhavespaces: `The date of birth should not include spaces. Please re-enter your date of birth.`,
        dobinvalid: `The date of birth format is incorrect. Please review and enter a valid date of birth.`,
        // The response messages below are related to password.
        passwordupdate: `Password updated successfully!`,
        passwordupdatef: `Password update failed.`,
        passwordnotpresent: `Please provide a password.`,
        passwordinvalid : `Invalid password: Your Password does not meet the following requirements: It Must contain at least one lowercase and one uppercase letter, one special character,one special character and length from 8 to 16 characters.`,
        passwordincorrect: `The entered password is incorrect.`,
        passwordexpired: `Your password has expired. Please create a new one.`,
        passwordhavespaces: `Passwords should not include spaces. Please re-enter your password.`,        
        // The response messages below are related to new password.
        newpasswordnotpresent: `Please enter a new password.`,
        newpasswordinvalid : `Invalid new password:  Your new password does not meet the following requirements: It Must contain at least one lowercase and one uppercase letter, one special character,one special character and length from 8 to 16 characters.`,
        newpasswordhavespaces: `The new password should not contain spaces. Please try again.`, 
        // The response messages below are related to new password.  
        confirmpasswordinvalid : `Invalid confirm password: Your confirm password does not meet the following requirements: It Must contain at least one lowercase and one uppercase letter, one special character,one special character and length from 8 to 16 characters.`,        
        confirmpasswordhavespaces: `Confirm password should not contain spaces. Please try again.`,
        confirmpasswordnotpresent: `Please enter confirm password.`,
        // The below response messages are related to other password operations things.
        passwordssimilarerror: `The entered password and confirm password do not match.`,
        newpasswordsameoldpassword: `Your new password cannot match your previous password.`,
        confirmpasswordsameoldpassword: `Your confirm new password cannot match your previous password.`,        
        // The below response is related to the customer id feild (INPUT AND IMAGE UPLOAD BOTH)
        idproofnonotexists: `Please provide your ID proof number.`,
        idproofnoalreadypresent: `This ID proof number is already registered in the database by another user. Please use a different ID proof number.`,
        idproofimagenotuploaded: `The customer ID proof image has not been uploaded.`,
        invalididproofimageformat: `We're sorry, but the image format  of the customer id proof you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g JPG, PNG).`,
        // The below response message are related to the driver. (INPUT AND IMAGE UPLOAD BOTH) 
        driverlicenseimagenotpresent: `The driver's license image has not been uploaded.`,
        driverlicenceimageinvalid: `We're sorry, but the image format of driver licence image you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g JPG, PNG).`,
        driverprofileimagenotpresent: `The driver's profile image has not been uploaded.`,
        driverprofileimageinvalid: `We're sorry, but the image format of driver profile image you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g.JPG, PNG).`, 
        // The below response messages are related to the licence number. The license number are being used in two places service provider and drivers.
        licensenohavespaces: `The license number should not contain spaces. Please try again.`,
        licensenoalreadyexist: `The license number already exists.`,
        licensenonotpresent: `Please provide your license number.`,
        // The below response messages are related to the enquiries.
        enquiryBooked: `Booking confirmed successfully.`,
        enquiryBookFailed: `Booking was unsuccessful.`,  
        enquiryalreadypresent: `The previous inquiry with these details has not been confirmed by the service provider yet. We will forward this inquiry on your behalf right now. Please wait.`,
        duplicateenquiry: `The previous inquiry with the same details has not been confirmed by the service provider yet. Modifying only the description is not allowed. The service provider will contact you directly.`,  
        // The below response messages are related to the driver
        driverassigned: `Driver successfully assigned to service provider.`,
        driverunassigned: `Driver unassigned to service provider.`,
        driverdescription: `Please provide a description of the driver.`,        
        // The below response messages are related to the name feild
        invalidName: `Name is required and should contain only alphabetic characters.`,
        namealreadyexists: `The name is already taken.`,
        // The below response messages are related to the number of horses field of the vehicles.
        noofhorserequired: `Vehicle maximum horse carrying capacity required.`,
        noofhorsenotanumber: `Vehicle maximum horse carrying capacity must be a number.`,
        noofhorselessthanzero: `Vehicle maximum horse carrying capacity must be greater than zero.`,        
        // The below response messages are related to the air conditioner field of the vehicles.
        acnotpresent: `Vehicle is equipped with air conditioning. Please provide details.`,
        acInvalidInput: `Vehicle air conditioner equipped input is invalid. Please select "YES" or "NO".`,    
        // The below response messages are related to the payment feild.
        negativepayment: `The value is negative. It is not permitted.`,
        paymentmadefully: `The payment has already been made in full.`,
        paymentValueInvalid: `Payment which is being inserted is more than the remaining payment. Please enter again.`,   
        // This are the error messages. Which will come at the time of assignning the service provider. 
        // This error will not come on the front end side. When we are performing operation with the 
        // REST API at that time this errors will be shown. 
        backend1: `Service provider ID not found. Unable to assign service provider.`,
        backend2: `Error: The driver is already employed by other service provider, so we cannot permit them to work here at this time.`,
        backend3: `Driver ID not found. Unable to assign service provider.`,
        backend5: `Failed to retrieve the current service providers for the driver.`,
        backend6: `The driver does not have any previous experience working with any of our registered service providers.`,
        backend7: `This driver is no longer affiliated with any service provider.`,
        backend8: `The driver has already been unassigned from the service provider.`,    
    },
    timeOffSet :
    {
        UAE : `+04:00`,
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
        payment_records : `payment_records`,
        wishlist : `wishlist`
    },
    roles :
    {
        service_provider : `SERVICE PROVIDER`,
        admin : `ADMIN`,
        superAdmin : `SUPER ADMIN`
    },
    Roles : 
    {
      admin : 1,
      service_provider : 2,
      super_admin : 3
    },
    templates :
    {
        invoice : 1,
        quotaions : 2
    },
    
    firstTimeData :
    {
        pname : `regex1`,
        description : `Password contain at least one lowercase, uppercase, special character, and be 8-16 characters long.`,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[0-9a-zA-Z]).{8,16}$/,
        NAME : `Admin1`,
        EMAIL : `admin123@gmail.com`,
        SPUSERNAME : `Admin`,
        PASSWORD : `Admin$123`,
        CONTACT_PERSON : `OWNER`,
        ROLE_ID : 1,
        IDPROOF : `126432WDCWSE4`,
        CONTACT_NO : `8421168035`,
        CONTACT_ADDRESS : `78 SAKET NAGAR NEAR NARENDRA NAGAR`,
        EMERGENCY_CONTACT_NO : `9823036123`,
        CERTIFICATION_OR_LICENSE_IMG : `dqw5ec9+5c3sc1sw6fe7cw31ce.jpg`,
        CERTIFICATION_OR_LICENSE_NO : `adsf45421a8dsc`,
        phone_verified : `TRUE`,
        email_verified : `TRUE`,
        currenciesName : `Dirham`,
        currenciesAbbreviation : `AED`,
        languageName : `English`,
        fileName : `en_us.json`,
        langaugeAbbreviation : `EN`,
        taxatationTypeOne : `FLAT`,
        taxatationNameOne : `Fixed Tax`,
        taxatationValueOne : 10,
        taxatationTypeTwo : `PERCENTAGE`,
        taxatationNameTwo : `Sales Tax`,
        taxatationValueTwo : `7.5`,
        applicationTitle : `Kali Plus`,
        applicationContactAddress : `123 Main Street, City, Country`,
        applicationEmail : `contact@example.com`,
        applicationPhoneNumber : `1234567890`,
        applicationCountryCode : `+1`,
        applicationLogoFileName : `804839_white-logo.png`,
        applicationLoginPageLogoFileName : `510011_black-logo.png`,
        applicationLoginPageBGImage : `869811_bg.jpg`,
        applicationFaviconImage : `199845_logo.png`,
        applicationLicenceNumber : `12345-ABC`,
        applicationInvoicePrefix : `INV`,
        applicationQuotationPrefix : `QUO`,
        roleOne : `ADMIN`,
        roleTwo : `SERVICE PROVIDER`,
        roleThree : `SUPER ADMIN`,
        moduleOne : `MENU`,
        moduleTwo : `DASHBOARD`,
        moduleThree : `SERVICE PROVIDER`,
        moduleFour : `CUSTOMERS`,
        moduleFive : `VEHICLES`,
        moduleSix : `DRIVERS`,
        moduleSeven : `ENQUIRIES`,
        moduleEight : `QUOTATIONS`,
        moduleNine : `TRIP DETAILS`,
        moduleTen :  `INVOICES`,
        moduleEleven : `ACCOUNTS`,
        moduleTwelve : `REPORTS`,
        moduleThirteen : `APPLICATION SETTINGS`,
        discountName : `EID OFFER`,
        discountType : `PERCENTAGE`,
        dicountRate : `15`,
        templateFirstInvoiceName : `Invoice`,
        templateFirstInvoiceSubject : `Payment Invoice`,
        templateFirstInvoicePurpose :  `This will be used for sending the invoice on email`,
        templateFirstInvoiceType : `Email`,
        templateSecondQuotationName : `Quotation`,
        templateSecondQuotationSubject : `Booking Quotation`,
        templateSecondQuotationPurpose :  `This will be used for sending the quotation on email`,
        templateSecondQuotationType : `Email`,
    },

}
