						        HORSCITY DATABASE
						================================


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
    value DECIMAL(15,2) NOT NULL, 
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
    rate DECIMAL(15,2) NOT NULL,
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
    FOREIGN KEY (module_id) REFERENCES modules(id),
  	`create` ENUM('true', 'false') DEFAULT 'false',
    `update` ENUM('true', 'false') DEFAULT 'false',
    `read` ENUM('true', 'false') DEFAULT 'false',
    `delete` ENUM('true', 'false') DEFAULT 'false'  
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
    role_Id INT(11),
    FOREIGN KEY (role_Id) REFERENCES roles(id),
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
CREATE TABLE assign_drivers
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    driver_id INT(11),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    created_at DATETIME,
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

CREATE TABLE vehicles
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    vehicle_number VARCHAR(150) UNIQUE NOT NULL,
    make VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    color VARCHAR(75) NOT NULL,
    length DECIMAL(15,2) NOT NULL,
    breadth DECIMAL(15,2) NOT NULL,
    height DECIMAL(15,2) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
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
    vehicle_type ENUM('PRIVATE', 'SHARING'),
    vehicle_registration_date DATE,
    vehicle_exipration_date DATE,
    status ENUM ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
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
    pickup_date DATE,
    pickup_time TIME,
    drop_location VARCHAR(255) NOT NULL,
    drop_country VARCHAR(30) NOT NULL,
    drop_date DATE,
    drop_time TIME, 
    no_of_horse INT(3) NOT NULL,
    special_requirement VARCHAR(255),
    additional_service VARCHAR(255),
    transportation_insurance_coverage ENUM('TRUE', 'FALSE'),
    driver_amount DECIMAL(15, 2),
    vehicle_amount DECIMAL(15, 2),
    sub_total DECIMAL(15,2) NOT NULL,
    tax_amount DECIMAL(15,2) NOT NULL,
    discount_amount DECIMAL(15,2) NOT NULL, 
    final_amount DECIMAL(15,2) NOT NULL,
    status ENUM ('CONFIRMED', 'NOTCONFIRMED') DEFAULT 'NOTCONFIRMED',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE invoices
(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    invoice_no VARCHAR(6) NOT NULL UNIQUE,
    quot_id INT(11),
    FOREIGN KEY (quot_id) REFERENCES quotations(id),
    quotation_prefix_id VARCHAR(15) NOT NULL,
    service_provider_id INT(11),
    FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
    vehicle_id INT(11),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11),
    FOREIGN KEY(driver_id) REFERENCES drivers(id),
    pickup_point VARCHAR(255),
    drop_point VARCHAR(255),
    sub_total DECIMAL(15,2) NOT NULL,
    tax_amount DECIMAL(15,2) NOT NULL,
    discount_amount DECIMAL(15,2) NOT NULL, 
    final_amount DECIMAL(15,2) NOT NULL,
    status ENUM ('ACTIVE', 'INACTIVE', 'STARTED') DEFAULT 'ACTIVE',
    created_at DATETIME ,
    updated_at DATETIME DEFAULT NULL ,
    deleted_at DATETIME DEFAULT NULL   
);


CREATE TABLE bookings (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  customer_id INT(11) DEFAULT NULL,
  FOREIGN KEY(customer_id) REFERENCES customers(id),
  inv_id INT(11) DEFAULT NULL,
  FOREIGN KEY(inv_id) REFERENCES invoices(id),
  invoice_prefix_id VARCHAR(15) NOT NULL,
  service_provider_id INT(11) DEFAULT NULL,
  FOREIGN KEY(service_provider_id) REFERENCES service_providers(id),
  vehicle_id INT(11) DEFAULT NULL,
  FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
  driver_id INT(11) DEFAULT NULL,
  FOREIGN KEY(driver_id) REFERENCES drivers(id),
  status ENUM('PAID', 'PENDING', 'REFUND') DEFAULT NULL,
  taxation_id INT(11) DEFAULT NULL,
  FOREIGN KEY(taxation_id) REFERENCES taxations(id),
  discount_type_id INT(11) DEFAULT NULL,
  FOREIGN KEY(discount_type_id) REFERENCES discount_types(id),
  booking_status ENUM('CONFIRM', 'COMPLETED', 'BREAKOUT') DEFAULT NULL,
  pickup_location VARCHAR(255) NOT NULL,
  pickup_country VARCHAR(30) NOT NULL,
  pickup_date DATE DEFAULT NULL,
  pickup_time TIME DEFAULT NULL,
  drop_location VARCHAR(255) NOT NULL,
  drop_country VARCHAR(30) NOT NULL,
  drop_date DATE DEFAULT NULL,
  drop_time TIME DEFAULT NULL, 
  confirmation_sent ENUM('YES', 'NO') DEFAULT NULL,
  sub_total DECIMAL(15,2) NOT NULL,
  tax_amount DECIMAL(15,2) NOT NULL,
  discount_amount DECIMAL(15,2) NOT NULL,
  final_amount DECIMAL(15,2) NOT NULL,
  created_at DATETIME DEFAULT NULL,
  updated_at DATETIME DEFAULT NULL,
  deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE vehicles_breakouts
(
    id INT(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    booking_id INT(11) DEFAULT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    invoice_id INT(11) DEFAULT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    service_provider_id INT(11) DEFAULT NULL,
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    vehicle_id INT(11) DEFAULT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    driver_id INT(11) DEFAULT NULL,
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NULL,
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE reviews
(
    id INT(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    booking_id INT(11) DEFAULT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    vehicle_id INT(11) DEFAULT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    vehicle_rating INT(2) DEFAULT NULL,
    vehicle_description VARCHAR(255) DEFAULT NULL,
    driver_id INT(11) DEFAULT NULL,
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    driver_rating INT(2) DEFAULT NULL,
    driver_description VARCHAR(255) DEFAULT NULL,
    service_provider_id INT(11) DEFAULT NULL,
    FOREIGN KEY (service_provider_id) REFERENCES service_providers(id),
    service_provider_rating INT(2) DEFAULT NULL,
    service_provider_description VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT NULL,
    updated_at DATETIME DEFAULT NULL
);

CREATE TABLE payment_records (
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    invoice_id INT(11),
    invoice_prefix_id VARCHAR(15) NOT NULL,
    total_amount DECIMAL(15,2),
    received_amount DECIMAL(15,2),
    received_date DATETIME,
    remaining_amount DECIMAL(15,2),
    status ENUM('PAID', 'PARTIALLY PAID', 'PENDING'),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    created_at DATETIME DEFAULT NULL,
    updated_at DATETIME DEFAULT NULL
);

CREATE TABLE wishlist
(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    customer_id INT(11),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    vehicle_id INT(11),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    created_at DATETIME,
    deleted_at DATETIME DEFAULT NULL
);

ALTER TABLE enquiries ADD pickup_date DATE NOT NULL;
ALTER TABLE `payment_records` CHANGE `status` `status` ENUM('PAID','PARTIALLY PAID','PENDING','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE `payment_records` ADD `deleted_at` DATETIME NULL AFTER `updated_at`;
ALTER TABLE `bookings` CHANGE `status` `status` ENUM('PAID','PENDING','REFUND', 'CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE `bookings` CHANGE `booking_status` `booking_status` ENUM('CONFIRM','COMPLETED','BREAKOUT','CANCELLED') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE `drivers` CHANGE `date_of_birth` `date_of_birth` DATE NOT NULL;
ALTER TABLE `customers` CHANGE `date_of_birth` `date_of_birth` DATE NOT NULL;