/**
 * 
 * INSERT INTO currencies (name, abbreviation, created_at)
VALUES
    ('US Dollar', 'USD', NOW())
INSERT INTO languages (name, file, abbreviation, created_at)
VALUES
    ('English', 'en_us.json', 'EN', NOW())

INSERT INTO taxations (type, name, value, created_at)
VALUES
    ('FLAT', 'Fixed Tax', 10.00, NOW()),
    ('PERCENTAGE', 'Sales Tax', 7.5, NOW())

INSERT INTO discount_types (name, type, rate, created_at)
VALUES ('EID OFFER', 'PERCENTAGE', 15.00, NOW());

INSERT INTO application_settings (
    id,
    application_title,
    contact_address,
    email,
    phone,
    country_code,
    logo,
    loginpage_logo,
    loginpage_bg_image,
    favicon,
    language_id,
    currency_id,
    tax_id,
    licence_number,
    invoice_prefix,
    quotation_prefix,
    deleted_at
) VALUES (
    1,
    'Your Application Title',
    '123 Main Street, City, Country',
    'contact@example.com',
    '1234567890',
    '+1',
    'logo.png',
    'login_logo.png',
    'bg_image.jpg',
    'favicon.ico',
    1,  
    1,  
    1, 
    '12345-ABC',
    'INV',
    'QUO',
    NULL    -- Deleted_at is initially NULL
);

INSERT INTO roles (name, created_at)
VALUES
    ('SERVICE PROVIDER', NOW()),
    ('ADMIN', NOW()),
    ('SUPER ADMIN', NOW());

INSERT INTO modules (name, created_at)
VALUES
    ('MENU', NOW()),
    ('DASHBOARD', NOW()),
    ('SERVICE PROVIDER', NOW()),
    ('CUSTOMERS', NOW()),
    ('VEHICLES', NOW()),
    ('DRIVERS', NOW()),
    ('ENQUIRIES', NOW()),
    ('QUOTATIONS', NOW()),
    ('TRIP DETAILS', NOW()),
    ('INVOICES', NOW()),
    ('ACCOUNTS', NOW()),
    ('REPORTS', NOW()),
    ('APPLICATION SETTINGS', NOW());


INSERT INTO `permissions` (`role_id`, `module_id`, `create`, `update`, `read`, `delete`) VALUES
(1, 1, 'false', 'false', 'true', 'false'),
(1, 2, 'false', 'false', 'false', 'false'),
(1, 3, 'true', 'true', 'true', 'true'),
(1, 4, 'true', 'true', 'true', 'true'),
(1, 5, 'true', 'true', 'true', 'true'),
(1, 6, 'true', 'true', 'true', 'true'),
(1, 7, 'false', 'true', 'true', 'false'),
(1, 8, 'false', 'true', 'true', 'false'),
(1, 9, 'false', 'true', 'true', 'false'),
(1, 10, 'false', 'true', 'true', 'false'),
(1, 11, 'false', 'false', 'true', 'false'),
(1, 12, 'false', 'false', 'false', 'false'),
(1, 13, 'false', 'false', 'false', 'false'),
(2, 1, 'false', 'false', 'false', 'false'),
(2, 2, 'false', 'false', 'false', 'false'),
(2, 3, 'false', 'true', 'true', 'false'),
(2, 5, 'true', 'true', 'true', 'true'),
(2, 6, 'true', 'false', 'true', 'false'),
(2, 7, 'false', 'true', 'true', 'false'),
(2, 8, 'false', 'false', 'false', 'false'),
(2, 9, 'false', 'true', 'true', 'false'),
(2, 10, 'false', 'true', 'true', 'false'),
(2, 11, 'false', 'false', 'true', 'false'),
(2, 12, 'false', 'false', 'false', 'false'),
(2, 13, 'false', 'false', 'false', 'false'),
(3, 1, 'false', 'false', 'true', 'false'),
(3, 2, 'false', 'false', 'false', 'false'),
(3, 3, 'true', 'true', 'true', 'true'),
(3, 4, 'true', 'true', 'true', 'true'),
(3, 5, 'true', 'true', 'true', 'true'),
(3, 6, 'true', 'true', 'true', 'true'),
(3, 7, 'false', 'true', 'true', 'false'),
(3, 8, 'false', 'true', 'true', 'false'),
(3, 9, 'false', 'true', 'true', 'false'),
(3, 10, 'false', 'true', 'true', 'false'),
(3, 11, 'false', 'false', 'true', 'false'),
(3, 12, 'false', 'false', 'false', 'false'),
(3, 13, 'false', 'false', 'false', 'false');
 * 
 * 
 */