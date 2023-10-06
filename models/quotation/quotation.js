//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
//  This is quotation model file. Where all the logic of the quotation page program is written. //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const mail = require('../../utils/mailer')
const commonfetching = require('../../utils/helper/commonfetching');

require('dotenv').config()


module.exports = class quotation
{


/**********The below function is for creating new Quotation  **********/
static async addNewQuotaion  (requestBody, pickup_date, drop_date) {
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
            

                                    let insQuery = `INSERT INTO quotations (
                                        customer_id,
                                        quotation_id,
                                        enquiry_id,
                                        driver_id,
                                        vehicle_id,
                                        serviceprovider_id,
                                        taxation_id,
                                        ${discount_type_id ? 'discount_type_id,' : ''}
                                        trip_type,
                                        pickup_location,
                                        pickup_country,
                                        pickup_date,
                                        pickup_time,
                                        drop_location,
                                        drop_country,
                                        drop_date,
                                        drop_time,
                                        no_of_horse,
                                        special_requirement,
                                        additional_service,
                                        transportation_insurance_coverage,
                                        driver_amount,
                                        vehicle_amount,
                                        sub_total,
                                        tax_amount,
                                        discount_amount,
                                        final_amount,
                                        created_at
                                    ) VALUES (
                                        '${customer_id}',
                                        '${sum_quotId}',
                                        '${enquiry_id}',
                                        '${driver_id}',
                                        '${vehicle_id}',
                                        '${service_provider_id}',
                                        ${tax_amount != 0 ? `'${tax_id}',` : 'NULL,'}
                                        ${discount_type_id ? `'${discount_type_id}',` : ''}
                                        '${trip_type}',
                                        '${pickup_location}',
                                        '${pickup_country}',
                                        '${pickup_date}',
                                        '${pickup_time}',
                                        '${drop_location}',
                                        '${drop_country}',
                                        '${drop_date}',
                                        '${drop_time}',
                                        '${no_of_horse}',
                                        '${special_requirement}',
                                        '${additional_service}',
                                        '${transportation_insurance_coverage}',
                                        '${driver_amount}',
                                        '${vehicle_amount}',
                                        '${current_amount}',
                                        '${tax_amount}',
                                        '${discount_amount}',
                                        '${final_amount}',
                                        '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                    )`;
                                    
                                    con.query(insQuery, async (err, data) => {
                                        if (!err) {

                                            let updateQuery = `UPDATE ${constants.tableName.enquiries} SET  
                                            status = '${constants.enquiry_status.confirmed}'
                                            WHERE id = '${enquiry_id}'`;

                                            con.query(updateQuery, async (err, data) => {
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



/******This function for list quotation basis of page & limit ******/
static async ListQuotation  (requestBody,spId) {
    return new Promise(async (resolve, reject) => {
        try {
            const { page, limit } = requestBody;

            const offset = (page - 1) * limit;
     
            const selRoleName = `
            SELECT rl.name AS role_name, rl.id
            FROM ${constants.tableName.service_providers} AS sp 
            JOIN ${constants.tableName.roles} AS rl ON sp.role_Id = rl.id
            WHERE sp.id = '${spId}';`;
        

            con.query(selRoleName,async(err,data)=>{ 

                if(!err){ 
            
                    var role_id  = await data[0]?.id;
           
            /**For listing quotation details */
            let selQuery = `SELECT quo.id, quo.quotation_id, quo.enquiry_id,quo.pickup_time,quo.drop_time, cu.name AS customer_name, cu.email AS customer_email, quo.status
                    FROM ${constants.tableName.quotations} quo
                    JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
                    JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id  = sp.id
                    WHERE quo.deleted_at IS NULL
                    AND (
                        ('${role_id}' = '${constants.Roles.admin}')
                        OR
                        ('${role_id}' = '${constants.Roles.super_admin}')
                        OR
                        (
                            '${role_id}' = '${constants.Roles.service_provider}'
                            AND sp.id = '${spId}'
                        )
                    )
                    ORDER BY quo.id
                    LIMIT ${+limit} OFFSET ${+offset}
                   `;



            con.query(selQuery, async (err, quo) => {
   
                if (quo.length != 0) {
         
                    /**Total count */
                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.quotations} quo
                    JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id = sp.id
                                             WHERE quo.deleted_at IS NULL
                                             AND (
                                                ('${role_id}' = '${constants.Roles.admin}')
                                                OR
                                                ('${role_id}' = '${constants.Roles.admin}')
                                                OR
                                                (
                                                    '${role_id}' = '${constants.Roles.service_provider}'
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



/***********For feching particlar quotation basis of quotation id ********/
static async getonequotation(quotId) 
{
    try
    {
        return new Promise(async (resolve, reject) =>
        {
            let quotResponse = await commonfetching.getOneQuotationFromCommonFetching(quotId)
            
            if(quotResponse === false)
            {
                resolve(false);
            }

            if(quotResponse.length != 0)
            {
                resolve(quotResponse)
            }

            if(quotResponse.quotation.length === 0 && quotResponse.tax.length === 0)
            {
                resolve(quotResponse);
            }
        });             
    }
    catch (err)
    {
        resolve(false)
        console.log('Error while fetching  quotations', err);
    }

}



/***************For updating That means add  of quotation  ******************/
static async updateQuotation(requestBody, pickup_date, drop_date, quotId)  {
    return new Promise(async (resolve, reject) => {
        try {
         

            /**For taking tax id in the settings application */
            let selQuery = `SELECT 	tax_id  FROM ${constants.tableName.application_settings}`
            con.query(selQuery, async (err, tax) => {
                if (tax.length != 0) {
                    let tax_id = tax[0].tax_id
      
                    const { customer_id, enquiry_id, driver_id, vehicle_id, service_provider_id, discount_type_id, trip_type, pickup_location, pickup_country,pickup_time, drop_location, drop_country,drop_time, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage, driver_amount, vehicle_amount, tax_amount, discount_amount, final_amount } = requestBody;
                    let vehicle_amount_num = parseFloat(vehicle_amount);
                    let driver_amount_num = parseFloat(driver_amount);
                    let current_amount = vehicle_amount_num + driver_amount_num
                    /**** Taking last added quotation id  */
                    let selQuery = `SELECT id FROM ${constants.tableName.quotations}  WHERE quotation_id = '${quotId}' ORDER BY id DESC LIMIT 1`
                    con.query(selQuery, async (err, id) => {
                        if (id.length != 0) { 
                            let idd = id[0].id;
                            time.changeDateToSQLFormat(pickup_date)
                            time.changeDateToSQLFormat(drop_date)
                            /**inserting new quotation same quotation id  */
                            let insQuery = `INSERT INTO quotations (
                                customer_id,
                                quotation_id,
                                enquiry_id,
                                driver_id,
                                vehicle_id,
                                serviceprovider_id,
                                taxation_id,
                                discount_type_id,
                                trip_type,
                                pickup_location,
                                pickup_country,
                                pickup_date,
                                pickup_time,
                                drop_location,
                                drop_country,
                                drop_date,
                                drop_time,
                                no_of_horse,
                                special_requirement,
                                additional_service,
                                transportation_insurance_coverage,
                                driver_amount,
                                vehicle_amount,
                                sub_total,
                                tax_amount,
                                discount_amount,
                                final_amount,
                                created_at
                            ) VALUES (
                                '${customer_id}',
                                '${quotId}',
                                '${enquiry_id}',
                                '${driver_id}',
                                '${vehicle_id}',
                                '${service_provider_id}',
                                ${tax_amount != 0 ? `'${tax_id}',` : 'NULL,'}
                                ${discount_type_id == 0 || discount_type_id == 'null' ? 'NULL,' : `'${discount_type_id}',`}
                                '${trip_type}',
                                '${pickup_location}',
                                '${pickup_country}',
                                '${pickup_date}',
                                '${pickup_time}',
                                '${drop_location}',
                                '${drop_country}',
                                '${drop_date}',
                                '${drop_time}', 
                                '${no_of_horse}',
                                '${special_requirement}',
                                '${additional_service}',
                                '${transportation_insurance_coverage}',
                                '${driver_amount}',
                                '${vehicle_amount}',
                                '${current_amount}',
                                '${tax_amount}',
                                '${discount_amount}',
                                '${final_amount}',
                                '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                            )`;
                            
                            con.query(insQuery, async (err, result) => {
                                if (!err) {

                                    /*******************Last added quotaion id update deleted at********************** */
                                    let updateQuery = `UPDATE ${constants.tableName.quotations} SET  
                                deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                WHERE id = '${idd}'`;


                                    // SELECT * FROM quotations WHERE quotations.quotation_id = 'QUO2' ORDER BY id DESC LIMIT 1

                                    con.query(updateQuery, async (err, data) => {
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



/***************For listing removed quotations *********/
static async removedQuotations  (quotId)  {
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
                        if (qutationsData.length != 0) {

                            resolve({
                                quotation: {
                                    details: Data,
                                    quotations: qutationsData
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
            console.log('Error while fetching  quotations list', err);
        }
    })
}



/************** For chainging qutation status basis of quotation id ********/
static async updateStatusQuotation  (quotId)  {
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
        
                            let pickup_date = await changeFormat(time.changeDateToSQLFormat(qutationsData[0].pickup_date))
                            let drop_date = await changeFormat(time.changeDateToSQLFormat(qutationsData[0].drop_date))
           
                            const {
                                id,
                                quotation_id,
                                customer_id,
                                serviceprovider_id,
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
                       
                                                if (result.length != 0) {
                                                    /**Adding prefix */
                                                    /** default 1 dont requires to add + 1  */
                                                    let inv_id = (invoice_no[0].latest_id == null) ? 1 : ID + 1;
                                                    let invoice = result[0]?.invoice_prefix
                                                    let sum_invId = invoice.concat(inv_id);
                          
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

                                                                            let insQuery = `INSERT INTO ${constants.tableName.payment_records} (
                                                                                invoice_id,
                                                                                invoice_prefix_id,
                                                                                total_amount,
                                                                                received_amount,
                                                                                remaining_amount,
                                                                                status,
                                                                                created_at
                                                                            ) VALUES (
                                                                                '${invoice_id}', 
                                                                                '${sum_invId}',
                                                                                '${final_amount}',
                                                                                '0.00',
                                                                                '${final_amount}',
                                                                                '${constants.amount_status.pending}',
                                                                                '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
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
    });
}

/**Tis function for Sending email */
static async sendemail(requestBody, quot_id) 
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
      
            const { customer_email, subject, body } = requestBody
    
            const sendEmail = await mail.SendEmail(quot_id, customer_email, subject, constants.tableName.quotations);
            if (sendEmail) { 
                // let updateQuery = `UPDATE ${constants.tableName.bookings} 
                //                            SET 	confirmation_sent = '${constants.booking_confirmation_send.yes}'
                //                            WHERE  quotation_prefix_id = '${quot_id}'`;

                // con.query(updateQuery, async (err, result) => {

                //     if (result.length != 0) {
                        resolve(true)
                //     } else {
                //         resolve(false)
                //     }
                // })
            } else {
           
                resolve(false);
            }

        } catch (err) {
            resolve(false)
            console.log('Error while sending mail  for  quotations', err);
        }
    })
}



/***** This function for feching email template data ******* */
static async getsendemailbuttondata() 
{
    
        return new Promise(async (resolve, reject) =>
    {
        try
        {   let selQuery = `SELECT id,subject
        FROM ${constants.tableName.templates}
        WHERE id = '${constants.templates.quotaions}'`;
        con.query(selQuery,(err, result) =>
        {
           if(result.length !=0){
       

            resolve({templates_quotation : result})
           }else{
            resolve({templates_quotation : []})
           }
        });

        } catch (err) {
            resolve(false)
            console.log('Error while sending mail  for  quotations', err);
        }
    })    
};
}



function changeFormat(date) {
    return new Promise((resolve, rejuct) => {
        let result = time.changeDateToSQLFormat(date)
        resolve(result)
    })
}





