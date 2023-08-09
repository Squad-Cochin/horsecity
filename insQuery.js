INSERT INTO currencies (name, abbreviation, created_at)
VALUES ('Dirham', 'AED', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')

INSERT INTO languages (name, file, abbreviation, created_at)
VALUES ('English', 'en_us.json', 'EN', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')

INSERT INTO taxations (type, name, value, created_at)
VALUES ('FLAT', 'Fixed Tax', 10.00, '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'), ('PERCENTAGE', 'Sales Tax', 7.5, '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}')

INSERT INTO discount_types (name, type, rate, created_at)
VALUES ('EID OFFER', 'PERCENTAGE', 15.00, '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}');

INSERT INTO application_settings (id,application_title, contact_address, email, phone, country_code, logo, loginpage_logo, loginpage_bg_image, favicon, language_id, currency_id, tax_id, licence_number, invoice_prefix, quotation_prefix, created_at
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
    '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'
);

INSERT INTO roles (name, created_at)
VALUES
    ('SERVICE PROVIDER', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('ADMIN', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('SUPER ADMIN', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}');

INSERT INTO modules (name, created_at) VALUES
    ('MENU', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('DASHBOARD', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('SERVICE PROVIDER', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('CUSTOMERS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('VEHICLES', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('DRIVERS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('ENQUIRIES', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('QUOTATIONS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('TRIP DETAILS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('INVOICES', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('ACCOUNTS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('REPORTS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}'),
    ('APPLICATION SETTINGS', '${timeCalculate.getFormattedUTCTime(constants.timeOffSet.UAE)}');


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

// We need to enter the service provider first one
// Password Policies are also nee to be updated from the backend
