// CREATE TABLE application_tokens 
// (
//     id INT(11) PRIMARY KEY AUTO_INCREMENT,
//     username VARCHAR(50) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     token VARCHAR(55),
//     type ENUM('MOBILE','WEB','PWA'),
//     status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     token_generated_date DATETIME ,
//     token_expiry_date DATETIME DEFAULT NULL,
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL 
// );

// CREATE TABLE currencies 
// (
//     id INT(11) AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(50) NOT NULL,
//     abbreviation CHAR(5) NOT NULL,
//     status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE languages
// (
//     id INT(11) PRIMARY KEY AUTO_INCREMENT,
//     name CHAR(50) NOT NULL,
//     file VARCHAR(50) NOT NULL,
//     abbreviation CHAR(5) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL 
// );

// CREATE TABLE taxations
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     type ENUM('FLAT', 'PERCENTAGE'),
//     name CHAR(50) NOT NULL,
//     value DECIMAL(5,2) NOT NULL, 
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL 
// );

// CREATE TABLE application_settings (
//     id INT(11) PRIMARY KEY,
//     application_title VARCHAR(50),
//     contact_address VARCHAR(225),
//     email VARCHAR(150) UNIQUE,
//     phone VARCHAR(12),
//     country_code VARCHAR(5),
//     logo VARCHAR(50),
//     loginpage_logo VARCHAR(50),
//     loginpage_bg_image VARCHAR(50),
//     favicon VARCHAR(50),
//     language_id INT(11),
//     currency_id INT(11),
//     tax_id INT(11),
//     licence_number VARCHAR(15),
//     invoice_prefix VARCHAR(5),
//     quotation_prefix VARCHAR(5),
//     created_at DATETIME,
//     updated_at DATETIME,
//     deleted_at DATETIME,
//     FOREIGN KEY (language_id) REFERENCES languages(id),
//     FOREIGN KEY (currency_id) REFERENCES currencies(id),
//     FOREIGN KEY (tax_id) REFERENCES taxations(id)
// );

// CREATE TABLE roles
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name VARCHAR(30),
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE modules
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name VARCHAR(30),
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE permissions
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     role_id INT(11),
//     FOREIGN KEY (role_id) REFERENCES roles(id),
//     module_id INT(11),
//     FOREIGN KEY (module_id) REFERENCES modules(id)
// );


// CREATE TABLE customers
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,    
//     name CHAR(255) NOT NULL,
//     email VARCHAR(150) UNIQUE,
//     user_name VARCHAR(100) UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     contact_no VARCHAR(15) NOT NULL,
//     date_of_birth VARCHAR(15) NOT NULL,
//     id_proof_no VARCHAR(100) NOT NULL,
//     id_proof_image VARCHAR(255) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     phone_verified ENUM('TRUE', 'FALSE'),
//     email_verified ENUM('TRUE', 'FALSE'),
//     expiry_at DATETIME,
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE service_providers
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name CHAR(255) NOT NULL,
//     email VARCHAR(150) UNIQUE,
//     user_name VARCHAR(100) UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     contact_person VARCHAR(255) NOT NULL,
//     role_id INT(11),
//     FOREIGN KEY(role_id) REFERENCES roles(id),
//     contact_no VARCHAR(15) NOT NULL,
//     contact_address VARCHAR(255) NOT NULL,
//     emergency_contact_no VARCHAR(15) NOT NULL,
//     licence_no VARCHAR(100) NOT NULL UNIQUE,
//     licence_image VARCHAR(255) NOT NULL UNIQUE,
//     phone_verified ENUM('TRUE', 'FALSE'),
//     email_verified ENUM('TRUE', 'FALSE'),
//     expiry_at DATETIME,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL 
// );

// CREATE TABLE password_policies
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name VARCHAR(150) NOT NULL,
//     value VARCHAR(100) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE customer_logs
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     ip_address VARCHAR(50) NOT NULL,
//     device_information VARCHAR(255) NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     login_time DATETIME,
//     logout_time DATETIME,
//     duration TIME
// );

// CREATE TABLE service_provider_logs
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     service_provider_id INT(11),
//     FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
//     ip_address VARCHAR(50) NOT NULL,
//     device_information VARCHAR(255) NOT NULL,
//     location VARCHAR(255) NOT NULL,
//     login_time DATETIME,
//     logout_time DATETIME,
//     duration TIME
// );

// CREATE TABLE logs
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     type ENUM('PAYMENT','CONFIRMATION','ALERT'),
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     sprovider_id INT(11),
//     FOREIGN KEY (sprovider_id) REFERENCES service_providers(id),
//     sender VARCHAR(150) NOT NULL,
//     subject VARCHAR(155) NOT NULL,
//     message VARCHAR(255) NOT NULL,
//     receiver VARCHAR(150) NOT NULL,
//     created_at DATETIME 
// );

// CREATE TABLE templates
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name VARCHAR(155) NOT NULL,
//     subject VARCHAR(155) NOT NULL,
//     purpose VARCHAR(155) NOT NULL,
//     template VARCHAR(155) NOT NULL,
//     type ENUM('SMS','EMAIL'),
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE otp_stores
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY(customer_id) REFERENCES customers(id),
//     serviceprovider_id INT(11),
//     FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
//     user_type ENUM('CUSTOMER', 'SERVICE PROVIDER'),
//     purpose ENUM ('PASSWORD RESET', 'CONTACT VERIFICATION', 'EMAIL VERIFICATION'),
//     otp VARCHAR(255) NOT NULL,
//     delivery_method ENUM('EMAIL', 'SMS'),
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     otp_used_status ENUM ('USED', 'NOT USED'),
//     created_at DATETIME ,
//     expired_at DATETIME ,
//     updated_at DATETIME NULL  
// );

// CREATE TABLE vehicles
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     service_provider_id INT(11),
//     FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
//     vehicle_number VARCHAR(150) UNIQUE NOT NULL,
//     make VARCHAR(150) NOT NULL,
//     model VARCHAR(150) NOT NULL,
//     color VARCHAR(75) NOT NULL,
//     length DECIMAL(5,2) NOT NULL,
//     breadth DECIMAL(5,2) NOT NULL,
//     height DECIMAL(5,2) NOT NULL,
//     no_of_horse INT(2) NOT NULL,
//     air_conditioner ENUM ('YES', 'NO'),
//     temperature_manageable ENUM ('YES', 'NO'),
//     registration_no VARCHAR(150) UNIQUE NOT NULL,
//     gcc_travel_allowed ENUM ('YES', 'NO'),
//     insurance_cover ENUM ('YES', 'NO'), 
//     insurance_date DATE,
//     insurance_policy_no VARCHAR(255) UNIQUE NOT NULL,
//     insurance_provider VARCHAR(255) NOT NULL,
//     insurance_expiration_date DATE,
//     safety_certicate VARCHAR(255),
//     vehicle_type ENUM('PRIVATE', 'COMMERCIAL'),
//     vehicle_registration_date DATE,
//     vehicle_exipration_date DATE,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE payment_types
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name VARCHAR(155) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );


// CREATE TABLE calculate_amount_types
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     service_provider_id INT(11),
//     FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),    
//     unit VARCHAR(25) NOT NULL,
//     base_value DECIMAL(5,2) NOT NULL,
//     base_amount DECIMAL(5,2) NOT NULL,    
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );

// CREATE TABLE discount_types
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name CHAR(50) NOT NULL,
//     type ENUM('PERCENTAGE', 'FLAT'),
//     rate DECIMAL(6,2) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );
// CREATE TABLE drivers
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     name VARCHAR(155) NOT NULL,
//     email VARCHAR(150) UNIQUE NOT NULL,
//     contact_no VARCHAR(15) UNIQUE NOT NULL,
//     emergency_contact_no VARCHAR(15),
//     date_of_birth VARCHAR(15) NOT NULL,
//     profile_image VARCHAR(255),
//     licence_no VARCHAR(100) NOT NULL UNIQUE,
//     licence_img VARCHAR(255) NOT NULL UNIQUE,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     description VARCHAR(255),
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );

// CREATE TABLE vehicles_images
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     vehicle_id INT NOT NULL,
//     FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
//     image VARCHAR(155) NOT NULL,
//     title VARCHAR(155),
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     uploaded_at DATETIME,
//     updated_at DATETIME DEFAULT NULL,
//     deleted_at DATETIME DEFAULT NULL
// );


// ALTER TABLE `invoices` ADD `sub_total` DECIMAL(7,2) NOT NULL AFTER `drop_point`;

// CREATE TABLE enquiries
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     vehicle_id INT(11),
//     FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
//     driver_id INT(11),
//     FOREIGN KEY (driver_id) REFERENCES drivers(id),
//     serviceprovider_id INT(11),
//     FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
//     pickup_location VARCHAR(255) NOT NULL,
//     drop_location VARCHAR(255) NOT NULL,
//     no_of_horse INT(3) NOT NULL,
//     description VARCHAR(255) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME  
// );


// CREATE TABLE quotations
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     enquiry_id INT(11),
//     FOREIGN KEY (enquiry_id) REFERENCES enquiries(id),
//     serviceprovider_id INT(11),
//     FOREIGN KEY(serviceprovider_id) REFERENCES service_providers(id),
//     taxation_id INT(11),
//     FOREIGN KEY (taxation_id) REFERENCES taxations(id),
//     vehicle_id INT(11),
//     FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
//     driver_id INT(11),
//     FOREIGN KEY (driver_id) REFERENCES drivers(id),
//     discount_type_id INT(11),
//     FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
//     quotation_id VARCHAR(15) NOT NULL,
//     trip_type ENUM('PRIVATE','SHARING','GCC'),
//     pickup_location VARCHAR(255) NOT NULL,
//     pickup_country VARCHAR(30) NOT NULL,
//     pickup_date DATETIME,
//     drop_location VARCHAR(255) NOT NULL,
//     drop_country VARCHAR(30) NOT NULL,
//     drop_date DATETIME,   
//     no_of_horse INT(3) NOT NULL,
//     special_requirement VARCHAR(255),
//     additional_service VARCHAR(255),
//     transportation_insurance_coverage ENUM('TRUE', 'FALSE'),
//     driver_amount DECIMAL(7, 2),
//     vehicle_amount DECIMAL(7, 2),
//     tax_amount DECIMAL(4,2) NOT NULL,
//     discount_amount DECIMAL(4,2) NOT NULL, 
//     final_amount DECIMAL(7,2) NOT NULL,
//     status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );

// CREATE TABLE horse_details
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     quot_id INT(11),
//     FOREIGN KEY (quot_id) REFERENCES quotations(id),
//     horse_type ENUM ('CHILD', 'ADULT'),
//     horse_age INT(3),
//     horse_gender ENUM ('MALE', 'FEMALE'),
//     horse_breed VARCHAR(50),
//     horse_color VARCHAR(50),
//     horse_height DECIMAL(2,2),
//     horse_weight DECIMAL(4,2) NOT NULL,
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL
// );

// CREATE TABLE bookings
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     quot_id INT(11),
//     FOREIGN KEY (quot_id) REFERENCES quotations(id),
//     service_provider_id INT(11),
//     FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
//     vehicle_id INT(11),
//     FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
//     status ENUM ('PAID', 'PENDING', 'REFUND'),
//     taxation_id INT(11),
//     FOREIGN KEY (taxation_id) REFERENCES taxations(id),
//     discount_type_id INT(11),
//     FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
//     payment_type_id INT(11),
//     FOREIGN KEY(payment_type_id) REFERENCES payment_types(id),
//     booking_status ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
//     pickup_location VARCHAR(255) NOT NULL,
//     pickup_country VARCHAR(30) NOT NULL,
//     pickup_date DATETIME,
//     drop_location VARCHAR(255) NOT NULL,
//     drop_country VARCHAR(30) NOT NULL,
//     drop_date DATETIME,
//     additional_services VARCHAR(255),
//     confirmation_sent ENUM('YES','NO'),
//     tax_amount DECIMAL(4,2) NOT NULL,
//     discount_amount DECIMAL(4,2) NOT NULL, 
//     final_amount DECIMAL(4,2) NOT NULL,
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );
// CREATE TABLE invoices
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     invoice_no VARCHAR(6) NOT NULL UNIQUE,
//     booking_id INT(11),
//     FOREIGN KEY(booking_id) REFERENCES bookings(id),
//     pickup_point VARCHAR(255),
//     drop_point VARCHAR(255),
//     tax_amount DECIMAL(4,2) NOT NULL,
//     discount_amount DECIMAL(4,2) NOT NULL, 
//     final_amount DECIMAL(4,2) NOT NULL,
//     status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );

// CREATE TABLE payments
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     service_provider_id INT(11),
//     FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
//     booking_id INT(11),
//     FOREIGN KEY(booking_id) REFERENCES bookings(id),
//     invoice_id INT(11),
//     FOREIGN KEY(invoice_id) REFERENCES invoices(id),
//     payment_type_id INT(11),
//     FOREIGN KEY(payment_type_id) REFERENCES payment_types(id),
//     paid_amount DECIMAL(4,2) NOT NULL,
//     status ENUM ('PAID', 'PENDING', 'REFUND'),
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );


// CREATE TABLE vehicles_breakouts
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     booking_id INT(11),
//     FOREIGN KEY (booking_id) REFERENCES bookings(id),
//     service_provider_id INT(11),
//     FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
//     vehicle_id INT(11),
//     FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
//     driver_id INT(11),
//     FOREIGN KEY (driver_id) REFERENCES drivers(id),
//     quotation_id INT(11),
//     FOREIGN KEY (quotation_id) REFERENCES quotations(id),
//     trip_type ENUM('PRIVATE','SHARING','GCC'),
//     pickup_location VARCHAR(255) NOT NULL,
//     pickup_country VARCHAR(30) NOT NUL,
//     pickup_date DATETIME,
//     drop_location VARCHAR(255) NOT NULL,
//     drop_country VARCHAR(30) NOT NULL,
//     drop_date DATETIME,
//     trip_distance DECIMAL(5,2) NOT NULL,
//     total_amount DECIMAL(5,2) NOT NULL,
//     breakout_location VARCHAR(255) NOT NULL,
//     distance_covered DECIMAL(5,2) NOT NULL,
//     distance_remain DECIMAL(5,2) NOT NULL, 
//     amount_billed DECIMAL(5,2) NOT NULL,
//     amount_remained DECIMAL(5,2) NOT NULL,
//     remark VARCHAR(255) NOT NULL,
//     status ENUM ('PENDING', 'APPROVED', 'REJECTED'),
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL ,
//     deleted_at DATETIME DEFAULT NULL   
// );


// CREATE TABLE reviews
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     booking_id INT(11),
//     FOREIGN KEY (booking_id) REFERENCES bookings(id),
//     vehicle_id INT(11),
//     FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
//     vehicle_rating INT(2),
//     vehicle_description VARCHAR(255),
//     driver_id INT(11),
//     FOREIGN KEY (driver_id) REFERENCES drivers(id),
//     driver_rating INT(2),
//     driver_description VARCHAR(255),
//     service_provider_id INT(11),
//     FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
//     service_provider_rating INT(2),
//     service_provider_description VARCHAR(255),
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL 
// );

// CREATE TABLE bookings_logs
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_id INT(11),
//     FOREIGN KEY (customer_id) REFERENCES customers(id),
//     booking_id INT(11),
//     FOREIGN KEY(booking_id) REFERENCES bookings(id),
//     booking_status ENUM('CONFIRM', 'PENDING', 'CANCELED', 'COMPLETED', 'ONGOING'),
//     created_at DATETIME ,
//     updated_at DATETIME DEFAULT NULL,
//     deleted_at DATETIME DEFAULT NULL   
// );

// CREATE TABLE vehicles_transportation
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     vehicle_id INT(11),
//     FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
//     vehicle_owner_id INT(11),
//     FOREIGN KEY (vehicle_owner_id) REFERENCES service_providers(id),
//     driver_id INT(11),
//     FOREIGN KEY (driver_id) REFERENCES drivers(id),
//     booking_id INT(11),
//     FOREIGN KEY (booking_id) REFERENCES bookings(id),
//     trip_type ENUM('PRIVATE','SHARING','GCC'),
//     pickup_location VARCHAR(255) NOT NULL,
//     pickup_country VARCHAR(30) NOT NULL,
//     pickup_date DATETIME,
//     drop_location VARCHAR(255) NOT NULL,
//     drop_country VARCHAR(30) NOT NULL,
//     drop_date DATETIME,
//     trip_distance DECIMAL(5,2) NOT NULL,
//     status ENUM('COMPLETED', 'ONGOING', 'NOT COMPLETED')
// );

// ALTER TABLE enquiries
// MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
// MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;


// ALTER TABLE quotations
// MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
// MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;

// ALTER TABLE quotations
// MODIFY COLUMN quatation_prefix_id VARCHAR(15) NOT NULL,

// ALTER TABLE bookings
// MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
// MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;


// ALTER TABLE vehicles_breakouts
// MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
// MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;


// ALTER TABLE vehicles_transportation
// MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
// MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;

// ALTER TABLE quotations
// ADD COLUMN status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED';

// CREATE TABEL payment_records
// (
//     id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
// 	invoice_id INT(11),
//     FOREIGN KEY (invoice_id) REFERENCES invoices(id),
//     total_amount DECIMAL(4,2),
//     received_amount DECIMAL(4,2),
//     received_data DATETIME,
// 	remaining_amount DECIMAL(4,2),
//     status ENUM('PAID', 'PARTIALLY PAID', 'PENDING')
// );


// We need to add created at and deleted in payment record

// --------------------------------------------------------------------------------------------------------------------



/*

CREATE TABLE application_tokens 
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(55),
    type ENUM('MOBILE','WEB','PWA'),
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    token_generated_date DATETIME ,
    token_expiry_date DATETIME DEFAULT NULL,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL 
);

CREATE TABLE currencies 
(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    abbreviation CHAR(5) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE languages
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name CHAR(50) NOT NULL,
    file VARCHAR(50) NOT NULL,
    abbreviation CHAR(5) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL 
);

CREATE TABLE taxations
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('FLAT', 'PERCENTAGE'),
    name CHAR(50) NOT NULL,
    value DECIMAL(5,2) NOT NULL, 
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL 
);

CREATE TABLE application_settings (
    id INT(11) PRIMARY KEY,
    application_title VARCHAR(50),
    contact_address VARCHAR(225),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(12),
    country_code VARCHAR(5),
    logo VARCHAR(50),
    loginpage_logo VARCHAR(50),
    loginpage_bg_image VARCHAR(50),
    favicon VARCHAR(50),
    language_id INT(11),
    currency_id INT(11),
    tax_id INT(11),
    licence_number VARCHAR(15),
    invoice_prefix VARCHAR(5),
    quotation_prefix VARCHAR(5),
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (language_id) REFERENCES languages(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id),
    FOREIGN KEY (tax_id) REFERENCES taxations(id)
);

CREATE TABLE roles
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE modules
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE permissions
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    role_id INT(11),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    module_id INT(11),
    FOREIGN KEY (module_id) REFERENCES modules(id)
);


CREATE TABLE customers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,    
    name CHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    user_name VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    date_of_birth VARCHAR(15) NOT NULL,
    id_proof_no VARCHAR(100) NOT NULL,
    id_proof_image VARCHAR(255) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    phone_verified ENUM('TRUE', 'FALSE'),
    email_verified ENUM('TRUE', 'FALSE'),
    expiry_at DATETIME,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE service_providers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    user_name VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    role_id INT(11),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    contact_no VARCHAR(15) NOT NULL,
    contact_address VARCHAR(255) NOT NULL,
    emergency_contact_no VARCHAR(15) NOT NULL,
    licence_no VARCHAR(100) NOT NULL UNIQUE,
    licence_image VARCHAR(255) NOT NULL UNIQUE,
    phone_verified ENUM('TRUE', 'FALSE'),
    email_verified ENUM('TRUE', 'FALSE'),
    expiry_at DATETIME,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL 
);

CREATE TABLE password_policies
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    value VARCHAR(100) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE customer_logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    ip_address VARCHAR(50) NOT NULL,
    device_information VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    login_time DATETIME,
    logout_time DATETIME,
    duration TIME
);

CREATE TABLE service_provider_logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    ip_address VARCHAR(50) NOT NULL,
    device_information VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    login_time DATETIME,
    logout_time DATETIME,
    duration TIME
);

CREATE TABLE logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('PAYMENT','CONFIRMATION','ALERT'),
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    sprovider_id INT(11),
    FOREIGN KEY (sprovider_id) REFERENCES service_providers(id),
    sender VARCHAR(150) NOT NULL,
    subject VARCHAR(155) NOT NULL,
    message VARCHAR(255) NOT NULL,
    receiver VARCHAR(150) NOT NULL,
    created_at DATETIME 
);

CREATE TABLE templates
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(155) NOT NULL,
    subject VARCHAR(155) NOT NULL,
    purpose VARCHAR(155) NOT NULL,
    template VARCHAR(155) NOT NULL,
    type ENUM('SMS','EMAIL'),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE otp_stores
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY(customer_id) REFERENCES customers(id),
    serviceprovider_id INT(11),
    FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
    user_type ENUM('CUSTOMER', 'SERVICE PROVIDER'),
    purpose ENUM ('PASSWORD RESET', 'CONTACT VERIFICATION', 'EMAIL VERIFICATION'),
    otp VARCHAR(255) NOT NULL,
    delivery_method ENUM('EMAIL', 'SMS'),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    otp_used_status ENUM ('USED', 'NOT USED'),
    created_at DATETIME ,
    expired_at DATETIME ,
    updated_at DATETIME NULL  
);

CREATE TABLE vehicles
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    vehicle_number VARCHAR(150) UNIQUE NOT NULL,
    make VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    color VARCHAR(75) NOT NULL,
    length DECIMAL(5,2) NOT NULL,
    breadth DECIMAL(5,2) NOT NULL,
    height DECIMAL(5,2) NOT NULL,
    no_of_horse INT(2) NOT NULL,
    air_conditioner ENUM ('YES', 'NO'),
    temperature_manageable ENUM ('YES', 'NO'),
    registration_no VARCHAR(150) UNIQUE NOT NULL,
    gcc_travel_allowed ENUM ('YES', 'NO'),
    insurance_cover ENUM ('YES', 'NO'), 
    insurance_date DATE,
    insurance_policy_no VARCHAR(255) UNIQUE NOT NULL,
    insurance_provider VARCHAR(255) NOT NULL,
    insurance_expiration_date DATE,
    safety_certicate VARCHAR(255),
    vehicle_type ENUM('PRIVATE', 'COMMERCIAL'),
    vehicle_registration_date DATE,
    vehicle_exipration_date DATE,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE payment_types
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(155) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE calculate_amount_types
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),    
    unit VARCHAR(25) NOT NULL,
    base_value DECIMAL(5,2) NOT NULL,
    base_amount DECIMAL(5,2) NOT NULL,    
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE discount_types
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name CHAR(50) NOT NULL,
    type ENUM('PERCENTAGE', 'FLAT'),
    rate DECIMAL(6,2) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);
CREATE TABLE drivers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(155) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contact_no VARCHAR(15) UNIQUE NOT NULL,
    emergency_contact_no VARCHAR(15),
    date_of_birth VARCHAR(15) NOT NULL,
    profile_image VARCHAR(255),
    licence_no VARCHAR(100) NOT NULL UNIQUE,
    licence_img VARCHAR(255) NOT NULL UNIQUE,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    description VARCHAR(255),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE vehicles_images
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vehicle_id INT NOT NULL,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    image VARCHAR(155) NOT NULL,
    title VARCHAR(155),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    uploaded_at DATETIME,
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL
);


CREATE TABLE enquiries
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    serviceprovider_id INT(11),
    FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_country VARCHAR(30) NOT NULL ,
    drop_country VARCHAR(30) NOT NULL,
    no_of_horse INT(3) NOT NULL,
    description VARCHAR(255) NOT NULL,
    status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED',
    created_at DATETIME  
);

CREATE TABLE quotations
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    enquiry_id INT(11),
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id),
    serviceprovider_id INT(11),
    FOREIGN KEY(serviceprovider_id) REFERENCES service_providers(id),
    taxation_id INT(11),
    FOREIGN KEY (taxation_id) REFERENCES taxations(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    discount_type_id INT(11),
    FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
    quotation_id VARCHAR(15) NOT NULL,
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NULL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,   
    no_of_horse INT(3) NOT NULL,
    special_requirement VARCHAR(255),
    additional_service VARCHAR(255),
    transportation_insurance_coverage ENUM('TRUE', 'FALSE'),
    driver_amount DECIMAL(7, 2),
    vehicle_amount DECIMAL(7, 2),
    sub_total DECIMAL(7,2) NOT NULL,
    tax_amount DECIMAL(4,2) NOT NULL,
    discount_amount DECIMAL(4,2) NOT NULL, 
    final_amount DECIMAL(7,2) NOT NULL,
    status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE horse_details
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    quot_id INT(11),
    FOREIGN KEY (quot_id) REFERENCES quotations(id),
    horse_type ENUM ('CHILD', 'ADULT'),
    horse_age INT(3),
    horse_gender ENUM ('MALE', 'FEMALE'),
    horse_breed VARCHAR(50),
    horse_color VARCHAR(50),
    horse_height DECIMAL(2,2),
    horse_weight DECIMAL(4,2) NOT NULL,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE bookings
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    quot_id INT(11),
    FOREIGN KEY (quot_id) REFERENCES quotations(id),
    quotation_prefix_id VARCHAR(15) NOT NULL,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    vehicle_id INT(11),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY(driver_id) REFERENCES drivers(id),
    status ENUM ('PAID', 'PENDING', 'REFUND'),
    taxation_id INT(11),
    FOREIGN KEY (taxation_id) REFERENCES taxations(id),
    discount_type_id INT(11),
    FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
    payment_type_id INT(11),
    FOREIGN KEY(payment_type_id) REFERENCES payment_types(id),
    booking_status ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NULL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,
    additional_services VARCHAR(255),
    confirmation_sent ENUM('YES','NO'),
    sub_total DECIMAL(7,2) NOT NULL,
    tax_amount DECIMAL(4,2) NOT NULL,
    discount_amount DECIMAL(4,2) NOT NULL, 
    final_amount DECIMAL(4,2) NOT NULL,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE invoices
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    invoice_no VARCHAR(6) NOT NULL UNIQUE,
    booking_id INT(11),
    FOREIGN KEY(booking_id) REFERENCES bookings(id),
    pickup_point VARCHAR(255),
    drop_point VARCHAR(255),
    sub_total DECIMAL(7,2) NOT NULL,
    tax_amount DECIMAL(4,2) NOT NULL,
    discount_amount DECIMAL(4,2) NOT NULL, 
    final_amount DECIMAL(4,2) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE payments
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    booking_id INT(11),
    FOREIGN KEY(booking_id) REFERENCES bookings(id),
    invoice_id INT(11),
    FOREIGN KEY(invoice_id) REFERENCES invoices(id),
    payment_type_id INT(11),
    FOREIGN KEY(payment_type_id) REFERENCES payment_types(id),
    paid_amount DECIMAL(4,2) NOT NULL,
    status ENUM ('PAID', 'PENDING', 'REFUND'),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE vehicles_breakouts
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    booking_id INT(11),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    service_provider_id INT(11),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    quotation_id INT(11),
    FOREIGN KEY (quotation_id) REFERENCES quotations(id),
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NUL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,
    trip_distance DECIMAL(5,2) NOT NULL,
    total_amount DECIMAL(5,2) NOT NULL,
    breakout_location VARCHAR(255) NOT NULL,
    distance_covered DECIMAL(5,2) NOT NULL,
    distance_remain DECIMAL(5,2) NOT NULL, 
    amount_billed DECIMAL(5,2) NOT NULL,
    amount_remained DECIMAL(5,2) NOT NULL,
    remark VARCHAR(255) NOT NULL,
    status ENUM ('PENDING', 'APPROVED', 'REJECTED'),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE reviews
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    booking_id INT(11),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    vehicle_rating INT(2),
    vehicle_description VARCHAR(255),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    driver_rating INT(2),
    driver_description VARCHAR(255),
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    service_provider_rating INT(2),
    service_provider_description VARCHAR(255),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL 
);

CREATE TABLE bookings_logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    booking_id INT(11),
    FOREIGN KEY(booking_id) REFERENCES bookings(id),
    booking_status ENUM('CONFIRM', 'PENDING', 'CANCELED', 'COMPLETED', 'ONGOING'),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE vehicles_transportation
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    vehicle_owner_id INT(11),
    FOREIGN KEY (vehicle_owner_id) REFERENCES service_providers(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    booking_id INT(11),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NULL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,
    trip_distance DECIMAL(5,2) NOT NULL,
    status ENUM('COMPLETED', 'ONGOING', 'NOT COMPLETED')
);

CREATE TABLE payment_records
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT(11),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    total_amount DECIMAL(4,2),
    received_amount DECIMAL(4,2),
    received_date DATETIME,
    remaining_amount DECIMAL(4,2),
    status ENUM('PAID', 'PARTIALLY PAID', 'PENDING'),
    created_at DATETIME,
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL
);



INSERT INTO bookings (
    customer_id,
    quot_id,
    service_provider_id,
    vehicle_id,
    driver_id,
    status,
    taxation_id,
    discount_type_id,
    payment_type_id,
    booking_status,
    pickup_location,
    pickup_country,
    pickup_date,
    drop_location,
    drop_country,
    drop_date,
    additional_services,
    confirmation_sent,
    sub_total,
    tax_amount,
    discount_amount,
    final_amount,
    created_at
) VALUES (
    23, 
    QUO1, 
    1, 
    5,
    2, 
    'PAID', 
    5, 
    1, 
    1, 
    'CONFIRMED', 
    'Pickup Location',
    'Pickup Country', 
    '2023-07-28 10:00:00',
    'Drop Location', 
    'Drop Country', 
    '2023-07-28 18:00:00',
    'Additional Services', 
    'YES', 
    500.00, 
    20.00, 
    50.00,
    470.00, 
    '2023-07-28 09:30:00' 
);





*/


// --------------------------------------------------------------------------------------------------------------

/*

ALTER TABLE `invoices` ADD `sub_total` DECIMAL(7,2) NOT NULL AFTER `drop_point`;
CREATE TABLE enquiries
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    serviceprovider_id INT(11),
    FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    no_of_horse INT(3) NOT NULL,
    description VARCHAR(255) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME  
);

list
id
name -customer
email - customer
contact_no - customer
description - enquiry
created_at - enquiry


View
name -customer
contact_no - customer
name -service provider
vehicle_number - vehicle
pickup_location - enquiry
drop_location - enquiry
description - enquiry

INSERT INTO enquiries (customer_id, vehicle_id, serviceprovider_id, pickup_location, drop_location, trip_type, pickup_country, drop_country, no_of_horse, description, created_at)
VALUES 
    (23, 5, 1, 'Dubai Marina', 'Burj Khalifa', 'PRIVATE', 'UAE', 'UAE', 2, 'Private city tour',  NOW()),
    (23, 5, 2, 'Abu Dhabi Corniche', 'Sheikh Zayed Grand Mosque', 'SHARING', 'UAE', 'UAE', 3, 'Sharing tour with friends', NOW()),
    (23, 4, 1, 'Doha Downtown', 'The Pearl Qatar', 'GCC', 'QATAR', 'QATAR', 1, 'Short GCC trip', NOW());


ALTER TABLE enquiries
MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;


ALTER TABLE quotations
MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;

ALTER TABLE quotations
MODIFY COLUMN quatation_prefix_id VARCHAR(15) NOT NULL,

ALTER TABLE bookings
MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;


ALTER TABLE vehicles_breakouts
MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;


ALTER TABLE vehicles_transportation
MODIFY COLUMN pickup_country VARCHAR(30) NOT NULL,
MODIFY COLUMN drop_country VARCHAR(30) NOT NULL;

ALTER TABLE quotations
ADD COLUMN status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED';

CREATE TABEL payment_records
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	invoice_id INT(11),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    total_amount DECIMAL(4,2),
    received_amount DECIMAL(4,2),
    received_data DATETIME,
	remaining_amount DECIMAL(4,2),
    status ENUM('PAID', 'PARTIALLY PAID', 'PENDING')
);






INSERT INTO bookings (
    customer_id,
    quot_id,
    service_provider_id,
    vehicle_id,
    driver_id,
    status,
    taxation_id,
    discount_type_id,
    payment_type_id,
    booking_status,
    pickup_location,
    pickup_country,
    pickup_date,
    drop_location,
    drop_country,
    drop_date,
    additional_services,
    confirmation_sent,
    sub_total,
    tax_amount,
    discount_amount,
    final_amount,
    created_at
) VALUES (
    23, 
    QUO1, 
    1, 
    5,
    2, 
    'PAID', 
    5, 
    1, 
    1, 
    'CONFIRMED', 
    'Pickup Location',
    'Pickup Country', 
    '2023-07-28 10:00:00',
    'Drop Location', 
    'Drop Country', 
    '2023-07-28 18:00:00',
    'Additional Services', 
    'YES', 
    500.00, 
    20.00, 
    50.00,
    470.00, 
    '2023-07-28 09:30:00' 
);









*/



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

CREATE TABLE application_tokens 
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(55),
    type ENUM('MOBILE','WEB','PWA'),
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    token_generated_date DATETIME ,
    token_expiry_date DATETIME DEFAULT NULL,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL 
);

CREATE TABLE currencies 
(
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    abbreviation CHAR(5) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE languages
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name CHAR(50) NOT NULL,
    file VARCHAR(50) NOT NULL,
    abbreviation CHAR(5) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL 
);

CREATE TABLE taxations
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('FLAT', 'PERCENTAGE'),
    name CHAR(50) NOT NULL,
    value DECIMAL(5,2) NOT NULL, 
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL 
);

CREATE TABLE application_settings (
    id INT(11) PRIMARY KEY,
    application_title VARCHAR(50),
    contact_address VARCHAR(225),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(12),
    country_code VARCHAR(5),
    logo VARCHAR(50),
    loginpage_logo VARCHAR(50),
    loginpage_bg_image VARCHAR(50),
    favicon VARCHAR(50),
    language_id INT(11),
    currency_id INT(11),
    tax_id INT(11),
    licence_number VARCHAR(15),
    invoice_prefix VARCHAR(5),
    quotation_prefix VARCHAR(5),
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (language_id) REFERENCES languages(id),
    FOREIGN KEY (currency_id) REFERENCES currencies(id),
    FOREIGN KEY (tax_id) REFERENCES taxations(id)
);

CREATE TABLE roles
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE modules
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE permissions
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    role_id INT(11),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    module_id INT(11),
    FOREIGN KEY (module_id) REFERENCES modules(id)
);


CREATE TABLE customers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,    
    name CHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    user_name VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    contact_no VARCHAR(15) NOT NULL,
    date_of_birth VARCHAR(15) NOT NULL,
    id_proof_no VARCHAR(100) NOT NULL,
    id_proof_image VARCHAR(255) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    phone_verified ENUM('TRUE', 'FALSE'),
    email_verified ENUM('TRUE', 'FALSE'),
    expiry_at DATETIME,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE service_providers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL,
    email VARCHAR(150) UNIQUE,
    user_name VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    role_id INT(11),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    contact_no VARCHAR(15) NOT NULL,
    contact_address VARCHAR(255) NOT NULL,
    emergency_contact_no VARCHAR(15) NOT NULL,
    licence_no VARCHAR(100) NOT NULL UNIQUE,
    licence_image VARCHAR(255) NOT NULL UNIQUE,
    phone_verified ENUM('TRUE', 'FALSE'),
    email_verified ENUM('TRUE', 'FALSE'),
    expiry_at DATETIME,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL 
);

CREATE TABLE password_policies
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    value VARCHAR(100) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE customer_logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    ip_address VARCHAR(50) NOT NULL,
    device_information VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    login_time DATETIME,
    logout_time DATETIME,
    duration TIME
);

CREATE TABLE service_provider_logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    ip_address VARCHAR(50) NOT NULL,
    device_information VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    login_time DATETIME,
    logout_time DATETIME,
    duration TIME
);

CREATE TABLE logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('PAYMENT','CONFIRMATION','ALERT'),
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    sprovider_id INT(11),
    FOREIGN KEY (sprovider_id) REFERENCES service_providers(id),
    sender VARCHAR(150) NOT NULL,
    subject VARCHAR(155) NOT NULL,
    message VARCHAR(255) NOT NULL,
    receiver VARCHAR(150) NOT NULL,
    created_at DATETIME 
);

CREATE TABLE templates
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(155) NOT NULL,
    subject VARCHAR(155) NOT NULL,
    purpose VARCHAR(155) NOT NULL,
    template VARCHAR(155) NOT NULL,
    type ENUM('SMS','EMAIL'),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE otp_stores
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY(customer_id) REFERENCES customers(id),
    serviceprovider_id INT(11),
    FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
    user_type ENUM('CUSTOMER', 'SERVICE PROVIDER'),
    purpose ENUM ('PASSWORD RESET', 'CONTACT VERIFICATION', 'EMAIL VERIFICATION'),
    otp VARCHAR(255) NOT NULL,
    delivery_method ENUM('EMAIL', 'SMS'),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    otp_used_status ENUM ('USED', 'NOT USED'),
    created_at DATETIME ,
    expired_at DATETIME ,
    updated_at DATETIME NULL  
);

CREATE TABLE vehicles
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    vehicle_number VARCHAR(150) UNIQUE NOT NULL,
    make VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    color VARCHAR(75) NOT NULL,
    length DECIMAL(5,2) NOT NULL,
    breadth DECIMAL(5,2) NOT NULL,
    height DECIMAL(5,2) NOT NULL,
    no_of_horse INT(2) NOT NULL,
    air_conditioner ENUM ('YES', 'NO'),
    temperature_manageable ENUM ('YES', 'NO'),
    registration_no VARCHAR(150) UNIQUE NOT NULL,
    gcc_travel_allowed ENUM ('YES', 'NO'),
    insurance_cover ENUM ('YES', 'NO'), 
    insurance_date DATE,
    insurance_policy_no VARCHAR(255) UNIQUE NOT NULL,
    insurance_provider VARCHAR(255) NOT NULL,
    insurance_expiration_date DATE,
    safety_certicate VARCHAR(255),
    vehicle_type ENUM('PRIVATE', 'COMMERCIAL'),
    vehicle_registration_date DATE,
    vehicle_exipration_date DATE,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE payment_types
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(155) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE calculate_amount_types
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),    
    unit VARCHAR(25) NOT NULL,
    base_value DECIMAL(5,2) NOT NULL,
    base_amount DECIMAL(5,2) NOT NULL,    
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE discount_types
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name CHAR(50) NOT NULL,
    type ENUM('PERCENTAGE', 'FLAT'),
    rate DECIMAL(6,2) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);
CREATE TABLE drivers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(155) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contact_no VARCHAR(15) UNIQUE NOT NULL,
    emergency_contact_no VARCHAR(15),
    date_of_birth VARCHAR(15) NOT NULL,
    profile_image VARCHAR(255),
    licence_no VARCHAR(100) NOT NULL UNIQUE,
    licence_img VARCHAR(255) NOT NULL UNIQUE,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    description VARCHAR(255),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE vehicles_images
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vehicle_id INT NOT NULL,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    image VARCHAR(155) NOT NULL,
    title VARCHAR(155),
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    uploaded_at DATETIME,
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL
);


CREATE TABLE enquiries
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    serviceprovider_id INT(11),
    FOREIGN KEY (serviceprovider_id) REFERENCES service_providers(id),
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_country VARCHAR(30) NOT NULL ,
    drop_country VARCHAR(30) NOT NULL,
    no_of_horse INT(3) NOT NULL,
    description VARCHAR(255) NOT NULL,
    status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED',
    created_at DATETIME  
);

CREATE TABLE quotations
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    enquiry_id INT(11),
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id),
    serviceprovider_id INT(11),
    FOREIGN KEY(serviceprovider_id) REFERENCES service_providers(id),
    taxation_id INT(11),
    FOREIGN KEY (taxation_id) REFERENCES taxations(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    discount_type_id INT(11),
    FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
    quotation_id VARCHAR(15) NOT NULL,
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NULL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,   
    no_of_horse INT(3) NOT NULL,
    special_requirement VARCHAR(255),
    additional_service VARCHAR(255),
    transportation_insurance_coverage ENUM('TRUE', 'FALSE'),
    driver_amount DECIMAL(7, 2),
    vehicle_amount DECIMAL(7, 2),
    sub_total DECIMAL(7,2) NOT NULL,
    tax_amount DECIMAL(4,2) NOT NULL,
    discount_amount DECIMAL(4,2) NOT NULL, 
    final_amount DECIMAL(7,2) NOT NULL,
    status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE horse_details
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    quot_id INT(11),
    FOREIGN KEY (quot_id) REFERENCES quotations(id),
    horse_type ENUM ('CHILD', 'ADULT'),
    horse_age INT(3),
    horse_gender ENUM ('MALE', 'FEMALE'),
    horse_breed VARCHAR(50),
    horse_color VARCHAR(50),
    horse_height DECIMAL(2,2),
    horse_weight DECIMAL(4,2) NOT NULL,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE bookings
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    quot_id INT(11),
    FOREIGN KEY (quot_id) REFERENCES quotations(id),
    quotation_prefix_id VARCHAR(15) NOT NULL,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    vehicle_id INT(11),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY(driver_id) REFERENCES drivers(id),
    status ENUM ('PAID', 'PENDING', 'REFUND'),
    taxation_id INT(11),
    FOREIGN KEY (taxation_id) REFERENCES taxations(id),
    discount_type_id INT(11),
    FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
    payment_type_id INT(11),
    FOREIGN KEY(payment_type_id) REFERENCES payment_types(id),
    booking_status ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NULL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,
    additional_services VARCHAR(255),
    confirmation_sent ENUM('YES','NO'),
    sub_total DECIMAL(7,2) NOT NULL,
    tax_amount DECIMAL(4,2) NOT NULL,
    discount_amount DECIMAL(4,2) NOT NULL, 
    final_amount DECIMAL(4,2) NOT NULL,
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE invoices
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    invoice_no VARCHAR(6) NOT NULL UNIQUE,
    booking_id INT(11),
    FOREIGN KEY(booking_id) REFERENCES bookings(id),
    pickup_point VARCHAR(255),
    drop_point VARCHAR(255),
    sub_total DECIMAL(7,2) NOT NULL,
    tax_amount DECIMAL(4,2) NOT NULL,
    discount_amount DECIMAL(4,2) NOT NULL, 
    final_amount DECIMAL(4,2) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE payments
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    booking_id INT(11),
    FOREIGN KEY(booking_id) REFERENCES bookings(id),
    invoice_id INT(11),
    FOREIGN KEY(invoice_id) REFERENCES invoices(id),
    payment_type_id INT(11),
    FOREIGN KEY(payment_type_id) REFERENCES payment_types(id),
    paid_amount DECIMAL(4,2) NOT NULL,
    status ENUM ('PAID', 'PENDING', 'REFUND'),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE vehicles_breakouts
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    booking_id INT(11),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    service_provider_id INT(11),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    quotation_id INT(11),
    FOREIGN KEY (quotation_id) REFERENCES quotations(id),
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NUL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,
    trip_distance DECIMAL(5,2) NOT NULL,
    total_amount DECIMAL(5,2) NOT NULL,
    breakout_location VARCHAR(255) NOT NULL,
    distance_covered DECIMAL(5,2) NOT NULL,
    distance_remain DECIMAL(5,2) NOT NULL, 
    amount_billed DECIMAL(5,2) NOT NULL,
    amount_remained DECIMAL(5,2) NOT NULL,
    remark VARCHAR(255) NOT NULL,
    status ENUM ('PENDING', 'APPROVED', 'REJECTED'),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE reviews
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    booking_id INT(11),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    vehicle_rating INT(2),
    vehicle_description VARCHAR(255),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    driver_rating INT(2),
    driver_description VARCHAR(255),
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    service_provider_rating INT(2),
    service_provider_description VARCHAR(255),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL 
);

CREATE TABLE bookings_logs
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    booking_id INT(11),
    FOREIGN KEY(booking_id) REFERENCES bookings(id),
    booking_status ENUM('CONFIRM', 'PENDING', 'CANCELED', 'COMPLETED', 'ONGOING'),
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL   
);

CREATE TABLE vehicles_transportation
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    vehicle_owner_id INT(11),
    FOREIGN KEY (vehicle_owner_id) REFERENCES service_providers(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    booking_id INT(11),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    trip_type ENUM('PRIVATE','SHARING','GCC'),
    pickup_location VARCHAR(255) NOT NULL,
    pickup_country VARCHAR(30) NOT NULL,
    pickup_date DATETIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATETIME,
    trip_distance DECIMAL(5,2) NOT NULL,
    status ENUM('COMPLETED', 'ONGOING', 'NOT COMPLETED')
);

CREATE TABEL payment_records
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
	invoice_id INT(11),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    total_amount DECIMAL(4,2),
    received_amount DECIMAL(4,2),
    received_data DATETIME,
	remaining_amount DECIMAL(4,2),
    status ENUM('PAID', 'PARTIALLY PAID', 'PENDING')
);

INSERT INTO `currencies` (`id`, `name`, `abbreviation`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'Dhiram', 'AED', 'ACTIVE', NULL, NULL, NULL);

INSERT INTO `languages` (`id`, `name`, `file`, `abbreviation`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'English', 'englisj.json', 'ENG', 'ACTIVE', '2023-07-28 22:18:40', NULL, NULL);

INSERT INTO `taxations` (`id`, `type`, `name`, `value`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'PERCENTAGE', 'VAT', '5', 'ACTIVE', '2023-07-28 22:21:18', NULL, NULL);

INSERT INTO `application_settings` (`id`, `application_title`, `contact_address`, `email`, `phone`, `country_code`, `logo`, `loginpage_logo`, `loginpage_bg_image`, `favicon`, `language_id`, `currency_id`, `tax_id`, `licence_number`, `invoice_prefix`, `quotation_prefix`, `created_at`, `updated_at`, `deleted_at`) VALUES ('', 'Horse city Transportation', '2 Manewada Nagpur', 'so832154@gmail.com', '8421168035', '91', 'aqser.jpg', 'ahsp.jpg', 'asdfg.jpg', 'jhp.jpg', '1', '1', '1', '987654321234', 'IO', 'Qo', '2023-07-28 22:22:23', NULL, NULL);



INSERT INTO `discount_types` (`id`, `name`, `type`, `rate`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'Id', 'PERCENTAGE', '5', 'ACTIVE', '2023-07-28 22:39:09', NULL, NULL);

INSERT INTO `payment_types` (`id`, `name`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'Cash', 'ACTIVE', '2023-07-28 22:44:42', NULL, NULL);
ALTER TABLE `quotations` CHANGE `tax_amount` `tax_amount` DECIMAL(15,2) NOT NULL;
ALTER TABLE `invoices` CHANGE `final_amount` `final_amount` DECIMAL(15,2) NOT NULL;
ALTER TABLE `bookings` CHANGE `final_amount` `final_amount` DECIMAL(15,2) NOT NULL;
ALTER TABLE `bookings` CHANGE `sub_total` `sub_total` DECIMAL(15,2) NOT NULL;
ALTER TABLE `invoices` CHANGE `sub_total` `sub_total` DECIMAL(15,2) NOT NULL;
ALTER TABLE `bookings` CHANGE `tax_amount` `tax_amount` DECIMAL(15,2) NOT NULL, CHANGE `discount_amount` `discount_amount` DECIMAL(15,2) NOT NULL;
ALTER TABLE `payment_records` CHANGE `total_amount` `total_amount` DECIMAL(15,2) NULL DEFAULT NULL;
ALTER TABLE `payment_records` CHANGE `received_amount` `received_amount` DECIMAL(15,2) NULL DEFAULT NULL;
ALTER TABLE `payment_records` CHANGE `remaining_amount` `remaining_amount` DECIMAL(15,2) NULL DEFAULT NULL;
ALTER TABLE `invoices` CHANGE `tax_amount` `tax_amount` DECIMAL(15,2) NOT NULL, CHANGE `discount_amount` `discount_amount` DECIMAL(15,2) NOT NULL;


INSERT INTO `enquiries` (`id`, `customer_id`, `vehicle_id`, `serviceprovider_id`, `pickup_location`, `drop_location`, `trip_type`, `pickup_country`, `drop_country`, `no_of_horse`, `description`, `status`, `created_at`) VALUES ('1', '1', '1', '4', 'Radisson Blu', 'Hithrow Airport', 'PRIVATE', 'India', 'England', '5', 'I want to ship my horse to UK.', 'NOTCONFIRMED', '2023-07-28 22:27:30');

INSERT INTO `quotations` (`id`, `customer_id`, `enquiry_id`, `serviceprovider_id`, `taxation_id`, `vehicle_id`, `driver_id`, `discount_type_id`, `quotation_id`, `trip_type`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `no_of_horse`, `special_requirement`, `additional_service`, `transportation_insurance_coverage`, `driver_amount`, `vehicle_amount`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', '1', '1', '4', '1', '1', '1', '1', 'Q001', 'PRIVATE', 'Devi Ahilya Bai Holkar Airport', 'India', '2023-07-29 22:40:51', 'Hithrow Airport', 'England', '2023-07-31 22:40:51', '5', 'Medicine', 'Washing', 'TRUE', '35', '45', '90', '15', '5', '100', 'CONFIRMED', '2023-07-28 22:40:51', NULL, NULL);


INSERT INTO `bookings` (`id`, `customer_id`, `quot_id`, `quotation_prefix_id`, `service_provider_id`, `vehicle_id`, `driver_id`, `status`, `taxation_id`, `discount_type_id`, `payment_type_id`, `booking_status`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `additional_services`, `confirmation_sent`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', '1', '1', 'Q003', '4', '1', '1', 'PENDING', '1', '1', '1', 'PENDING', 'Ahilya Bai Holkar Airport', 'India', '2023-07-29 22:43:52', 'Hithrow Airport', 'England', '2023-07-31 22:43:52', 'Washing', 'YES', '90', '15', '5', '100', '2023-07-28 22:43:52', NULL, NULL);


INSERT INTO `invoices` (`id`, `invoice_no`, `booking_id`, `pickup_point`, `drop_point`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'I001', '1', 'Deviahilya Bai Holkar', 'Hithrow Airport', '90', '15', '5', '100', 'ACTIVE', '2023-07-28 22:47:25', NULL, NULL);


INSERT INTO `enquiries` (`id`, `customer_id`, `vehicle_id`, `serviceprovider_id`, `pickup_location`, `drop_location`, `trip_type`, `pickup_country`, `drop_country`, `no_of_horse`, `description`, `status`, `created_at`) VALUES ('2', '1', '1', '4', 'Le Meridian', 'Sky Tower', 'SHARING', 'India', 'New Zealand', '5', 'I want to ship my horse to NZ.', 'NOTCONFIRMED', '2023-07-29 01:22:30');

INSERT INTO `quotations` (`id`, `customer_id`, `enquiry_id`, `serviceprovider_id`, `taxation_id`, `vehicle_id`, `driver_id`, `discount_type_id`, `quotation_id`, `trip_type`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `no_of_horse`, `special_requirement`, `additional_service`, `transportation_insurance_coverage`, `driver_amount`, `vehicle_amount`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('2', '1', '1', '4', '1', '1', '1', '1', 'Q002', 'SHARING', 'Le Meridian', 'India', '2023-07-29 01:25:51', 'Sky Tower', 'New Zealand', '2023-07-31 22:40:51', '5', 'Medicine', 'Washing', 'TRUE', '55', '85', '140', '25', '3', '162', 'CONFIRMED', '2023-07-29 01:27:51', NULL, NULL);


INSERT INTO `bookings` (`id`, `customer_id`, `quot_id`, `quotation_prefix_id`, `service_provider_id`, `vehicle_id`, `driver_id`, `status`, `taxation_id`, `discount_type_id`, `payment_type_id`, `booking_status`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `additional_services`, `confirmation_sent`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `created_at`, `updated_at`, `deleted_at`) VALUES ('2', '1', '1', 'Q002', '4', '1', '1', 'PENDING', '1', '1', '1', 'PENDING', 'Le Meridian', 'India', '2023-07-29 22:43:52', 'Sky Tower', 'New Zealand', '2023-07-31 22:43:52', 'Washing', 'YES', '140', '25', '3', '162', '2023-07-29 01:28:12', NULL, NULL);


INSERT INTO `invoices` (`id`, `invoice_no`, `booking_id`, `pickup_point`, `drop_point`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('2', 'I002', '2', 'Le Meridian', 'Sky Tower', '140', '25', '3', '162', 'ACTIVE', '2023-07-29 01:30:25', NULL, NULL);


INSERT INTO `enquiries` (`id`, `customer_id`, `vehicle_id`, `serviceprovider_id`, `pickup_location`, `drop_location`, `trip_type`, `pickup_country`, `drop_country`, `no_of_horse`, `description`, `status`, `created_at`) VALUES (NULL, '1', '1', '4', 'Red Fort', 'Kutumb Minar', 'SHARING', 'India', 'India', '5', 'There are 4 horse for transportation', 'NOTCONFIRMED', '2023-07-29 01:53:34');

INSERT INTO `quotations` (`id`, `customer_id`, `enquiry_id`, `serviceprovider_id`, `taxation_id`, `vehicle_id`, `driver_id`, `discount_type_id`, `quotation_id`, `trip_type`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `no_of_horse`, `special_requirement`, `additional_service`, `transportation_insurance_coverage`, `driver_amount`, `vehicle_amount`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '2', '3', '5', '1', '2', '2', '1', 'Q003', 'SHARING', 'Red Fort', 'India', '2023-07-29 02:00:13', 'Qutumb Minor', 'India', '2023-07-31 02:00:13', '2', 'Dressing', 'Makeup', 'TRUE', '20', '70', '90', '130', '40', '180', 'NOTCONFIRMED', '2023-07-29 02:00:13', NULL, NULL);

INSERT INTO `bookings` (`id`, `customer_id`, `quot_id`, `quotation_prefix_id`, `service_provider_id`, `vehicle_id`, `driver_id`, `status`, `taxation_id`, `discount_type_id`, `payment_type_id`, `booking_status`, `pickup_location`, `pickup_country`, `pickup_date`, `drop_location`, `drop_country`, `drop_date`, `additional_services`, `confirmation_sent`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, '2', '3', 'Q003', '5', '2', '2', 'PENDING', '1', '1', '1', 'CONFIRMED', 'Red Fort', 'India', '2023-07-29 02:06:38', 'Qutumb Minar', 'India', '2023-07-31 02:06:38', 'Dressing', NULL, '90', '130', '40', '180', '2023-07-29 02:06:38', NULL, NULL);

INSERT INTO `invoices` (`id`, `invoice_no`, `booking_id`, `pickup_point`, `drop_point`, `sub_total`, `tax_amount`, `discount_amount`, `final_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'I003', '3', 'Red fort', 'Qutumb Minar', '90', '130', '40', '180', 'ACTIVE', '2023-07-29 02:13:13', NULL, NULL);

INSERT INTO `payment_records` (`id`, `invoice_id`, `total_amount`, `received_amount`, `received_date`, `remaining_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, '3', '180', NULL, NULL, NULL, NULL, '2023-07-28 23:11:11', NULL, NULL);
INSERT INTO `payment_records` (`id`, `invoice_id`, `total_amount`, `received_amount`, `received_date`, `remaining_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', '1', '233', NULL, NULL, NULL, NULL, '2023-07-28 23:19:28', NULL, NULL);
INSERT INTO `payment_records` (`id`, `invoice_id`, `total_amount`, `received_amount`, `received_date`, `remaining_amount`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('10', '2', '162', NULL, NULL, NULL, NULL, '2023-07-29 01:31:28', NULL, NULL);

INSERT INTO `templates` (`id`, `name`, `subject`, `purpose`, `template`, `type`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES (NULL, 'Invoice email sent', 'Payment Invoice', 'The purpose of this is send email to the customer', 'The below you can find the invoice of your booking.', 'EMAIL', 'ACTIVE', '2023-07-29 20:40:40', NULL, NULL);

*/