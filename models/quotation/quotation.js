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
                            let qut_id = (id == 1) ? id : id + 1;
                            let quot_prefix = quotation_prefix[0]?.quotation_prefix
                            let sum_quotId = quot_prefix.concat(qut_id)

                            /**For taking tax id in the settings application */
                            let selQuery = `SELECT 	tax_id  FROM ${constants.tableName.application_settings}`
                            con.query(selQuery, async (err, data) => {
                                if (data.length != 0) {
                                    let tax_id = data[0].tax_id

                                    const { customer_id, enquiry_id, driver_id, vehicle_id, service_provider_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage, tax_amount, discount_amount, final_amount } = requestBody;

                                    let insQuery = `INSERT INTO quotations (customer_id,quotation_id, enquiry_id, driver_id, vehicle_id, serviceprovider_id, taxation_id, discount_type_id, trip_type, pickup_location, pickup_country, pickup_date, drop_location, drop_country, drop_date, no_of_horse, special_requirement, additional_service, transportation_insurance_coverage, tax_amount, discount_amount, final_amount,created_at)
                                                    VALUES ('${customer_id}', '${sum_quotId}', '${enquiry_id}', '${driver_id}', '${vehicle_id}', '${service_provider_id}', '${tax_id}', '${discount_type_id}', '${trip_type}', '${pickup_location}', '${pickup_country}','${pickup_date}', '${drop_location}','${drop_country}', '${drop_date}','${no_of_horse}','${special_requirement}', '${additional_service}','${transportation_insurance_coverage}', '${tax_amount}','${discount_amount}','${final_amount}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

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


            /***For selecting quotation prefix */
            let selQuery = `SELECT 	apps.quotation_prefix 
                        FROM ${constants.tableName.quotations} apps`
            con.query(selQuery, async (err, data) => {
                if (data.length != 0) {


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






