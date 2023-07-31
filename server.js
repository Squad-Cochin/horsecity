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
 * INSERT INTO service_providers (name, email, user_name, password, contact_person, contact_no, role_id, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at) VALUES ( 'Saurabh Pande', 'sp832155@gmail.com', 'Saurabh1998', SHA2('Asdf$1234', 256), 'owner', '126432WDCWSE4', NULL, '78 SAKET NAGAR NEAR NARENDRA NAGAR', '8421168036', 'dqw5ec9+5c3sc1sws6fe7cw31ce.jpg', 'adsf45421a8dssc',1, 1, '2023-10-03 15:32:34' );
 * INSERT INTO service_providers (name, email, user_name, password, contact_person, contact_no, role_id, contact_address, emergency_contact_no, licence_image, licence_no, phone_verified, email_verified, expiry_at) VALUES ('Saurabh Pande', 'sp83255@gmail.com', 'Saurabh1999', SHA2('Asdf$1234', 256), 'owner', '126432WDCWSE4', NULL, '78 SAKET NAGAR NEAR NARENDRA NAGAR', '8421168036', 'dqw5ec9+5c3sc1ssws6fe7cw31ce.jpg', 'adsf5421a8dssc', 1, 1, '2023-10-03 15:32:34'); 
 * INSERT INTO `languages` (`id`, `name`, `file`, `abbreviation`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'English', 'englisj.json', 'ENG', 'ACTIVE', '2023-07-28 22:18:40', NULL, NULL);
 *  
 * INSERT INTO `currencies` (`id`, `name`, `abbreviation`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'Dhiram', 'AED', 'ACTIVE', NULL, NULL, NULL);
 * INSERT INTO `taxations` (`id`, `type`, `name`, `value`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'PERCENTAGE', 'VAT', '5', 'ACTIVE', '2023-07-28 22:21:18', NULL, NULL);
 * INSERT INTO `discount_types` (`id`, `name`, `type`, `rate`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'Id', 'PERCENTAGE', '5', 'ACTIVE', '2023-07-28 22:39:09', NULL, NULL);
 * INSERT INTO `payment_types` (`id`, `name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'Cash', 'ACTIVE', '2023-07-28 22:44:42', NULL, NULL);
 * INSERT INTO `enquiries` (`id`, `customer_id`, `vehicle_id`, `serviceprovider_id`, `pickup_location`, `drop_location`, `trip_type`, `pickup_country`, `drop_country`, `no_of_horse`, `description`, `status`, `created_at`) VALUES ('1', '1', '1', '2', 'Radisson Blu', 'Hithrow Airport', 'PRIVATE', 'India', 'England', '5', 'I want to ship my horse to UK.', 'NOTCONFIRMED', '2023-07-28 22:27:30');
 * INSERT INTO `quotations` (`id`, `customer_id`, `enquiry_id`, `serviceprovider_id`, `taxation_id`, `vehicle_id`, `driver_id`, `discount_type_id`, `quotation_id`, `trip_type`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `no_of_horse`, `special_requirement`, `additional_service`, `transportation_insurance_coverage`, `driver_amount`, `vehicle_amount`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', '1', '1', '2', '1', '1', '1', '1', 'Q001', 'PRIVATE', 'Devi Ahilya Bai Holkar Airport', 'India', '2023-07-29 22:40:51', 'Hithrow Airport', 'England', '2023-07-31 22:40:51', '5', 'Medicine', 'Washing', 'TRUE', '35', '45', '90', '15', '5', '100', 'CONFIRMED', '2023-07-28 22:40:51', NULL, NULL);
 * INSERT INTO `invoices` (`id`, `invoice_no`, `quot_id`, `quotation_prefix_id`, `service_provider_id`, `vehicle_id`, `driver_id`, `pickup_point`, `drop_point`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'I001', '1', 'Q001', '2', '2', '1', 'Radisson Blu', 'Pride Hotel', '115', '9', '9', '115', 'ACTIVE', '2023-07-31 22:23:49', NULL, NULL);
 * INSERT INTO `enquiries` (`id`, `customer_id`, `vehicle_id`, `serviceprovider_id`, `pickup_location`, `drop_location`, `trip_type`, `pickup_country`, `drop_country`, `no_of_horse`, `description`, `status`, `created_at`) VALUES (NULL, '3', '2', '2', 'Maharaj Bagh', 'Civil Lines', 'PRIVATE', 'India', 'Pakistan', '6', 'This is a end to end use', 'NOTCONFIRMED', '2023-07-31 22:32:03');
 * INSERT INTO `enquiries` (`id`, `customer_id`, `vehicle_id`, `serviceprovider_id`, `pickup_location`, `drop_location`, `trip_type`, `pickup_country`, `drop_country`, `no_of_horse`, `description`, `status`, `created_at`) VALUES (NULL, '2', '3', '2', 'Savner bagh', 'Itwari Station', 'SHARING', 'Bhutan', 'Nepal', '3', 'One country to another', 'NOTCONFIRMED', '2023-07-31 22:33:02');
 * 
 * INSERT INTO `quotations` (`id`, `customer_id`, `enquiry_id`, `serviceprovider_id`, `taxation_id`, `vehicle_id`, `driver_id`, `discount_type_id`, `quotation_id`, `trip_type`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `no_of_horse`, `special_requirement`, `additional_service`, `transportation_insurance_coverage`, `driver_amount`, `vehicle_amount`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('2', '4', '2', '1', '1', '1', '1', '1', 'Q002', 'SHARING', 'Maharaj Bagh', 'India', '2023-07-31 22:34:50', 'Civil Lines', 'India', '2023-07-31 22:34:50', '6', 'Makeup', 'Washing', 'TRUE', '50', '150', '200', '25', '10', '215', 'NOTCONFIRMED', '2023-07-31 22:34:50', NULL, NULL);
 * INSERT INTO `quotations` (`id`, `customer_id`, `enquiry_id`, `serviceprovider_id`, `taxation_id`, `vehicle_id`, `driver_id`, `discount_type_id`, `quotation_id`, `trip_type`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `no_of_horse`, `special_requirement`, `additional_service`, `transportation_insurance_coverage`, `driver_amount`, `vehicle_amount`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, '3', '3', '2', '1', '3', '3', '1', 'Q003', 'SHARING', 'Savner bagh', 'India', '2023-07-31 22:37:14', 'Itwari Station', 'England', '2023-07-31 22:37:14', '5', 'Dressing', 'Bathing', 'TRUE', '150', '450', '600', '60', '50', '610', 'NOTCONFIRMED', '2023-07-31 22:37:14', NULL, NULL);
 * ALTER TABLE `payment_records`
 * ADD `created_at` DATETIME AFTER `status`,
 * ADD `updated_at` DATETIME AFTER `created_at`,
 * ADD `deleted_at` DATETIME AFTER `updated_at`;

 */