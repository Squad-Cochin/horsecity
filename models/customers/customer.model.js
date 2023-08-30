/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is customer model file. Where all the logic of the customer program is written.  //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const con = require('../../configs/db.configs');


module.exports = class customers
{
    constructor(){}

    /**
     * The below function is for the Admin side page
     * 
     * The function for fetching all the customer details present in the database.
     */

    static async getall(pageNumber, pageSize, Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log('Check Role Data At The Get All Customer : ', checkRole);
                con.query(checkRole, async (err, result) =>
                {
                    // console.log(`Roles at the time of the get all of the Customers: `, result);
                    if(err)
                    {
                       console.log('Error while checking the role at the time of Customer');
                       resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                    {
                        // console.log(`Role name is admin at the time of the Customer`);
                        const offset = (pageNumber - 1) * pageSize;
                        let selQuery = `SELECT cd.id, cd.name, cd.email, cd.contact_no, DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, cd.status FROM ${constants.tableName.customers} cd WHERE cd.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;                        
                        // console.log('Selquery of customer when user is admin or suport admin: ',selQuery);
                        const count = await commonoperation.totalCount(constants.tableName.customers);
                        // console.log('Total Data', count[0]['count(t.id)']);
                        con.query(selQuery, async (err, result2) =>
                        {
                            if(err)
                            {
                                console.error(err);
                                resolve('err');
                            }
                            else
                            {
                                let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                FROM ${constants.tableName.permissions} AS pm
                                JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.customers}'
                               `;
                                // console.log(Query);
                                con.query(Query, (err, moduleResult) =>
                                {
                                    if(err)
                                    {
                                        console.log('Error while fetching the module name at the time of getall customer');
                                        resolve('err') 
                                    }
                                    else
                                    {                                     
                                        if(result.length === 0)
                                        {
                                            resolve ({totalCount : count[0]['count(t.id)'], customer : result2, module : moduleResult});
                                        }
                                        else
                                        {
                                            resolve ({totalCount : count[0]['count(t.id)'], customer : result2, module : moduleResult});
                                        }
                                    }
                                });
                            }                           
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        let Query = `SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                FROM ${constants.tableName.permissions} AS pm
                                JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.customers}'`;
                                // console.log(Query);
                                con.query(Query, (err, moduleResult) =>
                                {
                                    if(err)
                                    {
                                        console.log('Error while fetching the module name at the time of getall customer');
                                        resolve('err') 
                                    }
                                    else
                                    {                                     
                                        if(result.length === 0)
                                        {
                                            resolve ({totalCount : 0, customer : [], module : moduleResult});
                                        }
                                        else
                                        {
                                            resolve ({totalCount : 0, customer : [], module : moduleResult});
                                        }
                                    }
                                });
                    }
                    else
                    {
                        console.log('I think the role name which we got is not present in the database at the time of customer');
                        resolve('err') 
                    }                    
                });
            });              
        }
        catch(error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getall". Which is designed to fetch all the data of customers.');                    
        }
    };

    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.customers, Id, 'id');
            // console.log('Data : ', data);
            if(data.length === 0)
            {                
                console.log('No data present on this Id');
                return ('nodata');
            }
            else if(data === 'err')
            {
                console.log(`Error while fethcing the vehicle data on the basis if Id. Model folder`);
                return ('err');
            }
            else
            {
                let dob = data[0].date_of_birth;
                // console.log('Dob: ', dob);
                data[0].date_of_birth = time.formatDateToDDMMYYYY(dob); 
                let idProofImage = data[0].id_proof_image;
                data[0].id_proof_image = `${process.env.PORT_SP}${constants.attachmentLocation.customer.view.idProof}${idProofImage}`;
                // console.log("Link: ", data[0].id_proof_image);
                return data;
            }     
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.', error);            
        }
    };

    static async addcustomer(Id, name, email, user_name, password, contact_no, date_of_birth, id_proof_no, files)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadAttachment = await commonoperation.fileUploadTwo(files, constants.attachmentLocation.customer.upload.idProof);
                // console.log(uploadAttachment);
                if(uploadAttachment === 'INVALIDFORMAT')
                {
                    resolve('INVALIDFORMAT');
                }
                else if(uploadAttachment === 'ERR')
                {
                    resolve('err');
                }
                else if(uploadAttachment === 'NOATTACHEMENT')
                {
                    resolve('NOATTACHEMENT');
                }
                else
                {
                    let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                    // console.log(checkRole);
                    con.query(checkRole, async (err, resultRole) =>
                    {
                        // console.log(resultRole);
                        if(err)
                        {
                            console.log('Error while fetching the role name at the time of add customer');
                            resolve('err') 
                        }
                        else
                        {
                            if(resultRole[0].role_id === constants.Roles.admin)
                            {
                                // console.log(`Add customer with the admin side`);
                                let insQuery = `INSERT INTO customers(name, email, user_name, password, contact_no, date_of_birth, id_proof_no, id_proof_image, phone_verified, email_verified, expiry_at, created_at) VALUES('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_no}', '${date_of_birth}', '${id_proof_no}', '${uploadAttachment}', 'TRUE', 'TRUE', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                // console.log('Customer insert query: ', insQuery);
                                con.query(insQuery, (err, result) =>
                                {
                                    // console.log(result);
                                    if(result.affectedRows > 0)
                                    {
                                        console.log('Customer data added successfully');
                                        resolve(result);
                                    }
                                    else
                                    {
                                        resolve('err')
                                    }
                                });
                            }
                            else if(resultRole[0].role_id === constants.Roles.service_provider)
                            {
                                console.log(`Add customer with the service provider side`);
                                resolve([]);
                            }
                            else
                            {
                                console.log('I think the role name which we got is not present in the database at the time of add customers');
                                resolve('err');
                            }
                        }
                    });
                }                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "addcustomer". Which is designed to add particular data of the customers.');            
        }
    };

    static async editcustomer(id, name, email, userName, contact_no, date_of_birth, id_proof_no, id_proof_image)
    // static async editcustomer(id,requestBody, file)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                if(id_proof_image === null || id_proof_image === undefined)
                {
                    let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${id}'`;
                    // console.log(upQuery);
                    con.query(upQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            console.log('Customer data updated successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            resolve('err')
                        }
                    });
                }
                else
                {
                let uploadAttachment = await commonoperation.fileUploadTwo(id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                // if(uploadAttachment === 'INVALIDFORMAT')
                // {
                //     resolve('INVALIDFORMAT');
                // }
                // else if(uploadAttachment === 'ERR')
                // {
                //     resolve('err');
                // }
                // else if(uploadAttachment === 'NOATTACHEMENT')
                // {
                //     resolve('NOATTACHEMENT');
                // }
                // else
                // {
                    let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.id_proof_image = '${uploadAttachment}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${id}'`;
                    // console.log(upQuery);
                    con.query(upQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            console.log('Customer data updated successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            resolve('err')
                        }
                    });
                }                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "editcustomer". Which is designed to edit particular data of the customer.');            
        }
    };

    static async updatestatus(Id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.customers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.');            
        }
    };

    static async removecustomer(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.customers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.');            
        }
    };

    static async customerlogin(username, password)
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                let selQuery = `SELECT c.id, c.name, c.email, c.password, c.user_name, c.contact_no, c.id_proof_no, c.id_proof_image, c.status  FROM ${constants.tableName.customers} c WHERE c.user_name = '${username}' `;
                // console.log(selQuery);
                con.query(selQuery, async(err, customerData) =>
                {
                    if(customerData.length === 0)
                    {
                        console.log(`No customer registered with this username`);
                        resolve('nocustomer');
                    }
                    else
                    {
                        const passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
                        // console.log(passwordHashed);
                        // console.log(customerData[0].password);
                        if(customerData[0].password === passwordHashed)
                        {
                            // console.log(`Password Correct`);
                            let insQuery = `INSERT INTO ${constants.tableName.customer_logs}(customer_id, ip_address, device_information, location, login_time) VALUES(${customerData[0].id}, '192.168.200.130', 'Test purpose currently', 'Kerela', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                            // console.log(`Insert Log Query of the customers: `, insQuery);
                            con.query(insQuery, (err, result1) =>
                            {
                                // console.log('Result of inserting in the customer logs', result1);
                                const data = {
                                    id : customerData[0].id
                                }
                                if(result1.affectedRows > 0)
                                {
                                    // console.log(`Customer log also entered at the login time`);
                                    resolve(data);
                                }
                                else
                                {
                                    console.log(`Customer login is done successfully bbut error while inserting into the logs table`, err);
                                    resolve(`err`);
                                }
                            });
                            // if(customerData[0].status === constants.status.inactive)
                            // {
                            //     resolve('customerinactive')
                            // }
                            // else
                            // {
                            // }
                        }
                        else
                        {
                            resolve('passwordnotmatched')
                        }
                    }
                });
            }
            catch(error)
            {
                console.log('Error while customer login from the model', error);
                resolve(`err`);
                // throw error; // re-throw the error to be handled by the calling code
            }
        });  
    };

    static async customerlogout(Id) 
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                const customerData = await commonfetching.dataOnCondition(constants.tableName.customers, Id, 'id');
                if (customerData.length === 0) 
                {
                    resolve('nocustomer');
                }
                else
                {
                    // console.log('Customer logout done');
                    let selQuery = `SELECT * FROM ${constants.tableName.customer_logs} c WHERE c.customer_id = ${customerData[0].id} AND c.login_time IS NOT NULL AND c.logout_time IS NULL`;
                    // console.log(`Getting login time for entering into the customer logs table query: `, selQuery);
                    con.query(selQuery, (err, result3) =>
                    {
                        // console.log(`Result 3: `, result3);
                        if(err)
                        {
                            console.log(`Customer login is done successfully but error while fetching the login time from the logs table`, err);
                            resolve(`err`);
                        }
                        else
                        {
                            if(result3.length != 0)
                            {
                                let upQuery = `UPDATE ${constants.tableName.customer_logs} c SET c.logout_time = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', c.duration = TIMEDIFF('${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.changeDateToSQLFormat(result3[0].login_time)}') WHERE c.customer_id = ${customerData[0].id} AND c.login_time IS NOT NULL AND c.logout_time IS NULL`;
                                // console.log(`Update Query of the customers log when we are updatting the logout time in the table: `, upQuery);
                                con.query(upQuery, (err, result1) =>
                                {
                                    // console.log('Result of inserting in the customer logs', result1);
                                    if(result1.affectedRows > 0)
                                    {
                                        // console.log(`Customer log also entered at the login time`);
                                        resolve(`logoutdone`)
                                    }
                                    else
                                    {
                                        console.log(`Customer logout is done successfully but error while updating into the logs table`, err);
                                        resolve(`err`);
                                    }
                                });
                            }
                            else if (result3.length == 0)
                            {
                                // console.log(`The customer is not signin. We cannot logout before login`);
                                resolve(`notLogin`)
                            }
                            else
                            {
                                console.log(`Error came while updating the data in the customer logs. Please check result 3`);
                                resolve(`err`);
                            }
                        }
                    });
                }   
            }
            catch (error)
            {
                console.log('Error while customer logout from the model', error);
                resolve(`err`);                
            }
        });           
    };

    static async customerchangepassword(id, password, newpassword) 
    {
        try
        {
            return new Promise(async(resolve, reject) =>
            {
                const customerData = await commonfetching.dataOnCondition(constants.tableName.customers, id, 'id');
                if (customerData.length === 0) 
                {
                    resolve('nocustomer');
                }
                else
                {
                    var passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
                    if (customerData[0].password !== passwordHashed)
                    {
                        resolve('incorrectpassword');
                    }
                    else
                    {
                        const newpasswordHashed = await commonoperation.changePasswordToSQLHashing(newpassword);
                        let updatePasswordQuery = `UPDATE ${constants.tableName.customers} SET password = '${newpasswordHashed}', updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE id = ${id} `;
                        // console.log(`Update Password Query: `, updatePasswordQuery);
                        con.query(updatePasswordQuery, (err, result) =>
                        {
                            if(result.affectedRows > 0)
                            {
                                // console.log('Password Updated');
                                resolve(customerData);
                            }
                            else
                            {
                                console.log(`Error while updating the password`);
                                resolve('err');   
                            }
                        });                                
                    }   
                }
            });         
        }
        catch (error)
        {
          console.log('Error while customer change password from the backend', error);
          throw error; // re-throw the error to be handled by the calling code
        }
    };

    static async customersignup(name, email, user_name, password, contact_no, date_of_birth)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                // let uploadAttachment = await commonoperation.fileUploadTwo(files, constants.attachmentLocation.customer.upload.idProof);
                // console.log(uploadAttachment);
                // if(uploadAttachment === 'INVALIDFORMAT')
                // {
                //     console.log(`Invalid format of the image while uploading at the time of customer registeration`);
                //     resolve('INVALIDFORMAT');
                // }
                // else if(uploadAttachment === 'ERR')
                // {
                //     console.log(`Error while uploading the image at the time of customer registeration`);
                //     resolve('err');
                // }
                // else if(uploadAttachment === 'NOATTACHEMENT')
                // {
                //     console.log(`No attachement at the time of the customer registration`);
                //     resolve('NOATTACHEMENT');
                // }
                // else
                // {
                    let insQuery = `INSERT INTO customers(name, email, user_name, password, contact_no, date_of_birth, phone_verified, email_verified, expiry_at, created_at) VALUES('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_no}', '${date_of_birth}', 'TRUE', 'TRUE', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                    // console.log('Customer register query: ', insQuery);
                    con.query(insQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            // console.log('Customer registered successfully');
                            resolve('registered');
                        }
                        else
                        {
                            console.log(`Error from the insert query of the customer registration models`);
                            resolve('err');
                        }
                    });
                // }
            });
        }
        catch (error)
        {
            console.log('Error while register customer from the backend', error);
            // resolve('err'); // re-throw the error to be handled by the calling code
        } 
    };

    static async getparticularcustomerlogs(Id)
    {
        try
        {
            return await new Promise (async(resolve, reject)=>
            {
                let selQuery = `SELECT 
                                c.id,
                                c.customer_id,
                                c.ip_address,
                                c.device_information,
                                c.location,
                                DATE_FORMAT(c.login_time, '%d-%m-%Y %h:%m:%s') AS login_time,
                                DATE_FORMAT(c.logout_time, '%d-%m-%Y %h:%m:%s') AS logout_time,
                                c.duration
                                FROM customer_logs c
                                WHERE c.customer_id = ${Id}
                                `;
                // console.log(selQuery);
                con.query(selQuery, (err, result)=>
                {
                    if(err)
                    {
                        console.log(`Error while fetching the details from the logs table for a particular customer`);
                        resolve(err);
                    }
                    else
                    {
                        if(result.length !== 0)
                        {
                            console.log(`Data fetched for a particular customers`);
                            resolve(result);
                        }
                        else
                        {
                            console.log(`Data fetched for a particular customer. But no data present`);
                            resolve([]);
                        }
                    }
                });
            });
        }
        catch (error)
        {
           console.log(`Error from the try catch block of the getparticularcustomerlogs model from the customer.model.js`); 
        }        
    };

    static async getparticularcustomerdashboard(Id)
    {
        try
        {
            return await new Promise (async (resolve, reject)=>
            {
                let countQuery = `SELECT
                COALESCE((SELECT COUNT(b.id) FROM ${constants.tableName.bookings} b WHERE b.customer_id = ${Id}), 0) AS total_booking,
                COALESCE((SELECT COUNT(b.id) FROM ${constants.tableName.bookings} b WHERE b.customer_id = ${Id} AND b.booking_status = 'COMPLETED'), 0) AS total_completed_booking,
                COALESCE((SELECT COUNT(b.id) FROM ${constants.tableName.bookings} b WHERE b.customer_id = ${Id} AND b.booking_status = 'CONFIRM'), 0) AS total_confirm_booking,
                COALESCE((SELECT SUM(b.final_amount) FROM ${constants.tableName.bookings} b WHERE b.customer_id = ${Id} AND b.status = 'PAID'), 0) AS total_paid_amount,
                COALESCE((SELECT SUM(b.final_amount) FROM ${constants.tableName.bookings} b WHERE b.customer_id = ${Id} AND b.status = 'PENDING'), 0) AS total_pending_amount,
                COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${Id} ), 0) AS total_enquiry,
                COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${Id} AND e.status = 'CONFIRMED'), 0) AS total_enquiry_confirmed,
                COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${Id} AND e.status = 'NOTCONFIRMED'), 0) AS total_enquiry_not_confirmed,
                COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q WHERE q.customer_id = ${Id} ), 0) AS total_quotation,
                COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q WHERE q.customer_id = ${Id} AND q.status = 'CONFIRMED'), 0) AS total_quotation_confirmed,
                COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q WHERE q.customer_id = ${Id} AND q.status = 'NOTCONFIRMED'), 0) AS total_quotation_not_confirmed,
                COALESCE((SELECT COUNT(i.id) FROM ${constants.tableName.quotations} q LEFT JOIN invoices i ON q.id = i.quot_id AND i.status = 'ACTIVE' WHERE q.customer_id = ${Id}), 0) AS total_invoices_not_started,
                COALESCE((SELECT COUNT(i.id) FROM ${constants.tableName.quotations} q LEFT JOIN invoices i ON q.id = i.quot_id AND i.status = 'STARTED' WHERE q.customer_id = ${Id}), 0) AS total_invoice_started,
                COALESCE((SELECT COUNT(i.id) FROM ${constants.tableName.quotations} q LEFT JOIN invoices i ON q.id = i.quot_id AND i.status = 'INACTIVE' WHERE q.customer_id = ${Id}), 0) AS total_invoice_cancelled,
                COALESCE((SELECT COUNT(i.id) FROM ${constants.tableName.quotations} q LEFT JOIN invoices i ON q.id = i.quot_id WHERE q.customer_id = ${Id} AND i.status <> 'INACTIVE'), 0) AS total_invoices`;
                // console.log(`Query of the count:`, countQuery);
                con.query(countQuery, (err, result1) =>
                {
                    if(err)
                    {
                        console.log(`Error while executing the count query from the customer dashboard model function`);
                        console.log(err);
                        resolve('err')
                    }
                    else
                    {
                        // console.log('Result one:', result1);
                        // let recentBookingQuery = `  SELECT 
                        //                             b.id AS booking_id,
                        //                             p.id AS payment_id,
                        //                             s.name,
                        //                             b.pickup_location,
                        //                             b.drop_location,
                        //                             b.final_amount,
                        //                             p.remaining_amount,
                        //                             b.booking_status 
                        //                             FROM
                        //                             ${constants.tableName.service_providers} s
                        //                             INNER JOIN ${constants.tableName.bookings} b ON b.service_provider_id = s.id
                        //                             LEFT JOIN ${constants.tableName.payment_records} p ON p.invoice_prefix_id = b.invoice_prefix_id
                        //                             WHERE b.customer_id = ${Id}
                        //                             AND p.id = ( SELECT MAX(pr.id) FROM ${constants.tableName.payment_records} pr WHERE pr.invoice_prefix_id = b.invoice_prefix_id )
                        //                             ORDER BY p.id DESC LIMIT 5`;
                        let receivedBookingQuery = `SELECT
                                    e.id,
                                    s.name AS service_provider_name,
                                    e.vehicle_id,
                                    v.vehicle_number,
                                    v.make,
                                    v.model,
                                    e.pickup_location,
                                    e.drop_location,
                                    e.trip_type,
                                    e.no_of_horse,
                                    e.pickup_date,
                                    e.status,
                                    e.created_at
                                    FROM enquiries e
                                    INNER JOIN vehicles v ON v.id = e.vehicle_id
                                    INNER JOIN service_providers s ON s.id = e.serviceprovider_id
                                    WHERE e.customer_id = ${Id}
                                    ORDER BY e.created_at DESC
                                    LIMIT 5`
                        // console.log(`Query for the recent booking: `, recentBookingQuery);                            
                        con.query(receivedBookingQuery, async (err, result2) =>
                        {
                            if(err)
                            {
                                console.log(`Error while executing the fetching 5 recent query from the customer dashboard model function`);
                                console.log(err);
                                resolve('err')
                            }
                            else
                            {
                                // // console.log(`Result 1: `, result1);
                                // // console.log(`Result 2: `, result2);
                                let remainingamount = await remainingAmount(Id);
                                let PaidAmount = await paidAmount(Id);
                                // // console.log('Remaining Amount: ', remainingamount);
                                // // console.log('Paid Amount: ', PaidAmount);
                                // if(remainingamount == 'false' && PaidAmount == 'false')
                                // {
                                //     // console.log(`If block`);
                                //     let result = customizeCustomerDashboardData(result1, result2, 0, 0)
                                //     resolve(result);
                                //     // remainingAmount(Id);
                                // }
                                // else
                                // {
                                //     // console.log(`Else block`);
                                //     // console.log(result1);
                                //     // console.log(result2);
                                //     // console.log(remainingamount);
                                //     // console.log(PaidAmount);
                                    if(!remainingamount && !PaidAmount)
                                    {
                                        console.log(`Else block if`);
                                        let result = customizeCustomerDashboardData(result1, result2, 0, 0)
                                        resolve(result);
                                    }
                                    else
                                    {
                                        // console.log(`Else block else`);
                                        let result = customizeCustomerDashboardData(result1, result2, remainingamount, PaidAmount)
                                        resolve(result);
                                        // remainingAmount(Id);
                                    }
                                // }
                            }
                        });
                    }
                });                
            });        
        }
        catch (error)
        {
            console.log(`Error while fetching the dashboard data of the customer from the backend. Please check the getparticularcustomerdasboard model in the customer.model.js`);                        
        }
    }

    static async getparticularbookindetailscompleted(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let query = ` SELECT
                    b.id,
                    s.name,
                    b.pickup_location,
                    b.drop_location,
                    b.booking_status,
                    b.final_amount,
                    CASE
                        WHEN pr_check.status = 'PAID' THEN 0
                        ELSE latest_payment.remaining_amount
                    END AS remaining_amount
                    FROM ${constants.tableName.service_providers} s
                    INNER JOIN ${constants.tableName.bookings} b ON b.service_provider_id = s.id
                    LEFT JOIN (
                        SELECT
                            pr.invoice_id,
                            pr.remaining_amount
                        FROM ${constants.tableName.payment_records} pr
                    WHERE pr.id IN (
                        SELECT MAX(pr_inner.id)
                        FROM ${constants.tableName.payment_records} pr_inner
                        WHERE pr_inner.status <> 'PAID'
                        GROUP BY pr_inner.invoice_id
                        )
                    )
                    AS latest_payment ON latest_payment.invoice_id = b.inv_id
                    LEFT JOIN ${constants.tableName.payment_records} pr_check ON pr_check.invoice_id = b.inv_id AND pr_check.status = 'PAID'
                    WHERE b.customer_id = ${Id}
                    AND b.booking_status = 'COMPLETED' `;                    
                let result = await queryAsync(query)
                if(result == 'err')
                {
                    resolve('err');
                }
                else
                {
                    resolve(result);
                }
            });
        }
        catch (error)
        {
         console.log(`Error from the try catch block of the getparticularbookindetailscompleted model file function`);
        }
    };

    static async getparticularbookindetailsconfirm(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let query = ` SELECT
                    b.id,
                    s.name,
                    b.pickup_location,
                    b.drop_location,
                    b.booking_status,
                    b.final_amount,
                    CASE
                        WHEN pr_check.status = 'PAID' THEN 0
                        ELSE latest_payment.remaining_amount
                    END AS remaining_amount
                FROM service_providers s
                INNER JOIN bookings b ON b.service_provider_id = s.id
                LEFT JOIN (
                    SELECT
                        pr.invoice_id,
                        pr.remaining_amount
                    FROM payment_records pr
                    WHERE pr.id IN (
                        SELECT MAX(pr_inner.id)
                        FROM payment_records pr_inner
                        WHERE pr_inner.status <> 'PAID'
                        GROUP BY pr_inner.invoice_id
                    )
                ) AS latest_payment ON latest_payment.invoice_id = b.inv_id
                LEFT JOIN payment_records pr_check ON pr_check.invoice_id = b.inv_id AND pr_check.status = 'PAID'
                WHERE b.customer_id = ${Id}
                    AND b.booking_status = 'CONFIRM' `;
                    
                let result = await queryAsync(query)
                if(result == 'err')
                {
                    resolve('err');
                }
                else
                {
                    resolve(result);
                }
            });
        }
        catch (error)
        {
         console.log(`Error from the try catch block of the getparticularbookindetailscompleted model file function`);
        }
    };

    static async getparticularbookindetailscancelled(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let query = `   SELECT
                                b.id,
                                s.name,
                                b.pickup_location,
                                b.drop_location,
                                b.booking_status,
                                b.final_amount,
                                DATE_FORMAT(b.deleted_at, '%d-%m-%Y %h:%m:%s') AS cancelled_date,
                                CASE
                                    WHEN pr_check.status = 'PAID' THEN 0
                                    ELSE latest_payment.remaining_amount
                                    END AS remaining_amount
                                FROM service_providers s
                                INNER JOIN bookings b ON b.service_provider_id = s.id
                                LEFT JOIN (
                                SELECT
                                pr.invoice_id,
                                pr.remaining_amount
                                FROM payment_records pr
                                WHERE pr.id IN (
                                SELECT MAX(pr_inner.id)
                                FROM payment_records pr_inner
                                WHERE pr_inner.status <> 'PAID'
                                GROUP BY pr_inner.invoice_id )
                                ) AS latest_payment ON latest_payment.invoice_id = b.inv_id
                                LEFT JOIN payment_records pr_check ON pr_check.invoice_id = b.inv_id AND pr_check.status = 'PAID'
                                WHERE b.customer_id = ${Id}
                                AND b.booking_status = 'CANCELLED' `;
                let result = await queryAsync(query)
                if(result == 'err')
                {
                    resolve('err');
                }
                else
                {
                    resolve(result);
                }
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getparticularbookindetailscancelled model file function`);
        }
    };

    static async getparticularbookindetailsrecent(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let recEnquiry = `  SELECT
                                    e.id,
                                    s.name AS service_provider_name,
                                    e.vehicle_id,
                                    v.vehicle_number,
                                    v.make,
                                    v.model,
                                    e.pickup_location,
                                    e.drop_location,
                                    e.trip_type,
                                    e.no_of_horse,
                                    e.pickup_date,
                                    e.status,
                                    e.created_at
                                    FROM enquiries e
                                    INNER JOIN vehicles v ON v.id = e.vehicle_id
                                    INNER JOIN service_providers s ON s.id = e.serviceprovider_id
                                    WHERE e.customer_id = ${Id}
                                    ORDER BY e.created_at DESC
                                    LIMIT 5`;
                // console.log(`Query from the recent enquiry of a particular customer: `, recEnquiry);
                let queryresult = await queryAsync(recEnquiry);
                // console.log('Most Recent enuiry: ', queryresult);
                let result = recentEnquiryCustomizeResponse(queryresult)
                resolve(result)
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getparticularbookindetailsrecent model file function`);
        }
    };

    static async getparticularcustomerallbookings(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let bookingQuery = `    SELECT
                                        b.id,
                        s.name,
                        b.pickup_location,
                        b.drop_location,
                        b.booking_status,
                        b.final_amount,
                        CASE
                            WHEN pr_check.status = 'PAID' THEN 0
                            ELSE latest_payment.remaining_amount
                        END AS remaining_amount
                        FROM service_providers s
                        INNER JOIN bookings b ON b.service_provider_id = s.id
                        LEFT JOIN (
                            SELECT
                                pr.invoice_id,
                                pr.remaining_amount
                            FROM payment_records pr
                        WHERE pr.id IN (
                            SELECT MAX(pr_inner.id)
                            FROM payment_records pr_inner
                            WHERE pr_inner.status <> 'PAID'
                            GROUP BY pr_inner.invoice_id
                            )
                        )
                        AS latest_payment ON latest_payment.invoice_id = b.inv_id
                        LEFT JOIN payment_records pr_check ON pr_check.invoice_id = b.inv_id AND pr_check.status = 'PAID'
                        WHERE b.customer_id = ${Id}`;
                // console.log(`Query from the recent enquiry of a particular customer: `, bookingQuery);
                let queryresult = await queryAsync(bookingQuery);
                // // console.log('Most Recent enuiry: ', queryresult);
                // let result = recentEnquiryCustomizeResponse(queryresult)
                resolve(queryresult)
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getparticularcustomerallbookings model file function`);
        }
    };

    static async getparticularcustomerallenquiry(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let recEnquiry = `  SELECT
                                    e.id,
                                    s.name AS service_provider_name,
                                    e.vehicle_id,
                                    v.vehicle_number,
                                    v.make,
                                    v.model,
                                    e.pickup_location,
                                    e.drop_location,
                                    e.trip_type,
                                    e.no_of_horse,
                                    e.pickup_date,
                                    e.status,
                                    e.created_at
                                    FROM enquiries e
                                    INNER JOIN vehicles v ON v.id = e.vehicle_id
                                    INNER JOIN service_providers s ON s.id = e.serviceprovider_id
                                    WHERE e.customer_id = ${Id}
                                    ORDER BY e.created_at DESC`;
                // console.log(`Query from the recent enquiry of a particular customer: `, recEnquiry);
                let queryresult = await queryAsync(recEnquiry);
                // console.log('Most Recent enuiry: ', queryresult);
                let result = recentEnquiryCustomizeResponse(queryresult)
                resolve(result)
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getparticularbookindetailsrecent model file function`);
        }        
    }

    static async getparticularcustomerallbookingsdatafrominvoice(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let bookingQuery = `
                SELECT
                i.id AS invoice_id,
                s.name AS service_provider_name,
                i.pickup_point,
                i.drop_point,
                i.status AS invoice_status,
                i.final_amount AS invoice_amount,
                p.remaining_amount AS remaining_payment,
                (i.final_amount - p.remaining_amount) AS paid_amount,
                v.vehicle_number,
                q.no_of_horse,
                q.trip_type,
                DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date
                FROM
                    ${constants.tableName.quotations} q
                JOIN ${constants.tableName.invoices} i ON q.id = i.quot_id
                JOIN ${constants.tableName.service_providers} s ON q.serviceprovider_id = s.id
                JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                JOIN (
                    SELECT
                        pr.invoice_id,
                        pr.remaining_amount
                    FROM ${constants.tableName.payment_records} pr
                    JOIN (
                        SELECT
                            invoice_id,
                            MAX(created_at) AS max_payment_date
                        FROM ${constants.tableName.payment_records}
                        GROUP BY invoice_id
                    ) latest_payments 
                    ON pr.invoice_id = latest_payments.invoice_id 
                    AND pr.created_at = latest_payments.max_payment_date
                ) p ON i.id = p.invoice_id
                LEFT JOIN ${constants.tableName.bookings} b 
                ON i.id = b.inv_id
                WHERE q.customer_id = ${Id}
                `;
                // console.log(`Query from the recent enquiry of a particular customer: `, bookingQuery);
                let queryresult = await queryAsync(bookingQuery);
                // // console.log('Most Recent enuiry: ', queryresult);
                // let result = recentEnquiryCustomizeResponse(queryresult)
                resolve(queryresult)
            });
        }
        catch (error)
        {
            // console.log(`Error from the try catch block of the getparticularcustomerallbookings model file function`);
        }
    }

    static async getparticularcustomeractivebookingsdatafrominvoice(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let bookingQuery = `
                SELECT
                i.id AS invoice_id,
                s.name AS service_provider_name,
                i.pickup_point,
                i.drop_point,
                i.status AS invoice_status,
                i.final_amount AS invoice_amount,
                p.remaining_amount AS remaining_payment,
                (i.final_amount - p.remaining_amount) AS paid_amount,
                v.vehicle_number,
                q.no_of_horse,
                q.trip_type,
                DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date
                FROM
                ${constants.tableName.quotations} q
                JOIN ${constants.tableName.invoices} i ON q.id = i.quot_id
                JOIN ${constants.tableName.service_providers} s ON q.serviceprovider_id = s.id
                JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                JOIN (
                    SELECT
                        pr.invoice_id,
                        pr.remaining_amount
                    FROM ${constants.tableName.payment_records} pr
                    JOIN (
                        SELECT
                            invoice_id,
                            MAX(created_at) AS max_payment_date
                        FROM ${constants.tableName.payment_records}
                        GROUP BY invoice_id
                    ) latest_payments 
                    ON pr.invoice_id = latest_payments.invoice_id 
                    AND pr.created_at = latest_payments.max_payment_date
                ) p ON i.id = p.invoice_id
                LEFT JOIN ${constants.tableName.bookings} b 
                ON i.id = b.inv_id
                WHERE q.customer_id = ${Id} AND i.status = '${constants.status.active}' `;
                
                // console.log(`Query from the recent enquiry of a particular customer: `, bookingQuery);
                let queryresult = await queryAsync(bookingQuery);
                // // console.log('Most Recent enuiry: ', queryresult);
                resolve(queryresult)
            });
        }
        catch (error)
        {
            // console.log(`Error from the try catch block of the getparticularcustomerallbookings model file function`);
        }
    };

    static async getparticularcustomerinactivebookingsdatafrominvoice(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let bookingQuery = `SELECT
                i.id AS invoice_id,
                s.name AS service_provider_name,
                i.pickup_point,
                i.drop_point,
                i.status AS invoice_status,
                i.final_amount AS invoice_amount,
                p.remaining_amount AS remaining_payment,
                (i.final_amount - p.remaining_amount) AS paid_amount,
                v.vehicle_number,
                q.no_of_horse,
                q.trip_type,
                DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date
                FROM
                ${constants.tableName.quotations} q
                JOIN ${constants.tableName.invoices} i ON q.id = i.quot_id
                JOIN ${constants.tableName.service_providers} s ON q.serviceprovider_id = s.id
                JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                JOIN (
                    SELECT
                        pr.invoice_id,
                        pr.remaining_amount
                    FROM ${constants.tableName.payment_records} pr
                    JOIN (
                        SELECT
                            invoice_id,
                            MAX(created_at) AS max_payment_date
                        FROM ${constants.tableName.payment_records}
                        GROUP BY invoice_id
                    ) latest_payments 
                    ON pr.invoice_id = latest_payments.invoice_id 
                    AND pr.created_at = latest_payments.max_payment_date
                ) p ON i.id = p.invoice_id
                LEFT JOIN ${constants.tableName.bookings} b 
                ON i.id = b.inv_id
                WHERE q.customer_id = ${Id} AND i.status = '${constants.status.inactive}' `;
                // console.log(`Query from the recent enquiry of a particular customer: `, bookingQuery);
                let queryresult = await queryAsync(bookingQuery);
                // // console.log('Most Recent enuiry: ', queryresult);
                resolve(queryresult)
            });
        }
        catch (error)
        {
            // console.log(`Error from the try catch block of the getparticularcustomerallbookings model file function`);
        }
    };

    static async getparticularcustomerongoingbookingsdatafrominvoice(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let bookingQuery = `SELECT
                i.id AS invoice_id,
                s.name AS service_provider_name,
                i.pickup_point,
                i.drop_point,
                i.status AS invoice_status,
                i.final_amount AS invoice_amount,
                p.remaining_amount AS remaining_payment,
                (i.final_amount - p.remaining_amount) AS paid_amount,
                v.vehicle_number,
                q.no_of_horse,
                q.trip_type,
                DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date
                FROM
                ${constants.tableName.quotations} q
                JOIN ${constants.tableName.invoices} i ON q.id = i.quot_id
                JOIN ${constants.tableName.service_providers} s ON q.serviceprovider_id = s.id
                JOIN ${constants.tableName.vehicles} v ON v.id = i.vehicle_id
                JOIN (
                    SELECT
                        pr.invoice_id,
                        pr.remaining_amount
                    FROM ${constants.tableName.payment_records} pr
                    JOIN (
                        SELECT
                            invoice_id,
                            MAX(created_at) AS max_payment_date
                        FROM ${constants.tableName.payment_records}
                        GROUP BY invoice_id
                    ) latest_payments 
                    ON pr.invoice_id = latest_payments.invoice_id 
                    AND pr.created_at = latest_payments.max_payment_date
                ) p ON i.id = p.invoice_id
                LEFT JOIN ${constants.tableName.bookings} b 
                ON i.id = b.inv_id
                WHERE q.customer_id = ${Id} 
                AND i.status = 'STARTED'
                AND b.booking_status = 'CONFIRM'`;
                
                console.log(`Query from the recent enquiry of a particular customer: `, bookingQuery);
                let queryresult = await queryAsync(bookingQuery);
                // // console.log('Most Recent enuiry: ', queryresult);
                resolve(queryresult)
            });
        }
        catch (error)
        {
            // console.log(`Error from the try catch block of the getparticularcustomerallbookings model file function`);
        }
    };

    static async editcustomerdetailsfromcustomerside(Id, name, userName, email, contact_no, date_of_birth, id_proof_no, id_proof_image)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                if(id_proof_image === null || id_proof_image === undefined)
                {
                    let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${Id}'`;
                    // console.log(upQuery);
                    con.query(upQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            console.log('Customer data updated successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            resolve('err')
                        }
                    });
                }
                else
                {
                    let uploadAttachment = await commonoperation.fileUploadTwo(id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                    let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.id_proof_image = '${uploadAttachment}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${id}'`;
                    // console.log(upQuery);
                    con.query(upQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            console.log('Customer data updated successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            resolve('err')
                        }
                    });
                }                   
            });
        }
        catch (error)
        {
            // console.log(`Error from the try catch block of the getparticularcustomerallbookings model file function`);
        }
    };

    static async getonedetailsoncustomerpage(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.customers, Id, 'id');
            // console.log('Data : ', data);
            if(data.length === 0)
            {                
                console.log('No data present on this Id');
                return ('nodata');
            }
            else if(data === 'err')
            {
                console.log(`Error while fethcing the vehicle data on the basis if Id. Model folder`);
                return ('err');
            }
            else
            {
                let responseObj = 
                {
                    name : data[0].name,
                    userName : data[0].user_name, 
                    email : data[0].email,               
                    contact_no : data[0].contact_no, 
                    birthday : time.formatDateToDDMMYYYY(data[0].date_of_birth),                
                    id_proof_no : data[0].id_proof_no, 
                    id_proof_image : `${process.env.PORT_SP}${constants.attachmentLocation.customer.view.idProof}${data[0].id_proof_image}`
                }
                return responseObj;
            }     
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.', error);            
        }
    };
};


const customizeCustomerDashboardData = (value1, value2, rAmount, pAmount) =>
{
    return {
        count:
        {
            // total_enquiry: value1[0].total_enquiry,
            // total_enquiry_confirmed : value1[0].total_enquiry_confirmed,
            // total_enquiry_not_confirmed : value1[0].total_enquiry_not_confirmed,
            total_booking: value1[0].total_invoices,
            total_pending_booking: value1[0].total_invoices_not_started,
            total_paid_amount: pAmount,
            total_pending_amount: rAmount
        },
        enquiries: value2.map(item => ({
            // id: item.booking_id,
            // service_provider_name: item.name,
            // pickup_location: item.pickup_location,
            // drop_location: item.drop_location,
            // pending_amount: item.remaining_amount,
            // final_amount: item.final_amount,
            // booking_status: item.booking_status
            id : item.id,
            service_provider_name: item.service_provider_name,
            vehicle_number : item.vehicle_number,
            pickup_location: item.pickup_location,
            drop_location: item.drop_location,
            enquiry_status: item.status,
            horse : item.no_of_horse
        }))
    };
}

const remainingAmount = async (Id) =>
{
    // console.log(`Remaining Amount`);
    return await new Promise(async (resolve, reject) =>
    {
        let getQuotationDataOnCustomerId = `SELECT * FROM ${constants.tableName.quotations} q WHERE q.customer_id = ${Id} AND q.status = 'CONFIRMED'`
        let result1 = await queryAsync(getQuotationDataOnCustomerId)
        // console.log(`Quotation Data from remaining amount: `, result1);
        if (result1?.length !== 0)
        {
            // console.log('No of confirmed quotation present of a submitted customer id: ',result1.length);
            var result2 = [];
            var invoiceId = [];
            var remainingAmountEntry = [];
            for (let i = 0; i < result1.length; i++)
            {
                result2[i] = await commonfetching.dataOnCondition(constants.tableName.invoices, result1[i].id, 'quot_id');
                // console.log(i,result2[i]);
                // console.log(result2[i][0]?.id);
                // Push the id value into the invoiceId array
                if(result2[i].length > 0)
                {
                    // console.log('Came insides');
                    invoiceId.push(result2[i][0].id);
                }
            }
            // console.log('Invoice Id we got from the remaingn amount: ',invoiceId); // This will log the invoiceId array
            for (let i = 0; i < invoiceId.length; i++)
            {
                let dataFromThePaymentRecords = 
                `
                SELECT 
                pr.remaining_amount
                FROM ${constants.tableName.payment_records} pr
                WHERE pr.invoice_id = ${invoiceId[i]}
                AND pr.status <> '${constants.status.paid}'
                AND NOT EXISTS (
                SELECT 1
                FROM ${constants.tableName.payment_records} pr_paid
                WHERE pr_paid.invoice_id = pr.invoice_id
                AND pr_paid.status = '${constants.status.paid}'
                )
                ORDER BY pr.created_at DESC
                LIMIT 1`
                // console.log(dataFromThePaymentRecords);
                let result3 = await queryAsync(dataFromThePaymentRecords)
                // console.log('Result 3: ', result3);
                if(result3?.length !== 0)
                {
                    remainingAmountEntry.push(parseFloat(result3[0].remaining_amount)); // Parse as float
                    //  }
                    // remainingAmountEntry.push(result3[0].remaining_amount);
                }
            }
            // console.log(remainingAmountEntry);
            const totalRemainingAmountSum = remainingAmountEntry.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            // console.log(totalRemainingAmountSum);
            resolve(totalRemainingAmountSum)
        }
        else 
        {
            resolve(false);
        }
    });
};

const paidAmount = async (Id) => 
{
    // console.log(`Paid Amount`);
    return await new Promise(async (resolve, reject) =>
    {
        let getQuotationDataOnCustomerId = `SELECT * FROM ${constants.tableName.quotations} q WHERE q.customer_id = ${Id} AND q.status = 'CONFIRMED'`
        let result1 = await queryAsync(getQuotationDataOnCustomerId)
        // console.log(`Quotation Data from paid amount: `, result1);
        if (result1?.length !== 0)
        {
            // console.log('No of confirmed quotation present of a submitted customer id in the paid amount: ',result1.length);
            // console.log(result1.length);
            var result2 = [];
            var invoiceId = [];
            var paidAmount = [];
            for (let i = 0; i < result1.length; i++)
            {
                result2[i] = await commonfetching.dataOnCondition(constants.tableName.invoices, result1[i].id, 'quot_id');
                // console.log(i,result2[i]);
                // console.log(result2[i][0]?.id);
                // console.log(result2[i][0].id);
                // Push the id value into the invoiceId array
                if(result2[i].length > 0)
                {
                    invoiceId.push(result2[i][0].id);
                }
                // invoiceId.push(result2[i][0].id);
            }
            // console.log('Invoice Id we got from the paid amount: ',invoiceId); // This will log the invoiceId array
            // console.log(invoiceId); // This will log the invoiceId arra
            for (let i = 0; i < invoiceId.length; i++)
            {
                let dataFromThePaymentRecords =
                ` 
                    SELECT 
                    CASE
                    WHEN EXISTS 
                    ( 
                        SELECT 1 FROM ${constants.tableName.payment_records} pr_pending 
                        WHERE pr_pending.invoice_id = ${invoiceId[i]} 
                        AND pr_pending.status = '${constants.status.pending}' 
                        AND pr_pending.received_amount = 0
                    )
                    THEN 0
                    WHEN EXISTS
                    (
                        SELECT 1
                        FROM ${constants.tableName.payment_records} pr_paid
                        WHERE pr_paid.invoice_id = ${invoiceId[i]}
                        AND pr_paid.status = '${constants.status.paid}'
                    )
                    THEN COALESCE
                    (
                        (
                            SELECT pr_paid.total_amount FROM ${constants.tableName.payment_records} pr_paid
                            WHERE pr_paid.invoice_id = ${invoiceId[i]}
                            AND pr_paid.status = '${constants.status.paid}' 
                            LIMIT 1
                        ),0
                    )
                    WHEN EXISTS
                    (
                        SELECT 1
                        FROM ${constants.tableName.payment_records} pr_partially_paid
                        WHERE pr_partially_paid.invoice_id = ${invoiceId[i]}
                        AND pr_partially_paid.status = '${constants.status.partPaid}'
                    )
                    THEN COALESCE
                    (
                        (
                            SELECT SUM(pr_received.received_amount)
                            FROM ${constants.tableName.payment_records} pr_received 
                            WHERE pr_received.invoice_id = ${invoiceId[i]}
                            AND pr_received.status = '${constants.status.partPaid}'
                        ),0
                    )
                    END AS paid_amount
                `;
                // console.log(dataFromThePaymentRecords);
                let result3 = await queryAsync(dataFromThePaymentRecords)
                // console.log('Result 3 from the paid amount: ', result3);
                if(result3?.length !== 0)
                {
                    paidAmount.push(parseFloat(result3[0].paid_amount)); // Parse as float
                }
            }
            // console.log(paidAmount);
            const totalPaidAmountSum = paidAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            // console.log(totalPaidAmountSum);
            resolve(totalPaidAmountSum)
        }
        else
        {
            resolve(false);
        }        
    });
};

function queryAsync(query)
{
    return new Promise((resolve, reject) =>
    {
        con.query(query, (err, result) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}

const recentEnquiryCustomizeResponse = async (value) =>
{
    return {
        enquiries : value.map(item => (
        {
            enquiry_id : item.id,
            service_provider_name : item.service_provider_name,
            vehicle_number : item.vehicle_number,
            manufacturer : item.make,
            model : item.model,
            pickup_location : item.pickup_location,
            drop_location: item.drop_location,
            trip_type: item.trip_type,
            no_of_horse: item.no_of_horse,
            pickup_date: time.formatDateToDDMMYYYY(item.pickup_date),
            status: item.status,
            created_at: time.formatDateToDDMMYYYY(item.created_at)
        }))
    }
};