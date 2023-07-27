const con = require("../../configs/db.configs");
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()

/**Adding new quotation */
exports.addNewQuotaion = (requestBody) => {
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

                                    const { customer_id, enquiry_id, driver_id, vehicle_id, service_provider_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,driver_amount,vehicle_amount,current_amount, tax_amount, discount_amount, final_amount } = requestBody;

                                    let insQuery = `INSERT INTO quotations (customer_id,quotation_id, enquiry_id, driver_id, vehicle_id, serviceprovider_id, taxation_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,driver_amount,vehicle_amount,sub_total, tax_amount, discount_amount, final_amount,created_at)
                                                    VALUES ('${customer_id}', '${sum_quotId}', '${enquiry_id}', '${driver_id}', '${vehicle_id}', '${service_provider_id}', '${tax_id}', '${discount_type_id}', '${trip_type}', '${pickup_location}', '${pickup_country}','${pickup_date}', '${drop_location}','${drop_country}', '${drop_date}','${no_of_horse}','${special_requirement}', '${additional_service}','${transportation_insurance_coverage}','${driver_amount}','${vehicle_amount}','${current_amount}', '${tax_amount}','${discount_amount}','${final_amount}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

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
exports.ListQuotation = (requestBody) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { page, limit } = requestBody;

            const offset = (page - 1) * limit;


                    /**For listing quotation details */
                    let selQuery = `SELECT quo.id, quo.quotation_id, quo.enquiry_id, cu.name AS customer_name, cu.email AS customer_email, quo.status
                    FROM ${constants.tableName.quotations} quo
                    JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
                    WHERE quo.deleted_at IS NULL
                    LIMIT ${+limit} OFFSET ${+offset}`;

                    con.query(selQuery, async (err, quo) => {
                        console.log(quo);
                        if (quo.length != 0) {
                  
                            /**Total count */
                            const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.quotations} quo
                                             WHERE quo.deleted_at IS NULL`
                            con.query(totalCountQuery, (err, result) => {
                                if (!err) {
                                    const count = result[0]['count(*)'];
                                    resolve({ totalCount: count, quotations: quo })
                                }
                            })

                        } else {
                            resolve({ quotations: [] })
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


            /***For selecting quotation view details */
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
            cu.id AS customer_id,
            cu.email AS customer_email,
            cu.user_name AS customer_user_name,
            cu.contact_no AS customer_contact_no,
            cu.id_proof_no AS customer_id_proof_no,
            sp.name AS service_provider_name,
            enq.created_at AS enquiry_date,
            vh.vehicle_number AS vehicle_number,
            vh.make,
            dvr.name AS driver_name, 
            quo.driver_amount,
            quo.vehicle_amount
        FROM ${constants.tableName.quotations} AS quo
        JOIN ${constants.tableName.service_providers} sp ON quo.serviceprovider_id = sp.id
        JOIN ${constants.tableName.vehicles} vh ON quo.vehicle_id = vh.id
        JOIN ${constants.tableName.drivers} dvr ON quo.driver_id  = dvr.id
        JOIN ${constants.tableName.enquiries} enq ON quo.enquiry_id = enq.id
        JOIN ${constants.tableName.customers} cu ON quo.customer_id = cu.id
        WHERE quo.quotation_id = '${quotId}'`;

            con.query(selQuery, async (err, data) => {
                console.log(err); 
                if (data.length != 0) {
                    resolve({ quotation: data })
                } else {
                    resolve({ quotation: [] })
                }
            }) 
        } catch (err) { 
            resolve(false)
            console.log('Error while fetching  quotations', err);
        }
    })
}



/**For updating That means add  of quotation  */
exports.updateQuotation = (requestBody,quotId) => {
    return new Promise(async (resolve, reject) => {
        try {


           /**For taking tax id in the settings application */
           let selQuery = `SELECT 	tax_id  FROM ${constants.tableName.application_settings}`
           con.query(selQuery, async (err, data) => {
               if (data.length != 0) {
                   let tax_id = data[0].tax_id

                   const { customer_id, enquiry_id, driver_id, vehicle_id, service_provider_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,driver_amount,vehicle_amount,current_amount, tax_amount, discount_amount, final_amount } = requestBody;

                   let insQuery = `INSERT INTO quotations (customer_id,quotation_id, enquiry_id, driver_id, vehicle_id, serviceprovider_id, taxation_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage,driver_amount,vehicle_amount,sub_total, tax_amount, discount_amount, final_amount,created_at)
                                   VALUES ('${customer_id}', '${quotId}', '${enquiry_id}', '${driver_id}', '${vehicle_id}', '${service_provider_id}', '${tax_id}', '${discount_type_id}', '${trip_type}', '${pickup_location}', '${pickup_country}','${pickup_date}', '${drop_location}','${drop_country}', '${drop_date}','${no_of_horse}','${special_requirement}', '${additional_service}','${transportation_insurance_coverage}','${driver_amount}','${vehicle_amount}','${current_amount}', '${tax_amount}','${discount_amount}','${final_amount}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                   con.query(insQuery, async (err, data) => {
                       console.log("insert", err);
                       if (!err) {
                        let selQuery = `SELECT id FROM ${constants.tableName.quotations}  WHERE quotation_id = '${quotId}' ORDER BY id DESC LIMIT 1`
                               con.query(selQuery, async (err, data) => {
                            if (data.length != 0) {
                                /**********************************************************STOPED********************** */
                           let updateQuery = `UPDATE ${constants.tableName.quotations} SET  
                           deleated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                           WHERE quotation_id = '${quotId}' AND ORDER BY id DESC LIMIT 1`;
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






