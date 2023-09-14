/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
//  This is tripdetails model file. Where all the logic of the tripdetails page program is written. //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const con = require("../../configs/db.configs");
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()

module.exports = class tripetails
{

    static async getAllTripDetails (requestBody,spId) {
    return new Promise((resolve, reject) => {
        try {

            const { page, limit } = requestBody;

            const offset = (page - 1) * limit;
            /**For selecting role name and role id  */
            const selRoleName = `
            SELECT rl.name AS role_name, rl.id
            FROM ${constants.tableName.service_providers} AS sp 
            JOIN ${constants.tableName.roles} AS rl ON sp.role_Id = rl.id
            WHERE sp.id = '${spId}';
        `;
        

            
            con.query(selRoleName,(err,data)=>{ 
              
                if(data.length != 0){ 


                    let role_id = data[0].id

            const selQuery = `SELECT bk.id AS booking_id,bk.inv_id  AS invoice_id, sp.name AS service_provider,sp.id AS service_provider_id,vh.id AS vehicle_id,dvr.id AS driver_id ,cu.name AS customer_name,dvr.name AS driver_name,vh.vehicle_number ,bk.pickup_location, bk.drop_location,bk.pickup_date  AS trip_starting_date,bk.drop_date  AS trip_ending_date, bk.booking_status  AS trip_status ,bk.pickup_time,bk.drop_time
            FROM ${constants.tableName.bookings} AS bk
            JOIN ${constants.tableName.vehicles} vh ON bk.vehicle_id  = vh.id
            JOIN ${constants.tableName.customers} cu ON bk.customer_id   = cu.id
            JOIN ${constants.tableName.drivers} dvr ON bk.driver_id   = dvr.id
            JOIN ${constants.tableName.service_providers} sp ON bk.service_provider_id  = sp.id
            WHERE bk.deleted_at IS NULL
            AND (
                ('${role_id}' = '${constants.Roles.admin}')
                OR
                ('${role_id}' = '${constants.Roles.admin}')
                OR
                (
                    '${role_id}' = '${constants.Roles.service_provider}'
                    AND sp.id = '${spId}'
                )
            )
            LIMIT ${+limit} OFFSET ${+offset} `;
            con.query(selQuery, (err, data) => {
     
                if (!err) {

                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.bookings} bk
                    JOIN ${constants.tableName.service_providers} sp ON bk.service_provider_id = sp.id
                    WHERE bk.deleted_at IS NULL
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
                    // resolve(result);
                    con.query(totalCountQuery, (err, result) => {
                        if (!err) {
                            const count = result[0]['count(*)'];
                            for (let i = 0; i < data.length; i++) {

                                data[i].trip_starting_date = `${time.formatDateToDDMMYYYY(
                                    data[i].trip_starting_date
                                )}`;
                                data[i].trip_ending_date = `${time.formatDateToDDMMYYYY(
                                    data[i].trip_ending_date
                                )}`;
                            }

                         /**CHECKING basis of role id module name */
                         let Query = `SELECT md.name AS module_name ,md.id AS module_id ,pm.create,pm.update,pm.read,pm.delete
                         FROM ${constants.tableName.permissions} AS pm
                         JOIN ${constants.tableName.modules} md ON pm.module_id  = md.id
                         JOIN ${constants.tableName.roles} rl ON pm.role_id = rl.id
                         WHERE pm.role_id = '${role_id}'  AND md.id = '${constants.modules.trip_details}'
                         `;

                         con.query(Query,(err,modules)=>{
                            if(!err){
                 
                            resolve({ totalCount: count, tripDetails: data,module: modules })
                                
                           
                             }
                            })
                        }
                    })
                }
            })

        }else {
            resolve({totalCount : 0, tripDetails : [],module : []})
        }
    })

        } catch (err) {
            console.log('Error while feching equiries', err);
        }


    })

}




static async addBreakDowns (requestBody){
    return new Promise((resolve, reject) => {
        try {


            const { booking_id, trip_status } = requestBody;

            if (trip_status === constants.vehicles_breakouts_status.break_out) {

                /**CHECKING ****** allredy data in the vehicle break outs  on the basis of booking id  */
                let selQuery = `SELECT * FROM ${constants.tableName.vehicles_breakouts} 
                            WHERE 	booking_id = '${booking_id}'`;
                 con.query(selQuery, async (err, result) => {
                    if (result.length == 0) {
                        /***This for adding previous booking data   */
                        let selQuery = `SELECT id AS booking_id,inv_id AS invoice_id ,service_provider_id ,vehicle_id  ,driver_id ,pickup_location,	drop_location  FROM ${constants.tableName.bookings}
                            WHERE id  = '${booking_id}'`
                        con.query(selQuery, async (err, data) => {

                            if (data.length != 0) {

                                const { invoice_id, service_provider_id, vehicle_id, driver_id, pickup_location, drop_location } = data[0];
                                const breakDownLocation = requestBody.pickup_location;

                                /**For adding new brak downs in here we are adding the previus one  */
                                let insQuery = `INSERT INTO ${constants.tableName.vehicles_breakouts} (booking_id, invoice_id, service_provider_id, vehicle_id, driver_id, pickup_location, drop_location, created_at)
                                                VALUES ('${booking_id}', '${invoice_id}', '${service_provider_id}', '${vehicle_id}', '${driver_id}', '${pickup_location}', '${breakDownLocation}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                                con.query(insQuery, async (err, result) => {
                                    if (!err) {

                                        const { invoice_id, booking_id, service_provider_id, driver_id, vehicle_id } = requestBody;
                                        let insQueryy = `INSERT INTO ${constants.tableName.vehicles_breakouts} (booking_id, invoice_id, service_provider_id, vehicle_id, driver_id, pickup_location, drop_location, created_at)
                                                                VALUES ('${booking_id}', '${invoice_id}', '${service_provider_id}', '${vehicle_id}', '${driver_id}', '${breakDownLocation}', '${drop_location}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

                                        con.query(insQueryy, async (err, result) => {
                                            if (!err) {

                                                /** After inserting we updating trip status on the bookingss */
                                                let updateQuery = `UPDATE ${constants.tableName.bookings}
                                                                       SET booking_status = '${constants.vehicles_breakouts_status.break_out}'
                                                                       WHERE id = '${booking_id}'`;

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
                        
                        /***Ther allredy data in  the vehicle break outs    */
                        let selQuery = `SELECT 	drop_location  FROM ${constants.tableName.bookings}
                                    WHERE id  = '${booking_id}'`
                        con.query(selQuery, async (err, data) => {
                            if (data.length != 0) {
                                let drop_location = data[0].drop_location

                                /** Adding new break down data */
                                let lastAddedBreakDown = `SELECT id, pickup_location
                                                    FROM ${constants.tableName.vehicles_breakouts}
                                                    WHERE booking_id = '${booking_id}'
                                                    ORDER BY id DESC
                                                    LIMIT 1`;

                                con.query(lastAddedBreakDown, async (err, lastBreakDown) => {
                                    if (lastBreakDown.length != 0) {
                                        let lastId = lastBreakDown[0].id;
                                        let lastPickupLocation = lastBreakDown[0].pickup_location
                                        const { invoice_id, booking_id, service_provider_id, driver_id, vehicle_id, pickup_location } = requestBody;

                                                let updateQuery = `UPDATE ${constants.tableName.vehicles_breakouts} 
                                                                    SET booking_id = '${booking_id}', 
                                                                        invoice_id = '${invoice_id}', 
                                                                        service_provider_id = '${service_provider_id}', 
                                                                        vehicle_id = '${vehicle_id}', 
                                                                        driver_id = '${driver_id}', 
                                                                        pickup_location = '${lastPickupLocation}', 
                                                                        drop_location = '${pickup_location}', 
                                                                        updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                                                    WHERE id = '${lastId}'`;


                                        con.query(updateQuery, async (err, result) => {

                                            if (!err) {

                                               
                                                let insQueryy = `INSERT INTO ${constants.tableName.vehicles_breakouts} (booking_id, invoice_id, service_provider_id, vehicle_id, driver_id, pickup_location, drop_location, created_at)
                                                                        VALUES ('${booking_id}', '${invoice_id}', '${service_provider_id}', '${vehicle_id}', '${driver_id}', '${pickup_location}', '${drop_location}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
        
                                                con.query(insQueryy, async (err, result) => {
                                                 
                                                    if (!err) {
        
                                                        resolve(true);
        
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
                    }
                })
            } else if (trip_status === constants.vehicles_breakouts_status.compleated) {

                let updateQuery = `UPDATE ${constants.tableName.bookings} SET
                                   booking_status = '${constants.vehicles_breakouts_status.compleated}'
                                   WHERE id = '${booking_id}'`;
                con.query(updateQuery, async (err, data) => {

                    if (data?.length != 0) {

                        resolve(true)

                    } else {
                        resolve(false)
                    }
                })

            }


        } catch (err) {
            console.log('Error while doing break down ', err);
        }


    })

}




static async listBreakDowns  (bkId)  {
    return new Promise((resolve, reject) => {
        try {
            let selQuery = `SELECT vb.id, vh.vehicle_number ,dvr.name AS driver_name, vb.pickup_location,vb.drop_location,sp.name AS service_provider
                           FROM ${constants.tableName.vehicles_breakouts} vb
                           JOIN ${constants.tableName.vehicles} vh ON vb.vehicle_id  = vh.id
                           JOIN ${constants.tableName.drivers} dvr ON vb.driver_id   = dvr.id
                           JOIN ${constants.tableName.service_providers} sp ON vb.service_provider_id  = sp.id
                           WHERE vb.booking_id = '${bkId}'`


            con.query(selQuery, async (err, data) => {
                if (data.length != 0) {
                    resolve({ vehicles_breakouts: data })
                } else {
                    resolve({ vehicles_breakouts: [] })
                }
            })


        } catch (err) {
            console.log('Error while feching equiries', err);
        }


    })

}


}
