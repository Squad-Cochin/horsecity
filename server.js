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



/**
 * 
 * INSERT INTO `roles` (`id`, `name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'ADMIN', 'ACTIVE', '2023-08-04 10:23:21', NULL, NULL), (NULL, 'SERVICE PROVIDER', 'ACTIVE', '2023-08-04 10:23:21', NULL, NULL);
 * 
 * INSERT INTO `modules` (`id`, `name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'CUSTOMER', 'ACTIVE', '2023-08-04 10:25:26', NULL, NULL), (NULL, 'SERVICE PROVIDER', 'ACTIVE', '2023-08-04 10:25:26', NULL, NULL), (NULL, 'DRIVER', 'ACTIVE', '2023-08-04 10:27:24', NULL, NULL), (NULL, 'VEHICLES', 'ACTIVE', '2023-08-04 10:27:24', NULL, NULL), (NULL, 'ENQUIRIES', 'ACTIVE', '2023-08-04 10:27:59', NULL, NULL), (NULL, 'QUOATATION', 'ACTIVE', '2023-08-04 10:28:55', NULL, NULL), (NULL, 'TRIP DETAILS', 'ACTIVE', '2023-08-04 10:28:55', NULL, NULL), (NULL, 'INVOICE', 'ACTIVE', '2023-08-04 10:28:55', NULL, NULL), (NULL, 'ACCOUNTS', 'ACTIVE', '2023-08-04 10:29:36', NULL, NULL), (NULL, 'REPORTS', 'ACTIVE', '2023-08-04 10:29:54', NULL, NULL);
 * 
 * INSERT INTO service_providers (name, email, user_name, password, contact_person, contact_no, role_name, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at) VALUES ( 'Saurabh Pande', 'sp832155@gmail.com', 'Saurabh1998', SHA2('Asdf$1234', 256), 'owner', '126432WDCWSE4', 'ADMIN', '78 SAKET NAGAR NEAR NARENDRA NAGAR', '8421168036', 'dqw5ec9+5c3sc1sws6fe7cw31ce.jpg', 'adsf45421a8dssc',1, 1, '2023-10-03 15:32:34')
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `add`, `edit`, `view`, `delete`, `status`, `confirm`, `send_email`, `setting`, `start_trip`, `view_all`) VALUES (NULL, '1', '1', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE');
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `view_all`, `add`, `status`, `view`, `edit`, `delete`, `confirm`, `send_email`, `setting`, `start_trip`, `assign_service_provider`) VALUES (NULL, '1', '3', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', NULL, NULL, NULL, NULL, 'TRUE');
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `view_all`, `add`, `status`, `view`, `edit`, `delete`, `confirm`, `send_email`, `setting`, `start_trip`, `assign_service_provider`) VALUES (NULL, '1', '2', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', NULL, NULL, NULL, NULL, NULL);
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `view_all`, `add`, `status`, `view`, `edit`, `delete`, `confirm`, `send_email`, `setting`, `start_trip`, `assign_service_provider`) VALUES (NULL, '1', '4', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', 'TRUE', NULL, NULL, NULL, NULL, NULL);
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `view_all`, `add`, `status`, `view`, `edit`, `delete`, `confirm`, `send_email`, `setting`, `start_trip`, `assign_service_provider`) VALUES (NULL, '1', '5', 'TRUE', NULL, NULL, 'TRUE', NULL, NULL, 'TRUE', NULL, NULL, NULL, NULL);
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `view_all`, `add`, `status`, `view`, `edit`, `delete`, `confirm`, `send_email`, `setting`, `start_trip`, `assign_service_provider`) VALUES (NULL, '1', '6', 'TRUE', NULL, NULL, 'TRUE', 'TRUE', NULL, NULL, 'TRUE', NULL, NULL, NULL);
 * 
 * INSERT INTO `permissions` (`id`, `role_id`, `module_id`, `view_all`, `add`, `status`, `view`, `edit`, `delete`, `confirm`, `send_email`, `setting`, `start_trip`, `assign_service_provider`) VALUES (NULL, '1', '7', 'TRUE', NULL, NULL, 'TRUE', NULL, NULL, NULL, 'TRUE', NULL, 'TRUE', NULL);
 *  
 * 
 * INSERT INTO `languages` (`id`, `name`, `file`, `abbreviation`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'English', 'englisj.json', 'ENG', 'ACTIVE', '2023-07-28 22:18:40', NULL, NULL);
 *  
 * INSERT INTO `currencies` (`id`, `name`, `abbreviation`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'Dhiram', 'AED', 'ACTIVE', NULL, NULL, NULL);
 * INSERT INTO `taxations` (`id`, `type`, `name`, `value`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'PERCENTAGE', 'VAT', '5', 'ACTIVE', '2023-07-28 22:21:18', NULL, NULL);
 * INSERT INTO `discount_types` (`id`, `name`, `type`, `rate`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'Id', 'PERCENTAGE', '5', 'ACTIVE', '2023-07-28 22:39:09', NULL, NULL);
 * INSERT INTO `payment_types` (`id`, `name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'Cash', 'ACTIVE', '2023-07-28 22:44:42', NULL, NULL);
 * INSERT INTO `templates` (`id`, `name`, `subject`, `purpose`, `template`, `type`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'Invoice Email', 'Payment Invoice', 'This is used for sending the invoice on email', 'You can download the invoice by clicking on this - ', 'EMAIL', 'ACTIVE', '2023-08-02 00:48:04', NULL, NULL);
 */
