/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is customer model file. Where all the logic of the customer program is written.  //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants'); // Constant elements are stored in this file
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const commonfetching = require('../../utils/helper/commonfetching'); // helper file function. This file consist of functions Which is written universally for fetching the data from the database
const commonoperation = require('../../utils/helper/commonoperation'); // helper file function. This file consist of functions Which is written universally for some common operations.
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection
const objectConvertor = require(`../../utils/objectConvertor`);

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
                let result = await commonfetching.getRoleDetails(Id);
                if(result === `err` || result.length == 0)
                {
                    resolve('err');
                }
                else if(result[0].role_id === constants.Roles.admin)
                {
                    const offset = (pageNumber - 1) * pageSize;
                    let selQuery = `    SELECT 
                                        cd.id, 
                                        cd.name, 
                                        cd.email, 
                                        cd.contact_no, 
                                        DATE_FORMAT(cd.created_at, '%d-%m-%Y') AS created_at, 
                                        cd.status 
                                        FROM ${constants.tableName.customers} cd 
                                        WHERE cd.deleted_at IS NULL 
                                        LIMIT ${pageSize} 
                                        OFFSET ${offset}`;                        
                    const count = await commonoperation.totalCount(constants.tableName.customers);
                    con.query(selQuery, async (err, result2) =>
                    {
                        if(err)
                        {
                            resolve('err');
                        }
                        else
                        {
                            let Query = `   SELECT md.name AS module_name ,md.id AS module_id, pm.create, pm.update, pm.read, pm.delete
                                            FROM ${constants.tableName.permissions} AS pm
                                            JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                            JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                            WHERE pm.role_id = '${result[0].role_id}' AND md.id = '${constants.modules.customers}'
                                        `;
                            con.query(Query, (err, moduleResult) =>
                            {
                                err ? resolve('err') : result.length === 0 ? resolve ({totalCount : count[0]['count(t.id)'], customer : result2, module : moduleResult}) : resolve ({totalCount : count[0]['count(t.id)'], customer : result2, module : moduleResult});
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
                                WHERE pm.role_id = '${result[0].role_id}' 
                                AND md.id = '${constants.modules.customers}'`;
                    con.query(Query, (err, moduleResult) =>
                    {
                        err ? resolve('err') : result.length === 0 ? resolve ({totalCount : 0, customer : [], module : moduleResult}) : resolve ({totalCount : 0, customer : [], module : moduleResult});  
                    });
                }
                else
                {
                    resolve('err') 
                }                    
            });              
        }
        catch(error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getall". Which is designed to fetch all the data of customers.');                    
        }
    };


    /**
    * The below model function is for the Admin side page. 
    * The function for fetching  customer details present in the database on the basis of customer id.
    */
    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.customers, Id, 'id');
            if(data.length === 0)
            {                
                return ('nodata');
            }
            else if(data === 'err')
            {
                return ('err');
            }
            else
            {
                let dob = data[0].date_of_birth;
                data[0].date_of_birth = time.formatDateToDDMMYYYY(dob); 
                let idProofImage = data[0].id_proof_image;
                data[0].id_proof_image = `${process.env.PORT_SP}${constants.attachmentLocation.customer.view.idProof}${idProofImage}`;
                return data;
            }     
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch  data of the customers.', error);            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is registerting or adding new customer.
    */
    static async addcustomer(Id, name, email, user_name, password, contact_no, date_of_birth, id_proof_no, files)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadAttachment = await commonoperation.fileUploadTwo(files, constants.attachmentLocation.customer.upload.idProof);
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
                    let checkRole = `
                                    SELECT sp.id , 
                                    r.id AS role_id, 
                                    r.name FROM service_providers sp, 
                                    ${constants.tableName.roles} r 
                                    WHERE sp.id = ${Id} 
                                    AND sp.role_Id = r.id`;
                    con.query(checkRole, async (err, resultRole) =>
                    {
                        if(err)
                        {
                            resolve('err') 
                        }
                        else
                        {
                            if(resultRole[0].role_id === constants.Roles.admin)
                            {
                                let insQuery = `INSERT INTO customers(name, email, user_name, password, contact_no, date_of_birth, id_proof_no, id_proof_image, phone_verified, email_verified, expiry_at, created_at) VALUES('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_no}', '${date_of_birth}', '${id_proof_no}', '${uploadAttachment}', 'TRUE', 'TRUE', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                let result = await commonoperation.queryAsync(insQuery)
                                result.affectedRows > 0 ? resolve(result) : resolve('err')
                            }
                            else if(resultRole[0].role_id === constants.Roles.service_provider)
                            {
                                resolve([]);
                            }
                            else
                            {
                                resolve('err');
                            }
                        }
                    });
                }                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "addcustomer". Which is designed to add  data of the customers.');            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is updating or edititng the details of the present customer on the basis of customer id in the params.
    */
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
                    let result = await commonoperation.queryAsync(upQuery)
                    result.affectedRows > 0 ? resolve(result) : resolve('err')
                }
                else
                {
                    let uploadAttachment = await commonoperation.fileUploadTwo(id_proof_image, constants.attachmentLocation.customer.upload.idProof);
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
                        let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.id_proof_image = '${uploadAttachment}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${id}'`;
                        let result = await commonoperation.queryAsync(upQuery)
                        result.affectedRows > 0 ? resolve(result) : resolve('err')
                    }
                }                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "editcustomer". Which is designed to edit  data of the customer.');            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is updating the status of a  customer on the basis of customer id in the params.
    */
    static async updatestatus(Id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.customers, Id);
            return data.length === 0 ? [] : data;           
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch  data of the customers.');            
        }
    };

    /**
    * The below model function is for the Admin side page. The function is updating or adding the deleted_at of a  customer on the basis of customer id in the params.
    * This will be considered as the customer is deleted
    */
    static async removecustomer(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.customers, Id);
            return data.length === 0 ? [] : data;           
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch  data of the customers.');            
        }
    };

    /**
     * The below model function is for the customer frontend side page. This function is for the login of the customer.
     */
    static async customerlogin(username, password)
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                let selQuery = ` SELECT c.id,
                                 c.name,
                                 c.email,
                                 c.password, 
                                 c.user_name, 
                                 c.contact_no, 
                                 c.id_proof_no, 
                                 c.id_proof_image, 
                                 c.expiry_at, 
                                 c.status  
                                 FROM ${constants.tableName.customers} c 
                                 WHERE c.user_name = '${username}' `;
                con.query(selQuery, async(err, customerData) =>
                {
                    if(customerData.length === 0)
                    {
                        resolve('nocustomer');
                    }
                    else
                    {
                        var data = { id : customerData[0].id }
                        const givenDate = new Date().getTime();
                        const expiryDate = new Date(customerData[0].expiry_at).getTime();
                        if(givenDate > expiryDate)
                        {
                            resolve({ message: 'passwordexpired', data})
                        }
                        else
                        {
                            const passwordHashed = await commonoperation.changePasswordToSQLHashing(password);
                            if(customerData[0].password === passwordHashed)
                            {
                                let insQuery = `INSERT INTO ${constants.tableName.customer_logs}(customer_id, ip_address, device_information, location, login_time) VALUES(${customerData[0].id}, '192.168.200.130', 'Test purpose currently', 'Kerela', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                                con.query(insQuery, (err, result1) =>
                                {
                                    result1.affectedRows > 0 ?  resolve(data) : resolve(`err`);
                                });
                            }
                            else
                            {
                                resolve('passwordnotmatched')
                            }
                        }
                    }
                });
            }
            catch(error)
            {
                console.log('Error while customer login from the model', error);
                resolve(`err`);
            }
        });  
    };

    /**
     * The below model function is for the customer frontend side page. This function is for the Logout of the customer.
     */
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
                    let selQuery = `SELECT * FROM ${constants.tableName.customer_logs} c WHERE c.customer_id = ${customerData[0].id} AND c.login_time IS NOT NULL AND c.logout_time IS NULL`;
                    con.query(selQuery, (err, result3) =>
                    {
                        if(err)
                        {
                            resolve(`err`);
                        }
                        else
                        {
                            if(result3.length != 0)
                            {
                                let upQuery = ` UPDATE ${constants.tableName.customer_logs} c 
                                                SET c.logout_time = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', 
                                                c.duration = TIMEDIFF('${time.getFormattedUTCTime(constants.timeOffSet.UAE)}', '${time.changeDateToSQLFormat(result3[0].login_time)}') 
                                                WHERE 
                                                c.customer_id = ${customerData[0].id} 
                                                AND c.login_time IS NOT NULL 
                                                AND c.logout_time IS NULL`;
                                con.query(upQuery, (err, result1) =>
                                {
                                    result1.affectedRows > 0 ? resolve(`logoutdone`) :  resolve(`err`);
                                });
                            }
                            else if (result3.length == 0)
                            {
                                resolve(`notLogin`)
                            }
                            else
                            {
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

    /**
     * The below model function is for the customer frontend side page. This function is for the change password of the customer.
     */
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
                        let updatePasswordQuery = `     UPDATE ${constants.tableName.customers} 
                                                        SET password = '${newpasswordHashed}',
                                                        updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                                        expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}'
                                                        WHERE id = ${id} `
                        con.query(updatePasswordQuery, (err, result) =>
                        {
                            result.affectedRows > 0 ? resolve(customerData) : resolve('err'); 
                        });                                
                    }   
                }
            });         
        }
        catch (error)
        {
          console.log('Error while customer change password from the backend', error);
        }
    };

    /**
    * The below model function is for the customer frontend side page. This function is for siginup of the new customer
    */
    static async customersignup(name, email, user_name, password, contact_no, date_of_birth)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                
                    let insQuery = `INSERT INTO 
                                    customers(name, email, user_name, password, contact_no, date_of_birth, phone_verified, email_verified, expiry_at, created_at) 
                                    VALUES('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_no}', '${date_of_birth}', 'TRUE', 'TRUE', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                    con.query(insQuery, (err, result) =>
                    {
                        result.affectedRows > 0 ?  resolve('registered') :  resolve('err');
                    });
            });
        }
        catch (error)
        {
            console.log('Error while register customer from the backend', error);
        } 
    };

    /**
    * The below model function is for the customer frontend side page. This function is for fetching the logs of a  customer
    */
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
                                FROM ${constants.tableName.customer_logs} c
                                WHERE c.customer_id = ${Id}
                                `;
                con.query(selQuery, (err, result)=> 
                {
                    err ? resolve(err) : result.length !== 0 ? resolve(result) : resolve([]);
                });
            });
        }
        catch (error)
        {
           console.log(`Error from the try catch block of the getcustomerlogs model from the customer.model.js`); 
        }        
    };

    /**
    * The below model function is for the customer frontend side page. This function is for fetching the data. Which we are showing on the dashboard of the customer
    */
    static async getparticularcustomerdashboard(Id)
    {
        try
        {
            return await new Promise (async (resolve, reject)=>
            {
                let countQuery = `  SELECT
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
                con.query(countQuery, (err, result1) =>
                {
                    if(err)
                    {
                        resolve('err')
                    }
                    else
                    {
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
                        con.query(receivedBookingQuery, async (err, result2) =>
                        {
                            if(err)
                            {
                                resolve('err')
                            }
                            else
                            {
                                let remainingamount = await remainingAmount(Id);
                                let PaidAmount = await paidAmount(Id);
                                if(!remainingamount && !PaidAmount)
                                {
                                    
                                    let result = objectConvertor.convertNextJSCustomerDashboardResponse(result1, result2, 0, 0)
                                    resolve(result);
                                }
                                else
                                {
                                    let result = objectConvertor.convertNextJSCustomerDashboardResponse(result1, result2, remainingamount, PaidAmount)
                                    resolve(result);
                                }
                            }
                        });
                    }
                });
            });
        }
        catch (error)
        {
            console.log(`Error while fetching the dashboard data of the customer from the backend. Please check the getcustomerdasboard model in the customer.model.js`);                        
        }
    }

    /**
    * The below model function is for the customer frontend side page. This function is for fetching all the booking of a  customer
    * whose status is completed
    */
    static async getparticularbookindetailscompleted(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let query = 
                `
                    SELECT
                    b.id,
                    s.name AS service_provider_name,
                    b.pickup_location AS pickup_point,
                    b.drop_location AS drop_point,
                    b.booking_status AS invoice_status,
                    b.status AS payment_status,
                    b.final_amount AS invoice_amount,
                    v.vehicle_number,
                    q.no_of_horse,
                    q.trip_type,
                    (i.final_amount - COALESCE(p.remaining_amount, 0)) AS paid_amount,
                    DATE_FORMAT(q.pickup_date, '%d-%m-%Y') AS pickup_date,
                    CASE
                        WHEN pr_check.status = '${constants.status.paid}' THEN 0
                        ELSE COALESCE(latest_payment.remaining_amount, 0)
                    END AS remaining_payment
                    FROM ${constants.tableName.service_providers} s
                    INNER JOIN ${constants.tableName.bookings} b ON b.service_provider_id = s.id
                    INNER JOIN ${constants.tableName.invoices} i ON i.id = b.inv_id
                    INNER JOIN ${constants.tableName.vehicles} v ON v.id = b.vehicle_id
                    INNER JOIN ${constants.tableName.quotations} q ON q.serviceprovider_id = b.service_provider_id
                    LEFT JOIN (
                                SELECT
                                pr.invoice_id,
                                MAX(pr.id) AS max_id,
                                pr.remaining_amount
                                FROM ${constants.tableName.payment_records} pr
                                WHERE pr.status <> '${constants.status.paid}'
                                GROUP BY pr.invoice_id
                    ) AS latest_payment 
                    ON latest_payment.invoice_id = i.id
                    LEFT JOIN ${constants.tableName.payment_records} pr_check 
                    ON pr_check.invoice_id = i.id 
                    AND pr_check.status = '${constants.status.paid}'
                    LEFT JOIN ${constants.tableName.payment_records} p 
                    ON p.id = latest_payment.max_id
                    WHERE b.customer_id = ${Id}
                    AND b.booking_status = '${constants.booking_status.completed}'
                    AND q.deleted_at IS NULL
                    AND q.status = '${constants.quotation_status.confirmed}'
                    AND q.id = i.quot_id
                `;                              
                let result = await commonoperation.queryAsync(query);
                result === 'err' ? resolve('err') : resolve(result) 
            });
        }
        catch (error)
        {
         console.log(`Error from the try catch block of the getbookindetailscompleted model file function`);
        }
    };

    /**
    * The below model function is for the customer frontend side page. This function is for fetching all the booking of a  customer
    * whose status is CONFIRM
    */
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
                    
                let result = await commonoperation.queryAsync(query);
                result == 'err' ? resolve('err') : resolve(result);
            });
        }
        catch (error)
        {
         console.log(`Error from the try catch block of the getbookindetailscompleted model file function`);
        }
    };

    /**
    * The below model function is for the customer frontend side page. This function is for fetching all the booking of a  customer
    * whose status is CANCELLED
    */
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
                                    WHEN pr_check.status = '${constants.status.paid}' THEN 0
                                    ELSE latest_payment.remaining_amount
                                    END AS remaining_amount
                                FROM ${constants.tableName.service_providers} s
                                INNER JOIN ${constants.tableName.bookings} b 
                                ON b.service_provider_id = s.id
                                LEFT JOIN (
                                SELECT
                                pr.invoice_id,
                                pr.remaining_amount
                                FROM ${constants.tableName.payment_records} pr
                                WHERE pr.id IN (
                                SELECT MAX(pr_inner.id)
                                FROM ${constants.tableName.payment_records} pr_inner
                                WHERE pr_inner.status <> '${constants.status.paid}'
                                GROUP BY pr_inner.invoice_id )
                                ) AS latest_payment 
                                ON latest_payment.invoice_id = b.inv_id
                                LEFT JOIN ${constants.tableName.payment_records} pr_check 
                                ON pr_check.invoice_id = b.inv_id 
                                AND pr_check.status = '${constants.status.paid}'
                                WHERE b.customer_id = ${Id}
                                AND b.booking_status = '${constants.booking_status.cancelled}' `;
                let result = await commonoperation.queryAsync(query);
                result === 'err' ? resolve('err') : resolve(result);
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getbookindetailscancelled model file function`);
        }
    };

    /**
    * The below model function is for the customer frontend side page. This function is for fetching all the enquiries of a  customer
    * We will get only five recent enquiries because of the limit.  
    */
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
                                    FROM ${constants.tableName.enquiries} e
                                    INNER JOIN ${constants.tableName.vehicles} v ON v.id = e.vehicle_id
                                    INNER JOIN ${constants.tableName.service_providers} s ON s.id = e.serviceprovider_id
                                    WHERE e.customer_id = ${Id}
                                    ORDER BY e.created_at DESC
                                    LIMIT 5`;
                let queryresult = await commonoperation.queryAsync(recEnquiry);
                let result = objectConvertor.convertNEXTJSRecentEnquiriesCustomizeResponse(queryresult)
                resolve(result)
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getbookindetailsrecent model file function`);
        }
    };

    /**
    * The below model function is for the customer frontend side page. This function is for fetching all the bookings of a customer
    * The data will be fetched from the bookings table
    */
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
                                            WHEN pr_check.status = '${constants.status.paid}' THEN 0
                                            ELSE latest_payment.remaining_amount
                                            END AS remaining_amount
                                        FROM ${constants.tableName.service_providers} s
                                        INNER JOIN ${constants.tableName.bookings} b 
                                        ON b.service_provider_id = s.id
                                        LEFT JOIN (
                                            SELECT
                                            pr.invoice_id,
                                            pr.remaining_amount
                                            FROM ${constants.tableName.payment_records} pr
                                            WHERE pr.id IN (
                                                SELECT MAX(pr_inner.id)
                                                FROM ${constants.tableName.payment_records} pr_inner
                                                WHERE pr_inner.status <> '${constants.status.paid}'
                                                GROUP BY pr_inner.invoice_id
                                            )
                                        )
                                        AS latest_payment 
                                        ON latest_payment.invoice_id = b.inv_id
                                        LEFT JOIN ${constants.tableName.payment_records} pr_check 
                                        ON pr_check.invoice_id = b.inv_id 
                                        AND pr_check.status = '${constants.status.paid}'
                                        WHERE b.customer_id = ${Id}`;
                let queryresult = await commonoperation.queryAsync(bookingQuery);
                resolve(queryresult)
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getcustomerallbookings model file function`);
        }
    };

    /**
     * The below model is for fetching all the enquiries of a  customer.
     * From here we will send the data to the controller. The response of the route will be taken from the 
     * controller. Whatever data  is there in the response it is coming from this model.
     */
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
                                    FROM ${constants.tableName.enquiries} e
                                    INNER JOIN ${constants.tableName.vehicles} v ON v.id = e.vehicle_id
                                    INNER JOIN ${constants.tableName.service_providers} s ON s.id = e.serviceprovider_id
                                    WHERE e.customer_id = ${Id}
                                    ORDER BY e.created_at DESC`;
                let queryresult = await commonoperation.queryAsync(recEnquiry);
                let result = objectConvertor.convertNEXTJSRecentEnquiriesCustomizeResponse(queryresult)
                resolve(result)
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getbookindetailsrecent model file function`);
        }        
    }

    /**
     * The below model is for fetching all the booking details of a  customer.
     * The data will be taken from the quotations, invoices, payment_records.
     * From here we will send the data to the controller. The response of the route will be taken from the 
     * controller. Whatever data  is there in the response it is coming from this model.
     */
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
                let queryresult = await commonoperation.queryAsync(bookingQuery);
                resolve(queryresult)
            });
        }
        catch (error)
        {
        }
    }

     /**
     * The below model is for fetching all the booking details(ACTIVE STATUS FROM THE INVVOICES TABLE) of a  customer. 
     * The data will be taken from the quotations, invoices, payment_records.
     * From here we will send the data to the controller. The response of the route will be taken from the 
     * controller. Whatever data  is there in the response it is coming from this model.
     */
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
                WHERE q.customer_id = ${Id} 
                AND i.status = '${constants.status.active}'`;
                let queryresult = await commonoperation.queryAsync(bookingQuery);
                resolve(queryresult)
            });
        }
        catch (error)
        {
        }
    };

    /**
     * The below model function is for fetching all the booking detail.
     * Whose status from the invoice table must be INACTIVE that means it is cancelled.
     * The data will be taken from the quotations, invoices, payment_records.
     * From here we will send the data to the controller. The response of the route will be taken from the 
     * controller. Whatever data is there in the json response it is coming from this model. 
     */
    static async getparticularcustomerinactivebookingsdatafrominvoice(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let bookingQuery = `    SELECT
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
                                        AND i.status = '${constants.status.inactive}' `;
                let queryresult = await commonoperation.queryAsync(bookingQuery);
                resolve(queryresult)
            });
        }
        catch (error)
        {
        }
    };

     /**
     * The below model function is for fetching all the booking detail.
     * Whose status from the invoice table must be STARTED that means it is driver taken the animals 
     * and leave for the destination and booking status in the booking table in CONFIRM
     * The data will be taken from the quotations, invoices, payment_records.
     * From here we will send the data to the controller. The response of the route will be taken from the 
     * controller. Whatever data is there in the json response it is coming from this model. 
     */
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
                AND b.booking_status = 'CONFIRM'
                `;                
                let queryresult = await commonoperation.queryAsync(bookingQuery);
                resolve(queryresult)
            });
        }
        catch (error)
        {
        }
    };

    /**
     * The model function is for editing the customer details.
     * The function will be used when the data is inserted from the front end of customer (NEXT JS)
     */
    static async editcustomerdetailsfromcustomerside(Id, name, userName, email, contact_no, date_of_birth, id_proof_no, id_proof_image)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                // The below if contion is when the id proof image we are not updating or changing.
                if(id_proof_image === null || id_proof_image === undefined)
                {
                    let upQuery = ` UPDATE ${constants.tableName.customers} c 
                                    SET c.name = '${name}',
                                    c.email = '${email}',
                                    c.user_name = '${userName}',
                                    c.contact_no = '${contact_no}',
                                    c.date_of_birth = '${date_of_birth}',
                                    c.id_proof_no = '${id_proof_no}',
                                    c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                    WHERE c.id = '${Id}'
                                  `;
                    let result = await commonoperation.queryAsync(upQuery);
                    result.affectedRows > 0 ? resolve(result) : resolve('err');
                }
                else
                {
                    /**
                     * This else case will be executed. When we are updating or changing the id proof image
                     * 
                     * The below line will take us to the function which is used for uploading the image.
                     * This function is in the utils folder. Inside the commonoperations.js
                     * 
                     * We need to send to things for the execution of the 'fileUploadTwo' function
                     * 1. Image
                     * 2. Path where we need to store the image 
                     */

                    let uploadAttachment = await commonoperation.fileUploadTwo(id_proof_image, constants.attachmentLocation.customer.upload.idProof);
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
                        let upQuery = `     UPDATE ${constants.tableName.customers} c 
                                            SET c.name = '${name}',
                                            c.email = '${email}',
                                            c.user_name = '${userName}',
                                            c.contact_no = '${contact_no}',
                                            c.date_of_birth = '${date_of_birth}', 
                                            c.id_proof_no = '${id_proof_no}',
                                            c.id_proof_image = '${uploadAttachment}',
                                            c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                            WHERE c.id = '${Id}'
                                        `;
                        let result = await commonoperation.queryAsync(upQuery);
                        result.affectedRows > 0 ? resolve(result) : resolve('err');
                    }
                }                   
            });
        }
        catch (error)
        {
        }
    };
    
    /**
     * The model function is for view details of a  customer.
     * The function will be used when the data is inserted from the front end of customer (NEXT JS)
     */
    static async getonedetailsoncustomerpage(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.customers, Id, 'id');
            return data === 'err' ? 'err' : objectConvertor.customerSideDetialsPage(data);    
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch  data of the customers.', error);            
        }
    };
};


// The below function is used for calculating the total remaining payment of a  customers
const remainingAmount = async (Id) =>
{
    return await new Promise(async (resolve, reject) =>
    {
        let getQuotationDataOnCustomerId = `
                                                SELECT * FROM ${constants.tableName.quotations} q 
                                                WHERE q.customer_id = ${Id}
                                                AND q.status = '${constants.quotation_status.confirmed}'
                                            `
        let result1 = await commonoperation.queryAsync(getQuotationDataOnCustomerId)
        if (result1?.length !== 0)
        {
            var result2 = [];
            var invoiceId = [];
            var remainingAmountEntry = [];
            for (let i = 0; i < result1.length; i++)
            {
                result2[i] = await commonfetching.dataOnCondition(constants.tableName.invoices, result1[i].id, 'quot_id');
                // Push the id value into the invoiceId array
                if(result2[i].length > 0)
                {
                    invoiceId.push(result2[i][0].id);
                }
            }
            for (let i = 0; i < invoiceId.length; i++)
            {
                let dataFromThePaymentRecords = `
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
                let result3 = await commonoperation.queryAsync(dataFromThePaymentRecords)
                if(result3?.length !== 0)
                {
                    remainingAmountEntry.push(parseFloat(result3[0].remaining_amount)); // Parse as float
                }
            }
            const totalRemainingAmountSum = remainingAmountEntry.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            resolve(totalRemainingAmountSum)
        }
        else 
        {
            resolve(false);
        }
    });
};

// The below function is used for calculating the total paid payment of a  customers
const paidAmount = async (Id) => 
{
    return await new Promise(async (resolve, reject) =>
    {
        let getQuotationDataOnCustomerId = `SELECT * FROM ${constants.tableName.quotations} q 
                                            WHERE q.customer_id = ${Id} 
                                            AND q.status = '${constants.quotation_status.confirmed}' `
        let result1 = await commonoperation.queryAsync(getQuotationDataOnCustomerId)
        if (result1?.length !== 0)
        {
            var result2 = [];
            var invoiceId = [];
            var paidAmount = [];
            for (let i = 0; i < result1.length; i++)
            {
                result2[i] = await commonfetching.dataOnCondition(constants.tableName.invoices, result1[i].id, 'quot_id');
                // Push the id value into the invoiceId array
                if(result2[i].length > 0)
                {
                    invoiceId.push(result2[i][0]?.id);
                }
            }
            for (let i = 0; i < invoiceId.length; i++)
            {
                let dataFromThePaymentRecords =` 
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
                        SELECT 1 FROM ${constants.tableName.payment_records} pr_cancel 
                        WHERE pr_cancel.invoice_id = ${invoiceId[i]} 
                        AND pr_cancel.status = '${constants.booking_status.cancelled}' 
                        AND pr_cancel.received_amount = 0
                        AND pr_cancel.deleted_at IS NOT NULL
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
                let result3 = await commonoperation.queryAsync(dataFromThePaymentRecords)
                if(result3?.length !== 0)
                {
                    paidAmount.push(parseFloat(result3[0].paid_amount)); // Parse as float
                }
            }
            const totalPaidAmountSum = paidAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            resolve(totalPaidAmountSum)
        }
        else
        {
            resolve(false);
        }        
    });
};