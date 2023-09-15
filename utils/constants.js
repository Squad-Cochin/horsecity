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
        passworderror : `Invalid password: Your Password does not meet the following requirements: It Must contain at least one lowercase and one uppercase letter, one special character,one special character and length from 8 to 16 characters.`,
        newpassworderror : `Invalid new password:  Your new password does not meet the following requirements: It Must contain at least one lowercase and one uppercase letter, one special character,one special character and length from 8 to 16 characters.`,
        confirmpassworderror : `Invalid confirm password:  Your confirm password does not meet the following requirements: It Must contain at least one lowercase and one uppercase letter, one special character,one special character and length from 8 to 16 characters.`, 
        restacc : `Restricted Access.`,
        trip: `Trip started.`,
        cancel: `Trip canceled.`,
        params: `Params ID not submitted or incorrect params ID submitted.`,
        payment1: `The value is negative. It is not permitted.`,
        payment2: `The payment has already been made in full.`,
        payment3: `Payment which is being inserted is more than the remaining payment. Please enter again.`,
        email1: `Unable to email the invoice. `,
        email2: `Invoice sent successfully on email.`,
        email3: `Email not exists .`,
        email4: `Invalid email.`,
        vehicle1: `Vehicle maximum horse carrying capacity required.`,
        vehicle2: `Vehicle maximum horse carrying capacity must be a number.`,
        vehicle3: `Vehicle maximum horse carrying capacity must be greater than zero.`,
        vehicle4: `Vehicle is equipped with air conditioning. Please provide details.`,
        vehicle5: `Vehicle air conditioner equipped input is invalid. Please select "YES" or "NO".`,
        vehicle6: `Vehicle is equipped with temperature control. Please provide details.`,
        vehicle7: `Vehicle temperature control equipped input is invalid. Please select "YES" or "NO".`,
        vehicle8: `Vehicle GCC travel capability requires details.`,
        vehicle9: `Vehicle GCC travel capability input is invalid. Please select "YES" or "NO".`,
        vehicle10: `Vehicle insurance cover value required. Select "YES" if the vehicle has insurance cover, or "NO" if it does not.`,
        vehicle11: `Vehicle insurance cover input is invalid. Please select "YES" or "NO".`,
        vehicle12: `Vehicle registration number required.`,
        vehicle13: `Vehicle insurance cover number required.`,
        vehicle14: `Vehicle type is required. Please select one of the following: (PRIVATE, GCC, SHARING).`,
        vehicle15: `Vehicle type input is invalid. Please select one of the following: (PRIVATE, GCC, SHARING).`,
        vehicle16: `Vehicle number required.`,
        vehicle17: `Failed! Not a valid vehicle number. Vehicle number must contain symbols. Please check and enter again.`,
        vehicle18: `Vehicle safety certificate image required.`,
        attachement1: `Driver profile photo required.`,
        attachement2: `Driver licence image required.`,
        attachement3: `Driver profile image required.`,
        attachement4: `We're sorry, but the image format of driver profile image you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g.JPG, PNG).`,
        attachement5: `We're sorry, but the image format of driver licence image you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g JPG, PNG).`,
        attachement6: `We're sorry, but the image format of safety ceretificate of the vehicle you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g.JPG, PNG)."`,
        attachement7: `We're sorry, but the vehicle image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).`,
        attachement8: `We're sorry, but the image format  of the customer id proof you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g JPG, PNG).`,
        attachement9: `Customer ID proof image required.`,
        logsuccess: `Login Successful!`,
        logoutsuccess: `Logout Successful!`,
        passwordupdate: `Password updated successfully!`,
        passwordupdatef: `Password update failed.`,
        verifiedSuccess: `Successfully verified!`,
        verifiedFailed: `Verification failed.`,
        driverassigned: `Driver successfully assigned to service provider.`,
        driverunassigned: `Driver unassigned to service provider.`,
        backend1: `Service provider ID not found. Unable to assign service provider.`,
        backend2: `Error: The driver is already employed by other service provider, so we cannot permit them to work here at this time.`,
        backend3: `Driver ID not found. Unable to assign service provider.`,
        backend5: `Failed to retrieve the current service providers for the driver.`,
        backend6: `The driver does not have any previous experience working with any of our registered service providers.`,
        backend7: "This driver is no longer affiliated with any service provider.",
        backend8: "The driver has already been unassigned from the service provider.",
        enquiryBooked: `Booking confirmed successfully.`,
        enquiryBookFailed: `Booking was unsuccessful.`,
        validatorError1: `Please provide your email address.`,
        validatorError2: `The email should not include spaces. Please re-enter your email.`,
        validatorError3: `The email format is incorrect. Please review and enter a valid email address.`,
        validatorError4: `Please provide a username.`,
        validatorError5: `The username should not include spaces. Please re-enter your username.`,
        validatorError6: `The username format is incorrect. Please review and enter a valid username.`,
        validatorError7: `Please provide a contact number.`,
        validatorError8: `The contact numbers should not include spaces. Please re-enter your contact number.`,
        validatorError9: `The contact number format is incorrect. Please review and enter a valid contact number.`,
        validatorError10: `Please provide your license number.`,
        validatorError11: `Please provide your ID proof number.`,
        validatorError13: `Please provide an emergency contact number.`,
        validatorError14: `The emergency contact numbers should not include spaces. Please re-enter the emergency contact number.`,
        validatorError15: `The emergency contact number should be different from the primary contact number.`,
        validatorError16: `The emergency contact number is not in the correct format. Please review and enter a valid emergency contact number.`,
        validatorError17: `Please provide your date of birth.`,
        validatorError18: `The date of birth should not include spaces. Please re-enter your date of birth.`,
        validatorError19: `The date of birth format is incorrect. Please review and enter a valid date of birth.`,
        validatorError20: `Please provide your ID proof number.`,
        validatorError21: `This ID proof number is already registered in the database by another user. Please use a different ID proof number.`,
        validatorError22: `Please provide a description of the driver.`,
        validatorError23: `The entered password and confirm password do not match.`,
        validatorError24: `The new password cannot be the same as your previous password.`,
        validatorError25: `Your confirm new password cannot match your previous password.`,
        validatorError26: `Please provide a password.`,
        validatorError27: `Passwords should not include spaces. Please re-enter your password.`,
        validatorError28: `Please enter a new password.`,
        validatorError29: `The new password should not contain spaces. Please try again.`,
        validatorError30: `Please enter confirm password.`,
        validatorError31: `Confirm password should not contain spaces. Please try again.`,
        validatorError32: `The customer ID proof image has not been uploaded.`,
        validatorError33: `The driver's profile image has not been uploaded.`,
        validatorError34: `The previous inquiry with these details has not been confirmed by the service provider yet. We will forward this inquiry on your behalf right now. Please wait.`,
        validatorError35: `The previous inquiry with the same details has not been confirmed by the service provider yet. Modifying only the description is not allowed. The service provider will contact you directly.`,
        validatorError36: `The driver's license image has not been uploaded.`,
        validatorError37: `Customer id proof image is not uploaded.`,
        validatorError39: `The vehicle safety certificate has not been uploaded.`,
        validatorError40: `The vehicle image has not been uploaded.`,
        validatorError41: `The vehicle image title has not been added.`,
        validatorError42: `The username could not be found.`,
        validatorError43: `The password entered is incorrect.`,
        validatorError44: "The service provider is currently inactive.",
        validatorError45: "Your password has expired. Please create a new one.",
        validatorError46: "This username appears to be incorrect, or no customer is registered with this username.",
        validatorError47: "The entered password is incorrect.",
        validatorError48: `The username entered is incorrect.`,
        validatorError49: `Access is restricted.`,
        validatorError50: `Name is required and should contain only alphabetic characters.`,
        validatorError38: `The username already exists.`,
        validatorError51: `The email already exists.`,
        validatorError52: `The license number should not contain spaces. Please try again.`,
        validatorError53: `The license number already exists.`,
        validatorError54: `The name is already taken.`,
        validatorError55: `The abbreviation is already taken.`,
        validatorError56: `The contact number already exists.`,
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
        regex :  '/^(?:.*[a-zA-Z])(?:.*[A-Z])(?:.*[-\#\$\.\%\&\*])(?:.*[0-9a-zA-Z]).{8,16}$/',
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
        applicationTitle : `Your Application Title`,
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
