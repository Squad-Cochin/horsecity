const con = require("../../configs/db.configs");
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const mail = require('../../utils/mailer')


require('dotenv').config()

/**Adding new quotation */
exports.addNewQuotaion = (requestBody, pickup_date, drop_date) => {
    return new Promise(async (resolve, reject) => {
        try {
            /**For taking letest id in the quotation */
            let selQuery = `SELECT MAX(id) AS latest_id FROM ${constants.tableName.quotations}`
            con.query(selQuery, async (err, quotId) => {
                if (quotId.length != 0) {
                    /**If the database is empty take 1 */
                    let id = (quotId[0].latest_id !== null) ? quotId[0].latest_id : 1;

                    /***For selecting quotation prefix */
                    let selQuery = `SELECT 	apps.quotation_prefix 
                          FROM ${constants.tableName.application_settings} apps`
                    con.query(selQuery, async (err, quotation_prefix) => {
                        if (quotation_prefix.length != 0) {
                            /**Adding prefix */
                            /** default 1 dont requires to add + 1  */
                            let qut_id = (quotId[0].latest_id == null) ? 1 : id + 1;
                            let quot_prefix = quotation_prefix[0]?.quotation_prefix
                            let sum_quotId = quot_prefix.concat(qut_id)
                       
                            /**For taking tax id in the settings application */
                            let selQuery = `SELECT 	tax_id  FROM ${constants.tableName.application_settings}`
                            con.query(selQuery, async (err, data) => {
                                if (data.length != 0) {
                                    let tax_id = data[0].tax_id

                                    const { customer_id, enquiry_id, driver_id, vehicle_id, service_provider_id, discount_type_id, trip_type, pickup_location, pickup_country, drop_location, drop_country, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,pickup_time,drop_time, driver_amount, vehicle_amount, current_amount, tax_amount, discount_amount, final_amount } = requestBody;


                                    let insQuery = `INSERT INTO quotations (customer_id,quotation_id, enquiry_id, driver_id, vehicle_id, serviceprovider_id, taxation_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date,pickup_time, drop_location, drop_country, drop_date,drop_time, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,driver_amount,vehicle_amount,sub_total, tax_amount, discount_amount, final_amount,created_at)
                                                    VALUES ('${customer_id}', '${sum_quotId}', '${enquiry_id}', '${driver_id}', '${vehicle_id}', '${service_provider_id}', '${tax_id}', '${discount_type_id}', '${trip_type}', '${pickup_location}', '${pickup_country}','${pickup_date}','${pickup_time}', '${drop_location}','${drop_country}', '${drop_date}','${drop_time}','${no_of_horse}','${special_requirement}', '${additional_service}','${transportation_insurance_coverage}','${driver_amount}','${vehicle_amount}','${current_amount}', '${tax_amount}','${discount_amount}','${final_amount}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                                    con.query(insQuery, async (err, data) => {
                                        console.log("insert", err);
                                        if (!err) {

                                            let updateQuery = `UPDATE ${constants.tableName.enquiries} SET  
                                            status = '${constants.enquiry_status.confirmed}'
                                            WHERE id = '${enquiry_id}'`;

                                            con.query(updateQuery, async (err, data) => {
                                                console.log("data", data);
                                                if (data?.length != 0) {
                                                    resolve(true)

                                                } else {
                                                    resolve(false)
                                                }
                                            })
                                        } else {
                                            resolve(false)
                                        }
                                    })

                                } else {
                                    resolve(false)
                                }
                            })
                        } else {
                            resolve(false)
                        }
                    })
                } else {
                    resolve(false)
                }
            })

        } catch (err) {
            resolve(false)
            console.log('Error while adding quotation', err);
        }
    })
}



/**Listing quotation */
exports.ListQuotation = (requestBody,spId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { page, limit } = requestBody;

            const offset = (page - 1) * limit;

            const selRoleName = `SELECT rl.name AS role_name,rl.id
            FROM ${constants.tableName.quotations} AS quo  
            JOIN ${constants.tableName.service_providers} AS sp ON quo.serviceprovider_id     = sp.id            
            JOIN ${constants.tableName.roles} AS rl ON sp.role_Id   = rl.id
            WHERE sp.id = '${spId}'`;

            con.query(selRoleName,(err,data)=>{ 
              
                if(data.length != 0){ 
                    let role_name = data[0].role_name ;

                    let role_id = data[0].id
            /**For listing quotation details */
            let selQuery = `SELECT quo.id, quo.quotation_id, quo.enquiry_id,quo.pickup_time,quo.drop_time, cu.name AS customer_name, cu.email AS customer_email, quo.status
                    FROM ${constants.tableName.quotations} quo
                    JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
                    JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id  = sp.id
                    WHERE quo.deleted_at IS NULL
                    AND (
                        ('${role_name}' = '${constants.roles.admin}')
                        OR
                        ('${role_name}' = '${constants.roles.superAdmin}')
                        OR
                        (
                            '${role_name}' = '${constants.roles.service_provider}'
                            AND sp.id = '${spId}'
                        )
                    )
                    LIMIT ${+limit} OFFSET ${+offset}`;

            con.query(selQuery, async (err, quo) => {
                console.log(err);
                if (quo.length != 0) {
         
                    /**Total count */
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.quotations} quo
                    JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id = sp.id
                                             WHERE quo.deleted_at IS NULL
                                             AND (
                                                ('${role_name}' = '${constants.roles.admin}')
                                                OR
                                                ('${role_name}' = '${constants.roles.admin}')
                                                OR
                                                (
                                                    '${role_name}' = '${constants.roles.service_provider}'
                                                    AND sp.id = '${spId}'
                                                )
                                            )`
                    con.query(totalCountQuery, (err, result) => {
 
                        if (!err) {
                            const count = result[0]['count(*)'];

                                       /**CHECKING basis of role id module name */
                         let Query = `SELECT md.name AS module_name ,md.id AS module_id ,pm.create,pm.update,pm.read,pm.delete
                                      FROM ${constants.tableName.permissions} AS pm
                                      JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                                      JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                                      WHERE pm.role_id = '${role_id}'  AND md.id = '${constants.modules.quotations}'
                                      `;


                                      con.query(Query,(err,modules)=>{
                                        // console.log("result",result);
                                        if(!err){
                                  
                                  
                                            resolve({ totalCount: count, quotations: quo ,module : modules})
                                        }
                                })
             
                        }
                    })

                } else {
                    resolve({totalCount : 0, quotations : [],module : []})
                }
            })

        }else {
            resolve({totalCount : 0, quotations : [],module : []})
        }
    })
        } catch (err) {
            resolve(false)
            console.log('Error while fetching  quotations', err);
        }
    })
}



/**For feching particlar quotation basis of quotation id */
exports.getOneQuotation = (quotId) => {
    return new Promise(async (resolve, reject) => {
        try { 
            /**For taking tax id in the settings application */

            let selQuery = `SELECT 	tx.id , tx.type,tx.name,tx.value 
        FROM ${constants.tableName.application_settings} apps 
        JOIN ${constants.tableName.taxations} tx ON apps.tax_id = tx.id
        ` 
            con.query(selQuery, async (err, tax) => {
 
                if (tax.length != 0) {

                    /***For selecting quotation view details */
                    let selQuery = `SELECT
            quo.id,
            quo.quotation_id,
            quo.trip_type,
            quo.pickup_country,  
            quo.pickup_location,
            quo.pickup_date,
            quo.pickup_time,
            quo.drop_country,
            quo.drop_location,
            quo.drop_date,
            quo.drop_time,
            quo.no_of_horse,
            quo.special_requirement,
            quo.additional_service,
            quo.transportation_insurance_coverage,
            quo.sub_total,
            quo.tax_amount,
            quo.discount_amount,
            quo.final_amount,
            cu.id AS customer_id,
            cu.name AS customer_name,
            cu.email AS customer_email,
            cu.user_name AS customer_user_name,
            cu.contact_no AS customer_contact_no,
            cu.id_proof_no AS customer_id_proof_no,
            sp.name AS service_provider_name,
            sp.id AS service_provider_id,
            enq.created_at AS enquiry_date,
            vh.vehicle_number AS vehicle_number,
            vh.make,
            vh.id AS vehicle_id,
            dvr.id AS driver_id,
            dvr.name AS driver_name, 
            dc.id AS discount_type_id,
            quo.driver_amount,
            quo.vehicle_amount
        FROM ${constants.tableName.quotations} AS quo
        JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id = sp.id
        JOIN ${constants.tableName.vehicles} vh ON quo.vehicle_id = vh.id
        JOIN ${constants.tableName.drivers} dvr ON quo.driver_id  = dvr.id
        JOIN ${constants.tableName.enquiries} enq ON quo.enquiry_id = enq.id
        JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
        JOIN ${constants.tableName.discount_types} dc ON quo.discount_type_id  = dc.id
        WHERE quo.quotation_id = '${quotId}' AND quo.deleted_at IS NULL;`

                    con.query(selQuery, async (err, data) => {
                        console.log(err);
                        if (data.length != 0) {
                            // console.log(data[0].pickup_date);
                            // console.log(data[0].drop_date);
                            // console.log(data[0].enquiry_date);
                            data[0].pickup_date = `${time.formatDateToDDMMYYYY(
                                data[0].pickup_date
                            )}`;
                            data[0].drop_date = `${time.formatDateToDDMMYYYY(
                                data[0].drop_date
                            )}`;
                            data[0].enquiry_date = `${time.formatDateToDDMMYYYY(
                                data[0].enquiry_date
                            )}`;
                            resolve({ quotation: data, tax: tax })
                        } else {
                            resolve({ quotation: [], tax: [] })
                        }
                    })

                } else {
                    resolve(false)
                }
            })
        } catch (err) {
            resolve(false)
            console.log('Error while fetching  quotations', err);
        }
    })
}



/**For updating That means add  of quotation  */
exports.updateQuotation = (requestBody, pickup_date, drop_date, quotId) => {
    return new Promise(async (resolve, reject) => {
        try {



            /**For taking tax id in the settings application */
            let selQuery = `SELECT 	tax_id  FROM ${constants.tableName.application_settings}`
            con.query(selQuery, async (err, tax) => {
                if (tax.length != 0) {
                    let tax_id = tax[0].tax_id

                    const { customer_id, enquiry_id, driver_id, vehicle_id, service_provider_id, discount_type_id, trip_type, pickup_location, pickup_country,pickup_time, drop_location, drop_country,drop_time, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage, driver_amount, vehicle_amount, current_amount, tax_amount, discount_amount, final_amount } = requestBody;
                        console.log(customer_id);
                    /**** Taking last added quotation id  */
                    let selQuery = `SELECT id FROM ${constants.tableName.quotations}  WHERE quotation_id = '${quotId}' ORDER BY id DESC LIMIT 1`
                    con.query(selQuery, async (err, id) => {
                        if (id.length != 0) {
                            let idd = id[0].id;
                            time.changeDateToSQLFormat(pickup_date)
                            time.changeDateToSQLFormat(drop_date)
                            console.log("id", idd, id);
                            /**inserting new quotation same quotation id  */
                            let insQuery = `INSERT INTO quotations (customer_id,quotation_id, enquiry_id, driver_id, vehicle_id, serviceprovider_id, taxation_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date,pickup_time, drop_location, drop_country, drop_date,drop_time, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,driver_amount,vehicle_amount,sub_total, tax_amount, discount_amount, final_amount,created_at)
                                   VALUES ('${customer_id}', '${quotId}', '${enquiry_id}', '${driver_id}', '${vehicle_id}', '${service_provider_id}', '${tax_id}', '${discount_type_id}', '${trip_type}', '${pickup_location}', '${pickup_country}','${pickup_date}','${pickup_time}', '${drop_location}','${drop_country}', '${drop_date}','${drop_time}','${no_of_horse}','${special_requirement}', '${additional_service}','${transportation_insurance_coverage}','${driver_amount}','${vehicle_amount}','${current_amount}', '${tax_amount}','${discount_amount}','${final_amount}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                            con.query(insQuery, async (err, result) => {
                                console.log("insert", err);
                                if (!err) {

                                    /*******************Last added quotaion id update deleted at********************** */
                                    let updateQuery = `UPDATE ${constants.tableName.quotations} SET  
                                deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                WHERE id = '${idd}'`;


                                    // SELECT * FROM quotations WHERE quotations.quotation_id = 'QUO2' ORDER BY id DESC LIMIT 1

                                    con.query(updateQuery, async (err, data) => {
                                        console.log("data", data);
                                        if (data?.length != 0) {
                                            resolve(true)

                                        } else {
                                            resolve(false)
                                        }
                                    })

                                } else {
                                    resolve(false)
                                }
                            })
                        } else {
                            resolve(false)
                        }
                    })

                } else {
                    resolve(false)
                }
            })
        } catch (err) {
            resolve(false)
            console.log('Error while fetching  quotations', err);
        }
    })
}



/**For listing removed quotations */
exports.removedQuotations = (quotId) => {
    return new Promise(async (resolve, reject) => {
        try {


            /***For selecting customer details & service provider on the  quotation list c */
            let selQuery = `SELECT
               quo.id,
               quo.quotation_id,
               cu.id AS customer_id,
               cu.email AS customer_email,
               cu.user_name AS customer_user_name,
               cu.contact_no AS customer_contact_no,
               cu.id_proof_no AS customer_id_proof_no,
               sp.name AS service_provider_name,
               enq.created_at AS enquiry_date,
               vh.vehicle_number AS vehicle_number,
               vh.make, 
               vh.model,
               dvr.name AS driver
           FROM ${constants.tableName.quotations} AS quo
           JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id = sp.id
           JOIN ${constants.tableName.vehicles} vh ON quo.vehicle_id = vh.id
           JOIN ${constants.tableName.drivers} dvr ON quo.driver_id  = dvr.id
           JOIN ${constants.tableName.enquiries} enq ON quo.enquiry_id = enq.id
           JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
           WHERE quo.quotation_id = '${quotId}' AND quo.deleted_at IS  NULL`;
            con.query(selQuery, async (err, Data) => {

                if (Data.length != 0) {
                    Data[0].enquiry_date = `${time.formatDateToDDMMYYYY(
                        Data[0].enquiry_date
                    )}`;
                    /***For feching  removed & unremoved quotation list details  */
                    let selQuery = `SELECT
               quo.id,
               quo.quotation_id,
               quo.trip_type,
               quo.pickup_country,
               quo.pickup_location,
               quo.pickup_date,
               quo.drop_country,
               quo.drop_location,
               quo.drop_date,
               quo.no_of_horse,
               quo.special_requirement,
               quo.additional_service,
               quo.transportation_insurance_coverage,
               quo.sub_total,
               quo.tax_amount,
               quo.discount_amount,
               quo.final_amount,
               vh.vehicle_number AS vehicle_number,
               quo.driver_amount,
               quo.vehicle_amount,
               quo.deleted_at
           FROM ${constants.tableName.quotations} AS quo
           JOIN ${constants.tableName.vehicles} vh ON quo.vehicle_id = vh.id
           WHERE quo.quotation_id = '${quotId}'`;
                    con.query(selQuery, async (err, qutationsData) => {
                        console.log(qutationsData);
                        if (qutationsData.length != 0) {

                            resolve({
                                quotation: {
                                    details: Data,
                                    quotations: qutationsData
                                }
                            })

                        } else {
                            resolve({
                                quotation: {
                                    details: [],
                                    quotations: []
                                }
                            })
                        }
                    })

                } else {
                    resolve({
                        quotation: {
                            details: [],
                            quotations: []
                        }
                    })
                }
            })
        } catch (err) {
            resolve(false)
            console.log('Error while fetching  quotations', err);
        }
    })
}



/** For chainging qutation status     basis of quotation id */
exports.updateStatusQuotation = (quotId) => {
    return new Promise(async (resolve, reject) => {
        try {


            /***For changing qutation status**********/
            let updateQuery = `UPDATE ${constants.tableName.quotations} AS quo SET
           quo.status = '${constants.quotation_status.confirmed}'
           WHERE quo.quotation_id = '${quotId}' AND quo.deleted_at IS NULL`;
            con.query(updateQuery, async (err, result) => {

                if (result.length != 0) {
                    /*****************************For taking quatation data****************/
                    let selQuery = `SELECT
                        quo.id,
                        quo.quotation_id,
                        quo.customer_id,
                        quo.serviceprovider_id, 
                        quo.discount_type_id,
                        quo.taxation_id,
                        quo.vehicle_id,
                        quo.driver_id,
                        quo.trip_type,
                        quo.pickup_country,
                        quo.pickup_location,
                        quo.pickup_date,
                        quo.pickup_time,
                        quo.drop_country,
                        quo.drop_location,
                        quo.drop_date,
                        quo.drop_time,
                        quo.no_of_horse,
                        quo.special_requirement,
                        quo.additional_service,
                        quo.transportation_insurance_coverage,
                        quo.sub_total,
                        quo.tax_amount,
                        quo.discount_amount,
                        quo.final_amount,
                        quo.driver_amount,
                        quo.vehicle_amount
                
                    FROM ${constants.tableName.quotations} AS quo
                    JOIN ${constants.tableName.vehicles} vh ON quo.vehicle_id = vh.id
                    WHERE quo.quotation_id = '${quotId}' AND quo.deleted_at IS NULL AND  quo.status = '${constants.quotation_status.confirmed}'`;

                    con.query(selQuery, async (err, qutationsData) => {

                        if (qutationsData.length != 0) {
                            console.log("heyy");
                            let pickup_date = await changeFormat(time.changeDateToSQLFormat(qutationsData[0].pickup_date))
                            let drop_date = await changeFormat(time.changeDateToSQLFormat(qutationsData[0].drop_date))

                            const {
                                id,
                                quotation_id,
                                customer_id,
                                serviceprovider_id,
                                discount_type_id,
                                taxation_id,
                                vehicle_id,
                                driver_id,
                                trip_type,
                                pickup_country,
                                pickup_location,
                                pickup_time,
                                drop_country,
                                drop_location,
                                drop_time,
                                no_of_horse,
                                special_requirement,
                                additional_service,
                                transportation_insurance_coverage,
                                sub_total,
                                tax_amount,
                                discount_amount,
                                final_amount,
                                driver_amount,
                                vehicle_amount
                            } = qutationsData[0];
                            /**Checking quataion id allred in the invoices s table if allredy there not will add bookings data */
                            let checkQutaionIdInvoices = `SELECT * FROM ${constants.tableName.invoices}
                                                          WHERE quotation_prefix_id = '${quotId}'`
                            con.query(checkQutaionIdInvoices, async (err, checkQutaionId) => {
                                console.log(checkQutaionId.length);
                                if (checkQutaionId.length === 0) {
                          
                  
                                    /****************************inserting bokking tables*******************/


                                    let selQuery = `SELECT MAX(id) AS latest_id FROM ${constants.tableName.invoices}`
                                    con.query(selQuery, async (err, invoice_no) => {
                               
                                        if (invoice_no.length != 0) {
                                  
                                            /**If the database is empty take 1 */
                                            let ID = (invoice_no[0].latest_id !== null) ? invoice_no[0].latest_id : 1;
                                            /***For selecting quotation prefix */
                                            let selQuery = `SELECT 	apps.invoice_prefix 
                                                FROM ${constants.tableName.application_settings} apps`
                                            con.query(selQuery, async (err, result) => {
                                                console.log("result",result); 
                                                if (result.length != 0) {
                                                    /**Adding prefix */
                                                    /** default 1 dont requires to add + 1  */
                                                    let inv_id = (invoice_no[0].latest_id == null) ? 1 : ID + 1;
                                                    let invoice = result[0]?.invoice_prefix
                                                    let sum_invId = invoice.concat(inv_id);
                                                    /**********Last added booking id *********** */
                                                    // let lasttAddedBokkings_id = `SELECT id
                                                    //                                       FROM ${constants.tableName.bookings}
                                                    //                                       ORDER BY id DESC LIMIT 1`
                                                    // con.query(lasttAddedBokkings_id, async (err, id) => {
                                                    //     if (id.length != 0) {
                                                    //         let booking_id = id[0].id;
                                                            /**********Inserting invoices datas*********** */
                                                            let insQuery = `INSERT INTO ${constants.tableName.invoices} (
                                                                                                    invoice_no,
                                                                                                    quot_id,
                                                                                                    quotation_prefix_id,
                                                                                                    service_provider_id,
                                                                                                    vehicle_id,
                                                                                                    driver_id,  
                                                                                                    pickup_point,
                                                                                                    drop_point,
                                                                                                    sub_total,
                                                                                                    tax_amount,
                                                                                                    discount_amount,
                                                                                                    final_amount,
                                                                                                    created_at
                                                                                                ) VALUES (
                                                                                                    '${sum_invId}', 
                                                                                                    '${id}', 
                                                                                                    '${quotation_id}', 
                                                                                                    '${serviceprovider_id}', 
                                                                                                    '${vehicle_id}', 
                                                                                                    '${driver_id}', 
                                                                                                    '${pickup_location}', 
                                                                                                    '${drop_location}', 
                                                                                                    '${sub_total}', 
                                                                                                    '${tax_amount}', 
                                                                                                    '${discount_amount}', 
                                                                                                    '${final_amount}', 
                                                                                                    '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                                                                                );`;

                                                            con.query(insQuery, async (err, result) => {

                                                                if (!err) {
                                                                    /**This for feching last added invoice id  */
                                                                    let lasttAddedInvoice_id = `SELECT id
                                                                                                        FROM ${constants.tableName.invoices}
                                                                                                        ORDER BY id DESC LIMIT 1`
                                                                    con.query(lasttAddedInvoice_id, async (err, invId) => {
                                                                        if (invId.length != 0) {
                                                                            let invoice_id = invId[0].id;

                                                                            /********** After Inserting totalamount invoice id in to the payment records********** */
                                                                            let insQuery = `INSERT INTO ${constants.tableName.payment_records} (
                                                                                                invoice_id,
                                                                                                invoice_prefix_id,
                                                                                                total_amount,
                                                                                                remaining_amount
                                                                                                ) VALUES (
                                                                                                    '${invoice_id}', 
                                                                                                    '${sum_invId}',
                                                                                                    '${final_amount}',
                                                                                                    '${final_amount}'
                                                                                                );`;
                                                                            con.query(insQuery, async (err, result) => {

                                                                                if (!err) {
                                                                                    resolve(true);
                                                                                }
                                                                                else {
                                                                                    resolve(false)
                                                                                }
                                                                            });

                                                                        }
                                                                        else {
                                                                            resolve(false)
                                                                        }
                                                                    });



                                                                }
                                                                else {
                                                                    resolve(false)
                                                                }
                                                            });


                                                }
                                                else {
                                                    resolve(false)
                                                }
                                            });
                                        }
                                        else {
                                            resolve(false)
                                        }
                                    })

                                } else {
                                    console.log("herrrr");
                                    resolve('QUOTIDALLREDYAVAILABLE')
                                }
                            })

                        } else {

                            resolve(false)
                        }
                    })

                } else {
                    resolve(false)
                }
            })
        } catch (err) {
            resolve(false)
            console.log('Error while fetching  quotations', err);
        }
    })
}




/** For Sending email */
exports.sendMail = (requestBody, quot_id) => 
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            console.log("",requestBody);
            const { costomer_email, subject, body } = requestBody
            console.log(requestBody);
            console.log("ddd");
            const sendEmail = await mail.SendEmailOfQuotation(quot_id, costomer_email, subject)
            //    const sendEmail = false
            if (sendEmail) { 
                let updateQuery = `UPDATE ${constants.tableName.bookings} 
                                           SET 	confirmation_sent = '${constants.booking_confirmation_send.yes}'
                                           WHERE  quotation_prefix_id = '${quot_id}'`;


                con.query(updateQuery, async (err, result) => {

                    if (result.length != 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            } else {
                console.log("hello");
                resolve(false);
            }

        } catch (err) {
            resolve(false)
            console.log('Error while sending mail  for  quotations', err);
        }
    })
}



function changeFormat(date) {
    return new Promise((resolve, rejuct) => {
        let result = time.changeDateToSQLFormat(date)
        resolve(result)
    })
}





